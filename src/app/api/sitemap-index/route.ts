import { generateSitemaps } from '@/data/sitemap-logic';
import { NextResponse } from 'next/server';

export const revalidate = 86400;
export const dynamic = 'force-static';

export async function GET() {
  const sitemaps = await generateSitemaps();
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(s => `  <sitemap>
    <loc>https://paranjapeblueridge.com/sitemap/${s.id}.xml</loc>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate'
    }
  });
}

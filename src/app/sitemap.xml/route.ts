import { NextResponse } from 'next/server';
import { generateSitemaps } from '@/data/sitemap-logic';

export const dynamicParams = false;
export const revalidate = 86400;

export async function GET() {
  const baseUrl = 'https://paranjapeblueridge.com';
  const chunks = await generateSitemaps();
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-images.xml</loc>
  </sitemap>
${chunks.map((chunk: { id: number }) => `  <sitemap>
    <loc>${baseUrl}/sitemap/${chunk.id}.xml</loc>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate',
    },
  });
}

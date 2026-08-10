import { getSitemapUrls, generateSitemaps } from '@/data/sitemap-logic';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Extract "0" from "0.xml"
  const rawId = params.id.replace('.xml', '');
  const id = parseInt(rawId, 10);

  if (isNaN(id)) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const urls = await getSitemapUrls({ id });
  
  if (!urls || urls.length === 0) {
    return new NextResponse('Not Found', { status: 404 });
  }
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(u => {
  let urlXml = `  <url>\n    <loc>${u.url}</loc>`;
  
  if (u.lastModified) {
    const d = u.lastModified instanceof Date ? u.lastModified : new Date(u.lastModified);
    urlXml += `\n    <lastmod>${d.toISOString()}</lastmod>`;
  }
  
  if (u.changeFrequency) urlXml += `\n    <changefreq>${u.changeFrequency}</changefreq>`;
  if (u.priority !== undefined) urlXml += `\n    <priority>${u.priority}</priority>`;
  
  if (u.alternates?.languages) {
    const alts = Object.entries(u.alternates.languages)
      .map(([lang, href]) => `\n    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`)
      .join('');
    urlXml += alts;
  }
  
  urlXml += `\n  </url>`;
  return urlXml;
}).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate'
    }
  });
}

// Generate static params so these routes are generated at build time
export async function generateStaticParams() {
  const sitemaps = await generateSitemaps();
  // Next.js params must match the folder [id] value. We need them to be "0.xml", "1.xml", etc.
  return sitemaps.map((s: { id: number }) => ({
    id: `${s.id}.xml`
  }));
}

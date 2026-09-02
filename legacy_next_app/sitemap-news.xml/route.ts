export const runtime = 'edge';
import { articles } from '@/data/master-data';
import { getAllPosts } from '@/utils/mdxUtils';

const SITE_URL = 'https://paranjapeblueridge.com';

export async function GET() {
  const mdxPosts = getAllPosts();

  const allNewsItems = [
    ...articles.map(article => ({
      title: article.title,
      slug: article.slug,
      dateISO: article.dateISO,
    })),
    ...mdxPosts.map(post => ({
      title: post.meta?.title || 'Insight',
      slug: post.slug,
      dateISO: post.meta?.dateISO || new Date().toISOString(),
    }))
  ];

  // Google News requires articles to be published within the last 48 hours for active Discovery,
  // but we submit all to guarantee crawling. 
  
  const newsSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${allNewsItems.map(item => `
  <url>
    <loc>${SITE_URL}/insights/${item.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Paranjape Blue Ridge Insights</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${item.dateISO}</news:publication_date>
      <news:title><![CDATA[${item.title}]]></news:title>
    </news:news>
  </url>`).join('')}
</urlset>`;

  return new Response(newsSitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

import type { APIRoute } from 'astro';
import { articles } from '../data/master-data';
import { getAllPosts } from '../utils/mdxUtils';

export const prerender = true;

const SITE_URL = 'https://paranjapeblueridge.com';

export const GET: APIRoute = async () => {
  const mdxPosts = getAllPosts();

  const allFeedItems = [
    ...articles.map(article => ({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: Array.isArray(article.content) ? article.content.join('\n\n') : (article.content || article.excerpt),
      dateISO: article.dateISO,
      author: article.author,
      category: article.category,
    })),
    ...mdxPosts.map(post => ({
      title: post.meta?.title || 'Insight',
      slug: post.slug,
      excerpt: post.meta?.excerpt || '',
      content: post.content || '',
      dateISO: post.meta?.dateISO || new Date().toISOString(),
      author: post.meta?.author || 'Paranjape Research Team',
      category: post.meta?.category || 'Real Estate Intelligence',
    }))
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Paranjape Blue Ridge Hinjewadi — Sovereign Insights</title>
    <link>${SITE_URL}</link>
    <description>Expert analysis on Hinjewadi real estate, investment returns, metro connectivity, and life at Paranjape Blue Ridge — Pune's finest 138-acre integrated township.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <link rel="hub" href="https://pubsubhubbub.appspot.com"/>
    <image>
      <url>${SITE_URL}/assets/images/pscl-blue-ridge-aerial-drone.webp</url>
      <title>Paranjape Blue Ridge Hinjewadi</title>
      <link>${SITE_URL}</link>
    </image>
    <category>Real Estate</category>
    <category>Pune Property</category>
    <category>Hinjewadi Investment</category>
    ${allFeedItems.map(item => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${SITE_URL}/insights/${item.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/insights/${item.slug}</guid>
      <description><![CDATA[${item.excerpt}]]></description>
      <content:encoded><![CDATA[${item.content}]]></content:encoded>
      <pubDate>${new Date(item.dateISO).toUTCString()}</pubDate>
      <author>insights@paranjapeblueridge.com (${item.author})</author>
      <category>${item.category}</category>
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
};

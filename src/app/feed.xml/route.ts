import { articles } from '@/data/master-data';
import { getAllPosts } from '@/utils/mdxUtils';

const SITE_URL = 'https://www.paranjapeblueridge.com';

export async function GET() {
  const mdxPosts = getAllPosts();

  const allFeedItems = [
    ...articles.map(article => ({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content.join('\n\n'),
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
      author: post.meta?.author || 'Sovereign Insights Team',
      category: post.meta?.category || 'Real Estate',
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
      <url>${SITE_URL}/assets/images/township-night.png</url>
      <title>Paranjape Blue Ridge Hinjewadi</title>
      <link>${SITE_URL}</link>
    </image>
    <category>Real Estate</category>
    <category>Pune Property</category>
    <category>Hinjewadi Investment</category>
    ${allFeedItems.map(item => {
      const dynamicOgUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(item.title)}&config=${encodeURIComponent(item.category)}`;
      return `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${SITE_URL}/insights/${item.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/insights/${item.slug}</guid>
      <description><![CDATA[${item.excerpt}]]></description>
      <content:encoded><![CDATA[${item.content}]]></content:encoded>
      <pubDate>${new Date(item.dateISO).toUTCString()}</pubDate>
      <author>insights@paranjapeblueridge.com (${item.author})</author>
      <category>${item.category}</category>
      <media:content url="${dynamicOgUrl}" medium="image" type="image/png" width="1200" height="630" />
    </item>`;
    }).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

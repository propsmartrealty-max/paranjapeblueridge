import { articles } from '@/data/master-data';

const SITE_URL = 'https://www.paranjapeblueridge.com';

export async function GET() {
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Paranjape Blue Ridge Hinjewadi — Sovereign Insights</title>
    <link>${SITE_URL}</link>
    <description>Expert analysis on Hinjewadi real estate, investment returns, metro connectivity, and life at Paranjape Blue Ridge — Pune's finest 138-acre integrated township.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/assets/images/township-night.png</url>
      <title>Paranjape Blue Ridge Hinjewadi</title>
      <link>${SITE_URL}</link>
    </image>
    <category>Real Estate</category>
    <category>Pune Property</category>
    <category>Hinjewadi Investment</category>
    ${articles.map(article => {
      const dynamicOgUrl = `${SITE_URL}/api/og?title=${encodeURIComponent(article.title)}&config=${encodeURIComponent(article.category)}`;
      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${SITE_URL}/insights/${article.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/insights/${article.slug}</guid>
      <description><![CDATA[${article.excerpt}]]></description>
      <content:encoded><![CDATA[${article.content.join('\n\n')}]]></content:encoded>
      <pubDate>${new Date(article.dateISO).toUTCString()}</pubDate>
      <author>insights@paranjapeblueridge.com (${article.author})</author>
      <category>${article.category}</category>
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

import { NextResponse } from 'next/server';
import { projects } from '@/data/master-data';

export async function GET() {
  const SITE_URL = 'https://www.paranjapeblueridge.com';

  const feedItems = projects.flatMap((project) => {
    return project.configurations.map((config) => {
      const id = `${project.id}-${config.slug}`;
      const title = `${config.title} at ${project.name} - Blue Ridge Hinjewadi`;
      const description = `Premium ${config.title} at ${project.name}, Paranjape Blue Ridge, Hinjewadi Phase 1, Pune. Carpet area: ${config.carpetArea || project.carpetArea}. MahaRERA Number: ${project.reraNumber}. Features high-quality specifications, 24/7 security, captive power substation, and access to premium township facilities like the ICSE school, Mula river boat club, and 9-hole golf course.`;
      const link = `${SITE_URL}/${project.slug}`;
      const imageLink = `${SITE_URL}${config.image || '/assets/images/township-night.png'}`;
      
      // Resolve price number from string if possible (default to safe defaults)
      const priceValue = config.priceValue || project.priceValue || 9500000;
      const priceString = `${priceValue} INR`;

      return `    <item>
      <g:id>${id}</g:id>
      <g:title><![CDATA[${title}]]></g:title>
      <g:description><![CDATA[${description}]]></g:description>
      <g:link>${link}</g:link>
      <g:image_link>${imageLink}</g:image_link>
      <g:price>${priceString}</g:price>
      <g:availability>in stock</g:availability>
      <g:condition>new</g:condition>
      <g:brand>Paranjape Schemes</g:brand>
      <g:google_product_category>Real Estate &gt; Properties</g:google_product_category>
      <g:custom_label_0>${project.name}</g:custom_label_0>
      <g:custom_label_1>${config.title.split(' ')[0] || 'Apartment'}</g:custom_label_1>
    </item>`;
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Paranjape Blue Ridge Inventory - Google Merchant Product Feed</title>
    <link>${SITE_URL}</link>
    <description>Official Google Merchant Center Product Feed for Paranjape Blue Ridge real estate apartments in Hinjewadi Phase 1, Pune.</description>
    <language>en-IN</language>
${feedItems.join('\n')}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

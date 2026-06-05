import { generatePseoUrls } from '@/data/seo-matrix';

export async function GET() {
  const SITE_URL = 'https://www.paranjapeblueridge.com'; // Use production domain

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>Paranjape Blue Ridge Inventory Feed</title>
    <link>${SITE_URL}</link>
    <description>Premium Real Estate Inventory at Paranjape Blue Ridge, Hinjewadi Phase 1, Pune</description>
`;

  const pseoPages = generatePseoUrls();

  pseoPages.forEach(page => {
    // Generate a pseudo-ID
    const id = `BR-${page.slug.toUpperCase()}`;
    
    // Determine condition & availability
    const availability = "in_stock";
    const condition = "new";

    // Approximate real estate pricing for Merchant Center requirement
    let price = "10000000.00 INR"; 
    if (page.type.includes('2 BHK')) price = "8500000.00 INR";
    if (page.type.includes('3 BHK')) price = "12500000.00 INR";
    if (page.type.includes('4 BHK')) price = "18000000.00 INR";

    xml += `
    <item>
      <g:id>${id}</g:id>
      <g:title><![CDATA[${page.title}]]></g:title>
      <g:description><![CDATA[${page.title} in Hinjewadi Phase 1. ${page.intent} available in Paranjape Blue Ridge.]]></g:description>
      <g:link>${SITE_URL}/${page.slug}</g:link>
      <g:image_link>${SITE_URL}/assets/images/real-township-day.jpg</g:image_link>
      <g:condition>${condition}</g:condition>
      <g:availability>${availability}</g:availability>
      <g:price>${price}</g:price>
      <g:brand>Paranjape Schemes</g:brand>
      <g:product_type>Real Estate &gt; Residential</g:product_type>
      <g:custom_label_0>${page.silo}</g:custom_label_0>
      <g:custom_label_1>${page.type}</g:custom_label_1>
    </item>`;
  });

  xml += `
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate',
    },
  });
}

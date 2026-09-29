import type { APIRoute } from 'astro';
import { projects } from '../data/master-data';

export const prerender = true;

const SITE_URL = 'https://paranjapeblueridge.com';

export const GET: APIRoute = async () => {
  const items = projects.flatMap(project =>
    project.configurations.map(config => {
      const id = `${project.id}-${config.slug}`;
      const title = `${config.title} - ${project.name} | Paranjape Blue Ridge Hinjewadi Pune`;
      const description = `${config.title} with ${config.carpetArea || config.floorSizeSqFt + ' sq ft'} carpet area at ${project.name} inside Paranjape Blue Ridge 138-acre integrated township, Hinjewadi Phase 1, Pune. MahaRERA registered: ${project.reraNumber}. Features private 9-hole golf course, river promenade, and walk-to-work IT park.`;
      const link = `${SITE_URL}/${project.slug}/${config.slug}`;
      const imageLink = config.image ? `${SITE_URL}${config.image}` : `${SITE_URL}/assets/images/pscl-blue-ridge-aerial-drone.webp`;
      const priceVal = config.priceValue || project.priceValue;

      return `
    <item>
      <g:id>${id}</g:id>
      <g:title><![CDATA[${title}]]></g:title>
      <g:description><![CDATA[${description}]]></g:description>
      <g:link>${link}</g:link>
      <g:image_link>${imageLink}</g:image_link>
      <g:additional_image_link>${SITE_URL}/assets/images/pscl-blue-ridge-aerial-drone.webp</g:additional_image_link>
      <g:condition>new</g:condition>
      <g:availability>in_stock</g:availability>
      <g:price>${priceVal} INR</g:price>
      <g:brand>Paranjape Schemes</g:brand>
      <g:mpn>${project.reraNumber}-${config.slug.toUpperCase()}</g:mpn>
      <g:identifier_exists>no</g:identifier_exists>
      <g:product_type>Real Estate &gt; Residential &gt; Apartments</g:product_type>
      <g:custom_label_0>${project.name}</g:custom_label_0>
      <g:custom_label_1>Hinjewadi Phase 1</g:custom_label_1>
      <g:custom_label_2>Pune West</g:custom_label_2>
      <g:custom_label_3>${project.reraNumber}</g:custom_label_3>
      <g:custom_label_4>${config.carpetArea || ''}</g:custom_label_4>
    </item>`;
    })
  ).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Paranjape Blue Ridge Hinjewadi - Live Real Estate Inventory Feed</title>
    <link>${SITE_URL}</link>
    <description>Official residential inventory and configuration pricing for Paranjape Blue Ridge 138-acre integrated township in Hinjewadi Phase 1, Pune.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
    },
  });
};

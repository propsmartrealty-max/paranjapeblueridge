import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async () => {
  const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /sovereign-vault

User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /sovereign-vault

User-agent: Googlebot-Image
Allow: /assets/
Allow: /

User-agent: Google-InspectionTool
Allow: /

User-agent: Bingbot
Allow: /
Disallow: /api/

Sitemap: https://paranjapeblueridge.com/sitemap-index.xml
`;

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
};

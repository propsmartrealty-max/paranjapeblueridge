import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async () => {
  const robots = `# Enterprise Google & Global Search Engine Robots Directive
# Domain: https://paranjapeblueridge.com

User-agent: *
Allow: /
Allow: /_astro/
Allow: /assets/
Allow: /assets/images/
Allow: /assets/logos/
Disallow: /api/
Disallow: /admin/
Disallow: /draft/
Disallow: /sovereign-vault
Disallow: /sovereign-vault/

User-agent: Googlebot
Allow: /
Allow: /_astro/
Allow: /assets/
Allow: /assets/images/
Allow: /*.js$
Allow: /*.css$
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.svg$
Allow: /*.webp$

User-agent: Googlebot-Image
Allow: /assets/
Allow: /assets/images/
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.svg$
Allow: /*.webp$

User-agent: Google-InspectionTool
Allow: /

User-agent: Bingbot
Allow: /
Allow: /_astro/
Allow: /assets/
Crawl-delay: 1

User-agent: Applebot
Allow: /
Allow: /_astro/
Allow: /assets/

User-agent: DuckDuckBot
Allow: /
Allow: /_astro/
Allow: /assets/

User-agent: Google-Extended
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: https://paranjapeblueridge.com/sitemap-index.xml
Sitemap: https://paranjapeblueridge.com/sitemap-0.xml
Sitemap: https://paranjapeblueridge.com/feed.xml
`;

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
};

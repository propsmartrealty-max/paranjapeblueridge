import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Universal rule for all bots
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/cache/', '/sovereign-vault/'],
      },
      // Explicit Googlebot — allow full indexing, no cache paths
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/sovereign-vault/'],
      },
      // Explicit Bingbot — allow full indexing
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/sovereign-vault/'],
      },
      // Block useless AI crawlers/scrapers to save crawl budget
      {
        userAgent: ['GPTBot', 'CCBot', 'ChatGPT-User', 'anthropic-ai', 'Claude-Web', 'Omgili', 'Bytespider'],
        disallow: ['/'],
      },
    ],
    sitemap: 'https://www.paranjapeblueridge.com/sitemap.xml',
    host: 'https://www.paranjapeblueridge.com',
  };
}


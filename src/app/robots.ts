import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 1. Universal rule for standard bots
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', 
          '/_next/cache/', 
          '/sovereign-vault/',
          '/*?*', // Block all query parameters from indexing (UTMs, etc.)
        ],
      },
      // 2. Explicit Googlebot & Bingbot Rules (Highest Priority)
      {
        userAgent: ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot'],
        allow: '/',
        disallow: ['/api/', '/sovereign-vault/'],
      },
      // 3. Block AI Scrapers & Data Miners (Protect Proprietary Data)
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Anthropic-ai',
          'Claude-Web',
          'Applebot-Extended',
          'CCBot',
          'Bytespider',
          'Diffbot',
          'FacebookBot',
          'ImagesiftBot',
          'PerplexityBot',
          'Omgili',
          'Omgilibot',
        ],
        disallow: '/',
      },
    ],
    sitemap: 'https://www.paranjapeblueridge.com/sitemap.xml',
    host: 'https://www.paranjapeblueridge.com',
  };
}


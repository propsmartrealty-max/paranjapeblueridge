import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 1. Explicit Googlebot & Bingbot Rules (Highest Priority - Full Allowance)
      {
        userAgent: ['Googlebot', 'Googlebot-Image', 'Googlebot-Video', 'Googlebot-News', 'Bingbot', 'Slurp', 'DuckDuckBot'],
        allow: '/',
        disallow: ['/api/', '/sovereign-vault/'],
      },
      // 2. Block Competitor SEO Tools to protect the 6600+ Programmatic SEO Matrix
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
          'Rogerbot',
          'BLEXBot',
          'SEOkicks',
          'Barkrowler',
          'SeekportBot'
        ],
        disallow: '/',
      },
      // 3. Allow AI Scrapers ONLY on the designated Context File (/llm.txt)
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
        allow: '/llm.txt',
        disallow: '/',
      },
      // 4. Universal rule for standard bots (Fallback)
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', 
          '/_next/cache/', 
          '/sovereign-vault/',
          '/*?*', // Block all query parameters from indexing (UTMs, etc.) to prevent duplicate content
        ],
        crawlDelay: 2, // Slow down generic scrapers to protect server resources
      },
    ],
    sitemap: 'https://www.paranjapeblueridge.com/sitemap.xml',
    host: 'https://www.paranjapeblueridge.com',
  };
}


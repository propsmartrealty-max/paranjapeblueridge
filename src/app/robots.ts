import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 1. Explicit Googlebot Ecosystem & Search Engine Rules (Maximum Allowance & Speed)
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Googlebot-Video',
          'Googlebot-News',
          'GoogleOther',
          'Google-InspectionTool',
          'Storebot-Google',
          'Google-Extended',
          'Bingbot',
          'Slurp',
          'DuckDuckBot'
        ],
        allow: '/',
        disallow: ['/api/'],
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
          'Omgili',
          'Omgilibot',
        ],
        allow: '/llm.txt',
        disallow: '/',
      },
      // 4. Allow Search AI overviews (Perplexity, GoogleExtendedCrawler)
      {
        userAgent: ['PerplexityBot', 'GoogleExtendedCrawler'],
        allow: '/',
      },
      // 5. Universal rule for standard bots (Fallback)
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', 
          '/_next/cache/'
        ],
        crawlDelay: 1, // Reduced to 1 to ensure legit standard bots aren't overly throttled
      },
    ],
    sitemap: [
      'https://paranjapeblueridge.com/sitemap.xml',
      'https://paranjapeblueridge.com/sitemap-images.xml'
    ],
    host: 'https://paranjapeblueridge.com',
  };
}


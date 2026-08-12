import { MetadataRoute } from 'next';

const SEARCH_ENGINE_BOTS = [
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
];

const SEO_TOOLS_BOTS = [
  'AhrefsBot',
  'SemrushBot',
  'MJ12bot',
  'DotBot',
  'Rogerbot',
  'BLEXBot',
  'SEOkicks',
  'Barkrowler',
  'SeekportBot'
];

const AI_SCRAPER_BOTS = [
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
];

const SEARCH_AI_BOTS = [
  'PerplexityBot',
  'GoogleExtendedCrawler'
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // 1. Explicit Googlebot Ecosystem & Search Engine Rules (Maximum Allowance & Speed)
      {
        userAgent: SEARCH_ENGINE_BOTS,
        allow: '/',
        disallow: ['/api/'],
      },
      // 2. Block Competitor SEO Tools to protect the Programmatic SEO Matrix
      {
        userAgent: SEO_TOOLS_BOTS,
        disallow: '/',
      },
      // 3. Allow AI Scrapers ONLY on the designated Context File (/llm.txt)
      {
        userAgent: AI_SCRAPER_BOTS,
        allow: '/llm.txt',
        disallow: '/',
      },
      // 4. Allow Search AI overviews
      {
        userAgent: SEARCH_AI_BOTS,
        allow: '/',
      },
      // 5. Universal rule for standard bots (Fallback)
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/cache/'],
        crawlDelay: 1,
      },
    ],
    sitemap: [
      'https://paranjapeblueridge.com/sitemap.xml',
      'https://paranjapeblueridge.com/sitemap-images.xml'
    ],
    host: 'https://paranjapeblueridge.com',
  };
}

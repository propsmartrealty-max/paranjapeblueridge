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
    ],
    sitemap: 'https://www.paranjapeblueridge.com/sitemap.xml',
  };
}



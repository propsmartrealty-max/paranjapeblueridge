import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Googlebot: allow static assets so JS-rendered pages can be indexed
        userAgent: 'Googlebot',
        allow: ['/', '/_next/static/', '/_next/image/'],
        disallow: ['/api/', '/_next/cache/', '/sovereign-vault/'],
      },
      {
        // Googlebot-Image: allow all images
        userAgent: 'Googlebot-Image',
        allow: ['/assets/images/'],
      },
      {
        // All other bots
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/cache/', '/sovereign-vault/'],
      },
    ],
    sitemap: 'https://www.paranjapeblueridge.com/sitemap.xml',
  };
}


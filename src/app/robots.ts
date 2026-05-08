import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/sovereign-vault/'],
    },
    sitemap: 'https://www.paranjapeblueridge.com/sitemap.xml',
  };
}

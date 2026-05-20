import { MetadataRoute } from 'next';
import { projects, articles } from '@/data/master-data';
import { generatePseoUrls } from '@/data/seo-matrix';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.paranjapeblueridge.com';
  
  const projectUrls = projects.map(p => ({
    url: `${baseUrl}/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const configUrls = projects.flatMap(p => 
    (p.configurations || []).map(c => ({
      url: `${baseUrl}/${p.slug}/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  const brochureUrls = projects.map(p => ({
    url: `${baseUrl}/brochure/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const articleUrls = articles.map(a => ({
    url: `${baseUrl}/insights/${a.slug}`,
    lastModified: new Date(a.dateISO),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const pseoUrlsData = generatePseoUrls();
  // Use a fixed publication date for PSEO pages — avoids Google treating them
  // as freshly-modified on every build (which signals thin content churn).
  const pseoPublishedDate = new Date('2026-04-01T00:00:00+05:30');
  const pseoUrls = pseoUrlsData.map(u => ({
    url: `${baseUrl}/${u.slug}`,
    lastModified: pseoPublishedDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/hinjewadi-micro-market`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/feed.xml`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/google-products-feed`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  return [...staticUrls, ...projectUrls, ...configUrls, ...brochureUrls, ...articleUrls, ...pseoUrls];
}

import { MetadataRoute } from 'next';
import { projects } from '@/data/master-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://blueridge-hinjewadi.com';
  
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
        url: `${baseUrl}/sovereign-vault`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.3,
    }
  ];

  return [...staticUrls, ...projectUrls, ...configUrls];
}

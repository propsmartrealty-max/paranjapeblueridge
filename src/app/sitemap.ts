import { MetadataRoute } from 'next';
import { projects, articles } from '@/data/master-data';
import { generatePseoUrls } from '@/data/seo-matrix';
import { getAllPosts } from '@/utils/mdxUtils';

const baseUrl = 'https://www.paranjapeblueridge.com';

export async function generateSitemaps() {
  // We split the massive sitemap into logical silos for Googlebot
  const pseoUrlsCount = generatePseoUrls().length;
  const pseoChunks = Math.ceil(pseoUrlsCount / 1100);

  const sitemaps = [
    { id: 0 }, // Core & Projects (Static + Configs + Brochures)
    { id: 1 }, // Articles & Insights
  ];

  for (let i = 0; i < pseoChunks; i++) {
    sitemaps.push({ id: 2 + i });
  }

  return sitemaps;
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  if (id === 0) {
    // 1. Core Static URLs
    const staticUrls = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
        alternates: { languages: { 'en': baseUrl, 'mr': `${baseUrl}/mr` } }
      },
      {
        url: `${baseUrl}/mr`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1.0,
        alternates: { languages: { 'en': baseUrl, 'mr': `${baseUrl}/mr` } }
      },
      {
        url: `${baseUrl}/hinjewadi-micro-market`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
        alternates: { languages: { 'en': `${baseUrl}/hinjewadi-micro-market`, 'mr': `${baseUrl}/mr-hinjewadi-micro-market` } }
      },
      {
        url: `${baseUrl}/mr-hinjewadi-micro-market`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
        alternates: { languages: { 'en': `${baseUrl}/hinjewadi-micro-market`, 'mr': `${baseUrl}/mr-hinjewadi-micro-market` } }
      }
    ];

    // 2. Project URLs
    const projectUrls = projects.flatMap(p => [
      {
        url: `${baseUrl}/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
        alternates: { languages: { 'en': `${baseUrl}/${p.slug}`, 'mr': `${baseUrl}/mr-${p.slug}` } }
      },
      {
        url: `${baseUrl}/mr-${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
        alternates: { languages: { 'en': `${baseUrl}/${p.slug}`, 'mr': `${baseUrl}/mr-${p.slug}` } }
      }
    ]);

    // 3. Configurations & Brochures
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

    return [...staticUrls, ...projectUrls, ...configUrls, ...brochureUrls];
  }

  if (id === 1) {
    // 4. Articles and Insights
    const articleUrls = articles.map(a => ({
      url: `${baseUrl}/insights/${a.slug}`,
      lastModified: new Date(a.dateISO),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const mdxPosts = getAllPosts();
    const mdxUrls = mdxPosts.map(post => ({
      url: `${baseUrl}/insights/${post.slug}`,
      lastModified: new Date(post.meta?.dateISO || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...articleUrls, ...mdxUrls];
  }

  if (id >= 2) {
    // 5. Programmatic SEO Matrix Splitting
    const pseoUrlsData = generatePseoUrls();
    const pseoPublishedDate = new Date('2026-04-01T00:00:00+05:30');
    
    // Chunk URLs based on the id index
    const chunkSize = 1100;
    const chunkIndex = id - 2;
    const chunkData = pseoUrlsData.slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize);

    return chunkData.map(u => {
      const isMr = u.slug.startsWith('mr-');
      const altSlug = isMr ? u.slug.replace(/^mr-/, '') : `mr-${u.slug}`;
      const hasAlternate = pseoUrlsData.some(item => item.slug === altSlug);

      let priority = 0.7;
      const highIntentSilos = ['price-list', 'floor-plan', 'site-visit', 'calculators', 'transactions', 'luxury-pune'];
      const lowIntentSilos = ['competitor', 'battleground'];
      if (highIntentSilos.includes(u.silo)) {
        priority = 0.85;
      } else if (lowIntentSilos.includes(u.silo)) {
        priority = 0.6;
      }

      return {
        url: `${baseUrl}/${u.slug}`,
        lastModified: pseoPublishedDate,
        changeFrequency: 'monthly' as const,
        priority,
        ...(hasAlternate ? {
          alternates: {
            languages: {
              'en': isMr ? `${baseUrl}/${altSlug}` : `${baseUrl}/${u.slug}`,
              'mr': isMr ? `${baseUrl}/${u.slug}` : `${baseUrl}/${altSlug}`,
            }
          }
        } : {})
      };
    });
  }

  return [];
}

import { MetadataRoute } from 'next';
import { projects, articles } from '@/data/master-data';
import { generatePseoUrls } from '@/data/seo-matrix';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.paranjapeblueridge.com';
  
  const projectUrls = projects.flatMap(p => [
    {
      url: `${baseUrl}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          'en': `${baseUrl}/${p.slug}`,
          'mr': `${baseUrl}/mr-${p.slug}`,
        }
      }
    },
    {
      url: `${baseUrl}/mr-${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          'en': `${baseUrl}/${p.slug}`,
          'mr': `${baseUrl}/mr-${p.slug}`,
        }
      }
    }
  ]);

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
  const pseoUrls = pseoUrlsData.map(u => {
    const isMr = u.slug.startsWith('mr-');
    const altSlug = isMr ? u.slug.replace(/^mr-/, '') : `mr-${u.slug}`;
    const hasAlternate = pseoUrlsData.some(item => item.slug === altSlug);

    // Dynamic priority based on search intent of the PSEO silo
    let priority = 0.7;
    const highIntentSilos = ['price-list', 'floor-plan', 'site-visit', 'calculators', 'transactions'];
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

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
      alternates: {
        languages: {
          'en': baseUrl,
          'mr': `${baseUrl}/mr`,
        }
      }
    },
    {
      url: `${baseUrl}/mr`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
      alternates: {
        languages: {
          'en': baseUrl,
          'mr': `${baseUrl}/mr`,
        }
      }
    },
    {
      url: `${baseUrl}/hinjewadi-micro-market`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          'en': `${baseUrl}/hinjewadi-micro-market`,
          'mr': `${baseUrl}/mr-hinjewadi-micro-market`,
        }
      }
    },
    {
      url: `${baseUrl}/mr-hinjewadi-micro-market`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          'en': `${baseUrl}/hinjewadi-micro-market`,
          'mr': `${baseUrl}/mr-hinjewadi-micro-market`,
        }
      }
    },
    // NOTE: /feed.xml and /google-products-feed are NOT indexable HTML pages.
    // They are discoverable via <link rel="alternate"> in the layout, not via sitemap.
  ];

  return [...staticUrls, ...projectUrls, ...configUrls, ...brochureUrls, ...articleUrls, ...pseoUrls];
}

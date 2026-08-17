import { MetadataRoute } from 'next';
import { projects, articles } from '@/data/master-data';
import { generatePseoUrls } from '@/data/seo-matrix';
import { getAllPosts } from '@/utils/mdxUtils';

const baseUrl = 'https://paranjapeblueridge.com';
const staticPublishedDate = new Date();

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

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

export async function getSitemapUrls({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  if (id === 0) return getCoreAndProjectUrls();
  if (id === 1) return getInsightsUrls();
  if (id >= 2) return getPseoUrlsChunk(id - 2);
  
  return [];
}

/**
 * Helper to construct a neat, DRY URL entry with all required language alternates.
 */
function buildUrlEntry(
  slug: string, 
  lastModified: Date,
  changeFrequency: ChangeFreq,
  priority: number,
  hasMarathi: boolean = true,
  omitAlternates: boolean = false
): MetadataRoute.Sitemap[0] {
  const currentUrl = `${baseUrl}${slug ? `/${slug}` : ''}`;

  if (omitAlternates) {
    return {
      url: currentUrl,
      lastModified,
      changeFrequency,
      priority
    };
  }

  const isMr = slug === 'mr' || slug.startsWith('mr-');
  
  const standardSlug = slug === 'mr' ? '' : (isMr ? slug.replace(/^mr-/, '') : slug);
  const marathiSlug = hasMarathi 
    ? (slug === '' ? 'mr' : (isMr ? slug : `mr-${slug}`))
    : standardSlug;
  
  const standardUrl = `${baseUrl}${standardSlug ? `/${standardSlug}` : ''}`;
  const marathiUrl = `${baseUrl}${marathiSlug ? `/${marathiSlug}` : ''}`;

  return {
    url: currentUrl,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        'x-default': standardUrl,
        'en-IN': standardUrl,
        'en-US': standardUrl,
        'en-GB': standardUrl,
        'en-AE': standardUrl,
        'mr-IN': marathiUrl
      }
    }
  };
}

function getCoreAndProjectUrls(): MetadataRoute.Sitemap {
  const staticUrls = [
    buildUrlEntry('', staticPublishedDate, 'daily', 1.0),
    buildUrlEntry('mr', staticPublishedDate, 'daily', 1.0),
    buildUrlEntry('hinjewadi-micro-market', staticPublishedDate, 'weekly', 0.9),
    buildUrlEntry('mr-hinjewadi-micro-market', staticPublishedDate, 'weekly', 0.9),
    buildUrlEntry('insights', staticPublishedDate, 'daily', 0.9, false),
    buildUrlEntry('sovereign-vault', staticPublishedDate, 'weekly', 0.8, false),
    buildUrlEntry('html-sitemap', staticPublishedDate, 'weekly', 0.7, false),
  ];

  const projectUrls = projects.flatMap(p => [
    buildUrlEntry(p.slug, staticPublishedDate, 'weekly', 0.9),
    buildUrlEntry(`mr-${p.slug}`, staticPublishedDate, 'weekly', 0.9)
  ]);

  const configUrls = projects.flatMap(p => 
    (p.configurations || []).map(c => 
      buildUrlEntry(`${p.slug}/${c.slug}`, staticPublishedDate, 'weekly', 0.8)
    )
  );

  const brochureUrls = projects.map(p => 
    buildUrlEntry(`brochure/${p.slug}`, staticPublishedDate, 'monthly', 0.6, false)
  );

  return [...staticUrls, ...projectUrls, ...configUrls, ...brochureUrls];
}

function getInsightsUrls(): MetadataRoute.Sitemap {
  const articleUrls = articles.map(a => 
    buildUrlEntry(`insights/${a.slug}`, new Date(a.dateISO), 'weekly', 0.8, false)
  );

  const mdxPosts = getAllPosts();
  const mdxUrls = mdxPosts.map(post => 
    buildUrlEntry(`insights/${post.slug}`, new Date(post.meta?.dateISO || staticPublishedDate), 'weekly', 0.8, false)
  );

  return [...articleUrls, ...mdxUrls];
}

function getPseoUrlsChunk(chunkIndex: number): MetadataRoute.Sitemap {
  const pseoUrlsData = generatePseoUrls();
  const pseoPublishedDate = new Date('2026-04-01T00:00:00+05:30');
  
  const chunkSize = 1100;
  const chunkData = pseoUrlsData.slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize);

  const highIntentSilos = ['price-list', 'floor-plan', 'site-visit', 'calculators', 'transactions', 'luxury-pune', 'nri', 'duplex-simplex', 'pune-micro-market', 'luxury-ecosystem', 'branded', 'investor', 'corporate'];
  const lowIntentSilos = ['competitor', 'battleground'];

  return chunkData.map(u => {
    const isMr = u.slug.startsWith('mr-');
    const altSlug = isMr ? u.slug.replace(/^mr-/, '') : `mr-${u.slug}`;
    const hasAlternate = pseoUrlsData.some(item => item.slug === altSlug);

    let priority = 0.7;
    if (highIntentSilos.includes(u.silo)) {
      priority = 0.85;
    } else if (lowIntentSilos.includes(u.silo)) {
      priority = 0.6;
    }

    return buildUrlEntry(u.slug, pseoPublishedDate, 'monthly', priority, hasAlternate, !hasAlternate);
  });
}

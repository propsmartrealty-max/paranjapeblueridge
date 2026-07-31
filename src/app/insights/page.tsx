import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/utils/mdxUtils';
import { articles } from '@/data/master-data';
import Navbar from '@/components/Navbar';

const SITE_URL = 'https://www.paranjapeblueridge.com';

export const metadata: Metadata = {
  title: 'Insights & Research — Paranjape Blue Ridge Hinjewadi | Real Estate Intelligence',
  description:
    'Expert insights on Paranjape Blue Ridge Hinjewadi: price trends, Metro Line 3 impact, school guides, NRI investment strategies, and deep-dives into Pune\'s most sought-after integrated township.',
  alternates: {
    canonical: `${SITE_URL}/insights`,
  },
  openGraph: {
    title: 'Blue Ridge Insights — Real Estate Intelligence for Hinjewadi Pune',
    description:
      'Deep research, price guides, metro impact analysis, and expert opinions on Paranjape Blue Ridge and Hinjewadi real estate.',
    url: `${SITE_URL}/insights`,
    type: 'website',
    siteName: 'Paranjape Blue Ridge Sovereign Portal',
    images: [
      {
        url: `${SITE_URL}/api/og?title=Blue+Ridge+Insights&type=Research+Hub`,
        width: 1200,
        height: 630,
        alt: 'Paranjape Blue Ridge Insights & Research Hub',
      },
    ],
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  'Investment Analysis': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Price Guide': 'bg-green-500/20 text-green-300 border-green-500/30',
  'Infrastructure': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Lifestyle': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Education': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'NRI Guide': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || 'bg-gold/20 text-gold border-gold/30';
}

export default function InsightsIndexPage() {
  const mdxPosts = getAllPosts();

  // Merge MDX and static articles, deduplicate by slug
  const allArticleMap = new Map<
    string,
    { slug: string; title: string; excerpt: string; dateISO: string; date?: string; category: string; author: string }
  >();

  // Add MDX posts first (higher quality)
  for (const post of mdxPosts) {
    if (!post) continue;
    allArticleMap.set(post.slug, {
      slug: post.slug,
      title: post.meta.title || '',
      excerpt: post.meta.excerpt || '',
      dateISO: post.meta.dateISO || '',
      date: post.meta.date || post.meta.dateISO?.slice(0, 10) || '',
      category: post.meta.category || 'Insights',
      author: post.meta.author || 'Blue Ridge Advisory Team',
    });
  }

  // Add static articles that aren't already in the map
  for (const a of articles) {
    if (!allArticleMap.has(a.slug)) {
      allArticleMap.set(a.slug, {
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        dateISO: a.dateISO,
        date: a.date,
        category: a.category,
        author: a.author,
      });
    }
  }

  const allArticles = Array.from(allArticleMap.values()).sort(
    (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
  );

  // JSON-LD for the insights hub
  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/insights#collectionpage`,
    name: 'Blue Ridge Insights — Real Estate Research Hub',
    description:
      'Expert insights, price guides, metro impact analysis, and investment research for Paranjape Blue Ridge Hinjewadi.',
    url: `${SITE_URL}/insights`,
    publisher: {
      '@type': 'Organization',
      name: 'Paranjape Schemes (Construction) Ltd.',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/images/paranjape-logo.svg`,
        width: 300,
        height: 60,
      },
    },
    hasPart: allArticles.slice(0, 10).map((a) => ({
      '@type': 'NewsArticle',
      headline: a.title,
      description: a.excerpt,
      url: `${SITE_URL}/insights/${a.slug}`,
      datePublished: a.dateISO,
      author: { '@type': 'Person', name: a.author },
    })),
  };

  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/95 to-navy" />
        <div className="container relative z-10 max-w-6xl mx-auto px-6">
          <span className="inline-block bg-gold/20 text-gold border border-gold/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6">
            Research Hub
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-warm-white leading-tight mb-6">
            Blue Ridge Insights
          </h1>
          <p className="text-text-light text-lg md:text-xl max-w-2xl leading-relaxed">
            Expert analysis, price guides, infrastructure reports, and investment intelligence for
            Paranjape Blue Ridge and Hinjewadi's premier real estate market.
          </p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="container max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-gold/40 hover:bg-white/8 transition-all duration-300"
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getCategoryColor(article.category)}`}
                  >
                    {article.category}
                  </span>
                </div>
                <h2 className="text-warm-white font-serif text-lg leading-snug mb-3 group-hover:text-gold transition-colors line-clamp-3">
                  {article.title}
                </h2>
                <p className="text-text-light text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-text-light/60 mt-auto pt-4 border-t border-white/5">
                  <span>{article.author}</span>
                  <time dateTime={article.dateISO}>
                    {article.date || article.dateISO?.slice(0, 10)}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
    </main>
  );
}

export const runtime = 'edge';
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles, projects } from '@/data/master-data';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleModalWrapper from '@/components/ArticleModalWrapper';
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react';
import MarkdownContent from '@/components/MarkdownContent';
import { getPostBySlug } from '@/utils/mdxUtils';
import SemanticRecommender from '@/components/SemanticRecommender';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const mdxPost = getPostBySlug(params.slug);
  const article = mdxPost ? {
    title: mdxPost.meta.title || 'Insight',
    excerpt: mdxPost.meta.excerpt || mdxPost.meta.description || '',
    slug: mdxPost.slug,
    category: mdxPost.meta.category || 'Real Estate',
    dateISO: mdxPost.meta.dateISO || new Date().toISOString(),
    author: mdxPost.meta.author || 'Paranjape Schemes Insights'
  } : articles.find((a) => a.slug === params.slug);

  if (!article) return {};

  const titleStr = article.title || 'Insight';
  const categoryStr = article.category || 'Real Estate';
  const dynamicOgUrl = `https://paranjapeblueridge.com/api/og?title=${encodeURIComponent(titleStr)}&config=${encodeURIComponent(categoryStr)}`;

  return {
    title: `${titleStr} | Paranjape Blue Ridge Hinjewadi`,
    description: article.excerpt,
    alternates: {
      canonical: `https://paranjapeblueridge.com/insights/${article.slug}`,
      languages: {
        'x-default': `https://paranjapeblueridge.com/insights/${article.slug}`,
        'en-IN': `https://paranjapeblueridge.com/insights/${article.slug}`,
        'mr-IN': `https://paranjapeblueridge.com/insights/${article.slug}`,
      }
    },
    openGraph: {
      title: titleStr,
      description: article.excerpt,
      url: `https://paranjapeblueridge.com/insights/${article.slug}`,
      images: [
        {
          url: dynamicOgUrl,
          width: 1200,
          height: 630,
          alt: titleStr,
        },
      ],
      type: 'article',
      publishedTime: article.dateISO,
      authors: [article.author || 'Paranjape Schemes Insights'],
      siteName: 'Paranjape Blue Ridge Sovereign Portal',
    },
    twitter: {
      card: 'summary_large_image',
      title: titleStr,
      description: article.excerpt,
      images: [dynamicOgUrl],
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const mdxPost = getPostBySlug(params.slug);
  const staticArticle = articles.find((a) => a.slug === params.slug);
  
  const article = mdxPost ? {
    title: mdxPost.meta.title || 'Insight',
    excerpt: mdxPost.meta.excerpt || mdxPost.meta.description || '',
    slug: mdxPost.slug,
    category: mdxPost.meta.category || 'Real Estate',
    dateISO: mdxPost.meta.dateISO || new Date().toISOString(),
    date: mdxPost.meta.date || (mdxPost.meta.dateISO ? new Date(mdxPost.meta.dateISO).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'),
    author: mdxPost.meta.author || 'Paranjape Schemes Insights',
    content: mdxPost.content,
    isMdx: true
  } : staticArticle ? {
    ...staticArticle,
    isMdx: false
  } : null;

  if (!article) return notFound();

  const titleStr = article.title || 'Insight';
  const categoryStr = article.category || 'Real Estate';
  const dynamicOgUrl = `https://paranjapeblueridge.com/api/og?title=${encodeURIComponent(titleStr)}&config=${encodeURIComponent(categoryStr)}`;

  const readTime = article.isMdx 
    ? Math.ceil((article.content as string).split(' ').length / 200)
    : Math.ceil((article.content as string[]).join(' ').split(' ').length / 200);

  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />

      {/* ARTICLE HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/95 to-navy" />
        </div>

        <div className="container relative z-10 max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Insights', href: '/#blogs' },
              { label: titleStr, href: `/insights/${article.slug}` }
            ]}
          />

          <div className="flex items-center gap-4 mt-8 mb-6">
            <span className="bg-gold text-navy text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {categoryStr}
            </span>
          </div>

          <h1 id="speakable-title" className="text-4xl sm:text-5xl md:text-6xl font-serif text-warm-white leading-tight mb-8">
            {titleStr}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-text-light text-sm">
            <div className="flex items-center gap-2">
              <User size={14} className="text-gold" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gold" />
              <time dateTime={article.dateISO}>{article.date}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gold" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article className="container max-w-4xl mx-auto pb-24">
        <div className="prose prose-invert prose-lg max-w-none prose-a:text-gold hover:prose-a:text-gold-light prose-img:rounded-2xl">
          {article.isMdx ? (
            <MarkdownContent content={article.content as string} />
          ) : (
            (article.content as string[]).map((paragraph, i) => (
              <p
                key={i}
                id={i === 0 ? "speakable-summary" : undefined}
                className="text-text-light text-lg leading-relaxed mb-8"
              >
                {paragraph}
              </p>
            ))
          )}
        </div>

        {/* CLIENT INTERACTION CTA BANNER */}
        <ArticleModalWrapper />

        {/* SEMANTIC RECOMMENDER */}
        <SemanticRecommender currentSlug={article.slug} silo={categoryStr.toLowerCase().replace(/\s+/g, '-')} />

        {/* JSON-LD Article Schema (server-rendered dynamic graph) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "NewsArticle",
                  "@id": `https://paranjapeblueridge.com/insights/${article.slug}#article`,
                  "headline": titleStr,
                  "description": article.excerpt,
                  "datePublished": article.dateISO,
                  "dateModified": article.dateISO,
                  "inLanguage": "en-IN",
                  "author": { "@id": "https://paranjapeblueridge.com/#organization" },
                  "publisher": { "@id": "https://paranjapeblueridge.com/#organization" },
                  "about": [
                    { "@type": "Place", "name": "Pune", "sameAs": "https://www.wikidata.org/wiki/Q1538" },
                    { "@type": "Place", "name": "Hinjawadi", "sameAs": "https://www.wikidata.org/wiki/Q5766258" }
                  ],
                  "mentions": [
                    { "@type": "Thing", "name": "Real Estate", "sameAs": "https://www.wikidata.org/wiki/Q646243" }
                  ],
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://paranjapeblueridge.com/insights/${article.slug}`
                  },
                  "image": [
                    {
                      "@type": "ImageObject",
                      "url": dynamicOgUrl,
                      "width": 1200,
                      "height": 630
                    }
                  ],
                  "articleSection": categoryStr,
                  "keywords": ["Paranjape Blue Ridge", "Hinjewadi real estate", categoryStr, "Blue Ridge Pune"],
                  "articleBody": article.isMdx ? (article.content as string).slice(0, 500) : (article.content as string[]).join(" ").slice(0, 500),
                  "wordCount": article.isMdx ? (article.content as string).split(/\s+/).filter(Boolean).length : (article.content as string[]).join(" ").split(/\s+/).filter(Boolean).length,
                  "isPartOf": {
                    "@type": "WebSite",
                    "@id": "https://paranjapeblueridge.com/#website",
                    "name": "Paranjape Blue Ridge Sovereign Portal",
                    "url": "https://paranjapeblueridge.com"
                  },
                  "speakable": {
                    "@type": "SpeakableSpecification",
                    "cssSelector": ["#speakable-title", "#speakable-summary"]
                  }
                }
              ]
            })
          }}
        />
      </article>
    </main>
  );
}

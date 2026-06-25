import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { articles, projects } from '@/data/master-data';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleModalWrapper from '@/components/ArticleModalWrapper';
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/utils/mdxUtils';
import ReactMarkdown from 'react-markdown';
import SemanticRecommender from '@/components/SemanticRecommender';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const mdxPosts = getAllPosts();
  const mdxSlugs = mdxPosts.map((p) => ({ slug: p?.slug || '' }));
  
  const staticSlugs = articles.map((article) => ({
    slug: article.slug,
  }));

  // Combine and deduplicate
  const allSlugs = [...mdxSlugs, ...staticSlugs].filter(
    (v, i, a) => a.findIndex((t) => t.slug === v.slug) === i && v.slug !== ''
  );
  return allSlugs;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const mdxPost = getPostBySlug(params.slug);
  const article = mdxPost ? {
    title: mdxPost.meta.title,
    excerpt: mdxPost.meta.excerpt,
    slug: mdxPost.slug,
    category: mdxPost.meta.category,
    dateISO: mdxPost.meta.dateISO,
    author: mdxPost.meta.author
  } : articles.find((a) => a.slug === params.slug);

  if (!article) return {};

  const dynamicOgUrl = `https://www.paranjapeblueridge.com/api/og?title=${encodeURIComponent(article.title)}&config=${encodeURIComponent(article.category)}`;

  return {
    title: `${article.title} | Paranjape Blue Ridge Hinjewadi`,
    description: article.excerpt,
    alternates: {
      canonical: `https://www.paranjapeblueridge.com/insights/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://www.paranjapeblueridge.com/insights/${article.slug}`,
      images: [
        {
          url: dynamicOgUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
      publishedTime: article.dateISO,
      authors: [article.author],
      siteName: 'Paranjape Blue Ridge Sovereign Portal',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [dynamicOgUrl],
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const mdxPost = getPostBySlug(params.slug);
  const staticArticle = articles.find((a) => a.slug === params.slug);
  
  const article = mdxPost ? {
    title: mdxPost.meta.title,
    excerpt: mdxPost.meta.excerpt,
    slug: mdxPost.slug,
    category: mdxPost.meta.category,
    dateISO: mdxPost.meta.dateISO,
    date: mdxPost.meta.date,
    author: mdxPost.meta.author,
    content: mdxPost.content,
    isMdx: true
  } : staticArticle ? {
    ...staticArticle,
    isMdx: false
  } : null;

  if (!article) return notFound();

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
              { label: article.title, href: `/insights/${article.slug}` }
            ]}
          />

          <div className="flex items-center gap-4 mt-8 mb-6">
            <span className="bg-gold text-navy text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {article.category}
            </span>
          </div>

          <h1 id="speakable-title" className="text-4xl sm:text-5xl md:text-6xl font-serif text-warm-white leading-tight mb-8">
            {article.title}
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
            <ReactMarkdown>{article.content as string}</ReactMarkdown>
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
        <SemanticRecommender currentSlug={article.slug} silo={article.category ? (article.category as string).toLowerCase().replace(/\s+/g, '-') : 'news'} />

        {/* JSON-LD Article Schema (server-rendered dynamic graph) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "NewsArticle",
                  "@id": `https://www.paranjapeblueridge.com/insights/${article.slug}#article`,
                  "headline": article.title,
                  "description": article.excerpt,
                  "datePublished": article.dateISO,
                  "dateModified": article.dateISO,
                  "author": { "@type": "Person", "name": article.author },
                  "publisher": {
                    "@type": "Organization",
                    "name": "Paranjape Schemes (Construction) Ltd.",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://www.paranjapeblueridge.com/assets/images/paranjape-logo.svg"
                    }
                  },
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": `https://www.paranjapeblueridge.com/insights/${article.slug}`
                  },
                  "image": `https://www.paranjapeblueridge.com/api/og?title=${encodeURIComponent(article.title)}&config=${encodeURIComponent(article.category)}`,
                  "articleSection": article.category,
                  "keywords": ["Paranjape Blue Ridge", "Hinjewadi real estate", article.category, "Blue Ridge Pune"],
                  "articleBody": article.isMdx ? (article.content as string).slice(0, 200) : (article.content as string[]).join(" "),
                  "wordCount": article.isMdx ? (article.content as string).split(/\s+/).filter(Boolean).length : (article.content as string[]).join(" ").split(/\s+/).filter(Boolean).length,
                  "speakable": {
                    "@type": "SpeakableSpecification",
                    "xpath": [
                      "/html/head/title",
                      "/html/head/meta[@name='description']/@content"
                    ]
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

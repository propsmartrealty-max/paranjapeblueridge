import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { generatePseoUrls } from '@/data/seo-matrix';
import { projects, articles } from '@/data/master-data';
import { getAllPosts } from '@/utils/mdxUtils';

export const metadata: Metadata = {
  title: 'Complete Property Sitemap | Paranjape Blue Ridge',
  description: 'Explore the complete directory of all configurations, locations, and premium real estate properties at Paranjape Blue Ridge Hinjewadi, Pune.',
  alternates: {
    canonical: 'https://www.paranjapeblueridge.com/html-sitemap',
  }
};

export default function HTMLSitemap() {
  const pseoUrls = generatePseoUrls();
  const mdxPosts = getAllPosts();

  // Group PSEO URLs by Silo
  const groupedPseo = pseoUrls.reduce((acc, curr) => {
    if (!acc[curr.silo]) {
      acc[curr.silo] = [];
    }
    acc[curr.silo].push(curr);
    return acc;
  }, {} as Record<string, Array<{ slug: string; title: string; intent: string; type: string; silo: string }>>);

  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />

      <section className="pt-32 pb-20 bg-navy">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-warm-white mb-6">Property Sitemap</h1>
          <p className="text-text-light text-lg mb-12 max-w-3xl">
            A complete directory of all premium real estate offerings, configurations, and insights at Paranjape Blue Ridge.
          </p>

          <div className="space-y-16">
            
            {/* 1. Core Projects */}
            <div>
              <h2 className="text-2xl font-serif text-gold mb-6 border-b border-gold/20 pb-2">Core Residential Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <Link key={project.slug} href={`/${project.slug}`} className="text-warm-white hover:text-gold transition-colors text-sm">
                    {project.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. Insights & Articles */}
            <div>
              <h2 className="text-2xl font-serif text-gold mb-6 border-b border-gold/20 pb-2">Real Estate Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article) => (
                  <Link key={article.slug} href={`/insights/${article.slug}`} className="text-warm-white hover:text-gold transition-colors text-sm">
                    {article.title}
                  </Link>
                ))}
                {mdxPosts.map((post) => (
                  <Link key={post.slug} href={`/insights/${post.slug}`} className="text-warm-white hover:text-gold transition-colors text-sm">
                    {post.meta.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Programmatic SEO Categories (The 2000+ variants) */}
            <div>
              <h2 className="text-2xl font-serif text-gold mb-6 border-b border-gold/20 pb-2">Targeted Search Categories</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {(Object.entries(groupedPseo) as [string, Array<{ slug: string; title: string; intent: string; type: string; silo: string }>][]).map(([silo, items]) => (
                  <div key={silo} className="flex flex-col">
                    <h3 className="text-lg font-bold text-warm-white mb-4 capitalize tracking-wide">
                      {silo.replace(/-/g, ' ')}
                    </h3>
                    <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent">
                      {items.map((item) => (
                        <li key={item.slug}>
                          <Link href={`/${item.slug}`} className="text-xs text-text-light hover:text-gold transition-colors block py-1">
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

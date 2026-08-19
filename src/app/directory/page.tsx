import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { longTailUrls } from '@/data/seo-matrix';
import { projects, articles } from '@/data/master-data';
import { getAllPosts } from '@/utils/mdxUtils';

export const metadata: Metadata = {
  title: 'Pune Real Estate Directory | Paranjape Blue Ridge',
  description: 'Explore the definitive master directory of over 94,000 premium real estate properties, configurations, and insights across the entire Pune market.',
  alternates: {
    canonical: 'https://paranjapeblueridge.com/directory',
  }
};

export default function DirectoryHub() {
  const pseoUrls = longTailUrls;
  const mdxPosts = getAllPosts();
  
  const CHUNK_SIZE = 1000;
  const totalChunks = Math.ceil(pseoUrls.length / CHUNK_SIZE);
  const chunksArray = Array.from({ length: totalChunks }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />

      <section className="pt-32 pb-20 bg-navy">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-warm-white mb-6">Pune Real Estate Directory</h1>
          <p className="text-text-light text-lg mb-12 max-w-3xl">
            A comprehensive, structured index of over {pseoUrls.length.toLocaleString()} premium real estate properties, micro-markets, and configurations at Paranjape Blue Ridge Hinjewadi, Pune.
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

            {/* 3. Paginated Directory Indices */}
            <div>
              <h2 className="text-2xl font-serif text-gold mb-6 border-b border-gold/20 pb-2">Complete Property Index</h2>
              <p className="text-sm text-text-light mb-6">
                Navigate our extensive database of properties, categorized into structured blocks for easy browsing.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {chunksArray.map((pageNum) => {
                  const startRange = ((pageNum - 1) * CHUNK_SIZE) + 1;
                  const endRange = Math.min(pageNum * CHUNK_SIZE, pseoUrls.length);
                  return (
                    <Link 
                      key={pageNum} 
                      href={`/directory/${pageNum}`} 
                      className="bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-gold/10 transition-all rounded-lg p-4 text-center group"
                    >
                      <h3 className="text-gold font-bold mb-1 group-hover:text-warm-white transition-colors">Part {pageNum}</h3>
                      <p className="text-[10px] text-text-light uppercase tracking-widest">
                        {startRange.toLocaleString()} - {endRange.toLocaleString()}
                      </p>
                    </Link>
                  )
                })}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

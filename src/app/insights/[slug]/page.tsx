"use client";

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { articles, projects } from '@/data/master-data';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import EnquiryModal from '@/components/EnquiryModal';
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsModalOpen(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (!article) return notFound();

  const readTime = Math.ceil(article.content.join(' ').split(' ').length / 200);

  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

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

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-warm-white leading-tight mb-8">
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
        <div className="prose prose-invert prose-lg max-w-none">
          {article.content.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="text-text-light text-lg leading-relaxed mb-8"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* CTA BANNER */}
        <div className="mt-16 p-8 sm:p-12 bg-gold/5 border border-gold/20 rounded-[2rem] text-center">
          <h3 className="text-2xl sm:text-3xl font-serif text-warm-white mb-4">
            Interested in <span className="italic text-gilded">Blue Ridge</span>?
          </h3>
          <p className="text-text-light mb-8 max-w-lg mx-auto">
            Get exclusive pricing, floor plans, and schedule a private site visit to Paranjape Blue Ridge Hinjewadi.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gold text-navy px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl gold-glow"
          >
            Request Details Now
          </button>
        </div>

        {/* RELATED PROJECTS */}
        <div className="mt-20 border-t border-white/5 pt-16">
          <h3 className="text-gold font-bold tracking-[6px] uppercase text-[10px] mb-8">Explore Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/${project.slug}`}
                className="group p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-gold/30 transition-all"
              >
                <h4 className="text-warm-white font-serif text-lg group-hover:text-gold transition-colors mb-2">
                  {project.name}
                </h4>
                <p className="text-[10px] text-gold uppercase tracking-widest font-bold mb-3">{project.tagline}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-light">{project.price}</span>
                  <ArrowRight size={14} className="text-gold/30 group-hover:text-gold transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* MORE ARTICLES */}
        <div className="mt-16 border-t border-white/5 pt-16">
          <h3 className="text-gold font-bold tracking-[6px] uppercase text-[10px] mb-8">More Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.filter(a => a.slug !== slug).slice(0, 4).map((a) => (
              <Link
                key={a.slug}
                href={`/insights/${a.slug}`}
                className="group flex items-start gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-gold/30 transition-all"
              >
                <Tag size={16} className="text-gold mt-1 shrink-0" />
                <div>
                  <span className="text-[8px] text-gold uppercase tracking-widest block mb-1">{a.category}</span>
                  <span className="text-sm text-warm-white group-hover:text-gold transition-colors">{a.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* JSON-LD Article Schema (client-side supplement) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": article.title,
              "description": article.excerpt,
              "author": { "@type": "Organization", "name": article.author },
              "publisher": {
                "@type": "Organization",
                "name": "Paranjape Blue Ridge Sovereign Portal",
                "logo": { "@type": "ImageObject", "url": "https://www.paranjapeblueridge.com/favicon.png" }
              },
              "datePublished": article.dateISO,
              "dateModified": article.dateISO,
              "mainEntityOfPage": `https://www.paranjapeblueridge.com/insights/${article.slug}`,
              "image": "https://www.paranjapeblueridge.com/assets/images/township-night.png"
            })
          }}
        />
      </article>
    </main>
  );
}

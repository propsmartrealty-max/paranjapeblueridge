"use client";

import React from 'react';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { journalArticles } from '@/data/cms/journal';

export default function JournalPreviewSection() {
  return (
    <section id="journal" className="py-24 sm:py-32 bg-[#060911] relative overflow-hidden border-t border-white/[0.06]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-champagne block mb-3">
              Editorial Perspectives
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-ivory tracking-tight leading-[1.08]">
              The Blue Ridge <br />
              <span className="italic font-light text-gradient-champagne">Journal.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-stone-light leading-relaxed font-sans font-light">
              Essays on luxury biophilic architecture, West Pune macroeconomic trends, infrastructure convergence, and generational living.
            </p>
          </div>

          <a
            href="/journal"
            className="inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase text-champagne hover:text-champagne-light no-underline"
          >
            <span>Explore All Essays</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalArticles.map((article) => (
            <article
              key={article.id}
              className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-champagne/40 transition-all duration-300 flex flex-col justify-between group shadow-glass"
            >
              <div>
                {/* Meta */}
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-stone mb-4">
                  <span className="text-champagne font-semibold">{article.category}</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {article.readingTime}</span>
                </div>

                <h3 className="text-xl font-serif text-ivory font-medium leading-snug group-hover:text-champagne transition-colors mb-4">
                  {article.title}
                </h3>

                <p className="text-xs text-stone-light leading-relaxed font-sans font-light line-clamp-4 mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone">{article.publishedDate}</span>
                <a
                  href={`/insights/${article.slug}`}
                  className="text-xs font-sans font-semibold uppercase tracking-wider text-champagne flex items-center gap-1 group-hover:translate-x-1 transition-transform no-underline"
                >
                  <span>Read Analysis</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from 'react';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { journalArticles } from '@/data/cms/journal';

export default function JournalPreviewSection() {
  return (
    <section id="journal" className="py-24 sm:py-32 bg-[#FAF9F6] relative overflow-hidden border-t border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="chapter-badge mb-4">
              <span>08 • The Blue Ridge Journal</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#070D1A] tracking-tight leading-[1.08]">
              The Blue Ridge <br />
              <span className="italic font-light text-gradient-champagne">Journal.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed font-sans font-medium">
              Essays on luxury biophilic architecture, West Pune macroeconomic trends, infrastructure convergence, and generational living.
            </p>
          </div>

          <a
            href="/journal"
            className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-wider uppercase text-[#785415] hover:text-[#5a3e0f] no-underline"
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
              className="glass-card-luxury p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Meta */}
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-600 font-medium mb-4">
                  <span className="text-[#785415] font-bold">{article.category}</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {article.readingTime}</span>
                </div>

                <h3 className="text-xl font-serif text-[#070D1A] font-bold leading-snug group-hover:text-[#785415] transition-colors mb-4">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium line-clamp-4 mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-600 font-medium">{article.publishedDate}</span>
                <a
                  href={`/insights/${article.slug}`}
                  className="text-xs font-sans font-bold uppercase tracking-wider text-[#785415] flex items-center gap-1 group-hover:translate-x-1 transition-transform no-underline"
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

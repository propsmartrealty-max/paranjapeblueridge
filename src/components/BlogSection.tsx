"use client";

import React from 'react';
import { articles } from '@/data/master-data';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogSection() {
  return (
    <section id="blogs" className="py-20">
      <div className="flex justify-between items-end mb-16">
        <div>
          <span className="gilded-pill mb-3">Architectural Monograph</span>
          <h2 className="text-3xl sm:text-5xl font-serif text-warm-white mt-4 font-bold">
            Sovereign <span className="italic font-normal text-gilded">Insights</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.slice(0, 3).map((article, idx) => (
          <motion.div 
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <Link 
              href={`/insights/${article.slug}`} 
              className="group cursor-pointer block p-6 ultra-glass-card border border-gold/25 rounded-3xl hover:border-gold/60 transition-all shadow-lg hover:shadow-2xl relative overflow-hidden hud-frame h-full flex flex-col justify-between"
            >
              <div className="luminous-line-gold absolute top-0 left-0 right-0 opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <div>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-gold/20 group-hover:border-gold/40 transition-all duration-500 shadow-md">
                  <Image 
                    src={article.image} 
                    alt={`Paranjape Blue Ridge Real Estate Insights: ${article.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70"></div>
                  <div className="absolute top-3.5 left-3.5 bg-gradient-to-r from-gold via-gold-light to-gold text-navy text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10 shadow-md font-mono">
                    {article.category}
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] text-gold uppercase tracking-[2px] font-bold font-mono">
                    {article.author}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/40"></span>
                  <span className="text-[10px] text-text-muted uppercase tracking-widest font-mono font-medium">
                    <time dateTime={article.dateISO}>{article.date}</time>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif text-warm-white group-hover:text-gold transition-colors mb-3 leading-tight font-bold">{article.title}</h3>
                <p className="text-xs sm:text-sm text-text-muted line-clamp-3 leading-relaxed font-medium">{article.excerpt}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-gold/15 flex items-center justify-between text-gold text-xs font-bold uppercase tracking-widest">
                <span>Read Monograph</span>
                <span className="group-hover:translate-x-1.5 transition-transform">→</span>
              </div>
              <div className="luminous-line-gold absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-40 transition-opacity"></div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

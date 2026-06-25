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
          <span className="text-gold font-bold tracking-[6px] uppercase text-[10px] sm:text-xs">Architectural Monograph</span>
          <h2 className="text-3xl sm:text-5xl font-serif text-warm-white mt-4">Sovereign <span className="italic font-normal text-gold">Insights</span></h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {articles.slice(0, 3).map((article, idx) => (
          <motion.div 
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <Link href={`/insights/${article.slug}`} className="group cursor-pointer block">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-gold/30 transition-all duration-500">
                <Image 
                  src={article.image} 
                  alt={`Paranjape Blue Ridge Real Estate Insights: ${article.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 bg-gold text-navy text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest z-10 shadow-lg">
                  {article.category}
                </div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] text-gold uppercase tracking-[2px] font-bold">
                  {article.author}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                <span className="text-[10px] text-text-light uppercase tracking-widest">
                  <time dateTime={article.dateISO}>{article.date}</time>
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-warm-white group-hover:text-gold transition-colors mb-4 leading-tight">{article.title}</h3>
              <p className="text-sm text-text-light line-clamp-2 leading-relaxed opacity-80">{article.excerpt}</p>
              <div className="mt-6 flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                Read Monograph <span>→</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

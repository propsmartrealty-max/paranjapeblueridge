"use client";

import React from 'react';
import { blogs } from '@/data/master-data';
import { motion } from 'framer-motion';

export default function BlogSection() {
  return (
    <section id="blogs" className="py-20">
      <div className="flex justify-between items-end mb-16">
        <div>
          <span className="text-gold font-bold tracking-[6px] uppercase text-xs">Insight Library</span>
          <h2 className="text-5xl font-serif text-warm-white mt-4">Developer <span className="italic font-normal text-gold">Journals</span></h2>
        </div>
        <a href="#" className="text-gold text-sm font-bold uppercase tracking-widest border-b border-gold/30 pb-2 hover:border-gold transition-all">View All Articles</a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {blogs.map((blog, idx) => (
          <motion.div 
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/5">
              <div className="absolute inset-0 bg-gold/10 group-hover:bg-transparent transition-colors duration-500"></div>
              <div className="absolute top-4 left-4 bg-gold text-navy text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-10">
                {blog.category}
              </div>
            </div>
            <span className="text-[10px] text-text-light uppercase tracking-widest mb-3 block">{blog.date}</span>
            <h3 className="text-xl font-serif text-warm-white group-hover:text-gold transition-colors mb-4 leading-snug">{blog.title}</h3>
            <p className="text-sm text-text-light line-clamp-2 leading-relaxed">{blog.excerpt}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

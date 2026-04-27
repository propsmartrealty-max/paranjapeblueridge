"use client";

import React from 'react';
import { corporateMatrix } from '@/data/master-data';
import { motion } from 'framer-motion';
import { MapPin, Clock, Building2 } from 'lucide-react';

export default function InvestmentMatrix() {
  return (
    <section className="py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <span className="text-gold font-bold tracking-[6px] uppercase text-[10px]">Corporate Proximity Engine</span>
          <h2 className="text-5xl font-serif text-warm-white mt-4">The IT <span className="italic font-normal text-gold">Epicenter</span></h2>
          <p className="text-text-light mt-6 text-lg">Detailed proximity mapping for 800+ IT giants. Blue Ridge offers the industry's highest "Walk-to-Work" score.</p>
        </div>
        <div className="bg-white/5 border border-white/10 px-8 py-6 rounded-2xl">
            <span className="text-4xl font-serif text-gold block">15+</span>
            <span className="text-[10px] text-text-light uppercase tracking-widest">Major IT Campuses within 3 KM</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {corporateMatrix.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-gold/5 hover:border-gold/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                    <Building2 size={18} />
                </div>
                <span className="text-[8px] bg-white/5 text-text-light px-2 py-1 rounded-md uppercase font-bold">{item.hub}</span>
            </div>
            <h4 className="text-warm-white font-bold text-sm mb-4 line-clamp-1 group-hover:text-gold transition-colors">{item.company}</h4>
            
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-text-light">
                    <MapPin size={12} className="text-gold" />
                    <span>{item.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-text-light">
                    <Clock size={12} className="text-gold" />
                    <span>{item.time}</span>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-navy-light/50 border border-white/5 rounded-3xl flex flex-col md:flex-row items-center gap-10">
         <div className="flex-1">
            <h4 className="text-warm-white font-serif text-xl mb-2">Hinjewadi Phase 1 Advantage</h4>
            <p className="text-text-light text-xs leading-relaxed">Unlike Phase 2 or 3, Phase 1 offers the most mature social infrastructure and immediate connectivity to the Mumbai-Pune Expressway, ensuring superior rental yields and capital appreciation.</p>
         </div>
         <div className="flex gap-4">
            <div className="text-center px-6 py-4 bg-navy/50 rounded-2xl border border-white/5">
                <span className="text-2xl font-serif text-gold block">1.5 Lac+</span>
                <span className="text-[8px] text-text-light uppercase tracking-widest">Tech Professionals</span>
            </div>
            <div className="text-center px-6 py-4 bg-navy/50 rounded-2xl border border-white/5">
                <span className="text-2xl font-serif text-gold block">₹ 85K+</span>
                <span className="text-[8px] text-text-light uppercase tracking-widest">Avg. IT Salary in Micro-market</span>
            </div>
         </div>
      </div>
    </section>
  );
}

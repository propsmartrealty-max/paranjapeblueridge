"use client";

import React from 'react';
import { corporateMatrix } from '@/data/master-data';
import { motion } from 'framer-motion';
import { MapPin, Clock, Building2, Briefcase } from 'lucide-react';

export default function InvestmentMatrix() {
  return (
    <section className="py-12" id="corporate-proximity">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="ultra-glass-card border border-gold/25 rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="gilded-pill mb-3">Corporate Proximity Engine</span>
            <h2 className="text-3xl sm:text-5xl font-serif text-warm-white font-bold mt-2">
              The IT <span className="italic font-normal text-gilded">Epicenter</span>
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-3 leading-relaxed">
              Precision walk-to-work mapping for 800+ IT multinationals. Blue Ridge commands the highest rental occupancy in West Pune.
            </p>
          </div>
          <div className="p-4 sm:p-6 bg-gradient-to-br from-gold/15 via-gold/10 to-gold/5 border border-gold/30 rounded-2xl sm:rounded-3xl shadow-md shrink-0">
            <span className="text-3xl sm:text-4xl font-serif text-gold font-bold block leading-none">15+</span>
            <span className="text-[9px] text-text-muted uppercase tracking-widest font-semibold mt-1 block">IT Campuses within 3 KM</span>
          </div>
        </div>

        {/* 5 CORPORATE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {corporateMatrix.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -6, scale: 1.02 }}
              viewport={{ once: true }}
              className="p-5 bg-white/70 dark:bg-slate-900/60 border border-gold/20 rounded-2xl hover:border-gold/60 transition-all group shadow-sm hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-navy transition-all border border-gold/20 shadow-sm">
                  <Building2 size={18} />
                </div>
                <span className="text-[8px] bg-gold/10 text-gold px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">{item.hub}</span>
              </div>
              <h4 className="text-warm-white font-bold text-xs sm:text-sm mb-3 line-clamp-1 group-hover:text-gold transition-colors">{item.company}</h4>
              
              <div className="space-y-1.5 pt-2 border-t border-gold/10">
                <div className="flex items-center justify-between text-[10px] text-text-muted">
                  <span className="flex items-center gap-1.5"><MapPin size={11} className="text-gold" /> Distance</span>
                  <strong className="font-mono text-warm-white">{item.distance}</strong>
                </div>
                <div className="flex items-center justify-between text-[10px] text-text-muted">
                  <span className="flex items-center gap-1.5"><Clock size={11} className="text-gold" /> Drive Time</span>
                  <strong className="font-mono text-gold">{item.time}</strong>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PHASE 1 ADVANTAGE BANNER */}
        <div className="mt-10 p-6 sm:p-8 bg-gold/5 border border-gold/20 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-6 shadow-inner">
          <div className="flex-1">
            <h4 className="text-warm-white font-serif text-lg sm:text-xl font-bold mb-1.5">Hinjewadi Phase 1 Micro-Market Monopoly</h4>
            <p className="text-text-muted text-xs sm:text-sm leading-relaxed">
              Unlike Phase 2 or 3, Phase 1 offers mature social infrastructure, established schools, and immediate connectivity to the Mumbai-Pune Expressway, ensuring unmatched capital appreciation and steady rental yields.
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <div className="text-center px-5 py-3.5 bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-gold/25 shadow-sm">
              <span className="text-xl sm:text-2xl font-serif text-gold font-bold block">1.5 Lac+</span>
              <span className="text-[8px] sm:text-[9px] text-text-muted uppercase tracking-widest font-semibold">Tech Professionals</span>
            </div>
            <div className="text-center px-5 py-3.5 bg-white/70 dark:bg-slate-900/70 rounded-2xl border border-gold/25 shadow-sm">
              <span className="text-xl sm:text-2xl font-serif text-emerald-600 dark:text-emerald-400 font-bold block">₹ 85K+</span>
              <span className="text-[8px] sm:text-[9px] text-text-muted uppercase tracking-widest font-semibold">Avg. IT Salary</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

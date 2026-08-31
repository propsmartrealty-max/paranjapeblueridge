"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, MapPin, Globe, ArrowRight, ShieldCheck } from 'lucide-react';

export default function IntelligenceHub() {
  const insights = [
    {
      title: "Rental Yield Surge",
      value: "4.8% - 5.5%",
      description: "Average annual rental yield for 2 & 3 BHK units in Blue Ridge Phase 1.",
      icon: TrendingUp
    },
    {
      title: "Capital Appreciation",
      value: "+12.4% / yr",
      description: "Year-on-year capital growth following the Line 3 Metro transit integration.",
      icon: BarChart3
    },
    {
      title: "Commute Efficiency",
      value: "Zero Mins",
      description: "The only integrated township with walk-to-work pedestrian corridors to Phase 1 SEZ.",
      icon: MapPin
    },
    {
      title: "Global NRI Demand",
      value: "+38% Surge",
      description: "Direct investment inflow from UAE, UK, Singapore, and US tech corridors.",
      icon: Globe
    }
  ];

  return (
    <section id="market-hub" className="py-24">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="ultra-glass-card border border-gold/25 rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="gilded-pill mb-3">Sovereign Data Engine</span>
            <h2 className="text-3xl sm:text-5xl font-serif text-warm-white font-bold mt-2">
              Buyer <span className="italic font-normal text-gilded">Intelligence</span> Hub
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-text-muted max-w-md leading-relaxed">
            Data-backed analytics derived directly from West Pune's micro-market transactions and demographic occupancy patterns.
          </p>
        </div>

        {/* 4 ELEVATED METRIC TILES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 bg-gradient-to-b from-white/90 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 border border-gold/20 rounded-3xl relative overflow-hidden shadow-lg hover:shadow-2xl hover:border-gold/60 transition-all group flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-gold-light to-gold"></div>

              <div>
                <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-6 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy transition-all border border-gold/20 shadow-sm">
                  <item.icon size={22} />
                </div>
                <div className="text-2xl sm:text-3xl font-serif text-warm-white font-bold mb-1">{item.value}</div>
                <h4 className="text-[10px] text-gold font-bold uppercase tracking-widest mb-3">{item.title}</h4>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* DEEP DIVE FEATURE */}
        <div className="mt-12 p-8 sm:p-10 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 border border-gold/25 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-inner">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold">Institutional Grade Research</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-warm-white font-bold mb-3">
              Infrastructure Surge: Hinjewadi Metro Line 3
            </h3>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-2xl">
              The elevated Line 3 connects Hinjewadi directly to Shivajinagar CBD. With the Blue Ridge station situated within 800m, capital values are forecasted to sustain double-digit growth through 2028.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 shrink-0">
            <div className="text-center p-5 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-gold/30 shadow-md">
              <div className="text-3xl sm:text-4xl font-serif text-gold font-bold">98.2%</div>
              <span className="text-[9px] text-text-muted uppercase tracking-widest font-semibold block mt-0.5">Township Occupancy</span>
            </div>
            <a 
              href="#enquiry" 
              className="px-8 py-4 bg-gradient-to-r from-gold via-gold-light to-gold text-navy rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl hover:shadow-gold/30 shrink-0 text-center"
            >
              Get Free Market Report
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

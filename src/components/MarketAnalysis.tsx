"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Building2, TrainFront, ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function MarketAnalysis() {
  const { t } = useLanguage();
  const [scenario, setScenario] = useState<'rental' | 'appreciation' | 'combined'>('appreciation');

  const stats = [
    { label: t("IT Professionals", "आयटी व्यावसायिक"), val: "800+ Companies", icon: Building2, detail: t("Infosys, Wipro, TCS campuses in 2km radius", "इन्फोसिस, विप्रो, टीसीएस कॅम्पस २ किमी परिसरात") },
    { label: t("Transit Connect", "ट्रान्झिट कनेक्टिव्हिटी"), val: "Line 3 Metro", icon: TrainFront, detail: t("Elevated Metro Station 800m away", "८०० मीटर अंतरावर उन्नत मेट्रो स्टेशन") },
    { label: t("Market Growth", "मार्केट ग्रोथ"), val: "12% CAGR", icon: TrendingUp, detail: t("Highest capital appreciation in West Pune", "पश्चिम पुण्यातील सर्वोच्च भांडवली वाढ") },
    { label: t("Resident Base", "रहिवासी आधार"), val: "3,000+ Families", icon: Users, detail: t("Thriving corporate executive community", "सधन कॉर्पोरेट आणि एनआरआय समुदाय") }
  ];

  const distances = [
    { name: "Infosys & Wipro Campuses", dist: "1.5 KM", time: "4 Mins" },
    { name: "Pune Metro Line 3 Station", dist: "0.8 KM", time: "2 Mins" },
    { name: "Mumbai-Pune Expressway Gateway", dist: "4.5 KM", time: "8 Mins" },
    { name: "Quadron & Embassy Tech Zone", dist: "2.0 KM", time: "5 Mins" },
    { name: "Blue Ridge Public School (ICSE)", dist: "0.0 KM", time: "Inside Campus" }
  ];

  return (
    <section id="market" className="py-24">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="ultra-glass-card border border-gold/30 rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-12 shadow-2xl relative overflow-hidden hud-frame"
      >
        <div className="luminous-line-gold absolute top-0 left-0 right-0 opacity-40"></div>
        <div className="text-center mb-16">
          <span className="gilded-pill mb-4">Micro-Market Analysis</span>
          <h2 className="text-3xl sm:text-5xl font-serif text-warm-white mt-4 font-bold">
            Why Blue Ridge is <span className="italic font-normal text-gilded">Dominant</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-text-muted max-w-2xl mx-auto mt-4 leading-relaxed font-medium">
            Analyzing the West Pune real estate landscape: Proximity to the Hinjewadi IT corridor and self-contained township infrastructure makes Blue Ridge the preferred choice for elite corporate professionals.
          </p>
        </div>

        {/* 4 ELEVATED FLOATING METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ y: 25, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 bg-gradient-to-b from-white/95 to-white/70 dark:from-slate-800/90 dark:to-slate-900/90 border border-gold/30 rounded-3xl shadow-lg hover:shadow-2xl hover:border-gold/60 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-gold-light to-gold"></div>
              
              <div className="w-12 h-12 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-6 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy transition-all border border-gold/25 shadow-sm">
                <s.icon size={22} />
              </div>
              <span className="text-2xl sm:text-3xl font-serif text-warm-white font-bold block mb-1">{s.val}</span>
              <span className="text-[10px] text-gold font-bold uppercase tracking-widest block mb-3 font-mono">{s.label}</span>
              <p className="text-xs text-text-muted leading-relaxed font-medium">{s.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* DUAL PANELS: WALK TO WORK + ROI FORECASTER */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* WALK TO WORK ADVANTAGE */}
          <div className="p-6 sm:p-8 bg-gold/5 border border-gold/25 rounded-3xl shadow-inner flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-gold" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold font-mono">Location Advantage</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-warm-white font-bold mb-6">The Zero-Commute Lifestyle</h3>
            </div>

            <div className="space-y-3">
              {distances.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3.5 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-gold/20 shadow-sm hover:border-gold/50 transition-all">
                  <span className="text-xs sm:text-sm font-semibold text-warm-white">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-gold">{item.dist}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-gold/10 text-gold uppercase tracking-wider font-semibold">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SOVEREIGN ROI FORECASTER */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-white/95 to-white/70 dark:from-slate-800/90 dark:to-slate-900/90 border border-gold/30 rounded-3xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold block font-mono">Financial Projection</span>
                  <h3 className="text-xl sm:text-2xl font-serif text-warm-white font-bold">ROI Yield Forecaster</h3>
                </div>
                <div className="flex gap-1.5 bg-gold/10 p-1 rounded-xl border border-gold/25">
                  {(['appreciation', 'rental', 'combined'] as const).map((s) => (
                    <button 
                      key={s}
                      onClick={() => setScenario(s)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all ${
                        scenario === s ? 'bg-gold text-navy shadow-md font-bold' : 'text-text-muted hover:text-warm-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-medium text-text-muted mb-2">
                    <span>10-Year Projected Capital Value</span>
                    <span className="text-gold font-bold font-mono">+120% Target</span>
                  </div>
                  <div className="h-3.5 w-full bg-gold/15 rounded-full overflow-hidden p-0.5 border border-gold/20">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: scenario === 'rental' ? '45%' : scenario === 'appreciation' ? '85%' : '95%' }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-gold via-gold-light to-gold rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-gold/5 rounded-2xl border border-gold/20">
                    <span className="text-[10px] text-text-muted uppercase tracking-widest block mb-1 font-bold">Rental Yield</span>
                    <span className="text-xl sm:text-2xl font-serif text-emerald-600 dark:text-emerald-400 font-bold">4.8% - 5.5%</span>
                    <span className="text-[9px] text-text-muted block mt-1 font-medium">vs 2.8% Pune Average</span>
                  </div>
                  <div className="p-4 bg-gold/5 rounded-2xl border border-gold/20">
                    <span className="text-[10px] text-text-muted uppercase tracking-widest block mb-1 font-bold">Metro Surge CAGR</span>
                    <span className="text-xl sm:text-2xl font-serif text-gold font-bold">12.4% / yr</span>
                    <span className="text-[9px] text-text-muted block mt-1 font-medium">Post Line 3 Launch</span>
                  </div>
                </div>
              </div>
            </div>

            <a 
              href="#enquiry" 
              className="mt-6 w-full py-4 bg-gradient-to-r from-gold via-gold-light to-gold text-navy font-bold rounded-2xl text-center flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg text-xs uppercase tracking-wider btn-sheen"
            >
              <span>Download Investment Dossier</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="luminous-line-gold absolute bottom-0 left-0 right-0 opacity-40"></div>
      </motion.div>
    </section>
  );
}

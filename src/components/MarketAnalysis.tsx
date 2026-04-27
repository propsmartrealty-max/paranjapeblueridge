"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Building2, TrainFront } from 'lucide-react';
import { townshipData } from '@/data/master-data';

import { useLanguage } from '@/context/LanguageContext';

export default function MarketAnalysis() {
  const { t } = useLanguage();
  const [scenario, setScenario] = React.useState<'rental' | 'appreciation' | 'combined'>('appreciation');

  const stats = [
    { label: t("IT Professionals", "आयटी व्यावसायिक"), val: "800+ Companies", icon: Building2, detail: t("Infosys, Wipro, TCS campuses nearby", "इन्फोसिस, विप्रो, टीसीएस कॅम्पस जवळ") },
    { label: t("Transit Connect", "ट्रान्झिट कनेक्टिव्हिटी"), val: "Line 3 Metro", icon: TrainFront, detail: t("94% Complete - Launch Sept 2026", "९४% पूर्ण - सप्टेंबर २०२६ लाँच") },
    { label: t("Market Growth", "मार्केट ग्रोथ"), val: "12% CAGR", icon: TrendingUp, detail: t("Highest appreciation in West Pune", "पश्चिम पुण्यातील सर्वाधिक वाढ") },
    { label: t("Resident Base", "रहिवासी आधार"), val: "3,000+ Families", icon: Users, detail: t("High-net worth corporate community", "हाय-नेट वर्थ कॉर्पोरेट कम्युनिटी") }
  ];

  return (
    <section id="market" className="py-32 bg-navy-light/50 rounded-[4rem] border border-white/5 my-32 px-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-20"></div>
      
      <div className="text-center mb-20">
        <span className="text-gold font-bold tracking-[6px] uppercase text-xs">Micro-Market Analysis</span>
        <h2 className="text-5xl font-serif text-warm-white mt-4">Why Blue Ridge is <span className="italic font-normal text-gold">Dominant</span></h2>
        <p className="text-text-light max-w-2xl mx-auto mt-6 text-lg">
          Analyzing the West Pune real estate landscape: Proximity to the Hinjewadi IT corridor and world-class infrastructure makes Blue Ridge the preferred choice for the elite workforce.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-8 bg-navy/40 border border-white/5 rounded-3xl hover:border-gold/30 transition-all group"
          >
            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
              <s.icon size={24} />
            </div>
            <span className="text-3xl font-serif text-warm-white block mb-2">{s.val}</span>
            <span className="text-[10px] text-gold font-bold uppercase tracking-widest block mb-4">{s.label}</span>
            <p className="text-xs text-text-light">{s.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
         <div className="p-10 bg-white/5 rounded-3xl border border-white/5">
            <h3 className="text-2xl font-serif text-warm-white mb-6">The "Walk-to-Work" Advantage</h3>
            <div className="space-y-4">
                {[
                    "Infosys & Wipro (1.5 KM)",
                    "Pune Metro Station (0.8 KM)",
                    "Mumbai-Pune Expressway (4.5 KM)",
                    "Quadron & Embassy Tech Zone (2 KM)"
                ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                        <span className="text-text-light">{item.split(' (')[0]}</span>
                        <span className="text-gold font-bold uppercase tracking-tighter italic">({item.split(' (')[1]}</span>
                    </div>
                ))}
            </div>
         </div>
         <div className="p-10 bg-navy rounded-3xl border border-gold/20 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-serif text-warm-white">Sovereign ROI Forecaster</h3>
                <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
                    {['appreciation', 'rental', 'combined'].map((s) => (
                        <button 
                            key={s}
                            onClick={() => setScenario(s as any)}
                            className={`px-4 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-widest transition-all ${
                                scenario === s ? 'bg-gold text-navy shadow-lg' : 'text-text-light hover:text-warm-white'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="space-y-8">
                <div>
                    <span className="text-[10px] text-text-light uppercase tracking-widest block mb-4">Projected 10-Year Value (based on 12% CAGR)</span>
                    <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: '85%' }}
                            className="h-full bg-gradient-to-r from-gold to-gold-light"
                        ></motion.div>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-8 pt-4">
                    <div>
                        <span className="text-3xl font-serif text-gold block">₹ 3.10 Cr</span>
                        <span className="text-[9px] text-text-light uppercase tracking-widest">Asset Value 2036</span>
                    </div>
                    <div>
                        <span className="text-3xl font-serif text-warm-white block">₹ 12.80 L</span>
                        <span className="text-[9px] text-text-light uppercase tracking-widest">Annual Rental 2036</span>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </section>
  );
}

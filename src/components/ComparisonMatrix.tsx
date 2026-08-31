"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Shield, Zap, TrainFront, Ship, Award } from 'lucide-react';

const comparisonData = [
  { feature: "9-Hole Professional Golf Course", br: true, lr: false, am: true },
  { feature: "Private 1.5 KM Boat Club on Mula River", br: true, lr: false, am: false },
  { feature: "Walking Distance to Pune Metro Line 3", br: true, lr: false, am: false },
  { feature: "Captive 220/22KVA Power Substation", br: true, lr: false, am: true },
  { feature: "ICSE Public School inside Township Campus", br: true, lr: true, am: true },
  { feature: "Direct Mula Riverfront Balconies", br: true, lr: false, am: false },
  { feature: "41-Storey Monolithic MiVAN Engineering", br: true, lr: false, am: false },
];

export default function ComparisonMatrix() {
  return (
    <section className="py-24" id="comparison">
      <div className="text-center mb-16">
        <span className="gilded-pill mb-4">Sovereign Benchmark</span>
        <h2 className="text-3xl sm:text-5xl font-serif text-warm-white mt-4 font-bold">
          Township <span className="italic font-normal text-gilded">Comparison</span>
        </h2>
        <p className="text-xs sm:text-sm text-text-muted mt-3 max-w-xl mx-auto">
          Objective feature analysis across West Pune's major integrated developments
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="ultra-glass-card border border-gold/30 rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden hud-frame"
      >
        <div className="luminous-line-gold absolute top-0 left-0 right-0 opacity-40"></div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gold/25">
                <th className="p-4 sm:p-6 text-left">
                  <span className="text-[10px] sm:text-xs text-text-muted uppercase tracking-widest font-bold font-mono">Feature / Asset</span>
                </th>
                <th className="p-4 sm:p-6 bg-gradient-to-b from-gold/20 to-gold/5 border-x border-gold/35 rounded-t-2xl relative">
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold via-gold-light to-gold text-navy text-[8px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-lg whitespace-nowrap font-mono">
                    ★ Undisputed #1
                  </div>
                  <span className="text-gold font-bold text-base sm:text-xl font-serif block">Blue Ridge</span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-text-muted mt-0.5 block font-mono">Hinjewadi Phase 1</span>
                </th>
                <th className="p-4 sm:p-6 text-center">
                  <span className="text-warm-white font-bold text-xs sm:text-sm block">Life Republic</span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-text-muted mt-0.5 block font-mono">Marunji</span>
                </th>
                <th className="p-4 sm:p-6 text-center">
                  <span className="text-warm-white font-bold text-xs sm:text-sm block">Amanora</span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-text-muted mt-0.5 block font-mono">Hadapsar</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/15">
              {comparisonData.map((row, idx) => (
                <motion.tr 
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: idx * 0.04 }}
                  viewport={{ once: true }}
                  className="hover:bg-gold/5 transition-colors group"
                >
                  <td className="p-4 sm:p-6 text-xs sm:text-sm font-semibold text-warm-white flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-gold/60 shrink-0"></span>
                    <span>{row.feature}</span>
                  </td>
                  
                  {/* Blue Ridge Highlight Column */}
                  <td className="p-4 sm:p-6 bg-gold/10 border-x border-gold/25 text-center">
                    {row.br ? (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold flex items-center justify-center mx-auto text-navy shadow-md">
                        <Check size={16} strokeWidth={3} />
                      </div>
                    ) : (
                      <X className="text-text-muted mx-auto opacity-40" size={18} />
                    )}
                  </td>

                  {/* Life Republic */}
                  <td className="p-4 sm:p-6 text-center">
                    {row.lr ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                        <Check size={14} strokeWidth={2.5} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
                        <X size={14} />
                      </div>
                    )}
                  </td>

                  {/* Amanora */}
                  <td className="p-4 sm:p-6 text-center">
                    {row.am ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                        <Check size={14} strokeWidth={2.5} />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
                        <X size={14} />
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TRANSIT EDGE BANNER */}
        <div className="mt-8 p-6 sm:p-8 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 rounded-2xl sm:rounded-3xl border border-gold/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-inner">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-14 h-14 bg-gradient-to-tr from-gold to-gold-light rounded-2xl flex items-center justify-center text-navy shadow-lg shrink-0">
              <TrainFront size={28} />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-serif text-warm-white font-bold">The Strategic Transit Advantage</h4>
              <p className="text-text-muted text-xs sm:text-sm mt-0.5 leading-relaxed font-medium">Paranjape Blue Ridge is the ONLY integrated township with a dedicated elevated Metro station within 800 meters.</p>
            </div>
          </div>
          <a 
            href="#enquiry" 
            className="bg-gradient-to-r from-gold via-gold-light to-gold text-navy px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl hover:shadow-gold/30 shrink-0 text-center btn-sheen"
          >
            <span>Secure Priority Unit</span>
          </a>
        </div>
        <div className="luminous-line-gold absolute bottom-0 left-0 right-0 opacity-40"></div>
      </motion.div>
    </section>
  );
}

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Shield, Zap, TrainFront, Ship } from 'lucide-react';

const comparisonData = [
  { feature: "9-Hole Professional Golf Course", br: true, lr: false, am: true },
  { feature: "Private 1.5 KM Boat Club", br: true, lr: false, am: false },
  { feature: "Walking distance to Metro Line 3", br: true, lr: false, am: false },
  { feature: "Captive 220/22KVA Power Substation", br: true, lr: false, am: true },
  { feature: "ICSE Public School inside Township", br: true, lr: true, am: true },
  { feature: "Direct Mula River Frontage", br: true, lr: false, am: false },
];

export default function ComparisonMatrix() {
  return (
    <section className="py-32">
      <div className="text-center mb-20">
        <span className="text-gold font-bold tracking-[6px] uppercase text-xs">Sovereign Benchmark</span>
        <h2 className="text-5xl font-serif text-warm-white mt-4">Township <span className="italic font-normal text-gold">Comparison</span></h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-8 text-left bg-white/5 border border-white/10 rounded-tl-3xl">
                <span className="text-[10px] text-text-light uppercase tracking-widest">Feature / Asset</span>
              </th>
              <th className="p-8 bg-gold/10 border border-gold/30">
                <span className="text-gold font-bold text-lg font-serif">Blue Ridge</span>
                <span className="block text-[8px] uppercase tracking-widest mt-1">West Pune Master</span>
              </th>
              <th className="p-8 bg-white/5 border border-white/10">
                <span className="text-text-light font-bold text-sm">Life Republic</span>
                <span className="block text-[8px] uppercase tracking-widest mt-1">Major Hub</span>
              </th>
              <th className="p-8 bg-white/5 border border-white/10 rounded-tr-3xl">
                <span className="text-text-light font-bold text-sm">Amanora</span>
                <span className="block text-[8px] uppercase tracking-widest mt-1">East Pune Master</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, idx) => (
              <motion.tr 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="hover:bg-white/[0.02] transition-colors"
              >
                <td className="p-8 border border-white/10 text-sm font-bold text-warm-white">{row.feature}</td>
                <td className="p-8 border border-white/10 text-center">
                  {row.br ? <Check className="text-gold mx-auto" size={20} /> : <X className="text-white/10 mx-auto" size={20} />}
                </td>
                <td className="p-8 border border-white/10 text-center">
                  {row.lr ? <Check className="text-text-light mx-auto" size={16} /> : <X className="text-white/10 mx-auto" size={16} />}
                </td>
                <td className="p-8 border border-white/10 text-center">
                  {row.am ? <Check className="text-text-light mx-auto" size={16} /> : <X className="text-white/10 mx-auto" size={16} />}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 p-10 bg-navy-light rounded-3xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                <TrainFront size={32} />
            </div>
            <div>
                <h4 className="text-xl font-serif text-warm-white">The Transit Edge</h4>
                <p className="text-text-light text-xs mt-1">Blue Ridge is the ONLY township with a dedicated Metro Station within walking distance.</p>
            </div>
        </div>
        <a href="#enquiry" className="bg-gold text-navy px-10 py-4 rounded-full font-bold uppercase text-[10px] tracking-widest hover:scale-105 transition-all">
            Secure Priority Unit
        </a>
      </div>
    </section>
  );
}

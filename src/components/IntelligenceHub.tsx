"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, MapPin, Globe } from 'lucide-react';

export default function IntelligenceHub() {
  const insights = [
    {
      title: "Rental Yield Surge",
      value: "4.8%",
      description: "Average annual rental yield for 2BHK units in Blue Ridge Phase 1.",
      icon: TrendingUp
    },
    {
      title: "Capital Appreciation",
      value: "12%",
      description: "Year-on-year growth in property values since the Metro Line 3 announcement.",
      icon: BarChart3
    },
    {
      title: "Commute Efficiency",
      value: "Zero",
      description: "Blue Ridge is the only integrated township within the Phase 1 IT Hub perimeter.",
      icon: MapPin
    },
    {
      title: "Global Demand",
      value: "35%",
      description: "Increase in NRI enquiries from UAE, UK, and USA in the last quarter.",
      icon: Globe
    }
  ];

  return (
    <section id="market" className="py-32 bg-black border-t border-gold/10">
      <div className="container">
        <div className="mb-20">
          <span className="text-gold font-bold tracking-[6px] uppercase text-[10px]">Sovereign Data Engine</span>
          <h2 className="text-6xl font-serif text-warm-white mt-4 leading-tight">
            Buyer <span className="italic font-normal text-gilded">Intelligence</span> Hub
          </h2>
          <p className="text-text-light text-xl max-w-2xl mt-6">
            Make informed decisions with real-time market data directly from the Blue Ridge ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {insights.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white/5 border border-gold/10 rounded-3xl hover:bg-gold/5 transition-all group"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                <item.icon size={24} />
              </div>
              <div className="text-4xl font-serif text-gilded mb-2">{item.value}</div>
              <h4 className="text-warm-white font-bold text-xs uppercase tracking-widest mb-4">{item.title}</h4>
              <p className="text-text-light text-xs leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Deep Dive Feature */}
        <div className="mt-20 p-12 bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 rounded-[3rem] flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1">
              <h3 className="text-3xl font-serif text-warm-white mb-6">Market <span className="italic text-gilded">Trajectory</span> Analysis</h3>
              <p className="text-text-light leading-relaxed mb-8">
                The upcoming Hinjewadi Metro Line 3 (Pune Metro) is projected to reduce commute times by 60% for IT professionals residing in Blue Ridge. This infrastructure milestone is expected to drive a second wave of premium capital appreciation.
              </p>
              <button className="px-10 py-4 bg-gold text-navy rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl shadow-gold/20">
                Download Q2 Market Report
              </button>
           </div>
           <div className="w-full md:w-1/3 aspect-square bg-black border border-gold/10 rounded-2xl p-8 flex items-center justify-center">
              <div className="text-center">
                 <div className="text-6xl font-serif text-gilded mb-2">98%</div>
                 <span className="text-[10px] text-text-light uppercase tracking-[4px]">Occupancy Rate</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
}

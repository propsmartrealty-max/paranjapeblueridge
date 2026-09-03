"use client";

import React from 'react';
import { Building2, Briefcase, Zap, ShieldCheck, TrendingUp, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { blueRidgeSezData } from '@/data/cms/township';

export default function BlueRidgeSezSection() {
  return (
    <section id="sez" className="py-24 sm:py-32 bg-[#FAF9F6] relative overflow-hidden border-t border-slate-200/80">
      {/* Luminous Background Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-champagne/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border border-slate-200 text-[10px] font-mono uppercase tracking-[0.2em] text-[#8F6A24] mb-4">
            <Briefcase size={12} className="text-[#B88E3E]" />
            <span>Economic Powerhouse • Rajiv Gandhi Infotech Park</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#070D1A] tracking-tight leading-[1.08]">
            Blue Ridge SEZ. <br />
            <span className="italic font-light text-gradient-champagne">The 3-Million Sq. Ft. Commercial Engine.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-normal">
            {blueRidgeSezData.overview}
          </p>
        </div>

        {/* 4 Core Vital Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="glass-card p-6 rounded-3xl border border-slate-200/80 bg-white shadow-sm space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Scale</span>
            <div className="text-2xl sm:text-3xl font-serif text-[#070D1A] font-medium">3M+ Sq. Ft.</div>
            <p className="text-xs text-slate-600">Grade-A IT/ITES commercial infrastructure</p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-200/80 bg-white shadow-sm space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Workforce</span>
            <div className="text-2xl sm:text-3xl font-serif text-[#B88E3E] font-medium">35,000+</div>
            <p className="text-xs text-slate-600">Senior IT professionals working on-campus</p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-200/80 bg-white shadow-sm space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Commute</span>
            <div className="text-2xl sm:text-3xl font-serif text-[#070D1A] font-medium">0 Minutes</div>
            <p className="text-xs text-slate-600">Pure pedestrian walk-to-work lifestyle</p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-slate-200/80 bg-white shadow-sm space-y-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Gross Yield</span>
            <div className="text-2xl sm:text-3xl font-serif text-[#B88E3E] font-medium">4.8% - 5.6%</div>
            <p className="text-xs text-slate-600">Consistent residential rental demand</p>
          </div>
        </div>

        {/* Extended Detailing: The 4 Strategic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {blueRidgeSezData.keyAdvantages.map((adv, idx) => (
            <div
              key={idx}
              className="glass-panel p-8 rounded-3xl border border-slate-200/80 bg-white shadow-sm hover:border-[#B88E3E]/40 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-champagne/10 border border-champagne/20 flex items-center justify-center text-[#B88E3E] font-mono text-xs font-bold">
                  0{idx + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-[#070D1A] font-medium">
                  {adv.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                {adv.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Global Tech Tenants Banner */}
        <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-slate-200/80 bg-white shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8F6A24] block mb-1">
                Corporate Footprint
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-[#070D1A] font-medium">
                Global MNCs & Tech Innovators Operating Within Blue Ridge SEZ
              </h3>
            </div>
            <span className="glass-pill px-3.5 py-1 rounded-full text-xs font-mono font-medium text-slate-700 self-start sm:self-auto">
              LEED Gold Green Certified
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {blueRidgeSezData.tenants.map((tenant, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center gap-2.5 text-xs text-[#070D1A] font-medium"
              >
                <CheckCircle2 size={14} className="text-[#B88E3E] shrink-0" />
                <span>{tenant}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
            <p className="max-w-2xl leading-relaxed">
              * The presence of Fortune 500 tech leaders inside the gated township ensures perennial tenant liquidity and capital resilience regardless of broader market cycles.
            </p>
            <a
              href="#enquiry"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8F6A24] hover:text-[#B88E3E] shrink-0 no-underline"
            >
              <span>Enquire Commercial / Residential</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

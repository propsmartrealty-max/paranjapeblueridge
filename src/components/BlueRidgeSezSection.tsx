"use client";

import React from 'react';
import { Building2, Briefcase, Zap, ShieldCheck, TrendingUp, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { blueRidgeSezData } from '@/data/cms/township';

export default function BlueRidgeSezSection() {
  return (
    <section id="sez" className="py-24 sm:py-32 bg-[#FAF9F6] relative overflow-hidden">
      {/* Luminous Background Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-champagne/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="chapter-badge mb-4">
            <Briefcase size={11} className="text-[#785415]" />
            <span>03 • Economic Powerhouse • Rajiv Gandhi Infotech Park</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#070D1A] tracking-tight leading-[1.08]">
            Blue Ridge SEZ. <br />
            <span className="italic font-light text-gradient-champagne">The 3-Million Sq. Ft. Commercial Engine.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed font-sans font-medium">
            {blueRidgeSezData.overview}
          </p>
        </div>

        {/* Authentic PSCL SEZ Hero Card with Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden bg-white p-3 border-2 border-slate-200 shadow-md">
              <img 
                src="/assets/images/pscl-blue-ridge-sez.webp" 
                alt="Blue Ridge IT / ITES Special Economic Zone Hinjewadi Phase 1"
                className="w-full h-80 sm:h-96 object-cover rounded-2xl"
              />
              <div className="p-4 flex items-center justify-between text-xs font-mono text-slate-700 border-t border-slate-200 mt-2">
                <span className="flex items-center gap-1.5 font-bold text-[#070D1A]">
                  <Building2 size={14} className="text-[#785415]" />
                  Operational LEED Gold IT SEZ
                </span>
                <span className="text-[#785415] font-extrabold">3,000,000+ Sq. Ft. Delivered</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-2">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider block font-bold">Scale</span>
              <div className="text-2xl sm:text-3xl font-serif text-[#070D1A] font-bold">3M+ Sq. Ft.</div>
              <p className="text-xs text-slate-700 font-medium">Grade-A IT/ITES workspace</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-2">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider block font-bold">Workforce</span>
              <div className="text-2xl sm:text-3xl font-serif text-[#785415] font-bold">35,000+</div>
              <p className="text-xs text-slate-700 font-medium">Daily technology workforce</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-2">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider block font-bold">Commute</span>
              <div className="text-2xl sm:text-3xl font-serif text-[#070D1A] font-bold">0 Minutes</div>
              <p className="text-xs text-slate-700 font-medium">Zero commute pedestrian living</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-sm space-y-2">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider block font-bold">Gross Yield</span>
              <div className="text-2xl sm:text-3xl font-serif text-[#785415] font-bold">4.8% - 5.6%</div>
              <p className="text-xs text-slate-700 font-medium">Consistent residential yield</p>
            </div>
          </div>
        </div>

        {/* Extended Detailing: The 4 Strategic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {blueRidgeSezData.keyAdvantages.map((adv, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-sm hover:border-[#785415] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#785415] font-mono text-xs font-bold">
                  0{idx + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-[#070D1A] font-bold">
                  {adv.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans font-medium">
                {adv.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Global Tech Tenants Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#785415] block mb-1 font-bold">
                Corporate Footprint
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-[#070D1A] font-bold">
                Global MNCs & Tech Innovators Operating Within Blue Ridge SEZ
              </h3>
            </div>
            <span className="text-xs font-mono text-[#785415] font-extrabold px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 self-start sm:self-auto">
              100% Operational Hub
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {blueRidgeSezData.tenants.map((tenant, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3 hover:bg-white hover:border-[#785415] transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-[#785415] shrink-0"></div>
                <span className="text-xs font-sans font-bold text-[#070D1A]">
                  {tenant}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-slate-600 font-sans font-medium">
              * The presence of Fortune 500 corporate offices inside Blue Ridge creates perpetual, recession-resistant rental demand from senior engineering leadership and multinational executives.
            </p>
            <a
              href="#enquiry"
              className="text-xs font-sans font-bold uppercase tracking-wider text-[#785415] flex items-center gap-1.5 hover:translate-x-1 transition-transform no-underline shrink-0"
            >
              <span>Explore Investor Rental ROI</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

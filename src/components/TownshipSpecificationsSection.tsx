"use client";

import React from 'react';
import { 
  CheckCircle2, Sparkles, Building2, Layers, ShieldCheck, 
  DoorOpen, Utensils, Maximize, Compass, Flame, SunMedium
} from 'lucide-react';

export default function TownshipSpecificationsSection() {
  const keyFeatures = [
    { title: "Double-Height Entrance Lobby", desc: "Monumental grand arrival experience with curated marble surfaces and executive concierge." },
    { title: "Extensive Living Areas", desc: "Volumetric proportions engineered with generous spans for formal entertaining and relaxation." },
    { title: "3-Side Open Layout", desc: "Maximized perimeter envelope delivering uninterrupted natural daylight and cross-ventilation." },
    { title: "Golf & River-Facing Residences", desc: "Dual vistas overlooking the championship 9-hole fairway and scenic Mula River corridor." },
    { title: "Two Walk-In Wardrobes", desc: "Dual master dressing suites with custom joinery space and private attached balconies." },
    { title: "Exclusive Guest Entry", desc: "Dedicated foyer circulation segregating private family suites from formal reception zones." },
    { title: "State-of-the-Art Fixtures", desc: "Precision-engineered sanitaryware and CP fittings from international design houses." },
    { title: "Monolithic MiVAN Precision", desc: "Cast-in-place concrete structure ensuring seismic stability, smooth walls, and zero column dead space." }
  ];

  const interiorSpecs = [
    {
      category: "Flooring & Surfaces",
      icon: Layers,
      items: [
        "Polished glazed vitrified tiles for living, dining, bedrooms, kitchen & passage",
        "Glazed vitrified anti-skid tiles for sit-out balconies & private terraces",
        "Designer vitrified tiles with full-body vanity counters for all bathrooms"
      ]
    },
    {
      category: "Kitchen & Reticulated Gas",
      icon: Utensils,
      items: [
        "Full body vitrified tile platform with single bowl premium stainless steel sink",
        "Modular kitchen layout provisions with dedicated chimney exhaust ducts",
        "Central reticulated piped LPG gas connection with safety shut-off valves"
      ]
    },
    {
      category: "Dado & Bathrooms",
      icon: Sparkles,
      items: [
        "Vitrified dado tiles in toilets up to lintel level",
        "Vitrified dado tiles above cooking platform up to 2 feet height in kitchen",
        "Full body vitrified tile vanity counter and toughened glass partition for shower area"
      ]
    },
    {
      category: "Doors & Sliding Windows",
      icon: DoorOpen,
      items: [
        "Main door: Flush door and door frame with premium designer laminate on both sides",
        "Internal doors: Pre-hung flush door shutters and frames with laminate on both sides",
        "Heavy-gauge anodized aluminium sliding windows & balcony doors with mosquito nets"
      ]
    }
  ];

  return (
    <section id="specifications" className="py-24 sm:py-32 bg-[#FAF9F6] relative overflow-hidden border-t border-b border-slate-200 arch-section-divider">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="chapter-badge mb-4">
            <Sparkles size={11} className="text-[#B88E3E]" />
            <span>05 • Official Paranjape Standards</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#070D1A] tracking-tight leading-[1.08]">
            Interior Details & <br />
            <span className="italic font-light text-gradient-champagne">Architectural Specifications.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-normal">
            Every Blue Ridge home is built with industrial-grade precision formwork, superior acoustic insulation, and branded finishes verified under Paranjape Schemes' hallmark construction guidelines.
          </p>
        </div>

        {/* 8 Key Architectural Features Grid */}
        <div className="mb-20">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8F6A24] font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B88E3E]"></span>
            <span>Key Architectural Features</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {keyFeatures.map((feat, i) => (
              <div 
                key={i} 
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#B88E3E] transition-all duration-300 space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#B88E3E] font-bold">0{i + 1}</span>
                  <CheckCircle2 size={16} className="text-[#B88E3E] opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-base font-serif font-bold text-[#070D1A] group-hover:text-[#B88E3E] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Detailed Interior Materiality Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {interiorSpecs.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div 
                key={i} 
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:border-[#B88E3E]/60 transition-all duration-300 space-y-6"
              >
                <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-[#B88E3E] flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8F6A24] font-bold block">
                      Specification 0{i + 1}
                    </span>
                    <h3 className="text-xl font-serif text-[#070D1A] font-bold">
                      {cat.category}
                    </h3>
                  </div>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[#B88E3E] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Construction Formwork Trust Note */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 text-[#070D1A] flex items-center justify-center shrink-0">
              <ShieldCheck size={24} className="text-[#B88E3E]" />
            </div>
            <div>
              <div className="text-sm font-serif font-bold text-[#070D1A]">
                Precision Monolithic Formwork Construction
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Superior thermal comfort, seismic durability, and zero dead space across all towers.
              </div>
            </div>
          </div>

          <a 
            href="#enquiry" 
            className="btn-champagne px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-center no-underline whitespace-nowrap shadow-sm"
          >
            Request Complete Spec Sheet PDF
          </a>
        </div>

      </div>
    </section>
  );
}

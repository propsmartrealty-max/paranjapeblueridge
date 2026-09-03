"use client";

import React, { useState } from 'react';
import { Trees, Waves, GraduationCap, Building2, ShieldCheck, Dumbbell, Sparkles, Coffee, Compass, CheckCircle2 } from 'lucide-react';
import { townshipMasterData } from '@/data/cms/township';

export default function AmenitiesTierSection() {
  const [activeTab, setActiveTab] = useState<'township' | 'cluster'>('township');

  const townshipPillars = [
    {
      title: "9-Hole Executive Golf Course",
      category: "Sports & Greens",
      description: "Pune's only integrated township featuring a professional 9-hole executive course, putting green, driving bays, and private clubhouse.",
      icon: Trees
    },
    {
      title: "Private Marina & Boat Club",
      category: "Waterfront Leisure",
      description: "1.5 kilometers of serene Mula River frontage with recreational kayaking, pedal boats, and sunset boardwalk pavilions.",
      icon: Waves
    },
    {
      title: "Blue Ridge Public School (ICSE)",
      category: "Campus Education",
      description: "Premier co-educational ICSE affiliated campus located right inside the township gates, eliminating school transit.",
      icon: GraduationCap
    },
    {
      title: "High Street Retail & Polyclinic",
      category: "Everyday Conveniences",
      description: "Supermarkets, pharmacies, specialty dining, banking, and a 24/7 primary healthcare polyclinic within walking reach.",
      icon: Building2
    },
    {
      title: "Multi-Tier Sovereign Security",
      category: "24/7 Gated Perimeter",
      description: "RFID vehicular access, integrated CCTV perimeter surveillance, and dedicated rapid-response security patrols.",
      icon: ShieldCheck
    },
    {
      title: "Comprehensive Sports Arenas",
      category: "Athletics & Wellness",
      description: "Full-sized football ground, professional tennis courts, indoor badminton stadiums, and temperature-controlled lap pools.",
      icon: Dumbbell
    }
  ];

  const clusterAmenities = [
    {
      title: "Private Rooftop Sky Lounges",
      category: "Vertical Sanctuary",
      description: "Elevated 41-storey observation decks offering panoramic sunset views across the Mula River valley."
    },
    {
      title: "Executive Work-From-Home Pods",
      category: "Business Suite",
      description: "Soundproofed focus booths, ergonomic boardrooms, and high-speed enterprise fiber networking."
    },
    {
      title: "Private Mini-Theatres",
      category: "Private Screening",
      description: "Acoustically isolated 24-seater screening salons equipped with Dolby Atmos spatial sound."
    },
    {
      title: "Technogym Fitness Suites",
      category: "Wellness & Spa",
      description: "State-of-the-art cardio and strength equipment, dedicated yoga decks, and private steam/sauna rooms."
    }
  ];

  return (
    <section id="lifestyle" className="py-24 sm:py-32 bg-[#FAF9F6] relative overflow-hidden border-t border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8F6A24] block mb-3 font-semibold">
              Dual-Tier Ecosystem
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#070D1A] tracking-tight leading-[1.08]">
              The architecture of <br />
              <span className="italic font-light text-gradient-champagne">unrivaled living.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-normal">
              We make a clear distinction between your immediate cluster amenities and the 138-acre township master facilities.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1 rounded-full bg-white border border-slate-200/80 shadow-sm">
            <button
              onClick={() => setActiveTab('township')}
              className={`px-5 py-2 rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-all border-none cursor-pointer ${
                activeTab === 'township'
                  ? 'bg-[#B88E3E] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#070D1A] bg-transparent'
              }`}
            >
              138-Acre Township
            </button>
            <button
              onClick={() => setActiveTab('cluster')}
              className={`px-5 py-2 rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-all border-none cursor-pointer ${
                activeTab === 'cluster'
                  ? 'bg-[#B88E3E] text-white shadow-sm'
                  : 'text-slate-600 hover:text-[#070D1A] bg-transparent'
              }`}
            >
              Cluster Residences
            </button>
          </div>
        </div>

        {/* Dynamic Tier Grid */}
        {activeTab === 'township' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {townshipPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-8 rounded-3xl border border-slate-200/80 bg-white hover:border-[#B88E3E]/40 transition-all duration-300 group hover:-translate-y-1 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-[#B88E3E] mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] font-mono text-[#8F6A24] uppercase tracking-[0.2em] block mb-2 font-semibold">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-serif text-[#070D1A] font-medium mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clusterAmenities.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel p-8 rounded-3xl border border-slate-200/80 bg-white hover:border-[#B88E3E]/40 transition-all duration-300 group hover:-translate-y-1 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} className="text-[#B88E3E]" />
                  <span className="text-[10px] font-mono text-[#8F6A24] uppercase tracking-[0.2em] font-semibold">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-serif text-[#070D1A] font-medium mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

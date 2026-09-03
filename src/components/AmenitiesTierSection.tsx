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
    <section id="lifestyle" className="py-24 sm:py-32 bg-[#060911] relative overflow-hidden border-t border-white/[0.06]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-champagne block mb-3">
              Dual-Tier Ecosystem
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-ivory tracking-tight leading-[1.08]">
              The architecture of <br />
              <span className="italic font-light text-gradient-champagne">unrivaled living.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-stone-light leading-relaxed font-sans font-light">
              We make a clear distinction between your immediate cluster amenities and the 138-acre township master facilities.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('township')}
              className={`px-5 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all border-none cursor-pointer ${
                activeTab === 'township'
                  ? 'bg-champagne text-obsidian font-bold shadow-md'
                  : 'text-stone-light hover:text-ivory bg-transparent'
              }`}
            >
              138-Acre Township
            </button>
            <button
              onClick={() => setActiveTab('cluster')}
              className={`px-5 py-2 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all border-none cursor-pointer ${
                activeTab === 'cluster'
                  ? 'bg-champagne text-obsidian font-bold shadow-md'
                  : 'text-stone-light hover:text-ivory bg-transparent'
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
                  className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-champagne/30 transition-all duration-300 group hover:-translate-y-1 shadow-glass"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-champagne mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] font-mono text-champagne uppercase tracking-[0.2em] block mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-serif text-ivory font-medium mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-light leading-relaxed font-sans font-light">
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
                className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-champagne/30 transition-all duration-300 group hover:-translate-y-1 shadow-glass"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} className="text-champagne" />
                  <span className="text-[10px] font-mono text-champagne uppercase tracking-[0.2em]">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-serif text-ivory font-medium mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-light leading-relaxed font-sans font-light">
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

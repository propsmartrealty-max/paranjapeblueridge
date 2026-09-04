"use client";

import React, { useState } from 'react';
import { Trees, Waves, GraduationCap, Building2, ShieldCheck, Dumbbell, Sparkles, Coffee, Compass, CheckCircle2, HeartHandshake } from 'lucide-react';
import { townshipMasterData } from '@/data/cms/township';

export default function AmenitiesTierSection() {
  const [activeTab, setActiveTab] = useState<'township' | 'cluster'>('township');

  const townshipPillars = [
    {
      title: "9-Hole Executive Golf Course",
      category: "Sports & Greens",
      description: "Pune's only integrated township featuring a professional 9-hole executive course, putting green, driving bays, and private The Cliff clubhouse.",
      icon: Trees,
      image: "/assets/images/pscl-blue-ridge-golf.webp"
    },
    {
      title: "Private Marina & Boat Club",
      category: "Waterfront Leisure",
      description: "1.5 kilometers of serene Mula River frontage with recreational kayaking, pedal boats, and sunset riverside boardwalk pavilions.",
      icon: Waves,
      image: "/assets/images/pscl-blue-ridge-promenade-canopy.webp"
    },
    {
      title: "Blue Ridge Public School (ICSE)",
      category: "Campus Education",
      description: "Premier co-educational ICSE affiliated campus located right inside the township gates, eliminating school transit.",
      icon: GraduationCap,
      image: "/assets/images/pscl-blue-ridge-school.webp"
    },
    {
      title: "Xion Mall & High Street Retail",
      category: "Everyday Conveniences",
      description: "Supermarkets, pharmacies, specialty dining, banking, multiplex, and 24/7 primary healthcare within walking reach.",
      icon: Building2,
      image: "/assets/images/pscl-blue-ridge-xion-mall.jpg"
    },
    {
      title: "Swaniketan & Athashri Living",
      category: "Intergenerational Community",
      description: "Pioneering senior living enclaves integrated within the township fostering family harmony, medical care, and wellness.",
      icon: HeartHandshake,
      image: "/assets/images/pscl-blue-ridge-swaniketan.webp"
    },
    {
      title: "Comprehensive Sports Arenas",
      category: "Athletics & Wellness",
      description: "Full-sized athletic ground, professional tennis courts, indoor badminton stadiums, and temperature-controlled lap pools.",
      icon: Dumbbell,
      image: "/assets/images/pscl-blue-ridge-life.webp"
    }
  ];

  const clusterAmenities = [
    {
      title: "Double-Height Grand Entrance Lobbies",
      category: "Architectural Arrival",
      description: "Curated imported marble finishes, executive reception desk, and digital biometric access for each tower.",
      image: "/assets/images/pscl-blue-ridge-tower-elevation.webp"
    },
    {
      title: "Private Rooftop Sky Lounges",
      category: "Vertical Sanctuary",
      description: "Elevated 41-storey observation decks offering panoramic sunset views across the Mula River and golf fairway.",
      image: "/assets/images/pscl-blue-ridge-architecture.webp"
    },
    {
      title: "Executive Work-From-Home Pods",
      category: "Business Suite",
      description: "Soundproofed focus booths, ergonomic boardrooms, and high-speed enterprise fiber networking for IT executives.",
      image: "/assets/images/pscl-blue-ridge-boulevard.jpg"
    },
    {
      title: "Technogym Fitness & Wellness Suites",
      category: "Private Health Club",
      description: "State-of-the-art cardio and strength equipment, dedicated yoga decks, and private steam/sauna rooms.",
      image: "/assets/images/pscl-promenade-residences.png"
    }
  ];

  return (
    <section id="lifestyle" className="py-24 sm:py-32 bg-[#FAF9F6] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="chapter-badge mb-4">
              <span>04 • Dual-Tier Lifestyle Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#070D1A] tracking-tight leading-[1.08]">
              The architecture of <br />
              <span className="italic font-light text-gradient-champagne">unrivaled living.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed font-sans font-medium">
              We make a clear distinction between your immediate cluster amenities and the 138-acre township master facilities.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1 rounded-full glass-surface shadow-sm">
            <button
              onClick={() => setActiveTab('township')}
              className={`px-6 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all border-none cursor-pointer ${
                activeTab === 'township'
                  ? 'bg-[#785415] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#070D1A] bg-transparent'
              }`}
            >
              138-Acre Master Township
            </button>
            <button
              onClick={() => setActiveTab('cluster')}
              className={`px-6 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all border-none cursor-pointer ${
                activeTab === 'cluster'
                  ? 'bg-[#785415] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#070D1A] bg-transparent'
              }`}
            >
              Cluster-Exclusive Privileges
            </button>
          </div>
        </div>

        {/* 138-Acre Township Grid */}
        {activeTab === 'township' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {townshipPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-card-luxury overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 glass-pill px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#070D1A] font-bold">
                        {item.category}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-[#785415] flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-xl font-serif text-[#070D1A] font-bold">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-[#785415] font-bold">
                    <span>138-Acre Perimeter</span>
                    <span>Verified Amenity ✓</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Cluster Privileges Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clusterAmenities.map((item, idx) => (
              <div
                key={idx}
                className="glass-card-luxury overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 glass-pill px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest text-[#785415] font-bold">
                      Cluster Dedicated
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 font-bold block">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-serif text-[#070D1A] font-bold">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-600 font-medium">
                  Private resident keycard access only
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

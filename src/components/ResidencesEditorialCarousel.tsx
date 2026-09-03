"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Building2, Ruler, ShieldCheck } from 'lucide-react';
import { blueRidgeClusters, ClusterResidence } from '@/data/cms/clusters';

interface ResidencesEditorialCarouselProps {
  onSelectCluster?: (cluster: ClusterResidence) => void;
}

export default function ResidencesEditorialCarousel({ onSelectCluster }: ResidencesEditorialCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="residences" className="py-24 sm:py-32 bg-[#060911] relative overflow-hidden border-t border-white/[0.06]">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial from-champagne/[0.04] to-transparent pointer-events-none blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-champagne block mb-3">
              The Residences of Blue Ridge
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-ivory tracking-tight leading-[1.08]">
              Find your place <br />
              <span className="italic font-light text-gradient-champagne">within Blue Ridge.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-stone-light leading-relaxed font-sans font-light max-w-xl">
              Blue Ridge is not defined by a single building. Its residential landscape has evolved through distinctive residential communities, each offering its own architectural character, configuration and lifestyle experience.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous Residence"
              className="w-12 h-12 rounded-full border border-white/10 hover:border-champagne bg-white/[0.03] hover:bg-champagne/10 text-ivory hover:text-champagne transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next Residence"
              className="w-12 h-12 rounded-full border border-white/10 hover:border-champagne bg-white/[0.03] hover:bg-champagne/10 text-ivory hover:text-champagne transition-all flex items-center justify-center cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Editorial Horizontal Journey */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory"
        >
          {blueRidgeClusters.map((cluster, idx) => (
            <div
              key={cluster.id}
              className="min-w-[320px] sm:min-w-[420px] lg:min-w-[460px] snap-start flex-shrink-0 group"
            >
              <div className="rounded-3xl glass-panel p-3 border border-white/10 hover:border-champagne/40 transition-all duration-500 flex flex-col h-full group-hover:-translate-y-1.5 shadow-glass">
                {/* Architectural Canvas */}
                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-obsidian-dark">
                  <img
                    src={cluster.heroImage}
                    alt={`${cluster.name} - Paranjape Blue Ridge Hinjewadi`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-85"
                  />
                  
                  {/* Subtle Dark Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060911] via-[#060911]/30 to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-white/10 text-champagne-light">
                      {cluster.configurations}
                    </span>
                    <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-stone-light">
                      {cluster.towerDetails.storeys} Storeys
                    </span>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[10px] font-mono text-champagne tracking-wider uppercase mb-1">
                      {cluster.eyebrow}
                    </div>
                    <h3 className="text-2xl font-serif text-ivory font-medium">
                      {cluster.name}
                    </h3>
                  </div>
                </div>

                {/* Editorial Body */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow space-y-6">
                  <p className="text-xs sm:text-sm text-stone-light line-clamp-3 leading-relaxed font-sans">
                    {cluster.architecturalStory}
                  </p>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.08]">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-stone tracking-wider block">Carpet Area</span>
                      <span className="text-sm font-sans font-medium text-ivory">{cluster.carpetAreaRange}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-stone tracking-wider block">Starting Offering</span>
                      <span className="text-sm font-sans font-medium text-champagne-light">
                        {cluster.isPriceVerified ? cluster.priceStarting : "Upon Private Request"}
                      </span>
                    </div>
                  </div>

                  {/* Key Architecture Point */}
                  {cluster.conceptPoints[0] && (
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-ivory/90 flex items-start gap-2.5">
                      <Sparkles size={14} className="text-champagne shrink-0 mt-0.5" />
                      <span className="leading-snug">{cluster.conceptPoints[0].title}: {cluster.conceptPoints[0].description}</span>
                    </div>
                  )}

                  {/* Link to Chapter */}
                  <a
                    href={`/paranjape-blue-ridge-${cluster.slug === 'ridges-41' ? '41' : cluster.slug}-hinjewadi-pune`}
                    className="w-full py-3.5 px-5 rounded-xl bg-white/[0.04] hover:bg-champagne hover:text-obsidian text-ivory transition-all text-xs font-sans font-semibold tracking-wider uppercase flex items-center justify-between no-underline group/btn border border-white/10 hover:border-champagne"
                  >
                    <span>Discover Residence</span>
                    <ArrowRight size={15} className="text-champagne group-hover/btn:text-obsidian group-hover/btn:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Building2, Ruler, ShieldCheck, Download, Eye, CheckCircle2 } from 'lucide-react';
import { blueRidgeClusters, ClusterResidence } from '@/data/cms/clusters';

interface ResidencesEditorialCarouselProps {
  onSelectCluster?: (cluster: ClusterResidence) => void;
}

export default function ResidencesEditorialCarousel({ onSelectCluster }: ResidencesEditorialCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | '2bhk' | '3bhk' | '4bhk'>('all');

  const filteredClusters = blueRidgeClusters.filter(c => {
    if (selectedFilter === '2bhk') return c.configurations.includes('2');
    if (selectedFilter === '3bhk') return c.configurations.includes('3');
    if (selectedFilter === '4bhk') return c.configurations.includes('4') || c.configurations.includes('5');
    return true;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="residences" className="py-24 sm:py-32 bg-[#FAF9F6] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="chapter-badge mb-4">
              <span>02 • Active Residential Enclaves</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#070D1A] tracking-tight leading-[1.08]">
              Find your place <br />
              <span className="italic font-light text-gradient-champagne">within Blue Ridge.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-slate-700 leading-relaxed font-sans font-medium max-w-xl">
              Explore ongoing residential clusters in Hinjewadi Phase 1 with verified RERA approvals, clear pricing, and immediate floor plan access.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              aria-label="Previous Residence"
              className="w-11 h-11 rounded-full border-2 border-slate-300 hover:border-[#785415] bg-white hover:bg-amber-50 text-[#070D1A] hover:text-[#785415] transition-all flex items-center justify-center cursor-pointer shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Next Residence"
              className="w-11 h-11 rounded-full border-2 border-slate-300 hover:border-[#785415] bg-white hover:bg-amber-50 text-[#070D1A] hover:text-[#785415] transition-all flex items-center justify-center cursor-pointer shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Real Estate Customer Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10 pb-4 border-b border-slate-200">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-5 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all border-2 cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[#785415] text-white border-[#785415] shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:border-[#785415]'
            }`}
          >
            All Clusters (3 Enclaves)
          </button>
          <button
            onClick={() => setSelectedFilter('2bhk')}
            className={`px-5 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all border-2 cursor-pointer ${
              selectedFilter === '2bhk'
                ? 'bg-[#785415] text-white border-[#785415] shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:border-[#785415]'
            }`}
          >
            2 BHK Smart Homes (from ₹97.60 L*)
          </button>
          <button
            onClick={() => setSelectedFilter('3bhk')}
            className={`px-5 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all border-2 cursor-pointer ${
              selectedFilter === '3bhk'
                ? 'bg-[#785415] text-white border-[#785415] shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:border-[#785415]'
            }`}
          >
            3 BHK Riverview (from ₹1.65 Cr*)
          </button>
          <button
            onClick={() => setSelectedFilter('4bhk')}
            className={`px-5 py-2 rounded-full text-xs font-sans font-bold uppercase tracking-wider transition-all border-2 cursor-pointer ${
              selectedFilter === '4bhk'
                ? 'bg-[#785415] text-white border-[#785415] shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:border-[#785415]'
            }`}
          >
            4 & 5 BHK Sky Mansions (from ₹1.80 Cr*)
          </button>
        </div>

        {/* Editorial Horizontal / Responsive Grid */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory"
        >
          {filteredClusters.map((cluster) => (
            <div
              key={cluster.id}
              className="min-w-[320px] sm:min-w-[420px] lg:min-w-[460px] snap-start flex-shrink-0 group"
            >
              <div className="rounded-3xl bg-white p-4 border-2 border-slate-200 shadow-sm hover:border-[#785415] transition-all duration-300 flex flex-col h-full group-hover:-translate-y-1.5 hover:shadow-md">
                
                {/* Architectural Canvas */}
                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 mb-4">
                  <img
                    src={cluster.heroImage}
                    alt={`${cluster.name} - Paranjape Blue Ridge Hinjewadi`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Subtle Dark Vignette for Text Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"></div>

                  {/* Top Badges - Anti-Collision */}
                  <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-[#070D1A] bg-white/95 border border-slate-300 font-bold shadow-sm max-w-[65%] truncate">
                      {cluster.configurations}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-slate-800 bg-white/95 border border-slate-300 font-bold shadow-sm shrink-0">
                      {cluster.towerDetails.storeys} Storeys
                    </span>
                  </div>

                  {/* Bottom Image Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-[10px] font-mono text-amber-200 tracking-wider uppercase mb-1 font-bold">
                      {cluster.eyebrow}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                      {cluster.name}
                    </h3>
                  </div>
                </div>

                {/* Editorial Body & Real Estate Data */}
                <div className="p-2 flex flex-col justify-between flex-grow space-y-4">
                  <p className="text-xs sm:text-sm text-slate-700 line-clamp-2 leading-relaxed font-sans font-medium">
                    {cluster.architecturalStory}
                  </p>

                  {/* High-Contrast Real Estate Metrics Box */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-600 tracking-wider block font-bold">Carpet Area</span>
                      <span className="text-sm font-sans font-bold text-[#070D1A]">{cluster.carpetAreaRange}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-600 tracking-wider block font-bold">Price Offerings</span>
                      <span className="text-sm font-sans font-bold text-[#785415]">
                        {cluster.isPriceVerified ? cluster.priceStarting : "Upon Private Request"}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-[9px] font-mono uppercase text-slate-600 tracking-wider block font-bold">Possession</span>
                      <span className="text-xs font-sans font-bold text-[#070D1A]">{cluster.possessionTimeline}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-[9px] font-mono uppercase text-slate-600 tracking-wider block font-bold">MahaRERA Reg</span>
                      <span className="text-xs font-mono font-bold text-[#785415]">{cluster.reraNumber}</span>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={() => onSelectCluster && onSelectCluster(cluster)}
                      className="py-3 px-3 rounded-xl btn-champagne text-center text-xs font-sans font-bold uppercase tracking-wider cursor-pointer border-none flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Download size={13} />
                      <span>Cost Sheet</span>
                    </button>

                    <a
                      href={cluster.id === 'ridges-41' ? '/paranjape-blue-ridge-41-hinjewadi-pune' : cluster.id === 'altius' ? '/paranjape-blue-ridge-the-altius-hinjewadi-pune' : '/paranjape-blue-ridge-promenade-hinjewadi-pune'}
                      className="py-3 px-3 rounded-xl bg-white hover:bg-slate-50 text-[#070D1A] hover:text-[#785415] transition-all text-xs font-sans font-bold tracking-wider uppercase flex items-center justify-center gap-1 no-underline border-2 border-slate-300 hover:border-[#785415]"
                    >
                      <span>Explore</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

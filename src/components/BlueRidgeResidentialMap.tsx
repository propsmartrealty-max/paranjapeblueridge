"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, ArrowRight, Sparkles, Building, Trees, Waves, GraduationCap, X, Briefcase } from 'lucide-react';
import { blueRidgeClusters, ClusterResidence } from '@/data/cms/clusters';

export default function BlueRidgeResidentialMap() {
  const [selectedCluster, setSelectedCluster] = useState<ClusterResidence>(blueRidgeClusters[0]);

  const townshipPointers = [
    { name: "Mula River Promenade", type: "nature", x: 25, y: 70, icon: Waves },
    { name: "9-Hole Golf Course", type: "sport", x: 45, y: 55, icon: Trees },
    { name: "Blue Ridge SEZ (3M+ Sq. Ft.)", type: "sez", x: 65, y: 35, icon: Briefcase },
    { name: "Blue Ridge Public School (ICSE)", type: "school", x: 75, y: 70, icon: GraduationCap },
    { name: "Rajiv Gandhi IT Park Gate", type: "transit", x: 80, y: 20, icon: Navigation },
  ];

  return (
    <section id="masterplan" className="py-24 sm:py-32 bg-[#FAF9F6] relative overflow-hidden border-t border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="chapter-badge mb-4">
            <span>06 • Interactive Township Masterplan & Transit</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-[#070D1A] tracking-tight leading-[1.08]">
            Discover the neighbourhoods <br />
            <span className="italic font-light text-gradient-champagne">of Blue Ridge.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed font-sans font-normal">
            An expansive 138-acre canvas orchestrating private residences, championship greens, a scenic river promenade, and high-tech corporate connectivity into a unified address.
          </p>
        </div>

        {/* Masterplan Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT 8-COL: INTERACTIVE MAP */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl bg-[#0F172A] border border-slate-700/60 p-4 sm:p-8 overflow-hidden shadow-lg">
              {/* Abstract Architectural Schematic SVG Map */}
              <svg 
                className="w-full h-full opacity-80" 
                viewBox="0 0 800 500" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* River Mula Meander (Left to Bottom) */}
                <path 
                  d="M 20,480 Q 180,380 220,240 T 260,20" 
                  stroke="#38bdf8" 
                  strokeWidth="42" 
                  strokeLinecap="round" 
                  strokeOpacity="0.35" 
                />
                <path 
                  d="M 20,480 Q 180,380 220,240 T 260,20" 
                  stroke="#38bdf8" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  strokeOpacity="0.8" 
                />

                {/* 9-Hole Golf Greens Contour */}
                <ellipse cx="380" cy="280" rx="140" ry="90" fill="#065f46" fillOpacity="0.35" stroke="#10b981" strokeWidth="1.5" strokeDasharray="6 4" />
                <text x="340" y="280" fill="#6ee7b7" fontSize="11" fontFamily="monospace" letterSpacing="2">GOLF COURSE GREENS</text>

                {/* Blue Ridge SEZ Commercial Zone Contour */}
                <rect x="520" y="100" width="180" height="110" rx="16" fill="#1e3a8a" fillOpacity="0.3" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="6 4" />
                <text x="540" y="160" fill="#93c5fd" fontSize="10" fontFamily="monospace" letterSpacing="1.5">BLUE RIDGE SEZ (3M+ SQ. FT.)</text>

                {/* Township Perimeter Ring Road */}
                <rect x="80" y="40" width="660" height="420" rx="40" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="8 6" />

                {/* Internal Boulevard Arteries */}
                <line x1="260" y1="200" x2="680" y2="200" stroke="rgba(197, 160, 89, 0.4)" strokeWidth="3" />
                <line x1="450" y1="60" x2="450" y2="440" stroke="rgba(197, 160, 89, 0.3)" strokeWidth="2" />
                <line x1="260" y1="360" x2="720" y2="360" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
              </svg>

              {/* Interactive Township Landmark Points */}
              {townshipPointers.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={i}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-default"
                  >
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[9px] font-mono text-slate-200">
                      <Icon size={11} className="text-[#DFC28D] shrink-0" />
                      <span className="hidden sm:inline">{p.name}</span>
                    </div>
                  </div>
                );
              })}

              {/* Interactive Residential Cluster Hotspots */}
              {blueRidgeClusters.map((cluster) => {
                const isSelected = selectedCluster.id === cluster.id;
                return (
                  <button
                    key={cluster.id}
                    onClick={() => setSelectedCluster(cluster)}
                    style={{
                      left: `${cluster.masterplanPosition.coordinates.x}%`,
                      top: `${cluster.masterplanPosition.coordinates.y}%`
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-20 group ${
                      isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                    }`}
                  >
                    {/* Pulsing Beacon Ring */}
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute w-12 h-12 rounded-full transition-all ${
                        isSelected ? 'bg-amber-400/30 animate-ping' : 'bg-white/10'
                      }`}></span>
                      
                      {/* Interactive Pin Marker */}
                      <div className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2 border-2 backdrop-blur-xl shadow-md transition-all ${
                        isSelected 
                          ? 'bg-[#785415] text-white border-[#785415] font-bold' 
                          : 'bg-white text-[#070D1A] border-slate-300 hover:border-[#785415]'
                      }`}>
                        <Building size={12} className={isSelected ? 'text-white' : 'text-[#785415]'} />
                        <span className={`text-[11px] sm:text-xs font-sans whitespace-nowrap tracking-wide font-bold ${
                          isSelected ? 'inline' : 'hidden sm:inline'
                        }`}>{cluster.name}</span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Map Footer Compass */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-mono text-slate-300">
                <Navigation size={12} className="text-[#DFC28D] rotate-45" />
                <span>138-Acre Master Precinct Schematic</span>
              </div>
            </div>
          </div>

          {/* RIGHT 4-COL: LIVE CLUSTER INSPECTOR HUD */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCluster.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl p-6 sm:p-8 border-2 border-slate-200 bg-white shadow-md space-y-6"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#785415] block mb-1 font-bold">
                    Selected Residential Cluster
                  </span>
                  <h3 className="text-2xl font-serif text-[#070D1A] font-bold">
                    {selectedCluster.name}
                  </h3>
                  <p className="text-xs text-slate-700 mt-1 font-sans font-medium">
                    {selectedCluster.eyebrow}
                  </p>
                </div>

                {/* Spec List */}
                <div className="space-y-3 pt-4 border-t border-slate-200 text-xs font-sans">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Configuration:</span>
                    <span className="text-[#070D1A] font-bold">{selectedCluster.configurations}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Carpet Area:</span>
                    <span className="text-[#070D1A] font-mono font-bold">{selectedCluster.carpetAreaRange}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Architecture:</span>
                    <span className="text-[#070D1A] font-bold">{selectedCluster.towerDetails.storeys} Storeys ({selectedCluster.towerDetails.structureType})</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Pricing:</span>
                    <span className="text-[#785415] font-bold font-mono">
                      {selectedCluster.isPriceVerified ? selectedCluster.priceStarting : "Upon Request"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-600 font-medium">MahaRERA:</span>
                    <span className="text-slate-700 font-mono text-[11px] font-semibold">{selectedCluster.reraNumber}</span>
                  </div>
                </div>

                {/* Proximity Within Masterplan */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[10px] font-mono text-[#785415] uppercase tracking-wider block font-bold">
                    Immediate Proximity
                  </span>
                  <ul className="space-y-1 text-xs text-slate-700 font-medium">
                    {selectedCluster.masterplanPosition.nearbyKeyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#785415]"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <a
                  href={
                    selectedCluster.id === 'ridges-41'
                      ? '/paranjape-blue-ridge-41-hinjewadi-pune'
                      : selectedCluster.id === 'altius'
                      ? '/paranjape-blue-ridge-the-altius-hinjewadi-pune'
                      : '/paranjape-blue-ridge-promenade-hinjewadi-pune'
                  }
                  className="w-full py-3.5 rounded-full btn-champagne flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest no-underline transition-all"
                >
                  <span>Explore {selectedCluster.name}</span>
                  <ArrowRight size={14} />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

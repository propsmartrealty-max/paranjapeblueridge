"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, ArrowRight, Sparkles, Building, Trees, Waves, GraduationCap, X } from 'lucide-react';
import { blueRidgeClusters, ClusterResidence } from '@/data/cms/clusters';

export default function BlueRidgeResidentialMap() {
  const [selectedCluster, setSelectedCluster] = useState<ClusterResidence>(blueRidgeClusters[0]);
  const [activeLayer, setActiveLayer] = useState<'all' | 'residences' | 'amenities'>('all');

  const townshipPointers = [
    { name: "Mula River Promenade", type: "nature", x: 25, y: 70, icon: Waves },
    { name: "9-Hole Executive Golf Course", type: "sport", x: 45, y: 55, icon: Trees },
    { name: "Blue Ridge Marina & Boat Club", type: "marina", x: 30, y: 40, icon: Waves },
    { name: "Blue Ridge Public School (ICSE)", type: "school", x: 75, y: 70, icon: GraduationCap },
    { name: "Rajiv Gandhi IT Park Gate", type: "transit", x: 80, y: 25, icon: Navigation },
  ];

  return (
    <section id="masterplan" className="py-24 sm:py-32 bg-[#030508] relative overflow-hidden border-t border-white/[0.06]">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-champagne block mb-3">
            Interactive Township Masterplan
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal text-ivory tracking-tight leading-[1.08]">
            Discover the neighbourhoods <br />
            <span className="italic font-light text-gradient-champagne">of Blue Ridge.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-stone-light leading-relaxed font-sans font-light">
            An expansive 138-acre canvas orchestrating private residences, championship greens, a scenic river promenade, and high-tech corporate connectivity into a unified address.
          </p>
        </div>

        {/* Masterplan Canvas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT 8-COL: FULL-SCREEN OBSIDIAN INTERACTIVE MAP */}
          <div className="lg:col-span-8">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-3xl bg-[#080d18] border border-white/10 p-4 sm:p-8 overflow-hidden shadow-glass-elevated">
              {/* Abstract Architectural Schematic SVG Map */}
              <svg 
                className="w-full h-full opacity-60" 
                viewBox="0 0 800 500" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* River Mula Meander (Left to Bottom) */}
                <path 
                  d="M 20,480 Q 180,380 220,240 T 260,20" 
                  stroke="#38bdf8" 
                  strokeWidth="38" 
                  strokeLinecap="round" 
                  strokeOpacity="0.3" 
                />
                <path 
                  d="M 20,480 Q 180,380 220,240 T 260,20" 
                  stroke="#38bdf8" 
                  strokeWidth="6" 
                  strokeLinecap="round" 
                  strokeOpacity="0.7" 
                />

                {/* 9-Hole Golf Greens Contour */}
                <ellipse cx="380" cy="280" rx="140" ry="90" fill="#065f46" fillOpacity="0.25" stroke="#10b981" strokeWidth="1.5" strokeDasharray="6 4" />
                <text x="340" y="280" fill="#6ee7b7" fontSize="11" fontFamily="monospace" letterSpacing="2">GOLF COURSE GREENS</text>

                {/* Township Perimeter Ring Road */}
                <rect x="80" y="40" width="660" height="420" rx="40" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="8 6" />

                {/* Internal Boulevard Arteries */}
                <line x1="260" y1="200" x2="680" y2="200" stroke="rgba(197, 160, 89, 0.3)" strokeWidth="3" />
                <line x1="450" y1="60" x2="450" y2="440" stroke="rgba(197, 160, 89, 0.2)" strokeWidth="2" />
                <line x1="260" y1="360" x2="720" y2="360" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
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
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-[9px] font-mono text-stone-light">
                      <Icon size={11} className="text-champagne shrink-0" />
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
                        isSelected ? 'bg-champagne/20 animate-ping' : 'bg-white/5'
                      }`}></span>
                      
                      {/* Interactive Pin Marker */}
                      <div className={`px-3 py-1.5 rounded-full flex items-center gap-2 border backdrop-blur-xl shadow-glass transition-all ${
                        isSelected 
                          ? 'bg-champagne text-obsidian border-champagne font-bold' 
                          : 'bg-[#0a1122]/90 text-ivory border-white/20 hover:border-champagne'
                      }`}>
                        <Building size={12} className={isSelected ? 'text-obsidian' : 'text-champagne'} />
                        <span className="text-xs font-sans whitespace-nowrap tracking-wide">{cluster.name}</span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Map Footer Compass */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[10px] font-mono text-stone">
                <Navigation size={12} className="text-champagne rotate-45" />
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
                className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-glass-elevated space-y-6"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-champagne block mb-1">
                    Selected Residential Cluster
                  </span>
                  <h3 className="text-2xl font-serif text-ivory font-medium">
                    {selectedCluster.name}
                  </h3>
                  <p className="text-xs text-stone-light mt-1 font-sans">
                    {selectedCluster.eyebrow}
                  </p>
                </div>

                {/* Spec List */}
                <div className="space-y-3 pt-4 border-t border-white/[0.08] text-xs font-sans">
                  <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                    <span className="text-stone">Configuration:</span>
                    <span className="text-ivory font-medium">{selectedCluster.configurations}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                    <span className="text-stone">Carpet Area:</span>
                    <span className="text-ivory font-mono">{selectedCluster.carpetAreaRange}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                    <span className="text-stone">Architecture:</span>
                    <span className="text-ivory font-medium">{selectedCluster.towerDetails.storeys} Storeys ({selectedCluster.towerDetails.structureType})</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                    <span className="text-stone">Pricing:</span>
                    <span className="text-champagne-light font-medium font-mono">
                      {selectedCluster.isPriceVerified ? selectedCluster.priceStarting : "Upon Request"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-stone">MahaRERA:</span>
                    <span className="text-stone-light font-mono text-[11px]">{selectedCluster.reraNumber}</span>
                  </div>
                </div>

                {/* Proximity Within Masterplan */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <span className="text-[10px] font-mono text-champagne uppercase tracking-wider block">
                    Immediate Proximity
                  </span>
                  <ul className="space-y-1 text-xs text-stone-light">
                    {selectedCluster.masterplanPosition.nearbyKeyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-champagne"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <a
                  href={`/paranjape-blue-ridge-${selectedCluster.slug === 'ridges-41' ? '41' : selectedCluster.slug}-hinjewadi-pune`}
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

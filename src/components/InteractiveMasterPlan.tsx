"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Info, Compass, ArrowRight, Ruler, IndianRupee, Layers, Eye } from 'lucide-react';
import { projects } from '@/data/master-data';
import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';

export default function InteractiveMasterPlan() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const { formatPrice, currency } = useCurrency();

  const coordinates = {
    promenade: { top: '38%', left: '46%' },
    altius: { top: '55%', left: '72%' },
    ridges41: { top: '42%', left: '22%' },
  };

  return (
    <section className="py-24 relative overflow-hidden" id="master-plan">
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="ultra-glass-card border border-gold/30 rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-12 shadow-2xl relative overflow-hidden hud-frame"
        >
          <div className="luminous-line-gold absolute top-0 left-0 right-0 opacity-40"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="gilded-pill mb-3">
                <Compass size={12} /> Township GIS Topography
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-warm-white font-bold mt-2">
                138-Acre <span className="italic font-normal text-gilded">Master Layout</span>
              </h2>
            </div>
            <div className="p-4 bg-gold/10 border border-gold/30 rounded-2xl max-w-md shadow-sm">
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed flex items-center gap-2 font-medium">
                <Eye size={16} className="text-gold shrink-0" />
                <span>Interactive topological map. Tap or hover over the glowing radar beacons to inspect live tower specs.</span>
              </p>
            </div>
          </div>

          {/* THE INTERACTIVE MAP HUD ENGINE */}
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-[#02050A] rounded-3xl border border-gold/40 overflow-hidden shadow-2xl group">
            
            {/* Background Grid & Topology */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(223,177,91,0.2) 1px, transparent 0)', backgroundSize: '36px 36px' }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40"></div>
            
            {/* GIS River graphic */}
            <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 500">
              <path d="M0,320 C200,420 400,220 600,320 C800,420 1000,220 1000,220 L1000,500 L0,500 Z" fill="url(#riverGradient)" />
              <defs>
                <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                  <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.35" />
                </linearGradient>
              </defs>
            </svg>

            {/* River & Golf HUD markers */}
            <div className="absolute bottom-6 right-6 px-3.5 py-1.5 bg-blue-500/15 border border-blue-400/40 rounded-full text-[9px] text-blue-300 uppercase tracking-widest font-mono pointer-events-none backdrop-blur-md shadow-md">
              ≈ 1.5 KM Mula River Frontage
            </div>
            <div className="absolute top-6 left-6 px-3.5 py-1.5 bg-emerald-500/15 border border-emerald-400/40 rounded-full text-[9px] text-emerald-300 uppercase tracking-widest font-mono pointer-events-none backdrop-blur-md shadow-md">
              ⛳ 9-Hole Golf Course Zone
            </div>

            {/* Interactive Tower Beacons */}
            {projects.map((project) => (
              <div
                key={project.id}
                className="absolute group/node z-20"
                style={{ top: coordinates[project.id as keyof typeof coordinates]?.top, left: coordinates[project.id as keyof typeof coordinates]?.left }}
                onMouseEnter={() => setActiveProject(project.id)}
                onMouseLeave={() => setActiveProject(null)}
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
              >
                {/* Radar Beacon Marker */}
                <div className="relative w-10 h-10 md:w-14 md:h-14 -ml-5 -mt-5 md:-ml-7 md:-mt-7 cursor-pointer">
                  <div className={`absolute inset-0 rounded-full animate-ping opacity-60 ${activeProject === project.id ? 'bg-gold' : 'bg-gold/40'}`}></div>
                  <div className={`absolute inset-1.5 rounded-full border-2 backdrop-blur-md transition-all ${activeProject === project.id ? 'bg-gradient-to-r from-gold to-gold-light border-white shadow-[0_0_25px_rgba(223,177,91,0.9)] scale-110' : 'bg-black/85 border-gold/70'}`}></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className={`text-[10px] md:text-xs font-bold font-mono ${activeProject === project.id ? 'text-navy' : 'text-gold'}`}>
                      {project.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Floating Glass Tooltip HUD */}
                <AnimatePresence>
                  {activeProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 sm:w-80 bg-black/95 backdrop-blur-2xl border border-gold/50 rounded-2xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.9)] pointer-events-auto z-50 text-left"
                    >
                      <div className="flex justify-between items-start border-b border-gold/25 pb-2.5 mb-3">
                        <div>
                          <span className="text-[9px] text-gold uppercase tracking-widest font-bold font-mono">{project.tagline}</span>
                          <h4 className="text-lg font-serif text-white font-bold">{project.name}</h4>
                        </div>
                        <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono font-bold border border-emerald-500/30">RERA Approved</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="p-2 bg-white/5 rounded-xl border border-gold/20">
                          <span className="text-[9px] text-white/70 uppercase tracking-wider block font-medium">Carpet Area</span>
                          <span className="text-xs font-bold text-white font-mono">{project.carpetArea.split(' ')[0]} Sq.Ft</span>
                        </div>
                        <div className="p-2 bg-white/5 rounded-xl border border-gold/20">
                          <span className="text-[9px] text-white/70 uppercase tracking-wider block font-medium">Starts At</span>
                          <span className="text-xs font-bold text-gold font-mono">{formatPrice(project.priceValue)}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {Array.from(new Set(project.configurations.map(c => `${c.numberOfRooms} BHK`))).map(bhk => (
                          <span key={bhk} className="px-2 py-0.5 bg-gold/15 border border-gold/30 text-[8px] rounded-md text-gold font-bold font-mono">{bhk}</span>
                        ))}
                        <span className="px-2 py-0.5 bg-white/10 border border-white/15 text-[8px] rounded-md text-white font-mono">{project.storeys} Levels</span>
                      </div>

                      <Link 
                        href={`/${project.slug}`} 
                        className="w-full py-2.5 bg-gradient-to-r from-gold via-gold-light to-gold text-navy text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-gold/30 hover:scale-[1.02] btn-sheen"
                      >
                        <span>Explore Tower Plans</span>
                        <ArrowRight size={12} />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

          </div>
          <div className="luminous-line-gold absolute bottom-0 left-0 right-0 opacity-40"></div>
        </motion.div>
      </div>
    </section>
  );
}

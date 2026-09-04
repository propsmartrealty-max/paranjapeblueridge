"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map, Info, Compass, ArrowRight, Ruler, IndianRupee, Layers, 
  Eye, Maximize2, ZoomIn, ZoomOut, RotateCcw, X, Download
} from 'lucide-react';
import { projects } from '@/data/master-data';
import { useCurrency } from '@/context/CurrencyContext';

export default function InteractiveMasterPlan() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'hybrid' | 'blueprint'>('hybrid');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const { formatPrice } = useCurrency();

  const coordinates = {
    promenade: { top: '38%', left: '46%' },
    altius: { top: '55%', left: '72%' },
    ridges41: { top: '42%', left: '22%' },
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  const handleOpenLightbox = () => {
    setZoomLevel(1);
    setIsLightboxOpen(true);
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex bg-black/60 p-1 rounded-2xl border border-gold/30">
                <button
                  type="button"
                  onClick={() => setViewMode('hybrid')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${viewMode === 'hybrid' ? 'bg-gold text-slate-950 shadow-md font-bold' : 'text-slate-300 hover:text-white'}`}
                >
                  Interactive Beacons
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('blueprint')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${viewMode === 'blueprint' ? 'bg-gold text-slate-950 shadow-md font-bold' : 'text-slate-300 hover:text-white'}`}
                >
                  Original Blueprint
                </button>
              </div>
              <button
                type="button"
                onClick={handleOpenLightbox}
                className="px-4 py-2 bg-gold/10 hover:bg-gold/20 border border-gold/30 rounded-2xl text-xs text-gold font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <Layers size={14} /> Inspect Blueprint
              </button>
            </div>
          </div>

          {/* THE INTERACTIVE MAP HUD ENGINE */}
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-[#02050A] rounded-3xl border border-gold/40 overflow-hidden shadow-2xl group">
            
            {/* Authentic Master Layout Image Layer */}
            <img 
              src="/assets/images/master-layout-plan-hq.jpg" 
              alt="Paranjape Blue Ridge 138-Acre Official Master Layout Plan"
              className={`absolute inset-0 w-full h-full object-contain md:object-cover object-center transition-all duration-700 ${viewMode === 'blueprint' ? 'opacity-95 contrast-110 filter brightness-105' : 'opacity-40 filter contrast-125 group-hover:opacity-65'}`}
            />
            {viewMode === 'hybrid' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50 pointer-events-none"></div>
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(223,177,91,0.15) 1px, transparent 0)', backgroundSize: '36px 36px' }}></div>
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
              </>
            )}

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

                      <a 
                        href={`/${project.slug}`} 
                        className="w-full py-2.5 bg-gradient-to-r from-[#B88E3E] to-[#96722E] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md no-underline hover:brightness-110"
                      >
                        <span>Explore Tower Plans</span>
                        <ArrowRight size={12} />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

          </div>
          <div className="luminous-line-gold absolute bottom-0 left-0 right-0 opacity-40"></div>
        </motion.div>
      </div>

      {/* Masterplan Blueprint Inspection Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4 sm:p-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 text-white max-w-7xl mx-auto w-full">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#B88E3E] font-bold">138-Acre Master Layout</span>
                <span className="hidden sm:inline text-white/30">|</span>
                <h4 className="text-sm sm:text-base font-serif font-bold text-white">Paranjape Blue Ridge Township GIS Blueprint</h4>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white/10 rounded-xl p-1 border border-white/15">
                  <button
                    onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))}
                    aria-label="Zoom Out"
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="px-2 text-xs font-mono font-bold text-white/80">{Math.round(zoomLevel * 100)}%</span>
                  <button
                    onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
                    aria-label="Zoom In"
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
                  >
                    <ZoomIn size={16} />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    aria-label="Reset Zoom"
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-all cursor-pointer ml-1"
                    title="Reset Zoom"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                <a
                  href="/assets/images/master-layout-plan-hq.jpg"
                  download="Paranjape-Blue-Ridge-Master-Layout.jpg"
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B88E3E] text-slate-950 text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer no-underline"
                >
                  <Download size={14} />
                  <span>Download Blueprint</span>
                </a>

                <button
                  onClick={() => setIsLightboxOpen(false)}
                  aria-label="Close Lightbox"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer ml-2"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto flex items-center justify-center p-2 sm:p-6 cursor-grab active:cursor-grabbing">
              <div 
                className="transition-transform duration-200 ease-out bg-black p-2 rounded-2xl shadow-2xl max-w-full max-h-full flex items-center justify-center"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img
                  src="/assets/images/master-layout-plan-hq.jpg"
                  alt="Paranjape Blue Ridge 138-Acre Official Master Layout Plan"
                  className="max-h-[75vh] w-auto max-w-full object-contain select-none pointer-events-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

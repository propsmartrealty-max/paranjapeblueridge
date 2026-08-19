"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Info, Compass, ArrowRight, Ruler, IndianRupee } from 'lucide-react';
import { projects } from '@/data/master-data';
import Link from 'next/link';

export default function InteractiveMasterPlan() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Hardcoded abstract coordinates for the visual map
  const coordinates = {
    promenade: { top: '35%', left: '45%' },
    altius: { top: '55%', left: '70%' },
    ridges41: { top: '40%', left: '20%' },
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#02050A]">
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-gold font-bold tracking-[6px] uppercase text-xs flex items-center gap-2 mb-4">
              <Compass size={14} /> Township Mapping
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-warm-white">
              138-Acre <span className="italic font-normal text-gilded">Master Plan</span>
            </h2>
          </div>
          <p className="text-text-light/80 max-w-md text-sm md:text-base border-l-2 border-gold/30 pl-4">
            Explore the topological layout of Pune's most prestigious integrated township. Hover over the glowing clusters to view real-time inventory and pricing data.
          </p>
        </div>

        {/* The Interactive Map Engine */}
        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-[#050A14] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl group">
          
          {/* Background Grid & Topology */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,215,0,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#02050A] via-transparent to-transparent"></div>
          
          {/* Abstract River Graphic */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 500">
            <path d="M0,300 C200,400 400,200 600,300 C800,400 1000,200 1000,200 L1000,500 L0,500 Z" fill="url(#riverGradient)" />
            <defs>
              <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute bottom-10 right-10 text-[10px] text-blue-400/50 uppercase tracking-widest font-mono pointer-events-none">Mula River</span>
          <span className="absolute top-10 left-10 text-[10px] text-green-400/50 uppercase tracking-widest font-mono pointer-events-none">9-Hole Golf Course</span>

          {/* Interactive Nodes */}
          {projects.map((project) => (
            <div
              key={project.id}
              className="absolute group/node z-20"
              style={{ top: coordinates[project.id as keyof typeof coordinates]?.top, left: coordinates[project.id as keyof typeof coordinates]?.left }}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              {/* Node Marker */}
              <div className="relative w-8 h-8 md:w-12 md:h-12 -ml-4 -mt-4 md:-ml-6 md:-mt-6 cursor-pointer">
                <div className={`absolute inset-0 rounded-full animate-ping opacity-50 ${activeProject === project.id ? 'bg-gold' : 'bg-gold/40'}`}></div>
                <div className={`absolute inset-1 rounded-full border-2 backdrop-blur-sm transition-colors ${activeProject === project.id ? 'bg-gold border-white' : 'bg-navy/80 border-gold/50'}`}></div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className={`text-[10px] md:text-xs font-bold ${activeProject === project.id ? 'text-navy' : 'text-gold'}`}>{project.id.charAt(0).toUpperCase()}</span>
                </div>
              </div>

              {/* Data Tooltip */}
              <AnimatePresence>
                {activeProject === project.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-navy/95 backdrop-blur-xl border border-gold/30 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto z-50"
                  >
                    <div className="flex justify-between items-start border-b border-white/10 pb-3 mb-3">
                      <div>
                        <span className="text-[9px] text-gold uppercase tracking-widest">{project.tagline}</span>
                        <h4 className="text-xl font-serif text-warm-white">{project.name}</h4>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <span className="flex items-center gap-1.5 text-[10px] text-text-light/60 uppercase tracking-wider mb-1"><Ruler size={10} /> Carpet</span>
                        <span className="text-sm font-medium text-warm-white">{project.carpetArea.split(' ')[0]} Sq.Ft</span>
                      </div>
                      <div>
                        <span className="flex items-center gap-1.5 text-[10px] text-text-light/60 uppercase tracking-wider mb-1"><IndianRupee size={10} /> Starts At</span>
                        <span className="text-sm font-medium text-warm-white">{project.price.split(' ')[1]}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {Array.from(new Set(project.configurations.map(c => `${c.numberOfRooms} BHK`))).map(bhk => (
                        <span key={bhk} className="px-2 py-1 bg-white/5 border border-white/10 text-[9px] rounded-md text-text-light">{bhk}</span>
                      ))}
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] rounded-md">RERA Approved</span>
                    </div>

                    <Link href={`/${project.slug}`} className="w-full py-2.5 bg-gold hover:bg-gold-light text-navy text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2">
                      Explore Deep Data <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

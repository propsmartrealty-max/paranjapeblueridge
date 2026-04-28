"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Info, ArrowUpRight, Navigation } from 'lucide-react';
import { projects } from '@/data/master-data';
import Link from 'next/link';

export default function MasterNavigator() {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);

  const clusters = [
    { id: 'promenade', name: 'Promenade', x: '25%', y: '30%', color: '#C5A059' },
    { id: 'altius', name: 'The Altius', x: '45%', y: '20%', color: '#C5A059' },
    { id: 'ridges-41', name: 'Ridges 41', x: '65%', y: '40%', color: '#C5A059' },
    { id: 'school', name: 'BR Public School', x: '35%', y: '60%', color: '#fff' },
    { id: 'golf', name: 'Golf Course', x: '70%', y: '20%', color: '#fff' },
    { id: 'boat', name: 'Boat Club', x: '15%', y: '15%', color: '#fff' },
  ];

  const activeProject = projects.find(p => p.id === activeCluster);

  return (
    <section className="py-24">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        {/* INTERACTIVE MAP AREA */}
        <div className="flex-1 relative aspect-[16/10] w-full bg-navy-dark rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl group">
           {/* Stylized Architectural Grid Background */}
           <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #C5A059 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
           
           {/* Schematic Township SVG (Simplified representation) */}
           <svg viewBox="0 0 800 500" className="w-full h-full p-12">
              {/* River Line */}
              <motion.path 
                d="M 0 50 Q 200 20, 400 60 T 800 40" 
                fill="none" 
                stroke="#C5A059" 
                strokeWidth="2" 
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
              />
              
              {/* Road Network */}
              <motion.path 
                d="M 400 500 L 400 0 M 0 250 L 800 250" 
                stroke="white" 
                strokeWidth="1" 
                strokeOpacity="0.1" 
              />

              {/* Interaction Nodes */}
              {clusters.map((cluster) => (
                <motion.g 
                  key={cluster.id}
                  whileHover={{ scale: 1.2 }}
                  className="cursor-pointer"
                  onClick={() => setActiveCluster(cluster.id)}
                >
                  <circle 
                    cx={cluster.x} 
                    cy={cluster.y} 
                    r="12" 
                    fill={activeCluster === cluster.id ? '#C5A059' : 'rgba(255,255,255,0.1)'} 
                    stroke="#C5A059" 
                    strokeWidth="2"
                    className="transition-colors duration-500"
                  />
                  <circle 
                    cx={cluster.x} 
                    cy={cluster.y} 
                    r="20" 
                    fill="transparent" 
                    stroke="#C5A059" 
                    strokeWidth="1" 
                    strokeDasharray="4,4"
                    className="animate-spin-slow"
                  />
                </motion.g>
              ))}
           </svg>

           {/* Floating Map Labels */}
           {clusters.map((cluster) => (
              <div 
                key={cluster.id}
                className="absolute text-[8px] font-bold uppercase tracking-widest text-white/40 pointer-events-none transition-all duration-500"
                style={{ left: cluster.x, top: `calc(${cluster.y} + 30px)`, transform: 'translateX(-50%)', opacity: activeCluster === cluster.id ? 1 : 0.3 }}
              >
                {cluster.name}
              </div>
           ))}

           <div className="absolute top-8 left-8 flex items-center gap-3 bg-navy/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <Navigation size={14} className="text-gold" />
              <span className="text-[10px] font-bold text-warm-white uppercase tracking-widest">Sovereign Spatial Navigator</span>
           </div>
        </div>

        {/* INFO PANEL */}
        <div className="w-full lg:w-[400px]">
           <AnimatePresence mode="wait">
              {activeCluster ? (
                <motion.div
                  key={activeCluster}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                   <div className="flex items-center gap-3 text-gold font-bold tracking-[6px] uppercase text-[10px]">
                      <Info size={14} />
                      Spatial Intelligence
                   </div>
                   <h2 className="text-5xl font-serif text-warm-white">
                     {activeProject ? activeProject.name : clusters.find(c => c.id === activeCluster)?.name}
                   </h2>
                   <p className="text-text-light leading-relaxed">
                     {activeProject 
                       ? activeProject.description 
                       : "A core pillar of the Blue Ridge ecosystem, providing unmatched infrastructure and community value to its 138-acre masterplan."}
                   </p>
                   
                   {activeProject && (
                      <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                        <div>
                          <span className="block text-[8px] text-text-light uppercase tracking-widest mb-1">Status</span>
                          <span className="text-gold font-bold">{activeProject.possession}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] text-text-light uppercase tracking-widest mb-1">Config</span>
                          <span className="text-warm-white font-bold">{activeProject.carpetArea}</span>
                        </div>
                        <Link 
                          href={`/${activeProject.slug}`}
                          className="col-span-2 flex items-center justify-between p-4 bg-gold text-navy rounded-xl font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all"
                        >
                          Explore Volume
                          <ArrowUpRight size={16} />
                        </Link>
                      </div>
                   )}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center text-center py-20 opacity-30">
                   <Map size={48} className="mb-6" />
                   <p className="text-sm italic">Interact with the Sovereign Navigator to explore the township's volumes.</p>
                </div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

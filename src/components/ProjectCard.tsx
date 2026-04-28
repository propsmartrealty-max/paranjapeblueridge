"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, IndianRupee, Layers, Calendar, CheckCircle2 } from 'lucide-react';
import { Project } from '@/data/master-data';
import BlueprintExplorer from './BlueprintExplorer';

interface ProjectCardProps {
  project: Project;
  reverse?: boolean;
}

export default function ProjectCard({ project, reverse }: ProjectCardProps) {
  return (
    <div id={project.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-40 ${reverse ? 'direction-rtl' : ''}`}>
      <motion.div 
        initial={{ x: reverse ? 100 : -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className={`relative rounded-3xl overflow-hidden shadow-2xl border border-gold/10 group ${reverse ? 'lg:order-2' : ''}`}
      >
        {/* Real Image */}
        <motion.img 
          src={project.id === 'promenade' ? '/assets/images/sky-lounge.png' : 
               project.id === 'altius' ? '/assets/images/altius-riverside.png' : 
               '/assets/images/ridges-41.png'} 
          alt={`Paranjape Blue Ridge ${project.name} - Luxury ${project.id === 'promenade' ? '3/4 BHK' : project.id === 'altius' ? '4/5 BHK' : '2/3 BHK'} Apartments in Hinjewadi Phase 1`}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />

        {/* Blueprint Simulation Layer */}
        <motion.div 
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="absolute inset-0 bg-gold/20 backdrop-invert grayscale brightness-150 mix-blend-overlay pointer-events-none"
        ></motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
      </motion.div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col gap-6"
      >
        <span className="text-gold font-bold tracking-[6px] uppercase text-xs">{project.tagline}</span>
        <h2 className="text-5xl font-serif text-warm-white leading-tight">
          {project.name.split(' ')[0]} <span className="italic font-normal text-gilded">{project.name.split(' ').slice(1).join(' ')}</span>
        </h2>
        <p className="text-text-light text-lg leading-relaxed">{project.description}</p>
        
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="bg-[var(--bg)]/40 p-6 rounded-2xl border border-gold/10">
            <Ruler className="text-gold mb-3" size={20} />
            <span className="block text-2xl font-serif text-gilded">{project.carpetArea.split(' ')[0]}</span>
            <span className="text-[10px] text-text-light uppercase tracking-widest">Carpet Area (Sq.Ft)</span>
          </div>
          <div className="bg-[var(--bg)]/40 p-6 rounded-2xl border border-gold/10">
            <IndianRupee className="text-gold mb-3" size={20} />
            <span className="block text-2xl font-serif text-gilded">{project.price.split(' ')[1]}</span>
            <span className="text-[10px] text-text-light uppercase tracking-widest">Starting Price</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6">
            <h4 className="text-warm-white font-bold text-sm uppercase tracking-widest border-b border-white/10 pb-2">Unique Selling Points</h4>
            <div className="grid grid-cols-1 gap-3">
                {project.usp.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-text">
                        <CheckCircle2 size={16} className="text-gold" />
                        <span className="text-sm">{item}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="mt-8 flex gap-4">
            <BlueprintExplorer projectId={project.id} projectName={project.name} />
            <a 
              href={`/${project.slug}`}
              className="px-10 py-4 bg-white/5 border border-white/10 rounded-full text-warm-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3"
            >
              View Official Page
            </a>
        </div>
      </motion.div>
    </div>
  );
}

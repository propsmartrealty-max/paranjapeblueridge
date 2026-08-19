"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Ruler, IndianRupee, Building2, Calendar, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';
import { Project } from '@/data/master-data';
import BlueprintExplorer from './BlueprintExplorer';
import { blurDataURLs } from '@/utils/blurData';

interface ProjectCardProps {
  project: Project;
  reverse?: boolean;
}

const MotionImage = motion(Image);

export default function ProjectCard({ project, reverse }: ProjectCardProps) {
  // Extract unique BHK configurations for tags
  const bhkTypes = Array.from(new Set(project.configurations.map(c => `${c.numberOfRooms} BHK`)));

  return (
    <div id={project.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-24 sm:mb-40 ${reverse ? 'direction-rtl' : ''}`}>
      
      {/* Visual / Image Section */}
      <motion.div 
        initial={{ x: reverse ? 100 : -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        className={`relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gold/10 group ${reverse ? 'lg:order-2' : ''}`}
      >
        <MotionImage 
          src={project.id === 'promenade' ? '/assets/images/real-township-day-2.jpg' : 
               project.id === 'altius' ? '/assets/images/real-altius-view.jpg' : 
               '/assets/images/ridges41-property.jpg'} 
          alt={`Paranjape Blue Ridge ${project.name} - Luxury ${bhkTypes.join(', ')} Apartments in Hinjewadi Phase 1`}
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL={project.id === 'altius' ? blurDataURLs.darkGray : blurDataURLs.lightSkyBlue}
          className="w-full h-auto min-h-[400px] object-cover transition-transform duration-1000 group-hover:scale-110"
        />

        {/* Blueprint Simulation Layer */}
        <motion.div 
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          className="absolute inset-0 bg-gold/20 backdrop-invert grayscale brightness-150 mix-blend-overlay pointer-events-none"
        ></motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#02050A] via-[#02050A]/40 to-transparent opacity-90"></div>

        {/* Configurations Badge Overlay */}
        <div className="absolute top-6 left-6 flex gap-2 flex-wrap max-w-[80%]">
          {bhkTypes.map((bhk, idx) => (
            <span key={idx} className="bg-black/60 backdrop-blur-md border border-gold/30 text-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Tag size={10} /> {bhk}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Data / Content Section */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col gap-5 sm:gap-6"
      >
        <span className="text-gold font-bold tracking-[3px] sm:tracking-[5px] uppercase text-[10px] sm:text-xs">
          {project.tagline}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-warm-white leading-tight">
          {project.name.split(' ')[0]} <span className="italic font-normal text-gilded">{project.name.split(' ').slice(1).join(' ')}</span>
        </h2>
        <p className="text-text-light/80 text-sm sm:text-base leading-relaxed text-justify">
          {project.description}
        </p>
        
        {/* Advanced 4-Grid Data Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-2">
          <div className="bg-[#050A14] p-4 rounded-xl border border-white/5 hover:border-gold/30 transition-colors group">
            <Ruler className="text-gold/60 group-hover:text-gold mb-2" size={16} />
            <span className="block text-base sm:text-lg font-serif text-warm-white">{project.carpetArea.split(' ')[0]}</span>
            <span className="text-[9px] text-text-light/50 uppercase tracking-widest">Sq.Ft Carpet</span>
          </div>
          <div className="bg-[#050A14] p-4 rounded-xl border border-white/5 hover:border-gold/30 transition-colors group">
            <IndianRupee className="text-gold/60 group-hover:text-gold mb-2" size={16} />
            <span className="block text-base sm:text-lg font-serif text-warm-white">{project.price.split(' ')[1]}</span>
            <span className="text-[9px] text-text-light/50 uppercase tracking-widest">Starting Price</span>
          </div>
          <div className="bg-[#050A14] p-4 rounded-xl border border-white/5 hover:border-gold/30 transition-colors group">
            <Calendar className="text-gold/60 group-hover:text-gold mb-2" size={16} />
            <span className="block text-base sm:text-lg font-serif text-warm-white whitespace-nowrap overflow-hidden text-ellipsis" title={project.possession}>{project.possession}</span>
            <span className="text-[9px] text-text-light/50 uppercase tracking-widest">Possession</span>
          </div>
          <div className="bg-[#050A14] p-4 rounded-xl border border-white/5 hover:border-gold/30 transition-colors group">
            <Building2 className="text-gold/60 group-hover:text-gold mb-2" size={16} />
            <span className="block text-base sm:text-lg font-serif text-warm-white">{project.storeys} Levels</span>
            <span className="text-[9px] text-text-light/50 uppercase tracking-widest">Tower Height</span>
          </div>
        </div>

        {/* USPs & RERA */}
        <div className="flex flex-col gap-4 mt-4 bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-1">
              <h4 className="text-warm-white font-bold text-xs uppercase tracking-widest">Premium USPs</h4>
              <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-gold/10" title="MahaRERA Registered">
                <ShieldCheck size={12} className="text-green-500" />
                <span className="text-[9px] text-text-light font-mono">{project.reraNumber}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.usp.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-text-light/80">
                        <CheckCircle2 size={14} className="text-gold mt-0.5 shrink-0" />
                        <span className="text-[11px] leading-tight">{item}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Action Controls */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <BlueprintExplorer projectId={project.id} projectName={project.name} />
            </div>
            <a 
              href={`/${project.slug}`}
              className="flex-1 px-6 py-4 bg-transparent border border-gold text-gold text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-black transition-all flex items-center justify-center gap-3 rounded-full text-center"
            >
              Explore Deep Data
            </a>
        </div>
      </motion.div>
    </div>
  );
}

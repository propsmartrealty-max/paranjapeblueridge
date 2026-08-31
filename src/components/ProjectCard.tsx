"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Ruler, IndianRupee, Building2, Calendar, CheckCircle2, ShieldCheck, Tag, ArrowRight } from 'lucide-react';
import { Project } from '@/data/master-data';
import BlueprintExplorer from './BlueprintExplorer';
import { blurDataURLs } from '@/utils/blurData';
import { useCurrency } from '@/context/CurrencyContext';

interface ProjectCardProps {
  project: Project;
  reverse?: boolean;
}

const MotionImage = motion(Image);

export default function ProjectCard({ project, reverse }: ProjectCardProps) {
  const { formatPrice, currency } = useCurrency();
  const bhkTypes = Array.from(new Set(project.configurations.map(c => `${c.numberOfRooms} BHK`)));

  return (
    <motion.div 
      id={project.id} 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="ultra-glass-card border border-gold/30 rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-10 shadow-2xl mb-16 relative overflow-hidden group hud-frame"
    >
      {/* Ambient background glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none group-hover:bg-gold/20 transition-all duration-700"></div>
      <div className="luminous-line-gold absolute top-0 left-0 right-0 opacity-40"></div>

      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 ${reverse ? 'direction-rtl' : ''}`}>
        
        {/* Visual / Image Section (5 cols) */}
        <div className={`lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl border border-gold/30 group/img ${reverse ? 'lg:order-2' : ''}`}>
          <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
            <MotionImage 
              src={project.id === 'promenade' ? '/assets/images/real-township-day-2.jpg' : 
                   project.id === 'altius' ? '/assets/images/real-altius-view.jpg' : 
                   '/assets/images/ridges41-property.jpg'} 
              alt={`Paranjape Blue Ridge ${project.name} - Luxury ${bhkTypes.join(', ')} Apartments in Hinjewadi Phase 1`}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              placeholder="blur"
              blurDataURL={project.id === 'altius' ? blurDataURLs.darkGray : blurDataURLs.lightSkyBlue}
              className="object-cover transition-transform duration-1000 group-hover/img:scale-108"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>

            {/* BHK Badges Overlay */}
            <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap max-w-[85%] z-10">
              {bhkTypes.map((bhk, idx) => (
                <span key={idx} className="bg-black/75 backdrop-blur-md border border-gold/50 text-gold text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-md font-mono">
                  <Tag size={10} /> {bhk}
                </span>
              ))}
            </div>

            {/* MahaRERA badge on image */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
              <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-gold/40 text-gold text-[9px] font-mono font-bold shadow-md">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span>MahaRERA: {project.reraNumber}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data / Content Section (7 cols) */}
        <div className={`lg:col-span-7 flex flex-col gap-4 sm:gap-5 ${reverse ? 'lg:order-1 direction-ltr' : ''}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="gilded-pill text-[9px]">
              {project.tagline}
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              ● Official Inventory
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-warm-white font-bold leading-tight">
            {project.name.split(' ')[0]} <span className="italic font-normal text-gilded">{project.name.split(' ').slice(1).join(' ')}</span>
          </h2>
          
          <p className="text-text-muted text-xs sm:text-sm md:text-base leading-relaxed text-justify font-medium">
            {project.description}
          </p>
          
          {/* 4-Grid Elevated Data Matrix with Prominent Lines */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-1">
            <div className="p-3.5 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-gold/25 shadow-sm hover:border-gold/60 transition-all group/tile">
              <Ruler className="text-gold mb-1.5 group-hover/tile:scale-110 transition-transform" size={16} />
              <span className="block text-sm sm:text-base font-serif text-warm-white font-bold">{project.carpetArea.split(' ')[0]}</span>
              <span className="text-[8px] sm:text-[9px] text-text-muted uppercase tracking-wider font-bold">Sq.Ft Carpet</span>
            </div>
            
            <div className="p-3.5 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-gold/25 shadow-sm hover:border-gold/60 transition-all group/tile relative overflow-hidden">
              {currency.code !== 'INR' && <div className="absolute top-0 right-0 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-[8px] px-1.5 py-0.5 rounded-bl-md z-10">{currency.code}</div>}
              <div className={`mb-1.5 ${currency.code !== 'INR' ? 'text-emerald-500' : 'text-gold group-hover/tile:scale-110 transition-transform'}`}>
                <IndianRupee size={16} className={currency.code !== 'INR' ? 'hidden' : 'block'} />
                <span className={`font-serif text-sm leading-none ${currency.code !== 'INR' ? 'block' : 'hidden'}`}>{currency.symbol}</span>
              </div>
              <span className="block text-sm sm:text-base font-serif text-warm-white font-bold">{formatPrice(project.priceValue).replace(currency.symbol, '')}</span>
              <span className="text-[8px] sm:text-[9px] text-text-muted uppercase tracking-wider font-bold">Starting Price</span>
            </div>

            <div className="p-3.5 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-gold/25 shadow-sm hover:border-gold/60 transition-all group/tile">
              <Calendar className="text-gold mb-1.5 group-hover/tile:scale-110 transition-transform" size={16} />
              <span className="block text-sm sm:text-base font-serif text-warm-white font-bold truncate" title={project.possession}>{project.possession}</span>
              <span className="text-[8px] sm:text-[9px] text-text-muted uppercase tracking-wider font-bold">Possession</span>
            </div>

            <div className="p-3.5 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-gold/25 shadow-sm hover:border-gold/60 transition-all group/tile">
              <Building2 className="text-gold mb-1.5 group-hover/tile:scale-110 transition-transform" size={16} />
              <span className="block text-sm sm:text-base font-serif text-warm-white font-bold">{project.storeys} Levels</span>
              <span className="text-[8px] sm:text-[9px] text-text-muted uppercase tracking-wider font-bold">Tower Height</span>
            </div>
          </div>

          {/* USPs List with high contrast */}
          <div className="p-4 bg-gold/5 rounded-2xl border border-gold/20 shadow-inner">
            <h4 className="text-warm-white font-bold text-[10px] uppercase tracking-widest mb-2.5 font-sans">Key Architectural USPs</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.usp.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-text-muted">
                  <CheckCircle2 size={13} className="text-gold mt-0.5 shrink-0" />
                  <span className="text-xs leading-relaxed text-warm-white font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <div className="flex-1">
              <BlueprintExplorer projectId={project.id} projectName={project.name} />
            </div>
            <a 
              href={`/${project.slug}`}
              className="flex-1 px-6 py-3.5 bg-gradient-to-r from-gold via-gold-light to-gold text-navy text-xs font-bold uppercase tracking-widest rounded-2xl text-center shadow-lg hover:shadow-gold/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 btn-sheen"
            >
              <span>Explore Unit Plans</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
      <div className="luminous-line-gold absolute bottom-0 left-0 right-0 opacity-40"></div>
    </motion.div>
  );
}

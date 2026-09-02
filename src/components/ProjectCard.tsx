"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, Building2, Calendar, CheckCircle2, ShieldCheck, Tag, ArrowRight, Sparkles } from 'lucide-react';
import { Project } from '@/data/master-data';
import BlueprintExplorer from './BlueprintExplorer';
import { useCurrency } from '@/context/CurrencyContext';

interface ProjectCardProps {
  project: Project;
  reverse?: boolean;
}

export default function ProjectCard({ project, reverse }: ProjectCardProps) {
  const { formatPrice } = useCurrency();
  const bhkTypes = Array.from(new Set(project.configurations.map(c => `${c.numberOfRooms} BHK`)));

  const projectImages: Record<string, string> = {
    promenade: '/assets/images/promenade-hero.png',
    altius: '/assets/images/altius-riverside.png',
    ridge41: '/assets/images/ridges41-luxury-tower.png'
  };

  const imageSrc = projectImages[project.id] || '/assets/images/real-township-day.jpg';

  return (
    <motion.div 
      id={project.id} 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="ultra-glass-card rounded-3xl sm:rounded-[3rem] p-6 sm:p-10 mb-16 relative overflow-hidden group border border-gold/30 hover:border-gold/60 shadow-2xl transition-all duration-500"
    >
      {/* Ambient background glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none group-hover:bg-gold/25 transition-all duration-700"></div>

      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10`}>
        
        {/* Visual / Image Section (5 cols) */}
        <div className={`lg:col-span-5 relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gold/30 group/img ${reverse ? 'lg:order-2' : ''}`}>
          <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-navy">
            <img 
              src={imageSrc} 
              alt={`Paranjape Blue Ridge ${project.name} - Luxury ${bhkTypes.join(', ')} Apartments in Hinjewadi Phase 1`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent"></div>

            {/* BHK Badges Overlay */}
            <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap max-w-[85%] z-10">
              {bhkTypes.map((bhk, idx) => (
                <span key={idx} className="bg-navy/90 backdrop-blur-md border border-gold/60 text-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-lg font-mono">
                  <Tag size={10} /> {bhk}
                </span>
              ))}
            </div>

            {/* Price Overlay */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
              <div className="bg-navy/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-gold/40 shadow-lg">
                <span className="text-[10px] font-mono text-text-muted uppercase block">Starting Price</span>
                <span className="text-base sm:text-lg font-bold text-gold font-mono">
                  {formatPrice(project.priceValue)}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/40">
                {project.possession}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section (7 cols) */}
        <div className={`lg:col-span-7 flex flex-col justify-between ${reverse ? 'lg:order-1' : ''}`}>
          <div>
            <div className="flex items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-gold font-bold uppercase tracking-widest">
                <Sparkles size={14} />
                <span>Flagship Enclave</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-text-muted bg-white/5 px-3 py-1 rounded-full border border-white/10">
                <ShieldCheck size={12} className="text-gold" />
                <span>RERA: {project.reraNumber}</span>
              </div>
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif text-warm-white font-bold mb-2">
              {project.name}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-gold mb-4 font-semibold">
              {project.tagline}
            </p>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6 font-sans">
              {project.description}
            </p>

            {/* Spec Matrix Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <div className="bg-navy/80 p-3 rounded-2xl border border-white/10">
                <span className="text-[10px] font-mono text-text-muted uppercase flex items-center gap-1 mb-1">
                  <Ruler size={12} className="text-gold" /> Carpet Area
                </span>
                <span className="text-xs font-bold text-warm-white font-mono">{project.carpetArea}</span>
              </div>
              <div className="bg-navy/80 p-3 rounded-2xl border border-white/10">
                <span className="text-[10px] font-mono text-text-muted uppercase flex items-center gap-1 mb-1">
                  <Building2 size={12} className="text-gold" /> Tower Height
                </span>
                <span className="text-xs font-bold text-warm-white font-mono">{project.storeys} Storeys</span>
              </div>
              <div className="bg-navy/80 p-3 rounded-2xl border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono text-text-muted uppercase flex items-center gap-1 mb-1">
                  <Calendar size={12} className="text-gold" /> Possession
                </span>
                <span className="text-xs font-bold text-warm-white font-mono">{project.possession}</span>
              </div>
            </div>

            {/* USPs Bullet List */}
            <div className="space-y-2 mb-6">
              {project.usp.slice(0, 3).map((usp, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-text-muted">
                  <CheckCircle2 size={14} className="text-gold shrink-0" />
                  <span>{usp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gold/20">
            <a 
              href={`/${project.slug}`}
              className="flex items-center gap-2 bg-gradient-to-r from-gold via-gold-light to-gold text-navy px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:opacity-95 transition-all no-underline shadow-lg"
            >
              <span>Explore {project.name}</span>
              <ArrowRight size={14} />
            </a>

            <a 
              href="https://wa.me/917744009295?text=Hello%2C%20I%20am%20interested%20in%20Paranjape%20Blue%20Ridge."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/5 hover:bg-gold/10 text-warm-white hover:text-gold px-5 py-3 rounded-full font-bold uppercase text-xs tracking-widest border border-gold/30 transition-all no-underline"
            >
              <span>WhatsApp Floor Plan</span>
            </a>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

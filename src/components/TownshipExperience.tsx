"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { School, Ship, Flag, Zap, Droplets, Sparkles } from 'lucide-react';
import { townshipData } from '@/data/master-data';
import MasterNavigator from './MasterNavigator';
import Image from 'next/image';
import { blurDataURLs } from '@/utils/blurData';
import { useLanguage } from '@/context/LanguageContext';

const iconMap = { School, Ship, Flag, Zap, Droplets };

export default function TownshipExperience() {
  const { t } = useLanguage();
  return (
    <section id="amenities" className="py-24 relative overflow-hidden">
      <div className="text-center mb-16">
        <span className="gilded-pill mb-3">{t('The Flagship Experience', 'फ्लॅगशिप अनुभव')}</span>
        <h2 className="text-3xl sm:text-5xl font-serif text-warm-white font-bold mt-2">
          {t('Integrated', 'इंटिग्रेटेड')} <span className="italic font-normal text-gilded">{t('Grandeur', 'ग्रँड्युअर')}</span>
        </h2>
        <p className="text-xs sm:text-sm text-text-muted mt-3 max-w-xl mx-auto font-medium">
          {t('World-class social, sporting, and educational infrastructure within the 138-acre township boundary.', '१३८ एकर टाऊनशिप परिसरामध्ये जागतिक दर्जाच्या सामाजिक, क्रीडा आणि शैक्षणिक सुविधा.')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {townshipData.amenities.map((item, idx) => {
          const IconComp = iconMap[item.icon as keyof typeof iconMap] || Zap;
          return (
            <motion.div 
              key={idx}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 ultra-glass-card border border-gold/30 rounded-[2.5rem] hover:border-gold/60 transition-all text-center group shadow-lg hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent"></div>
              
              <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-gold/5 rounded-2xl flex items-center justify-center text-gold mx-auto mb-6 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy transition-all border border-gold/30 shadow-md">
                <IconComp size={28} />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-warm-white font-bold mb-3">{item.title}</h3>
              <p className="text-text-muted text-xs sm:text-sm leading-relaxed font-medium">{item.description}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-24">
        <MasterNavigator />
      </div>

      {/* AMENITY HERO BANNER */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24 relative min-h-[450px] md:h-[550px] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden border border-gold/30 shadow-2xl group hud-frame"
      >
        <div className="luminous-line-gold absolute top-0 left-0 right-0 opacity-40 z-10"></div>
        <Image 
          src="/assets/images/real-township-day-2.jpg"
          alt="Actual photograph of Blue Ridge Township lifestyle amenities - Boat Club, Golf Course, and Riverfront living in Hinjewadi"
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurDataURLs.lightSkyBlue}
          className="object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/55 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-center p-8 sm:p-14 lg:p-20 z-10">
          <div className="max-w-xl">
            <span className="gilded-pill text-[9px] mb-3 bg-black/50 text-gold border-gold/40">Sovereign Lifestyle</span>
            <h3 className="text-3xl sm:text-5xl font-serif text-white font-bold mb-4 leading-tight">
              A Life <span className="italic text-gilded font-normal">Beyond</span> Ordinary
            </h3>
            <p className="text-white/90 text-xs sm:text-base mb-8 leading-relaxed font-medium">
              138 Acres of curated living. From your child's first step in the Blue Ridge Public School to a serene evening at the private Boat Club on the Mula River.
            </p>
            <div className="flex flex-wrap gap-8">
              <div className="p-4 bg-black/50 backdrop-blur-md rounded-2xl border border-gold/35 shadow-lg">
                <span className="text-2xl sm:text-3xl font-serif text-gilded font-bold block leading-none font-mono">1.5 KM</span>
                <span className="text-[9px] text-white/80 uppercase tracking-widest font-bold mt-1 block">Riverfront Access</span>
              </div>
              <div className="p-4 bg-black/50 backdrop-blur-md rounded-2xl border border-gold/35 shadow-lg">
                <span className="text-2xl sm:text-3xl font-serif text-gilded font-bold block leading-none font-mono">9-Hole</span>
                <span className="text-[9px] text-white/80 uppercase tracking-widest font-bold mt-1 block">Private Golf Course</span>
              </div>
            </div>
          </div>
        </div>
        <div className="luminous-line-gold absolute bottom-0 left-0 right-0 opacity-40 z-10"></div>
      </motion.div>
    </section>
  );
}

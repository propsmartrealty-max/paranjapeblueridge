"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { School, Ship, Flag, Zap, Droplets, Sparkles, Trees, Waves, Trophy, Building2 } from 'lucide-react';
import { townshipData } from '@/data/master-data';
import MasterNavigator from './MasterNavigator';
import { useLanguage } from '@/context/LanguageContext';

const iconMap = { School, Ship, Flag, Zap, Droplets, Trees, Waves, Trophy, Building2 };

export default function TownshipExperience() {
  const { t } = useLanguage();
  return (
    <section id="amenities" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="text-center mb-16">
        <span className="text-xs font-mono font-bold text-gold uppercase tracking-[4px] px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 inline-block mb-3">
          {t('138-Acre Master Amenities', '१३८ एकर मास्टर सुविधा')}
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-warm-white font-bold mt-2">
          {t('Integrated', 'इंटिग्रेटेड')} <span className="text-gilded font-extrabold">{t('Grandeur', 'ग्रँड्युअर')}</span>
        </h2>
        <p className="text-xs sm:text-sm text-text-muted mt-3 max-w-xl mx-auto font-sans">
          {t('World-class social, sporting, and educational infrastructure within the 138-acre township boundary.', '१३८ एकर टाऊनशिप परिसरामध्ये जागतिक दर्जाच्या सामाजिक, क्रीडा आणि शैक्षणिक सुविधा.')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {townshipData.amenities.map((item, idx) => {
          const IconComp = iconMap[item.icon as keyof typeof iconMap] || Zap;
          return (
            <motion.div 
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              viewport={{ once: true }}
              className="p-8 ultra-glass-card rounded-3xl border border-gold/30 hover:border-gold/60 transition-all text-center group shadow-xl relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto mb-6 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy transition-all border border-gold/30 shadow-md">
                <IconComp size={28} />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-warm-white font-bold mb-3">{item.title}</h3>
              <p className="text-text-muted text-xs sm:text-sm leading-relaxed font-sans">{item.description}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-16">
        <MasterNavigator />
      </div>

      {/* AMENITY HERO BANNER */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 relative min-h-[400px] md:h-[500px] rounded-3xl sm:rounded-[3rem] overflow-hidden border border-gold/30 shadow-2xl group"
      >
        <img 
          src="/assets/images/real-township-day-2.jpg"
          alt="Blue Ridge Township lifestyle amenities - Boat Club, Golf Course, and Riverfront living in Hinjewadi"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/60 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-center p-8 sm:p-14 lg:p-20 z-10">
          <div className="max-w-xl">
            <span className="text-xs font-mono font-bold text-gold uppercase tracking-[3px] px-3 py-1 rounded-full bg-navy/80 border border-gold/40 inline-block mb-3">
              Sovereign Lifestyle
            </span>
            <h3 className="text-3xl sm:text-5xl font-serif text-warm-white font-bold mb-4 leading-tight">
              A Life <span className="text-gilded font-extrabold">Beyond</span> Ordinary
            </h3>
            <p className="text-text-light text-sm sm:text-base leading-relaxed mb-6 font-sans">
              Enjoy a captive substation, 24/7 water treatment plant, riverfront jogging promenade, and 0-minute commute to Hinjewadi Phase 1 IT giants.
            </p>
            <a 
              href="https://wa.me/917744009295?text=Hello%2C%20I%20want%20to%20know%20more%20about%20Blue%20Ridge%20Township%20amenities."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold via-gold-light to-gold text-navy px-8 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest no-underline shadow-lg"
            >
              <span>Connect with Lifestyle Desk</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

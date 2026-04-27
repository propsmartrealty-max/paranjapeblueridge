"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { School, Ship, Flag, Zap, Droplets } from 'lucide-react';
import { townshipData } from '@/data/master-data';

import { useLanguage } from '@/context/LanguageContext';

const iconMap = { School, Ship, Flag, Zap, Droplets };

export default function TownshipExperience() {
  const { t } = useLanguage();
  return (
    <section id="amenities" className="py-20 relative overflow-hidden">
      <div className="text-center mb-20">
        <span className="text-gold font-bold tracking-[6px] uppercase text-xs">{t('The Flagship Experience', 'फ्लॅगशिप अनुभव')}</span>
        <h2 className="text-5xl font-serif text-warm-white mt-4">{t('Integrated', 'इंटिग्रेटेड')} <span className="italic font-normal text-gold">{t('Grandeur', 'ग्रँड्युअर')}</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {townshipData.amenities.map((item, idx) => {
          const IconComp = iconMap[item.icon as keyof typeof iconMap] || Zap;
          return (
            <motion.div 
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group p-10 bg-white/5 border border-white/5 rounded-[2.5rem] hover:bg-gold/5 hover:border-gold/20 transition-all text-center"
            >
              <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mx-auto mb-8 group-hover:-rotate-12 transition-transform">
                <IconComp size={32} />
              </div>
              <h3 className="text-2xl font-serif text-warm-white mb-4">{item.title}</h3>
              <p className="text-text-light text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-32 relative rounded-[3rem] overflow-hidden group">
         <img src="/assets/images/amenities-lifestyle.png" alt="Paranjape Blue Ridge Township Lifestyle - Integrated Amenities including Golf Course and Boat Club" className="w-full h-[600px] object-cover transition-transform duration-[3s] group-hover:scale-110" />
         <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/40 to-transparent"></div>
         <div className="absolute inset-0 flex items-center p-20">
            <div className="max-w-xl">
                <h3 className="text-5xl font-serif text-warm-white mb-8 leading-tight">A Life <span className="italic text-gold">Beyond</span> Ordinary</h3>
                <p className="text-text-light text-lg mb-10">138 Acres of curated living. From your child's first step in the Blue Ridge Public School to a serene evening at the private Boat Club.</p>
                <div className="flex gap-10">
                    <div>
                        <span className="text-4xl font-serif text-gold block">1.5 KM</span>
                        <span className="text-[10px] text-text-light uppercase tracking-widest">Riverfront Access</span>
                    </div>
                    <div className="border-l border-white/10 pl-10">
                        <span className="text-4xl font-serif text-gold block">9-Hole</span>
                        <span className="text-[10px] text-text-light uppercase tracking-widest">Private Golf Course</span>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </section>
  );
}

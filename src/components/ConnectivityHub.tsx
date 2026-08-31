"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Map as MapIcon, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ConnectivityHub() {
  const { t } = useLanguage();

  return (
    <section id="connectivity" className="py-12">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="ultra-glass-card border border-gold/30 rounded-[2.5rem] sm:rounded-[3.5rem] p-6 sm:p-12 shadow-2xl relative overflow-hidden hud-frame"
      >
        <div className="luminous-line-gold absolute top-0 left-0 right-0 opacity-40"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <span className="gilded-pill mb-3">{t('Strategic Location', 'धोरणात्मक स्थान')}</span>
            <h2 className="text-3xl sm:text-5xl font-serif text-warm-white font-bold mt-2">
              {t('Visual', 'व्हिज्युअल')} <span className="italic font-normal text-gilded">{t('Connectivity', 'कनेक्टिव्हिटी')}</span>
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-3 leading-relaxed font-medium">
              {t('Positioned at the heart of Hinjewadi Phase 1, Blue Ridge offers direct access to IT parks, the Mumbai-Pune Expressway, and the upcoming Metro Line 3.', 'हिंजवडी फेज १ च्या मध्यभागी स्थित, ब्लू रिज आयटी पार्क्स, मुंबई-पुणे एक्सप्रेसवे आणि आगामी मेट्रो लाईन ३ ला अतुलनीय प्रवेश प्रदान करते.')}
            </p>
          </div>
          <div>
            <a 
              href="https://www.google.com/maps/place/Blue+Ridge,+Phase+1,+Rajiv+Gandhi+Infotech+Park,+Hinjawadi,+Maharashtra+411057/@18.5776944,73.7342787,1760m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bc2bbe4d114d579:0xfec1d303cfb8941a!8m2!3d18.5786825!4d73.7370331" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-gold via-gold-light to-gold text-navy px-7 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg hover:shadow-gold/30 shrink-0 btn-sheen"
              aria-label="Open Paranjape Blue Ridge location in Google Maps"
            >
              <Navigation size={14} />
              <span>{t('Open Google Maps', 'गुगल मॅप्समध्ये उघडा')}</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* MAP CONTAINER */}
        <div className="relative rounded-3xl overflow-hidden border border-gold/30 shadow-2xl h-[450px] sm:h-[550px]">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.354!2d73.7370331!3d18.5786825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbe4d114d579%3A0xfec1d303cfb8941a!2sBlue%20Ridge%2C%20Hinjawadi!5e0!3m2!1sen!2sin!4v1714200000000!5m2!1sen!2sin"
            className="w-full h-full opacity-90 hover:opacity-100 transition-all duration-500"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location of Paranjape Blue Ridge"
          ></iframe>
          
          {/* FLOATING TRANSIT BADGES */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2.5 pointer-events-none">
            {[
              { label: "Metro Line 3 Stn", dist: "800m" },
              { label: "Mumbai-Pune Expressway", dist: "4.5km" },
              { label: "Infosys & Wipro", dist: "1.2km" },
              { label: "Balewadi High Street", dist: "6.5km" }
            ].map((tag, i) => (
              <div key={i} className="px-4 py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-gold/35 rounded-full text-warm-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-2 shadow-xl font-mono">
                <MapIcon className="text-gold" size={12} />
                <span>{tag.label}: <strong className="text-gold">{tag.dist}</strong></span>
              </div>
            ))}
          </div>
        </div>
        <div className="luminous-line-gold absolute bottom-0 left-0 right-0 opacity-40"></div>
      </motion.div>
    </section>
  );
}

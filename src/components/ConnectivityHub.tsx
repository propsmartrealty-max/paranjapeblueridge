"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Map as MapIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ConnectivityHub() {
  const { t } = useLanguage();

  return (
    <section id="connectivity" className="py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <span className="text-gold font-bold tracking-[6px] uppercase text-[10px]">{t('Strategic Location', 'धोरणात्मक स्थान')}</span>
          <h2 className="text-5xl font-serif text-warm-white mt-4">{t('Visual', 'व्हिज्युअल')} <span className="italic font-normal text-gold">{t('Connectivity', 'कनेक्टिव्हिटी')}</span></h2>
          <p className="text-text-light mt-6 text-lg">{t('Positioned at the heart of Hinjewadi Phase 1, Blue Ridge offers unparalleled access to IT parks, the Mumbai-Pune Expressway, and the upcoming Metro Line 3.', 'हिंजवडी फेज १ च्या मध्यभागी स्थित, ब्लू रिज आयटी पार्क्स, मुंबई-पुणे एक्सप्रेसवे आणि आगामी मेट्रो लाईन ३ ला अतुलनीय प्रवेश प्रदान करते.')}</p>
        </div>
        <div className="flex gap-4">
            <a 
                href="https://maps.app.goo.gl/r6vK6G6G6G6G6G6G6" // Mock CID link
                target="_blank"
                className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-text-light hover:text-gold transition-all"
            >
                <Navigation size={14} />
                {t('Open in Google Maps', 'गुगल मॅप्समध्ये उघडा')}
            </a>
        </div>
      </div>

      <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl h-[600px] bg-navy-light">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.261!2d73.738!3d18.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb9e762b3b79%3A0x6739f3a9e64e58b!2sParanjape%20Blue%20Ridge!5e0!3m2!1sen!2sin!4v1714200000000!5m2!1sen!2sin"
            className="w-full h-full grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        
        <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-4 pointer-events-none">
            {[
                { label: "Metro Stn", dist: "800m" },
                { label: "Expressway", dist: "4.5km" },
                { label: "Infosys", dist: "1.2km" },
                { label: "Wipro", dist: "1.5km" }
            ].map((tag, i) => (
                <div key={i} className="px-6 py-3 bg-navy/90 backdrop-blur-xl border border-white/10 rounded-full text-gold font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <MapIcon size={12} />
                    {tag.label}: {tag.dist}
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}

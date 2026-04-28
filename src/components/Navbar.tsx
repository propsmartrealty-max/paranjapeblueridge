"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Menu, X, MessageCircle } from 'lucide-react';
import { projects } from '@/data/master-data';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-10 left-0 right-0 z-50 flex justify-center px-4">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex items-center gap-6 px-6 py-3 rounded-full border border-glass-border transition-all duration-500 ${
            scrolled ? 'bg-navy/90 backdrop-blur-3xl shadow-2xl scale-95' : 'bg-navy/40 backdrop-blur-xl'
          }`}
        >
          <Link href="/" className="flex items-center gap-4 border-r border-white/10 pr-6 mr-2 group">
             <img 
               src="https://www.pscl.in/wp-content/uploads/2025/09/PARANJAPE-NEW-FINAL-LOGO.svg" 
               alt="PSCL" 
               className="h-8 brightness-0 invert transition-transform duration-300 group-hover:scale-105"
             />
             <div className="flex flex-col">
               <span className="font-serif font-bold text-sm tracking-widest text-warm-white group-hover:text-gold transition-colors">BLUE RIDGE</span>
               <span className="text-[10px] text-gold font-bold tracking-[4px] uppercase">Sovereign</span>
             </div>
          </Link>

          <ul className="hidden xl:flex gap-8 items-center list-none p-0 m-0">
            {projects.map(p => {
              const displayName = p.id === 'promenade' ? 'Promenade' : 
                                 p.id === 'altius' ? 'Altius' : '41 Ridge';
              return (
                <li key={p.id}>
                  <a href={`/${p.slug}`} className="text-xs font-bold text-text hover:text-gold uppercase tracking-widest transition-colors">
                    {t(displayName, p.id === 'promenade' ? 'प्रॉमनेड' : p.id === 'altius' ? 'अल्टियस' : '४१ रिज')}
                  </a>
                </li>
              );
            })}
            <li><a href="/#amenities" className="text-xs font-bold text-text hover:text-gold uppercase tracking-widest transition-colors">{t('Township', 'टाऊनशिप')}</a></li>
            <li><a href="/#market" className="text-xs font-bold text-text hover:text-gold uppercase tracking-widest transition-colors">{t('Insights', 'इन्साईट्स')}</a></li>
            <li><a href="/hinjewadi-micro-market" className="text-xs font-bold text-gold uppercase tracking-widest transition-colors">{t('Area Guide', 'एरिया गाइड')}</a></li>
          </ul>

          <div className="flex items-center gap-4 ml-4">
            <div className="hidden md:block">
                <LanguageToggle />
            </div>
            <a 
              href="https://wa.me/917744009295?text=Interested%20in%20Paranjape%20Blue%20Ridge" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 overflow-hidden hover:scale-110 transition-all duration-300 shadow-xl"
              title="Chat on WhatsApp"
            >
              <img src="/assets/images/whatsapp-icon.png" alt="WhatsApp" className="w-full h-full object-contain p-1" />
            </a>
            <a href="/#enquiry" className="hidden md:flex bg-gradient-to-br from-gold to-gold-light text-navy px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
              {t('Enquire', 'चौकशी करा')}
            </a>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden w-10 h-10 flex items-center justify-center text-warm-white bg-white/5 rounded-full border border-white/10"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-navy flex flex-col p-10 pt-32 xl:hidden"
          >
            <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-10 right-10 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gold"
            >
                <X size={24} />
            </button>

            <ul className="space-y-8 list-none p-0 m-0">
                {projects.map(p => (
                    <li key={p.id}>
                        <a 
                            href={`/${p.slug}`} 
                            onClick={() => setIsOpen(false)}
                            className="text-4xl font-serif text-warm-white hover:text-gold transition-colors block"
                        >
                            {t(p.name, p.id === 'promenade' ? 'प्रॉमनेड' : p.id === 'altius' ? 'अल्टियस' : '४१ रिज')}
                        </a>
                    </li>
                ))}
                <li>
                    <a href="/hinjewadi-micro-market" onClick={() => setIsOpen(false)} className="text-4xl font-serif text-gold block">
                        {t('Area Guide', 'एरिया गाइड')}
                    </a>
                </li>
            </ul>

            <div className="mt-auto space-y-6">
                <LanguageToggle />
                <a 
                    href="https://wa.me/917744009295?text=Interested%20in%20Paranjape%20Blue%20Ridge" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl text-emerald-400 text-xl font-bold hover:bg-emerald-500 hover:text-white transition-all"
                >
                    <MessageCircle size={24} className="fill-current/20" />
                    Connect on WhatsApp
                </a>
                <a href="/#enquiry" onClick={() => setIsOpen(false)} className="block w-full bg-gold text-navy text-center py-5 rounded-2xl font-bold uppercase tracking-widest">
                    {t('Enquire Now', 'आत्ताच चौकशी करा')}
                </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

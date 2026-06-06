"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Menu, X, MessageCircle } from 'lucide-react';
import { projects } from '@/data/master-data';
import LanguageToggle from './LanguageToggle';
import AtmosphereToggle from './AtmosphereToggle';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

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
          aria-label="Main Navigation"
          className={`flex items-center gap-6 px-6 py-3 rounded-full border border-glass-border transition-all duration-500 shadow-2xl ${
            scrolled ? 'bg-[var(--bg)]/90 backdrop-blur-3xl scale-95 border-gold/30' : 'bg-[var(--bg)]/40 backdrop-blur-xl border-white/10'
          }`}
        >
          <Link href="/" className="flex items-center gap-4 border-r border-white/10 pr-6 mr-2 group" aria-label="Blue Ridge Sovereign Homepage">
              <Image 
                src="https://www.pscl.in/wp-content/uploads/2025/09/PARANJAPE-NEW-FINAL-LOGO.svg" 
                alt="Paranjape Schemes Construction Ltd. - Developer Logo" 
                width={112}
                height={32}
                priority
                className="h-8 brightness-0 invert transition-transform duration-300 group-hover:scale-105"
              />
             <div className="flex flex-col">
               <span className="font-serif font-bold text-sm tracking-widest text-warm-white group-hover:text-gold transition-colors">BLUE RIDGE</span>
               <span className="text-[10px] text-gilded font-bold tracking-[4px] uppercase">Sovereign</span>
             </div>
          </Link>

          <ul className="hidden xl:flex gap-8 items-center list-none p-0 m-0">
            {projects.map(p => {
              const displayName = p.id === 'promenade' ? 'Promenade' : 
                                   p.id === 'altius' ? 'Altius' : '41 Ridge';
              return (
                <li key={p.id}>
                  <Link href={`/${p.slug}`} className="text-xs font-bold text-warm-white/80 hover:text-gold uppercase tracking-widest transition-colors" aria-label={`Go to ${displayName}`}>
                    {t(displayName, p.id === 'promenade' ? 'प्रॉमनेड' : p.id === 'altius' ? 'अल्टियस' : '४१ रिज')}
                  </Link>
                </li>
              );
            })}
            <li>
              <button 
                onClick={() => {
                  if (window.location.pathname !== '/') window.location.href = '/';
                  else document.getElementById('amenities')?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="text-xs font-bold text-warm-white/80 hover:text-gold uppercase tracking-widest transition-colors cursor-pointer bg-transparent border-none"
                aria-label="Scroll to Township Amenities"
              >
                {t('Township', 'टाऊनशिप')}
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  if (window.location.pathname !== '/') window.location.href = '/';
                  else document.getElementById('market')?.scrollIntoView({ behavior: 'smooth' });
                }} 
                className="text-xs font-bold text-warm-white/80 hover:text-gold uppercase tracking-widest transition-colors cursor-pointer bg-transparent border-none"
                aria-label="Scroll to Insights"
              >
                {t('Insights', 'इन्साईट्स')}
              </button>
            </li>
            <li>
              <Link href="/hinjewadi-micro-market" className="text-xs font-bold text-gold uppercase tracking-widest transition-colors" aria-label="Go to Area Guide">
                {t('Area Guide', 'एरिया गाइड')}
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4 ml-4">
            <div className="hidden md:flex items-center gap-4">
                <AtmosphereToggle />
                <LanguageToggle />
            </div>
            <a 
              href="https://wa.me/917744009295?text=Hello%2C%0A%0AI%20am%20interested%20in%20*Paranjape%20Blue%20Ridge%20Township*%2C%20Hinjewadi%20Phase%201%2C%20Pune.%0A%0APlease%20share%20the%20following%3A%0A%E2%9C%85%20Available%20inventory%20%26%20floor%20plans%0A%E2%9C%85%20Updated%20price%20list%0A%E2%9C%85%20Site%20visit%20schedule%0A%0AKindly%20call%20me%20back%20at%20your%20earliest%20convenience.%0A%0AThank%20you."
              target="_blank" 
              rel="noopener noreferrer" 
              className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 overflow-hidden hover:scale-110 transition-all duration-300 shadow-xl"
              title="Chat on WhatsApp"
              aria-label="Chat on WhatsApp"
            >
              <Image src="/assets/images/whatsapp-icon.png" alt="WhatsApp Icon" width={32} height={32} className="w-full h-full object-contain p-1" />
            </a>
            <button 
              onClick={() => {
                if (window.location.pathname !== '/') window.location.href = '/';
                else document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden md:flex bg-gradient-to-br from-gold to-gold-light text-navy px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg cursor-pointer border-none"
              aria-label="Open Enquiry Form"
            >
              {t('Enquire', 'चौकशी करा')}
            </button>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden w-12 h-12 flex items-center justify-center text-warm-white bg-white/5 rounded-full border border-white/10"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X className="w-[18px] h-[18px]" size={18} /> : <Menu className="w-[18px] h-[18px]" size={18} />}
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
                aria-label="Close menu"
            >
                <X className="w-6 h-6" size={24} />
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
                <div className="flex items-center justify-between">
                   <LanguageToggle />
                   <AtmosphereToggle />
                </div>
                <a 
                    href="https://wa.me/917744009295?text=Hello%2C%0A%0AI%20am%20interested%20in%20*Paranjape%20Blue%20Ridge%20Township*%2C%20Hinjewadi%20Phase%201%2C%20Pune.%0A%0APlease%20share%20the%20following%3A%0A%E2%9C%85%20Available%20inventory%20%26%20floor%20plans%0A%E2%9C%85%20Updated%20price%20list%0A%E2%9C%85%20Site%20visit%20schedule%0A%0AKindly%20call%20me%20back%20at%20your%20earliest%20convenience.%0A%0AThank%20you."
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl text-emerald-400 text-xl font-bold hover:bg-emerald-500 hover:text-white transition-all"
                    aria-label="Connect on WhatsApp"
                >
                    <MessageCircle className="w-6 h-6 fill-current/20" size={24} />
                    Connect on WhatsApp
                </a>
                <button 
                    onClick={() => {
                      setIsOpen(false);
                      if (window.location.pathname !== '/') window.location.href = '/';
                      else document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
                    }} 
                    className="block w-full bg-gold text-navy text-center py-5 rounded-2xl font-bold uppercase tracking-widest cursor-pointer border-none"
                    aria-label="Open Enquiry Form"
                >
                    {t('Enquire Now', 'आत्ताच चौकशी करा')}
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

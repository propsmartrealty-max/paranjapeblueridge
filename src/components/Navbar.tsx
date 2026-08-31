"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Menu, X, MessageCircle, Sparkles, Compass } from 'lucide-react';
import { projects } from '@/data/master-data';
import LanguageToggle from './LanguageToggle';
import AtmosphereToggle from './AtmosphereToggle';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleScrollTo = (hashId: string) => {
    setIsOpen(false);
    if (pathname !== '/') {
      router.push(`/#${hashId}`);
    } else {
      document.getElementById(hashId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      id: 'promenade',
      label: 'Promenade',
      labelMr: 'प्रॉमनेड',
      href: '/paranjape-blue-ridge-promenade-hinjewadi-pune',
      type: 'link'
    },
    {
      id: 'altius',
      label: 'Altius',
      labelMr: 'अल्टियस',
      href: '/paranjape-blue-ridge-the-altius-hinjewadi-pune',
      type: 'link'
    },
    {
      id: 'ridge41',
      label: '41 Ridge',
      labelMr: '४१ रिज',
      href: '/paranjape-blue-ridge-41-hinjewadi-pune',
      type: 'link'
    },
    {
      id: 'nri',
      label: 'NRI Hub',
      labelMr: 'एनआरआय हब',
      href: '/nri-investment',
      type: 'link'
    },
    {
      id: 'township',
      label: 'Township',
      labelMr: 'टाऊनशिप',
      action: () => handleScrollTo('amenities'),
      type: 'action'
    },
    {
      id: 'insights',
      label: 'Insights',
      labelMr: 'इन्साईट्स',
      action: () => handleScrollTo('market'),
      type: 'action'
    },
    {
      id: 'area-guide',
      label: 'Area Guide',
      labelMr: 'एरिया गाइड',
      href: '/hinjewadi-micro-market',
      type: 'link',
      highlight: true
    }
  ];

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav 
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Main Navigation"
          className={`pointer-events-auto flex items-center justify-between gap-4 sm:gap-6 px-5 sm:px-7 py-2.5 rounded-full transition-all duration-500 shadow-2xl liquid-glass-dock ${
            scrolled ? 'scale-95 shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-gold/40' : 'scale-100'
          }`}
        >
          {/* LOGO & BRAND EMBLEM */}
          <Link 
            href="/" 
            className="flex items-center gap-3.5 pr-4 border-r border-gold/15 group" 
            aria-label="Blue Ridge Sovereign Homepage"
          >
            <div className="relative w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30 group-hover:border-gold transition-colors">
              <Image 
                src="/assets/images/blue-ridge-logo.png" 
                alt="Paranjape Blue Ridge Crest" 
                width={22}
                height={22}
                priority
                className="w-5 h-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-xs tracking-[2px] text-warm-white group-hover:text-gold transition-colors">BLUE RIDGE</span>
              <span className="text-[8px] text-gilded font-bold tracking-[3px] uppercase">Sovereign</span>
            </div>
          </Link>

          {/* FLUID WATER FLOW NAVIGATION BAR (DESKTOP) */}
          <ul 
            className="hidden xl:flex gap-1 items-center list-none p-1 m-0 relative rounded-full"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {navItems.map((item, idx) => {
              const isHovered = hoveredIndex === idx;
              const isCurrent = item.href && (pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/'));

              return (
                <li key={item.id} className="relative z-10">
                  {item.type === 'link' ? (
                    <Link
                      href={item.href!}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      className={`relative px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors flex items-center gap-1.5 ${
                        item.highlight ? 'text-gold' : isCurrent ? 'text-gold' : 'text-warm-white/80 hover:text-warm-white'
                      }`}
                      aria-label={`Go to ${item.label}`}
                    >
                      {t(item.label, item.labelMr)}
                    </Link>
                  ) : (
                    <button
                      onClick={item.action}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      className="relative px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full text-warm-white/80 hover:text-warm-white transition-colors cursor-pointer bg-transparent border-none"
                      aria-label={`Scroll to ${item.label}`}
                    >
                      {t(item.label, item.labelMr)}
                    </button>
                  )}

                  {/* FLUID WATER FLOW LIQUID PILL SELECTOR */}
                  {isHovered && (
                    <motion.div
                      layoutId="water-flow-pill"
                      className="absolute inset-0 rounded-full water-flow-indicator -z-10"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* RIGHT ACTION DOCK */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2.5">
              <AtmosphereToggle />
              <LanguageToggle />
            </div>

            <button 
              onClick={() => handleScrollTo('enquiry')}
              className="bg-gradient-to-r from-gold via-gold-light to-gold text-navy px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg hover:shadow-gold/30 cursor-pointer border-none flex items-center gap-1.5 font-sans"
              aria-label="Open Priority Enquiry"
            >
              <Sparkles size={12} className="fill-navy" />
              <span>{t('Enquire', 'चौकशी करा')}</span>
            </button>
            
            <button 
              aria-label="Toggle Menu"
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden w-10 h-10 flex items-center justify-center text-warm-white bg-white/5 hover:bg-gold/10 rounded-full border border-gold/20 transition-colors"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* MOBILE FULL-SCREEN LIQUID GLASS DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(32px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[60] bg-navy/95 backdrop-blur-3xl flex flex-col p-8 pt-24 xl:hidden"
          >
            <div className="flex items-center justify-between pb-6 border-b border-gold/20">
              <div className="flex items-center gap-3">
                <Image 
                  src="/assets/images/blue-ridge-logo.png" 
                  alt="Paranjape Blue Ridge Crest" 
                  width={28}
                  height={28}
                  className="w-7 h-auto"
                />
                <span className="font-serif font-bold text-lg text-warm-white">PARANJAPE BLUE RIDGE</span>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 bg-white/5 border border-gold/20 rounded-full flex items-center justify-center text-gold hover:scale-105 transition-transform"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <ul className="space-y-4 list-none p-0 mt-8 overflow-y-auto">
              {navItems.map((item, idx) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 + 0.1 }}
                >
                  {item.type === 'link' ? (
                    <Link 
                      href={item.href!} 
                      onClick={() => setIsOpen(false)}
                      className="text-2xl sm:text-3xl font-serif text-warm-white hover:text-gold transition-colors block py-2 border-b border-white/5"
                    >
                      {t(item.label, item.labelMr)}
                    </Link>
                  ) : (
                    <button
                      onClick={item.action}
                      className="text-2xl sm:text-3xl font-serif text-warm-white hover:text-gold transition-colors block py-2 border-b border-white/5 w-full text-left bg-transparent border-none cursor-pointer"
                    >
                      {t(item.label, item.labelMr)}
                    </button>
                  )}
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto space-y-4 pt-6 border-t border-gold/20">
              <div className="flex items-center justify-between">
                <LanguageToggle />
                <AtmosphereToggle />
              </div>

              <button 
                onClick={() => handleScrollTo('enquiry')} 
                className="block w-full bg-gradient-to-r from-gold via-gold-light to-gold text-navy text-center py-4 rounded-xl font-bold uppercase tracking-widest text-xs cursor-pointer border-none shadow-xl"
                aria-label="Open Enquiry Form"
              >
                {t('Enquire Priority Access', 'प्राधान्य चौकशी करा')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

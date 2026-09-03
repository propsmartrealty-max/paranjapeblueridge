"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from '@/hooks/useNav';
import CurrencyHeaderToggle from './CurrencyHeaderToggle';
import LanguageToggle from './LanguageToggle';

interface NavbarProps {
  onOpenEnquiry?: () => void;
}

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [residencesDropdown, setResidencesDropdown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    setResidencesDropdown(false);
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== '/' && window.location.pathname !== '/mr') {
        window.location.href = `/#${id}`;
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleEnquiryClick = () => {
    setIsOpen(false);
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (typeof window !== 'undefined') {
      const modalTrigger = document.querySelector('[data-enquiry-trigger]') as HTMLElement;
      if (modalTrigger) modalTrigger.click();
      else handleScrollTo('enquiry');
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none transition-all duration-300">
        {/* Subtle MahaRERA Compliance Micro-Ticker */}
        <div className="w-full bg-[#030508]/90 border-b border-white/[0.06] py-1 px-4 sm:px-8 flex justify-center sm:justify-end items-center gap-4 text-[9px] font-mono tracking-[0.2em] text-stone-light/80 uppercase pointer-events-auto backdrop-blur-md">
          <span><strong className="text-champagne">MahaRERA:</strong> Promenade: P52100055581</span>
          <span className="hidden md:inline">• Altius: P52100078116</span>
          <span className="hidden md:inline">• Ridges 41: P52100000054</span>
          <span className="text-stone">|</span>
          <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-champagne underline">
            maharera.mahaonline.gov.in
          </a>
        </div>

        {/* Master Navigation Bar */}
        <div className="w-full max-w-7xl px-3 sm:px-6 pt-2 sm:pt-3">
          <nav
            aria-label="Master Navigation"
            className={`pointer-events-auto w-full flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full transition-all duration-500 shadow-glass ${
              scrolled 
                ? 'bg-[#090e1a]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] py-2' 
                : 'bg-[#090e1a]/75 backdrop-blur-xl border border-white/[0.08]'
            }`}
          >
            {/* BRAND LOGO LOCKUP */}
            <a 
              href="/" 
              className="flex items-center gap-2.5 sm:gap-3.5 group no-underline shrink-0" 
              aria-label="Paranjape Blue Ridge - The Digital Address"
            >
              {/* Paranjape Schemes Insignia Badge */}
              <div className="bg-white/95 px-2.5 py-1 rounded-md border border-champagne/30 shadow-sm flex items-center justify-center transition-all group-hover:bg-white">
                <img 
                  src="/assets/images/paranjape-official-logo.png" 
                  alt="Paranjape Schemes Pune" 
                  className="h-5 sm:h-6 w-auto object-contain max-w-[100px] sm:max-w-[125px]"
                />
              </div>

              {/* Vertical Elegant Divider */}
              <div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-champagne/40 to-transparent hidden xs:block"></div>

              {/* Blue Ridge Brandmark */}
              <div className="bg-white/95 px-2 py-1 rounded-md border border-champagne/30 shadow-sm flex items-center justify-center transition-all group-hover:bg-white">
                <img 
                  src="/assets/images/blue-ridge-official-logo.png" 
                  alt="Blue Ridge Hinjewadi" 
                  className="h-5 sm:h-6 w-auto object-contain max-w-[80px] sm:max-w-[95px]"
                />
              </div>
            </a>

            {/* DESKTOP ARCHITECTURAL NAVIGATION */}
            <div className="hidden xl:flex items-center gap-1.5 lg:gap-2">
              <button
                onClick={() => handleScrollTo('township-story')}
                className="px-3 py-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.14em] text-ivory/80 hover:text-champagne-light transition-colors bg-transparent border-none cursor-pointer"
              >
                Blue Ridge
              </button>

              {/* RESIDENCES DROPDOWN */}
              <div 
                className="relative"
                onMouseEnter={() => setResidencesDropdown(true)}
                onMouseLeave={() => setResidencesDropdown(false)}
              >
                <button
                  className={`px-3 py-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.14em] transition-colors flex items-center gap-1 bg-transparent border-none cursor-pointer ${
                    residencesDropdown ? 'text-champagne' : 'text-ivory/80 hover:text-champagne-light'
                  }`}
                >
                  <span>Residences</span>
                  <ChevronDown size={12} className={`text-champagne transition-transform ${residencesDropdown ? 'rotate-180' : ''}`} />
                </button>

                {residencesDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl glass-panel p-4 shadow-glass-elevated border border-white/10 z-50 animate-fadeIn">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-champagne pb-2 border-b border-white/[0.08] mb-3">
                      Residential Portfolio
                    </div>
                    
                    <div className="space-y-1.5">
                      <a
                        href="/blue-ridge/ongoing-projects"
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.04] transition-all no-underline text-ivory hover:text-champagne group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-ivory group-hover:text-champagne">Currently Available</div>
                          <div className="text-[10px] text-stone-light">Verified Active Inventory</div>
                        </div>
                        <ArrowUpRight size={14} className="text-stone group-hover:text-champagne transition-transform" />
                      </a>

                      <a
                        href="/blue-ridge/ongoing-projects"
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.04] transition-all no-underline text-ivory hover:text-champagne group"
                      >
                        <div>
                          <div className="text-xs font-semibold text-ivory group-hover:text-champagne">Ongoing Developments</div>
                          <div className="text-[10px] text-stone-light">High-Rise Iconic Towers</div>
                        </div>
                        <ArrowUpRight size={14} className="text-stone group-hover:text-champagne transition-transform" />
                      </a>

                      <div className="pt-2 border-t border-white/[0.06] space-y-1">
                        <div className="text-[10px] font-mono text-stone-light uppercase tracking-wider px-2 py-1">
                          Active Clusters
                        </div>
                        <a href="/paranjape-blue-ridge-promenade-hinjewadi-pune" className="block px-2.5 py-1.5 rounded-lg text-xs text-ivory/90 hover:text-champagne hover:bg-white/[0.03] no-underline">
                          Promenade (3 & 4 BHK Riverfront)
                        </a>
                        <a href="/paranjape-blue-ridge-the-altius-hinjewadi-pune" className="block px-2.5 py-1.5 rounded-lg text-xs text-ivory/90 hover:text-champagne hover:bg-white/[0.03] no-underline">
                          The Altius (4 & 5 BHK Golf Residences)
                        </a>
                        <a href="/paranjape-blue-ridge-41-hinjewadi-pune" className="block px-2.5 py-1.5 rounded-lg text-xs text-ivory/90 hover:text-champagne hover:bg-white/[0.03] no-underline">
                          Ridges 41 (2 BHK Smart Living)
                        </a>
                      </div>

                      <div className="pt-2 border-t border-white/[0.06] flex gap-2 text-[11px]">
                        <button 
                          onClick={() => handleScrollTo('inventory')} 
                          className="flex-1 py-1.5 text-center rounded-lg bg-white/[0.04] hover:bg-champagne/10 text-champagne text-[10px] font-mono uppercase tracking-wider border border-champagne/20"
                        >
                          Price & Plans
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleScrollTo('lifestyle')}
                className="px-3 py-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.14em] text-ivory/80 hover:text-champagne-light transition-colors bg-transparent border-none cursor-pointer"
              >
                Lifestyle
              </button>

              <button
                onClick={() => handleScrollTo('golf')}
                className="px-3 py-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.14em] text-ivory/80 hover:text-champagne-light transition-colors bg-transparent border-none cursor-pointer"
              >
                Golf
              </button>

              <button
                onClick={() => handleScrollTo('masterplan')}
                className="px-3 py-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.14em] text-ivory/80 hover:text-champagne-light transition-colors bg-transparent border-none cursor-pointer"
              >
                Township
              </button>

              <a
                href="/hinjewadi-micro-market"
                className={`px-3 py-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.14em] transition-colors no-underline ${
                  pathname === '/hinjewadi-micro-market' ? 'text-champagne' : 'text-ivory/80 hover:text-champagne-light'
                }`}
              >
                Location
              </a>

              <a
                href="/why-paranjape"
                className={`px-3 py-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.14em] transition-colors no-underline ${
                  pathname === '/why-paranjape' ? 'text-champagne' : 'text-ivory/80 hover:text-champagne-light'
                }`}
              >
                The Paranjape Story
              </a>

              <a
                href="/journal"
                className={`px-3 py-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.14em] transition-colors no-underline ${
                  pathname.startsWith('/journal') ? 'text-champagne' : 'text-ivory/80 hover:text-champagne-light'
                }`}
              >
                Journal
              </a>
            </div>

            {/* RIGHT: CURRENCY / LANGUAGE & PRIVATE ENQUIRY CTA */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="hidden lg:flex items-center gap-1.5">
                <CurrencyHeaderToggle />
                <LanguageToggle />
              </div>

              {/* Ultra-Luxury Restrained Champagne Button */}
              <button 
                onClick={handleEnquiryClick}
                className="btn-champagne px-4 sm:px-6 py-2.5 rounded-full text-[11px] font-sans font-bold tracking-[0.14em] uppercase transition-all shadow-md cursor-pointer border-none flex items-center gap-2 whitespace-nowrap"
                aria-label="Private Enquiry"
              >
                <span>Private Enquiry</span>
              </button>
              
              {/* Mobile Menu Trigger */}
              <button 
                aria-label="Toggle Navigation"
                onClick={() => setIsOpen(!isOpen)}
                className="xl:hidden p-2 rounded-full bg-white/[0.05] border border-white/10 text-champagne hover:bg-white/10 transition-colors cursor-pointer"
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN GLASS DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 z-40 bg-[#060911]/98 backdrop-blur-3xl p-6 overflow-y-auto xl:hidden flex flex-col justify-between"
          >
            <div className="space-y-6 pt-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <CurrencyHeaderToggle />
                <LanguageToggle />
              </div>

              <div className="space-y-4">
                <div className="text-[10px] font-mono text-champagne uppercase tracking-[0.2em]">
                  Township Navigation
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => handleScrollTo('township-story')}
                    className="text-left px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-ivory text-sm font-medium"
                  >
                    Blue Ridge Township
                  </button>
                  <a
                    href="/blue-ridge/ongoing-projects"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-ivory text-sm font-medium no-underline block"
                  >
                    Residences (All Ongoing Clusters)
                  </a>
                  <button
                    onClick={() => handleScrollTo('lifestyle')}
                    className="text-left px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-ivory text-sm font-medium"
                  >
                    Lifestyle & Marina
                  </button>
                  <button
                    onClick={() => handleScrollTo('golf')}
                    className="text-left px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-ivory text-sm font-medium"
                  >
                    9-Hole Executive Golf Course
                  </button>
                  <button
                    onClick={() => handleScrollTo('masterplan')}
                    className="text-left px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-ivory text-sm font-medium"
                  >
                    138-Acre Masterplan
                  </button>
                  <a
                    href="/hinjewadi-micro-market"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-ivory text-sm font-medium no-underline block"
                  >
                    Location & Metro Line 3
                  </a>
                  <a
                    href="/why-paranjape"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-ivory text-sm font-medium no-underline block"
                  >
                    The Paranjape Story & Legacy
                  </a>
                  <a
                    href="/journal"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-ivory text-sm font-medium no-underline block"
                  >
                    The Blue Ridge Journal
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                onClick={handleEnquiryClick}
                className="w-full btn-champagne py-3.5 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer border-none"
              >
                Schedule Private Presentation
              </button>
              <div className="text-center text-[10px] font-mono text-stone">
                Paranjape Blue Ridge • Hinjewadi Phase 1, Pune
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Sparkles, ChevronDown, Menu, X } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import CurrencyHeaderToggle from './CurrencyHeaderToggle';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from '@/hooks/useNav';

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (hashId: string) => {
    setIsOpen(false);
    setActiveDropdown(null);
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== '/' && window.location.pathname !== '/mr') {
        window.location.href = `/#${hashId}`;
      } else {
        document.getElementById(hashId)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const projectLinks = [
    {
      name: "Promenade Residences",
      nameMr: "प्रॉमनेड रेसिडेन्सेस",
      config: "3 & 4 BHK Riverfront",
      price: "₹1.65 Cr*",
      href: "/paranjape-blue-ridge-promenade-hinjewadi-pune",
      badge: "Tallest Tower"
    },
    {
      name: "The Altius Riverside",
      nameMr: "द अल्टियस रिव्हरसाईड",
      config: "4 & 5 BHK Golf-View",
      price: "₹1.80 Cr*",
      href: "/paranjape-blue-ridge-the-altius-hinjewadi-pune",
      badge: "Ultra-Luxury"
    },
    {
      name: "Ridges 41",
      nameMr: "रिजेस ४१",
      config: "2 BHK Smart Residences",
      price: "₹97.60 L*",
      href: "/paranjape-blue-ridge-41-hinjewadi-pune",
      badge: "Smart Living"
    }
  ];

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <motion.nav 
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Main Navigation"
          className={`pointer-events-auto w-full max-w-7xl flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 py-2 rounded-full transition-all duration-500 shadow-2xl ultra-glass-card ${
            scrolled ? 'scale-[0.98] border-gold/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)]' : 'border-gold/20'
          }`}
        >
          {/* ACCURATELY ALIGNED DUAL LOGO LOCKUP: PARANJAPE + BLUE RIDGE */}
          <a 
            href="/" 
            className="flex items-center gap-2 sm:gap-3 pr-2 sm:pr-4 border-r border-gold/25 group no-underline shrink-0" 
            aria-label="Paranjape Blue Ridge Homepage"
          >
            {/* 1. Official Paranjape Developer Logo */}
            <div className="bg-white/95 hover:bg-white px-2.5 py-1 rounded-lg border border-gold/30 shadow-sm flex items-center justify-center transition-all">
              <img 
                src="/assets/images/paranjape-official-logo.png" 
                alt="Paranjape Schemes - The Spirit of New India" 
                className="h-6 sm:h-7 w-auto object-contain max-w-[120px] sm:max-w-[140px]"
              />
            </div>

            {/* Elegant Golden Divider */}
            <div className="h-7 w-[1px] bg-gradient-to-b from-transparent via-gold/50 to-transparent hidden xs:block"></div>

            {/* 2. Official Blue Ridge Township Logo */}
            <div className="bg-white/95 hover:bg-white px-2.5 py-1 rounded-lg border border-gold/30 shadow-sm flex items-center justify-center transition-all">
              <img 
                src="/assets/images/blue-ridge-official-logo.png" 
                alt="Blue Ridge - Be a world citizen" 
                className="h-6 sm:h-7 w-auto object-contain max-w-[90px] sm:max-w-[110px]"
              />
            </div>
          </a>

          {/* DESKTOP NAVIGATION ITEMS */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Residences Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('residences')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-full text-warm-white/90 hover:text-gold transition-colors flex items-center gap-1.5 cursor-pointer bg-transparent border-none"
                aria-label="View Residences"
              >
                <span>{t('Residences', 'निवासस्थाने')}</span>
                <ChevronDown size={13} className={`text-gold transition-transform ${activeDropdown === 'residences' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'residences' && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl ultra-glass-card p-3 shadow-2xl border border-gold/30 z-50">
                  <div className="text-[10px] font-mono text-gold font-bold px-3 py-1 uppercase tracking-wider border-b border-white/10 mb-2">
                    Flagship Clusters
                  </div>
                  {projectLinks.map((p, idx) => (
                    <a
                      key={idx}
                      href={p.href}
                      className="flex flex-col p-2.5 rounded-xl hover:bg-gold/10 transition-all border border-transparent hover:border-gold/20 no-underline group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-warm-white group-hover:text-gold transition-colors">
                          {t(p.name, p.nameMr)}
                        </span>
                        <span className="text-[9px] font-mono font-bold text-navy bg-gold px-1.5 py-0.5 rounded">
                          {p.badge}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[11px] text-text-muted">
                        <span>{p.config}</span>
                        <span className="font-mono text-gold font-bold">{p.price}</span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Navigation Links */}
            <button
              onClick={() => handleScrollTo('township')}
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-full text-warm-white/90 hover:text-gold transition-colors cursor-pointer bg-transparent border-none"
            >
              {t('Township', 'टाउनशिप')}
            </button>

            <a
              href="/hinjewadi-micro-market"
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors no-underline ${
                pathname === '/hinjewadi-micro-market' ? 'text-gold' : 'text-warm-white/90 hover:text-gold'
              }`}
            >
              {t('Market & Metro', 'मार्केट व मेट्रो')}
            </a>

            <a
              href="/nri-investment"
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors no-underline ${
                pathname === '/nri-investment' ? 'text-gold' : 'text-warm-white/90 hover:text-gold'
              }`}
            >
              {t('NRI Desk', 'अनिवासी भारतीय')}
            </a>

            <a
              href="/construction-updates"
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors no-underline ${
                pathname === '/construction-updates' ? 'text-gold' : 'text-warm-white/90 hover:text-gold'
              }`}
            >
              {t('Construction', 'बांधकाम प्रगती')}
            </a>

            <a
              href="/insights"
              className={`px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-colors no-underline ${
                pathname.startsWith('/insights') ? 'text-gold' : 'text-warm-white/90 hover:text-gold'
              }`}
            >
              {t('Insights', 'संशोधन')}
            </a>
          </div>

          {/* RIGHT ACTION DOCK: CONTROLS & CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2">
              <CurrencyHeaderToggle />
              <LanguageToggle />
            </div>

            <button 
              onClick={() => handleScrollTo('enquiry')}
              className="bg-gradient-to-r from-gold via-gold-light to-gold text-navy px-4 sm:px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-lg hover:shadow-gold/30 cursor-pointer border-none flex items-center gap-1.5 font-sans whitespace-nowrap"
              aria-label="Enquire Now"
            >
              <Sparkles size={12} className="fill-navy" />
              <span>{t('Enquire Now', 'चौकशी करा')}</span>
            </button>
            
            {/* Mobile Menu Hamburger */}
            <button 
              aria-label="Toggle Menu"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full bg-white/5 border border-gold/30 text-gold hover:bg-gold/10 transition-colors cursor-pointer"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* MOBILE EXPANDED MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-20 z-40 bg-navy/95 backdrop-blur-2xl p-6 overflow-y-auto lg:hidden flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gold/20">
                <CurrencyHeaderToggle />
                <LanguageToggle />
              </div>

              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-gold uppercase tracking-widest">
                  {t('Residences', 'निवासस्थाने')}
                </div>
                {projectLinks.map((p, idx) => (
                  <a
                    key={idx}
                    href={p.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-gold text-warm-white no-underline"
                  >
                    <div>
                      <div className="text-sm font-bold text-warm-white">{t(p.name, p.nameMr)}</div>
                      <div className="text-xs text-text-muted">{p.config}</div>
                    </div>
                    <span className="text-xs font-mono text-gold font-bold">{p.price}</span>
                  </a>
                ))}
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <a 
                  href="/hinjewadi-micro-market"
                  onClick={() => setIsOpen(false)}
                  className="block p-3 rounded-xl bg-white/5 text-sm font-bold text-warm-white hover:text-gold no-underline"
                >
                  {t('Hinjewadi Market & Metro Line 3', 'हिंजवडी मार्केट व मेट्रो लाईन ३')}
                </a>
                <a 
                  href="/nri-investment"
                  onClick={() => setIsOpen(false)}
                  className="block p-3 rounded-xl bg-white/5 text-sm font-bold text-warm-white hover:text-gold no-underline"
                >
                  {t('Global NRI Investment Desk', 'अनिवासी भारतीय गुंतवणूक डेस्क')}
                </a>
                <a 
                  href="/construction-updates"
                  onClick={() => setIsOpen(false)}
                  className="block p-3 rounded-xl bg-white/5 text-sm font-bold text-warm-white hover:text-gold no-underline"
                >
                  {t('Live Construction Updates', 'थेट बांधकाम प्रगती')}
                </a>
                <a 
                  href="/insights"
                  onClick={() => setIsOpen(false)}
                  className="block p-3 rounded-xl bg-white/5 text-sm font-bold text-warm-white hover:text-gold no-underline"
                >
                  {t('Research & Market Insights', 'संशोधन व बाजारपेठ विश्लेषण')}
                </a>
                <a 
                  href="/directory"
                  onClick={() => setIsOpen(false)}
                  className="block p-3 rounded-xl bg-white/5 text-sm font-bold text-warm-white hover:text-gold no-underline"
                >
                  {t('Master Directory', 'मास्टर डिरेक्टरी')}
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-gold/20 flex flex-col gap-3">
              <a 
                href="tel:+912067210000"
                className="flex items-center justify-center gap-2 bg-white/10 text-warm-white py-3.5 rounded-full font-bold uppercase text-xs tracking-widest no-underline"
              >
                <Phone size={14} className="text-gold" />
                +91 20 6721 0000
              </a>
              <a 
                href="https://wa.me/917744009295?text=Hello%2C%20I%20am%20interested%20in%20Paranjape%20Blue%20Ridge%20Township."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-500 text-white py-3.5 rounded-full font-bold uppercase text-xs tracking-widest no-underline shadow-lg"
              >
                <MessageCircle size={16} />
                WhatsApp Sales Desk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

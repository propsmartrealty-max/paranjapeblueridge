"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, Phone, ShieldCheck, Menu, X, ArrowRight,
  Compass, MapPin, Building2, Trees, BookOpen, Layers, Briefcase
} from 'lucide-react';
import { blueRidgeClusters } from '@/data/cms/clusters';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResidencesDropdownOpen, setIsResidencesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click for the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsResidencesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openEnquiry = () => {
    if (typeof window !== 'undefined') {
      const trigger = document.querySelector('[data-enquiry-trigger]') as HTMLButtonElement;
      if (trigger) trigger.click();
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-2xl border-b border-slate-200/90 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.08)] h-16 sm:h-20 flex items-center' 
        : 'bg-white/95 backdrop-blur-xl border-b border-slate-200/60 h-20 flex items-center'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl w-full">
        <div className="flex items-center justify-between gap-4">
          
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              1. PURE UPLOADED IMAGE LOGOS ONLY (ZERO TEXT LOGOS)
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <a href="/" className="flex items-center no-underline group shrink-0" aria-label="Paranjape Blue Ridge Home">
            <div className="flex items-center gap-2 sm:gap-3 bg-white py-1.5 px-3 rounded-2xl border-2 border-slate-200 shadow-xs group-hover:border-[#785415]/50 transition-colors shrink-0">
              <img 
                src="/assets/images/paranjape-official-logo.png" 
                alt="Paranjape Schemes Official Logo" 
                className="h-7 sm:h-8 w-auto object-contain shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/logos/paranjape-schemes.png';
                }}
              />
              <div className="h-5 sm:h-6 w-px bg-slate-200 shrink-0"></div>
              <img 
                src="/assets/images/blue-ridge-official-logo.png" 
                alt="Blue Ridge Official Logo" 
                className="h-7 sm:h-8 w-auto object-contain shrink-0"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/logos/blue-ridge.png';
                }}
              />
            </div>
          </a>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              2. STREAMLINED DESKTOP NAVIGATION (ZERO WRAPPING / ZERO COLLISION)
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 text-[11px] xl:text-[12px] font-sans font-bold uppercase tracking-[0.1em] shrink-0">
            <a href="/#township-story" className="text-slate-800 hover:text-[#785415] transition-colors no-underline whitespace-nowrap shrink-0">
              The Township
            </a>

            {/* Residences Dropdown with Hover Bridge & Outside Click */}
            <div 
              ref={dropdownRef}
              className="relative py-2 shrink-0"
              onMouseEnter={() => setIsResidencesDropdownOpen(true)}
              onMouseLeave={() => setIsResidencesDropdownOpen(false)}
            >
              <button 
                className="flex items-center gap-1.5 text-slate-800 hover:text-[#785415] transition-colors py-1 bg-transparent border-none cursor-pointer uppercase font-bold text-[11px] xl:text-[12px] tracking-[0.1em] whitespace-nowrap"
                onClick={() => setIsResidencesDropdownOpen(!isResidencesDropdownOpen)}
                aria-expanded={isResidencesDropdownOpen}
              >
                <span>Residences</span>
                <ChevronDown size={13} className={`transition-transform duration-200 text-[#785415] ${isResidencesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Hover bridge */}
              <div className="absolute top-full left-0 right-0 h-3 pointer-events-auto"></div>

              {isResidencesDropdownOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-[380px] sm:w-[420px] p-4 rounded-2xl bg-white border-2 border-slate-300 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] space-y-2.5 z-[100] animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2 pb-2 text-[10px] font-mono uppercase tracking-widest text-[#785415] border-b border-slate-200 font-extrabold flex items-center justify-between">
                    <span>Active Residential Enclaves</span>
                    <span className="text-[9px] text-slate-500 font-normal">Direct Booking</span>
                  </div>
                  {blueRidgeClusters.map((cluster) => {
                    const clusterUrl = cluster.id === 'ridges-41' 
                      ? '/paranjape-blue-ridge-41-hinjewadi-pune'
                      : cluster.id === 'altius'
                      ? '/paranjape-blue-ridge-the-altius-hinjewadi-pune'
                      : '/paranjape-blue-ridge-promenade-hinjewadi-pune';

                    return (
                      <a
                        key={cluster.id}
                        href={clusterUrl}
                        onClick={() => setIsResidencesDropdownOpen(false)}
                        className="p-3.5 rounded-xl bg-slate-50 hover:bg-amber-50/80 border border-slate-200 hover:border-amber-400 flex items-center justify-between gap-3 no-underline group transition-all"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-sm font-serif font-bold text-[#070D1A] group-hover:text-[#785415] transition-colors truncate">
                              {cluster.name}
                            </span>
                            <span className="text-[11px] font-mono text-[#785415] font-bold shrink-0">
                              {cluster.priceStarting}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-slate-600 font-semibold truncate">
                            {cluster.configurations} • {cluster.carpetAreaRange}
                          </div>
                        </div>
                        <span className="w-6 h-6 rounded-full bg-white border border-slate-200 group-hover:border-amber-400 group-hover:bg-[#785415] group-hover:text-white text-[#785415] flex items-center justify-center text-xs font-bold shrink-0 transition-all">
                          →
                        </span>
                      </a>
                    );
                  })}
                  <div className="pt-2.5 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs font-mono font-bold">
                    <a 
                      href="/blue-ridge/ongoing-projects" 
                      onClick={() => setIsResidencesDropdownOpen(false)}
                      className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-center no-underline transition-colors truncate"
                    >
                      All Clusters (3)
                    </a>
                    <a 
                      href="/#masterplan" 
                      onClick={() => setIsResidencesDropdownOpen(false)}
                      className="py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#785415] text-center border border-amber-300 no-underline transition-colors font-extrabold truncate"
                    >
                      Township Map
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="/#sez" className="text-slate-800 hover:text-[#785415] transition-colors no-underline flex items-center gap-1.5 font-bold text-[#785415] whitespace-nowrap shrink-0">
              <Briefcase size={13} className="text-[#785415] shrink-0" />
              <span>Blue Ridge SEZ</span>
            </a>

            <a href="/#golf" className="text-slate-800 hover:text-[#785415] transition-colors no-underline whitespace-nowrap shrink-0">
              Golf & Marina
            </a>

            <a href="/why-paranjape" className="text-slate-800 hover:text-[#785415] transition-colors no-underline whitespace-nowrap shrink-0">
              Legacy
            </a>

            <a href="/journal" className="text-slate-800 hover:text-[#785415] transition-colors no-underline whitespace-nowrap shrink-0">
              Journal
            </a>
          </nav>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              3. RIGHT ACTION & MAHARERA BADGE
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="hidden md:flex items-center gap-3 xl:gap-4 shrink-0">
            <div className="hidden 2xl:flex flex-col text-right shrink-0">
              <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest font-bold">MahaRERA Registered</span>
              <span className="text-[10px] font-mono text-[#070D1A] font-extrabold">P52100055581 • P52100078116</span>
            </div>

            <button
              onClick={openEnquiry}
              className="btn-champagne px-5 xl:px-6 py-2.5 rounded-full text-[11px] xl:text-xs font-sans font-bold uppercase tracking-[0.12em] cursor-pointer border-none flex items-center gap-2 shadow-sm hover:shadow-md transition-all shrink-0 whitespace-nowrap"
            >
              <span>Private Enquiry</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 hover:text-[#785415] cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. MOBILE FLYOUT DRAWER
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-16 sm:top-20 left-0 right-0 bg-white border-b-2 border-slate-300 px-6 py-6 space-y-4 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto z-[95]">
          <div className="flex items-center gap-2.5 bg-slate-50 py-2 px-3 rounded-xl border border-slate-200 w-fit mb-2 shrink-0">
            <img 
              src="/assets/images/paranjape-official-logo.png" 
              alt="Paranjape Schemes" 
              className="h-6 w-auto object-contain shrink-0"
            />
            <div className="h-4 w-px bg-slate-300 shrink-0"></div>
            <img 
              src="/assets/images/blue-ridge-official-logo.png" 
              alt="Blue Ridge" 
              className="h-6 w-auto object-contain shrink-0"
            />
          </div>

          <div className="space-y-1 text-sm font-sans uppercase tracking-wide text-slate-800 font-bold">
            <a href="/#township-story" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center min-h-[48px] border-b border-slate-100 text-[#070D1A] no-underline px-1">
              The 138-Acre Township
            </a>
            
            <div className="border-b border-slate-100 space-y-1 py-1">
              <span className="text-xs text-[#785415] font-extrabold block px-1 pt-1">Individual Project Portals:</span>
              <a href="/paranjape-blue-ridge-promenade-hinjewadi-pune" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center min-h-[48px] pl-3 text-[#070D1A] hover:text-[#785415] no-underline font-semibold">
                • Promenade Residences (3 & 4 BHK)
              </a>
              <a href="/paranjape-blue-ridge-the-altius-hinjewadi-pune" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center min-h-[48px] pl-3 text-[#070D1A] hover:text-[#785415] no-underline font-semibold">
                • The Altius Riverside (3 & 4 BHK)
              </a>
              <a href="/paranjape-blue-ridge-41-hinjewadi-pune" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center min-h-[48px] pl-3 text-[#070D1A] hover:text-[#785415] no-underline font-semibold">
                • Ridges 41 Smart Homes (2 & 3 BHK)
              </a>
            </div>

            <a href="/#sez" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center min-h-[48px] border-b border-slate-100 text-[#785415] font-extrabold no-underline gap-2 px-1">
              <Briefcase size={16} />
              <span>Blue Ridge IT / ITES SEZ</span>
            </a>
            <a href="/#golf" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center min-h-[48px] border-b border-slate-100 text-[#070D1A] no-underline font-semibold px-1">
              9-Hole Golf & River Marina
            </a>
            <a href="/why-paranjape" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center min-h-[48px] border-b border-slate-100 text-[#070D1A] no-underline font-semibold px-1">
              The Paranjape Legacy
            </a>
            <a href="/journal" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center min-h-[48px] border-b border-slate-100 text-[#070D1A] no-underline font-semibold px-1">
              The Blue Ridge Journal
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="text-[10px] font-mono text-slate-600 mb-3 font-medium">
              MahaRERA: P52100055581 • P52100078116
            </div>
            <button
              onClick={() => { setIsMobileMenuOpen(false); openEnquiry(); }}
              className="w-full btn-champagne py-3.5 rounded-xl text-center text-xs font-bold uppercase tracking-wider border-none shadow-md"
            >
              Book Private Presentation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

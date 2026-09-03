"use client";

import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, Phone, ShieldCheck, Menu, X, ArrowRight,
  Compass, MapPin, Building2, Trees, BookOpen, Layers, Briefcase
} from 'lucide-react';
import { blueRidgeClusters } from '@/data/cms/clusters';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResidencesDropdownOpen, setIsResidencesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        ? 'bg-white/95 backdrop-blur-2xl border-b border-slate-200/90 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.06)] py-2.5' 
        : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/60 py-3.5'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          
          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              1. PURE UPLOADED IMAGE LOGOS ONLY (ZERO TEXT LOGOS)
              Both official uploaded developer & township image logos
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <a href="/" className="flex items-center no-underline group" aria-label="Paranjape Blue Ridge Home">
            <div className="flex items-center gap-2 sm:gap-3 bg-white py-1.5 px-3 rounded-2xl border border-slate-200/90 shadow-sm group-hover:border-[#B88E3E]/50 transition-colors">
              <img 
                src="/assets/images/paranjape-official-logo.png" 
                alt="Paranjape Schemes Official Logo" 
                className="h-7 sm:h-8 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/logos/paranjape-schemes.png';
                }}
              />
              <div className="h-5 sm:h-6 w-px bg-slate-200"></div>
              <img 
                src="/assets/images/blue-ridge-official-logo.png" 
                alt="Blue Ridge Official Logo" 
                className="h-7 sm:h-8 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/logos/blue-ridge.png';
                }}
              />
            </div>
          </a>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              2. STREAMLINED DESKTOP NAVIGATION
              Organized, non-crowded luxury hierarchy
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[12px] font-sans font-semibold uppercase tracking-[0.12em]">
            <a href="/#township-story" className="text-slate-700 hover:text-[#B88E3E] transition-colors no-underline">
              The Township
            </a>

            {/* Residences Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsResidencesDropdownOpen(true)}
              onMouseLeave={() => setIsResidencesDropdownOpen(false)}
            >
              <button 
                className="flex items-center gap-1 text-slate-700 hover:text-[#B88E3E] transition-colors py-2 bg-transparent border-none cursor-pointer uppercase font-semibold text-[12px] tracking-[0.12em]"
                onClick={() => setIsResidencesDropdownOpen(!isResidencesDropdownOpen)}
              >
                <span>Residences</span>
                <ChevronDown size={13} className={`transition-transform duration-200 text-[#B88E3E] ${isResidencesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isResidencesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 p-3 rounded-2xl bg-white/98 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] space-y-1">
                  <div className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest text-[#8F6A24] border-b border-slate-100 font-bold">
                    Active Residential Enclaves
                  </div>
                  {blueRidgeClusters.map((cluster) => (
                    <a
                      key={cluster.id}
                      href={`/paranjape-blue-ridge-${cluster.slug === 'ridges-41' ? '41' : cluster.slug}-hinjewadi-pune`}
                      className="p-2.5 rounded-xl hover:bg-amber-50/60 flex items-center justify-between no-underline group transition-all"
                    >
                      <div>
                        <div className="text-xs font-serif font-bold text-[#070D1A] group-hover:text-[#B88E3E] transition-colors">
                          {cluster.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                          {cluster.configurations} • {cluster.carpetAreaRange}
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#B88E3E] group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </a>
                  ))}
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-1 text-[10px] font-mono font-semibold">
                    <a href="/blue-ridge/ongoing-projects" className="p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-[#070D1A] no-underline">
                      All Clusters
                    </a>
                    <a href="/#masterplan" className="p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-[#070D1A] no-underline">
                      Township Map
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="/#sez" className="text-slate-700 hover:text-[#B88E3E] transition-colors no-underline flex items-center gap-1.5 font-bold text-[#8F6A24]">
              <Briefcase size={12} className="text-[#B88E3E]" />
              <span>Blue Ridge SEZ</span>
            </a>

            <a href="/#golf" className="text-slate-700 hover:text-[#B88E3E] transition-colors no-underline">
              Golf & Marina
            </a>

            <a href="/why-paranjape" className="text-slate-700 hover:text-[#B88E3E] transition-colors no-underline">
              Legacy
            </a>

            <a href="/journal" className="text-slate-700 hover:text-[#B88E3E] transition-colors no-underline">
              Journal
            </a>
          </nav>

          {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
              3. RIGHT ACTION & MAHARERA BADGE
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
          <div className="hidden md:flex items-center gap-4">
            <div className="hidden xl:flex flex-col text-right">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">MahaRERA Registered</span>
              <span className="text-[10px] font-mono text-[#070D1A] font-semibold">P52100055581 • P52100078116</span>
            </div>

            <button
              onClick={openEnquiry}
              className="btn-champagne px-6 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-[0.14em] cursor-pointer border-none flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
            >
              <span>Private Enquiry</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:text-[#B88E3E] cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. MOBILE FLYOUT DRAWER WITH PURE IMAGE LOGOS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-slate-200 px-6 py-6 space-y-4 shadow-2xl">
          {/* Mobile Pure Image Logo Lockup */}
          <div className="flex items-center gap-2.5 bg-slate-50 py-2 px-3 rounded-xl border border-slate-200 w-fit mb-2">
            <img 
              src="/assets/images/paranjape-official-logo.png" 
              alt="Paranjape Schemes" 
              className="h-6 w-auto object-contain"
            />
            <div className="h-4 w-px bg-slate-300"></div>
            <img 
              src="/assets/images/blue-ridge-official-logo.png" 
              alt="Blue Ridge" 
              className="h-6 w-auto object-contain"
            />
          </div>

          <div className="space-y-3 text-xs font-mono uppercase tracking-wider text-slate-700">
            <a href="/#township-story" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-100 text-[#070D1A] no-underline font-semibold">
              The 138-Acre Township
            </a>
            <a href="/blue-ridge/ongoing-projects" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-100 text-[#070D1A] no-underline font-semibold">
              Residences (Promenade, Altius, 41)
            </a>
            <a href="/#sez" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-100 text-[#B88E3E] font-bold no-underline flex items-center gap-2">
              <Briefcase size={14} />
              <span>Blue Ridge IT / ITES SEZ</span>
            </a>
            <a href="/#golf" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-100 text-[#070D1A] no-underline font-semibold">
              9-Hole Golf & River Marina
            </a>
            <a href="/why-paranjape" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-100 text-[#070D1A] no-underline font-semibold">
              The Paranjape Legacy
            </a>
            <a href="/journal" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-100 text-[#070D1A] no-underline font-semibold">
              The Blue Ridge Journal
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="text-[10px] font-mono text-slate-500 mb-3">
              MahaRERA: P52100055581 • P52100078116 • P52100000054
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

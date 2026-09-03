"use client";

import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, Phone, ShieldCheck, Menu, X, ArrowRight,
  Compass, MapPin, Building2, Trees, BookOpen, Layers
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
    <>
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. TOP RERA SOVEREIGN ASSURANCE BAR
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="fixed top-0 left-0 right-0 z-[110] bg-[#FAF9F6] border-b border-slate-200/80 text-[10px] text-slate-600 font-mono py-1 px-4 sm:px-8 flex justify-between items-center tracking-wider">
        <div className="flex items-center gap-2">
          <ShieldCheck size={12} className="text-[#B88E3E]" />
          <span className="font-semibold text-[#070D1A]">MahaRERA Registered:</span>
          <span className="hidden sm:inline">Promenade: P52100055581 • Altius: P52100078116 • Ridges 41: P52100000054</span>
          <span className="sm:hidden">P52100055581 | P52100078116</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <span className="hidden md:inline">Hinjewadi Phase 1, Pune</span>
          <a 
            href="https://maharera.mahaonline.gov.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-500 hover:text-[#B88E3E] transition-colors underline"
          >
            maharera.mahaonline.gov.in
          </a>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. LUMINOUS MASTER ARCHITECTURAL NAVIGATION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className={`fixed top-6 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] py-2.5' 
          : 'bg-white/85 backdrop-blur-xl border-b border-slate-200/60 py-3.5'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center justify-between">
          
          {/* Official Dual Insignia Lockup */}
          <a href="/" className="flex items-center gap-3 no-underline group">
            <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
              <img 
                src="/assets/logos/paranjape-schemes.png" 
                alt="Paranjape Schemes Official Logo" 
                className="h-7 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/images/paranjape-official-logo.png';
                }}
              />
              <div className="h-4 w-px bg-slate-200"></div>
              <img 
                src="/assets/logos/blue-ridge.png" 
                alt="Blue Ridge Township Emblem" 
                className="h-7 w-auto object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/images/blue-ridge-official-logo.png';
                }}
              />
            </div>
            
            <div className="flex flex-col text-left">
              <span className="font-serif text-sm sm:text-base font-semibold tracking-tight text-[#070D1A] group-hover:text-[#B88E3E] transition-colors leading-none">
                PARANJAPE BLUE RIDGE
              </span>
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-slate-500 mt-0.5">
                Hinjewadi • 138-Acre Township
              </span>
            </div>
          </a>

          {/* Master Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-[12px] font-sans font-medium uppercase tracking-[0.14em]">
            <a href="/#township-story" className="text-slate-800 hover:text-[#B88E3E] transition-colors no-underline">
              Blue Ridge
            </a>

            {/* Residences Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsResidencesDropdownOpen(true)}
              onMouseLeave={() => setIsResidencesDropdownOpen(false)}
            >
              <button 
                className="flex items-center gap-1 text-slate-800 hover:text-[#B88E3E] transition-colors py-2 bg-transparent border-none cursor-pointer uppercase font-medium text-[12px] tracking-[0.14em]"
                onClick={() => setIsResidencesDropdownOpen(!isResidencesDropdownOpen)}
              >
                <span>Residences</span>
                <ChevronDown size={13} className={`transition-transform duration-200 text-[#B88E3E] ${isResidencesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isResidencesDropdownOpen && (
                <div className="absolute top-full left-0 w-80 p-3 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] space-y-1">
                  <div className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-widest text-[#8F6A24] border-b border-slate-100">
                    Currently Available Clusters
                  </div>
                  {blueRidgeClusters.map((cluster) => (
                    <a
                      key={cluster.id}
                      href={`/paranjape-blue-ridge-${cluster.slug === 'ridges-41' ? '41' : cluster.slug}-hinjewadi-pune`}
                      className="p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between no-underline group transition-all"
                    >
                      <div>
                        <div className="text-xs font-serif font-medium text-[#070D1A] group-hover:text-[#B88E3E] transition-colors">
                          {cluster.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                          {cluster.configurations} • {cluster.carpetAreaRange}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#B88E3E] group-hover:translate-x-0.5 transition-transform">
                        →
                      </span>
                    </a>
                  ))}
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-1 text-[10px] font-mono">
                    <a href="/blue-ridge/ongoing-projects" className="p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-[#070D1A] no-underline">
                      All Projects
                    </a>
                    <a href="/#masterplan" className="p-2 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-[#070D1A] no-underline">
                      Masterplan Map
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="/#sez" className="text-slate-800 hover:text-[#B88E3E] transition-colors no-underline font-semibold">
              Blue Ridge SEZ
            </a>

            <a href="/#lifestyle" className="text-slate-800 hover:text-[#B88E3E] transition-colors no-underline">
              Lifestyle
            </a>

            <a href="/#golf" className="text-slate-800 hover:text-[#B88E3E] transition-colors no-underline">
              Golf & Marina
            </a>

            <a href="/#masterplan" className="text-slate-800 hover:text-[#B88E3E] transition-colors no-underline">
              Township Map
            </a>

            <a href="/why-paranjape" className="text-slate-800 hover:text-[#B88E3E] transition-colors no-underline">
              The Paranjape Story
            </a>

            <a href="/journal" className="text-slate-800 hover:text-[#B88E3E] transition-colors no-underline">
              Journal
            </a>
          </nav>

          {/* Right Action: Private Enquiry */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={openEnquiry}
              className="btn-champagne px-5 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-[0.14em] cursor-pointer border-none flex items-center gap-2 shadow-sm"
            >
              <span>Private Enquiry</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:text-[#B88E3E] cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

        {/* Mobile Flyout Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl">
            <div className="space-y-2 text-xs font-mono uppercase tracking-wider text-slate-700">
              <a href="/#township-story" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-100 text-[#070D1A] no-underline">
                The Blue Ridge Story
              </a>
              <a href="/blue-ridge/ongoing-projects" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-100 text-[#070D1A] no-underline">
                Current Residences (Promenade, Altius, 41)
              </a>
              <a href="/#sez" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-100 text-[#B88E3E] font-bold no-underline">
                Blue Ridge IT / ITES SEZ
              </a>
              <a href="/#golf" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-100 text-[#070D1A] no-underline">
                9-Hole Golf & Marina
              </a>
              <a href="/#lifestyle" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-100 text-[#070D1A] no-underline">
                Township Amenities
              </a>
              <a href="/why-paranjape" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-100 text-[#070D1A] no-underline">
                The Paranjape Story
              </a>
              <a href="/journal" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-100 text-[#070D1A] no-underline">
                The Blue Ridge Journal
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => { setIsMobileMenuOpen(false); openEnquiry(); }}
                className="w-full btn-champagne py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider border-none"
              >
                Book Private Site Visit
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

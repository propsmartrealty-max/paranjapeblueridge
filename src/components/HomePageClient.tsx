"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Building2, Trees, Waves, GraduationCap, ArrowRight, ShieldCheck, 
  MapPin, CheckCircle2, ChevronRight, Phone, Download, Eye, Sparkles, 
  Layers, Compass, Briefcase
} from 'lucide-react';
import ResidencesEditorialCarousel from './ResidencesEditorialCarousel';
import BlueRidgeResidentialMap from './BlueRidgeResidentialMap';
import AmenitiesTierSection from './AmenitiesTierSection';
import BlueRidgeSezSection from './BlueRidgeSezSection';
import TownshipSpecificationsSection from './TownshipSpecificationsSection';
import ParanjapeLegacySection from './ParanjapeLegacySection';
import JournalPreviewSection from './JournalPreviewSection';
import FAQSection from './FAQSection';
import EnquiryModal from './EnquiryModal';
import { townshipMasterData } from '@/data/cms/township';
import { blueRidgeClusters } from '@/data/cms/clusters';

export default function HomePageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInterest, setModalInterest] = useState('Paranjape Blue Ridge Master Inquiry');
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleOpenModal = (interest: string) => {
    setModalInterest(interest);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const handleHashCheck = () => {
      if (typeof window !== 'undefined' && window.location.hash === '#enquiry') {
        handleOpenModal('Township Concierge Enquiry');
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FAF9F6] text-[#070D1A] selection:bg-[#B88E3E] selection:text-white relative">
      
      {/* Interactive Global Enquiry Modal */}
      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialInterest={modalInterest} 
      />

      {/* Hidden button for navbar to trigger modal */}
      <button 
        data-enquiry-trigger 
        onClick={() => handleOpenModal('Master Township Inquiry')} 
        className="hidden" 
        aria-hidden="true"
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. LUMINOUS LUXURY HERO SECTION
          "PARANJAPE BLUE RIDGE — A CITY WITHIN. A WORLD APART."
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-20 bg-gradient-to-b from-[#F3F5F8] via-[#FAF9F6] to-[#FAF9F6] border-b border-slate-200 arch-section-divider">
        
        {/* Background Architectural Canvas with Authentic Drone Shot */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/images/pscl-blue-ridge-aerial-drone.webp" 
            alt="Paranjape Blue Ridge Hinjewadi Phase 1 - 138 Acre Integrated Township"
            className="w-full h-full object-cover scale-105 opacity-30 filter saturate-110 brightness-105"
          />
          {/* Luminous Porcelain & Sunlight Gradient Layer for High-Contrast Crisp Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/85 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/90 via-transparent to-[#FAF9F6]/90"></div>
          
          {/* Soft Golden Ambient Light */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-champagne/10 blur-[100px] pointer-events-none rounded-full"></div>
        </div>

        {/* Master Headline Content */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }} 
          className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl text-center flex flex-col items-center"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill border border-slate-300 text-[11px] font-mono uppercase tracking-[0.25em] text-[#785415] mb-6 shadow-sm font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#785415] animate-pulse"></span>
            <span>The 138-Acre Sovereign Township • Hinjewadi Phase 1, Pune</span>
          </div>

          {/* Master Developer Eyebrow */}
          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.35em] text-slate-600 mb-4 block font-extrabold">
            PARANJAPE SCHEMES PRESENTS
          </span>

          {/* Signature Headline */}
          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-serif font-bold text-[#070D1A] tracking-tight leading-[1.04] mb-6">
            A CITY WITHIN. <br />
            <span className="italic font-light text-gradient-champagne">A WORLD APART.</span>
          </h1>

          {/* Narrative Overview */}
          <p className="text-base sm:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-sans font-medium mb-10">
            Pune's landmark 138-acre integrated township in Hinjewadi Phase 1, bringing together residential enclaves, a 3M+ sq. ft. IT/ITES SEZ, championship golf, river promenade, and an ICSE school.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center w-full max-w-md sm:max-w-none">
            <button
              onClick={() => scrollToSection('township-story')}
              className="w-full sm:w-auto btn-champagne px-8 py-4 rounded-full text-xs font-sans font-bold uppercase tracking-[0.16em] cursor-pointer shadow-md transition-all"
            >
              Discover Blue Ridge
            </button>

            <button
              onClick={() => scrollToSection('residences')}
              className="w-full sm:w-auto btn-glass-outline px-8 py-4 rounded-full text-xs font-sans font-bold uppercase tracking-[0.16em] cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Residences</span>
              <ChevronRight size={14} />
            </button>

            <button
              onClick={() => scrollToSection('sez')}
              className="w-full sm:w-auto px-6 py-4 rounded-full text-xs font-mono uppercase tracking-wider text-[#785415] bg-amber-50 hover:bg-amber-100/70 border border-amber-300 transition-all flex items-center justify-center gap-2 cursor-pointer font-bold"
            >
              <Briefcase size={14} className="text-[#785415]" />
              <span>Blue Ridge SEZ</span>
            </button>
          </div>

          {/* 4 Architectural Micro-Badges with High-Visibility Borders */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-12 mt-12 border-t border-slate-200 w-full max-w-4xl text-left">
            <div className="glass-card-luxury p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider block font-bold">Scale</span>
              <div className="text-sm font-sans font-bold text-[#070D1A]">138 Masterplanned Acres</div>
            </div>
            <div className="glass-card-luxury p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider block font-bold">Commercial Engine</span>
              <div className="text-sm font-sans font-bold text-[#785415]">3M+ Sq. Ft. IT SEZ</div>
            </div>
            <div className="glass-card-luxury p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider block font-bold">Leisure</span>
              <div className="text-sm font-sans font-bold text-[#070D1A]">9-Hole Golf & Marina</div>
            </div>
            <div className="glass-card-luxury p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider block font-bold">Transit</span>
              <div className="text-sm font-sans font-bold text-[#070D1A]">800m to Metro Line 3</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. THE TOWNSHIP STORY SECTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="township-story" className="py-24 sm:py-32 bg-[#FAF9F6] relative border-b border-slate-200 arch-section-divider">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="chapter-badge">
                <span>01 • Master Township Concept</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#070D1A] leading-tight">
                Designed on the tenets of <br />
                <span className="italic font-light text-gradient-champagne">New Urbanism.</span>
              </h2>
              
              <p className="text-base text-slate-700 leading-relaxed font-sans font-medium">
                Conceived as western Pune's definitive walk-to-work integrated sanctuary, Paranjape Blue Ridge harmonizes nature and commerce across 138 tranquil acres along the banks of the Mula River.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed font-sans font-medium">
                Today, over 3,500 families thrive within its secure perimeter — enjoying championship golf facilities, an operational ICSE school, river boat club, high-street retail boulevards, and pedestrian proximity to the Rajiv Gandhi Infotech Park.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => handleOpenModal('Download Master Township Brochure')}
                  className="btn-champagne px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
                >
                  <Download size={14} />
                  <span>Download Township Brochure</span>
                </button>
                <button
                  onClick={() => handleOpenModal('Book VIP Site Visit')}
                  className="btn-glass-outline px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center gap-2"
                >
                  <Eye size={14} className="text-[#785415]" />
                  <span>Book Private Presentation</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden glass-surface p-3 shadow-md">
                <img 
                  src="/assets/images/pscl-blue-ridge-township-skyline.jpg" 
                  alt="Blue Ridge Township Aerial Panorama"
                  className="w-full h-96 object-cover rounded-2xl"
                />
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center border-t border-slate-200/80 pt-4">
                    <div>
                      <div className="text-2xl font-serif text-[#070D1A] font-bold">138</div>
                      <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wider font-bold">Total Acres</div>
                    </div>
                    <div>
                      <div className="text-2xl font-serif text-[#785415] font-bold">3,500+</div>
                      <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wider font-bold">Residing Families</div>
                    </div>
                    <div>
                      <div className="text-2xl font-serif text-[#070D1A] font-bold">60%+</div>
                      <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wider font-bold">Open Greens</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. "FIND YOUR PLACE WITHIN BLUE RIDGE" — RESIDENCES EDITORIAL CAROUSEL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-b border-slate-200 arch-section-divider">
        <ResidencesEditorialCarousel onSelectCluster={(cluster) => handleOpenModal(`Cluster Inquiry: ${cluster.name}`)} />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. BLUE RIDGE IT / ITES SEZ (EXTENDED DETAILING)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-b border-slate-200 arch-section-divider">
        <BlueRidgeSezSection />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. "BLUE RIDGE RESIDENTIAL MAP" — INTERACTIVE MASTERPLAN
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-b border-slate-200 arch-section-divider">
        <BlueRidgeResidentialMap />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. DUAL-TIER AMENITIES SECTION (CLUSTER VS TOWNSHIP)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-b border-slate-200 arch-section-divider">
        <AmenitiesTierSection />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. TOWNSHIP INTERIOR SPECIFICATIONS & KEY FEATURES (PSCL AUTHENTIC)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <TownshipSpecificationsSection />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. THE GOLF & MARINA EXPERIENCE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="golf" className="py-24 sm:py-32 bg-white relative overflow-hidden border-b border-slate-200 arch-section-divider">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden p-3 glass-surface shadow-md">
                <img 
                  src="/assets/images/pscl-blue-ridge-golf.webp" 
                  alt="Blue Ridge 9-Hole Executive Golf Course & Marina"
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="chapter-badge">
                <Trees size={11} className="text-[#785415]" />
                <span>06 • Leisure & Waterfront Sanctuary</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#070D1A] leading-tight">
                Championship greens <br />
                <span className="italic font-light text-gradient-champagne">in your backyard.</span>
              </h2>
              <p className="text-base text-slate-700 leading-relaxed font-sans font-medium">
                Blue Ridge hosts Pune's premier private 9-hole executive golf course alongside the Mula River waterfront. From morning drives on the fairways to sunset kayaking from the private boat club marina, the township delivers recreational exclusivity that cannot be replicated.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div className="p-4 rounded-2xl glass-card-luxury space-y-1">
                  <Trees size={20} className="text-[#785415] mb-2" />
                  <div className="text-sm font-serif text-[#070D1A] font-bold">9-Hole Course</div>
                  <div className="text-xs text-slate-600 font-medium">Executive layout & PGA coach</div>
                </div>
                <div className="p-4 rounded-2xl glass-card-luxury space-y-1">
                  <Waves size={20} className="text-blue-600 mb-2" />
                  <div className="text-sm font-serif text-[#070D1A] font-bold">Private Marina</div>
                  <div className="text-xs text-slate-600 font-medium">Boat club & kayak fleet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          9. THE PARANJAPE LEGACY (AUTHORITY & TRUST LAYER)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-b border-slate-200 arch-section-divider">
        <ParanjapeLegacySection />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          10. THE BLUE RIDGE JOURNAL (EDITORIAL SEO HUB)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-b border-slate-200 arch-section-divider">
        <JournalPreviewSection />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          11. FREQUENTLY ASKED QUESTIONS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-b border-slate-200 arch-section-divider">
        <FAQSection />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          12. PRIVATE CONCIERGE ENQUIRY DOCK
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="enquiry" className="py-24 bg-gradient-to-b from-[#FAF9F6] to-[#F3F5F8] relative">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <div className="glass-card-luxury p-8 sm:p-14 shadow-lg">
            <div className="chapter-badge mb-4 mx-auto">
              <Sparkles size={11} className="text-[#785415]" />
              <span>Private Viewing Concierge</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#070D1A] mb-6">
              Reserve your private viewing <br />
              <span className="italic font-light text-gradient-champagne">at Blue Ridge Hinjewadi.</span>
            </h2>
            <p className="text-slate-700 max-w-xl mx-auto text-base font-sans font-medium mb-8">
              Our specialized residential advisory desk is at your service for verified floor plans, bespoke site inspections, and customized cost sheets.
            </p>

            <button
              onClick={() => handleOpenModal('Private Consultation Request')}
              className="btn-champagne px-10 py-4 rounded-full text-xs font-sans font-bold uppercase tracking-widest cursor-pointer shadow-md"
            >
              Connect With Private Advisor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

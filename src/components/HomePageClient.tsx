"use client";

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, Download, Eye, Trees, Waves, GraduationCap, 
  Train, Building2, ShieldCheck, Sparkles, MapPin, Compass, Phone
} from 'lucide-react';
import ResidencesEditorialCarousel from '@/components/ResidencesEditorialCarousel';
import BlueRidgeResidentialMap from '@/components/BlueRidgeResidentialMap';
import AmenitiesTierSection from '@/components/AmenitiesTierSection';
import ParanjapeLegacySection from '@/components/ParanjapeLegacySection';
import JournalPreviewSection from '@/components/JournalPreviewSection';
import EnquiryModal from '@/components/EnquiryModal';
import FAQSection from '@/components/FAQSection';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePageClient() {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInterest, setModalInterest] = useState('Paranjape Blue Ridge Master Township');

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const handleOpenModal = (interest: string) => {
    setModalInterest(interest);
    setIsModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    if (typeof window !== 'undefined') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="text-ivory bg-[#060911] selection:bg-champagne selection:text-obsidian relative overflow-hidden">
      {/* Concierge Modal */}
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
          1. CINEMATIC HERO SECTION
          "PARANJAPE BLUE RIDGE — A CITY WITHIN. A WORLD APART."
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
        {/* Background Architectural Canvas with Heavy Dark Gradient Mask */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/images/real-township-day.jpg" 
            alt="Paranjape Blue Ridge Hinjewadi Phase 1 - 138 Acre Integrated Township"
            className="w-full h-full object-cover scale-105 opacity-40 filter brightness-75"
          />
          {/* Obsidian Gradient Layer for 100% Text Contrast & Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060911] via-[#060911]/80 to-[#060911]/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#060911]/90 via-transparent to-[#060911]/90"></div>
          
          {/* Subtle Ambient Golden Radial Bloom */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-radial from-champagne/[0.07] to-transparent blur-3xl pointer-events-none"></div>
        </div>

        {/* Master Headline Content */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }} 
          className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl text-center flex flex-col items-center"
        >
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill border border-white/10 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-champagne-light mb-8 shadow-glass">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse"></span>
            <span>The 138-Acre Sovereign Legacy • Hinjewadi Phase 1, Pune</span>
          </div>

          {/* Master Developer Eyebrow */}
          <span className="text-xs sm:text-sm md:text-base font-mono uppercase tracking-[0.35em] text-stone-light mb-4 block">
            PARANJAPE BLUE RIDGE
          </span>

          {/* Signature Headline */}
          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-serif font-normal text-ivory tracking-tight leading-[1.04] mb-8">
            A CITY WITHIN. <br />
            <span className="italic font-light text-gradient-champagne">A WORLD APART.</span>
          </h1>

          {/* Narrative Overview */}
          <p className="text-base sm:text-xl text-stone-light max-w-2xl mx-auto leading-relaxed font-sans font-light mb-12">
            An integrated township experience in Hinjewadi, Pune, bringing together residences, recreation, green spaces, golf and an evolving urban ecosystem.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center w-full max-w-md sm:max-w-none">
            <button
              onClick={() => scrollToSection('township-story')}
              className="w-full sm:w-auto btn-champagne px-8 py-4 rounded-full text-xs font-sans font-bold uppercase tracking-[0.16em] cursor-pointer border-none shadow-glass transition-all"
            >
              Discover Blue Ridge
            </button>

            <button
              onClick={() => scrollToSection('residences')}
              className="w-full sm:w-auto btn-glass-outline px-8 py-4 rounded-full text-xs font-sans font-semibold uppercase tracking-[0.16em] cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Residences</span>
              <ArrowRight size={14} className="text-champagne" />
            </button>
          </div>

          {/* 4 Architectural Micro-Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 pt-16 mt-12 border-t border-white/[0.08] w-full max-w-4xl text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">Scale</span>
              <div className="text-sm font-sans font-medium text-ivory">138 Masterplanned Acres</div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">Recreation</span>
              <div className="text-sm font-sans font-medium text-ivory">9-Hole Golf & Marina</div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">Campus</span>
              <div className="text-sm font-sans font-medium text-ivory">Blue Ridge Public School</div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-stone uppercase tracking-wider block">Transit</span>
              <div className="text-sm font-sans font-medium text-ivory">800m to Metro Line 3</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. THE TOWNSHIP STORY SECTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="township-story" className="py-24 sm:py-32 bg-[#060911] relative border-t border-white/[0.06]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-champagne block">
                The Township Story
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-ivory leading-tight">
                Designed on the tenets of <br />
                <span className="italic font-light text-gradient-champagne">New Urbanism.</span>
              </h2>
              <p className="text-base text-stone-light leading-relaxed font-sans font-light">
                Conceived as western Pune's definitive walk-to-work integrated sanctuary, Paranjape Blue Ridge harmonizes nature and commerce across 138 tranquil acres along the banks of the Mula River.
              </p>
              <p className="text-sm text-stone-light leading-relaxed font-sans font-light">
                Today, over 3,500 families thrive within its secure perimeter — enjoying championship golf facilities, an operational ICSE school, river boat club, high-street retail boulevards, and pedestrian proximity to the Rajiv Gandhi Infotech Park.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => handleOpenModal('Download Master Township Brochure')}
                  className="btn-champagne px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer border-none flex items-center gap-2"
                >
                  <Download size={14} />
                  <span>Download Township Brochure</span>
                </button>
                <button
                  onClick={() => handleOpenModal('Book VIP Site Visit')}
                  className="btn-glass-outline px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer flex items-center gap-2"
                >
                  <Eye size={14} className="text-champagne" />
                  <span>Book Private Presentation</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden glass-panel p-3 border border-white/10 shadow-glass-elevated">
                <img 
                  src="/assets/images/real-township-day.jpg" 
                  alt="Blue Ridge Township Aerial Panorama"
                  className="w-full h-96 object-cover rounded-2xl opacity-90"
                />
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center border-t border-white/[0.08] pt-4">
                    <div>
                      <div className="text-2xl font-serif text-ivory font-medium">138</div>
                      <div className="text-[10px] font-mono text-stone uppercase tracking-wider">Total Acres</div>
                    </div>
                    <div>
                      <div className="text-2xl font-serif text-champagne font-medium">3,500+</div>
                      <div className="text-[10px] font-mono text-stone uppercase tracking-wider">Residing Families</div>
                    </div>
                    <div>
                      <div className="text-2xl font-serif text-ivory font-medium">60%+</div>
                      <div className="text-[10px] font-mono text-stone uppercase tracking-wider">Open Greens</div>
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
      <ResidencesEditorialCarousel onSelectCluster={(cluster) => handleOpenModal(`Cluster Inquiry: ${cluster.name}`)} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. "BLUE RIDGE RESIDENTIAL MAP" — INTERACTIVE MASTERPLAN
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <BlueRidgeResidentialMap />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. DUAL-TIER AMENITIES SECTION (CLUSTER VS TOWNSHIP)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AmenitiesTierSection />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. THE GOLF & MARINA EXPERIENCE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="golf" className="py-24 sm:py-32 bg-[#030508] relative overflow-hidden border-t border-white/[0.06]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden glass-panel p-3 border border-white/10 shadow-glass">
                <img 
                  src="/assets/images/real-township-day.jpg" 
                  alt="Blue Ridge 9-Hole Executive Golf Course & Marina"
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl opacity-85"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-champagne block">
                Golf & Nautical Living
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-normal text-ivory leading-tight">
                Championship greens <br />
                <span className="italic font-light text-gradient-champagne">in your backyard.</span>
              </h2>
              <p className="text-base text-stone-light leading-relaxed font-sans font-light">
                Blue Ridge hosts Pune's premier private 9-hole executive golf course alongside the Mula River waterfront. From morning drives on the fairways to sunset kayaking from the private boat club marina, the township delivers recreational exclusivity that cannot be replicated.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <Trees size={20} className="text-champagne mb-2" />
                  <div className="text-sm font-serif text-ivory font-medium">9-Hole Course</div>
                  <div className="text-xs text-stone-light">Executive layout & PGA coach</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <Waves size={20} className="text-blue-400 mb-2" />
                  <div className="text-sm font-serif text-ivory font-medium">Private Marina</div>
                  <div className="text-xs text-stone-light">Boat club & kayak fleet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          7. THE PARANJAPE LEGACY (AUTHORITY & TRUST LAYER)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <ParanjapeLegacySection />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          8. THE BLUE RIDGE JOURNAL (EDITORIAL SEO HUB)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <JournalPreviewSection />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          9. FREQUENTLY ASKED QUESTIONS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <FAQSection />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          10. PRIVATE CONCIERGE ENQUIRY DOCK
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="enquiry" className="py-24 bg-[#030508] relative border-t border-white/[0.06]">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-champagne block mb-3">
            Private Presentation
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-ivory mb-6">
            Reserve your private viewing <br />
            <span className="italic font-light text-gradient-champagne">at Blue Ridge Hinjewadi.</span>
          </h2>
          <p className="text-stone-light max-w-xl mx-auto text-base font-sans font-light mb-8">
            Our specialized residential advisory desk is at your service for verified floor plans, bespoke site inspections, and customized cost sheets.
          </p>

          <button
            onClick={() => handleOpenModal('Private Consultation Request')}
            className="btn-champagne px-10 py-4 rounded-full text-xs font-sans font-bold uppercase tracking-widest cursor-pointer border-none shadow-glass"
          >
            Connect With Private Advisor
          </button>
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import EnquiryModal from '@/components/EnquiryModal';
import PopularSearches from '@/components/PopularSearches';
import FAQSection from '@/components/FAQSection';
import GoogleEcosystem from '@/components/GoogleEcosystem';
import FooterSEO from '@/components/FooterSEO';
import { useLanguage } from '@/context/LanguageContext';
import { useAtmosphere } from '@/context/AtmosphereContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useHasMounted } from '@/hooks/useHasMounted';
import { projects } from '@/data/master-data';
import { useSearchParams } from '@/hooks/useNav';
import { 
  ShieldCheck, Award, MapPin, Sparkles, Building2, 
  ArrowRight, Download, Eye, CheckCircle2, Phone, 
  MessageCircle, Compass, Trees, Waves, GraduationCap, Train
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const MarketAnalysis = dynamic(() => import('@/components/MarketAnalysis'));
const ComparisonMatrix = dynamic(() => import('@/components/ComparisonMatrix'));
const InvestmentMatrix = dynamic(() => import('@/components/InvestmentMatrix'));
const TownshipExperience = dynamic(() => import('@/components/TownshipExperience'));
const IntelligenceHub = dynamic(() => import('@/components/IntelligenceHub'));
const ConnectivityHub = dynamic(() => import('@/components/ConnectivityHub'));
const BlogSection = dynamic(() => import('@/components/BlogSection'));
const InventoryMatrix = dynamic(() => import('@/components/InventoryMatrix'));
const InteractiveMasterPlan = dynamic(() => import('@/components/InteractiveMasterPlan'));
const RoiCalculator = dynamic(() => import('@/components/RoiCalculator'));
const TownshipVirtualTour = dynamic(() => import('@/components/TownshipVirtualTour'));

export default function HomePageClient() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const hasMounted = useHasMounted();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInterest, setModalInterest] = useState('Paranjape Blue Ridge Township');
  const [selectedCluster, setSelectedCluster] = useState<'promenade' | 'altius' | 'ridges41'>('promenade');
  const searchParams = useSearchParams();
  const googleSearchQuery = searchParams?.get('s') || searchParams?.get('q') || '';

  useEffect(() => {
    if (googleSearchQuery) {
      const targetElement = document.getElementById('projects') || document.getElementById('inventory');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [googleSearchQuery]);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const clusterDetails = {
    promenade: {
      name: "Promenade Residences",
      nameMr: "प्रॉमनेड रेसिडेन्सेस",
      tagline: "Tallest 41-Storey River-Facing Luxury Towers",
      taglineMr: "हिंजवडीतील पहिले ४१ मजली नदीभिमुख लक्झरी टॉवर्स",
      bhk: "3 & 4 BHK Riverfront",
      carpet: "1,316 - 1,718 Sq. Ft.",
      priceNumeric: 16500000,
      priceLabel: "₹1.65 Cr*",
      rera: "P52100055581",
      slug: "paranjape-blue-ridge-promenade-hinjewadi-pune",
      image: "/assets/images/promenade-hero.jpg",
      highlight: "Mula River Promenade & Double-Height Balconies"
    },
    altius: {
      name: "The Altius Riverside",
      nameMr: "द अल्टियस रिव्हरसाईड",
      tagline: "Ultra-Luxury 4 & 5 BHK Golf-View Sky Residences",
      taglineMr: "९-होल गोल्फ कोर्स व्ह्यू सह ४ आणि ५ बीएचके स्काय होम्स",
      bhk: "4 & 5 BHK Sky Duplex",
      carpet: "1,858 - 2,480 Sq. Ft.",
      priceNumeric: 18000000,
      priceLabel: "₹1.80 Cr*",
      rera: "P52100078116",
      slug: "paranjape-blue-ridge-the-altius-hinjewadi-pune",
      image: "/assets/images/altius-hero.jpg",
      highlight: "Private Lift Lobby & 9-Hole Golf Backyard"
    },
    ridges41: {
      name: "Ridges 41",
      nameMr: "रिजेस ४१",
      tagline: "41-Storey Monolithic MiVAN Smart Living",
      taglineMr: "४१ मजली प्रगत मिवान २ बीएचके स्मार्ट होम्स",
      bhk: "2 BHK Smart Homes",
      carpet: "793 - 970 Sq. Ft.",
      priceNumeric: 9760000,
      priceLabel: "₹97.60 L*",
      rera: "P52100000054",
      slug: "paranjape-blue-ridge-41-hinjewadi-pune",
      image: "/assets/images/ridges-hero.jpg",
      highlight: "6-Level Podium Parking & 5.2% Rental Yield"
    }
  };

  const activeCluster = clusterDetails[selectedCluster];

  const handleOpenModal = (interest: string) => {
    setModalInterest(interest);
    setIsModalOpen(true);
  };

  return (
    <main className="text-text selection:bg-gold selection:text-navy relative overflow-hidden bg-ambient-orbs">
      <Navbar />
      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialInterest={modalInterest} 
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ULTRA-FLASHY & CREATIVE HERO SECTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section ref={heroRef} className="relative min-h-[96vh] flex items-center overflow-hidden pt-28 pb-16">
        {/* Background Canvas */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/images/real-township-day.jpg" 
            className="w-full h-full object-cover opacity-35 scale-105 transition-transform duration-1000"
            alt="Paranjape Blue Ridge Hinjewadi Phase 1 - 138 Acre Integrated Township"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/70"></div>
          <div className="absolute inset-0 hologram-grid-bg opacity-30"></div>
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT: MASTER HEADLINE & LIVE VALUE PROP */}
            <div className="lg:col-span-7">
              {/* Sovereign Township Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full ultra-glass-card border border-gold/40 text-gold font-mono font-bold tracking-[3px] uppercase text-[10px] sm:text-xs mb-6 shadow-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{t('138-Acre Integrated Township Landmark', '१३८ एकर एकात्मिक टाउनशिप लँडमार्क')}</span>
              </div>

              {/* Animated Shimmering Title */}
              <h1 id="speakable-title" className="text-4xl sm:text-6xl lg:text-7xl font-serif text-warm-white font-bold leading-[1.06] tracking-tight mb-6">
                <span className="block text-xs sm:text-sm font-sans font-bold tracking-[0.3em] uppercase text-gold mb-2">
                  PARANJAPE BLUE RIDGE • HINJEWADI PHASE 1
                </span>
                <span className="text-shimmer-gold block">
                  {t('The Sovereign Address', 'सर्वोत्तम एकात्मिक')}
                </span>
                <span className="text-warm-white font-normal italic">
                  {t('of Hinjewadi Pune', 'रिव्हरफ्रंट जीवनमान')}
                </span>
              </h1>

              {/* Summary */}
              <p id="speakable-summary" className="text-base sm:text-lg text-text-muted max-w-2xl leading-relaxed mb-8 font-sans">
                {t(
                  "Experience Pune's premier 138-acre self-sufficient township featuring luxury 2, 3, 4 & 5 BHK residences, an operational ICSE school, 9-hole golf course, private boat club, and walk-to-work SEZ tech hub.",
                  "पुण्याच्या प्रतिष्ठित १३८ एकरच्या टाउनशिपचा अनुभव घ्या. प्रॉमनेड, अल्टियस आणि रिजेस ४१ मधील आलिशान घरे, आयसीएसई शाळा, ९-होल गोल्फ कोर्स, बोट क्लब आणि वॉक-टू-वर्क आयटी पार्कसह."
                )}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-4 items-center mb-10">
                <button 
                  onClick={() => handleOpenModal('Download All Cluster Floor Plans')}
                  className="btn-gold-glow px-8 py-4 rounded-full text-navy font-bold uppercase text-xs tracking-widest transition-all cursor-pointer border-none flex items-center gap-2 shadow-2xl"
                >
                  <Download size={16} />
                  <span>{t('Download Cost Sheet & Plans', 'किंमत व फ्लोअर प्लॅन मिळवा')}</span>
                </button>

                <button 
                  onClick={() => handleOpenModal('Book VIP Site Visit')}
                  className="ultra-glass-card hover:bg-gold/10 text-warm-white hover:text-gold px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest border border-gold/40 hover:border-gold transition-all cursor-pointer flex items-center gap-2"
                >
                  <Eye size={16} className="text-gold" />
                  <span>{t('Book VIP Site Visit', 'साइट व्हिजिट बुक करा')}</span>
                </button>
              </div>

              {/* 4 ICONIC TOWNSHIP HIGHLIGHT BADGES */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-gold/20">
                <div className="flex items-center gap-2 text-xs text-warm-white font-medium">
                  <Trees size={18} className="text-gold shrink-0" />
                  <span>9-Hole Golf</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-warm-white font-medium">
                  <GraduationCap size={18} className="text-cyan-400 shrink-0" />
                  <span>ICSE School</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-warm-white font-medium">
                  <Waves size={18} className="text-blue-400 shrink-0" />
                  <span>Boat Club</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-warm-white font-medium">
                  <Train size={18} className="text-emerald-400 shrink-0" />
                  <span>Metro 800m</span>
                </div>
              </div>
            </div>

            {/* RIGHT: INTERACTIVE 3D CLUSTER SELECTOR HUD */}
            <div className="lg:col-span-5">
              <div className="laser-glow-border shadow-2xl">
                <div className="laser-glow-border-inner p-6 sm:p-8">
                  {/* Interactive Tab Switcher */}
                  <div className="flex items-center justify-between gap-1 p-1 bg-navy/80 rounded-2xl border border-gold/30 mb-6">
                    <button
                      onClick={() => setSelectedCluster('promenade')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
                        selectedCluster === 'promenade'
                          ? 'bg-gold text-navy shadow-lg font-extrabold'
                          : 'text-text-muted hover:text-warm-white bg-transparent'
                      }`}
                    >
                      Promenade
                    </button>
                    <button
                      onClick={() => setSelectedCluster('altius')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
                        selectedCluster === 'altius'
                          ? 'bg-gold text-navy shadow-lg font-extrabold'
                          : 'text-text-muted hover:text-warm-white bg-transparent'
                      }`}
                    >
                      The Altius
                    </button>
                    <button
                      onClick={() => setSelectedCluster('ridges41')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all border-none cursor-pointer ${
                        selectedCluster === 'ridges41'
                          ? 'bg-gold text-navy shadow-lg font-extrabold'
                          : 'text-text-muted hover:text-warm-white bg-transparent'
                      }`}
                    >
                      Ridges 41
                    </button>
                  </div>

                  {/* Active Cluster Live Card */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-wider block">
                          Featured Enclave
                        </span>
                        <h3 className="text-2xl font-serif text-warm-white font-bold mt-0.5">
                          {t(activeCluster.name, activeCluster.nameMr)}
                        </h3>
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {activeCluster.bhk}
                      </span>
                    </div>

                    <p className="text-xs text-text-muted leading-relaxed font-sans">
                      {t(activeCluster.tagline, activeCluster.taglineMr)}
                    </p>

                    {/* Spec Metrics */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="bg-navy/80 p-3.5 rounded-xl border border-white/10">
                        <span className="text-[10px] font-mono text-text-muted uppercase block">Carpet Area</span>
                        <span className="text-sm font-bold text-warm-white font-mono">{activeCluster.carpet}</span>
                      </div>
                      <div className="bg-navy/80 p-3.5 rounded-xl border border-white/10">
                        <span className="text-[10px] font-mono text-text-muted uppercase block">All-Inclusive Price</span>
                        <span className="text-sm font-bold text-gold font-mono">
                          {formatPrice(activeCluster.priceNumeric)}
                        </span>
                      </div>
                    </div>

                    {/* Highlight Box */}
                    <div className="p-3 rounded-xl bg-gold/10 border border-gold/30 text-xs text-warm-white flex items-center gap-2.5">
                      <Sparkles size={16} className="text-gold shrink-0 animate-pulse" />
                      <span>{activeCluster.highlight}</span>
                    </div>

                    {/* Cluster Link Button */}
                    <a
                      href={`/${activeCluster.slug}`}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold via-gold-light to-gold text-navy py-3.5 rounded-2xl font-bold uppercase text-xs tracking-widest hover:opacity-95 transition-all no-underline shadow-xl mt-4"
                    >
                      <span>Explore {activeCluster.name}</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* FLASH INVENTORY MATRIX */}
      <InventoryMatrix />

      {/* TRUST SYMBOLS WITH PROMINENT ARCHITECTURAL ACCENTS */}
      <section className="py-6 sm:py-8 border-y border-gold/30 ultra-glass-card backdrop-blur-2xl relative shadow-lg">
        <div className="container mx-auto px-4 max-w-7xl flex flex-wrap justify-center sm:justify-between items-center gap-6 opacity-95">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="text-gold" size={20} />
            <span className="text-xs uppercase font-bold tracking-[2px] text-warm-white font-mono">MahaRERA Registered</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Award className="text-gold" size={20} />
            <span className="text-xs uppercase font-bold tracking-[2px] text-warm-white font-mono">35+ Years PSCL Heritage</span>
          </div>
          <div className="hidden md:flex items-center gap-3 font-serif text-xl md:text-2xl text-gilded font-bold">
            PARANJAPE BLUE RIDGE
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="text-gold" size={20} />
            <span className="text-xs uppercase font-bold tracking-[2px] text-warm-white font-mono">Hinjewadi Phase 1, Pune</span>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* MARKET ANALYSIS SECTION */}
        <MarketAnalysis />

        {/* ROI CALCULATOR SECTION */}
        <div className="my-16">
          <RoiCalculator initialPrice={12500000} title="Paranjape Blue Ridge" />
        </div>

        {/* TOWNSHIP COMPARISONS */}
        <div className="my-16">
          <ComparisonMatrix />
        </div>

        {/* RESIDENTIAL CLUSTER SHOWCASE */}
        <section aria-labelledby="architecture-title" className="py-16 sm:py-24" id="projects">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-bold text-gold uppercase tracking-[4px] px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 inline-block mb-3">
              Master Architectural Enclaves
            </span>
            <h2 id="architecture-title" className="text-3xl sm:text-5xl md:text-6xl font-serif text-warm-white font-bold mt-3">
              Residential <span className="text-gilded font-extrabold">Volumes</span>
            </h2>
            <p className="text-sm text-text-muted mt-3 max-w-2xl mx-auto font-sans">
              Three sovereign residential enclaves engineered for walk-to-work IT park proximity, river views, and luxury living.
            </p>
          </div>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} reverse={i % 2 !== 0} />
          ))}
        </section>

        {/* TOWNSHIP EXPERIENCE & AMENITIES */}
        <div className="my-16" id="township">
          <TownshipExperience />
        </div>

        {/* 4K VIRTUAL DRONE TOUR */}
        <div className="my-16">
          <TownshipVirtualTour />
        </div>

        {/* INTERACTIVE MASTER PLAN */}
        <div className="my-16">
          <InteractiveMasterPlan />
        </div>

        {/* GOOGLE ECOSYSTEM & LOCAL INTELLIGENCE */}
        <div className="my-16">
          <GoogleEcosystem />
        </div>

        {/* MARKET INTELLIGENCE HUB */}
        <div className="my-16">
          <IntelligenceHub />
        </div>

        {/* CONNECTIVITY & METRO CORRIDOR */}
        <div className="my-16">
          <ConnectivityHub />
        </div>

        {/* RESEARCH INSIGHTS & ARTICLES */}
        <div className="my-16">
          <BlogSection />
        </div>

        {/* HIGH INTENT POPULAR SEARCHES */}
        <div className="my-16">
          <PopularSearches />
        </div>

        {/* FAQ ACCORDION FOR SGE & AI SNIPPETS */}
        <div className="my-16">
          <FAQSection />
        </div>
      </div>

      {/* MASTER FOOTER */}
      <FooterSEO />
    </main>
  );
}

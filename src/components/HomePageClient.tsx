"use client";

import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import EnquiryModal from '@/components/EnquiryModal';
import PopularSearches from '@/components/PopularSearches';
import FAQSection from '@/components/FAQSection';
import GoogleEcosystem from '@/components/GoogleEcosystem';
import FooterSEO from '@/components/FooterSEO';
import { useLanguage } from '@/context/LanguageContext';
import { useAtmosphere } from '@/context/AtmosphereContext';
import { useBuyerIntent } from '@/components/TrackingProvider';
import { useHasMounted } from '@/hooks/useHasMounted';
import { projects } from '@/data/master-data';
import { usePathname, useSearchParams } from '@/hooks/useNav';
import { Mail, MapPin, ShieldCheck, Award, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import DOMPurify from 'dompurify';
import { blurDataURLs } from '@/utils/blurData';

const LEAD_API = '/api/lead';

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
  const hasMounted = useHasMounted();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  
  // Inline form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    intent: 'Promenade Residences',
    bot_field: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const handleInlineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    
    // Honeypot check
    if (formData.bot_field) return;

    // Phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    const mobileOnly = cleanPhone.length > 10 ? cleanPhone.slice(-10) : cleanPhone;
    if (!phoneRegex.test(mobileOnly)) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setFormStatus('submitting');

    const sanitize = (str: string) => {
      let clean = str.replace(/[<>]/g, '');
      if (DOMPurify) clean = DOMPurify.sanitize(clean);
      return clean;
    };

    // Ultra-Advanced: Inject invisible behavioral fingerprinting & UTM tracking data
    const fingerprintData = localStorage.getItem('sovereign-fingerprint');
    const behavioralFingerprint = fingerprintData ? JSON.parse(fingerprintData).join(', ') : 'None';
    
    const utmData = localStorage.getItem('sovereign-utms');
    const utms = utmData ? JSON.parse(utmData) : {};

    const leadPayload = {
      name: sanitize(formData.name),
      phone: sanitize(formData.phone),
      email: sanitize(formData.email),
      bhk: sanitize(formData.intent),
      source: 'Homepage_Inline_Form',
      behavioralFingerprint,
      utms,
      timestamp: new Date().toISOString(),
    };

    // Sovereign Vault (local backup)
    try {
      let existingLeads = JSON.parse(localStorage.getItem('ks_leads') || '[]');
      // DPDP Act: 24-hour TTL data minimization
      const ONE_DAY = 24 * 60 * 60 * 1000;
      const now = Date.now();
      existingLeads = existingLeads.filter((lead: any) => {
        const leadTime = new Date(lead.timestamp).getTime();
        return (now - leadTime) < ONE_DAY;
      });
      existingLeads.push(leadPayload);
      localStorage.setItem('ks_leads', JSON.stringify(existingLeads));
    } catch (err) {}

    // Server-side API dispatch
    try {
      const response = await fetch(LEAD_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload),
      });
      const data = await response.json();

      if (!response.ok && data.error) {
        setFormError(data.error);
        setFormStatus('idle');
        return;
      }
    } catch (err) {
      console.error("Lead API dispatch failed", err);
    }

    setFormStatus('success');
    setTimeout(() => {
      setFormStatus('idle');
      setFormData({ name: '', phone: '', email: '', intent: 'Promenade Residences', bot_field: '' });
    }, 4000);
  };
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const { intent } = useBuyerIntent();
  const { atmosphere } = useAtmosphere();

  return (
    <main 
      style={{ backgroundColor: 'var(--bg)' }}
      className="text-text selection:bg-gold selection:text-navy transition-colors duration-1000"
    >
      <Navbar />
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden pt-28 pb-16">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0 z-0">
          <Image 
            src={atmosphere === 'night' ? "/assets/images/real-township-night.jpg" : "/assets/images/real-township-day.jpg"} 
            fill
            priority
            placeholder="blur"
            blurDataURL={atmosphere === 'night' ? blurDataURLs.darkNavy : blurDataURLs.lightSkyBlue}
            className="object-cover transition-all duration-1000 opacity-70" 
            alt="Actual photograph of Paranjape Blue Ridge Hinjewadi Phase 1 - 138 Acre Integrated Township Premium Apartments"
            sizes="100vw"
          />
          <div 
            className="absolute inset-0 transition-colors duration-1000" 
            style={{ background: `linear-gradient(to right, var(--bg) 0%, var(--bg) 40%, transparent 100%)`, opacity: atmosphere === 'night' ? 0.92 : 0.88 }}
          ></div>
          {/* Prominent Architectural Scan Line */}
          <div className="luminous-line-gold absolute bottom-0 left-0 right-0 z-10 opacity-75"></div>
        </motion.div>
        
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 max-w-3xl">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full liquid-glass-dock border border-gold/40 text-gold font-bold tracking-[4px] uppercase text-[9px] sm:text-[10px] mb-6 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse"></span>
                <span>{intent === 'investor' 
                  ? t('High-Yield Investment Legacy', 'उच्च-उत्पन्न गुंतवणूक वारसा') 
                  : t('138-Acre Riverfront Township Legacy', '१३८ एकर रिव्हरफ्रंट टाउनशिप वारसा')}</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-warm-white leading-[1.04] tracking-tight mb-6">
                <span className="block text-xs sm:text-sm font-bold tracking-[0.28em] uppercase text-gold/90 mb-3 font-sans" aria-hidden="true">
                  Paranjape Blue Ridge Hinjewadi
                </span>
                <span className="text-gilded block mb-1 font-extrabold">
                  {intent === 'investor' ? t('Capital Growth & Yield', 'भांडवली वाढ आणि परतावा') : t('Zenith of Integrated', 'एकात्मिक जीवनशैलीचे')}
                </span>
                <span className="italic font-normal">
                  {intent === 'investor' ? t('Prestige Living', 'प्रतिष्ठित जीवनमान') : t('Riverside Living', 'रिव्हरफ्रंट निवास')}
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-text-light max-w-2xl leading-relaxed mb-8 font-medium">
                {t("Experience Pune's iconic 138-acre self-sufficient township in Hinjewadi Phase 1. Discover ultra-luxury high-rise residences at Promenade, The Altius, and Ridges 41 with an ICSE school, 9-hole golf course, private boat club, and walk-to-work SEZ.", "हिंजवडी फेज १ मधील पुण्याच्या प्रतिष्ठित १३८ एकरच्या टाउनशिपचा अनुभव घ्या. प्रॉमनेड, अल्टियस आणि रिजेस ४१ मधील आलिशान घरे, आयसीएसई शाळा, गोल्फ कोर्स आणि बोट क्लबसह.")}
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <div className="glass-conic-border">
                  <button 
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} 
                    className="glass-conic-border-inner bg-gradient-to-r from-gold via-gold-light to-gold text-navy px-8 sm:px-10 py-4 font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-2xl hover:shadow-gold/40 text-center border-none cursor-pointer btn-sheen flex items-center gap-2"
                  >
                    <span>{t('Explore Residences', 'निवासस्थाने पहा')}</span>
                    <span className="text-sm">→</span>
                  </button>
                </div>
                <button 
                  onClick={() => document.getElementById('amenities')?.scrollIntoView({ behavior: 'smooth' })} 
                  className="ultra-glass-card glass-shimmer-card border border-gold/35 text-warm-white hover:text-gold px-8 sm:px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:border-gold hover:scale-105 transition-all text-center cursor-pointer shadow-lg"
                >
                  {t('Township Amenities', 'टाऊनशिप सुविधा')}
                </button>
              </div>
            </div>

            {/* FLOATING GLASS STATS COLUMN WITH ARCHITECTURAL HUD FRAMES */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.03, y: -6 }}
                className="ultra-glass-card glass-shimmer-card p-5 rounded-2xl border border-gold/35 shadow-2xl backdrop-blur-2xl relative overflow-hidden hud-frame"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Total Scale</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold/15 text-gold font-bold font-mono border border-gold/30">138 Acres</span>
                </div>
                <div className="text-lg sm:text-xl font-serif text-warm-white font-bold">Self-Sufficient Ecosystem</div>
                <div className="text-xs text-text-muted mt-1.5 flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm"></span>
                  <span>3,000+ Happy Families Residing</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                whileHover={{ scale: 1.03, y: -6 }}
                className="ultra-glass-card glass-shimmer-card p-5 rounded-2xl border border-gold/35 shadow-2xl backdrop-blur-2xl relative overflow-hidden hud-frame"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Strategic Transit</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold font-mono border border-emerald-500/30">800 Meters</span>
                </div>
                <div className="text-lg sm:text-xl font-serif text-warm-white font-bold">Metro Line 3 Station</div>
                <div className="text-xs text-text-muted mt-1.5 flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-gold shadow-sm"></span>
                  <span>Direct link to Shivajinagar CBD</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.03, y: -6 }}
                className="ultra-glass-card glass-shimmer-card p-5 rounded-2xl border border-gold/35 shadow-2xl backdrop-blur-2xl relative overflow-hidden hud-frame"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Rental Yield</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold/15 text-gold font-bold font-mono border border-gold/30">4.8% - 5.5%</span>
                </div>
                <div className="text-lg sm:text-xl font-serif text-warm-white font-bold">Walk-to-Work Tech Hub</div>
                <div className="text-xs text-text-muted mt-1.5 flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shadow-sm"></span>
                  <span>Infosys, Wipro, TCS within 2 km</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FLASH-INVENTORY SECTION */}
      <InventoryMatrix />

      {/* TRUST SYMBOLS WITH PROMINENT ARCHITECTURAL ACCENTS */}
      <section className="py-6 sm:py-8 border-y border-gold/30 ultra-glass-card backdrop-blur-2xl overflow-x-auto relative shadow-lg">
        <div className="luminous-line-gold absolute top-0 left-0 right-0 opacity-50"></div>
        <div className="container flex flex-wrap justify-center sm:justify-between items-center gap-6 opacity-95">
          <div className="flex items-center gap-2.5">
             <ShieldCheck className="text-gold" size={18} />
             <span className="text-[10px] uppercase font-bold tracking-[2.5px] text-warm-white">MahaRERA Certified Township</span>
          </div>
          <div className="flex items-center gap-2.5">
             <Award className="text-gold" size={18} />
             <span className="text-[10px] uppercase font-bold tracking-[2.5px] text-warm-white">35+ Years PSCL Legacy</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 font-serif italic text-xl md:text-2xl text-gilded font-bold">
             Paranjape Schemes
          </div>
          <div className="flex items-center gap-2.5">
             <MapPin className="text-gold" size={18} />
             <span className="text-[10px] uppercase font-bold tracking-[2.5px] text-warm-white">Hinjewadi Phase 1, Pune</span>
          </div>
        </div>
        <div className="luminous-line-gold absolute bottom-0 left-0 right-0 opacity-50"></div>
      </section>

      <div className="container">
        {/* MARKET ANALYSIS SECTION */}
        <MarketAnalysis />

        <div className="section-luxe-divider">
          <span className="section-node-diamond">
            <span>FINANCIAL INTELLIGENCE</span>
          </span>
        </div>

        {/* INVESTMENT MATRIX SECTION */}
        <InvestmentMatrix />

        <div className="section-luxe-divider">
          <span className="section-node-diamond">
            <span>ROI FORECAST ENGINE</span>
          </span>
        </div>

        {/* INTERACTIVE ROI CALCULATOR SECTION */}
        <RoiCalculator initialPrice={12500000} title="Paranjape Blue Ridge" />

        <div className="section-luxe-divider">
          <span className="section-node-diamond">
            <span>TOWNSHIP COMPARISONS</span>
          </span>
        </div>

        {/* COMPARISON MATRIX SECTION */}
        <ComparisonMatrix />

        <div className="section-luxe-divider">
          <span className="section-node-diamond">
            <span>RESIDENTIAL ENCLAVES</span>
          </span>
        </div>

        {/* PROJECT SHOWCASE SECTION */}
        <section aria-labelledby="architecture-title" className="py-16 sm:py-24" id="projects">
          <div className="text-center mb-16 sm:mb-24">
            <span className="gilded-pill mb-3">The Architecture</span>
            <h2 id="architecture-title" className="text-3xl sm:text-4xl md:text-6xl font-serif text-warm-white mt-3 font-bold">
              Residential <span className="italic font-normal text-gilded">Volumes</span>
            </h2>
            <p className="text-xs sm:text-sm text-text-muted mt-3 max-w-xl mx-auto font-medium">
              Three sovereign residential enclaves engineered for walk-to-work IT park proximity and riverside living
            </p>
          </div>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} reverse={i % 2 !== 0} />
          ))}
        </section>

        {/* LIFE BEYOND ORDINARY SECTION WITH PROMINENT HUD FRAME */}
        <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] rounded-2xl sm:rounded-[3.5rem] overflow-hidden my-10 sm:my-20 border border-gold/30 group shadow-2xl hud-frame">
          <Image
            src="/assets/images/real-township-night.jpg"
            alt="Actual night aerial photograph of Paranjape Blue Ridge Township Hinjewadi Phase 1 - Distance to Rajiv Gandhi Infotech Park"
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={blurDataURLs.darkNavy}
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
          <div className="luminous-line-gold absolute top-0 left-0 right-0 opacity-60"></div>
          <div className="absolute bottom-0 left-0 p-6 sm:p-10 md:p-16 z-10">
            <span className="text-gold font-bold tracking-[3px] sm:tracking-[6px] uppercase text-[8px] sm:text-[10px] block mb-2 sm:mb-4 font-mono">Blue Ridge Integrated Township</span>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif text-warm-white leading-tight font-bold">
              Life <span className="italic font-normal text-gilded">Beyond Ordinary</span>
            </h2>
            <p className="text-white/90 mt-2 sm:mt-4 max-w-lg text-sm sm:text-base md:text-lg font-medium leading-relaxed">A self-sufficient ecosystem with golf course, school, boat club, and Pune's finest IT connectivity — all within one sovereign address.</p>
          </div>
        </section>

        {/* TOWNSHIP EXPERIENCE SECTION */}
        <TownshipExperience />

        <div className="section-luxe-divider">
          <span className="section-node-diamond">
            <span>VIRTUAL 4K DRONE TOUR</span>
          </span>
        </div>

        {/* TOWNSHIP VIRTUAL TOUR & 4K DRONE SHOWCASE */}
        <TownshipVirtualTour />

        <div className="section-luxe-divider">
          <span className="section-node-diamond">
            <span>TOPOLOGICAL GIS ENGINE</span>
          </span>
        </div>

        {/* MASTER TOWNSHIP LAYOUT (INTERACTIVE SVG ENGINE) */}
        <InteractiveMasterPlan />

        <div className="section-luxe-divider">
          <span className="section-node-diamond">
            <span>GOOGLE ECOSYSTEM</span>
          </span>
        </div>

        {/* GOOGLE ECOSYSTEM INTEGRATION */}
        <GoogleEcosystem />

        <div className="section-luxe-divider">
          <span className="section-node-diamond">
            <span>DATA INTELLIGENCE</span>
          </span>
        </div>

        {/* MARKET INTELLIGENCE HUB */}
        <IntelligenceHub />

        <div className="section-luxe-divider">
          <span className="section-node-diamond">
            <span>TRANSIT CORRIDORS</span>
          </span>
        </div>

        {/* CONNECTIVITY HUB SECTION */}
        <section aria-labelledby="connectivity-title" className="py-12 sm:py-24">
            <div className="mb-10 sm:mb-20 text-center">
               <span className="gilded-pill mb-3">Infrastructure Hardening</span>
               <h2 id="connectivity-title" className="text-3xl sm:text-4xl md:text-5xl font-serif text-warm-white mt-3 sm:mt-4 font-bold">Micro-Market <span className="italic font-normal text-gilded">Connectivity</span></h2>
            </div>
            <ConnectivityHub />
        </section>

        <div className="section-luxe-divider">
          <span className="section-node-diamond">
            <span>MARKET EDITORIALS</span>
          </span>
        </div>

        {/* BLOG SECTION */}
        <section aria-labelledby="blog-title" className="py-12 sm:py-24">
            <div className="mb-10 sm:mb-20 text-center">
               <span className="gilded-pill mb-3">Thought Leadership</span>
               <h2 id="blog-title" className="text-3xl sm:text-4xl md:text-5xl font-serif text-warm-white mt-3 sm:mt-4 font-bold">The Sovereign <span className="italic font-normal text-gilded">Insights</span></h2>
            </div>
            <BlogSection />
        </section>

        <div className="section-luxe-divider">
          <span className="section-node-diamond">
            <span>DIRECT INVENTORY VAULT</span>
          </span>
        </div>

        {/* ENQUIRY SECTION */}
        <section id="enquiry" className="py-16 sm:py-32">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-20 items-center">
              <div>
                <span className="gilded-pill mb-3">Priority Access</span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-warm-white mt-3 sm:mt-4 leading-tight font-bold">Secure Your <br /><span className="italic text-gilded font-normal">Sovereign Unit</span></h2>
                <p className="text-text-light mt-4 sm:mt-8 text-sm sm:text-lg font-medium leading-relaxed">Direct dispatch to our relationship managers for immediate inventory updates and private site visits.</p>
                <div className="mt-12 space-y-6">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full flex items-center justify-between p-6 ultra-glass-card hover:border-gold/60 transition-all rounded-2xl border border-gold/25 cursor-pointer text-left group shadow-lg"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold border border-gold/25 group-hover:bg-gold group-hover:text-navy transition-all"><Mail size={20} /></div>
                            <div>
                                <span className="block text-[10px] text-text-light uppercase tracking-widest mb-1 font-bold">Priority Enquiries</span>
                                <span className="text-warm-white font-bold group-hover:text-gold transition-colors text-base font-serif">Request Details Now</span>
                            </div>
                        </div>
                        <span className="text-gold font-bold text-lg group-hover:translate-x-2 transition-transform">→</span>
                    </button>
                    <div className="flex items-center gap-6 p-6 ultra-glass-card rounded-2xl border border-gold/25 shadow-lg">
                        <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold border border-gold/25"><MapPin size={20} /></div>
                        <div>
                            <span className="block text-[10px] text-text-light uppercase tracking-widest mb-1 font-bold">Visit Hub</span>
                            <span className="text-warm-white font-bold text-base font-serif">Blue Ridge, Phase 1, Hinjewadi</span>
                        </div>
                    </div>
                </div>
              </div>

              <div className="ultra-glass-card p-6 sm:p-12 rounded-2xl sm:rounded-[3rem] border border-gold/30 shadow-2xl relative overflow-hidden hud-frame">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Image src="/assets/images/blue-ridge-logo.png" width={200} height={80} className="h-20 w-auto" alt="Paranjape Schemes Construction Ltd Projects - Paranjape Blue Ridge Logo" />
                </div>
                <form onSubmit={handleInlineSubmit} className="space-y-6 relative z-10">
                  {/* Honeypot field for bot protection */}
                  <input
                    type="text"
                    name="bot_field"
                    className="hidden"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.bot_field}
                    onChange={(e) => setFormData({ ...formData, bot_field: e.target.value })}
                  />

                  {formError && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-xs font-bold text-center">
                      {formError}
                    </div>
                  )}

                  {formStatus === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-500/10 border border-emerald-500/50 p-8 rounded-2xl text-center space-y-4"
                    >
                      <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                        <Award size={32} />
                      </div>
                      <h3 className="text-emerald-400 font-bold text-xl">Sovereign Protocol Initiated</h3>
                      <p className="text-emerald-500/80 text-sm">Your priority access request has been vaulted securely. Our relationship manager will dispatch the inventory directly to you.</p>
                    </motion.div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] text-gold uppercase font-bold tracking-widest">Full Name</label>
                        <input 
                          type="text" 
                          required
                          maxLength={50}
                          pattern="[a-zA-Z\s]+"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full lux-input rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all text-sm font-medium" 
                          placeholder="Enter your name" 
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-gold uppercase font-bold tracking-widest">Phone</label>
                            <input 
                              type="tel" 
                              required
                              maxLength={15}
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full lux-input rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all text-sm font-medium" 
                              placeholder="+91" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] text-gold uppercase font-bold tracking-widest">Email</label>
                            <input 
                              type="email" 
                              required
                              maxLength={80}
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full lux-input rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all text-sm font-medium" 
                              placeholder="email@example.com" 
                            />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-gold uppercase font-bold tracking-widest">Interested In</label>
                        <select 
                          value={formData.intent}
                          onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
                          className="w-full lux-input rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all appearance-none text-sm font-medium cursor-pointer"
                        >
                            <option value="Promenade Residences">Promenade Residences</option>
                            <option value="The Altius">The Altius</option>
                            <option value="Ridges 41">Ridges 41</option>
                        </select>
                      </div>
                      <button 
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-gradient-to-r from-gold via-gold-light to-gold text-navy py-5 rounded-xl font-bold uppercase text-xs tracking-widest hover:scale-[1.02] transition-all shadow-xl gold-glow disabled:opacity-50 disabled:hover:scale-100 border-none cursor-pointer btn-sheen flex items-center justify-center gap-2"
                      >
                        <span>{formStatus === 'submitting' ? 'Vaulting...' : 'Dispatch to Sovereign Vault'}</span>
                        <span className="text-sm">→</span>
                      </button>
                    </>
                  )}
                </form>
              </div>
           </div>
        </section>
      </div>

      {/* HOMEPAGE FAQ SECTION */}
      <FAQSection />

      <PopularSearches />

      <FooterSEO />
      <footer className="py-20 border-t border-gold/10 bg-[var(--bg)] relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[15rem] font-serif font-black text-gold/[0.03] whitespace-nowrap pointer-events-none uppercase">BLUE RIDGE</div>
        <div className="container grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
            <div className="col-span-1 lg:col-span-1">
                <Image src="/assets/images/paranjape-logo.svg" width={200} height={40} className="h-10 w-auto brightness-0 invert mb-8" alt="Paranjape Schemes Construction Ltd - Top Real Estate Developers in Pune" />
                <p className="text-text-light text-sm">Hinjewadi's first 138-acre integrated township. Paranjape projects in Hinjewadi set global benchmarks in community living with Paranjape real estate Pune legacy.</p>
            </div>
            <div>
                <h4 className="text-gold font-bold uppercase text-[10px] tracking-widest mb-8">Projects</h4>
                <ul className="space-y-4 text-sm text-text-light list-none p-0">
                    <li><Link href="/paranjape-blue-ridge-promenade-hinjewadi-pune" className="hover:text-gold transition-colors">Promenade Residences</Link></li>
                    <li><Link href="/paranjape-blue-ridge-altius-hinjewadi-pune" className="hover:text-gold transition-colors">The Altius</Link></li>
                    <li><Link href="/paranjape-blue-ridge-41-hinjewadi-pune" className="hover:text-gold transition-colors">Ridges 41</Link></li>
                    <li><Link href="/hinjewadi-micro-market" className="hover:text-gold transition-colors">Hinjewadi Micro-Market Guide</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="text-gold font-bold uppercase text-[10px] tracking-widest mb-8">Insights</h4>
                <ul className="space-y-4 text-sm text-text-light list-none p-0">
                    <li><Link href="/insights/why-blue-ridge-hinjewadi-best-investment-2026" className="hover:text-gold transition-colors">Best Investment 2026</Link></li>
                    <li><Link href="/insights/ridges-41-new-benchmark-high-rise-living-hinjewadi" className="hover:text-gold transition-colors">Ridges 41 Analysis</Link></li>
                    <li><Link href="/insights/hinjewadi-metro-line-3-impact-blue-ridge-property" className="hover:text-gold transition-colors">Metro Line 3 Impact</Link></li>
                    <li><Link href="/insights/blue-ridge-public-school-admission-facilities-guide" className="hover:text-gold transition-colors">School Guide</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="text-gold font-bold uppercase text-[10px] tracking-widest mb-8">Legal</h4>
                <ul className="space-y-4 text-[11px] text-text-light list-none p-0">
                    <li>Promenade: P52100055581</li>
                    <li>Altius: P52100078116</li>
                    <li>Ridge 41: P52100000054</li>
                    <li className="text-gilded font-bold">MahaRERA Registered</li>
                </ul>
            </div>
        </div>
      </footer>

      {/* LEGAL DISCLAIMER */}
      <section className="bg-[var(--bg)] text-center py-6 border-t border-gold/10">
        <div className="container">
          <p className="text-[10px] text-text-light/50 max-w-4xl mx-auto leading-relaxed">
            Disclaimer: The images, layout plans, and specifications shown are for representation purposes only. 
            All details should be verified with the official MahaRERA website or the sales team before making a purchase decision. 
            This website belongs to an authorized marketing partner and does not constitute an official offer from Paranjape Schemes.
            <br className="my-1"/>
            &copy; {new Date().getFullYear()} Paranjape Blue Ridge. All Rights Reserved.
          </p>
        </div>
      </section>

    </main>
  );
}

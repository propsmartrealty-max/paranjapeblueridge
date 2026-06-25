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
import { Mail, MapPin, ShieldCheck, Award } from 'lucide-react';
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

export default function HomePageClient() {
  const { t } = useLanguage();
  const hasMounted = useHasMounted();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
      const existingLeads = JSON.parse(localStorage.getItem('ks_leads') || '[]');
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

  if (!hasMounted) return <div className="bg-[var(--bg)] h-screen w-full"></div>;

  return (
    <main 
      style={{ backgroundColor: 'var(--bg)' }}
      className="text-text selection:bg-gold selection:text-navy transition-colors duration-1000"
    >
      <Navbar />
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-screen flex items-center overflow-hidden">
        <motion.div style={{ scale: imageScale }} className="absolute inset-0 z-0">
          <Image 
            src={atmosphere === 'night' ? "/assets/images/real-township-night.jpg" : "/assets/images/real-township-day.jpg"} 
            fill
            priority
            placeholder="blur"
            blurDataURL={atmosphere === 'night' ? blurDataURLs.darkNavy : blurDataURLs.lightSkyBlue}
            className="object-cover transition-all duration-1000 opacity-80" 
            alt="Actual photograph of Paranjape Blue Ridge Hinjewadi Phase 1 - 138 Acre Integrated Township Premium Apartments"
            sizes="100vw"
          />
          <div 
            className="absolute inset-0 transition-colors duration-1000" 
            style={{ background: `linear-gradient(to right, var(--bg) 0%, transparent 100%)` }}
          ></div>
        </motion.div>
        
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container relative z-10 pt-20">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 sm:gap-3 text-gold font-bold tracking-[4px] sm:tracking-[8px] uppercase text-[8px] sm:text-[10px] mb-4 sm:mb-8">
              <span className="w-6 sm:w-10 h-[1px] bg-gold"></span>
              {intent === 'investor' 
                ? t('High-Yield Investment Legacy', 'उच्च-उत्पन्न गुंतवणूक वारसा') 
                : t('The 138-Acre Sovereign Legacy', '१३८ एकर सोव्हरेन वारसा')}
            </span>
            <h1 className="text-[2.8rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] font-serif text-warm-white leading-[0.95] sm:leading-[0.9] tracking-tighter mb-6 sm:mb-10">
              <span className="sr-only">Paranjape Blue Ridge Hinjewadi Phase 1 - Premium 2, 3 & 4 BHK Ready Possession Flats</span>
              <span className="block text-[0.85rem] sm:text-[1.2rem] md:text-[1.8rem] font-bold tracking-[0.15em] sm:tracking-[0.3em] uppercase text-gold mb-3 sm:mb-6" style={{ fontFamily: 'var(--font-sans)' }} aria-hidden="true">
                Paranjape Blue Ridge Megatownship
              </span>
              <span className="text-gilded block mb-1 sm:mb-2" aria-hidden="true">
                {intent === 'investor' ? t('Capital', 'कॅपिटल') : t('Zenith of', 'सर्वोच्च')}
              </span>
              <span className="italic font-normal" aria-hidden="true">
                {intent === 'investor' ? t('Appreciation', 'अप्रीशिएशन') : t('Integrated Living', 'इंटिग्रेटेड लिविंग')}
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-text-light max-w-2xl leading-relaxed mb-8 sm:mb-12">
              {t("Welcome to Paranjape Blue Ridge Riverside Township—Pune's most celebrated integrated township. A future-ready ecosystem crafted for the elite IT workforce offering Blue Ridge Premium Homes in Hinjewadi Phase 1.", "परंजपे ब्लू रिजमध्ये आपले स्वागत आहे—पुण्यातील सर्वात प्रसिद्ध इंटिग्रेटेड टाऊनशिप. हिंजवडी फेज १ मधील एलिट आयटी कर्मचाऱ्यांसाठी तयार केलेली भविष्यातील इकोसिस्टम.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              <button 
                onClick={() => document.getElementById('market')?.scrollIntoView({ behavior: 'smooth' })} 
                className="bg-gold text-navy px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold uppercase text-[10px] sm:text-xs tracking-widest hover:scale-105 transition-all shadow-2xl gold-glow text-center border-none cursor-pointer"
              >
                {t('Analyze Market', 'मार्केट विश्लेषण')}
              </button>
              <button 
                onClick={() => document.getElementById('amenities')?.scrollIntoView({ behavior: 'smooth' })} 
                className="bg-white/5 backdrop-blur-xl border border-white/10 text-warm-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold uppercase text-[10px] sm:text-xs tracking-widest hover:bg-white/10 transition-all text-center cursor-pointer"
              >
                {t('Experience Township', 'टाऊनशिप अनुभव')}
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FLASH-INVENTORY SECTION */}
      <InventoryMatrix />

      {/* TRUST SYMBOLS */}
      <section className="py-6 sm:py-10 border-y border-gold/10 bg-[var(--bg)] overflow-x-auto">
        <div className="container flex flex-wrap justify-center sm:justify-between items-center gap-4 sm:gap-3 opacity-60 grayscale group hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 sm:gap-3">
             <ShieldCheck className="text-gold" size={16} />
             <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-[2px] sm:tracking-[3px]">MahaRERA Certified</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
             <Award className="text-gold" size={16} />
             <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-[2px] sm:tracking-[3px]">Best Township 2024</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 font-serif italic text-xl md:text-2xl text-gilded">
             Paranjape Schemes
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
             <MapPin className="text-gold" size={16} />
             <span className="text-[8px] sm:text-[10px] uppercase font-bold tracking-[2px] sm:tracking-[3px]">Hinjewadi Phase 1</span>
          </div>
        </div>
      </section>

      <div className="container">
        {/* MARKET ANALYSIS SECTION */}
        <MarketAnalysis />

        {/* INVESTMENT MATRIX SECTION */}
        <InvestmentMatrix />

        {/* COMPARISON MATRIX SECTION */}
        <ComparisonMatrix />

        {/* PROJECT SHOWCASE SECTION */}
        <section aria-labelledby="architecture-title" className="py-20">
          <div className="text-center mb-16 sm:mb-32">
            <span className="text-gold font-bold tracking-[4px] sm:tracking-[6px] uppercase text-[10px] sm:text-xs">The Architecture</span>
            <h2 id="architecture-title" className="text-3xl sm:text-4xl md:text-6xl font-serif text-warm-white mt-3 sm:mt-4">Residential <span className="italic font-normal text-gilded">Volumes</span></h2>
          </div>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} reverse={i % 2 !== 0} />
          ))}
        </section>

        {/* LIFE BEYOND ORDINARY SECTION */}
        <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] rounded-2xl sm:rounded-[3rem] overflow-hidden my-10 sm:my-20 border border-gold/10 group">
          <Image
            src="/assets/images/real-township-night.jpg"
            alt="Actual night aerial photograph of Paranjape Blue Ridge Township Hinjewadi Phase 1 - Distance to Rajiv Gandhi Infotech Park"
            fill
            sizes="100vw"
            placeholder="blur"
            blurDataURL={blurDataURLs.darkNavy}
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-10 md:p-16">
            <span className="text-gold font-bold tracking-[3px] sm:tracking-[6px] uppercase text-[8px] sm:text-[10px] block mb-2 sm:mb-4">Blue Ridge Integrated Township</span>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif text-warm-white leading-tight">
              Life <span className="italic font-normal text-gilded">Beyond Ordinary</span>
            </h2>
            <p className="text-white/80 mt-2 sm:mt-4 max-w-lg text-sm sm:text-base md:text-lg">A self-sufficient ecosystem with golf course, school, boat club, and Pune's finest IT connectivity — all within one sovereign address.</p>
          </div>
        </section>

        {/* TOWNSHIP EXPERIENCE SECTION */}
        <TownshipExperience />

        {/* MASTER TOWNSHIP LAYOUT */}
        <section id="master-layout" className="py-12 sm:py-24 border-t border-gold/10">
          <div className="text-center mb-8 sm:mb-16">
            <span className="text-gold font-bold tracking-[3px] sm:tracking-[6px] uppercase text-[8px] sm:text-[10px] block mb-2 sm:mb-4">Sovereign Blueprint</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-warm-white">Master <span className="italic font-normal text-gilded">Township Layout</span></h2>
            <p className="text-[var(--text)] mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-4 sm:px-0">
              Every amenity, every cluster, every green corridor — meticulously planned across 138 acres of Hinjewadi's most coveted address.
            </p>
          </div>
          {/* White bg ensures map labels are crisp — no overlay darkening */}
          <div className="rounded-xl sm:rounded-[2rem] overflow-hidden border-2 border-gold/30 shadow-[0_15px_40px_rgba(0,0,0,0.4)] sm:shadow-[0_30px_80px_rgba(0,0,0,0.4)] bg-white">
            <Image
              src="/assets/images/real-master-layout.jpg"
              alt="Official approved Paranjape Blue Ridge Township Master Layout Plan - Premium 2, 3 & 4 BHK Flats in Hinjewadi Phase 1 Pune"
              width={1920}
              height={1080}
              sizes="(max-width: 768px) 100vw, 80vw"
              placeholder="blur"
              blurDataURL={blurDataURLs.lightGray}
              className="w-full h-auto block"
            />
          </div>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-gold text-navy font-bold text-[11px] uppercase tracking-widest rounded-full hover:bg-gold-light transition-all shadow-lg shadow-gold/30 border-none cursor-pointer"
            >
              Request Full Brochure
            </button>
          </div>
        </section>

        {/* GOOGLE ECOSYSTEM INTEGRATION */}
        <GoogleEcosystem />

        {/* MARKET INTELLIGENCE HUB */}
        <IntelligenceHub />

        {/* CONNECTIVITY HUB SECTION */}
        <section aria-labelledby="connectivity-title" className="py-12 sm:py-24">
            <div className="mb-10 sm:mb-20 text-center">
               <span className="text-gold font-bold tracking-[3px] sm:tracking-[6px] uppercase text-[8px] sm:text-[10px]">Infrastructure Hardening</span>
               <h2 id="connectivity-title" className="text-3xl sm:text-4xl md:text-5xl font-serif text-warm-white mt-3 sm:mt-4">Micro-Market <span className="italic font-normal text-gilded">Connectivity</span></h2>
            </div>
            <ConnectivityHub />
        </section>

        {/* BLOG SECTION */}
        <section aria-labelledby="blog-title" className="py-12 sm:py-24 border-t border-gold/10">
            <div className="mb-10 sm:mb-20 text-center">
               <span className="text-gold font-bold tracking-[3px] sm:tracking-[6px] uppercase text-[8px] sm:text-[10px]">Thought Leadership</span>
               <h2 id="blog-title" className="text-3xl sm:text-4xl md:text-5xl font-serif text-warm-white mt-3 sm:mt-4">The Sovereign <span className="italic font-normal text-gilded">Insights</span></h2>
            </div>
            <BlogSection />
        </section>

        {/* ENQUIRY SECTION */}
        <section id="enquiry" className="py-16 sm:py-32">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-20 items-center">
              <div>
                <span className="text-gold font-bold tracking-[3px] sm:tracking-[6px] uppercase text-[9px] sm:text-xs">Priority Access</span>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-warm-white mt-3 sm:mt-4 leading-tight">Secure Your <br /><span className="italic text-gilded font-normal">Sovereign Unit</span></h2>
                <p className="text-text-light mt-4 sm:mt-8 text-sm sm:text-lg">Direct dispatch to our relationship managers for immediate inventory updates and virtual tours.</p>
                <div className="mt-12 space-y-6">
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="w-full flex items-center justify-between p-6 bg-white/5 hover:bg-gold/5 transition-colors rounded-2xl border border-gold/10 cursor-pointer text-left group"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold"><Mail size={20} /></div>
                            <div>
                                <span className="block text-[10px] text-text-light uppercase tracking-widest mb-1">Priority Enquiries</span>
                                <span className="text-warm-white font-bold group-hover:text-gold transition-colors">Request Details Now</span>
                            </div>
                        </div>
                        <span className="text-gold opacity-50">→</span>
                    </button>
                    <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-gold/10">
                        <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold"><MapPin size={20} /></div>
                        <div>
                            <span className="block text-[10px] text-text-light uppercase tracking-widest mb-1">Visit Hub</span>
                            <span className="text-warm-white font-bold">Blue Ridge, Phase 1, Hinjewadi</span>
                        </div>
                    </div>
                </div>
              </div>

              <div className="bg-[var(--bg)] p-6 sm:p-12 rounded-2xl sm:rounded-[3rem] border border-gold/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
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
                          className="w-full bg-white/5 border border-gold/10 rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all" 
                          placeholder="Enter your name" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-gold uppercase font-bold tracking-widest">Phone</label>
                            <input 
                              type="tel" 
                              required
                              maxLength={15}
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full bg-white/5 border border-gold/10 rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all" 
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
                              className="w-full bg-white/5 border border-gold/10 rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all" 
                              placeholder="email@example.com" 
                            />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-gold uppercase font-bold tracking-widest">Interested In</label>
                        <select 
                          value={formData.intent}
                          onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
                          className="w-full bg-white/5 border border-gold/10 rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all appearance-none"
                        >
                            <option value="Promenade Residences">Promenade Residences</option>
                            <option value="The Altius">The Altius</option>
                            <option value="Ridges 41">Ridges 41</option>
                        </select>
                      </div>
                      <button 
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className="w-full bg-gold text-navy py-5 rounded-xl font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl gold-glow disabled:opacity-50 disabled:hover:scale-100 border-none cursor-pointer"
                      >
                        {formStatus === 'submitting' ? 'Vaulting...' : 'Dispatch to Sovereign Vault'}
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

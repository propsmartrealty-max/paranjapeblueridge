"use client";

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import MarketAnalysis from '@/components/MarketAnalysis';
import ComparisonMatrix from '@/components/ComparisonMatrix';
import InvestmentMatrix from '@/components/InvestmentMatrix';
import TownshipExperience from '@/components/TownshipExperience';
import IntelligenceHub from '@/components/IntelligenceHub';
import ConnectivityHub from '@/components/ConnectivityHub';
import BlogSection from '@/components/BlogSection';
import EnquiryModal from '@/components/EnquiryModal';
import PopularSearches from '@/components/PopularSearches';
import { useLanguage } from '@/context/LanguageContext';
import { useAtmosphere } from '@/context/AtmosphereContext';
import { useBuyerIntent } from '@/components/TrackingProvider';
import { useHasMounted } from '@/hooks/useHasMounted';
import { projects } from '@/data/master-data';
import { Mail, MapPin, ShieldCheck, Award } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

import InventoryMatrix from '@/components/InventoryMatrix';

export default function Home() {
  const { t } = useLanguage();
  const hasMounted = useHasMounted();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
            className="object-cover transition-all duration-1000 opacity-80" 
            alt="Paranjape Blue Ridge Hinjewadi Phase 1 - Actual Township View"
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
              <span className="block text-[0.85rem] sm:text-[1.2rem] md:text-[1.8rem] font-bold tracking-[0.15em] sm:tracking-[0.3em] uppercase text-gold mb-3 sm:mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
                Paranjape Blue Ridge Township
              </span>
              <span className="text-gilded block mb-1 sm:mb-2">
                {intent === 'investor' ? t('Capital', 'कॅपिटल') : t('Zenith of', 'सर्वोच्च')}
              </span>
              <span className="italic font-normal">
                {intent === 'investor' ? t('Appreciation', 'अप्रीशिएशन') : t('Integrated Living', 'इंटिग्रेटेड लिविंग')}
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-text-light max-w-2xl leading-relaxed mb-8 sm:mb-12">
              {t("Welcome to Paranjape Blue Ridge—Pune's most celebrated integrated township. A future-ready ecosystem crafted for the elite IT workforce of Hinjewadi Phase 1.", "परंजपे ब्लू रिजमध्ये आपले स्वागत आहे—पुण्यातील सर्वात प्रसिद्ध इंटिग्रेटेड टाऊनशिप. हिंजवडी फेज १ मधील एलिट आयटी कर्मचाऱ्यांसाठी तयार केलेली भविष्यातील इकोसिस्टम.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              <a href="#market" className="bg-gold text-navy px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold uppercase text-[10px] sm:text-xs tracking-widest hover:scale-105 transition-all shadow-2xl gold-glow text-center">
                {t('Analyze Market', 'मार्केट विश्लेषण')}
              </a>
              <a href="#amenities" className="bg-white/5 backdrop-blur-xl border border-white/10 text-warm-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold uppercase text-[10px] sm:text-xs tracking-widest hover:bg-white/10 transition-all text-center">
                {t('Experience Township', 'टाऊनशिप अनुभव')}
              </a>
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
        <div className="py-20">
          <div className="text-center mb-16 sm:mb-32">
            <span className="text-gold font-bold tracking-[4px] sm:tracking-[6px] uppercase text-[10px] sm:text-xs">The Architecture</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif text-warm-white mt-3 sm:mt-4">Residential <span className="italic font-normal text-gilded">Volumes</span></h2>
          </div>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} reverse={i % 2 !== 0} />
          ))}
        </div>

        {/* LIFE BEYOND ORDINARY SECTION */}
        <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] rounded-2xl sm:rounded-[3rem] overflow-hidden my-10 sm:my-20 border border-gold/10 group">
          <img
            src="/assets/images/township-aerial-night.jpg"
            alt="Paranjape Blue Ridge - Life Beyond Ordinary - 138 Acre Integrated Township Aerial View"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-10 md:p-16">
            <span className="text-gold font-bold tracking-[3px] sm:tracking-[6px] uppercase text-[8px] sm:text-[10px] block mb-2 sm:mb-4">138-Acre Integrated Township</span>
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
            <img
              src="/assets/images/master-layout-plan-hq.jpg"
              alt="Paranjape Blue Ridge Master Layout Plan - 138 Acre Integrated Township Hinjewadi Phase 1 Pune"
              className="w-full h-auto block"
            />
          </div>
          <div className="flex justify-center mt-10">
            <a
              href="/#enquiry"
              className="px-10 py-4 bg-gold text-navy font-bold text-[11px] uppercase tracking-widest rounded-full hover:bg-gold-light transition-all shadow-lg shadow-gold/30"
            >
              Request Full Brochure
            </a>
          </div>
        </section>

        {/* MARKET INTELLIGENCE HUB */}
        <IntelligenceHub />

        {/* CONNECTIVITY HUB SECTION */}
        <div className="py-12 sm:py-24">
            <div className="mb-10 sm:mb-20 text-center">
               <span className="text-gold font-bold tracking-[3px] sm:tracking-[6px] uppercase text-[8px] sm:text-[10px]">Infrastructure Hardening</span>
               <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-warm-white mt-3 sm:mt-4">Micro-Market <span className="italic font-normal text-gilded">Connectivity</span></h2>
            </div>
            <ConnectivityHub />
        </div>

        {/* BLOG SECTION */}
        <div className="py-12 sm:py-24 border-t border-gold/10">
            <div className="mb-10 sm:mb-20 text-center">
               <span className="text-gold font-bold tracking-[3px] sm:tracking-[6px] uppercase text-[8px] sm:text-[10px]">Thought Leadership</span>
               <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-warm-white mt-3 sm:mt-4">The Sovereign <span className="italic font-normal text-gilded">Insights</span></h2>
            </div>
            <BlogSection />
        </div>

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
                    <img src="https://www.pscl.in/wp-content/uploads/2025/11/BLUE-RIDGE-LOGO.png" className="h-20" alt="Paranjape Blue Ridge Township Logo" />
                </div>
                <form className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] text-gold uppercase font-bold tracking-widest">Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-gold/10 rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all" placeholder="Enter your name" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] text-gold uppercase font-bold tracking-widest">Phone</label>
                        <input type="tel" className="w-full bg-white/5 border border-gold/10 rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all" placeholder="+91" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-gold uppercase font-bold tracking-widest">Email</label>
                        <input type="email" className="w-full bg-white/5 border border-gold/10 rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all" placeholder="email@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gold uppercase font-bold tracking-widest">Interested In</label>
                    <select className="w-full bg-white/5 border border-gold/10 rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all appearance-none">
                        <option>Promenade Residences</option>
                        <option>The Altius</option>
                        <option>Ridges 41</option>
                    </select>
                  </div>
                  <button className="w-full bg-gold text-navy py-5 rounded-xl font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl gold-glow">
                    Dispatch to Sovereign Vault
                  </button>
                </form>
              </div>
           </div>
        </section>
      </div>

      <footer className="py-20 border-t border-gold/10 bg-[var(--bg)] relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[15rem] font-serif font-black text-gold/[0.03] whitespace-nowrap pointer-events-none uppercase">BLUE RIDGE</div>
        <div className="container grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
            <div className="col-span-2">
                <img src="https://www.pscl.in/wp-content/uploads/2025/09/PARANJAPE-NEW-FINAL-LOGO.svg" className="h-10 brightness-0 invert mb-8" alt="" />
                <p className="text-text-light max-sm">Hinjewadi's first 138-acre integrated township. A Paranjape Schemes legacy setting global benchmarks in community living.</p>
            </div>
            <div>
                <h4 className="text-gold font-bold uppercase text-[10px] tracking-widest mb-8">Navigation</h4>
                <ul className="space-y-4 text-sm text-text-light list-none p-0">
                    <li className="hover:text-gold cursor-pointer transition-colors">Master Analysis</li>
                    <li className="hover:text-gold cursor-pointer transition-colors">Project Portfolio</li>
                    <li className="hover:text-gold cursor-pointer transition-colors">Township Amenities</li>
                    <li className="hover:text-gold cursor-pointer transition-colors">Blogs & Insights</li>
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

      <PopularSearches />
    </main>
  );
}

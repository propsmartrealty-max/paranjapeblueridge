"use client";

import Navbar from '@/components/Navbar';
import ProjectCard from '@/components/ProjectCard';
import MarketAnalysis from '@/components/MarketAnalysis';
import ComparisonMatrix from '@/components/ComparisonMatrix';
import InvestmentMatrix from '@/components/InvestmentMatrix';
import TownshipExperience from '@/components/TownshipExperience';
import FAQSection from '@/components/FAQSection';
import ConnectivityHub from '@/components/ConnectivityHub';
import BlogSection from '@/components/BlogSection';
import { useLanguage } from '@/context/LanguageContext';
import { useHasMounted } from '@/hooks/useHasMounted';
import { projects } from '@/data/master-data';
import { Mail, MapPin, ShieldCheck, Award } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();
  const hasMounted = useHasMounted();

  if (!hasMounted) return <div className="bg-navy h-screen w-full"></div>;

  return (
    <main className="bg-navy text-text selection:bg-gold selection:text-navy">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/assets/images/township-night.png" className="w-full h-full object-cover opacity-40 grayscale-[0.2]" alt="Paranjape Blue Ridge Hinjewadi Phase 1 - 138 Acre Integrated Township Night Panorama" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/60 to-transparent"></div>
        </div>
        
        <div className="container relative z-10 pt-20">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-3 text-gold font-bold tracking-[8px] uppercase text-[10px] mb-8">
              <span className="w-10 h-[1px] bg-gold"></span>
              {t('The 138-Acre Sovereign Legacy', '१३८ एकर सोव्हरेन वारसा')}
            </span>
            <h1 className="text-[7rem] font-serif text-warm-white leading-[0.9] tracking-tighter mb-10">
              {t('Zenith of', 'सर्वोच्च')} <br />
              <span className="italic text-gold font-normal">{t('Integrated Living', 'इंटिग्रेटेड लिविंग')}</span>
            </h1>
            <p className="text-xl text-text-light max-w-2xl leading-relaxed mb-12">
              {t("Welcome to Paranjape Blue Ridge—Pune's most celebrated integrated township. A future-ready ecosystem crafted for the elite IT workforce of Hinjewadi Phase 1.", "परंजपे ब्लू रिजमध्ये आपले स्वागत आहे—पुण्यातील सर्वात प्रसिद्ध इंटिग्रेटेड टाऊनशिप. हिंजवडी फेज १ मधील एलिट आयटी कर्मचाऱ्यांसाठी तयार केलेली भविष्यातील इकोसिस्टम.")}
            </p>
            <div className="flex gap-6">
              <a href="#market" className="bg-gold text-navy px-12 py-5 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-2xl">
                {t('Analyze Market', 'मार्केट विश्लेषण')}
              </a>
              <a href="#amenities" className="bg-white/5 backdrop-blur-xl border border-white/10 text-warm-white px-12 py-5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-all">
                {t('Experience Township', 'टाऊनशिप अनुभव')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SYMBOLS */}
      <section className="py-10 border-y border-white/5 bg-navy-light/30">
        <div className="container flex justify-between items-center opacity-40 grayscale group hover:grayscale-0 transition-all">
          <div className="flex items-center gap-3">
             <ShieldCheck className="text-gold" size={20} />
             <span className="text-[10px] uppercase font-bold tracking-[3px]">MahaRERA Certified</span>
          </div>
          <div className="flex items-center gap-3">
             <Award className="text-gold" size={20} />
             <span className="text-[10px] uppercase font-bold tracking-[3px]">Best Township 2024</span>
          </div>
          <div className="flex items-center gap-3 font-serif italic text-lg text-warm-white">
             Paranjape Schemes
          </div>
          <div className="flex items-center gap-3">
             <MapPin className="text-gold" size={20} />
             <span className="text-[10px] uppercase font-bold tracking-[3px]">Hinjewadi Phase 1</span>
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
          <div className="text-center mb-32">
            <span className="text-gold font-bold tracking-[6px] uppercase text-xs">The Architecture</span>
            <h2 className="text-6xl font-serif text-warm-white mt-4">Residential <span className="italic font-normal text-gold">Volumes</span></h2>
          </div>
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} reverse={i % 2 !== 0} />
          ))}
        </div>

        {/* TOWNSHIP EXPERIENCE SECTION */}
        <TownshipExperience />

        {/* CONNECTIVITY HUB SECTION */}
        <ConnectivityHub />

        {/* FAQ SECTION */}
        <FAQSection />

        {/* BLOG SECTION */}
        <BlogSection />

        {/* ENQUIRY SECTION */}
        <section id="enquiry" className="py-32">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-gold font-bold tracking-[6px] uppercase text-xs">Priority Access</span>
                <h2 className="text-6xl font-serif text-warm-white mt-4 leading-tight">Secure Your <br /><span className="italic text-gold font-normal">Sovereign Unit</span></h2>
                <p className="text-text-light mt-8 text-lg">Direct dispatch to our relationship managers for immediate inventory updates and virtual tours.</p>
                <div className="mt-12 space-y-6">
                    <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold"><Mail size={20} /></div>
                        <div>
                            <span className="block text-[10px] text-text-light uppercase tracking-widest mb-1">Direct Email</span>
                            <span className="text-warm-white font-bold">propsmartrealty@gmail.com</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center text-gold"><MapPin size={20} /></div>
                        <div>
                            <span className="block text-[10px] text-text-light uppercase tracking-widest mb-1">Visit Hub</span>
                            <span className="text-warm-white font-bold">Blue Ridge, Phase 1, Hinjewadi</span>
                        </div>
                    </div>
                </div>
              </div>

              <div className="bg-navy-light p-12 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <img src="https://www.pscl.in/wp-content/uploads/2025/11/BLUE-RIDGE-LOGO.png" className="h-20" alt="Paranjape Blue Ridge Township Logo" />
                </div>
                <form className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] text-gold uppercase font-bold tracking-widest">Full Name</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all" placeholder="Enter your name" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] text-gold uppercase font-bold tracking-widest">Phone</label>
                        <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all" placeholder="+91" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] text-gold uppercase font-bold tracking-widest">Email</label>
                        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all" placeholder="email@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gold uppercase font-bold tracking-widest">Interested In</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-warm-white focus:border-gold outline-none transition-all appearance-none">
                        <option>Promenade Residences</option>
                        <option>The Altius</option>
                        <option>Ridges 41</option>
                    </select>
                  </div>
                  <button className="w-full bg-gradient-to-r from-gold to-gold-light text-navy py-5 rounded-xl font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl">
                    Dispatch to Sovereign Vault
                  </button>
                </form>
              </div>
           </div>
        </section>
      </div>

      <footer className="py-20 border-t border-white/5 bg-navy-light/20 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[15rem] font-serif font-black text-white/[0.02] whitespace-nowrap pointer-events-none">BLUE RIDGE</div>
        <div className="container grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
            <div className="col-span-2">
                <img src="https://www.pscl.in/wp-content/uploads/2025/09/PARANJAPE-NEW-FINAL-LOGO.svg" className="h-10 brightness-0 invert mb-8" alt="" />
                <p className="text-text-light max-w-sm">Hinjewadi's first 138-acre integrated township. A Paranjape Schemes legacy setting global benchmarks in community living.</p>
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
                    <li>Agent: Propsmart Realty</li>
                    <li className="text-gold font-bold">MahaRERA Registered</li>
                </ul>
            </div>
        </div>
      </footer>
    </main>
  );
}

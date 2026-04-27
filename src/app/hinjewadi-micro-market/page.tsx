"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import InvestmentMatrix from '@/components/InvestmentMatrix';
import ConnectivityHub from '@/components/ConnectivityHub';
import { useLanguage } from '@/context/LanguageContext';
import { useHasMounted } from '@/hooks/useHasMounted';
import { Shield, TrendingUp, Users, Building2, TrainFront } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MicroMarketGuide() {
  const { t } = useLanguage();
  const hasMounted = useHasMounted();

  if (!hasMounted) return <div className="bg-navy h-screen"></div>;

  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />
      
      {/* GUIDE HERO */}
      <section className="relative h-[60vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/images/township-night.png" 
            className="w-full h-full object-cover opacity-20 grayscale"
            alt="Hinjewadi Phase 1 IT Hub Overview"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-transparent"></div>
        </div>
        
        <div className="container relative z-10">
          <Breadcrumbs 
            items={[{ label: t('Micro-Market Guide', 'मायक्रो-मार्केट मार्गदर्शक'), href: '/hinjewadi-micro-market' }]} 
          />
          <span className="text-gold font-bold tracking-[8px] uppercase text-[10px] mb-4 block">Authority Intelligence</span>
          <h1 className="text-7xl font-serif text-warm-white mb-6">
            Hinjewadi <span className="italic font-normal text-gold">Phase 1</span>
          </h1>
          <p className="text-xl text-text-light max-w-3xl leading-relaxed">
            {t("Why Hinjewadi Phase 1 remains Pune's #1 destination for IT professionals, investors, and high-net-worth families.", "आयटी व्यावसायिक, गुंतवणूकदार आणि हाय-नेट-वर्थ कुटुंबांसाठी हिंजवडी फेज १ हे पुण्यातील #१ ठिकाण का राहिले आहे.")}
          </p>
        </div>
      </section>

      <div className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
            <div className="bg-navy-light p-10 rounded-[2.5rem] border border-white/5">
                <TrendingUp className="text-gold mb-6" size={32} />
                <h3 className="text-2xl font-serif text-warm-white mb-4">Capital Appreciation</h3>
                <p className="text-sm text-text-light leading-relaxed">Hinjewadi Phase 1 has witnessed a consistent 8-12% annual appreciation due to limited land supply and mature social infrastructure.</p>
            </div>
            <div className="bg-navy-light p-10 rounded-[2.5rem] border border-white/5">
                <Users className="text-gold mb-6" size={32} />
                <h3 className="text-2xl font-serif text-warm-white mb-4">IT Workforce Depth</h3>
                <p className="text-sm text-text-light leading-relaxed">Home to 800+ global giants including Infosys, Wipro, and TCS, employing over 1.5 Lac+ tech professionals.</p>
            </div>
            <div className="bg-navy-light p-10 rounded-[2.5rem] border border-white/5">
                <TrainFront className="text-gold mb-6" size={32} />
                <h3 className="text-2xl font-serif text-warm-white mb-4">Metro Velocity</h3>
                <p className="text-sm text-text-light leading-relaxed">The upcoming Pune Metro Line 3 will connect Hinjewadi to the city center in under 30 minutes, further boosting property values.</p>
            </div>
        </div>

        {/* CONNECTIVITY DATA */}
        <ConnectivityHub />

        {/* CORPORATE MAPPING */}
        <div className="mt-40">
            <InvestmentMatrix />
        </div>

        {/* AREA ANALYSIS ARTICLE */}
        <div className="mt-40 max-w-4xl mx-auto">
            <h2 className="text-5xl font-serif text-warm-white mb-10">The <span className="italic font-normal text-gold">Sovereign Edge</span></h2>
            <div className="prose prose-invert prose-gold max-w-none space-y-8 text-text-light text-lg leading-relaxed">
                <p>Hinjewadi Phase 1 is not just an IT park; it is a self-sufficient ecosystem. Unlike Phase 2 or Phase 3, Phase 1 is home to established multi-specialty hospitals, international schools, and high-street retail zones like Blue Ridge.</p>
                <p>Investors prioritize Phase 1 due to the 'Zero Vacancy' trend among rental properties. With 1.5 Lac+ tech employees, the demand for premium gated communities like Paranjape Blue Ridge remains at an all-time high.</p>
                <div className="p-8 bg-gold/5 border-l-4 border-gold rounded-r-2xl italic">
                    "The combination of the 9-hole golf course at Blue Ridge and the upcoming Metro Station within 800m makes this the most liquid real estate asset in West Pune."
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}

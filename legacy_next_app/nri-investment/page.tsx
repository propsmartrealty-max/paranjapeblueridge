export const runtime = 'edge';

import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import FooterSEO from '@/components/FooterSEO';
import NriCostEstimator from '@/components/NriCostEstimator';
import RoiCalculator from '@/components/RoiCalculator';
import FAQSection from '@/components/FAQSection';
import Link from 'next/link';
import Image from 'next/image';
import { Globe, Shield, DollarSign, FileCheck, ArrowRight, Building, Award, Phone, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'NRI Real Estate Investment in Pune | Paranjape Blue Ridge',
  description: 'The premier NRI property investment destination in Pune. 4.8%-5.2% rental yields in Hinjewadi Phase 1, NRE/NRO repatriation, FEMA compliance, and POA support.',
  alternates: {
    canonical: 'https://paranjapeblueridge.com/nri-investment',
  },
  openGraph: {
    title: 'NRI Real Estate Investment in Pune | Paranjape Blue Ridge',
    description: 'Invest in Pune’s leading 138-acre integrated township. High rental yields, FEMA compliance, and dedicated NRI concierge services.',
    url: 'https://paranjapeblueridge.com/nri-investment',
    images: ['https://paranjapeblueridge.com/assets/images/township-night.png'],
  },
};

const nriFaqs = [
  {
    q: "Can Non-Resident Indians (NRIs) and OCIs purchase property in Paranjape Blue Ridge?",
    a: "Yes. Under General Permission granted by the Reserve Bank of India (RBI) under FEMA regulations, any NRI holding an Indian passport or Overseas Citizen of India (OCI) can purchase unlimited residential and commercial properties in India."
  },
  {
    q: "Do I need to visit India in person to execute the property registration?",
    a: "No. The entire acquisition, agreement signing, and registration can be executed via a registered Special Power of Attorney (POA) attested at the Indian Embassy/Consulate in your country of residence."
  },
  {
    q: "How are rental proceeds and capital gains repatriated outside India?",
    a: "Rental income can be credited directly to your NRO account and remitted abroad under the USD 1 Million Scheme (Form 15CA/15CB). Capital gains from the sale of up to two residential properties can be fully repatriated in foreign currency."
  },
  {
    q: "What rental yield can an NRI expect at Paranjape Blue Ridge Hinjewadi?",
    a: "Properties in Blue Ridge deliver 4.8% to 5.2% gross annual rental yield—more than double Mumbai or Delhi averages—backed by 450,000+ IT professionals working in Hinjewadi Phase 1."
  }
];

export default function NriInvestmentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "NRI Real Estate Investment Desk | Paranjape Blue Ridge",
    "url": "https://paranjapeblueridge.com/nri-investment",
    "description": "Comprehensive investment guide and concierge for Non-Resident Indians investing in Pune real estate.",
    "publisher": {
      "@type": "Organization",
      "name": "Paranjape Schemes (Construction) Ltd.",
      "url": "https://paranjapeblueridge.com"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": nriFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }
  };

  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-navy via-navy-light/40 to-navy">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-7/12 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-wider">
                <Globe size={14} />
                <span>Global Indian Wealth Advisory</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-warm-white leading-tight">
                NRI Real Estate Investment in <span className="italic font-normal text-gilded">Pune West</span>
              </h1>
              <p className="text-text-light text-base sm:text-lg max-w-2xl leading-relaxed">
                Secure high-yielding residential assets in Pune’s premier 138-acre integrated township. Enjoy <strong>4.8%–5.2% rental yields</strong>, complete FEMA/MahaRERA compliance, and seamless Power of Attorney (POA) registration support.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="#calculator"
                  className="px-8 py-4 bg-gold text-navy font-bold rounded-xl uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl"
                >
                  Simulate Yield &amp; Outlay
                </a>
                <a
                  href="https://wa.me/917744009295?text=Hello%20Sovereign%20Desk,%20I%20am%20an%20NRI%20investor%20interested%20in%20Paranjape%20Blue%20Ridge."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/5 hover:bg-gold/10 text-warm-white font-bold rounded-xl uppercase text-xs tracking-widest border border-gold/20 hover:border-gold transition-all flex items-center gap-2"
                >
                  <span>Connect with NRI Concierge</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <div className="lg:w-5/12 w-full">
              <div className="bg-navy-light/90 border border-gold/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                      <Award size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif text-warm-white font-bold">NRI Portfolio Snapshot</h3>
                      <p className="text-xs text-text-muted">Paranjape Blue Ridge Hinjewadi</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">MahaRERA Approved</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-navy/60 rounded-xl border border-gold/10">
                    <span className="block text-2xl font-serif font-bold text-gold">4.8%–5.2%</span>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider">Gross Rental Yield</span>
                  </div>
                  <div className="p-4 bg-navy/60 rounded-xl border border-gold/10">
                    <span className="block text-2xl font-serif font-bold text-gold">12% CAGR</span>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider">Capital Growth</span>
                  </div>
                  <div className="p-4 bg-navy/60 rounded-xl border border-gold/10">
                    <span className="block text-2xl font-serif font-bold text-warm-white">&lt; 15 Days</span>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider">Tenant Vacancy Rate</span>
                  </div>
                  <div className="p-4 bg-navy/60 rounded-xl border border-gold/10">
                    <span className="block text-2xl font-serif font-bold text-warm-white">35+ Years</span>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider">Developer Track Record</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-text-light">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                    <span>NRE / NRO Repatriation Assistance (Form 15CA/15CB)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                    <span>Remote Embassy Power of Attorney (POA) Guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-gold flex-shrink-0" />
                    <span>End-to-End Corporate Tenant Placement Desk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculators Section */}
      <section id="calculator" className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <span className="text-gold font-bold tracking-[4px] uppercase text-xs">Financial Modeling</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-warm-white mt-2">
              NRI Acquisition &amp; <span className="italic font-normal text-gilded">Yield Matrix</span>
            </h2>
          </div>

          <NriCostEstimator />
          <RoiCalculator initialPrice={12500000} title="Paranjape Blue Ridge" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-navy-light/20 border-t border-gold/10">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <span className="text-gold font-bold tracking-[4px] uppercase text-xs">Legal &amp; Regulatory</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-warm-white mt-2">
              NRI Real Estate <span className="italic font-normal text-gilded">Frequently Asked Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            {nriFaqs.map((faq, idx) => (
              <div key={idx} className="p-6 bg-navy-light/60 border border-gold/20 rounded-2xl space-y-2">
                <h3 className="text-lg font-serif font-bold text-warm-white">{faq.q}</h3>
                <p className="text-sm text-text-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterSEO />
    </main>
  );
}

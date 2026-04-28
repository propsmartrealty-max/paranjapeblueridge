"use client";

import React, { useState, useEffect } from 'react';
import { projects } from '@/data/master-data';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Shield, CheckCircle2, MessageCircle } from 'lucide-react';
import EnquiryModal from '@/components/EnquiryModal';

interface PseoLandingPageProps {
  pageData: {
    slug: string;
    title: string;
    intent: string;
    type: string;
  }
}

export default function PseoLandingPage({ pageData }: PseoLandingPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* SEO HERO SECTION */}
      <section className="relative h-[70vh] flex items-end pb-20 overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/images/master-hero-v4.png" 
            className="w-full h-full object-cover opacity-30"
            alt={pageData.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent"></div>
        </div>
        
        <div className="container relative z-10">
          <Breadcrumbs 
            items={[
                { label: 'Real Estate Pune', href: '/' },
                { label: pageData.title, href: `/${pageData.slug}` }
            ]} 
          />
          <div className="flex items-center gap-4 text-gold font-bold tracking-[4px] uppercase text-[10px] mb-6">
            <Shield size={14} />
            Exclusive Premium Inventory
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-warm-white mb-6 capitalize leading-tight">
            {pageData.intent}
          </h1>
          <p className="text-xl text-text-light max-w-2xl leading-relaxed">
            Discover the finest {pageData.type.toLowerCase()}s tailored to your lifestyle. 
            Experience unparalleled luxury at Paranjape Blue Ridge, the most successful integrated township.
          </p>
        </div>
      </section>

      {/* RELEVANT PROJECTS GRID */}
      <section className="py-24 container">
        <div className="mb-16 text-center">
            <h2 className="text-4xl font-serif text-warm-white mb-4">
                Available <span className="italic font-normal text-gold">Projects</span>
            </h2>
            <p className="text-text-light">Select from our premium clusters offering {pageData.title.toLowerCase()}.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {projects.map((project, i) => (
                <div key={i} className="bg-navy-light rounded-[2.5rem] border border-white/5 p-8 group hover:border-gold/30 transition-all flex flex-col h-full">
                    <div className="mb-6 flex-grow">
                        <h3 className="text-2xl font-serif text-warm-white mb-2">{project.name}</h3>
                        <p className="text-gold text-[10px] uppercase tracking-widest font-bold mb-4">{project.tagline}</p>
                        <p className="text-sm text-text-light line-clamp-3">{project.description}</p>
                    </div>
                    <div className="border-t border-white/5 pt-6 mt-auto">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <span className="block text-[8px] text-text-light uppercase tracking-widest mb-1">Starting Price</span>
                                <span className="text-warm-white font-bold">{project.price}</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-[8px] text-text-light uppercase tracking-widest mb-1">Possession</span>
                                <span className="text-gold font-bold">{project.possession}</span>
                            </div>
                        </div>
                        <a href={`/${project.slug}`} className="block text-center bg-white/5 hover:bg-gold hover:text-navy text-warm-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors w-full border border-white/10 group-hover:border-gold/50">
                            View Details
                        </a>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* WHY CHOOSE US - SEO CONTENT REINFORCEMENT */}
      <section className="py-24 bg-navy-light border-y border-white/5">
        <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif text-warm-white mb-8">
                Why Invest in {pageData.title}?
            </h2>
            <p className="text-text-light leading-relaxed mb-12">
                Paranjape Blue Ridge stands as a landmark of modern urban planning. When searching for {pageData.intent.toLowerCase()}, 
                this 138-acre township offers an unparalleled ecosystem. From proximity to major IT hubs to a private 9-hole golf course 
                and river-facing promenades, every aspect of {pageData.type.toLowerCase()} living is elevated to global standards.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
                {['High Rental Yield', 'Walk to Work', 'Premium Amenities', 'Capital Appreciation'].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 bg-navy p-4 rounded-xl border border-white/5">
                        <CheckCircle2 size={16} className="text-gold shrink-0" />
                        <span className="text-xs text-warm-white font-bold uppercase tracking-widest">{benefit}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-gold py-20">
         <div className="container flex flex-col md:flex-row justify-between items-center gap-10 text-navy">
            <div>
                <h2 className="text-5xl font-serif mb-4">Secure your <span className="italic font-normal">Sovereign Unit</span></h2>
                <p className="font-bold uppercase text-[10px] tracking-[4px]">Request Private Site Visit to Blue Ridge</p>
            </div>
            <div className="flex gap-4">
                <a 
                  href="https://wa.me/917744009295?text=Interested%20in%20Paranjape%20Blue%20Ridge" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 bg-emerald-500 text-white px-10 py-5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
                >
                  <MessageCircle size={18} />
                  WhatsApp Enquiry
                </a>
            </div>
         </div>
      </section>
    </main>
  );
}

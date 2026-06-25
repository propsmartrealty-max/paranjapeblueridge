"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { projects } from '@/data/master-data';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle2, Shield, Calendar, Maximize, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import BlueprintExplorer from '@/components/BlueprintExplorer';
import InteractiveFloorPlans from '@/components/InteractiveFloorPlans';
import EnquiryModalAutoPopup from '@/components/EnquiryModalAutoPopup';
import EnquiryModal from '@/components/EnquiryModal';
import DynamicFreshness from '@/components/DynamicFreshness';

interface SlugPageClientProps {
  slug: string;
}

export default function SlugPageClient({ slug }: SlugPageClientProps) {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const project = projects.find(p => p.slug === slug);

  if (!project) return <div>Project not found</div>;

  return (
    <main className="min-h-screen bg-navy text-text pt-32 pb-20 selection:bg-gold/30 selection:text-gold">
      <Navbar />
      <EnquiryModalAutoPopup />
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="mb-8">
          <DynamicFreshness slug={slug} />
        </div>

        {/* PROJECT HERO */}
        <section className="relative h-[70vh] flex items-end pb-20 overflow-hidden mb-20 rounded-[2rem]">
          <div className="absolute inset-0 z-0">
            <Image 
              src={project.id === 'promenade' ? '/assets/images/real-township-day.jpg' : 
                   project.id === 'altius' ? '/assets/images/real-altius-view.jpg' : 
                   '/assets/images/real-township-day-2.jpg'} 
              fill
              priority
              className="object-cover opacity-30 grayscale-[0.3]"
              alt={`Actual view of Paranjape Blue Ridge ${project.name} - Premium ${project.configurations.map(c => c.numberOfRooms + ' BHK').join(', ')} Flats in Hinjewadi Phase 1 Pune`}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent"></div>
          </div>
          
          <div className="container relative z-10">
            <Breadcrumbs 
              items={[
                  { label: t('Projects', 'प्रोजेक्ट्स'), href: '/#projects' },
                  { label: project.name, href: `/${project.slug}` }
              ]} 
            />
            <div className="flex items-center gap-4 text-gold font-bold tracking-[4px] uppercase text-[10px] mb-6">
              <Shield size={14} />
              {t('Official Sovereign Node', 'अधिकृत सोव्हरेन नोड')}
            </div>
            <h1 className="text-7xl font-serif text-warm-white mb-6">{project.name}</h1>
            <p className="text-xl text-text-light max-w-2xl leading-relaxed">
              {t(project.description, project.descriptionMr)}
            </p>
          </div>
        </section>

        {/* QUICK STATS */}
        <section aria-label="Project Highlights" className="py-12 border-y border-white/5 bg-navy-light/20 mb-20">
          <div className="container grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex items-center gap-4">
                  <Maximize className="text-gold" size={24} />
                  <div>
                      <span className="block text-[8px] text-text-light uppercase tracking-widest">{t('Carpet Area', 'कार्पेट एरिया')}</span>
                      <span className="text-warm-white font-bold">{project.carpetArea}</span>
                  </div>
              </div>
              <div className="flex items-center gap-4">
                  <Calendar className="text-gold" size={24} />
                  <div>
                      <span className="block text-[8px] text-text-light uppercase tracking-widest">{t('Possession', 'ताबा')}</span>
                      <span className="text-warm-white font-bold">{project.possession}</span>
                  </div>
              </div>
              <div className="flex items-center gap-4">
                  <MapPin className="text-gold" size={24} />
                  <div>
                      <span className="block text-[8px] text-text-light uppercase tracking-widest">{t('Location', 'स्थान')}</span>
                      <span className="text-warm-white font-bold">Hinjewadi Phase 1</span>
                  </div>
              </div>
              <div className="flex items-center gap-4">
                  <div className="px-6 py-3 bg-gold/10 border border-gold/30 rounded-xl">
                      <span className="text-gold font-bold text-sm">{project.price}</span>
                  </div>
              </div>
          </div>
        </section>

        {/* HERO HEADER */}
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* SPECIFICATIONS */}
            <section aria-labelledby="specifications-title">
                <h2 id="specifications-title" className="text-4xl font-serif text-warm-white mb-12">{t('Technical', 'तांत्रिक')} <span className="italic font-normal text-gold">{t('Tectonics', 'टेक्टोनिक्स')}</span></h2>
                <div className="space-y-10">
                    {project.specs.map((spec, i) => (
                        <div key={i}>
                            <h4 className="text-gold font-bold uppercase text-[10px] tracking-widest mb-6">{spec.title}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {spec.items.map((item, j) => (
                                    <div key={j} className="flex items-start gap-3 text-sm text-text-light">
                                        <CheckCircle2 size={16} className="text-gold mt-1 shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* BLUEPRINT EXPLORER */}
            <section aria-labelledby="blueprint-title" className="bg-navy-light p-10 rounded-[3rem] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Image src="/assets/images/blue-ridge-logo.png" width={200} height={80} className="h-20 w-auto" alt="Paranjape Blue Ridge Official Identity" />
                </div>
                <h3 id="blueprint-title" className="text-3xl font-serif text-warm-white mb-8">{t('Unit Plan', 'युनिट प्लॅन')} <span className="italic font-normal text-gold">{t('Intelligence', 'इंटेलिजन्स')}</span></h3>
                <p className="text-text-light mb-10 text-sm">{t('Interactive architectural layouts featuring high-resMiVAN construction blueprints.', 'उच्च-रिझोल्यूशन मिवान बांधकाम ब्ल्यूप्रिंट्स वैशिष्ट्यीकृत परस्पर संवादात्मक आर्किटेक्चरल लेआउट.')}</p>
                <div className="bg-navy rounded-3xl p-4 border border-white/5">
                   <BlueprintExplorer projectId={project.id} projectName={project.name} />
                </div>
            </section>
        </article>

        {/* AMENITIES */}
        <section aria-labelledby="amenities-title" className="mt-32">
            <h2 id="amenities-title" className="text-4xl font-serif text-warm-white mb-16 text-center">{t('Exclusive', 'एक्सक्लुझिव्ह')} <span className="italic font-normal text-gold">{t('Social Infrastructure', 'सोशल इन्फ्रास्ट्रक्चर')}</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {project.amenities.map((amenity, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl text-center group"
                    >
                        <div className="text-gold font-bold text-[10px] uppercase tracking-tighter group-hover:text-warm-white transition-colors">
                            {amenity}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* INTERACTIVE ARCHITECTURAL FLOOR PLANS */}
        <section aria-label="Interactive Floor Plans" className="mt-32">
            <InteractiveFloorPlans />
        </section>
      </div>

      {/* FOOTER CTA */}
      <section aria-label="Book a Site Visit" className="bg-gold py-20">
         <div className="container flex flex-col md:flex-row justify-between items-center gap-10 text-navy">
            <div>
                <h2 className="text-5xl font-serif mb-4">Secure your <span className="italic font-normal">Sovereign Unit</span></h2>
                <p className="font-bold uppercase text-[10px] tracking-[4px]">Request Private Site Visit to {project.name}</p>
            </div>
            <div className="flex gap-4">
                <a 
                  href="https://wa.me/917744009295?text=Hello%2C%0A%0AI%20am%20interested%20in%20*Paranjape%20Blue%20Ridge%20Township*%2C%20Hinjewadi%20Phase%201%2C%20Pune.%0A%0APlease%20share%20the%20following%3A%0A%E2%9C%85%20Available%20inventory%20%26%20floor%20plans%0A%E2%9C%85%20Updated%20price%20list%0A%E2%9C%85%20Site%20visit%20schedule%0A%0AKindly%20call%20me%20back%20at%20your%20earliest%20convenience.%0A%0AThank%20you."
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 bg-emerald-500 text-white px-10 py-5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
                >
                  <MessageCircle size={18} />
                  WhatsApp Enquiry
                </a>
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="bg-navy/10 border-2 border-navy text-navy px-10 py-5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-navy hover:text-warm-white transition-all cursor-pointer"
                >
                    {t('Download Brochure', 'माहितीपत्रक डाउनलोड करा')}
                </button>
            </div>
         </div>
      </section>
    </main>
  );
}

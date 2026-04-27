"use client";

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import { projects } from '@/data/master-data';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';
import { useHasMounted } from '@/hooks/useHasMounted';
import { CheckCircle2, Shield, Phone, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ConfigPage() {
  const { slug, config } = useParams();
  const { t } = useLanguage();
  const hasMounted = useHasMounted();
  
  const project = projects.find(p => p.slug === slug);
  if (!project) return notFound();

  const configuration = project.configurations?.find(c => c.slug === config);
  if (!configuration) return notFound();

  if (!hasMounted) return <div className="bg-navy h-screen"></div>;

  return (
    <main className="min-h-screen bg-navy text-text">
      <Navbar />
      
      {/* CONFIG HERO */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-navy-light/30">
        <div className="container relative z-10">
          <Breadcrumbs 
            items={[
                { label: t('Projects', 'प्रोजेक्ट्स'), href: '/#projects' },
                { label: project.name, href: `/${project.slug}` },
                { label: configuration.title, href: `/${project.slug}/${configuration.slug}` }
            ]} 
          />
          <div className="flex items-center gap-4 text-gold font-bold tracking-[4px] uppercase text-[10px] mb-6">
            <Shield size={14} />
            {t('Official Configuration Data', 'अधिकृत कॉन्फिगरेशन डेटा')}
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-warm-white mb-6">
            {configuration.title} in <span className="italic font-normal text-gold">{project.name}</span>
          </h1>
          <p className="text-xl text-text-light max-w-2xl leading-relaxed">
            Detailed architectural layouts, pricing, and availability for the premium {configuration.title} at Paranjape Blue Ridge, Hinjewadi Phase 1.
          </p>
        </div>
      </section>

      <div className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* BLUEPRINT DISPLAY */}
            <div className="bg-navy-light p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative z-10">
                    <span className="text-gold font-bold text-[10px] uppercase tracking-widest">{configuration.title}</span>
                    <h3 className="text-2xl font-serif text-warm-white mt-2 mb-8">Official Layout Blueprint</h3>
                    <div className="bg-white/5 rounded-3xl p-6 border border-white/10 flex items-center justify-center min-h-[400px]">
                        <motion.img 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            src={configuration.slug.includes('3') ? '/assets/images/unit-plan-3bhk.png' : '/assets/images/master-plan.png'} 
                            alt={`${configuration.title} Blueprint Paranjape Blue Ridge ${project.name}`}
                            className="max-w-full object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>

            {/* DETAILS & CTA */}
            <div className="flex flex-col gap-10">
                <div>
                    <h2 className="text-3xl font-serif text-warm-white mb-8">Configuration <span className="italic font-normal text-gold">Details</span></h2>
                    <p className="text-text-light leading-relaxed mb-8">
                        Experience uncompromised luxury with our {configuration.title}. Designed using advanced MiVAN technology, these residences offer optimal space utilization, natural cross-ventilation, and stunning views of the Hinjewadi skyline.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                            <span className="block text-[10px] text-text-light uppercase tracking-widest mb-2">Base Price</span>
                            <span className="text-xl font-bold text-gold">{project.price}</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                            <span className="block text-[10px] text-text-light uppercase tracking-widest mb-2">Carpet Area</span>
                            <span className="text-xl font-bold text-gold">{project.carpetArea}</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 border-t border-white/10 pt-10">
                    <h4 className="text-warm-white font-bold text-sm uppercase tracking-widest mb-6">Included Amenities</h4>
                    {project.amenities.slice(0, 4).map((amenity, i) => (
                        <div key={i} className="flex items-center gap-3 text-text-light">
                            <CheckCircle2 size={18} className="text-gold shrink-0" />
                            <span>{amenity}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <a href="tel:+919672559666" className="flex items-center justify-center gap-3 bg-gold text-navy px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform">
                        <Phone size={16} />
                        Enquire Now
                    </a>
                    <a href="/#enquiry" className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-warm-white px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-colors">
                        <Download size={16} />
                        Download Floor Plan
                    </a>
                </div>
            </div>

        </div>
      </div>
    </main>
  );
}

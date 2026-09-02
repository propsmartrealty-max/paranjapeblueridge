"use client";

import React from 'react';
import { projects } from '@/data/master-data';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';
import { useHasMounted } from '@/hooks/useHasMounted';
import { CheckCircle2, Shield, Download, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import EnquiryModal from '@/components/EnquiryModal';

interface Props {
  project: any;
  config: any;
}

export default function ConfigPageClient({ project, config: configuration }: Props) {
  const { t } = useLanguage();
  const hasMounted = useHasMounted();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (!project || !configuration) return null;

  return (
    <div className="text-text">
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialInterest={`${project.name} - ${configuration.title}`} />
      
      {/* CONFIG HERO */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-navy-light/30">
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs 
            items={[
              { label: t('Projects', 'प्रोजेक्ट्स'), href: '/#projects' },
              { label: project.name, href: `/${project.slug}` },
              { label: configuration.title, href: `/${project.slug}/${configuration.slug}` }
            ]} 
          />
          <div className="flex items-center gap-4 text-gold font-bold tracking-[4px] uppercase text-[10px] mb-6 mt-6">
            <Shield size={14} />
            {t('Official Configuration Data', 'अधिकृत कॉन्फिगरेशन डेटा')}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-warm-white mb-6 font-bold">
            {configuration.title} in <span className="italic font-normal text-gold">{project.name}</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
            Detailed architectural layouts, pricing, and availability for the premium {configuration.title} at Paranjape Blue Ridge, Hinjewadi Phase 1.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* BLUEPRINT DISPLAY */}
          <div className="ultra-glass-card p-8 rounded-3xl border border-gold/20 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <span className="text-gold font-mono font-bold text-[10px] uppercase tracking-widest">{configuration.title}</span>
              <h3 className="text-2xl font-serif text-warm-white mt-2 mb-6 font-bold">Official Layout Blueprint</h3>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex items-center justify-center min-h-[350px]">
                <img 
                  src={configuration.slug.includes('3') ? '/assets/images/unit-plan-3bhk.png' : '/assets/images/master-plan.png'} 
                  alt={`${configuration.title} Blueprint Paranjape Blue Ridge ${project.name}`}
                  className="max-w-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* DETAILS & CTA */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-serif text-warm-white mb-6 font-bold">Configuration <span className="italic font-normal text-gold">Details</span></h2>
              <p className="text-text-muted leading-relaxed mb-6">
                Experience uncompromised luxury with our {configuration.title}. Designed using advanced MiVAN technology, these residences offer optimal space utilization, natural cross-ventilation, and stunning views of the Hinjewadi skyline.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                  <span className="block text-[10px] text-text-muted uppercase tracking-widest mb-1 font-mono">Base Price</span>
                  <span className="text-xl font-bold text-gold font-mono">{configuration.price || project.price}</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                  <span className="block text-[10px] text-text-muted uppercase tracking-widest mb-1 font-mono">Carpet Area</span>
                  <span className="text-xl font-bold text-gold font-mono">{configuration.carpetArea || project.carpetArea}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-6">
              <h4 className="text-warm-white font-bold text-xs uppercase tracking-widest font-mono">Included Amenities</h4>
              {project.amenities?.slice(0, 4).map((amenity: string, i: number) => (
                <div key={i} className="flex items-center gap-3 text-text-muted text-sm">
                  <CheckCircle2 size={16} className="text-gold shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="https://wa.me/917744009295?text=Hello%2C%20I%20am%20interested%20in%20Paranjape%20Blue%20Ridge%20Township."
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-6 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-emerald-600 transition-all shadow-xl no-underline"
              >
                <MessageCircle size={16} />
                WhatsApp Enquiry
              </a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 bg-gold text-navy px-6 py-3.5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-gold-light transition-all font-sans cursor-pointer border-none"
              >
                <Download size={16} />
                Download Floor Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

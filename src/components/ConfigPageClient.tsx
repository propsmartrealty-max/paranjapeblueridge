"use client";

import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle2, ShieldCheck, Download, MessageCircle } from 'lucide-react';
import EnquiryModal from '@/components/EnquiryModal';

interface Props {
  project: any;
  config: any;
}

export default function ConfigPageClient({ project, config: configuration }: Props) {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  if (!project || !configuration) return null;

  return (
    <div className="bg-[#FAF9F6] text-[#070D1A] selection:bg-[#B88E3E] selection:text-white min-h-screen">
      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialInterest={`${project.name} - ${configuration.title}`} 
      />
      
      {/* CONFIG HERO */}
      <section className="relative pt-28 pb-16 overflow-hidden bg-gradient-to-b from-[#F3F5F8] to-[#FAF9F6] border-b border-slate-200 arch-section-divider">
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <Breadcrumbs 
            items={[
              { label: t('Projects', 'प्रोजेक्ट्स'), href: '/#projects' },
              { label: project.name, href: `/${project.slug}` },
              { label: configuration.title, href: `/${project.slug}/${configuration.slug}` }
            ]} 
          />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#8F6A24] font-mono font-bold tracking-[0.2em] uppercase text-[10px] mb-4 mt-6 shadow-xs">
            <ShieldCheck size={14} className="text-[#B88E3E]" />
            <span>{t('Official Configuration Data', 'अधिकृत कॉन्फिगरेशन डेटा')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-[#070D1A] mb-4 font-normal leading-tight">
            {configuration.title} in <span className="italic font-light text-gradient-champagne">{project.name}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-sans">
            Detailed architectural layouts, pricing, and availability for the premium {configuration.title} at Paranjape Blue Ridge, Hinjewadi Phase 1.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* BLUEPRINT DISPLAY */}
          <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-slate-200 shadow-md relative overflow-hidden group">
            <span className="text-[#8F6A24] font-mono font-bold text-[10px] uppercase tracking-widest block mb-1">
              {configuration.title}
            </span>
            <h2 className="text-2xl font-serif text-[#070D1A] mb-6 font-bold">
              Official Layout Blueprint
            </h2>
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex items-center justify-center min-h-[350px]">
              <img 
                src={configuration.image || (configuration.slug.includes('3') ? '/assets/images/unit-plan-3bhk.png' : '/assets/images/floor-plan-4bhk.png')} 
                alt={`${configuration.title} Blueprint Paranjape Blue Ridge ${project.name}`}
                className="max-h-[360px] max-w-full object-contain"
              />
            </div>
            <div className="mt-4 text-center text-xs font-mono text-slate-500">
              * Dimensions and room layout compliant with approved MahaRERA plans.
            </div>
          </div>

          {/* DETAILS & CTA */}
          <div className="lg:col-span-6 flex flex-col gap-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md">
            <div>
              <h2 className="text-3xl font-serif text-[#070D1A] mb-4 font-normal">
                Configuration <span className="italic font-light text-gradient-champagne">Details</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm font-sans mb-6">
                Experience uncompromised luxury with the {configuration.title}. Engineered using advanced monolithic MiVAN formwork, these residences offer optimal space utilization, natural cross-ventilation, and panoramic views of the Blue Ridge township.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-mono font-semibold">Offering Price</span>
                  <span className="text-xl font-bold text-[#B88E3E] font-mono">{configuration.price || project.price}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-mono font-semibold">Carpet Area</span>
                  <span className="text-xl font-bold text-[#070D1A] font-mono">{configuration.carpetArea || project.carpetArea}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t border-slate-200 pt-6">
              <h3 className="text-[#070D1A] font-bold text-xs uppercase tracking-widest font-mono">
                Key Residence Specifications
              </h3>
              {project.amenities?.slice(0, 4).map((amenity: string, i: number) => (
                <div key={i} className="flex items-center gap-3 text-slate-600 text-sm font-sans">
                  <CheckCircle2 size={16} className="text-[#B88E3E] shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex-1 btn-champagne flex items-center justify-center gap-2 py-4 rounded-xl font-bold uppercase text-xs tracking-wider cursor-pointer border-none shadow-sm"
              >
                <Download size={15} />
                <span>Download Floor Plan PDF</span>
              </button>
              <a 
                href={`https://wa.me/917744009295?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(configuration.title)}%20at%20${encodeURIComponent(project.name)}.`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-xl font-bold uppercase text-xs tracking-wider transition-all shadow-sm no-underline"
              >
                <MessageCircle size={15} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

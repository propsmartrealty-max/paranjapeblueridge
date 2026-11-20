"use client";

import React, { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { 
  ShieldCheck, 
  CheckCircle2, 
  MessageCircle, 
  Star, 
  ArrowRight, 
  Building2, 
  Calendar, 
  Layers, 
  FileText, 
  PhoneCall, 
  ExternalLink,
  Download,
  Sparkles,
  MapPin,
  Check
} from 'lucide-react';
import { projects } from '@/data/master-data';
import FAQSection from '@/components/FAQSection';
import ProximityMatrix from '@/components/ProximityMatrix';
import RoiCalculator from '@/components/RoiCalculator';
import CompetitorComparison from '@/components/CompetitorComparison';
import RelatedSearchesMesh from '@/components/RelatedSearchesMesh';
import DynamicContentBlock from '@/components/DynamicContentBlock';
import InteractiveFloorPlans from '@/components/InteractiveFloorPlans';
import ParanjapeLegacySection from '@/components/ParanjapeLegacySection';
import EnquiryModal from '@/components/EnquiryModal';

interface PseoProps {
  pageData?: {
    slug: string;
    title: string;
    intent: string;
    type: string;
    silo: string;
    description?: string;
  };
  data?: any;
}

export default function PseoLandingPage({ pageData, data }: PseoProps) {
  const current = pageData || data;
  if (!current) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInterest, setModalInterest] = useState('');

  const handleOpenModal = (interest: string) => {
    setModalInterest(interest);
    setIsModalOpen(true);
  };

  const getBenefits = (silo: string) => {
    switch(silo) {
      case 'nri':
        return ['FEMA & RBI Compliant Investment Framework', 'Remote Purchase & Video-Conferencing Power of Attorney', 'Dedicated Sovereign NRI Desk Support', 'Repatriable NRE/NRO Rental Income Streams'];
      case 'investor':
        return ['High Rental Yield (4.8% - 5.5% vs 2.5% City Avg)', 'Proven 12%+ YoY Capital Appreciation in Hinjewadi Phase 1', 'Premium IT Executive Tenant Profile with Zero Vacancy Risk', 'Zero Maintenance Headaches with Professional Facility Management'];
      case 'corporate':
        return ['True Zero Commute Time — Walk-to-Work Lifestyle', '1.2 KM from Infosys, 1.5 KM from Wipro, 1.8 KM from TCS', 'Premium Work-Life Balance with 9-Hole Golf & River Marina', 'Vibrant Corporate Executive & Expat Community'];
      case 'infrastructure':
      case 'infra-guide':
        return ['Pune Metro Line 3 Station Just 800m From Township Gate', 'Direct Mumbai-Pune Expressway Access (4.5 KM)', 'Mahalunge-Hinjewadi Bridge Connecting Baner & Balewadi in 10 Mins', 'Future-Proof Infrastructure with Captive 220/22KVA Substation'];
      case 'ecosystem':
      case 'luxury-ecosystem':
        return ['Pune\'s First Private Riverfront Boat Club on Mula River', 'Accredited Blue Ridge Public School (ICSE) Inside Township', 'Championship 9-Hole Golf Course & Practice Green', '138-Acre Self-Contained Gated Community with Walk-to-Work SEZ'];
      case 'competitor':
      case 'battleground':
        return ['138-Acre Fully Operational Township vs Standalone Towers', 'Ready Possession Clusters with Thousands of Happy Families', 'Operational ICSE School, Golf Course & Boat Club Inside', 'Direct Hinjewadi Phase 1 Prime Location vs Outlying Marunji/Phase 3'];
      case 'paranjape-schemes':
        return ['35+ Years Developer Track Record Across Maharashtra', '20M+ Sq. Ft. Delivered Across Pune, Mumbai & PCMC', '100% MahaRERA Statutory Compliance on All Projects', 'Over 75,000+ Happy Resident Families in the Paranjape Family'];
      case 'pune-dominance':
        return ['#1 Ranked Integrated Township in West Pune', 'Direct Metro Line 3 Proximity (800m from Entrance Gate)', 'Walk-to-Work IT SEZ Campus Inside the Township Perimeter', 'Unmatched Lifestyle with Mula Riverfront Marina & Golf Course'];
      default:
        return ['High Rental Yield (4.8% - 5.5%) in Hinjewadi Phase 1', 'True Walk-to-Work Proximity to Rajiv Gandhi Infotech Park', '40+ Premium Amenities Including Golf Course & Boat Club', 'Consistent Double-Digit Long-Term Capital Appreciation'];
    }
  };

  const benefits = getBenefits(current.silo || '');

  // Detect configuration search intent to smartly highlight matching inventory
  const queryStr = `${current.slug || ''} ${current.title || ''} ${current.type || ''} ${current.silo || ''}`.toLowerCase();
  const is2BHK = queryStr.includes('2-bhk') || queryStr.includes('2 bhk') || current.type === '2 BHK';
  const is3BHK = queryStr.includes('3-bhk') || queryStr.includes('3 bhk') || current.type === '3 BHK';
  const is4BHK = queryStr.includes('4-bhk') || queryStr.includes('4 bhk') || queryStr.includes('5-bhk') || current.type === '4 BHK' || current.type === '5 BHK' || current.type === 'Duplex';

  // Smart cluster sorting based on intent
  const sortedProjects = [...projects].sort((a, b) => {
    if (is2BHK) {
      if (a.id === 'ridge41') return -1;
      if (b.id === 'ridge41') return 1;
    } else if (is4BHK) {
      if (a.id === 'altius') return -1;
      if (b.id === 'altius') return 1;
    } else if (is3BHK) {
      if (a.id === 'promenade') return -1;
      if (b.id === 'promenade') return 1;
    }
    return 0;
  });

  return (
    <div className="bg-[#FAF9F6] text-[#070D1A] selection:bg-[#B88E3E] selection:text-white min-h-screen">
      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialInterest={modalInterest || current.title} 
      />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-center pt-28 sm:pt-32 pb-16 overflow-hidden bg-gradient-to-b from-[#F3F5F8] via-[#FAF9F6] to-[#FAF9F6] border-b border-slate-200 arch-section-divider">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/assets/images/pscl-blue-ridge-aerial-drone.webp" 
            className="w-full h-full object-cover opacity-20 filter brightness-105"
            alt={`Paranjape Blue Ridge Township - ${current.title}`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/80 via-[#FAF9F6]/90 to-[#FAF9F6]"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-6xl">
          <Breadcrumbs 
            items={[
              { label: 'Real Estate Pune', href: '/' },
              { label: current.title, href: `/${current.slug}` }
            ]} 
          />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#8F6A24] font-mono font-bold tracking-[0.2em] uppercase text-[10px] mb-4 mt-4 shadow-xs">
            <ShieldCheck size={14} className="text-[#B88E3E]" />
            <span>Verified Township Inventory • Hinjewadi Phase 1, Pune</span>
          </div>
          
          <h1 id="speakable-title" className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#070D1A] font-normal mb-4 leading-tight">
            <span>
              {current.intent || current.title}
            </span>
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="flex text-[#B88E3E]">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" className="mr-0.5" />)}
            </div>
            <span className="text-xs text-[#8F6A24] font-mono bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-bold">
              100% MahaRERA Registered
            </span>
            <span className="text-xs text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              138-Acre Integrated Township
            </span>
            <span className="text-xs text-emerald-700 font-mono bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold">
              Walk-to-Work IT SEZ Campus
            </span>
          </div>

          <p id="speakable-summary" className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed font-sans font-normal mb-8">
            {current.description || `Discover the finest ${current.type || 'residences'} tailored to your lifestyle at Paranjape Blue Ridge Hinjewadi Phase 1, Pune.`}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => handleOpenModal(`Price List & Floor Plans for ${current.title}`)}
              className="btn-champagne flex items-center gap-2 px-6 py-3.5 rounded-full font-bold uppercase text-xs tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              <Download size={15} />
              <span>Download Cost Sheet & Brochure</span>
            </button>
            <a 
              href="https://wa.me/917744009295?text=Hello%2C%20I%20am%20interested%20in%20Paranjape%20Blue%20Ridge%20Township%20Inventory."
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-full font-bold uppercase text-xs tracking-wider transition-all no-underline shadow-md"
            >
              <MessageCircle size={15} />
              <span>Instant WhatsApp Enquiry</span>
            </a>
            <button
              onClick={() => handleOpenModal(`VIP Site Visit for ${current.title}`)}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-6 py-3.5 rounded-full font-bold uppercase text-xs tracking-wider transition-all shadow-xs"
            >
              <Calendar size={15} />
              <span>Book VIP Site Visit</span>
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED CLUSTER INVENTORY SHOWCASE */}
      <section className="py-16 container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-[#8F6A24] font-mono font-bold tracking-[0.2em] uppercase text-xs mb-2">
              <Sparkles size={14} className="text-[#B88E3E]" />
              <span>Active Flagship Clusters</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#070D1A]">
              Verified Real Estate Inventory in Blue Ridge
            </h2>
          </div>
          <p className="text-xs text-slate-500 max-w-md font-sans">
            Direct developer inventory with zero brokerage, locked-in launch pricing, and complete MahaRERA statutory documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sortedProjects.map((p) => {
            const isMatch = (is2BHK && p.id === 'ridge41') || (is3BHK && p.id === 'promenade') || (is4BHK && p.id === 'altius');
            return (
              <div 
                key={p.id}
                className={`bg-white rounded-3xl border ${isMatch ? 'border-[#B88E3E] ring-2 ring-[#B88E3E]/20 shadow-xl' : 'border-slate-200 shadow-md'} overflow-hidden flex flex-col justify-between group hover:shadow-xl transition-all duration-300`}
              >
                <div>
                  {/* Image banner */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img 
                      src={
                        p.id === 'promenade' ? '/assets/images/promenade-hero.png' :
                        p.id === 'altius' ? '/assets/images/altius-hero.png' :
                        '/assets/images/ridges-hero.png'
                      }
                      alt={`${p.name} at Paranjape Blue Ridge Hinjewadi`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center">
                      <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
                        {p.storeys} Storeys
                      </span>
                      {isMatch ? (
                        <span className="bg-[#B88E3E] text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                          <Check size={12} /> Best Match
                        </span>
                      ) : (
                        <span className="bg-amber-50/90 backdrop-blur-md text-[#8F6A24] text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-amber-200">
                          {p.possession}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                      <h3 className="text-xl font-serif font-bold text-white mb-0.5">
                        {p.name}
                      </h3>
                      <p className="text-xs text-slate-200 font-sans line-clamp-1">
                        {p.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-mono font-medium">Starting Price</span>
                      <span className="text-lg font-serif font-bold text-[#8F6A24]">{p.price}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="block text-slate-400 text-[10px] uppercase font-mono">Carpet Area</span>
                        <span className="font-bold text-slate-700 font-mono">{p.carpetArea}</span>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="block text-slate-400 text-[10px] uppercase font-mono">Configurations</span>
                        <span className="font-bold text-slate-700 font-mono">
                          {p.id === 'ridge41' ? '2 & 3 BHK' : p.id === 'promenade' ? '3 & 4 BHK' : '3, 4 & 5 BHK'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">Cluster USPs:</span>
                      {p.usp.slice(0, 2).map((uspItem, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-sans">
                          <CheckCircle2 size={13} className="text-[#B88E3E] shrink-0 mt-0.5" />
                          <span>{uspItem}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 text-[11px] text-slate-500 font-mono flex items-center justify-between border-t border-slate-100">
                      <span>MahaRERA:</span>
                      <a 
                        href="https://maharera.maharashtra.gov.in" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#8F6A24] hover:underline font-bold inline-flex items-center gap-1"
                      >
                        {p.reraNumber}
                        <ExternalLink size={10} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <a
                    href={`/${p.slug}`}
                    className="w-full btn-champagne flex items-center justify-center gap-2 py-3 rounded-xl font-bold uppercase text-xs tracking-wider no-underline text-center shadow-xs"
                  >
                    <span>View {p.name} Details</span>
                    <ArrowRight size={13} />
                  </a>
                  <button
                    onClick={() => handleOpenModal(`Cost Sheet for ${p.name}`)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
                  >
                    <FileText size={13} />
                    <span>Get All-Inclusive Cost Sheet</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MASTER SPECIFICATIONS & PRICE INVENTORY TABLE (HIGH DENSITY DATA) */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="mb-8">
            <span className="text-[#8F6A24] font-mono font-bold tracking-[0.2em] uppercase text-xs block mb-2">
              Statutory Real Estate Index
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#070D1A]">
              Unit Configurations, Carpet Area & Pricing Matrix (2026 Index)
            </h2>
            <p className="text-sm text-slate-600 mt-2 font-sans">
              Complete breakdown of available configurations across Paranjape Blue Ridge clusters. All carpet areas are strictly certified under MahaRERA guidelines.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
            <table className="min-w-full text-left text-xs text-slate-700 divide-y divide-slate-200">
              <thead className="bg-[#FAF9F6] text-[#070D1A] font-mono uppercase tracking-wider text-[11px] font-bold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-4">Configuration</th>
                  <th className="px-5 py-4">Cluster Name</th>
                  <th className="px-5 py-4">RERA Carpet Area</th>
                  <th className="px-5 py-4">Starting Price</th>
                  <th className="px-5 py-4">Possession Timeline</th>
                  <th className="px-5 py-4">MahaRERA ID</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-sans">
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 font-bold text-[#070D1A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    2 BHK Smart Home
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-600">The Ridges 41</td>
                  <td className="px-5 py-4 font-mono font-semibold text-slate-800">793 Sq. Ft.</td>
                  <td className="px-5 py-4 font-serif font-bold text-[#8F6A24]">₹ 97.60 L*</td>
                  <td className="px-5 py-4 font-mono text-slate-600">Dec 2028</td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">P52100000054</td>
                  <td className="px-5 py-4 text-right">
                    <button 
                      onClick={() => handleOpenModal('2 BHK Smart Home in Ridges 41')}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#8F6A24] font-mono font-bold text-[11px] border border-amber-200 transition-colors"
                    >
                      Enquire
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 font-bold text-[#070D1A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    3 BHK Signature Home
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-600">The Ridges 41</td>
                  <td className="px-5 py-4 font-mono font-semibold text-slate-800">1,180 Sq. Ft.</td>
                  <td className="px-5 py-4 font-serif font-bold text-[#8F6A24]">₹ 1.35 Cr*</td>
                  <td className="px-5 py-4 font-mono text-slate-600">Dec 2028</td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">P52100000054</td>
                  <td className="px-5 py-4 text-right">
                    <button 
                      onClick={() => handleOpenModal('3 BHK Signature Home in Ridges 41')}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#8F6A24] font-mono font-bold text-[11px] border border-amber-200 transition-colors"
                    >
                      Enquire
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 font-bold text-[#070D1A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    3 BHK Luxury Riverfront
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-600">Promenade Residences</td>
                  <td className="px-5 py-4 font-mono font-semibold text-slate-800">1,316 Sq. Ft.</td>
                  <td className="px-5 py-4 font-serif font-bold text-[#8F6A24]">₹ 1.65 Cr*</td>
                  <td className="px-5 py-4 font-mono text-slate-600">Sept 2029</td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">P52100055581</td>
                  <td className="px-5 py-4 text-right">
                    <button 
                      onClick={() => handleOpenModal('3 BHK Luxury Riverfront in Promenade')}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#8F6A24] font-mono font-bold text-[11px] border border-amber-200 transition-colors"
                    >
                      Enquire
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 font-bold text-[#070D1A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    4 BHK Riverfront Signature (Type 1)
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-600">Promenade Residences</td>
                  <td className="px-5 py-4 font-mono font-semibold text-slate-800">1,633 Sq. Ft.</td>
                  <td className="px-5 py-4 font-serif font-bold text-[#8F6A24]">₹ 2.05 Cr*</td>
                  <td className="px-5 py-4 font-mono text-slate-600">Sept 2029</td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">P52100055581</td>
                  <td className="px-5 py-4 text-right">
                    <button 
                      onClick={() => handleOpenModal('4 BHK Type 1 in Promenade')}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#8F6A24] font-mono font-bold text-[11px] border border-amber-200 transition-colors"
                    >
                      Enquire
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 font-bold text-[#070D1A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    4 BHK Riverfront Signature (Type 2)
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-600">Promenade Residences</td>
                  <td className="px-5 py-4 font-mono font-semibold text-slate-800">1,718 Sq. Ft.</td>
                  <td className="px-5 py-4 font-serif font-bold text-[#8F6A24]">₹ 2.15 Cr*</td>
                  <td className="px-5 py-4 font-mono text-slate-600">Sept 2029</td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">P52100055581</td>
                  <td className="px-5 py-4 text-right">
                    <button 
                      onClick={() => handleOpenModal('4 BHK Type 2 in Promenade')}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#8F6A24] font-mono font-bold text-[11px] border border-amber-200 transition-colors"
                    >
                      Enquire
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 font-bold text-[#070D1A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    3 BHK Riverside Sanctuary
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-600">The Altius</td>
                  <td className="px-5 py-4 font-mono font-semibold text-slate-800">1,550 Sq. Ft.</td>
                  <td className="px-5 py-4 font-serif font-bold text-[#8F6A24]">₹ 1.80 Cr*</td>
                  <td className="px-5 py-4 font-mono text-slate-600">Ready / Near Ready</td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">P52100078116</td>
                  <td className="px-5 py-4 text-right">
                    <button 
                      onClick={() => handleOpenModal('3 BHK Riverside in The Altius')}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#8F6A24] font-mono font-bold text-[11px] border border-amber-200 transition-colors"
                    >
                      Enquire
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 font-bold text-[#070D1A] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    4 BHK Royal Fairway Residence
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-600">The Altius</td>
                  <td className="px-5 py-4 font-mono font-semibold text-slate-800">1,858 Sq. Ft.</td>
                  <td className="px-5 py-4 font-serif font-bold text-[#8F6A24]">₹ 2.05 Cr*</td>
                  <td className="px-5 py-4 font-mono text-slate-600">Ready / Near Ready</td>
                  <td className="px-5 py-4 font-mono text-[11px] text-slate-500">P52100078116</td>
                  <td className="px-5 py-4 text-right">
                    <button 
                      onClick={() => handleOpenModal('4 BHK Royal Fairway in The Altius')}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#8F6A24] font-mono font-bold text-[11px] border border-amber-200 transition-colors"
                    >
                      Enquire
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono">
            <span>* Prices are base values and exclude applicable Stamp Duty (6%), Registration, and GST.</span>
            <span>Government portal verification: <a href="https://maharera.maharashtra.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#8F6A24] underline">maharera.maharashtra.gov.in</a></span>
          </div>
        </div>
      </section>

      {/* ARCHITECTURAL FLOOR PLANS & BLUEPRINTS EXPLORER */}
      <section className="py-16 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="text-[#8F6A24] font-mono font-bold tracking-[0.2em] uppercase text-xs block mb-2">
              Architectural Layouts
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#070D1A]">
              Explore Floor Plans & Space Planning
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans">
              Precision-engineered floor layouts designed with MiVAN technology, ensuring maximum carpet area efficiency, natural cross-ventilation, and Vastu alignment.
            </p>
          </div>

          <InteractiveFloorPlans />
        </div>
      </section>

      {/* CORE BENEFITS & TOWNSHIP INFRASTRUCTURE */}
      <section className="py-16 container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
            <h2 className="text-2xl font-serif font-bold text-[#070D1A] mb-6 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Strategic Advantages</span>
              <ShieldCheck size={20} className="text-[#B88E3E]" />
            </h2>
            <div className="space-y-4">
              {benefits.map((b: string, i: number) => (
                <div key={i} className="flex items-start gap-3 text-slate-700 font-sans">
                  <CheckCircle2 size={18} className="text-[#B88E3E] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#070D1A] mb-4 pb-2 border-b border-slate-100">
                138-Acre Integrated Ecosystem
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6 font-sans">
                Paranjape Blue Ridge stands as a 138-acre integrated landmark in Hinjewadi Phase 1. Featuring an operational ICSE school (Blue Ridge Public School), a 9-hole golf course, private riverfront marina boat club, captive 220/22KVA power substation, and walk-to-work Special Economic Zone (SEZ).
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100">
              <a 
                href="https://wa.me/917744009295?text=Hello%2C%20I%20am%20interested%20in%20Paranjape%20Blue%20Ridge%20Township."
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-full font-bold uppercase text-xs tracking-wider transition-all no-underline shadow-sm"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Enquiry</span>
              </a>
              <a 
                href="/hinjewadi-micro-market"
                className="btn-champagne flex items-center gap-2 px-5 py-3 rounded-full font-bold uppercase text-xs tracking-wider no-underline shadow-sm"
              >
                <span>Market Guide &rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* IN-DEPTH SEMANTIC ANALYSIS BLOCK (LONG-FORM UNIQUE DATA FOR GOOGLEBOT) */}
        <div className="mb-16 rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-white">
          <DynamicContentBlock silo={current.silo} title={current.title} />
        </div>

        {/* INTERACTIVE MODULES & MATRIX */}
        <div className="space-y-16">
          <ProximityMatrix />
          <RoiCalculator />
          <CompetitorComparison 
            defaultCompetitorId={
              current.slug?.includes('life-republic') ? 'life-republic' :
              current.slug?.includes('godrej') ? 'godrej-hinjewadi' :
              current.slug?.includes('megapolis') ? 'megapolis' :
              current.slug?.includes('vtp') ? 'vtp-blue-waters' : undefined
            } 
          />
          <ParanjapeLegacySection />
          <FAQSection />
          <RelatedSearchesMesh currentSlug={current.slug} silo={current.silo} />
        </div>
      </section>
    </div>
  );
}

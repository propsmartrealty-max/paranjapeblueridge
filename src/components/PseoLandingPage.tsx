import React from 'react';
import Image from 'next/image';
import { projects } from '@/data/master-data';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Shield, CheckCircle2, MessageCircle, Star } from 'lucide-react';
import FAQSection from '@/components/FAQSection';
import dynamic from 'next/dynamic';
const InteractiveFloorPlans = dynamic(() => import('@/components/InteractiveFloorPlans'), { ssr: false });
import PuneMarketReport from '@/components/PuneMarketReport';
import DynamicContentBlock from '@/components/DynamicContentBlock';
import RelatedSearchesMesh from '@/components/RelatedSearchesMesh';
import SiloLinks from '@/components/SiloLinks';
import LanguageInitializer from '@/components/LanguageInitializer';
import EnquiryModalAutoPopup from '@/components/EnquiryModalAutoPopup';
import DynamicFreshness from '@/components/DynamicFreshness';

interface PseoLandingPageProps {
  pageData: {
    slug: string;
    title: string;
    intent: string;
    type: string;
    silo: string;
  }
}

export default function PseoLandingPage({ pageData }: PseoLandingPageProps) {
  // Determine benefits based on silo
  const getBenefits = (silo: string) => {
    switch(silo) {
      case 'investor':
        return ['High Rental Yield', 'Strong Capital Appreciation', 'Premium Tenant Profile', 'Zero Maintenance Headaches'];
      case 'corporate':
        return ['Zero Commute Time', 'Walk to Office Hubs', 'Premium Work-Life Balance', 'Corporate Community'];
      case 'infrastructure':
      case 'infra-guide':
        return ['Future-Proof Connectivity', 'Metro Station Access', 'Highway Proximity', 'Appreciating Asset'];
      case 'ecosystem':
        return ['Private Boat Club', 'ICSE School Inside', '9-Hole Golf Course', '138 Acre Mega Township'];
      case 'competitor':
      case 'battleground':
        return ['138-Acre Mega Township', 'Ready Possession Clusters', 'Golf Course & Boat Club', 'Blue Ridge Public School'];
      case 'paranjape-schemes':
        return ['Brand Credibility', 'Premium Quality', 'Strategic Location', 'MahaRERA Certified'];
      default:
        return ['High Rental Yield', 'Walk to Work', 'Premium Amenities', 'Capital Appreciation'];
    }
  };

  const getParagraph = (silo: string) => {
    if (silo === 'investor') return `For discerning investors seeking ${pageData.intent.toLowerCase()}, Paranjape Blue Ridge stands as Hinjewadi's crown jewel. With a proven track record of 4-5% rental yields and consistent capital appreciation, this is the definitive choice for NRIs and HNIs looking to secure wealth in Pune's IT corridor.`;
    if (silo === 'corporate') return `Maximize your work-life balance with luxury living near your office. When searching for ${pageData.intent.toLowerCase()}, Blue Ridge eliminates the daily commute fatigue, placing you right at the nexus of Pune's massive corporate ecosystem.`;
    if (silo === 'infrastructure' || silo === 'infra-guide') return `Location and connectivity dictate real estate value. By securing ${pageData.title.toLowerCase()}, you leverage the upcoming Metro Line 3 and expressway access to guarantee your asset remains future-proofed and highly connected.`;
    if (silo === 'ecosystem') return `True luxury is an integrated ecosystem. Searching for ${pageData.intent.toLowerCase()} leads you directly to Blue Ridge's 138-acre masterplan. With an ICSE school, private boat club, and professional golf course within the gates, your lifestyle is elevated beyond just an apartment.`;
    if (silo === 'battleground') return `When evaluating ${pageData.title.toLowerCase()}, the contrast is clear. While many competitors offer standalone buildings, Blue Ridge provides a 138-acre ready integrated ecosystem. From the 9-hole golf course to the inside-campus school, our "Township First" approach offers a lifestyle scale that other projects in the vicinity simply cannot replicate.`;
    if (silo === 'paranjape-schemes') return `Looking for detailed information on ${pageData.intent}? Paranjape Schemes (Construction) Ltd is one of Pune's most trusted real estate developers, with over 40 years of building quality townships, luxury residences, and senior living homes. Discover the pricing, layouts, and reviews for ${pageData.intent} today.`;
    
    return `Paranjape Blue Ridge stands as a landmark of modern urban planning. When searching for ${pageData.intent.toLowerCase()}, this 138-acre township offers an unparalleled ecosystem. From proximity to major IT hubs to a private 9-hole golf course and river-facing promenades, every aspect of ${pageData.type.toLowerCase()} living is elevated to global standards.`;
  };

  return (
    <main className="min-h-screen bg-navy text-text">
      <LanguageInitializer lang={pageData.slug.startsWith('mr-') ? 'mr' : 'en'} />
      <Navbar />
      <EnquiryModalAutoPopup />

      {/* SEO HERO SECTION */}
      <section className="relative h-[70vh] flex items-end pb-20 overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/images/master-hero-v4.png" 
            fill
            priority
            fetchPriority="high"
            className="object-cover opacity-30"
            alt={`Paranjape Blue Ridge Township - Premium showcases of ${pageData.title} in Hinjewadi Phase 1 Pune`}
            sizes="100vw"
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
            <span className="text-gilded">
              {pageData.intent}
            </span>
          </h1>
          <div className="flex items-center gap-4 mb-8">
             <div className="flex text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" className="mr-0.5" />)}
             </div>
             <span className="text-[10px] text-warm-white font-bold uppercase tracking-widest bg-gold/10 px-3 py-1 rounded-full border border-gold/20">Google Verified Inventory</span>
          </div>
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
                <div key={i} className="bg-[var(--bg)]/40 rounded-[2.5rem] border border-gold/10 p-8 group hover:border-gold/30 transition-all flex flex-col h-full">
                    <div className="mb-6 flex-grow">
                        <h3 className="text-2xl font-serif text-gilded mb-2">{project.name}</h3>
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
      {(pageData.silo === 'pune-macro' || pageData.silo === 'west-pune-macro') && (
        <PuneMarketReport />
      )}

      <InteractiveFloorPlans />

      {/* WHY CHOOSE US - SEO CONTENT REINFORCEMENT */}
      <section className="py-24 bg-navy-light border-y border-white/5">
        <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif text-warm-white mb-8">
                Why Invest in {pageData.title}?
            </h2>
            <p className="text-text-light leading-relaxed mb-12">
                {getParagraph(pageData.silo)}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
                {getBenefits(pageData.silo).map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 bg-navy p-4 rounded-xl border border-white/5">
                        <CheckCircle2 size={16} className="text-gold shrink-0" />
                        <span className="text-xs text-warm-white font-bold uppercase tracking-widest">{benefit}</span>
                    </div>
                ))}
            </div>
            
            {/* FAQ SECTION */}
            <FAQSection />

            {/* SILO LINKS */}
            <SiloLinks currentSlug={pageData.slug} silo={pageData.silo} />
        </div>
      </section>

      {/* DYNAMIC CONTENT BLOCK FOR EXTREME SEO */}
      <div className="container max-w-4xl mx-auto px-4">
        <DynamicFreshness slug={pageData.slug} />
      </div>
      <DynamicContentBlock silo={pageData.silo} title={pageData.intent} />

      {/* RELATED SEARCHES MESH FOR PAGERANK SCULPTING */}
      <RelatedSearchesMesh currentSlug={pageData.slug} silo={pageData.silo} />

      {/* FOOTER CTA */}
      <section className="bg-gold py-20">
         <div className="container flex flex-col md:flex-row justify-between items-center gap-10 text-navy">
            <div>
                <h2 className="text-5xl font-serif mb-4">Secure your <span className="italic font-normal">Sovereign Unit</span></h2>
                <p className="font-bold uppercase text-[10px] tracking-[4px]">Request Private Site Visit to Blue Ridge</p>
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
            </div>
         </div>
      </section>
    </main>
  );
}

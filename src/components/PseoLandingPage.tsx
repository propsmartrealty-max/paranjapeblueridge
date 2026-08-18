import React from 'react';
import Image from 'next/image';
import { projects } from '@/data/master-data';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Shield, CheckCircle2, MessageCircle, Star } from 'lucide-react';
import FAQSection from '@/components/FAQSection';
import { parseSpintax, spunParagraphs } from '@/lib/spintax';
import { getDynamicContext } from '@/lib/dynamic-context';
import dynamic from 'next/dynamic';
const InteractiveFloorPlans = dynamic(() => import('@/components/InteractiveFloorPlans'), { ssr: false });
import PuneMarketReport from '@/components/PuneMarketReport';
import DynamicContentBlock from '@/components/DynamicContentBlock';
import RelatedSearchesMesh from '@/components/RelatedSearchesMesh';
import SiloLinks from '@/components/SiloLinks';
import LanguageInitializer from '@/components/LanguageInitializer';
import EnquiryModalAutoPopup from '@/components/EnquiryModalAutoPopup';
import DynamicFreshness from '@/components/DynamicFreshness';
import RoiCalculator from '@/components/RoiCalculator';
import ContextualWhatsappCTA from '@/components/ContextualWhatsappCTA';
import MahaReraBadge from '@/components/MahaReraBadge';
import ProximityMatrix from '@/components/ProximityMatrix';
import CurrencySwitcher from '@/components/CurrencySwitcher';
import EmiCalculator from '@/components/EmiCalculator';
import SiteVisitBooking from '@/components/SiteVisitBooking';
import NriCostEstimator from '@/components/NriCostEstimator';
import CompetitorComparison from '@/components/CompetitorComparison';
import EnvironmentalWidget from '@/components/EnvironmentalWidget';

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
      case 'nri':
        return ['FEMA Compliant Investment', 'Remote Purchase Possible', 'NRI Desk Support', 'Repatriable Rental Income'];
      case 'investor':
        return ['High Rental Yield', 'Strong Capital Appreciation', 'Premium Tenant Profile', 'Zero Maintenance Headaches'];
      case 'corporate':
        return ['Zero Commute Time', 'Walk to Office Hubs', 'Premium Work-Life Balance', 'Corporate Community'];
      case 'infrastructure':
      case 'infra-guide':
        return ['Future-Proof Connectivity', 'Metro Station Access', 'Highway Proximity', 'Appreciating Asset'];
      case 'ecosystem':
      case 'luxury-ecosystem':
        return ['Private Boat Club', 'ICSE School Inside', '9-Hole Golf Course', '138 Acre Mega Township'];
      case 'competitor':
      case 'battleground':
        return ['138-Acre Mega Township', 'Ready Possession Clusters', 'Golf Course & Boat Club', 'Blue Ridge Public School'];
      case 'paranjape-schemes':
      case 'branded':
        return ['Brand Credibility', 'Transparent Pricing', 'Strategic Location', 'MahaRERA Certified'];
      case 'duplex-simplex':
        return ['Double-Height Ceilings', 'Vertical Living Privacy', 'Private Sky Balconies', 'Ultra-Spacious Layouts'];
      case 'pune-micro-market':
      case 'pune-macro':
        return ['Strategic IT Corridor Linkage', 'Metro Line 3 Connectivity', 'Top-Tier Rental Yield', 'High Capital Growth'];
      default:
        return ['High Rental Yield', 'Walk to Work', 'Premium Amenities', 'Capital Appreciation'];
    }
  };

  const getParagraph = (silo: string, slug: string) => {
    const context = getDynamicContext(slug);
    
    let base = '';
    if (silo === 'nri') base = `{For|Attention} NRI {investors|buyers} across {USA, UAE, UK, Singapore, Canada, and Australia|the globe|international borders}, Paranjape Blue Ridge is the {definitive|premier|ultimate} choice in Indian real estate. With {FEMA-compliant acquisition|hassle-free compliance}, {MahaRERA-certified title|verified clear title}, and a dedicated NRI desk, you can {complete|execute} your purchase 100% remotely. {Our clients currently earn 4-5% rental yields|Enjoy robust 4-5% rental returns}, and with Metro Line 3 arriving at 800m in 2027, the capital appreciation story is just beginning. Searching for "${pageData.intent.toLowerCase()}" ends here.`;
    else if (silo === 'investor') base = `{For discerning investors|For smart property buyers} seeking ${pageData.intent.toLowerCase()}, Paranjape Blue Ridge stands as Hinjewadi's {crown jewel|premier investment destination}. With a proven track record of 4-5% rental yields and {consistent|strong|exceptional} capital appreciation, this is the definitive choice for NRIs and HNIs looking to secure wealth in Pune's IT corridor.`;
    else if (silo === 'corporate') base = `{Maximize|Enhance} your work-life balance with luxury living near your office. When searching for ${pageData.intent.toLowerCase()}, Blue Ridge {eliminates|bypasses} the daily commute fatigue, placing you right at the {nexus|heart} of Pune's massive corporate ecosystem.`;
    else if (silo === 'infrastructure' || silo === 'infra-guide') base = `Location and connectivity {dictate|drive} real estate value. By securing ${pageData.title.toLowerCase()}, you leverage the {upcoming|highly anticipated} Metro Line 3 and expressway access to {guarantee|ensure} your asset remains {future-proofed|highly connected}.`;
    else if (silo === 'ecosystem' || silo === 'luxury-ecosystem') base = `{True luxury is|Premium living means} an integrated ecosystem. Searching for ${pageData.intent.toLowerCase()} leads you directly to Blue Ridge's 138-acre masterplan. With an ICSE school inside campus, a private riverfront boat club, and a professional 9-hole golf course within the gates, your family lifestyle is elevated {beyond standard apartments|to global standards}.`;
    else if (silo === 'battleground') base = `{When evaluating|When comparing} ${pageData.title.toLowerCase()}, the contrast is clear. While many competitors offer standalone buildings, Blue Ridge provides a 138-acre ready integrated ecosystem. From the 9-hole golf course to the inside-campus school, our "Township First" approach offers a lifestyle scale that other projects in the vicinity simply {cannot replicate|fail to match}.`;
    else if (silo === 'paranjape-schemes' || silo === 'branded') base = `{Looking for|Searching for} official pricing, floor plans, and verified details for ${pageData.intent}? As the {flagship|premium} 138-acre township by Paranjape Schemes (Construction) Ltd, Blue Ridge Hinjewadi offers {complete transparency|absolute clarity}, MahaRERA compliance, and ready-to-move as well as ongoing luxury inventory tailored to your expectations.`;
    else if (silo === 'duplex-simplex') base = `{Elevate|Transform} your lifestyle with multi-level architectural luxury. When searching for ${pageData.intent.toLowerCase()}, Paranjape Blue Ridge delivers exceptional vertical living with double-height ceiling voids, expansive sky balconies, and uncompromised family privacy. Situated within Pune's premier 138-acre township, our duplex and simplex residences combine suburban serenity with high-tech urban convenience.`;
    else if (silo === 'pune-micro-market' || silo === 'pune-macro') base = `{Navigating|Understanding} the real estate landscape of ${pageData.title.toLowerCase()} requires authentic market intelligence. Paranjape Blue Ridge stands as the {anchor|primary} development across West Pune's growth corridor, offering immediate proximity to Rajiv Gandhi Infotech Park, direct access to Metro Line 3, and unmatched capital appreciation. Discover why buyers targeting ${pageData.intent.toLowerCase()} choose Blue Ridge.`;
    else base = `Paranjape Blue Ridge stands as a landmark of modern urban planning. When searching for ${pageData.intent.toLowerCase()}, this 138-acre township offers an {unparalleled|exceptional} ecosystem. From proximity to major IT hubs to a private 9-hole golf course and river-facing promenades, every aspect of ${pageData.type.toLowerCase()} living is elevated to global standards.`;
    
    // Parse spintax and inject contextual knowledge graph data
    return parseSpintax(base, slug) + " " + context;
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
            src="/assets/images/real-township-day.jpg" 
            fill
            priority
            fetchPriority="high"
            className="object-cover opacity-30"
            alt={`Actual aerial view of Paranjape Blue Ridge Township - Premium ${pageData.title} in Hinjewadi Phase 1 Pune`}
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
          <h1 id="speakable-title" className="text-5xl md:text-7xl font-serif text-warm-white mb-6 capitalize leading-tight">
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
          <p id="speakable-summary" className="text-xl text-text-light max-w-2xl leading-relaxed">
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
                {getParagraph(pageData.silo, pageData.slug)}
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
        {/* OFFICIAL MAHARERA VERIFICATION TRUST BADGE */}
        <MahaReraBadge />
        {/* LIVE MICRO-CLIMATE & ENVIRONMENTAL AQI SENSOR WIDGET */}
        <EnvironmentalWidget />
        {/* INTERACTIVE COMPETITOR TOWNSHIP COMPARISON MATRIX */}
        <CompetitorComparison />
        {/* PRIVATE SITE VISIT & VIRTUAL 3D TOUR BOOKING ENGINE */}
        <SiteVisitBooking />
        {/* INTERNATIONAL MULTI-CURRENCY ESTIMATOR FOR NRIS */}
        <CurrencySwitcher />
        {/* ALL-INCLUSIVE STAMP DUTY & ACQUISITION COST ESTIMATOR */}
        <NriCostEstimator />
        {/* INTERACTIVE HOME LOAN & EMI CALCULATOR */}
        <EmiCalculator />
        {/* HYPER-LOCAL PROXIMITY & COMMUTE MATRIX */}
        <ProximityMatrix />
        {/* INTERACTIVE FINANCIAL & ROI CALCULATOR */}
        <RoiCalculator title={pageData.title} />
      </div>
      <DynamicContentBlock silo={pageData.silo} title={pageData.intent} />

      {/* RELATED SEARCHES MESH FOR PAGERANK SCULPTING */}
      <RelatedSearchesMesh currentSlug={pageData.slug} silo={pageData.silo} />

      {/* CONTEXT-AWARE FLOATING WHATSAPP CTA */}
      <ContextualWhatsappCTA title={pageData.title} intent={pageData.intent} silo={pageData.silo} />

      {/* FOOTER CTA */}
      <section className="bg-gold py-20">
         <div className="container flex flex-col md:flex-row justify-between items-center gap-10 text-navy">
            <div>
                <h2 className="text-5xl font-serif mb-4">
                  {pageData.silo === 'nri' ? 'Book Your ' : 'Secure your '}
                  <span className="italic font-normal">
                    {pageData.silo === 'nri' ? 'Virtual Tour' : 'Sovereign Unit'}
                  </span>
                </h2>
                <p className="font-bold uppercase text-[10px] tracking-[4px]">
                  {pageData.silo === 'nri'
                    ? 'Schedule a Private 360° Tour From Abroad — NRI Desk Available'
                    : 'Request Private Site Visit to Blue Ridge'}
                </p>
            </div>
            <div className="flex gap-4">
                <a
                  href={pageData.silo === 'nri'
                    ? `https://wa.me/917744009295?text=Hello%2C%0A%0AI%20am%20an%20NRI%20interested%20in%20*Paranjape%20Blue%20Ridge%20Township*%2C%20Hinjewadi%20Phase%201%2C%20Pune.%0A%0APage%3A%20${encodeURIComponent(pageData.slug)}%0A%0APlease%20share%3A%0A%E2%9C%85%20Virtual%20360%C2%B0%20Tour%20link%0A%E2%9C%85%20NRI%20pricing%20%26%20floor%20plans%0A%E2%9C%85%20FEMA%20%26%20home%20loan%20details%0A%0AThank%20you.`
                    : `https://wa.me/917744009295?text=Hello%2C%0A%0AI%20am%20interested%20in%20*Paranjape%20Blue%20Ridge%20Township*%2C%20Hinjewadi%20Phase%201%2C%20Pune.%0A%0APage%3A%20${encodeURIComponent(pageData.slug)}%0A%0APlease%20share%20the%20following%3A%0A%E2%9C%85%20Available%20inventory%20%26%20floor%20plans%0A%E2%9C%85%20Updated%20price%20list%0A%E2%9C%85%20Site%20visit%20schedule%0A%0AThank%20you.`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-emerald-500 text-white px-10 py-5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20"
                >
                  <MessageCircle size={18} />
                  {pageData.silo === 'nri' ? 'Book Virtual Tour' : 'WhatsApp Enquiry'}
                </a>
            </div>
         </div>
      </section>
    </main>
  );
}

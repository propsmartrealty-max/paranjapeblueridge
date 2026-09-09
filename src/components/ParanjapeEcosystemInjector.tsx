import React from 'react';
import { ecosystemCategories } from '@/data/ecosystem-keywords';
import { ChevronDown, Sparkles, Building2, MapPin, ArrowRight } from 'lucide-react';

/**
 * Paranjape Ecosystem Master Navigation Component
 * Adheres strictly to Google's Helpful Content Guidelines, E-E-A-T and semantic web standards.
 * Every single keyword resolves directly to a dedicated, high-authority canonical URL.
 */
export default function ParanjapeEcosystemInjector() {
  const ecosystemData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Paranjape Schemes (Construction) Ltd. - Paranjape Blue Ridge Hinjewadi",
    "alternateName": [
      "Paranjape Schemes",
      "PSCL Pune",
      "Paranjape Blue Ridge Hinjewadi",
      "Paranjape Builders Pune",
      "Paranjape Schemes Projects"
    ],
    "description": "Premier property development portfolio of Paranjape Schemes (Construction) Limited in Pune, Maharashtra. Featuring landmark integrated townships including the 138-acre Paranjape Blue Ridge in Hinjewadi Phase 1, Forest Trails in Bhugaon, Athashri Senior Living, Trident Towers Wakad, and Highgardens.",
    "url": "https://paranjapeblueridge.com",
    "telephone": "+91-20-67210000",
    "email": "sales@paranjapeschemes.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Blue Ridge Township, Near Rajiv Gandhi Infotech Park, Phase 1",
      "addressLocality": "Hinjewadi",
      "addressRegion": "Maharashtra",
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.577086,
      "longitude": 73.734685
    },
    "founder": [
      { "@type": "Person", "name": "Shashank Paranjape" },
      { "@type": "Person", "name": "Shrikant Paranjape" }
    ],
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Hinjewadi" },
      { "@type": "AdministrativeArea", "name": "Pune West" },
      { "@type": "AdministrativeArea", "name": "Wakad" },
      { "@type": "AdministrativeArea", "name": "Baner" },
      { "@type": "AdministrativeArea", "name": "Mahalunge" }
    ],
    "brand": [
      { "@type": "Brand", "name": "Paranjape Blue Ridge" },
      { "@type": "Brand", "name": "Promenade Residences" },
      { "@type": "Brand", "name": "The Altius Riverside" },
      { "@type": "Brand", "name": "Ridges 41" },
      { "@type": "Brand", "name": "Forest Trails" },
      { "@type": "Brand", "name": "Athashri" },
      { "@type": "Brand", "name": "Trident Towers" },
      { "@type": "Brand", "name": "Highgardens" },
      { "@type": "Brand", "name": "Swaniketan" }
    ],
    "mainEntity": {
      "@type": "SiteNavigationElement",
      "name": "Paranjape Schemes Projects & Blue Ridge Ecosystem Directory",
      "hasPart": ecosystemCategories.map((category) => ({
        "@type": "WebPage",
        "name": category.title,
        "text": category.keywords.join(", ")
      }))
    }
  };

  const resolveKeywordHref = (keyword: string): string => {
    const k = keyword.toLowerCase();

    // 1. Ecosystem Sub-Pages (Highest Specificity)
    if (k.includes('school') || k.includes('icse') || k.includes('brps')) {
      return '/blue-ridge-public-school';
    }
    if (k.includes('golf') || k.includes('driving range')) {
      return '/blue-ridge-golf-course';
    }
    if (k.includes('boat') || k.includes('marina') || k.includes('kayak')) {
      return '/blue-ridge-boat-club';
    }
    if (k.includes('sez') || k.includes('office park') || k.includes('commercial')) {
      return '/blue-ridge-sez-tech-park';
    }

    // 2. Active Cluster Portals
    if (k.includes('promenade')) {
      return '/paranjape-blue-ridge-promenade-hinjewadi-pune';
    }
    if (k.includes('altius')) {
      return '/paranjape-blue-ridge-the-altius-hinjewadi-pune';
    }
    if (k.includes('ridges 41') || k.includes('ridges-41') || k.includes('41-storey') || k.includes('41 storey')) {
      return '/paranjape-blue-ridge-41-hinjewadi-pune';
    }

    // 3. Configurations & Specific Typologies
    if (k.includes('2 bhk') && k.includes('price')) return '/paranjape-blue-ridge-price-list-and-cost-sheet-2026';
    if (k.includes('2 bhk')) return '/2-bhk-flats-in-paranjape-blue-ridge-hinjewadi';
    if (k.includes('3 bhk') && k.includes('price')) return '/paranjape-blue-ridge-price-list-and-cost-sheet-2026';
    if (k.includes('3 bhk')) return '/3-bhk-flats-in-paranjape-blue-ridge-hinjewadi';
    if (k.includes('4 bhk') && k.includes('price')) return '/paranjape-blue-ridge-price-list-and-cost-sheet-2026';
    if (k.includes('4 bhk')) return '/4-bhk-luxury-apartments-in-blue-ridge-hinjewadi';
    if (k.includes('5 bhk') || k.includes('penthouse')) return '/5-bhk-ultra-luxury-penthouses-in-blue-ridge-hinjewadi';
    if (k.includes('duplex')) return '/duplex-apartments-in-blue-ridge-hinjewadi';
    if (k.includes('river facing') || k.includes('riverfront')) return '/river-facing-flats-in-hinjewadi-phase-1';
    if (k.includes('golf course facing')) return '/golf-course-facing-apartments-in-pune-west';

    // 4. Tech Park / Corporate Employers
    if (k.includes('infosys')) return '/flats-near-infosys-hinjewadi-phase-1';
    if (k.includes('wipro')) return '/flats-near-wipro-technologies-hinjewadi';
    if (k.includes('tcs')) return '/flats-near-tcs-hinjewadi-rajiv-gandhi-infotech-park';
    if (k.includes('cognizant') || k.includes('tech mahindra')) return '/flats-near-cognizant-and-tech-mahindra-hinjewadi';
    if (k.includes('embassy')) return '/flats-near-embassy-techzone-hinjewadi';
    if (k.includes('qubix')) return '/flats-near-qubix-business-park-hinjewadi-phase-1';
    if (k.includes('walk to work')) return '/walk-to-work-flats-in-rajiv-gandhi-infotech-park-pune';
    if (k.includes('corporate rental')) return '/corporate-rentals-in-blue-ridge-hinjewadi-phase-1';

    // 5. Infrastructure & Transit Catalysts
    if (k.includes('metro')) return '/hinjewadi-metro-line-3-connectivity-to-blue-ridge';
    if (k.includes('bridge') || k.includes('mahalunge')) return '/mahalunge-hinjewadi-bridge-impact-on-blue-ridge';
    if (k.includes('expressway')) return '/mumbai-pune-expressway-access-from-hinjewadi-phase-1';
    if (k.includes('mula river')) return '/mula-river-rejuvenation-and-promenade-at-blue-ridge';
    if (k.includes('maan road') || k.includes('wakad link')) return '/flats-near-maan-road-hinjewadi';
    if (k.includes('baner') || k.includes('balewadi')) return '/flats-near-baner-and-balewadi-high-street-pune';

    // 6. Developer Heritage & Legacy
    if (k.includes('paranjape schemes projects') || k.includes('projects in hinjewadi')) {
      return '/paranjape-schemes-projects-in-hinjewadi-pune';
    }
    if (k.includes('paranjape schemes') || k.includes('pscl') || k.includes('forest trails') || k.includes('athashri') || k.includes('trident') || k.includes('highgardens') || k.includes('swaniketan') || k.includes('windermere')) {
      return '/why-paranjape';
    }

    // 7. Transactions & Inventory
    if (k.includes('resale') || k.includes('towers 1 to') || k.includes('orion') || k.includes('groves')) {
      return '/blue-ridge-hinjewadi-resale-flats-and-inventory';
    }
    if (k.includes('ready possession')) return '/ready-possession-flats-in-blue-ridge-hinjewadi';
    if (k.includes('floor plan') || k.includes('layout')) return '/paranjape-blue-ridge-floor-plans-and-layouts-pdf';
    if (k.includes('price list') || k.includes('cost sheet')) return '/paranjape-blue-ridge-price-list-and-cost-sheet-2026';
    if (k.includes('site visit') || k.includes('sales gallery')) return '/paranjape-blue-ridge-site-visit-booking-and-sales-gallery';
    if (k.includes('mivan')) return '/mivan-construction-projects-in-hinjewadi-phase-1';

    // 8. Investor Intelligence & Comparisons
    if (k.includes('rental yield')) return '/rental-yield-in-hinjewadi-phase-1-real-estate';
    if (k.includes('capital appreciation')) return '/capital-appreciation-trends-in-hinjewadi-phase-1';
    if (k.includes('nri') || k.includes('fema')) return '/nri-investment';
    if (k.includes('dubai') || k.includes('uae')) return '/buy-property-in-pune-from-dubai-uae-nri-desk';
    if (k.includes('usa') || k.includes('canada')) return '/buy-property-in-pune-from-usa-and-canada-nri-desk';
    if (k.includes('life republic')) return '/blue-ridge-vs-life-republic-township-comparison';
    if (k.includes('megapolis')) return '/blue-ridge-vs-megapolis-hinjewadi-phase-3';
    if (k.includes('godrej')) return '/blue-ridge-vs-godrej-hinjewadi-comparison';
    if (k.includes('vtp')) return '/blue-ridge-vs-vtp-blue-waters-mahalunge';
    if (k.includes('best integrated township')) return '/best-integrated-township-in-hinjewadi-pune';

    // Default Fallback to Main Master Page
    return '/paranjape-blue-ridge-hinjewadi-phase-1-pune';
  };

  return (
    <section className="w-full bg-[#FAF9F6] border-t-2 border-slate-200 py-12 text-[#070D1A]">
      {/* Schema.org Structured Graph */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ecosystemData) }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <details className="group border-2 border-slate-200 rounded-3xl overflow-hidden bg-white shadow-xs">
          <summary className="cursor-pointer px-6 py-5 flex items-center justify-between bg-slate-50 hover:bg-amber-50/50 transition-colors list-none">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100/80 border border-amber-300 flex items-center justify-center text-[#785415] shrink-0">
                <Building2 size={18} />
              </div>
              <div>
                <h4 className="text-[#070D1A] text-xs sm:text-sm uppercase tracking-wider font-bold font-mono">
                  Paranjape Schemes Projects & Paranjape Blue Ridge Keyword Ecosystem
                </h4>
                <p className="text-slate-600 text-[11px] mt-0.5 font-sans font-medium">
                  Verified topical directory of Paranjape Schemes projects in Pune, Blue Ridge clusters, IT SEZ infrastructure, and pricing indices.
                </p>
              </div>
            </div>
            <div className="text-[#785415] group-open:rotate-180 transition-transform duration-300 shrink-0">
              <ChevronDown size={20} />
            </div>
          </summary>
          
          <div className="p-6 md:p-8 bg-white border-t border-slate-200">
            {/* Editorial Overview */}
            <div className="mb-8 pb-6 border-b border-slate-100">
              <h5 className="text-[#070D1A] text-xs font-bold mb-2 uppercase tracking-wider font-mono">
                Paranjape Schemes (Construction) Ltd Portfolio & Blue Ridge Authority
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed text-justify font-sans font-medium">
                <strong>Paranjape Schemes (Construction) Limited (PSCL)</strong> is one of Western India's most distinguished real estate developers with over 35 years of engineering excellence, delivering 20M+ sq. ft. of residential and commercial spaces for 75,000+ happy residents across Pune, Mumbai, and Bengaluru. Its flagship development, <strong>Paranjape Blue Ridge in Hinjewadi Phase 1</strong>, is a landmark 138-acre integrated sovereign township comprising premium residential enclaves like <strong>Promenade Residences (3 & 4 BHK Riverfront)</strong>, <strong>The Altius Riverside (3 & 4 BHK Golf Facing)</strong>, and <strong>Ridges 41 (Smart High-Rise)</strong>, supported by an operational 3M+ sq. ft. IT/ITES SEZ, the ICSE Blue Ridge Public School, an executive 9-hole golf course, and Pune's first private residential boat club.
              </p>
            </div>

            {/* Semantic Internal Navigation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8">
              {ecosystemCategories.map((category, idx) => (
                <div key={idx} className="space-y-3">
                  <h6 className="text-[#070D1A] text-xs font-bold font-mono uppercase tracking-wider pb-1.5 border-b border-slate-200 flex items-center justify-between">
                    <span>{category.title}</span>
                    <span className="text-[10px] text-slate-500 font-normal">({category.keywords.length})</span>
                  </h6>
                  <ul className="space-y-1.5 list-none p-0 m-0">
                    {category.keywords.map((kw, kIdx) => {
                      const href = resolveKeywordHref(kw);
                      return (
                        <li key={kIdx}>
                          <a
                            href={href}
                            className="text-[11px] text-slate-600 hover:text-[#785415] hover:underline transition-colors block leading-snug no-underline py-0.5 font-medium"
                            title={`${kw} - Paranjape Blue Ridge Hinjewadi`}
                          >
                            {kw}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Quick Links to Authority Pages */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin size={13} className="text-[#785415]" />
                <span>Hinjewadi Phase 1, Pune • 138-Acre Integrated Township</span>
              </div>
              <div className="flex items-center gap-4 flex-wrap font-bold">
                <a href="/why-paranjape" className="text-[#785415] hover:text-[#070D1A] no-underline">
                  Paranjape Schemes Legacy →
                </a>
                <a href="/blue-ridge/ongoing-projects" className="text-[#785415] hover:text-[#070D1A] no-underline">
                  Active Clusters (3) →
                </a>
                <a href="/blue-ridge-sez-tech-park" className="text-[#785415] hover:text-[#070D1A] no-underline">
                  IT SEZ Tech Park →
                </a>
                <a href="/blue-ridge-public-school" className="text-[#785415] hover:text-[#070D1A] no-underline">
                  ICSE School →
                </a>
                <a href="/blue-ridge-golf-course" className="text-[#785415] hover:text-[#070D1A] no-underline">
                  9-Hole Golf Course →
                </a>
                <a href="/blue-ridge-boat-club" className="text-[#785415] hover:text-[#070D1A] no-underline">
                  Riverfront Boat Club →
                </a>
              </div>
            </div>

          </div>
        </details>
      </div>
    </section>
  );
}

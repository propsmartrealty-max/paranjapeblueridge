import React from 'react';
import { ecosystemCategories } from '@/data/ecosystem-keywords';
import { ChevronDown, Sparkles } from 'lucide-react';

/**
 * Paranjape Ecosystem Master Navigation Component
 * Adheres strictly to Google's Helpful Content Guidelines and semantic web standards.
 * Uses native HTML5 <details> with high-contrast, fully crawlable internal links.
 */
export default function ParanjapeEcosystemInjector() {
  const ecosystemData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Paranjape Schemes Entire Real Estate Ecosystem - Pune & Global",
    "description": "Complete directory of Paranjape Schemes (Construction) Limited premium townships, luxury apartments, senior living projects, commercial SEZs, and inclusive housing across Pune, Mumbai, Bangalore, and Nashik.",
    "about": {
      "@type": "Organization",
      "name": "Paranjape Schemes (Construction) Ltd.",
      "alternateName": ["PSCL", "Paranjape Builders", "Paranjape Developer", "Paranjape Real Estate"],
      "areaServed": ["Pune", "Mumbai", "Bangalore", "Nashik", "Vadodara", "Kolhapur", "Ratnagiri"],
      "knowsAbout": [
        "Integrated Townships", "Senior Living (Athashri)", "Assisted Living (Aastha)",
        "Inclusive Housing (Swaniketan)", "Commercial IT SEZ", "Hospitality Real Estate",
        "Society Redevelopment"
      ],
      "brand": [
        { "@type": "Brand", "name": "Blue Ridge" },
        { "@type": "Brand", "name": "Forest Trails" },
        { "@type": "Brand", "name": "Athashri" },
        { "@type": "Brand", "name": "Aastha" },
        { "@type": "Brand", "name": "Swaniketan" },
        { "@type": "Brand", "name": "Trident" }
      ]
    },
    "mainEntity": {
      "@type": "SiteNavigationElement",
      "name": "Global Project Directory",
      "hasPart": ecosystemCategories.map((category) => ({
        "@type": "WebPage",
        "name": category.title,
        "text": category.keywords.join(", ")
      }))
    }
  };

  const resolveKeywordHref = (keyword: string) => {
    const k = keyword.toLowerCase();
    if (k.includes('promenade')) return '/paranjape-blue-ridge-promenade-hinjewadi-pune';
    if (k.includes('altius')) return '/paranjape-blue-ridge-the-altius-hinjewadi-pune';
    if (k.includes('ridges 41') || k.includes('41-storey') || k.includes('2 bhk')) return '/paranjape-blue-ridge-41-hinjewadi-pune';
    if (k.includes('sez') || k.includes('office') || k.includes('infosys') || k.includes('wipro') || k.includes('tcs')) return '/#sez';
    if (k.includes('golf') || k.includes('boat') || k.includes('marina')) return '/#golf';
    if (k.includes('school') || k.includes('icse') || k.includes('amenities')) return '/#lifestyle';
    if (k.includes('metro') || k.includes('bridge') || k.includes('expressway') || k.includes('transit')) return '/hinjewadi-micro-market';
    if (k.includes('nri') || k.includes('investment') || k.includes('fema')) return '/nri-investment';
    if (k.includes('rera') || k.includes('construction')) return '/construction-updates';
    return '/directory';
  };

  return (
    <section className="w-full bg-[#FAF9F6] border-t border-slate-200 py-12 text-[#070D1A]">
      {/* Schema.org Structured Graph */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ecosystemData) }}
      />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <details className="group border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <summary className="cursor-pointer px-6 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition-colors list-none">
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-[#B88E3E] shrink-0" />
              <div>
                <h4 className="text-[#070D1A] text-xs sm:text-sm uppercase tracking-wider font-bold font-mono">
                  Explore the Paranjape Schemes Ecosystem
                </h4>
                <p className="text-slate-500 text-[11px] mt-0.5 font-sans">
                  Browse complete directory of township clusters, IT SEZ infrastructure, and residential corridors.
                </p>
              </div>
            </div>
            <div className="text-[#B88E3E] group-open:rotate-180 transition-transform duration-300">
              <ChevronDown size={18} />
            </div>
          </summary>
          
          <div className="p-6 md:p-8 bg-white border-t border-slate-200">
            {/* Editorial Overview */}
            <div className="mb-8 pb-6 border-b border-slate-100">
              <h5 className="text-[#070D1A] text-xs font-bold mb-2 uppercase tracking-wider font-mono">
                Paranjape Schemes Portfolio Across Pune West
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed text-justify font-sans">
                Paranjape Schemes (Construction) Limited (PSCL) is a premier property developer with over three decades of engineering excellence across Maharashtra. Offering landmark integrated townships like <strong>Paranjape Blue Ridge in Hinjewadi Phase 1</strong>, luxury golf-view penthouses in <strong>The Altius</strong>, riverfront towers in <strong>Promenade Residences</strong>, and smart residences in <strong>Ridges 41</strong>. From captive commercial spaces in the Blue Ridge IT/ITES SEZ to senior living at Athashri, PSCL builds generational ecosystems with full MahaRERA compliance.
              </p>
            </div>

            {/* Semantic Internal Navigation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-8">
              {ecosystemCategories.map((category, idx) => (
                <div key={idx} className="flex flex-col">
                  <strong className="text-[#8F6A24] text-xs uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5 inline-block font-mono font-bold">
                    {category.title}
                  </strong>
                  <ul className="flex flex-col gap-2 list-none m-0 p-0">
                    {category.keywords.map((keyword, kIdx) => {
                      const href = resolveKeywordHref(keyword);
                      
                      return (
                        <li key={kIdx} className="text-xs text-slate-600 leading-snug">
                          <a 
                            href={href} 
                            title={`Explore ${keyword}`}
                            className="text-slate-600 hover:text-[#B88E3E] transition-colors no-underline font-medium"
                          >
                            {keyword}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}

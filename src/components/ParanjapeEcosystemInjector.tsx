import React from 'react';
import { ecosystemCategories } from '@/data/ecosystem-keywords';

/**
 * Ultra-Advanced Ecosystem Injector (V3.0 - 100% Google SpamBrain Compliant)
 * Rebuilt to strictly adhere to Google's Helpful Content Update and Webmaster Guidelines.
 * Uses native HTML5 <details> accordions (fully indexed by Google but UX-friendly).
 * Removes all CSS cloaking (opacity hiding) and unnatural link randomization.
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
    // Using SiteNavigationElement is the safest way to map a massive taxonomy to Google
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

  return (
    <div className="w-full bg-[#050B14] border-t border-gold/10 py-12">
      {/* 1. Strict Knowledge Graph (No deprecated 'keywords' tags, only pure Entities) */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ecosystemData) }}
      />

      <div className="container mx-auto max-w-7xl px-4 text-text-light">
        {/* 2. Standard HTML5 Details Accordion (100% Google Compliant - No CSS Cloaking) */}
        <details className="group border border-white/10 rounded-xl overflow-hidden bg-[#0A101C]">
          <summary className="cursor-pointer px-6 py-4 flex items-center justify-between bg-[#0F1724] hover:bg-[#151F30] transition-colors">
            <div>
              <h4 className="text-gold text-xs sm:text-sm uppercase tracking-[0.15em] font-bold">
                Explore the Paranjape Schemes Ecosystem
              </h4>
              <p className="text-text-light/60 text-[10px] mt-1">
                Browse our complete directory of townships, commercial spaces, and residential projects.
              </p>
            </div>
            {/* Elegant Plus/Minus Icon for Accordion */}
            <div className="text-gold/50 group-open:rotate-180 transition-transform duration-300">
              ▼
            </div>
          </summary>
          
          <div className="p-6 md:p-8 bg-[#0A101C] border-t border-white/5">
            {/* 3. Deep Transactional & Combinatorial Intent Block (Natural Language) */}
            <div className="mb-10 pb-8 border-b border-white/5">
              <h5 className="text-warm-white text-xs font-semibold mb-3 uppercase tracking-wider">
                Our Real Estate Portfolio
              </h5>
              <p className="text-[11px] sm:text-[12px] text-text-light/70 leading-relaxed text-justify">
                Paranjape Schemes Construction Limited (PSCL) is a premier property developer offering a diverse portfolio across Maharashtra. Whether you are looking to buy a <strong>Paranjape Blue Ridge 2 BHK flat for sale in Hinjewadi</strong>, researching the <strong>Blue Ridge 3 BHK apartment price in Pune</strong>, analyzing <strong>Forest Trails villas in Bhugaon</strong>, seeking <strong>Athashri senior citizen homes with healthcare</strong>, or exploring commercial IT SEZ office spaces at <strong>Trident Business Park Wakad</strong> — PSCL delivers unparalleled quality. Our gated communities, walk-to-work integrated townships, and MahaRERA-registered projects ensure high rental yields, prime capital appreciation, and sustainable eco-friendly living across Hinjewadi, Wakad, Baner, Balewadi, and Khed Shivapur. From luxury duplex penthouses in The Altius to inclusive barrier-free housing at Swaniketan, we build ecosystems for every generation.
              </p>
            </div>

            {/* 4. Structured Semantic Grid (Fully Visible, High Contrast) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
              {ecosystemCategories.map((category, idx) => (
                <div key={idx} className="flex flex-col">
                  <strong className="text-gold/90 text-[11px] uppercase tracking-wider mb-4 border-b border-gold/20 pb-2 inline-block">
                    {category.title}
                  </strong>
                  <ul className="flex flex-col gap-2 list-none m-0 p-0">
                    {category.keywords.map((keyword, kIdx) => {
                      // Safe, predictable URL slug generation
                      const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      
                      return (
                        <li key={kIdx} className="text-[10.5px] text-text-light/60 leading-snug hover:text-warm-white transition-colors">
                          <a href={`/explore/${slug}`} title={`Explore ${keyword}`}>
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
    </div>
  );
}

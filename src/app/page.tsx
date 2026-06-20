import React from 'react';
import HomePageClient from '@/components/HomePageClient';
import LanguageInitializer from '@/components/LanguageInitializer';
import { Metadata } from 'next';

const SITE_URL = 'https://www.paranjapeblueridge.com';

export const metadata: Metadata = {
  title: "Paranjape Blue Ridge Hinjewadi | Premium 2, 3, 4 & 5 BHK Integrated Township in Pune",
  description: "Paranjape Blue Ridge is Hinjewadi's premier 138-acre integrated township. Explore luxury 2, 3 & 4 BHK apartments with golf course, boat club, and walk-to-work IT park access.",
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-IN': SITE_URL,
      'mr-IN': `${SITE_URL}/mr`,
    },
  },
  openGraph: {
    title: 'Paranjape Blue Ridge Hinjewadi | Premium 2, 3, 4 & 5 BHK Integrated Township in Pune',
    description: 'Paranjape Blue Ridge is Hinjewadi\'s premier 138-acre integrated township. Explore luxury 2, 3 & 4 BHK apartments with golf course, boat club, and walk-to-work IT park access.',
    url: SITE_URL,
    siteName: 'Paranjape Blue Ridge Sovereign Portal',
    images: [{ url: `${SITE_URL}/assets/images/township-night.png`, width: 1200, height: 630, alt: 'Paranjape Blue Ridge Hinjewadi — 138-Acre Integrated Township' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ParanjapeSchemes',
    title: 'Paranjape Blue Ridge Hinjewadi | 138-Acre Integrated Township',
    description: 'Premium 2, 3 & 4 BHK residences at Hinjewadi Phase 1. Walk-to-work lifestyle with golf course and boat club.',
    images: [`${SITE_URL}/assets/images/township-night.png`],
  },
};

interface PageProps {
  searchParams?: {
    lang?: string;
  };
}

export default function Home({ searchParams }: PageProps) {
  const lang = searchParams?.lang === 'mr' ? 'mr' : 'en';

  return (
    <>
      <LanguageInitializer lang={lang} />
      {/* Homepage-only SEO content — speakable, screen-reader accessible, not repeated on other pages */}
      <div className="sr-only" aria-hidden="false">
        <h2 id="speakable-title">Paranjape Blue Ridge Hinjewadi — Premium 2, 3, 4 &amp; 5 BHK Flats in Pune&apos;s 138-Acre Township</h2>
        <p id="speakable-summary">Welcome to Paranjape Blue Ridge Pune, Pune&apos;s most celebrated 138-acre integrated township located in Hinjewadi Phase 1 near Rajiv Gandhi Infotech Park. Recognized as the top destination for Paranjape Blue Ridge apartments for sale and rent. Offering premium 2 BHK, 3 BHK, 4 BHK and 5 BHK luxury flats with a walk-to-work lifestyle. Home to The Ridges 41, The Altius, Orion, and Towers 1 to 26, it features a private 9-hole golf course, Blue Ridge Public School (ICSE) inside the township, private boat club on Mula river, and direct access to Infosys, Wipro, and TCS campuses. Compare Blue Ridge vs Life Republic or Megapolis and discover why we are the best luxury real estate investment in Pune West, just minutes from Baner, Balewadi, and the upcoming Hinjewadi Metro Station.</p>
        <ul>
          <li><a href="/paranjape-blue-ridge-promenade-hinjewadi-pune">Promenade Residences — 3 &amp; 4 BHK River-Facing Flats from ₹1.65 Cr</a></li>
          <li><a href="/paranjape-blue-ridge-altius-hinjewadi-pune">The Altius — 4 &amp; 5 BHK Ultra-Luxury Riverside Residences from ₹1.80 Cr</a></li>
          <li><a href="/paranjape-blue-ridge-41-hinjewadi-pune">Ridges 41 — 2, 3 &amp; 4 BHK High-Rise Living from ₹97.60 L</a></li>
          <li><a href="/hinjewadi-micro-market">Hinjewadi Phase 1 Micro-Market Investment Guide 2026</a></li>
          <li><a href="/insights/why-blue-ridge-hinjewadi-best-investment-2026">Why Blue Ridge is the Best Investment in 2026</a></li>
          <li><a href="/2-bhk-flats-near-infosys-hinjewadi">2 BHK Flats near Infosys Hinjewadi</a></li>
          <li><a href="/3-bhk-flats-near-infosys-hinjewadi">3 BHK Flats near Infosys Hinjewadi</a></li>
          <li><a href="/high-rental-yield-properties-in-hinjewadi-phase-1">High Rental Yield Properties in Hinjewadi Phase 1</a></li>
          <li><a href="/blue-ridge-vs-life-republic">Blue Ridge vs Life Republic Comparison</a></li>
        </ul>
        <p>MahaRERA Registration: Promenade P52100055581 | Altius P52100078116 | Ridges 41 P52100000054. Contact: +91-20-67210000. Address: Blue Ridge Township, Phase 1, Hinjewadi, Rajiv Gandhi Infotech Park, Pune - 411057, Maharashtra, India.</p>
      </div>
      <HomePageClient />
    </>
  );
}

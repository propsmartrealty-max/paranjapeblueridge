import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from 'next/font/google';
import { Suspense } from 'react';
import { headers } from 'next/headers';
import { LanguageProvider } from "@/context/LanguageContext";
import JSONLD from "@/components/JSONLD";
import StickyCTA from "@/components/StickyCTA";
import PulseNotifications from "@/components/PulseNotifications";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { TrackingProvider } from "@/components/TrackingProvider";
import { AtmosphereProvider } from "@/context/AtmosphereContext";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { WebVitalsReporter } from '@/components/WebVitalsReporter';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

import SpeculationRules from "@/components/SpeculationRules";

export const viewport: Viewport = {
  themeColor: '#0a192f',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.paranjapeblueridge.com'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  title: "Paranjape Blue Ridge Hinjewadi | Premium 2, 3, 4 & 5 BHK Integrated Township in Pune",
  description: "Paranjape Blue Ridge is Hinjewadi's premier 138-acre integrated township. Explore luxury 2, 3 & 4 BHK apartments with golf course, boat club, and walk-to-work IT park access.",
  manifest: '/manifest.json',
  verification: {
    google: [
      'zmv23601-d-KkNZ1p3VNswXKvfW57A68g_hVf1WUqFg',
      'mYpEs9cTU_oB6wg8oUlgOZ4u_hbDolVa9HyUMjZqSW4'
    ],
  },
  keywords: [
    "pune real estate market", "west pune real estate market", "hinjewadi real estate market",
    "paranjape blue ridge hinjewadi", "blue ridge hinjewadi pune", "blue ridge township pune", 
    "paranjape blue ridge apartments for sale", "paranjape blue ridge township hinjewadi",
    "paranjape schemes construction ltd projects", "138-acre township hinjewadi", 
    "blue ridge public school hinjewadi", "paranjape blue ridge reviews and ratings",
    "paranjape blue ridge floor plans", "paranjape blue ridge flat for rent",
    "the ridges 41 blue ridge", "the altius blue ridge hinjewadi", "blue ridge phase 1 resale", 
    "2 bhk flat blue ridge pune", "3 bhk luxury blue ridge pune", "blue ridge ready possession", 
    "distance from paranjape blue ridge to rajiv gandhi infotech park",
    "township near infosys hinjewadi", "riverfront flats pune", "golf course township pune",
    "blue ridge investment property", "blue ridge hinjewadi price list", "paranjape schemes pune",
    "blue ridge apartments", "invest in blue ridge hinjewadi", "blue ridge pune", "blue ridge flats",
    "blue ridge luxury apartments", "blue ridge integrated township", "blue ridge megatownship",
    "luxury apartments pune west", "premium homes pune west", "ultra luxury residences pune",
    "luxury real estate pune", "luxury apartments near metro pune", "luxury homes near IT park pune",
    "branded residences pune west", "blue ridge tower 25", "blue ridge tower 26", "orion blue ridge",
    "the ridges 41 hinjewadi", "the altius luxury residences", "blue ridge vs life republic",
    "blue ridge vs megapolis", "luxury apartments baner", "premium residences balewadi",
    "flats near TCS hinjewadi", "buy flat in blue ridge", "blue ridge resale flats",
    "blue ridge corporate rentals"
  ],
  alternates: {
    canonical: 'https://www.paranjapeblueridge.com/',
    languages: {
      'en-IN': 'https://www.paranjapeblueridge.com/',
    },
  },
  openGraph: {
    title: 'Paranjape Blue Ridge Hinjewadi | Premium 2, 3, 4 & 5 BHK Integrated Township in Pune',
    description: 'Paranjape Blue Ridge is Hinjewadi\'s premier 138-acre integrated township. Explore luxury 2, 3 & 4 BHK apartments with golf course, boat club, and walk-to-work IT park access.',
    url: 'https://www.paranjapeblueridge.com',
    siteName: 'Paranjape Blue Ridge Sovereign Portal',
    images: [{ url: 'https://www.paranjapeblueridge.com/assets/images/township-night.png', width: 1200, height: 630, alt: 'Paranjape Blue Ridge Hinjewadi — 138-Acre Integrated Township' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paranjape Blue Ridge Hinjewadi | 138-Acre Integrated Township',
    description: 'Premium 2, 3 & 4 BHK residences at Hinjewadi Phase 1. Walk-to-work lifestyle with golf course and boat club.',
    images: ['https://www.paranjapeblueridge.com/assets/images/township-night.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const country = headersList.get('x-user-country') || 'IN';

  const homepageWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.paranjapeblueridge.com/#webpage',
    'url': 'https://www.paranjapeblueridge.com/',
    'name': 'Paranjape Blue Ridge Hinjewadi | Official Sovereign Portal',
    'isPartOf': { '@id': 'https://www.paranjapeblueridge.com/#website' },
    'inLanguage': 'en-IN',
    'potentialAction': { '@type': 'ReadAction', 'target': 'https://www.paranjapeblueridge.com/' },
    'speakable': {
      '@type': 'SpeakableSpecification',
      'cssSelector': ['#speakable-title', '#speakable-summary']
    }
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'RealEstateAgent'],
    '@id': 'https://www.paranjapeblueridge.com/#organization',
    'name': 'Paranjape Blue Ridge',
    'url': 'https://www.paranjapeblueridge.com/',
    'logo': 'https://www.pscl.in/wp-content/uploads/2025/09/PARANJAPE-NEW-FINAL-LOGO.svg',
    'description': 'The premier 138-acre integrated township in the Pune Real Estate Market, offering luxury 2, 3, 4, and 5 BHK apartments in Hinjewadi Phase 1.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Blue Ridge Township, Phase 1, Hinjewadi, Rajiv Gandhi Infotech Park',
      'addressLocality': 'Pune',
      'addressRegion': 'Maharashtra',
      'postalCode': '411057',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 18.5808,
      'longitude': 73.7383
    },
    'telephone': '+91-20-67210000',
    'areaServed': [
      {
        '@type': 'City',
        'name': 'Pune'
      },
      {
        '@type': 'City',
        'name': 'Hinjewadi'
      }
    ],
    'priceRange': '₹97.60 Lakhs - ₹3.50 Crores',
    'sameAs': [
      'https://www.facebook.com/ParanjapeSchemes/',
      'https://www.instagram.com/paranjapeschemes/',
      'https://www.youtube.com/user/ParanjapeSchemes',
      'https://en.wikipedia.org/wiki/Hinjawadi',
      'https://en.wikipedia.org/wiki/Rajiv_Gandhi_Infotech_Park'
    ]
  };


  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <link rel="dns-prefetch" href="https://www.pscl.in" />
        <link rel="preconnect" href="https://www.pscl.in" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Maps iframe preconnect — prevents 300ms DNS on scroll-to-map */}
        <link rel="preconnect" href="https://maps.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />
        {/* Vercel edge network preconnect */}
        <link rel="preconnect" href="https://vercel.live" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        {/* LCP hero image preload — prevents render-blocking image fetch */}
        <link rel="preload" as="image" href="/assets/images/real-township-day.jpg" fetchPriority="high" />
        {/* PSEO hero LCP image preload */}
        <link rel="preload" as="image" href="/assets/images/master-hero-v4.png" fetchPriority="high" />
        {/* Secondary hero image preload — above-fold atmosphere variant */}
        <link rel="preload" as="image" href="/assets/images/township-night.png" />
        {/* RSS feed discovery */}
        <link rel="alternate" type="application/rss+xml" title="Paranjape Blue Ridge Insights" href="https://www.paranjapeblueridge.com/feed.xml" />
        <JSONLD pathname="/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageWebPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        <SpeculationRules />
      </head>
      <body className="antialiased" data-country={country}>
        <LanguageProvider>
          <AtmosphereProvider>
            <Suspense fallback={null}>
              <TrackingProvider>
                <div className="fixed top-0 left-0 right-0 z-[100] bg-[var(--bg)]/80 text-text-light/80 text-[9px] sm:text-[10px] py-1.5 px-4 sm:px-8 flex justify-center sm:justify-end items-center gap-4 border-b border-gold/10 font-medium tracking-[2px] uppercase backdrop-blur-md">
                  <span><strong className="text-gilded">MahaRERA Registration Numbers:</strong></span>
                  <span className="hidden sm:inline">Promenade: P52100055581</span>
                  <span className="hidden sm:inline">Altius: P52100078116</span>
                  <span className="hidden sm:inline">Ridge 41: P52100000054</span>
                  <span className="sm:hidden">P52100055581 | P52100078116 | P52100000054</span>
                </div>
                {/* Server-rendered SEO content — screen-reader accessible, not cloaking */}
                <div
                  className="sr-only"
                  aria-hidden="false"
                >
                  <h1 id="speakable-title">Paranjape Blue Ridge Hinjewadi — Premium 2, 3, 4 &amp; 5 BHK Flats in Pune's 138-Acre Township</h1>
                  <p id="speakable-summary">Welcome to Paranjape Blue Ridge Pune, Pune's most celebrated 138-acre integrated township located in Hinjewadi Phase 1 near Rajiv Gandhi Infotech Park. Recognized as the top destination for Paranjape Blue Ridge apartments for sale and rent. Offering premium 2 BHK, 3 BHK, 4 BHK and 5 BHK luxury flats with a walk-to-work lifestyle. Home to The Ridges 41, The Altius, Orion, and Towers 1 to 26, it features a private 9-hole golf course, Blue Ridge Public School (ICSE) inside the township, private boat club on Mula river, and direct access to Infosys, Wipro, and TCS campuses. Compare Blue Ridge vs Life Republic or Megapolis and discover why we are the best luxury real estate investment in Pune West, just minutes from Baner, Balewadi, and the upcoming Hinjewadi Metro Station.</p>
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
                <div className="architect-grid"></div>
                {children}
                <StickyCTA />
                <PulseNotifications />
                <ExitIntentPopup />
                <FloatingWhatsApp />
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful');
                  }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
          }}
        />
              </TrackingProvider>
            </Suspense>
          </AtmosphereProvider>
        </LanguageProvider>
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
        <GoogleTagManager gtmId="GTM-XXXXXXX" />
        <WebVitalsReporter />
      </body>
    </html>
  );
}

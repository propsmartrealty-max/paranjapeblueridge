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
    canonical: 'https://www.paranjapeblueridge.com',
    languages: {
      'en-IN': 'https://www.paranjapeblueridge.com',
      'mr-IN': 'https://www.paranjapeblueridge.com',
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
    site: '@ParanjapeSchemes',
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
  const pathname = headersList.get('x-pathname') || '';
  const isMarathi = pathname.startsWith('/mr-') || pathname.includes('/mr-');
  const lang = isMarathi ? 'mr' : 'en';

  return (
    <html lang={lang} className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <link rel="dns-prefetch" href="https://www.pscl.in" />
        <link rel="preconnect" href="https://www.pscl.in" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Analytics & Tag Manager preconnect */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        {/* Google Maps iframe preconnect — prevents 300ms DNS on scroll-to-map */}
        <link rel="preconnect" href="https://maps.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />
        {/* Vercel edge network preconnect */}
        <link rel="preconnect" href="https://vercel.live" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        {/* RSS feed discovery */}
        <link rel="alternate" type="application/rss+xml" title="Paranjape Blue Ridge Insights" href="https://www.paranjapeblueridge.com/feed.xml" />
        <JSONLD pathname="/" />
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
        {process.env.NEXT_PUBLIC_GA_ID && process.env.NEXT_PUBLIC_GA_ID !== "G-XXXXXXXXXX" && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {process.env.NEXT_PUBLIC_GTM_ID && process.env.NEXT_PUBLIC_GTM_ID !== "GTM-XXXXXXX" && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <WebVitalsReporter />
      </body>
    </html>
  );
}

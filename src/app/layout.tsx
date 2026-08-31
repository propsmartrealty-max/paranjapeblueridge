import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from 'next/font/google';
import { Suspense } from 'react';
import SpeculationRules from "@/components/SpeculationRules";
import { LanguageProvider } from "@/context/LanguageContext";
import JSONLD from "@/components/JSONLD";
import SeoHead from "@/components/SeoHead";
import StickyCTA from "@/components/StickyCTA";
import PulseNotifications from "@/components/PulseNotifications";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { TrackingProvider } from "@/components/TrackingProvider";
import { AtmosphereProvider } from "@/context/AtmosphereContext";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { WebVitalsReporter } from '@/components/WebVitalsReporter';
import ParanjapeEcosystemInjector from '@/components/ParanjapeEcosystemInjector';

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

export const viewport: Viewport = {
  themeColor: '#f6f3eb',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://paranjapeblueridge.com'),
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
    // Core Brand Dominance
    "paranjape blue ridge", "paranjape blue ridge hinjewadi", "paranjape blue ridge township hinjewadi",
    "paranjape schemes pune", "paranjape schemes construction ltd projects", "blue ridge hinjewadi pune",
    "blue ridge township pune", "paranjape blue ridge apartments for sale", "blue ridge pune",
    "blue ridge integrated township", "blue ridge megatownship", "blue ridge hinjewadi price list",
    
    // Cluster Dominance: Promenade
    "paranjape blue ridge promenade hinjewadi pune", "blue ridge promenade price list",
    "promenade residences blue ridge", "promenade river facing flats hinjewadi", "promenade 3 bhk blue ridge",
    "promenade 4 bhk blue ridge", "paranjape promenade floor plan", "tallest tower in hinjewadi",
    
    // Cluster Dominance: The Altius
    "paranjape blue ridge altius hinjewadi pune", "the altius blue ridge hinjewadi",
    "the altius luxury residences", "blue ridge altius floor plan", "blue ridge altius price list",
    "4 bhk river facing flats in hinjewadi", "5 bhk ultra luxury flats pune west", "altius paranjape schemes",
    
    // Cluster Dominance: Ridges 41
    "paranjape blue ridge 41 hinjewadi pune", "the ridges 41 hinjewadi", "ridges 41 blue ridge",
    "ridges 41 floor plan hinjewadi", "ridges 41 price list", "2 bhk smart homes blue ridge",
    "mivan construction projects in hinjewadi", "blue ridge phase 1 resale", "ready possession flats in blue ridge",
    
    // Legacy Clusters
    "orion blue ridge", "blue ridge tower 25", "blue ridge tower 26", "blue ridge the groves",
    
    // Pune Real Estate Macro Market
    "pune real estate market", "pune real estate investment", "buy apartment in pune",
    "pune residential market", "pune premium residences", "pune luxury living",
    "pune township projects", "best real estate investment pune", "ready possession flats pune",
    "rera approved projects pune", "branded residences pune", "pune property investment",
    
    // West Pune & Hinjewadi Micro Market
    "west pune real estate market", "hinjewadi real estate market", "luxury apartments pune west",
    "premium homes pune west", "ultra luxury residences pune", "luxury real estate pune",
    "luxury apartments baner", "premium residences balewadi", "buy flat in blue ridge hinjewadi",
    
    // IT & Walk-to-Work High Intent
    "distance from paranjape blue ridge to rajiv gandhi infotech park", "township near infosys hinjewadi",
    "flats near TCS hinjewadi", "walk to work flats hinjewadi", "luxury homes near IT park pune",
    "corporate rentals hinjewadi", "best corporate housing hinjewadi", "flats near wipro hinjewadi phase 1",
    
    // Infrastructure & Metro Connected
    "pune metro connected homes", "hinjewadi metro line 3 impact", "flats near hinjewadi metro station",
    "mahalunge hinjewadi bridge connectivity", "pune mumbai expressway access hinjewadi",
    
    // Township Lifestyle & Amenities
    "138-acre township hinjewadi", "blue ridge public school hinjewadi", "flats with school inside township pune",
    "flats with golf course pune", "apartments with boat club pune", "riverfront flats pune",
    "gated community hinjewadi pune", "swimming pool apartments hinjewadi pune", "pet friendly apartments hinjewadi",
    "golf course township pune", "eco friendly apartments pune", "smart homes pune",
    
    // Competitor Battleground Intent (Capturing Competitor Searches)
    "blue ridge vs life republic", "blue ridge vs megapolis", "best township in hinjewadi",
    "best township in pune comparison", "blue ridge vs vtp blue waters", "blue ridge vs lodha belmondo",
    "blue ridge vs godrej hinjewadi", "blue ridge vs kohinoor central park",
    
    // Transactional & Buyer Intent
    "paranjape blue ridge flat for rent", "2 bhk flat blue ridge pune", "3 bhk luxury blue ridge pune",
    "blue ridge ready possession", "blue ridge investment property", "blue ridge apartments",
    "blue ridge flats", "buy flat in blue ridge", "blue ridge resale flats",
    "paranjape blue ridge resale price", "blue ridge inventory available", "blue ridge property for sale",
    "nri investment property pune hinjewadi", "pune property appreciation", "ready possession flats hinjewadi 2026"
  ],
  alternates: {
    canonical: 'https://paranjapeblueridge.com',
    languages: {
      'x-default': 'https://paranjapeblueridge.com',
      'en-IN': 'https://paranjapeblueridge.com',
      'en-US': 'https://paranjapeblueridge.com',
      'en-GB': 'https://paranjapeblueridge.com',
      'en-AE': 'https://paranjapeblueridge.com',
      'mr-IN': 'https://paranjapeblueridge.com/mr',
    },
  },
  openGraph: {
    locale: 'en_IN',
    alternateLocale: ['mr_IN'],
    title: 'Paranjape Blue Ridge Hinjewadi | Premium 2, 3, 4 & 5 BHK Integrated Township in Pune',
    description: 'Paranjape Blue Ridge is Hinjewadi\'s premier 138-acre integrated township. Explore luxury 2, 3 & 4 BHK apartments with golf course, boat club, and walk-to-work IT park access.',
    url: 'https://paranjapeblueridge.com',
    siteName: 'Paranjape Blue Ridge Sovereign Portal',
    images: [{ url: 'https://paranjapeblueridge.com/api/og?title=Paranjape%20Blue%20Ridge&type=Sovereign%20Portal', width: 1200, height: 630, alt: 'Paranjape Blue Ridge Hinjewadi — 138-Acre Integrated Township' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ParanjapeSchemes',
    title: 'Paranjape Blue Ridge Hinjewadi | 138-Acre Integrated Township',
    description: 'Premium 2, 3 & 4 BHK residences at Hinjewadi Phase 1. Walk-to-work lifestyle with golf course and boat club.',
    images: ['https://paranjapeblueridge.com/api/og?title=Paranjape%20Blue%20Ridge&type=Sovereign%20Portal'],
  },
  appleWebApp: {
    capable: true,
    title: 'Blue Ridge',
    statusBarStyle: 'black-translucent',
    startupImage: [
      'https://paranjapeblueridge.com/assets/images/township-night.png',
    ],
  },
};

import { headers } from 'next/headers';
import { CurrencyProvider } from '@/context/CurrencyContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const userCountry = headersList.get('x-user-country') || 'IN';
  
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `if (window.location.pathname.startsWith('/mr')) document.documentElement.lang = 'mr-IN';` }} />
        {/* Google Consent Mode v2 Initialization (Mandatory for Google Ads & GA4 Compliance) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted',
                'functionality_storage': 'granted',
                'personalization_storage': 'granted',
                'security_storage': 'granted',
                'wait_for_update': 500
              });
            `,
          }}
        />
        <link rel="dns-prefetch" href="https://www.pscl.in" />
        <link rel="preconnect" href="https://www.pscl.in" crossOrigin="anonymous" />
        {/* Google Fonts are automatically preconnected and optimized via next/font/google */}
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
        {/* Google Ads & DoubleClick preconnect */}
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://www.googleadservices.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googleadservices.com" />
        {/* Cloudflare Turnstile preconnect */}
        <link rel="preconnect" href="https://challenges.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://challenges.cloudflare.com" />
        {/* Vercel edge network preconnect */}
        <link rel="preconnect" href="https://vercel.live" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        <link rel="alternate" type="application/rss+xml" title="Paranjape Blue Ridge Insights" href="https://paranjapeblueridge.com/feed.xml" />
        <link rel="preload" as="image" href="/assets/images/real-township-day.jpg" fetchPriority="high" />
        <SeoHead pathname="/" />
      </head>
      <body className="antialiased bg-ambient-orbs" data-country={userCountry}>
        <CurrencyProvider initialCountry={userCountry}>
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
                <ParanjapeEcosystemInjector />
                <StickyCTA />
                <PulseNotifications />
                <ExitIntentPopup />
                <FloatingWhatsApp />
        {/* Resource Preconnects for Core Web Vitals (LCP/INP) optimization */}
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
        </CurrencyProvider>
        {process.env.NEXT_PUBLIC_GA_ID && process.env.NEXT_PUBLIC_GA_ID !== "G-XXXXXXXXXX" && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {process.env.NEXT_PUBLIC_GTM_ID && process.env.NEXT_PUBLIC_GTM_ID !== "GTM-XXXXXXX" && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        {process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}', { 'allow_enhanced_conversions': true });`
            }}
          />
        )}
        <WebVitalsReporter />
      </body>
    </html>
  );
}

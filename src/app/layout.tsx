import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from 'next/font/google';
import { Suspense } from 'react';
import { LanguageProvider } from "@/context/LanguageContext";
import JSONLD from "@/components/JSONLD";
import StickyCTA from "@/components/StickyCTA";
import PulseNotifications from "@/components/PulseNotifications";

import { TrackingProvider } from "@/components/TrackingProvider";
import { AtmosphereProvider } from "@/context/AtmosphereContext";

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

export const metadata: Metadata = {
  metadataBase: new URL('https://paranjapeblueridge.com'),
  title: "Paranjape Blue Ridge Hinjewadi | Official Sovereign Portal - 2, 3 & 4 BHK Luxury Flats",
  description: "Experience the grand 138-acre integrated township at Paranjape Blue Ridge Hinjewadi Phase 1. Discover The Altius, Ridges 41, and Promenade Residences. Premium riverfront apartments near Rajiv Gandhi Infotech Park with a 9-hole golf course. Book your site visit today.",
  verification: {
    google: 'zmv23601-d-KkNZ1p3VNswXKvfW57A68g_hVf1WUqFg',
  },
  keywords: [
    "paranjape blue ridge hinjewadi", "blue ridge hinjewadi pune", "blue ridge township pune", 
    "the ridges 41 blue ridge", "the altius blue ridge hinjewadi", "blue ridge phase 1 resale", 
    "2 bhk flat blue ridge pune", "3 bhk luxury blue ridge pune", "blue ridge ready possession", 
    "township near infosys hinjewadi", "riverfront flats pune", "golf course township pune",
    "blue ridge investment property", "blue ridge hinjewadi price list", "paranjape schemes pune"
  ],
  alternates: {
    canonical: 'https://paranjapeblueridge.com',
  },
  openGraph: {
    title: 'Paranjape Blue Ridge Hinjewadi | 138-Acre Integrated Township',
    description: 'Explore premium 2, 3 & 4 BHK residences at Hinjewadi Phase 1. Walk-to-work lifestyle with a private boat club and golf course.',
    url: 'https://paranjapeblueridge.com',
    siteName: 'Paranjape Blue Ridge Sovereign Portal',
    images: [{ url: '/assets/images/township-night.png' }],
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <JSONLD />
      </head>
      <body className="antialiased">
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

              </TrackingProvider>
            </Suspense>
          </AtmosphereProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

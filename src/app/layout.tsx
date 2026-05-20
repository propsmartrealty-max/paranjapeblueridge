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
  metadataBase: new URL('https://www.paranjapeblueridge.com'),
  title: "Paranjape Blue Ridge Hinjewadi | Official Sovereign Portal - 2, 3 & 4 BHK Luxury Flats",
  description: "Experience the grand 138-acre integrated township at Paranjape Blue Ridge Hinjewadi Phase 1. Discover The Altius, Ridges 41, and Promenade Residences. Premium riverfront apartments near Rajiv Gandhi Infotech Park with a 9-hole golf course. Book your site visit today.",
  verification: {
    google: [
      'zmv23601-d-KkNZ1p3VNswXKvfW57A68g_hVf1WUqFg',
      'mYpEs9cTU_oB6wg8oUlgOZ4u_hbDolVa9HyUMjZqSW4'
    ],
  },
  keywords: [
    "paranjape blue ridge hinjewadi", "blue ridge hinjewadi pune", "blue ridge township pune", 
    "the ridges 41 blue ridge", "the altius blue ridge hinjewadi", "blue ridge phase 1 resale", 
    "2 bhk flat blue ridge pune", "3 bhk luxury blue ridge pune", "blue ridge ready possession", 
    "township near infosys hinjewadi", "riverfront flats pune", "golf course township pune",
    "blue ridge investment property", "blue ridge hinjewadi price list", "paranjape schemes pune"
  ],
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': 'https://www.paranjapeblueridge.com/',
      'mr-IN': 'https://www.paranjapeblueridge.com/regional-mr',
    },
  },
  openGraph: {
    title: 'Paranjape Blue Ridge Hinjewadi | 138-Acre Integrated Township',
    description: 'Explore premium 2, 3 & 4 BHK residences at Hinjewadi Phase 1. Walk-to-work lifestyle with a private boat club and golf course.',
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
  const homepageWebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.paranjapeblueridge.com/#webpage',
    'url': 'https://www.paranjapeblueridge.com/',
    'name': 'Paranjape Blue Ridge Hinjewadi | Official Sovereign Portal',
    'isPartOf': { '@id': 'https://www.paranjapeblueridge.com/#website' },
    'inLanguage': 'en-IN',
    'potentialAction': { '@type': 'ReadAction', 'target': 'https://www.paranjapeblueridge.com/' },
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <link rel="dns-prefetch" href="https://www.pscl.in" />
        <link rel="preconnect" href="https://www.pscl.in" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* LCP hero image preload — prevents render-blocking image fetch */}
        <link rel="preload" as="image" href="/assets/images/real-township-day.jpg" fetchPriority="high" />
        {/* RSS feed discovery */}
        <link rel="alternate" type="application/rss+xml" title="Paranjape Blue Ridge Insights" href="https://www.paranjapeblueridge.com/feed.xml" />
        <JSONLD pathname="/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageWebPageSchema) }}
        />
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
                {/* Server-rendered SEO content for homepage — crawlable by Googlebot on first pass */}
                <div
                  style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: 0,
                    margin: '-1px',
                    overflow: 'hidden',
                    clip: 'rect(0,0,0,0)',
                    whiteSpace: 'nowrap',
                    borderWidth: 0,
                  }}
                >
                  <h1>Paranjape Blue Ridge Hinjewadi — Premium 2, 3 &amp; 4 BHK Luxury Flats in 138-Acre Integrated Township</h1>
                  <p>Welcome to Paranjape Blue Ridge, Pune&apos;s most celebrated 138-acre integrated township in Hinjewadi Phase 1, Rajiv Gandhi Infotech Park. Offering premium 2 BHK, 3 BHK, 4 BHK and 5 BHK luxury flats with walk-to-work lifestyle, private 9-hole golf course, ICSE school inside township, private boat club on Mula river, and direct access to Infosys, Wipro, and TCS campuses.</p>
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
              </TrackingProvider>
            </Suspense>
          </AtmosphereProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

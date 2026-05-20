import { Metadata } from "next";
import JSONLD from "@/components/JSONLD";

const SITE_URL = 'https://www.paranjapeblueridge.com';
const OG_IMAGE = `${SITE_URL}/assets/images/township-night.png`;

export const metadata: Metadata = {
  title: "Hinjewadi Phase 1 Micro-Market Guide 2026 | Investment & Connectivity Analysis",
  description: "Complete guide to Hinjewadi Phase 1 real estate: capital appreciation trends, IT workforce depth, Metro Line 3 impact, and why Blue Ridge leads the micro-market with 4-5% rental yields.",
  alternates: {
    canonical: `${SITE_URL}/hinjewadi-micro-market`,
  },
  openGraph: {
    title: 'Hinjewadi Phase 1 Micro-Market Guide 2026 | Paranjape Blue Ridge',
    description: 'Complete guide to Hinjewadi Phase 1 real estate: capital appreciation, Metro Line 3, and rental yields.',
    url: `${SITE_URL}/hinjewadi-micro-market`,
    type: 'article',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Hinjewadi Phase 1 Micro-Market Guide' }],
    siteName: 'Paranjape Blue Ridge Sovereign Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hinjewadi Phase 1 Micro-Market Guide 2026',
    description: 'Capital appreciation trends, Metro Line 3 impact, and investment analysis for Hinjewadi Phase 1.',
    images: [OG_IMAGE],
  },
};

export default function MicroMarketLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JSONLD pathname="/hinjewadi-micro-market" />
      {children}
    </>
  );
}


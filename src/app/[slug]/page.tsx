import React from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import { Metadata } from 'next';
import { projects } from '@/data/master-data';
import { generatePseoUrls } from '@/data/seo-matrix';
import PseoLandingPage from '@/components/PseoLandingPage';
import SlugPageClient from '@/components/SlugPageClient';
import LanguageInitializer from '@/components/LanguageInitializer';
import MicroMarketGuide from '@/app/hinjewadi-micro-market/page';

const SITE_URL = 'https://www.paranjapeblueridge.com';

interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    lang?: string;
  };
}

export async function generateStaticParams() {
  const allUrls = generatePseoUrls();
  const projectSlugs = projects.map(p => ({ slug: p.slug }));
  const mrProjectSlugs = projects.map(p => ({ slug: `mr-${p.slug}` }));
  const pseoSlugs = allUrls.map(u => ({ slug: u.slug }));
  return [
    ...projectSlugs,
    ...mrProjectSlugs,
    ...pseoSlugs,
    { slug: 'mr-hinjewadi-micro-market' }
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;

  if (slug === 'mr-hinjewadi-micro-market') {
    const title = 'हिंजवडी फेज १ मायक्रो-मार्केट मार्गदर्शक | परंजपे ब्लू रिज';
    const description = 'हिंजवडी फेज १ मधील रिअल इस्टेट मार्केट, गुंतवणूक परतावा, मेट्रो लाईन ३ आणि परंजपे् ब्लू रिज बद्दल संपूर्ण मार्गदर्शक.';
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/mr-hinjewadi-micro-market`,
        languages: {
          'en-IN': `${SITE_URL}/hinjewadi-micro-market`,
          'mr-IN': `${SITE_URL}/mr-hinjewadi-micro-market`,
        },
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/mr-hinjewadi-micro-market`,
        siteName: 'Paranjape Blue Ridge Sovereign Portal',
        images: [{ url: `${SITE_URL}/assets/images/township-night.png`, width: 1200, height: 630, alt: title }],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@ParanjapeSchemes',
        title,
        description,
        images: [`${SITE_URL}/assets/images/township-night.png`],
      },
    };
  }

  const isMrProject = slug.startsWith('mr-') && projects.some(p => `mr-${p.slug}` === slug);
  const projectSlug = isMrProject ? slug.replace(/^mr-/, '') : slug;

  const allUrls = generatePseoUrls();
  const pseoData = allUrls.find(u => u.slug === slug);
  const project = projects.find(p => p.slug === projectSlug);

  // Resolve location name for geo tags
  const geoPlacename = slug.includes('hinjewadi') ? 'Hinjewadi, Pune, Maharashtra'
    : slug.includes('wakad') ? 'Wakad, Pune, Maharashtra'
    : slug.includes('baner') ? 'Baner, Pune, Maharashtra'
    : slug.includes('balewadi') ? 'Balewadi, Pune, Maharashtra'
    : slug.includes('pune') ? 'Pune, Maharashtra'
    : 'Hinjewadi, Pune, Maharashtra';

  if (pseoData) {
    const title = `${pseoData.title} | Paranjape Blue Ridge Hinjewadi Pune`;
    // Silo-specific descriptions for uniqueness — avoids near-duplicate meta across 1500+ pages
    const siloDescriptions: Record<string, string> = {
      'corporate': `${pseoData.intent} at Paranjape Blue Ridge — Hinjewadi's only 138-acre walk-to-work township. Zero commute to Infosys, Wipro & TCS. 2, 3 & 4 BHK flats. MahaRERA certified.`,
      'infrastructure': `${pseoData.intent} — Paranjape Blue Ridge offers Metro Line 3 connectivity, 800m from nearest station. Premium 2, 3 & 4 BHK integrated township flats in Hinjewadi Phase 1, Pune.`,
      'investor': `${pseoData.intent} at Blue Ridge Hinjewadi — 4-5% rental yield & 12% annual capital appreciation. Pune's best ROI property. 2, 3 & 4 BHK flats. MahaRERA P52100055581.`,
      'battleground': `${pseoData.intent} — Honest comparison: 138-acre Blue Ridge vs alternatives. Golf course, private boat club, ICSE school, walk-to-work SEZ. Prices from ₹97.60L. MahaRERA certified.`,
      'price-list': `${pseoData.intent} — Official 2026 pricing for Blue Ridge Hinjewadi. 2 BHK from ₹97.60L, 3 BHK from ₹1.65Cr, 4 BHK from ₹1.80Cr. RERA registered. Call +91-20-67210000.`,
      'floor-plan': `${pseoData.intent} — Download RERA-verified floor plans for Blue Ridge Hinjewadi. Carpet areas: 2 BHK 793 sq ft, 3 BHK 1250 sq ft, 4 BHK 1592 sq ft. Paranjape Schemes official.`,
      'amenities': `${pseoData.intent} at Blue Ridge Hinjewadi — 9-hole golf course, private boat club, ICSE school, infinity pool, SEZ. Hinjewadi's most complete integrated township. MahaRERA certified.`,
      'ecosystem': `${pseoData.intent} at Paranjape Blue Ridge — Golf course, riverfront boat club & ICSE school in one 138-acre township. Premium 2, 3 & 4 BHK flats in Hinjewadi Phase 1, Pune.`,
      'infra-guide': `${pseoData.intent} — Expert guide by Blue Ridge Hinjewadi's official portal. Infrastructure data, connectivity maps & property impact analysis for Pune's #1 township.`,
      'pune-macro': `${pseoData.intent} — Paranjape Blue Ridge: Pune's premier 138-acre integrated township. Golf course, boat club, ICSE school. 2, 3 & 4 BHK luxury residences in Hinjewadi Phase 1.`,
    };
    const description = siloDescriptions[pseoData.silo] || `Find ${pseoData.intent} at Paranjape Blue Ridge — Pune's premier 138-acre integrated township in Hinjewadi Phase 1. Premium 2, 3 & 4 BHK flats. Golf course, boat club, ICSE school. MahaRERA registered. Call +91-20-67210000.`;

    const isMr = slug.startsWith('mr-');
    const altSlug = isMr ? slug.replace(/^mr-/, '') : `mr-${slug}`;
    const hasAlternate = allUrls.some(item => item.slug === altSlug);

    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/${slug}`,
        ...(hasAlternate ? {
          languages: {
            'en-IN': isMr ? `${SITE_URL}/${altSlug}` : `${SITE_URL}/${slug}`,
            'mr-IN': isMr ? `${SITE_URL}/${slug}` : `${SITE_URL}/${altSlug}`,
          }
        } : {}),
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/${slug}`,
        siteName: 'Paranjape Blue Ridge Sovereign Portal',
        images: [
          {
            url: `${SITE_URL}/assets/images/township-night.png`,
            width: 1200,
            height: 630,
            alt: pseoData.title,
          },
        ],
        type: 'website',
        locale: 'en_IN',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@ParanjapeSchemes',
        title,
        description,
        images: [`${SITE_URL}/assets/images/township-night.png`],
      },
      other: {
        'geo.region': 'IN-MH',
        'geo.placename': geoPlacename,
        'geo.position': '18.5786825;73.7370331',
        'ICBM': '18.5786825, 73.7370331',
        'DC.title': title,
        'DC.description': description,
        'DC.subject': pseoData.intent,
        'DC.coverage': geoPlacename,
        'DC.language': 'en-IN',
      },
    };
  }

  if (project) {
    const isMr = slug.startsWith('mr-');
    const title = isMr
      ? `${project.name} | परंजपे ब्लू रिज हिंजवडी - लक्झरी अपार्टमेंट्स`
      : `${project.name} | Paranjape Blue Ridge Hinjewadi - ${project.configurations.map(c => c.title.split(' ')[0] + ' ' + c.title.split(' ')[1]).join(', ')} Flats`;
    const description = isMr
      ? `${project.descriptionMr || project.description}`
      : `${project.description.slice(0, 155)}...`;

    const cleanEnSlug = isMr ? slug.replace(/^mr-/, '') : slug;
    const cleanMrSlug = isMr ? slug : `mr-${slug}`;

    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/${slug}`,
        languages: {
          'en-IN': `${SITE_URL}/${cleanEnSlug}`,
          'mr-IN': `${SITE_URL}/${cleanMrSlug}`,
        },
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/${slug}`,
        siteName: 'Paranjape Blue Ridge Sovereign Portal',
        images: [
          {
            url: `${SITE_URL}/assets/images/township-night.png`,
            width: 1200,
            height: 630,
            alt: project.name,
          },
        ],
        type: 'website',
        locale: isMr ? 'mr_IN' : 'en_IN',
      },
      twitter: {
        card: 'summary_large_image',
        site: '@ParanjapeSchemes',
        title,
        description,
        images: [`${SITE_URL}/assets/images/township-night.png`],
      },
      other: {
        'geo.region': 'IN-MH',
        'geo.placename': 'Hinjewadi Phase 1, Pune, Maharashtra',
        'geo.position': `${project.geo.latitude};${project.geo.longitude}`,
        'ICBM': `${project.geo.latitude}, ${project.geo.longitude}`,
        'DC.title': title,
        'DC.description': description,
        'DC.language': isMr ? 'mr-IN' : 'en-IN',
      },
    };
  }

  return {};
}

export default function ProjectSilo({ params, searchParams }: PageProps) {
  const { slug } = params;

  if (slug === 'mr-hinjewadi-micro-market') {
    return <MicroMarketGuide searchParams={{ lang: 'mr' }} />;
  }

  const isMrProject = slug.startsWith('mr-') && projects.some(p => `mr-${p.slug}` === slug);
  const projectSlug = isMrProject ? slug.replace(/^mr-/, '') : slug;

  const project = projects.find(p => p.slug === projectSlug);
  const allUrls = generatePseoUrls();
  const pseoData = allUrls.find(u => u.slug === slug);

  if (!project && !pseoData) {
    const potentialNewSlug = `${slug}-paranjape-blue-ridge-township-hinjewadi`;
    const newPseoData = allUrls.find(u => u.slug === potentialNewSlug);
    if (newPseoData) {
      permanentRedirect(`/${potentialNewSlug}`);
    }
    return notFound();
  }

  if (pseoData) {
    return <PseoLandingPage pageData={pseoData} />;
  }

  return (
    <>
      <LanguageInitializer lang={isMrProject ? 'mr' : 'en'} />
      <SlugPageClient slug={projectSlug} />
    </>
  );
}

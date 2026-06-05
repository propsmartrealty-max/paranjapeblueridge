import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { projects } from '@/data/master-data';
import { generatePseoUrls } from '@/data/seo-matrix';
import PseoLandingPage from '@/components/PseoLandingPage';
import SlugPageClient from '@/components/SlugPageClient';

const SITE_URL = 'https://www.paranjapeblueridge.com';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const allUrls = generatePseoUrls();
  const projectSlugs = projects.map(p => ({ slug: p.slug }));
  const pseoSlugs = allUrls.map(u => ({ slug: u.slug }));
  return [...projectSlugs, ...pseoSlugs];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;
  const allUrls = generatePseoUrls();
  const pseoData = allUrls.find(u => u.slug === slug);
  const project = projects.find(p => p.slug === slug);

  // Resolve location name for geo tags
  const geoPlacename = slug.includes('hinjewadi') ? 'Hinjewadi, Pune, Maharashtra'
    : slug.includes('wakad') ? 'Wakad, Pune, Maharashtra'
    : slug.includes('baner') ? 'Baner, Pune, Maharashtra'
    : slug.includes('balewadi') ? 'Balewadi, Pune, Maharashtra'
    : slug.includes('pune') ? 'Pune, Maharashtra'
    : 'Hinjewadi, Pune, Maharashtra';

  if (pseoData) {
    const title = `${pseoData.title} | Paranjape Blue Ridge Hinjewadi`;
    const description = `Find ${pseoData.intent} at Paranjape Blue Ridge — Pune's premier 138-acre integrated township in Hinjewadi Phase 1. Premium 2, 3 & 4 BHK flats. Golf course, boat club, ICSE school. MahaRERA registered. Call +91-20-67210000.`;

    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/${slug}`,
        siteName: 'Paranjape Blue Ridge',
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
    const title = `${project.name} | Paranjape Blue Ridge Hinjewadi — ${project.tagline}`;
    const description = project.description.slice(0, 155) + '...';

    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/${slug}`,
        siteName: 'Paranjape Blue Ridge',
        images: [
          {
            url: `${SITE_URL}/assets/images/township-night.png`,
            width: 1200,
            height: 630,
            alt: project.name,
          },
        ],
        type: 'website',
        locale: 'en_IN',
      },
      twitter: {
        card: 'summary_large_image',
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
        'DC.language': 'en-IN',
      },
    };
  }

  return {};
}

export default function ProjectSilo({ params }: PageProps) {
  const { slug } = params;

  const project = projects.find(p => p.slug === slug);
  const allUrls = generatePseoUrls();
  const pseoData = allUrls.find(u => u.slug === slug);

  if (!project && !pseoData) return notFound();

  if (pseoData) {
    return <PseoLandingPage pageData={pseoData} />;
  }

  return <SlugPageClient slug={slug} />;
}

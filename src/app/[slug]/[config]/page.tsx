export const runtime = 'edge';
import { Metadata } from 'next';
import { projects } from '@/data/master-data';
import { notFound } from 'next/navigation';
import ConfigPageClient from './ConfigPageClient';

const SITE_URL = 'https://paranjapeblueridge.com';

// Pre-render all config sub-pages as static HTML at build time
export async function generateStaticParams() {
  return projects.flatMap(p =>
    (p.configurations || []).map(c => ({
      slug: p.slug,
      config: c.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; config: string };
}): Promise<Metadata> {
  const isMarathi = params.slug.startsWith('mr-');
  const englishSlug = isMarathi ? params.slug.replace(/^mr-/, '') : params.slug;
  
  const project = projects.find(p => p.slug === englishSlug);
  if (!project) return {};

  const configuration = project.configurations?.find(c => c.slug === params.config);
  if (!configuration) return {};

  const title = isMarathi 
    ? `${configuration.title} in ${project.name} | परांजपे ब्लू रिज हिंजवडी — ${configuration.price || project.price}`
    : `${configuration.title} in ${project.name} | Paranjape Blue Ridge Hinjewadi — ${configuration.price || project.price}`;
    
  const description = isMarathi
    ? `Official ${configuration.title} details at ${project.name}, Paranjape Blue Ridge Hinjewadi Phase 1. Carpet area: ${configuration.carpetArea || project.carpetArea}. Price: ${configuration.price || project.price}. MahaRERA: ${project.reraNumber}.`
    : `Official ${configuration.title} details at ${project.name}, Paranjape Blue Ridge Hinjewadi Phase 1. Carpet area: ${configuration.carpetArea || project.carpetArea}. Price: ${configuration.price || project.price}. MahaRERA: ${project.reraNumber}. Download floor plan or book a site visit.`;
    
  const canonical = `${SITE_URL}/${params.slug}/${params.config}`;

  return {
    title,
    description,
    alternates: { 
      canonical,
      languages: {
        'x-default': `${SITE_URL}/${englishSlug}/${params.config}`,
        'en-IN': `${SITE_URL}/${englishSlug}/${params.config}`,
        'mr-IN': `${SITE_URL}/mr-${englishSlug}/${params.config}`
      }
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      images: [{
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(configuration.title)}&config=${encodeURIComponent(project.name)}`,
        width: 1200,
        height: 630,
        alt: `${configuration.title} — ${project.name}, Paranjape Blue Ridge`,
      }],
      siteName: 'Paranjape Blue Ridge Sovereign Portal',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ParanjapeSchemes',
      title,
      description,
      images: [`${SITE_URL}/api/og?title=${encodeURIComponent(configuration.title)}&config=${encodeURIComponent(project.name)}`],
    },
  };
}

// Server component wrapper — metadata is server-side; interactive UI is client-side
export default function ConfigPage({ params }: { params: { slug: string; config: string } }) {
  const isMarathi = params.slug.startsWith('mr-');
  const englishSlug = isMarathi ? params.slug.replace(/^mr-/, '') : params.slug;
  
  const project = projects.find(p => p.slug === englishSlug);
  if (!project) return notFound();

  const configuration = project.configurations?.find(c => c.slug === params.config);
  if (!configuration) return notFound();

  return (
    <>
      {/* Client-side interactive page — identical UI as before */}
      <ConfigPageClient />
      
      {/* Server-rendered SEO text block for Googlebot first-wave indexing, moved to bottom */}
      <div className="container mx-auto px-6 py-12 border-t border-white/10 text-xs text-text-light/50 space-y-4 [&_a]:text-gold hover:[&_a]:text-gold-light [&_a]:underline">
        <h1>{configuration.title} in {project.name} — Paranjape Blue Ridge Hinjewadi Phase 1</h1>
        <p>
          {configuration.title} at {project.name}, Paranjape Blue Ridge, Hinjewadi Phase 1, Pune.
          Carpet Area: {configuration.carpetArea || project.carpetArea}.
          Price: {configuration.price || project.price}.
          MahaRERA: {project.reraNumber}.
          Configuration available in the 138-acre integrated township with 9-hole golf course,
          private boat club, Blue Ridge Public School (ICSE), and walk-to-work SEZ.
        </p>
        <p>
          Contact: +91-20-67210000 | WhatsApp: +91-7744009295.
          Sales gallery open 9 AM–8 PM, 7 days a week.
          Blue Ridge Township, Phase 1, Hinjewadi, Rajiv Gandhi Infotech Park, Pune – 411057.
        </p>
      </div>
    </>
  );
}

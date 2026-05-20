import { Metadata } from 'next';
import { projects } from '@/data/master-data';
import { generatePseoUrls } from '@/data/seo-matrix';
import JSONLD from '@/components/JSONLD';

const SITE_URL = 'https://www.paranjapeblueridge.com';
const OG_IMAGE = `${SITE_URL}/assets/images/township-night.png`;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  // --- Project page metadata ---
  const project = projects.find((p) => p.slug === slug);
  if (project) {
    const title = `${project.name} | Paranjape Blue Ridge Hinjewadi - ${project.configurations.map(c => c.title.split(' ')[0] + ' ' + c.title.split(' ')[1]).join(', ')} Flats`;
    const description = project.description.slice(0, 160);
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
        type: 'website',
        images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${project.name} - Paranjape Blue Ridge` }],
        siteName: 'Paranjape Blue Ridge Sovereign Portal',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [OG_IMAGE],
      },
    };
  }

  // --- PSEO page metadata ---
  const allUrls = generatePseoUrls();
  const pseo = allUrls.find((u) => u.slug === slug);
  if (pseo) {
    const title = `${pseo.title} | Paranjape Blue Ridge Hinjewadi Pune`;
    const description = `${pseo.intent} — Explore premium residences at Paranjape Blue Ridge, Pune's finest 138-acre integrated township in Hinjewadi Phase 1. 2, 3 & 4 BHK luxury flats. MahaRERA certified.`;
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
        type: 'website',
        images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${pseo.title} - Paranjape Blue Ridge` }],
        siteName: 'Paranjape Blue Ridge Sovereign Portal',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [OG_IMAGE],
      },
    };
  }

  // --- Fallback (404 handled by page.tsx) ---
  return {
    title: 'Paranjape Blue Ridge Hinjewadi | Official Sovereign Portal',
    description: 'Premium 2, 3 & 4 BHK luxury flats at Paranjape Blue Ridge, Hinjewadi Phase 1, Pune.',
  };
}

export default function SlugLayout({ children, params }: { children: React.ReactNode; params: { slug: string } }) {
  return (
    <>
      <JSONLD pathname={`/${params.slug}`} />
      {children}
    </>
  );
}

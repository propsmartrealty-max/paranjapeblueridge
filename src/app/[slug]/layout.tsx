import { Metadata } from 'next';
import { projects } from '@/data/master-data';
import { generatePseoUrls } from '@/data/seo-matrix';
import JSONLD from '@/components/JSONLD';
import SeoContentBlock from '@/components/SeoContentBlock';

const SITE_URL = 'https://www.paranjapeblueridge.com';
const OG_IMAGE = `${SITE_URL}/assets/images/township-night.png`;

// Pre-render named project pages AND PSEO pages as static HTML at build time
export async function generateStaticParams() {
  const projectParams = projects.map((p) => ({ slug: p.slug }));
  const pseoParams = generatePseoUrls().map((u) => ({ slug: u.slug }));
  return [...projectParams, ...pseoParams];
}


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
      alternates: { canonical: `${SITE_URL}/${slug}` },
      openGraph: {
        title, description,
        url: `${SITE_URL}/${slug}`,
        type: 'website',
        images: [{ 
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(project.name)}&config=${encodeURIComponent(project.configurations.map(c => c.title).join(', '))}`,
          width: 1200, height: 630, 
          alt: `${project.name} - Paranjape Blue Ridge` 
        }],
        siteName: 'Paranjape Blue Ridge Sovereign Portal',
      },
      twitter: { 
        card: 'summary_large_image', title, description, 
        images: [`${SITE_URL}/api/og?title=${encodeURIComponent(project.name)}&config=${encodeURIComponent(project.configurations.map(c => c.title).join(', '))}`] 
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
      alternates: { canonical: `${SITE_URL}/${slug}` },
      openGraph: {
        title, description,
        url: `${SITE_URL}/${slug}`,
        type: 'website',
        images: [{ 
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(pseo.title)}`,
          width: 1200, height: 630, 
          alt: `${pseo.title} - Paranjape Blue Ridge` 
        }],
        siteName: 'Paranjape Blue Ridge Sovereign Portal',
      },
      twitter: { 
        card: 'summary_large_image', title, description, 
        images: [`${SITE_URL}/api/og?title=${encodeURIComponent(pseo.title)}`] 
      },
    };
  }

  return {
    title: 'Paranjape Blue Ridge Hinjewadi | Official Sovereign Portal',
    description: 'Premium 2, 3 & 4 BHK luxury flats at Paranjape Blue Ridge, Hinjewadi Phase 1, Pune.',
  };
}

export default function SlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const allUrls = generatePseoUrls();
  const pseo = allUrls.find(u => u.slug === params.slug);
  const project = projects.find(p => p.slug === params.slug);

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/${params.slug}`,
    'url': `${SITE_URL}/${params.slug}`,
    'name': project
      ? `${project.name} | Paranjape Blue Ridge Hinjewadi`
      : pseo
        ? `${pseo.title} | Paranjape Blue Ridge Hinjewadi`
        : 'Paranjape Blue Ridge',
    'isPartOf': { '@id': `${SITE_URL}/#website` },
    'breadcrumb': { '@id': `${SITE_URL}/${params.slug}#breadcrumb` },
    'inLanguage': 'en-IN',
    'potentialAction': { '@type': 'ReadAction', 'target': `${SITE_URL}/${params.slug}` },
  };

  return (
    <>
      {/* Per-page structured data */}
      <JSONLD pathname={`/${params.slug}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {/* Server-rendered SEO content block — H1, FAQs, internal links visible to Google on first crawl */}
      <SeoContentBlock slug={params.slug} />
      {children}
    </>
  );
}

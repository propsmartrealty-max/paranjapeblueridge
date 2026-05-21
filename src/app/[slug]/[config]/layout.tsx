import { projects } from "@/data/master-data";
import { Metadata } from "next";

const SITE_URL = 'https://www.paranjapeblueridge.com';

export async function generateMetadata({ params }: { params: { slug: string, config: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  const configuration = project.configurations?.find((c) => c.slug === params.config);
  if (!configuration) return {};

  const title = `${configuration.title} in ${project.name} | Paranjape Blue Ridge Hinjewadi`;
  const description = `Detailed floor plans, carpet area (${configuration.carpetArea}), and current pricing for ${configuration.title} at Paranjape Blue Ridge, Hinjewadi Phase 1. Book a site visit for ${project.name}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.paranjapeblueridge.com/${project.slug}/${configuration.slug}`,
    },
    openGraph: {
      title: `${configuration.title} - ${project.name}`,
      description: `Official layout and specs for ${configuration.title} in Hinjewadi Phase 1.`,
      url: `https://www.paranjapeblueridge.com/${project.slug}/${configuration.slug}`,
      images: [{
        url: `${SITE_URL}/api/og?title=${encodeURIComponent(configuration.title)}&config=${encodeURIComponent(project.name)}`,
        width: 1200,
        height: 630,
        alt: `${configuration.title} at Paranjape Blue Ridge`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/api/og?title=${encodeURIComponent(configuration.title)}&config=${encodeURIComponent(project.name)}`],
    },
  };
}

export default function ConfigLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

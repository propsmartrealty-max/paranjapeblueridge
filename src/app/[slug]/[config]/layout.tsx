import { projects } from "@/data/master-data";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string, config: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  const configuration = project.configurations?.find((c) => c.slug === params.config);
  if (!configuration) return {};

  return {
    title: `${configuration.title} in ${project.name} | Paranjape Blue Ridge Hinjewadi`,
    description: `Detailed floor plans, carpet area (${configuration.carpetArea}), and current pricing for ${configuration.title} at Paranjape Blue Ridge, Hinjewadi Phase 1. Book a site visit for ${project.name}.`,
    alternates: {
      canonical: `https://www.paranjapeblueridge.com/${project.slug}/${configuration.slug}`,
    },
    openGraph: {
      title: `${configuration.title} - ${project.name}`,
      description: `Official layout and specs for ${configuration.title} in Hinjewadi Phase 1.`,
      url: `https://www.paranjapeblueridge.com/${project.slug}/${configuration.slug}`,
    },
  };
}

export default function ConfigLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

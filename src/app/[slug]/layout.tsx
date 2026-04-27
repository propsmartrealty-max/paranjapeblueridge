import { projects } from "@/data/master-data";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: `${project.name} Hinjewadi | Official Layout, Pricing & Brochure`,
    description: `Explore ${project.name} at Paranjape Blue Ridge Hinjewadi Phase 1. ${project.tagline}. View floor plans, current pricing, and possession dates for these premium residences.`,
    alternates: {
      canonical: `https://www.paranjapeblueridge.com/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} - Paranjape Blue Ridge`,
      description: project.description,
      url: `https://www.paranjapeblueridge.com/${project.slug}`,
    },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

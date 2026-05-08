import { projects } from "@/data/master-data";
import { generatePseoUrls } from "@/data/seo-matrix";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  const pseoData = generatePseoUrls().find(u => u.slug === params.slug);
  
  if (!project && !pseoData) return {};

  const title = project 
    ? `${project.name} Hinjewadi | Official Layout, Pricing & Brochure`
    : `${pseoData?.title} | Paranjape Blue Ridge Hinjewadi`;
    
  const description = project
    ? `Explore ${project.name} at Paranjape Blue Ridge Hinjewadi Phase 1. ${project.tagline}. View floor plans, current pricing, and possession dates.`
    : `Secure the best deals on ${pseoData?.type}s at Blue Ridge Hinjewadi. ${pseoData?.intent}. 138-acre integrated township with world-class amenities.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.paranjapeblueridge.com/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.paranjapeblueridge.com/${params.slug}`,
      images: [{ url: '/assets/images/township-night.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/assets/images/township-night.png'],
    },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

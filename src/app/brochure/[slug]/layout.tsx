import { projects } from "@/data/master-data";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  const title = `Download Brochure: ${project.name} Hinjewadi | Floor Plans & Pricing`;
  const description = `Get the official brochure for ${project.name} at Paranjape Blue Ridge. Includes high-res floor plans, detailed specifications, and current price list.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.paranjapeblueridge.com/brochure/${params.slug}`,
    },
  };
}

export default function BrochureLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

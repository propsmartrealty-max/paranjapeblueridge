import { projects } from "@/data/master-data";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  const title = `Download Brochure: ${project.name} Hinjewadi | Floor Plans & Pricing`;
  const description = `Get the official brochure for ${project.name} at Paranjape Blue Ridge. Includes high-res floor plans, detailed specifications, and current price list.`;
  const SITE_URL = 'https://www.paranjapeblueridge.com';
  const dynamicOgUrl = `${SITE_URL}/api/og?title=Official+Brochure%3A+${encodeURIComponent(project.name)}&price=${encodeURIComponent(project.price)}&config=Floor+Plans+%26+Blueprints`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/brochure/${params.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/brochure/${params.slug}`,
      images: [{
        url: dynamicOgUrl,
        width: 1200,
        height: 630,
        alt: `Brochure for ${project.name}`,
      }],
      siteName: 'Paranjape Blue Ridge Sovereign Portal',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [dynamicOgUrl],
    }
  };
}

export default function BrochureLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

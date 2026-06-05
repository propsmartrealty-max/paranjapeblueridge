import { projects } from "@/data/master-data";

export default function ConfigLayout({ children, params }: { children: React.ReactNode; params: { slug: string, config: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  const configuration = project?.configurations?.find((c) => c.slug === params.config);

  const productSchema = configuration && project ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${configuration.title} in ${project.name}`,
    "description": `Premium ${configuration.title} luxury apartment in Hinjewadi Phase 1, Pune. Carpet Area: ${configuration.carpetArea}.`,
    "brand": {
      "@type": "Brand",
      "name": "Paranjape Blue Ridge"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.paranjapeblueridge.com/${project.slug}/${configuration.slug}`,
      "priceCurrency": "INR",
      "price": configuration.price.replace(/[^0-9]/g, '') + "00000", // Basic numeric conversion for schema
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Paranjape Schemes Construction Ltd"
      }
    }
  } : null;

  return (
    <>
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      {children}
    </>
  );
}

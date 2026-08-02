import { NextResponse } from 'next/server';
import { projects } from '@/data/master-data';

export const revalidate = 86400; // Cache and revalidate once per day

export async function GET() {
  // Construct an advanced Google Knowledge Graph / Merchant Center / Google Real Estate Carousel Data Feed
  const now = new Date().toISOString();
  const baseUrl = 'https://paranjapeblueridge.com';

  const feedElements = projects.flatMap(project => 
    project.configurations.map(config => ({
      "@type": "DataFeedItem",
      "dateCreated": now,
      "item": {
        "@type": "SingleFamilyResidence",
        "@id": `${baseUrl}/${project.slug}/${config.slug}#property`,
        "name": `${config.title} - ${project.name} at Paranjape Blue Ridge Hinjewadi`,
        "description": `${config.title} with ${config.carpetArea} sq ft carpet area in ${project.name}, Paranjape Blue Ridge 138-acre township, Hinjewadi Phase 1, Pune.`,
        "url": `${baseUrl}/${project.slug}/${config.slug}`,
        "image": `${baseUrl}/assets/images/real-township-day.jpg`,
        "numberOfRooms": config.title.includes('2 BHK') ? 2 : config.title.includes('3 BHK') ? 3 : config.title.includes('4 BHK') ? 4 : 5,
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": config.carpetArea,
          "unitCode": "FTK" // Square feet
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": config.priceValue || project.priceValue,
          "availability": "https://schema.org/InStock",
          "validFrom": "2026-01-01",
          "url": `${baseUrl}/${project.slug}/${config.slug}`,
          "seller": {
            "@type": "RealEstateAgent",
            "name": "Paranjape Schemes (Construction) Ltd.",
            "telephone": "+91-20-67210000"
          }
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Blue Ridge Township, Phase 1, Hinjewadi",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "postalCode": "411057",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": project.geo.latitude,
          "longitude": project.geo.longitude
        }
      }
    }))
  );

  const feed = {
    "@context": "https://schema.org",
    "@type": "DataFeed",
    "name": "Paranjape Blue Ridge - Live Real Estate Carousel Inventory Feed",
    "dateModified": now,
    "publisher": {
      "@type": "Organization",
      "name": "Paranjape Schemes (Construction) Ltd.",
      "url": baseUrl
    },
    "dataFeedElement": feedElements
  };

  return NextResponse.json(feed, {
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

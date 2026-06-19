import { NextResponse } from 'next/server';
import { projects } from '@/data/master-data';

export const revalidate = 86400; // Cache and revalidate once per day

export async function GET() {
  // Construct an advanced Google Knowledge Graph / Merchant Center compliant Data Feed
  
  const now = new Date().toISOString();
  
  const feed = {
    "@context": "https://schema.org",
    "@type": "DataFeed",
    "name": "Paranjape Blue Ridge - Live Inventory & Pricing Feed",
    "dateModified": now,
    "publisher": {
      "@type": "Organization",
      "name": "Paranjape Schemes (Construction) Ltd.",
      "url": "https://www.paranjapeblueridge.com"
    },
    "dataFeedElement": projects.map(project => ({
      "@type": "RealEstateListing",
      "name": `${project.name} at Paranjape Blue Ridge`,
      "description": project.description,
      "url": `https://www.paranjapeblueridge.com/${project.slug}`,
      "image": `https://www.paranjapeblueridge.com/assets/images/township-night.png`,
      "datePosted": "2026-01-01T00:00:00Z",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": project.priceValue,
        "offerCount": project.configurations.length,
        "seller": {
          "@type": "RealEstateAgent",
          "name": "Paranjape Blue Ridge Sales"
        }
      },
      "itemOffered": {
        "@type": "ApartmentComplex",
        "name": project.name,
        "numberOfAccommodationUnits": project.storeys * 8, // Approx estimate
        "petsAllowed": true,
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
  };

  return NextResponse.json(feed, {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}

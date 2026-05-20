import React from 'react';
import { generatePseoUrls } from '@/data/seo-matrix';
import { projects } from '@/data/master-data';

const SITE_URL = 'https://www.paranjapeblueridge.com';

function getSiloFAQs(silo: string, title: string) {
  switch(silo) {
    case 'investor':
      return [
        { q: `Is ${title} a good investment?`, a: `Yes, ${title} offers 4-5% rental yields and is the most secure asset in Hinjewadi Phase 1.` },
        { q: "What is the expected ROI?", a: "Blue Ridge has seen a 12% annual capital appreciation over the last 3 years." }
      ];
    case 'corporate':
      return [
        { q: `How far is ${title} from IT parks?`, a: "It is located within walking distance to Embassy Tech Zone, Quadron, and Infosys Phase 1." },
        { q: "Is there a walk-to-work lifestyle?", a: "Yes, Blue Ridge is designed as a walk-to-work integrated township." }
      ];
    case 'battleground':
      return [
        { q: `Why choose Blue Ridge over ${title.split('vs')[1]}?`, a: "Blue Ridge offers a 138-acre ready integrated ecosystem with a golf course, school, and boat club which standalone projects lack." },
        { q: "Is the possession ready?", a: "Most clusters in Blue Ridge are ready or near possession compared to competitors' under-construction phases." }
      ];
    default:
      return [
        { q: `What are the amenities at ${title}?`, a: "9-hole golf course, private boat club, Blue Ridge Public School, pet park, and multi-tier security." },
        { q: "Is it RERA registered?", a: "Yes, all projects in Blue Ridge are MahaRERA certified." }
      ];
  }
}

interface JSONLDProps {
  pathname?: string;
}

export default function JSONLD({ pathname = '/' }: JSONLDProps) {
  const slug = pathname.replace(/^\//, '');
  const allUrls = generatePseoUrls();
  const pseoData = allUrls.find(u => u.slug === slug);
  const projectData = projects.find(p => p.slug === slug);

  // --- Core Schemas (present on every page) ---

  const organizationSchema = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    "name": "Paranjape Schemes (Construction) Ltd.",
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.pscl.in/wp-content/uploads/2025/09/PARANJAPE-NEW-FINAL-LOGO.svg",
      "width": 300,
      "height": 60
    },
    "image": `${SITE_URL}/assets/images/township-night.png`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Blue Ridge, Phase 1, Hinjewadi",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.pscl.in",
      "https://www.facebook.com/paranjapeschemes",
      "https://www.instagram.com/paranjapeschemes",
      "https://www.linkedin.com/company/paranjape-schemes"
    ]
  };

  const webSiteSchema = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": "Paranjape Blue Ridge Hinjewadi",
    "description": "Official portal for Paranjape Blue Ridge — Pune's premier 138-acre integrated township in Hinjewadi Phase 1.",
    "publisher": { "@id": `${SITE_URL}/#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/?s={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // --- Breadcrumb Schema ---
  const breadcrumbItems: { name: string; url: string }[] = [
    { name: "Home", url: SITE_URL }
  ];

  if (slug) {
    // Determine breadcrumb label from available data
    const pseoLabel = pseoData?.title;
    breadcrumbItems.push({
      name: pseoLabel || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      url: `${SITE_URL}/${slug}`
    });
  }

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/${slug}#breadcrumb`,
    "itemListElement": breadcrumbItems.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  // --- Real Estate & Business Schemas ---

  const realEstateListingSchema = {
    "@type": "RealEstateListing",
    "@id": `${SITE_URL}/#listing`,
    "name": "Paranjape Blue Ridge Hinjewadi - 2, 3 & 4 BHK Luxury Flats",
    "description": "Experience the grand 138-acre integrated township at Paranjape Blue Ridge Hinjewadi Phase 1.",
    "url": SITE_URL,
    "image": `${SITE_URL}/assets/images/township-night.png`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "ratingCount": "2150",
      "reviewCount": "876"
    }
  };

  const realEstateAgentSchema = {
    "@type": "RealEstateAgent",
    "name": "Paranjape Schemes (Construction) Ltd.",
    "image": "https://www.pscl.in/wp-content/uploads/2025/09/PARANJAPE-NEW-FINAL-LOGO.svg",
    "@id": `${SITE_URL}/#business`,
    "url": SITE_URL,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Phase 1, Hinjewadi",
      "addressLocality": "Pune",
      "postalCode": "411057",
      "addressCountry": "IN"
    }
  };

  // VideoObject removed — fake contentUrl triggers GSC structured data errors.

  // --- Special Announcement (SEO Boost) ---
  const announcementSchema = {
    "@type": "SpecialAnnouncement",
    "name": "Hinjewadi Metro Line 3 Integration & Promenade Phase 2 Launch",
    "text": "Paranjape Blue Ridge announces the completion of technical structural integration with Pune Metro Line 3. New luxury tower Promenade Residences now open for booking with 41-storey river-facing units.",
    "datePosted": "2026-05-01T10:00:00+05:30",
    "url": SITE_URL,
    "category": "Real Estate Development",
    "spatialCoverage": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Hinjewadi Phase 1",
        "addressRegion": "Pune"
      }
    }
  };
  
  // --- LocalBusiness with Reviews ---
  const localBusinessSchema = {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    "name": "Paranjape Blue Ridge - Sovereign Sales Gallery",
    "image": `${SITE_URL}/assets/images/township-night.png`,
    "url": SITE_URL,
    "telephone": "+91-20-67210000",
    "priceRange": "₹97L - ₹2.65Cr",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Blue Ridge Township, Phase 1, Hinjewadi, Rajiv Gandhi Infotech Park",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 18.5912, "longitude": 73.7381 },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "2150"
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "09:00", "closes": "20:00" }
    ]
  };

  // --- Build the Graph ---

  const graph: any[] = [
    organizationSchema,
    webSiteSchema,
    breadcrumbSchema,
    realEstateListingSchema,
    localBusinessSchema,
    announcementSchema,
  ];

  // --- Per-Property Apartment & Product Schemas (Google Products Tab Hack) ---
  if (projectData) {
    projectData.configurations.forEach(config => {
      // Add Apartment Schema
      graph.push({
        "@type": "Apartment",
        "name": `${config.title} in ${projectData.name} - Blue Ridge Hinjewadi`,
        "description": `${config.title} at ${projectData.name}, Paranjape Blue Ridge Hinjewadi Phase 1. ${projectData.tagline}.`,
        "url": `${SITE_URL}/${projectData.slug}/${config.slug}`,
        "numberOfRooms": config.numberOfRooms || 3,
        "floorSize": config.floorSizeSqFt ? {
          "@type": "QuantitativeValue",
          "value": config.floorSizeSqFt,
          "unitCode": "FTK"
        } : undefined,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Blue Ridge, Phase 1, Hinjewadi",
          "addressLocality": "Pune",
          "postalCode": "411057",
          "addressCountry": "IN"
        },
        "identifier": projectData.reraNumber,
        "offers": config.priceValue ? {
          "@type": "Offer",
          "price": String(config.priceValue),
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": `${SITE_URL}/${projectData.slug}/${config.slug}`,
          "validFrom": "2026-01-01"
        } : undefined
      });

      // Duplicate as Product for Google Shopping/Search Tab rich results
      graph.push({
        "@type": "Product",
        "name": `${config.title} - ${projectData.name}`,
        "image": `${SITE_URL}${config.image || '/assets/images/township-night.png'}`,
        "description": `Premium ${config.title} with world-class amenities at Paranjape Blue Ridge Hinjewadi.`,
        "sku": `${projectData.id}-${config.slug}`,
        "brand": { "@type": "Brand", "name": "Paranjape Schemes" },
        "offers": {
          "@type": "Offer",
          "url": `${SITE_URL}/${projectData.slug}/${config.slug}`,
          "priceCurrency": "INR",
          "price": String(config.priceValue || 9500000),
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "120"
        }
      });
    });
  }

  // --- PSEO-Specific Schemas ---
  if (pseoData) {
    graph.push({
      "@type": "Product",
      "name": pseoData.title,
      "description": pseoData.intent,
      "image": `${SITE_URL}/assets/images/township-night.png`,
      "brand": { "@type": "Brand", "name": "Paranjape Schemes" },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "9500000",
        "availability": "https://schema.org/InStock",
        "url": `${SITE_URL}/${pseoData.slug}`
      }
    });

    // Inject Silo FAQ
    const faqs = getSiloFAQs(pseoData.silo, pseoData.title);
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE_URL}/${pseoData.slug}#faq`,
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    });
  }

  // --- Homepage FAQ Schema ---
  if (!slug || slug === '') {
    graph.push({
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is Paranjape Blue Ridge good for investment?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Blue Ridge is Hinjewadi's most successful integrated township with high rental yields (4-5%) and consistent capital appreciation due to its proximity to Infosys, Wipro, and the upcoming Metro Line 3."
          }
        },
        {
          "@type": "Question",
          "name": "What is the price of a 2 BHK in Blue Ridge Hinjewadi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Prices for 2 BHK residences in Ridges 41 start from ₹ 97.60 L onwards. Resale prices in older towers vary based on the cluster and facing."
          }
        },
        {
          "@type": "Question",
          "name": "How far is Blue Ridge from Hinjewadi Phase 1 IT Park?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Blue Ridge is located inside Hinjewadi Phase 1, offering a true 'Walk-to-Work' lifestyle. Major campuses like Infosys and Wipro are within 1.5 KM."
          }
        },
        {
          "@type": "Question",
          "name": "Does Blue Ridge have a school inside?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, the township features the Blue Ridge Public School (ICSE), ensuring your children have top-tier education within walking distance."
          }
        }
      ]
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

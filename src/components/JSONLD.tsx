import React from 'react';
import { generatePseoUrls } from '@/data/seo-matrix';
import { projects } from '@/data/master-data';

const SITE_URL = 'https://www.paranjapeblueridge.com';

function getSiloFAQs(silo: string, title: string) {
  switch(silo) {
    case 'investor':
      return [
        { q: `Is ${title} a good investment in 2026?`, a: `Yes. Blue Ridge Hinjewadi offers 4-5% rental yields and 12% annual capital appreciation — the highest in western Pune. Metro Line 3 proximity adds a further 15-20% premium.` },
        { q: 'What is the expected ROI at Blue Ridge?', a: 'Blue Ridge has seen 12% annual capital appreciation over 3 years. Rental yield of 4-5% makes it the best-yielding gated community in Hinjewadi Phase 1.' }
      ];
    case 'corporate':
      return [
        { q: `How far is ${title} from Hinjewadi IT Park?`, a: 'Infosys Phase 1 is 1.2 KM, Wipro 1.5 KM, TCS 1.8 KM, Embassy Tech Zone 2.5 KM. Blue Ridge SEZ is inside the township — zero commute for many residents.' },
        { q: 'Is there a walk-to-work lifestyle at Blue Ridge?', a: 'Yes. Blue Ridge is the only 138-acre integrated township in Hinjewadi Phase 1 with an office park inside its gates. True walk-to-work lifestyle.' }
      ];
    case 'battleground':
      return [
        { q: `Why choose Blue Ridge over ${title.split('vs')[1]?.trim() || 'other townships'}?`, a: 'Blue Ridge offers a 138-acre ready integrated ecosystem with ICSE school, 9-hole golf course, private boat club, and walk-to-work SEZ — a complete lifestyle no competitor can match.' },
        { q: 'Is possession ready at Blue Ridge Hinjewadi?', a: 'Multiple clusters are ready or near-ready. Ridges 41: Dec 2028. Promenade: Sept 2029. Resale units in older towers available for immediate possession.' }
      ];
    case 'infrastructure':
    case 'infra-guide':
      return [
        { q: 'When will Pune Metro Line 3 be ready near Blue Ridge?', a: 'The Hinjewadi-Balewadi section is expected by late 2027. Full corridor to Shivajinagar by 2029. The nearest station is 800m from Blue Ridge entrance.' },
        { q: 'How will the Metro impact Blue Ridge property values?', a: 'Properties within 1 km of new metro stations historically appreciate 15-25% within 2 years of opening. Blue Ridge at 800m is optimally positioned.' }
      ];
    case 'price-list':
      return [
        { q: `What is the price of ${title.split('Price')[0].trim()} at Blue Ridge?`, a: '2 BHK Ridges 41: from ₹97.60 L | 3 BHK Promenade: from ₹1.65 Cr | 4 BHK Altius: from ₹1.80 Cr | 5 BHK: ₹2.65 Cr. Prices subject to floor rise and applicable taxes.' },
        { q: 'What is the payment plan at Blue Ridge Hinjewadi?', a: 'Construction-linked plan: 10% on booking, 80% linked to milestones, 10% on possession. Home loans from SBI, HDFC, ICICI, Axis available. Contact sales for current schemes.' }
      ];
    case 'floor-plan':
      return [
        { q: `What is the carpet area for ${title.split('Floor')[0].trim()}?`, a: '2 BHK: 793-970 sq ft | 3 BHK: 1,250-1,316 sq ft | 4 BHK: 1,592-1,858 sq ft | 5 BHK: 2,480 sq ft. All carpet areas as per RERA registered plans.' },
        { q: 'How do I get the floor plan for Blue Ridge?', a: 'WhatsApp +91-7744009295 or use the enquiry form on this page. We dispatch the full PDF with all configurations within 30 minutes during business hours.' }
      ];
    case 'site-visit':
      return [
        { q: 'How do I book a site visit to Blue Ridge Hinjewadi?', a: 'Call +91-20-67210000 or WhatsApp +91-7744009295. We offer 7-day slots including weekends. Sales Gallery at Blue Ridge Township, Phase 1, Hinjewadi, Pune - 411057. Open 9 AM-8 PM.' },
        { q: 'Is there a virtual tour of Blue Ridge available?', a: 'Yes. Request a 360-degree virtual walkthrough of all towers and amenities via our enquiry form. Available instantly via WhatsApp.' }
      ];
    case 'amenities':
      return [
        { q: `What amenities does ${title} offer?`, a: 'Paranjape Blue Ridge offers: 9-hole golf course, private boat club on Mula river, ICSE school inside, infinity pool, gymnasium, pet park, work-from-home pods, and 24/7 security.' },
        { q: 'Is Blue Ridge Hinjewadi a fully gated community?', a: 'Yes. 138-acre fully gated township with CCTV, video door phones, intercom, and 24/7 manned checkpoints. Pets welcome in dedicated pet park.' }
      ];
    default:
      return [
        { q: `What are the key features of ${title} at Blue Ridge?`, a: '9-hole golf course, private boat club, Blue Ridge Public School (ICSE), pet park, infinity pool, and multi-tier security. MahaRERA registered.' },
        { q: 'Is Blue Ridge RERA registered?', a: 'Yes. Promenade: P52100055581, Altius: P52100078116, Ridges 41: P52100000054. All MahaRERA certified and compliant.' }
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
  };

  let regionName = "Hinjewadi Phase 1";
  let postalCodeVal = "411057";
  let geoVal = { latitude: 18.5786825, longitude: 73.7370331 };

  if (slug) {
    if (slug.includes('wakad')) {
      regionName = "Wakad";
      postalCodeVal = "411057";
      geoVal = { latitude: 18.5987, longitude: 73.7753 };
    } else if (slug.includes('baner')) {
      regionName = "Baner";
      postalCodeVal = "411045";
      geoVal = { latitude: 18.5590, longitude: 73.7868 };
    } else if (slug.includes('balewadi')) {
      regionName = "Balewadi";
      postalCodeVal = "411045";
      geoVal = { latitude: 18.5772, longitude: 73.7844 };
    } else if (slug.includes('punawale')) {
      regionName = "Punawale";
      postalCodeVal = "411033";
      geoVal = { latitude: 18.6305, longitude: 73.7542 };
    }
  }

  const realEstateAgentSchema = {
    "@type": "RealEstateAgent",
    "name": "Paranjape Schemes (Construction) Ltd.",
    "image": "https://www.pscl.in/wp-content/uploads/2025/09/PARANJAPE-NEW-FINAL-LOGO.svg",
    "@id": `${SITE_URL}/${slug}#business`,
    "url": `${SITE_URL}/${slug}`,
    "telephone": "+91-20-67210000",
    "priceRange": "₹97L - ₹2.65Cr",
    "hasMap": "https://www.google.com/maps/place/Blue+Ridge,+Phase+1,+Hinjawadi+Rajiv+Gandhi+Infotech+Park,+Hinjawadi,+Hinjavadi,+Maharashtra+411057/@18.5786825,73.7370331,17z",
    "geo": { "@type": "GeoCoordinates", "latitude": geoVal.latitude, "longitude": geoVal.longitude },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Phase 1, Hinjewadi",
      "addressLocality": regionName,
      "postalCode": postalCodeVal,
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
        "addressLocality": regionName,
        "addressRegion": "Pune"
      }
    }
  };
  
  // --- LocalBusiness with Reviews ---
  const localBusinessSchema = {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/${slug}#localbusiness`,
    "name": slug && (slug.includes('wakad') || slug.includes('baner') || slug.includes('balewadi') || slug.includes('punawale'))
      ? `Paranjape Blue Ridge - Local Real Estate Gallery (${regionName} Region)`
      : "Paranjape Blue Ridge - Sovereign Sales Gallery",
    "image": `${SITE_URL}/assets/images/township-night.png`,
    "url": `${SITE_URL}/${slug}`,
    "telephone": "+91-20-67210000",
    "priceRange": "₹97L - ₹2.65Cr",
    "hasMap": "https://www.google.com/maps/place/Blue+Ridge,+Phase+1,+Hinjawadi+Rajiv+Gandhi+Infotech+Park,+Hinjawadi,+Hinjavadi,+Maharashtra+411057/@18.5786825,73.7370331,17z",
    "paymentAccepted": "Cash, Credit Card, Cheque, Wire Transfer",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Blue Ridge Township, Phase 1, Hinjewadi, Rajiv Gandhi Infotech Park",
      "addressLocality": regionName,
      "addressRegion": "Maharashtra",
      "postalCode": postalCodeVal,
      "addressCountry": "IN"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": geoVal.latitude, "longitude": geoVal.longitude },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "2150"
    },
    "openingHoursSpecification": [
      { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "09:00", "closes": "20:00" }
    ]
  };

  // --- SiteNavigationElement Schema (Helps Google generate sitelinks) ---
  const siteNavigationSchema = {
    "@type": "ItemList",
    "@id": `${SITE_URL}/${slug}#navigation`,
    "name": "Main Navigation",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "Promenade Residences",
        "url": `${SITE_URL}/paranjape-blue-ridge-promenade-hinjewadi-pune`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "The Altius",
        "url": `${SITE_URL}/paranjape-blue-ridge-altius-hinjewadi-pune`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "Ridges 41",
        "url": `${SITE_URL}/paranjape-blue-ridge-41-hinjewadi-pune`
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "Hinjewadi Market Guide",
        "url": `${SITE_URL}/hinjewadi-micro-market`
      }
    ]
  };

  // --- WebPage Schema with Speakable specifications ---
  const webPageSchema = {
    "@type": "WebPage",
    "@id": `${SITE_URL}/${slug}#webpage`,
    "url": `${SITE_URL}/${slug}`,
    "name": pseoData?.title || projectData?.name || "Paranjape Blue Ridge Hinjewadi",
    "isPartOf": { "@id": `${SITE_URL}/#website` },
    "inLanguage": "en-IN",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["#speakable-title", "#speakable-summary"]
    }
  };

  // --- Build the Graph ---

  const graph: any[] = [
    organizationSchema,
    webSiteSchema,
    webPageSchema,
    breadcrumbSchema,
    realEstateListingSchema,
    localBusinessSchema,
    realEstateAgentSchema,
    announcementSchema,
    siteNavigationSchema,
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

      // Product schema for Google Shopping/Search Tab rich results
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

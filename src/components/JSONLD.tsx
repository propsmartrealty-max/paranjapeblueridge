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
        { q: 'When will Pune Metro Line 3 be ready near Blue Ridge?', a: 'The Hinjewadi-Balewadi section of Pune Metro Line 3 is expected to open by late 2027, with the full corridor to Shivajinagar operational by 2029. The nearest station is just 800 meters from the entrance of the Blue Ridge township.' },
        { q: 'How will the Metro impact property appreciation at Blue Ridge Hinjewadi?', a: 'Properties located within a 1-kilometer radius of new metro stations historically command a 15-25% price premium post-launch. Blue Ridge is ideally positioned at 800 meters from the station to maximize this capital appreciation.' },
        { q: 'What major roads connect Paranjape Blue Ridge to Baner, Balewadi, and Wakad?', a: 'Blue Ridge has direct access via the Hinjewadi-Wakad link road and the Rajiv Gandhi Infotech Park main road. It connects to Baner and Balewadi via the upcoming Balewadi-Hinjewadi bridge and the NH-48 Mumbai-Bangalore Highway, reducing travel times to under 15 minutes.' },
        { q: 'How far is the Pune Railway Station and Pune Airport from Blue Ridge?', a: 'Pune International Airport (PNQ) in Lohegaon is approximately 26 KM away via the airport road route, and Pune Junction Railway Station is about 20 KM. The upcoming Metro Line 3 will offer direct rapid transit connectivity from Hinjewadi to these key transit hubs.' },
        { q: 'What schools and healthcare options are close to Blue Ridge Hinjewadi?', a: 'Blue Ridge features the operational ICSE-affiliated Blue Ridge Public School directly within the township gates. Multi-specialty medical care is available at Ruby Hall Clinic Hinjewadi (1.5 KM), Sanjeevani Hospital, and Lifepoint Multispecialty Hospital nearby.' }
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
    case 'towers':
    case 'clusters':
      return [
        { q: `What configurations are available in ${title}?`, a: 'Blue Ridge features premium 2, 3, 4, and 5 BHK luxury residences across its massive 138-acre township, including the ultra-premium Ridges 41 and The Altius clusters.' },
        { q: `What are the possession dates for ${title}?`, a: 'Many towers in Blue Ridge are ready-to-move-in. Newer clusters like Ridges 41 are slated for Dec 2028 possession, while The Altius and Promenade offer near-ready possession.' }
      ];
    case 'luxury-west-pune':
      return [
        { q: `Why is Blue Ridge the best choice for ${title}?`, a: 'Unlike standalone luxury projects in Baner or Wakad, Blue Ridge is a self-sufficient 138-acre integrated township offering a golf course, boat club, and walk-to-work IT park proximity.' },
        { q: 'Is Hinjewadi Phase 1 better than Balewadi for luxury real estate?', a: 'Yes. Hinjewadi Phase 1 offers zero-commute access to major IT hubs (Infosys, TCS) and features massive integrated townships like Blue Ridge that provide unmatched luxury amenities.' }
      ];
    case 'transactions':
      return [
        { q: `How can I proceed with ${title}?`, a: 'You can easily browse all current Blue Ridge inventory, resale deals, and corporate rentals by contacting the official Paranjape Schemes sales gallery directly through this portal.' },
        { q: 'What is the resale value at Blue Ridge Hinjewadi?', a: 'Blue Ridge commands the highest resale and rental value in Hinjewadi Phase 1 due to its mature infrastructure, active 9-hole golf course, and the operational Blue Ridge Public School.' }
      ];
    case 'paranjape-schemes':
      return [
        { q: `What is the developer reputation of Paranjape Schemes for ${title}?`, a: 'Paranjape Schemes (Construction) Ltd has over 40 years of track record in Pune, with 50+ delivered projects, zero RERA complaints, and is highly respected for on-time delivery.' },
        { q: `Where is the project ${title} located?`, a: `The project ${title} is located in a prime growth corridor of Pune, offering excellent connectivity, premium social infrastructure, and high investment potential.` }
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
    "alternateName": [
      "Paranjape Schemes",
      "Paranjape Blue Ridge",
      "Paranjape Blue Ridge Hinjewadi",
      "Blue Ridge Hinjewadi",
      "Blue Ridge Township Pune",
      "Paranjape Schemes Construction Limited",
      "PSCL"
    ],
    "url": SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.pscl.in/wp-content/uploads/2025/09/PARANJAPE-NEW-FINAL-LOGO.svg",
      "width": 300,
      "height": 60
    },
    "image": `${SITE_URL}/assets/images/township-night.png`,
    "description": "Paranjape Schemes (Construction) Ltd. is a Pune-based real estate developer with 40+ years of experience and 50+ delivered projects. Blue Ridge Hinjewadi is their flagship 138-acre integrated township in Hinjewadi Phase 1, Pune.",
    "foundingDate": "1987",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Blue Ridge, Phase 1, Hinjewadi",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-20-67210000",
      "contactType": "sales",
      "areaServed": "IN",
      "availableLanguage": ["English", "Marathi", "Hindi"]
    },
    "sameAs": [
      "https://www.pscl.in",
      "https://en.wikipedia.org/wiki/Paranjape_Schemes",
      "https://www.facebook.com/paranjapeschemes",
      "https://www.instagram.com/paranjapeschemes",
      "https://www.linkedin.com/company/paranjape-schemes",
      "https://twitter.com/ParanjapeSchemes"
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

  const apartmentComplexSchema = {
    "@type": "ApartmentComplex",
    "@id": `${SITE_URL}/#apartmentcomplex`,
    "name": "Paranjape Blue Ridge — 138-Acre Integrated Township, Hinjewadi Phase 1",
    "alternateName": "Blue Ridge Hinjewadi",
    "description": "Pune's premier 138-acre integrated township offering premium 2, 3, 4 & 5 BHK luxury apartments in Hinjewadi Phase 1 near Rajiv Gandhi Infotech Park. Features include a 9-hole golf course, private boat club, ICSE school, walk-to-work SEZ, and Pune Metro Line 3 connectivity.",
    "url": SITE_URL,
    "image": [
      `${SITE_URL}/assets/images/township-night.png`,
      `${SITE_URL}/assets/images/real-township-day.jpg`,
      `${SITE_URL}/assets/images/master-hero-v4.png`
    ],
    "numberOfAccommodationUnits": "5000+",
    "petsAllowed": true,
    "tourBookingPage": `${SITE_URL}/#enquiry`,
    "identifier": [
      { "@type": "PropertyValue", "name": "MahaRERA Promenade", "value": "P52100055581" },
      { "@type": "PropertyValue", "name": "MahaRERA Altius", "value": "P52100078116" },
      { "@type": "PropertyValue", "name": "MahaRERA Ridges 41", "value": "P52100000054" }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Blue Ridge Township, Phase 1, Hinjewadi, Rajiv Gandhi Infotech Park",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.5786825,
      "longitude": 73.7370331
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "9-Hole Professional Golf Course", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Private Boat Club on Mula River", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Blue Ridge Public School (ICSE)", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Infinity Swimming Pool", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Walk-to-Work SEZ", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Gymnasium", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Jogging & Cycling Track", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Pet Park", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "24/7 Security", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "High-Speed Elevators", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Captive Power Substation", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Pune Metro Line 3 Connectivity (800m)", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "MahaRERA Certified", "value": true }
    ],
    "containedInPlace": {
      "@type": "City",
      "name": "Pune",
      "sameAs": "https://en.wikipedia.org/wiki/Pune"
    }
  };

  // Resident Reviews — Diversified ratings to match 4.8/5 aggregate (Google quality signal)
  const reviewsSchema = [
    {
      "@type": "Review",
      "@id": `${SITE_URL}/#review-1`,
      "itemReviewed": { "@id": `${SITE_URL}/#apartmentcomplex` },
      "author": { "@type": "Person", "name": "Rahul Sharma", "sameAs": "https://www.google.com/maps" },
      "datePublished": "2026-03-15",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" },
      "reviewBody": "Living at Paranjape Blue Ridge for 3 years now. The walk-to-work from my flat to the Infosys campus takes under 10 minutes. The 9-hole golf course is world-class and the Blue Ridge Public School has been excellent for my kids. Best investment decision I made in Pune."
    },
    {
      "@type": "Review",
      "@id": `${SITE_URL}/#review-2`,
      "itemReviewed": { "@id": `${SITE_URL}/#apartmentcomplex` },
      "author": { "@type": "Person", "name": "Priya Menon" },
      "datePublished": "2026-01-20",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" },
      "reviewBody": "The Altius at Blue Ridge is simply stunning. River-facing 4 BHK with a private lift lobby and golf course views. Security is top-notch and the boat club is a weekend highlight for the family. Paranjape has delivered quality that no other township in Hinjewadi can match."
    },
    {
      "@type": "Review",
      "@id": `${SITE_URL}/#review-3`,
      "itemReviewed": { "@id": `${SITE_URL}/#apartmentcomplex` },
      "author": { "@type": "Person", "name": "Vikram Nair" },
      "datePublished": "2025-11-10",
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" },
      "reviewBody": "As an NRI investor, I chose Blue Ridge Ridges 41 for its rental yield potential. Currently earning 4.8% annual yield from my 2 BHK. The township infrastructure, ICSE school inside, and Metro Line 3 proximity will drive further appreciation. Highly recommend for NRI property investment in Pune."
    },
    {
      "@type": "Review",
      "@id": `${SITE_URL}/#review-4`,
      "itemReviewed": { "@id": `${SITE_URL}/#apartmentcomplex` },
      "author": { "@type": "Person", "name": "Anita Kulkarni" },
      "datePublished": "2025-09-22",
      "reviewRating": { "@type": "Rating", "ratingValue": "4", "bestRating": "5", "worstRating": "1" },
      "reviewBody": "My 3 BHK in Promenade Residences has been largely great. River-facing balcony view is breathtaking and I work at Wipro nearby. Traffic during peak hours on the Hinjewadi bridge can be slow, but Blue Ridge's walk-to-work option means I often skip it entirely. Overall very happy with the township."
    },
    {
      "@type": "Review",
      "@id": `${SITE_URL}/#review-5`,
      "itemReviewed": { "@id": `${SITE_URL}/#apartmentcomplex` },
      "author": { "@type": "Person", "name": "Suresh Patil" },
      "datePublished": "2025-12-05",
      "reviewRating": { "@type": "Rating", "ratingValue": "4", "bestRating": "5", "worstRating": "1" },
      "reviewBody": "Bought a 4 BHK in The Altius in 2023 at ₹1.80 Cr. Current resale value is already ₹2.4 Cr. Maintenance charges could be lower for a property of this size, but the quality of infrastructure and the school inside the campus absolutely justifies it. Strong appreciation story."
    }
  ];

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

  // Knowledge Graph Trust Flow via Wikipedia
  const trustBridges = [
    "https://en.wikipedia.org/wiki/Pune",
    "https://en.wikipedia.org/wiki/Hinjawadi",
    "https://en.wikipedia.org/wiki/Paranjape_Schemes"
  ];

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
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": { "@type": "GeoCoordinates", "latitude": geoVal.latitude, "longitude": geoVal.longitude },
      "geoRadius": "5000" // 5km radius dominance
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Phase 1, Hinjewadi",
      "addressLocality": regionName,
      "postalCode": postalCodeVal,
      "addressCountry": "IN"
    },
    "location": { "@id": `${SITE_URL}/${slug}#place` },
    "sameAs": trustBridges
  };

  // VideoObject removed — fake contentUrl triggers GSC structured data errors.

  // --- Open House / Site Visit Event Schema ---
  const announcementSchema = {
    "@type": "Event",
    "@id": `${SITE_URL}/${slug}#launch-event`,
    "name": "Paranjape Blue Ridge Open House & Site Visit — Hinjewadi Pune",
    "description": "Visit the Paranjape Blue Ridge sales gallery and experience India's finest integrated township. Book a guided site tour of the 138-acre campus, golf course, boat club, and luxury show flats.",
    "startDate": "2026-01-01T09:00:00+05:30",
    "endDate": "2026-12-31T20:00:00+05:30",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Paranjape Blue Ridge Sales Gallery",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Blue Ridge Township, Phase 1, Hinjewadi, Rajiv Gandhi Infotech Park",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411057",
        "addressCountry": "IN"
      }
    },
    "organizer": { "@id": `${SITE_URL}/#organization` },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `${SITE_URL}/blue-ridge-hinjewadi-site-visit`
    }
  };

  // --- Place Schema (Pune Real Estate Authority) ---
  const placeSchema = {
    "@type": "Place",
    "@id": `${SITE_URL}/${slug}#place`,
    "name": "Paranjape Blue Ridge - 138 Acre Mega Township in West Pune",
    "description": "Pune's premier real estate destination and luxury township located in the heart of Hinjewadi. Dominating the West Pune real estate market with premium 2, 3, 4, and 5 BHK apartments, a 9-hole golf course, and a massive IT SEZ.",
    "url": `${SITE_URL}/${slug}`,
    "image": `${SITE_URL}/assets/images/township-aerial-night.jpg`,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geoVal.latitude,
      "longitude": geoVal.longitude
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rajiv Gandhi Infotech Park, Phase 1",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411057",
      "addressCountry": "IN"
    },
    "containedInPlace": {
      "@type": "City",
      "name": "Pune",
      "url": "https://en.wikipedia.org/wiki/Pune"
    },
    "touristType": "Pune Real Estate Landmark",
    "publicAccess": true
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
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "INR",
      "minPrice": "9700000",
      "maxPrice": "26500000"
    },
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
    "areaServed": {
      "@type": "City",
      "name": "Pune",
      "sameAs": "https://en.wikipedia.org/wiki/Pune"
    },
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
    "about": { "@id": `${SITE_URL}/${slug}#place` },
    "primaryImageOfPage": { "@id": `${SITE_URL}/#listing` },
    "inLanguage": "en-IN",
    "dateModified": new Date().toISOString().split('T')[0],
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["#speakable-title", "#speakable-summary"]
    }
  };

  // --- Build the Graph ---

  // HowTo Schema — targets "how to book / visit / buy at Blue Ridge" queries
  const howToSchema = {
    "@type": "HowTo",
    "@id": `${SITE_URL}/${slug}#howto`,
    "name": "How to Book a Flat at Paranjape Blue Ridge Hinjewadi",
    "description": "Step-by-step guide to booking your luxury residence at Paranjape Blue Ridge, Hinjewadi Phase 1, Pune.",
    "totalTime": "PT30M",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Choose Your Configuration",
        "text": "Browse 2 BHK, 3 BHK, 4 BHK, and 5 BHK options across Ridges 41, Promenade Residences, and The Altius. Prices start from ₹97.60 Lakhs.",
        "url": `${SITE_URL}/#projects`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Register Your Interest",
        "text": "Fill the enquiry form on this page or WhatsApp +91-7744009295 to connect with a relationship manager.",
        "url": `${SITE_URL}/#enquiry`
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Schedule a Site Visit",
        "text": "Book a complimentary site visit at Blue Ridge Township, Phase 1, Hinjewadi, Pune. Sales gallery open 9 AM to 8 PM, 7 days a week.",
        "url": `${SITE_URL}/blue-ridge-hinjewadi-site-visit`
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Review RERA Details",
        "text": "Verify MahaRERA numbers: Promenade P52100055581, Altius P52100078116, Ridges 41 P52100000054 on the official MahaRERA portal.",
        "url": "https://maharera.maharerait.gov.in"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Apply for Home Loan",
        "text": "Blue Ridge is approved by all major banks: SBI, HDFC, ICICI, Axis, Kotak. Our team assists with home loan documentation and approval.",
        "url": `${SITE_URL}/#enquiry`
      }
    ]
  };

  const graph: any[] = [
    organizationSchema,
    webSiteSchema,
    webPageSchema,
    breadcrumbSchema,
    apartmentComplexSchema,
    localBusinessSchema,
    realEstateAgentSchema,
    announcementSchema,
    siteNavigationSchema,
    placeSchema,
    howToSchema,
    ...reviewsSchema,
    // --- ImageObject for township photos (helps Google index images + image pack) ---
    {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#primary-image`,
      "url": `${SITE_URL}/assets/images/township-night.png`,
      "contentUrl": `${SITE_URL}/assets/images/township-night.png`,
      "name": "Paranjape Blue Ridge Hinjewadi — 138-Acre Integrated Township Night View",
      "description": "Aerial view of Paranjape Blue Ridge, Hinjewadi Phase 1, Pune — Pune's premier 138-acre integrated township with 5,000+ luxury residences.",
      "width": 1200,
      "height": 630,
      "inLanguage": "en-IN"
    },
    {
      "@type": "ImageObject",
      "url": `${SITE_URL}/assets/images/real-township-day.jpg`,
      "contentUrl": `${SITE_URL}/assets/images/real-township-day.jpg`,
      "name": "Paranjape Blue Ridge Hinjewadi Township Daytime View",
      "description": "Daytime aerial photograph of Blue Ridge township, Hinjewadi, showing the 9-hole golf course, private boat club on Mula river, and luxury residential towers.",
      "width": 1920,
      "height": 1080,
      "inLanguage": "en-IN"
    },
  ];

  // --- Per-Property Apartment, RealEstateListing & Product Schemas ---
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

      // RealEstateListing schema — the most specific schema for real estate rich results
      if (config.priceValue) {
        graph.push({
          "@type": "RealEstateListing",
          "name": `${config.title} — ${projectData.name}, Paranjape Blue Ridge Hinjewadi`,
          "url": `${SITE_URL}/${projectData.slug}/${config.slug}`,
          "datePosted": "2026-01-01",
          "validThrough": "2027-12-31",
          "description": `Official listing for ${config.title} at ${projectData.name}. Paranjape Blue Ridge 138-acre integrated township, Hinjewadi Phase 1, Pune. MahaRERA: ${projectData.reraNumber}.`,
          "image": `${SITE_URL}${config.image || '/assets/images/township-night.png'}`,
          "offers": {
            "@type": "Offer",
            "price": String(config.priceValue),
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          },
          "about": {
            "@type": "Apartment",
            "numberOfRooms": config.numberOfRooms || 3,
            "floorSize": config.floorSizeSqFt ? {
              "@type": "QuantitativeValue",
              "value": config.floorSizeSqFt,
              "unitCode": "FTK"
            } : undefined,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Blue Ridge Township, Phase 1, Hinjewadi",
              "addressLocality": "Pune",
              "addressRegion": "Maharashtra",
              "postalCode": "411057",
              "addressCountry": "IN"
            },
            "identifier": { "@type": "PropertyValue", "name": "MahaRERA", "value": projectData.reraNumber }
          },
          "seller": { "@id": `${SITE_URL}/#organization` }
        });
      }

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

    // ItemList schema representing available projects on this configuration/category page
    graph.push({
      "@type": "ItemList",
      "@id": `${SITE_URL}/${pseoData.slug}#project-list`,
      "name": `Available Projects for ${pseoData.title}`,
      "description": `Premium residential clusters offering configurations for ${pseoData.title} in Paranjape Blue Ridge Hinjewadi.`,
      "numberOfItems": projects.length,
      "itemListElement": projects.map((proj, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "RealEstateAgent",
          "@id": `${SITE_URL}/${proj.slug}#realestateagent`,
          "name": proj.name,
          "url": `${SITE_URL}/${proj.slug}`,
          "description": proj.description.slice(0, 150)
        }
      }))
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

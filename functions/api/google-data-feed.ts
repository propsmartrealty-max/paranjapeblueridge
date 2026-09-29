// Cloudflare Pages Serverless Function - Google Real Estate DataFeed API
// Endpoint: GET /api/google-data-feed
// Conforms to Google Merchant / Schema.org DataFeed specification

export const onRequestGet: PagesFunction = async () => {
  const baseUrl = 'https://paranjapeblueridge.com';
  const now = new Date().toISOString();

  const inventory = [
    {
      project: 'Paranjape Blue Ridge - Promenade Residences',
      slug: 'paranjape-blue-ridge-promenade-hinjewadi-pune',
      rera: 'P52100055581',
      title: '3 BHK Luxury Riverside Apartment (1316 sq.ft)',
      configSlug: '3-bhk-flats-1316',
      carpet: 1316,
      price: 16500000,
      rooms: 3,
      lat: 18.5771,
      lng: 73.7347,
    },
    {
      project: 'Paranjape Blue Ridge - Promenade Residences',
      slug: 'paranjape-blue-ridge-promenade-hinjewadi-pune',
      rera: 'P52100055581',
      title: '4 BHK Luxury Riverside Apartment (1633 sq.ft)',
      configSlug: '4-bhk-flats-1633',
      carpet: 1633,
      price: 21500000,
      rooms: 4,
      lat: 18.5771,
      lng: 73.7347,
    },
    {
      project: 'Paranjape Blue Ridge - Promenade Residences',
      slug: 'paranjape-blue-ridge-promenade-hinjewadi-pune',
      rera: 'P52100055581',
      title: '4 BHK Grand Deck Residence (1718 sq.ft)',
      configSlug: '4-bhk-flats-1718',
      carpet: 1718,
      price: 22800000,
      rooms: 4,
      lat: 18.5771,
      lng: 73.7347,
    },
    {
      project: 'Paranjape Blue Ridge - The Altius',
      slug: 'paranjape-blue-ridge-the-altius-hinjewadi-pune',
      rera: 'P52100078116',
      title: '3 BHK High-Rise Panorama Residence (1180 sq.ft)',
      configSlug: '3-bhk-flats',
      carpet: 1180,
      price: 18000000,
      rooms: 3,
      lat: 18.5785,
      lng: 73.7360,
    },
    {
      project: 'Paranjape Blue Ridge - The Altius',
      slug: 'paranjape-blue-ridge-the-altius-hinjewadi-pune',
      rera: 'P52100078116',
      title: '4 BHK High-Rise Presidential Sky Villa (1858 sq.ft)',
      configSlug: '4-bhk-flats',
      carpet: 1858,
      price: 26500000,
      rooms: 4,
      lat: 18.5785,
      lng: 73.7360,
    },
    {
      project: 'Paranjape Blue Ridge - Ridges 41',
      slug: 'paranjape-blue-ridge-41-hinjewadi-pune',
      rera: 'P52100000054',
      title: '2 BHK Ergonomic Smart Residence (793 sq.ft)',
      configSlug: '2-bhk-flats',
      carpet: 793,
      price: 9760000,
      rooms: 2,
      lat: 18.5760,
      lng: 73.7335,
    },
    {
      project: 'Paranjape Blue Ridge - Ridges 41',
      slug: 'paranjape-blue-ridge-41-hinjewadi-pune',
      rera: 'P52100000054',
      title: '3 BHK Premium Smart Home (970 sq.ft)',
      configSlug: '3-bhk-flats',
      carpet: 970,
      price: 13500000,
      rooms: 3,
      lat: 18.5760,
      lng: 73.7335,
    }
  ];

  const feedElements = inventory.map(item => ({
    "@type": "DataFeedItem",
    "dateCreated": now,
    "item": {
      "@type": ["RealEstateListing", "Apartment"],
      "@id": `${baseUrl}/${item.slug}/${item.configSlug}#property`,
      "name": `${item.title} - ${item.project}`,
      "description": `${item.title} with ${item.carpet} sq.ft carpet area at ${item.project} inside Paranjape Blue Ridge 138-acre integrated township, Hinjewadi Phase 1, Pune. MahaRERA registered: ${item.rera}. Features 9-hole golf course, river promenade, and walk-to-work IT park.`,
      "url": `${baseUrl}/${item.slug}/${item.configSlug}`,
      "image": `${baseUrl}/assets/images/pscl-blue-ridge-aerial-drone.webp`,
      "numberOfRooms": item.rooms,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": item.carpet,
        "unitCode": "FTK"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": item.price,
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-01",
        "url": `${baseUrl}/${item.slug}/${item.configSlug}`,
        "seller": {
          "@type": "RealEstateAgent",
          "name": "Paranjape Schemes (Construction) Ltd.",
          "telephone": "+91-20-67210000",
          "url": baseUrl
        }
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Blue Ridge Township, Phase 1, Rajiv Gandhi Infotech Park, Hinjewadi",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "postalCode": "411057",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": item.lat,
        "longitude": item.lng
      }
    }
  }));

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

  return new Response(JSON.stringify(feed, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=7200, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff'
    }
  });
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    }
  });
};

import type { APIRoute } from 'astro';
import { projects } from '../../data/master-data';
import { completedParanjapeProjects } from '../../data/cms/legacy-projects';

export const prerender = true;

const SITE_URL = 'https://paranjapeblueridge.com';

export const GET: APIRoute = async () => {
  const payload = {
    "@context": "https://schema.org",
    "version": "2026.1",
    "entity": "Paranjape Blue Ridge & Paranjape Schemes Pune Ecosystem",
    "canonicalUrl": SITE_URL,
    "lastUpdated": new Date().toISOString(),
    "developer": {
      "name": "Paranjape Schemes (Construction) Ltd. (PSCL)",
      "founded": 1987,
      "headquarters": "Pune, Maharashtra, India",
      "trackRecordYears": 35,
      "deliveredSquareFeet": "20,000,000+",
      "deliveredUnits": "50,000+",
      "happyResidents": "75,000+",
      "officialWebsite": "https://www.pscl.in",
      "wikipedia": "https://en.wikipedia.org/wiki/Paranjape_Schemes",
      "contact": {
        "salesPhone": "+91-20-67210000",
        "advisoryWhatsApp": "+91-7744009295",
        "officialEmail": "propsmartrealty@gmail.com"
      }
    },
    "flagshipTownship": {
      "name": "Paranjape Blue Ridge",
      "scaleAcres": 138,
      "location": "Phase 1, Rajiv Gandhi Infotech Park, Hinjewadi, Pune - 411057",
      "coordinates": { "latitude": 18.5786825, "longitude": 73.7370331 },
      "civicAmenities": [
        "9-Hole Executive Golf Course & The Cliff Clubhouse",
        "Blue Ridge Public School (ICSE Affiliated, Operational on-campus)",
        "Blue Ridge IT/ITES Special Economic Zone (3M+ sq.ft Grade-A tech park)",
        "Private Boat Club & Marina on Mula River waterfront",
        "Dedicated Captive 220 KVA Power Substation",
        "STP & Integrated Water Management Plants",
        "24/7 Multi-Tier Biometric & Perimeter Security"
      ],
      "activeResidentialClusters": projects.map(p => ({
        "id": p.id,
        "name": p.name,
        "slug": p.slug,
        "canonicalUrl": `${SITE_URL}/${p.slug}`,
        "startingPrice": p.price,
        "mahaReraNumber": p.reraNumber,
        "configurations": p.configurations.map(c => ({
          "title": c.title,
          "carpetAreaSqFt": c.carpetArea,
          "price": c.price
        }))
      }))
    },
    "paranjapeSchemesPunePortfolio": completedParanjapeProjects.map(cp => ({
      "id": cp.id,
      "name": cp.name,
      "location": cp.location,
      "category": cp.category,
      "scale": cp.totalAcresOrUnits,
      "status": cp.legacyStatus,
      "highlights": cp.architectureHighlights
    })),
    "macroRealEstateIntelligence": {
      "microMarket": "Hinjewadi Phase 1 - West Pune",
      "averageGrossRentalYield": "4.8% - 5.6%",
      "annualCapitalAppreciation": "12.0% - 15.0%",
      "corporateTenants": ["Cognizant", "Infosys", "Wipro", "TCS", "Accenture", "Tata Technologies", "Persistent Systems"],
      "transitCatalysts": [
        "Pune Metro Line 3 Station: 800 meters from Blue Ridge entrance (operational 2026-2027)",
        "Mahalunge-Hinjewadi River Bridge: Direct 10-minute access to Baner & Balewadi High Street",
        "Mumbai-Pune Expressway: 10 minutes via Wakad / Dehu Road bypass"
      ],
      "nriInvestment": {
        "femaCompliant": true,
        "repatriationSupported": true,
        "bankingPartners": ["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank"],
        "remotePurchaseWorkflow": "Virtual 360 walkthrough, digital documentation, and Consulate Power of Attorney (POA)"
      }
    }
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      'Access-Control-Allow-Origin': '*'
    }
  });
};

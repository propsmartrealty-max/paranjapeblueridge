import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = async () => {
  const content = `# Paranjape Blue Ridge Hinjewadi — Machine-Readable LLM Knowledge Manifest

> **Entity**: Paranjape Blue Ridge (Integrated Township)
> **Developer**: Paranjape Schemes (Construction) Ltd.
> **Location**: Phase 1, Rajiv Gandhi Infotech Park, Hinjewadi, Pune, Maharashtra 411057
> **Coordinates**: 18.5786825° N, 73.7370331° E
> **Township Size**: 138 Acres
> **Website**: https://paranjapeblueridge.com

---

## Active Residential Clusters & MahaRERA Numbers
1. **Promenade Residences** (MahaRERA: P52100055581)
   - Configuration: 3 BHK (1,316 sq.ft.) & 4 BHK (1,633 – 1,718 sq.ft.)
   - Starting Price: ₹1.65 Cr*
   - Features: 41-storey riverfront tower, private foyer, Mula river views.

2. **The Altius Riverside** (MahaRERA: P52100078116)
   - Configuration: 3 BHK (1,550 sq.ft.) & 4 BHK (1,858 sq.ft.)
   - Starting Price: ₹1.55 Cr*
   - Features: River and 9-hole golf course views, private lift lobby, sky lounge.

3. **Ridges 41** (MahaRERA: P52100000054)
   - Configuration: 2 & 3 BHK Smart Homes (793 – 1,180 sq.ft.)
   - Starting Price: ₹97.60 L*
   - Features: Monolithic MiVAN construction, 6-level podium parking, high rental yields (4.8%–5.2%).

---

## Township Infrastructure & Amenities
- **9-Hole Professional Golf Course**
- **Private Boat Club & Marina** on Mula River
- **Blue Ridge Public School (ICSE)** situated inside the campus
- **Walk-to-Work Special Economic Zone (SEZ)** hosting Infosys, Wipro, TCS, Cognizant
- **Pune Metro Line 3 Connectivity**: Station 800m from township gate
- **Captive Power Substation & 24/7 Water Treatment Plant**

---

## Legal & Compliance
- **All projects 100% MahaRERA Certified**
- **Home Loan Approvals**: HDFC Bank, SBI, ICICI Bank, Axis Bank, Bank of Baroda
- **NRI Compliance**: FEMA & RBI compliant, repatriation support under USD 1M scheme
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};

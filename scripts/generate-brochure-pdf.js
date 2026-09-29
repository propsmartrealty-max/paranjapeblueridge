const fs = require('fs');
const path = require('path');

function createPdf() {
  const content = [
    'BT',
    '/F1 22 Tf',
    '50 740 Td',
    '(PARANJAPE BLUE RIDGE - MASTER TOWNSHIP 2026) Tj',
    '/F1 11 Tf',
    '0 -25 Td',
    '(Paranjape Schemes Construction Ltd - 138-Acre Integrated Township) Tj',
    '0 -16 Td',
    '(Location: Phase 1, Rajiv Gandhi Infotech Park, Hinjewadi, Pune 411057) Tj',
    '0 -20 Td',
    '(-----------------------------------------------------------------------------------) Tj',
    '/F1 13 Tf',
    '0 -22 Td',
    '(ACTIVE RESIDENTIAL CLUSTERS & SPECIFICATIONS) Tj',
    '/F1 10 Tf',
    '0 -18 Td',
    '(1. PROMENADE RESIDENCES - MahaRERA: P52100055581) Tj',
    '0 -14 Td',
    '(   - Configurations: 3 BHK Luxury 1,316 Sq Ft & 4 BHK River Suites 1,633 - 1,718 Sq Ft) Tj',
    '0 -14 Td',
    '(   - River-facing balconies, 41 storeys, rooftop infinity pool, possession Sept 2029) Tj',
    '0 -18 Td',
    '(2. THE ALTIUS RIVERSIDE - MahaRERA: P52100078116) Tj',
    '0 -14 Td',
    '(   - Configurations: Ultra-Luxury 3 & 4 BHK Golf Course Sky Residences 1,550 - 2,100 Sq Ft) Tj',
    '0 -14 Td',
    '(   - Imported Italian marble, private elevator lobby, direct 9-hole golf course views) Tj',
    '0 -18 Td',
    '(3. RIDGES 41 - MahaRERA: P52100000054) Tj',
    '0 -14 Td',
    '(   - Configurations: Smart 2 & 3 BHK High-Rise Residences 793 - 1,180 Sq Ft) Tj',
    '0 -14 Td',
    '(   - Monolithic MiVAN technology, 6-level podium parking, possession Dec 2028) Tj',
    '0 -20 Td',
    '(-----------------------------------------------------------------------------------) Tj',
    '/F1 13 Tf',
    '0 -22 Td',
    '(INTEGRATED TOWNSHIP AMENITIES & INFRASTRUCTURE) Tj',
    '/F1 10 Tf',
    '0 -18 Td',
    '(- Blue Ridge Public School: ICSE affiliated operational school inside campus) Tj',
    '0 -14 Td',
    '(- 9-Hole Professional Executive Golf Course & Academy) Tj',
    '0 -14 Td',
    '(- Blue Ridge Private Marina & Boat Club on Mula River) Tj',
    '0 -14 Td',
    '(- 3M+ Sq Ft Special Economic Zone SEZ Walk-to-Work IT Tech Park) Tj',
    '0 -14 Td',
    '(- Upcoming Pune Metro Line 3 Station: 800m 7-minute walk) Tj',
    '0 -20 Td',
    '(-----------------------------------------------------------------------------------) Tj',
    '/F1 10 Tf',
    '0 -18 Td',
    '(OFFICIAL ADVISORY & SITE VISITS: Propsmart Realty Authorized Partner) Tj',
    '0 -14 Td',
    '(Phone: +91-20-67210000 | WhatsApp: +91-7744009295 | Website: https://paranjapeblueridge.com) Tj',
    'ET'
  ].join('\n');

  const streamLen = Buffer.byteLength(content, 'utf-8');

  const objects = [
    '%PDF-1.4\n',
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n',
    '4 0 obj\n<< /Length ' + streamLen + ' >>\nstream\n' + content + '\nendstream\nendobj\n',
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n'
  ];

  let offset = Buffer.byteLength(objects[0]);
  const xref = ['xref\n0 6\n0000000000 65535 f \n'];

  let body = objects[0];
  for (let i = 1; i < objects.length; i++) {
    xref.push(String(offset).padStart(10, '0') + ' 00000 n \n');
    body += objects[i];
    offset += Buffer.byteLength(objects[i]);
  }

  const startxref = offset;
  const trailer = 'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n' + startxref + '\n%%EOF\n';

  const finalPdf = body + xref.join('') + trailer;
  const outPath = path.join(process.cwd(), 'public/assets/images/pscl-blue-ridge-master-brochure.pdf');
  fs.writeFileSync(outPath, finalPdf);
  console.log('✅ Generated brochure PDF at:', outPath, 'Size:', fs.statSync(outPath).size, 'bytes');
}

createPdf();

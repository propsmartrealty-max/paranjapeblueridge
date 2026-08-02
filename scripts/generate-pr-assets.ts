import fs from 'fs';
import path from 'path';
import { projects } from '../src/data/master-data';

const OUTPUT_DIR = path.join(__dirname, '../off-page-assets');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Generate Off-Page Outreach Manifest for PR and Guest Blogging
const manifest = {
  generatedAt: new Date().toISOString(),
  canonicalDomain: "https://paranjapeblueridge.com",
  targetKeywords: [
    "Paranjape Blue Ridge Hinjewadi",
    "Pune Real Estate Market",
    "Luxury 3 BHK and 4 BHK Homes in Hinjewadi Pune",
    "Paranjape Blue Ridge Promenade Hinjewadi Pune",
    "Paranjape Blue Ridge Altius Hinjewadi Pune",
    "Paranjape Blue Ridge 41 Hinjewadi Pune",
    "Walk to Work IT Park Apartments Hinjewadi",
    "Best Real Estate Investment in West Pune"
  ],
  outreachChannels: [
    { channel: "Medium", format: "Long-form Thought Leadership Article" },
    { channel: "LinkedIn Pulse", format: "Corporate Real Estate Executive Pulse" },
    { channel: "Blogger / WordPress", format: "Lifestyle & Golf Course Living Review" },
    { channel: "Quora Answers", format: "High-Intent Q&A Answers for Hinjewadi Buyers" },
    { channel: "Press Release Wire", format: "Official Developer Announcement Template" }
  ],
  inventorySummary: projects.map(p => ({
    name: p.name,
    tagline: p.tagline,
    price: p.price,
    rera: p.reraNumber || 'Verified',
    url: `https://paranjapeblueridge.com/${p.slug}`
  }))
};

fs.writeFileSync(
  path.join(OUTPUT_DIR, 'outreach-manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log("🚀 Off-Page PR & Outreach Manifest generated successfully at off-page-assets/outreach-manifest.json!");

import fs from 'fs';
import path from 'path';

describe('Enquiry Form & Lead Dispatch Pipeline', () => {
  const rootDir = path.resolve(__dirname, '..');

  it('verifies src/pages/api/lead.ts routes leads to propsmartrealty@gmail.com', () => {
    const filePath = path.join(rootDir, 'src/pages/api/lead.ts');
    expect(fs.existsSync(filePath)).toBe(true);
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toContain("const NOTIFICATION_EMAIL = 'propsmartrealty@gmail.com'");
    expect(content).toContain('formsubmit.co/ajax');
    expect(content).toContain('propsmartrealty@gmail.com');
  });

  it('verifies src/pages/api/enquiry.ts exists and delegates to lead handler', () => {
    const filePath = path.join(rootDir, 'src/pages/api/enquiry.ts');
    expect(fs.existsSync(filePath)).toBe(true);
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toContain("import { POST as leadPost } from './lead'");
    expect(content).toContain('propsmartrealty@gmail.com');
  });

  it('verifies functions/api/lead.js routes to propsmartrealty@gmail.com across redundant channels', () => {
    const filePath = path.join(rootDir, 'functions/api/lead.js');
    expect(fs.existsSync(filePath)).toBe(true);
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toContain('const NOTIFICATION_EMAIL = "propsmartrealty@gmail.com"');
    expect(content).toContain('formsubmit.co/ajax');
    expect(content).toContain('propsmartrealty@gmail.com');
  });

  it('verifies functions/api/enquiry.ts routes to propsmartrealty@gmail.com', () => {
    const filePath = path.join(rootDir, 'functions/api/enquiry.ts');
    expect(fs.existsSync(filePath)).toBe(true);
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toContain('propsmartrealty@gmail.com');
    expect(content).toContain('formsubmit.co/ajax');
  });

  it('verifies EnquiryModal.tsx has direct fallback to propsmartrealty@gmail.com', () => {
    const filePath = path.join(rootDir, 'src/components/EnquiryModal.tsx');
    expect(fs.existsSync(filePath)).toBe(true);
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toContain('https://formsubmit.co/ajax/propsmartrealty@gmail.com');
  });

  it('verifies SiteVisitBooking.tsx has direct fallback to propsmartrealty@gmail.com', () => {
    const filePath = path.join(rootDir, 'src/components/SiteVisitBooking.tsx');
    expect(fs.existsSync(filePath)).toBe(true);
    const content = fs.readFileSync(filePath, 'utf8');
    expect(content).toContain('https://formsubmit.co/ajax/propsmartrealty@gmail.com');
  });
});

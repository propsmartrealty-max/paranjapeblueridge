# Paranjape Blue Ridge Sovereign Platform Rules

## 1. Canonical Domain & Global SEO
- **Canonical URL**: Always enforce `https://paranjapeblueridge.com` (non-www mandatory; www requests must 301 redirect).
- **Hreflang `x-default`**: Every page metadata and sitemap entry MUST include `'x-default'` pointing to the primary English canonical URL alongside `'en-IN'` and `'mr-IN'`.
- **Sitemap Priority Matrix**: 
  - `1.0`: Core Homepage (`/` & `/mr`)
  - `0.90`: Township Projects & Micro-Market Guides
  - `0.85`: High-Intent Commercial, Price List, Floor Plan, & NRI Investment Silos
  - `0.80`: Floor Configurations & Insight Articles
  - `0.60`: Competitor & Battleground Comparison Silos

## 2. Edge Performance & Caching
- **Zero-Cookie Middleware**: Never set cookies in `middleware.ts` to prevent invalidating Vercel Edge 0.0ms Static Site Generation (SSG).
- **NRI Currency Hydration**: Client-side post-hydration for non-IN IP traffic based on `x-user-country` (USD, AED, GBP, EUR, SGD).
- **WAF Throttling**: IP rate limiting capped at 120 req/min with Googlebot/Bingbot whitelist.

## 3. MahaRERA Regulatory Compliance
- Mandatory RERA numbers must be present on project pages, footers, and structured data:
  - **Promenade Residences**: `P52100055581`
  - **The Altius**: `P52100078116`
  - **Ridges 41**: `P52100000054`

## 4. Quality & Build Verification
- All 19,480 PSEO matrix slugs must be unique, lowercase, hyphenated.
- Always verify changes by running `npm test` and `node scripts/verify-seo-integrity.js`.

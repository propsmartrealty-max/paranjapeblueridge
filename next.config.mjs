/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    minimumCacheTTL: 31536000,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'www.pscl.in',
      pathname: '/**',
    }],
  },
  staticPageGenerationTimeout: 300,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  trailingSlash: false,
  async rewrites() {
    return [];
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), payment=(), usb=(), display-capture=()' },
        { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://www.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https: https://www.pscl.in https://maps.gstatic.com https://maps.googleapis.com https://www.google-analytics.com https://www.googletagmanager.com https://challenges.cloudflare.com https://*.google.com https://*.googleapis.com https://*.gstatic.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.co.in https://lh3.googleusercontent.com; connect-src 'self' https://challenges.cloudflare.com https://region1.google-analytics.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://script.google.com https://formsubmit.co https://api.indexnow.org https://www.bing.com https://maps.googleapis.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://stats.g.doubleclick.net https://analytics.google.com https://vercel.live; frame-src 'self' https://challenges.cloudflare.com https://www.google.com https://maps.google.com https://www.youtube.com https://youtube.com; object-src 'none'; base-uri 'self'; form-action 'self' https://challenges.cloudflare.com https://formsubmit.co; frame-ancestors 'self'; upgrade-insecure-requests;" },
      ],
    },
    {
      source: '/assets/images/:all*(svg|jpg|jpeg|png|webp|avif)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '/_next/static/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    }];
  },
};

export default nextConfig;

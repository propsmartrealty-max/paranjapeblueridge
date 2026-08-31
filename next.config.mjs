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
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), payment=(), usb=()' },
        { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://maps.googleapis.com https://challenges.cloudflare.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https://www.pscl.in https://maps.gstatic.com https://maps.googleapis.com https://www.google-analytics.com https://*.google.com https://*.googleapis.com https://*.gstatic.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.co.in https://lh3.googleusercontent.com; connect-src 'self' https://region1.google-analytics.com https://www.google-analytics.com https://maps.googleapis.com https://challenges.cloudflare.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://stats.g.doubleclick.net https://analytics.google.com https://vercel.live wss://ws-us3.pusher.com https://api.web3forms.com; frame-src 'self' https://www.google.com https://maps.google.com https://challenges.cloudflare.com; frame-ancestors 'self';" },
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

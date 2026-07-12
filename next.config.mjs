/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'www.pscl.in',
      pathname: '/**',
    }],
  },
  staticPageGenerationTimeout: 1000,
  pageExtensions: ['tsx', 'mdx'],
  experimental: { workerThreads: false, cpus: 1 },
  trailingSlash: false,
  async redirects() {
    return [{
      source: '/:path*',
      has: [{ type: 'host', value: 'paranjapeblueridge.com' }],
      destination: 'https://www.paranjapeblueridge.com/:path*',
      permanent: true,
    }];
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
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'X-Robots-Tag', value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://maps.googleapis.com https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.pscl.in https://maps.gstatic.com https://maps.googleapis.com; connect-src 'self' https://region1.google-analytics.com https://maps.googleapis.com https://vercel.live wss://ws-us3.pusher.com;" },
      ],
    },
    {
      source: '/assets/images/:all*(svg|jpg|jpeg|png|webp|avif)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    }];
  },
  output: 'standalone',
};

export default nextConfig;

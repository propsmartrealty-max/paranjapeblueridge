/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.pscl.in',
                port: '',
                pathname: '/**',
            },
        ],
    },
    trailingSlash: false,
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'paranjapeblueridge.com' }],
                destination: 'https://www.paranjapeblueridge.com/:path*',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;

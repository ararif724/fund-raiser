import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//     /* config options here */
// };

// next.config.js
const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://fund-raiser.atrec.app/public/api/:path*', // Proxy to backend
            },
        ];
    },
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: 'https://fundraiseret.vercel.app',
                    },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,POST,PUT,DELETE,OPTIONS',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-Requested-With, Content-Type, Authorization',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;

export default nextConfig;

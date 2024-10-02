/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
                pathname: '**',
                port: '3000',
                protocol: 'http',
            },
            {
                hostname: 'uperhaps.up.railway.app', // Replace with your actual Railway domain
                pathname: '**',
                protocol: 'https',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            'node-fetch': 'node-fetch/lib/index.js',
        };
        return config;
    },
};

module.exports = nextConfig;
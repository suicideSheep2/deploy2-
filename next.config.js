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
        ],
    },
    webpack: (config) => {
        // Resolve ESM imports
        config.resolve.alias = {
            ...config.resolve.alias,
            'node-fetch': 'node-fetch/lib/index.js',
        };

        return config;
    },
};

module.exports = nextConfig;

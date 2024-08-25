/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    images: {

        remotePatterns: [
            {
                hostname: "localhost",
                pathname: '**',
                port: "3000",
                protocol: 'http',
               
            },
        ],
    },
}


export default nextConfig;

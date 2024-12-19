/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
            protocol: "http",
            hostname: "localhost",
          },
          {
          protocol: "https",
          hostname: "poetry-web2-production.up.railway.app",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
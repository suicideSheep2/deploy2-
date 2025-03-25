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
          hostname: "zooming-rebirth-production-6e37.up.railway.app",
        },
      ],
    },
  };
  
  module.exports = nextConfig;

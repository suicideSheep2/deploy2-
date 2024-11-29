/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "poetry-web2.vercel.app/",
        },
      ],
    },
  };
  
  module.exports = nextConfig;
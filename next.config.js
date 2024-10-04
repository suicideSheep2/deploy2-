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
		  hostname: "uperhaps.up.railway.app",
		},
	  ],
	},
	// Add this line to disable minification
	swcMinify: false,
  };
  
  module.exports = nextConfig;
  
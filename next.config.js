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
                hostname: "poetry-web2.vercel.app/", 
                
            },
		],
	},
};

module.exports = nextConfig;

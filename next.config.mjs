/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "cdn.lystio.co",
          },
        ],
      },
};

export default nextConfig;

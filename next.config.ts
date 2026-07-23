import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: '/obra',
        destination: 'https://www.instagram.com/reels/DbEc3sRxYKM/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

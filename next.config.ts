import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/applications", destination: "/apps", permanent: true },
      { source: "/applications/:path*", destination: "/apps/:path*", permanent: true },
    ];
  },
};

export default nextConfig;

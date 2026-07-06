import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/applications", destination: "/apps", permanent: true },
      { source: "/applications/:path*", destination: "/apps/:path*", permanent: true },
      // Verse legal pages live at the top level, not nested under /apps.
      { source: "/apps/verse/:path*", destination: "/verse/:path*", permanent: true },
    ];
  },
};

export default nextConfig;

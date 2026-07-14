import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory makes Turbopack infer ~ as the
  // workspace root, which broke dev-server file watching (stale CSS after
  // globals.css edits). Pin the root to this repo.
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      { source: "/applications", destination: "/apps", permanent: true },
      { source: "/applications/:path*", destination: "/apps/:path*", permanent: true },
      // Verse legal pages live at the top level, not nested under /apps.
      { source: "/apps/verse/:path*", destination: "/verse/:path*", permanent: true },
      // The to-do app's canonical URL is /apps/notes.
      { source: "/notes", destination: "/apps/notes", permanent: true },
    ];
  },
};

export default nextConfig;

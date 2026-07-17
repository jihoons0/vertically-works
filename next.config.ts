import type { NextConfig } from "next";

// App subdomains → their internal /run/* route. host-matched so they only fire
// on the subdomain; on localhost the /run/* paths stay directly reachable.
const APP_HOSTS: Array<[host: string, base: string]> = [
  ["news.vertically.works", "/run/news"],
  ["todo.vertically.works", "/run/todo"],
  ["listen.vertically.works", "/run/listen"],
  ["chat.vertically.works", "/run/chat"],
];

const TESTFLIGHT_URL = "https://testflight.apple.com/join/DY7MKU7m";

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory makes Turbopack infer ~ as the
  // workspace root, which broke dev-server file watching (stale CSS after
  // globals.css edits). Pin the root to this repo.
  turbopack: {
    root: __dirname,
  },

  async rewrites() {
    return {
      // Root of each app subdomain must beat the marketing homepage.
      beforeFiles: APP_HOSTS.map(([host, base]) => ({
        source: "/",
        has: [{ type: "host" as const, value: host }],
        destination: base,
      })),
      // Everything else on the subdomain (e.g. /article/[id]) runs AFTER
      // filesystem routes, _next assets, and /api, so those pass through untouched.
      afterFiles: APP_HOSTS.map(([host, base]) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: `${base}/:path*`,
      })),
      fallback: [],
    };
  },

  async redirects() {
    return [
      { source: "/applications", destination: "/apps", permanent: true },
      { source: "/applications/:path*", destination: "/apps/:path*", permanent: true },

      // Verse is iOS-only: the whole verse subdomain bounces to TestFlight.
      // permanent:false (307) — TestFlight join URLs rotate; don't cache forever.
      {
        source: "/:path*",
        has: [{ type: "host", value: "verse.vertically.works" }],
        destination: TESTFLIGHT_URL,
        permanent: false,
      },

      // Old detail slugs → new short slugs.
      { source: "/apps/vertically-verse", destination: "/apps/verse", permanent: true },
      { source: "/apps/vertically-do", destination: "/apps/todo", permanent: true },
      { source: "/apps/vertically-news", destination: "/apps/news", permanent: true },
      { source: "/apps/vertically-listen", destination: "/apps/listen", permanent: true },

      // Old to-do running-app path (folder was `notes`) → the to-do detail page.
      { source: "/apps/notes", destination: "/apps/todo", permanent: true },
      { source: "/apps/notes/:path*", destination: "/apps/todo", permanent: true },
      { source: "/notes", destination: "/apps/todo", permanent: true },

      // Old news article deep links → the news subdomain's article route.
      {
        source: "/apps/news/article/:id",
        destination: "https://news.vertically.works/article/:id",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

// App subdomains → their internal /run/* route. host-matched so they only fire
// on the subdomain; on localhost the /run/* paths stay directly reachable.
const APP_HOSTS: Array<[host: string, base: string]> = [
  ["news.vertically.works", "/run/news"],
  ["todo.vertically.works", "/run/todo"],
  ["listen.vertically.works", "/run/listen"],
  ["chat.vertically.works", "/run/chat"],
];

// Mirrors VERSE_APP_STORE_URL in lib/appUrls.ts · next.config is evaluated
// outside the module graph, so the two are kept in sync by hand.
const VERSE_APP_STORE_URL = "https://apps.apple.com/us/app/vertically-verse/id6787391508";

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

      // Verse is iOS-only: the whole verse subdomain bounces to the App Store.
      // permanent:false (307) — kept temporary so the destination stays ours to
      // change (a 308 would be cached in browsers indefinitely).
      {
        source: "/:path*",
        has: [{ type: "host", value: "verse.vertically.works" }],
        destination: VERSE_APP_STORE_URL,
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

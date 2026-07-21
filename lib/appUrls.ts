// Public home of each running app. In production it lives on its own subdomain;
// in local dev (no subdomains) it's the same-origin /run/<app> route that the
// subdomain host-rewrite points at. Use for "open the app" links; keep iframe
// embeds on the same-origin /run/<app> path directly (no cross-origin frame).
export const APP_HOSTS = {
  todo: "todo.vertically.works",
  news: "news.vertically.works",
  listen: "listen.vertically.works",
  chat: "chat.vertically.works",
} as const;

// Verse ships on the App Store (iOS only · no web build). next.config.ts keeps
// its own copy for the verse.vertically.works redirect — config is evaluated
// outside the module graph, so update both together.
export const VERSE_APP_STORE_URL =
  "https://apps.apple.com/us/app/vertically-verse/id6787391508";

export type RunningApp = keyof typeof APP_HOSTS;

export function runningAppUrl(app: RunningApp): string {
  return process.env.NODE_ENV === "production" ? `https://${APP_HOSTS[app]}` : `/run/${app}`;
}

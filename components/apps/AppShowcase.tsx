import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AppVideo } from "@/components/home/AppVideo";
import { AppShowcaseShader } from "@/components/home/AppShowcaseShader";

export type AppMedia =
  | { type: "video"; src: string; aspect: string }
  | { type: "image"; src: string }
  | null;

export type ShowcaseApp = {
  id: string;
  name: string;
  platform: string;
  status: "Live" | "Beta" | "WIP";
  href: string;
  description: string;
  /** Short one-liner shown beside the title on the home tile. */
  tagline?: string;
  media: AppMedia;
};

export function StatusPill({ status }: { status: ShowcaseApp["status"] }) {
  const live = status === "Live";
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        fontSize: "0.6875rem", fontWeight: 500,
        color: live ? "var(--color-fg)" : "var(--color-fg-subtle)",
        padding: "2px 8px", borderRadius: "var(--radius-full)",
        border: "1px solid",
        borderColor: live ? "var(--color-border-strong)" : "var(--color-border)",
      }}
    >
      {live && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />}
      {status}
    </span>
  );
}

/**
 * Full-width flagship app card · media on one side (its own frozen mesh shader
 * plus a device video / screenshot, or the shader alone when there's no asset),
 * copy on the other. Rows alternate sides via `reverse`. Shared by the home page
 * and the /apps index so both read identically.
 */
export function AppShowcase({ app, reverse }: { app: ShowcaseApp; reverse: boolean }) {
  return (
    <Link href={app.href} className={`card-hover app-showcase${reverse ? " reverse" : ""}`}>
      <div className="app-showcase-media">
        <AppShowcaseShader appId={app.id} />
        {app.media?.type === "video" ? (
          <div className="app-showcase-frame" style={{ aspectRatio: app.media.aspect }}>
            <AppVideo src={app.media.src} label={`${app.name} demo`} />
          </div>
        ) : app.media?.type === "image" ? (
          <img src={app.media.src} alt={`${app.name} preview`} className="app-showcase-shot" />
        ) : null}
      </div>

      <div className="app-showcase-body">
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", flexWrap: "wrap", marginBottom: "var(--space-1)" }}>
          <StatusPill status={app.status} />
          <span style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)" }}>{app.platform}</span>
        </div>
        <h3 style={{ fontSize: "clamp(1.375rem, 2.4vw, 1.875rem)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: 0, lineHeight: 1.1 }}>
          {app.name}
        </h3>
        <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.6, maxWidth: "46ch" }}>
          {app.description}
        </p>
        <span className="app-showcase-cta" style={{ marginTop: "var(--space-2)" }}>
          View case study
          <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
        </span>
      </div>
    </Link>
  );
}

/**
 * Compact app tile · the app's frozen mesh shader plus its demo video, with just
 * the title captioned below. The whole tile links to the case study. Used on the
 * home page as a 2×2 grid; the fuller AppShowcase lives on /apps.
 */
export function AppTile({ app }: { app: ShowcaseApp }) {
  return (
    <Link href={app.href} className="app-tile" aria-label={`${app.name} — view case study`}>
      <div className="app-tile-media">
        <AppShowcaseShader appId={app.id} />
        {app.media?.type === "video" ? (
          <div className="app-tile-frame" style={{ aspectRatio: app.media.aspect }}>
            <AppVideo src={app.media.src} label={`${app.name} demo`} />
          </div>
        ) : app.media?.type === "image" ? (
          <img src={app.media.src} alt={`${app.name} preview`} className="app-tile-shot" />
        ) : null}
      </div>
      <div className="app-tile-caption">
        <span className="app-tile-title">{app.name}</span>
        {app.tagline && <span className="app-tile-tagline">{app.tagline}</span>}
        <ArrowUpRight size={16} strokeWidth={2.25} className="app-tile-arrow" aria-hidden />
      </div>
    </Link>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppVideo } from "@/components/home/AppVideo";
import { InstallBanner } from "@/components/ui/InstallBanner";

export const metadata: Metadata = {
  title: "Applications",
  description: "Real implementations of vertical-first interface design across product categories.",
};

const APPS = [
  {
    id: "verse",
    name: "Verse",
    platform: "iOS",
    status: "Live",
    video: "/videos/vertically-verse.mp4",
    description:
      "A fully vertical, right-to-left Bible reader.",
    challenges: [
      "Columns snap per column, not per page",
      "Tate-chu-yoko (縦中横) verse numbers",
      "RTL-native chrome · scroll-driven immersion",
    ],
  },
  {
    id: "todo",
    name: "To-do",
    platform: "Web",
    status: "Live",
    href: "/apps/todo",
    video: "/videos/vertically-notes.mp4",
    videoAspect: "1294 / 1484",
    description:
      "A to-do list where tasks are vertical columns.",
    challenges: [
      "Tasks as full-height columns, stacking right→left",
      "Pull down to delete · drag sideways to reorder",
      "한 / あ / 中 re-localizes the whole interface",
    ],
  },
  {
    id: "news",
    name: "News",
    platform: "Web",
    status: "Live",
    href: "/apps/news",
    description:
      "A daily front page of live KR/JP/CN headlines, set as a vertical newspaper.",
    challenges: [
      "Live RSS headlines as full-height columns, first story at the right edge",
      "Real-world digits, acronyms, and kinsoku · the typography stress test",
      "Pull past the leftmost column to turn the page",
    ],
  },
  {
    id: "listen",
    name: "Listen",
    platform: "Web",
    status: "WIP",
    href: "/apps/listen",
    description:
      "A podcast player with transcripts as vertical verse.",
    challenges: [
      "Shows › episodes › playing · browsing never stops playback",
      "Transcripts as vertical verse · tap a line to seek",
      "Reading stays vertical · transport stays horizontal",
    ],
  },
  {
    id: "chat",
    name: "Chat",
    platform: "Web",
    status: "Live",
    href: "/apps/chat",
    video: "/videos/vertically-chat.mp4",
    videoAspect: "1828 / 1544",
    description:
      "An AI chat interface for vertical, right-to-left reading.",
    challenges: [
      "Where a new message enters a vertical thread",
      "Separating two speakers on one reading axis",
      "Where the composer sits without fighting the flow",
    ],
  },
];

export default function ApplicationsPage() {
  return (
    <>
      <PageHeader title="Vertically Apps" />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-6) var(--space-16)",
        }}
      >
        <div className="apps-grid">
          {APPS.map((app) => {
            // Cards link to their detail page when one exists (Live apps default
            // to /apps/<id>); only apps with no page yet render non-interactive.
            const href =
              "href" in app && app.href ? app.href : app.status === "Live" ? `/apps/${app.id}` : null;
            const blocked = !href;
            const video = "video" in app && app.video ? app.video : null;
            const cardStyle = {
              display: "block",
              padding: "var(--space-8)",
              borderRadius: "var(--radius-xl)",
              // width/style only — the `border` shorthand would reset
              // border-color to currentColor over .card-hover's token
              borderWidth: 1,
              borderStyle: "solid",
              height: "100%",
            } as const;

            const inner = (
              <div className={video ? "app-card-inner has-media" : "app-card-inner"}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-3)", flexWrap: "wrap" }}>
                    <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--color-fg)", margin: 0, letterSpacing: "-0.02em" }}>
                      {app.name}
                    </h2>
                    <span
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        fontSize: "0.6875rem", fontWeight: 500,
                        color: app.status === "Live" ? "var(--color-fg)" : "var(--color-fg-subtle)",
                        padding: "2px 8px", borderRadius: "var(--radius-full)", border: "1px solid",
                        borderColor: app.status === "Live" ? "var(--color-border-strong)" : "var(--color-border)",
                      }}
                    >
                      {app.status === "Live" && (
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                      )}
                      {app.status}
                    </span>
                    <span style={{ fontSize: "0.8125rem", color: "var(--color-fg-subtle)" }}>{app.platform}</span>
                  </div>

                  <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-5)", lineHeight: 1.65 }}>
                    {app.description}
                  </p>

                  {app.challenges && (
                    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                      {app.challenges.map((c, i) => (
                        <li key={i} style={{ display: "flex", gap: "var(--space-3)", alignItems: "baseline" }}>
                          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--color-border-strong)", flexShrink: 0, marginTop: 7, display: "inline-block" }} />
                          <span style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)" }}>{c}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {video && (
                  <div
                    style={{
                      width: 180,
                      // Frame each demo at its own aspect so nothing gets cropped
                      aspectRatio: ("videoAspect" in app && app.videoAspect) || "2 / 3",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                      border: "1px solid var(--color-border)",
                      background: "var(--color-bg-muted)",
                      flexShrink: 0,
                    }}
                  >
                    <AppVideo src={video} label={`${app.name} demo`} />
                  </div>
                )}
              </div>
            );

            return blocked ? (
              <div
                key={app.id}
                aria-disabled="true"
                style={{ ...cardStyle, borderColor: "var(--color-border)", opacity: 0.7, cursor: "not-allowed" }}
              >
                {inner}
              </div>
            ) : (
              <Link key={app.id} href={href!} className="card-hover" style={cardStyle}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ═══════════════ Build your own · shared install banner ═══════════════ */}
      <InstallBanner />
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AppVideo } from "@/components/home/AppVideo";
import { InstallCard } from "@/components/ui/InstallCard";

export const metadata: Metadata = {
  title: "Applications",
  description: "Real implementations of vertical-first interface design across product categories.",
};

const APPS = [
  {
    id: "vertically-verse",
    name: "Vertically Verse",
    platform: "iOS",
    status: "Live",
    video: "/videos/vertically-verse.mp4",
    description:
      "A fully vertical, right-to-left Bible reader for Korean, Japanese, and Chinese.",
    challenges: [
      "Column-based layout that snaps per column, not per page",
      "Tate-chu-yoko (縦中横) for verse numbers and digit groups",
      "RTL-native chrome with scroll-driven immersion",
      "Horizontal pull-to-paginate for chapter navigation",
      "Mixed CJK + Latin glyph orientation per character kind",
    ],
  },
  {
    id: "notes",
    name: "Vertically Notes",
    platform: "Web",
    status: "Live",
    href: "/apps/vertically-do",
    video: "/videos/vertically-notes.mp4",
    videoAspect: "1294 / 1484",
    description:
      "A to-do list on the vertical, right-to-left axis — tasks are columns you read top→bottom and reorder sideways.",
    challenges: [
      "Tasks as full-height columns that stack right→left and scroll on the column axis",
      "Vertical pull-to-delete with a trashcan revealed behind the card",
      "Orthogonal drag axes · vertical deletes, horizontal reorders",
      "contentEditable vertical-text input that stays column-centered",
      "한 / あ / 中 language toggle re-localizing the entire interface",
    ],
  },
  {
    id: "listen",
    name: "Listen",
    platform: "Web",
    status: "WIP",
    description:
      "A podcast player on the vertical, right-to-left axis — CJK shows over open RSS, with transcripts as time-synced vertical verse you tap to seek.",
    challenges: [
      "Hierarchy you can trace · shows › episodes › playing, every crumb live, playback never interrupted while browsing",
      "Shelf cells as full-height rounded columns with status pills, stacking right→left",
      "Time-synced transcripts as vertical verse · the active line carries the accent, auto-scrolls, and seeks on tap",
      "Show notes as a labeled intro panel when a feed has no transcript · untimed text never fakes sync",
      "The horizontal/vertical split: reading is vertical, navigation and transport are horizontal",
    ],
  },
  {
    id: "maps",
    name: "Maps",
    platform: "Concept",
    status: "Planned",
    description: null,
    question: "How do directional labels and navigation instructions adapt to a vertical reading axis?",
    challenges: [
      "Place name labels in a horizontal map vs a vertical reading interface",
      "Turn-by-turn directions: vertical list or horizontal carousel?",
      "Search results and location details in vertical columns",
    ],
  },
];

export default function ApplicationsPage() {
  return (
    <>
      <PageHeader
        title="Real Implementations"
        description="What happens when vertical-first thinking is applied to actual product categories. Each application surfaces a different set of design challenges."
        descriptionWide
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-6) var(--space-16)",
        }}
      >
        <div className="apps-grid">
          {APPS.map((app) => {
            // Only Live apps are enterable; WIP / Planned render as non-interactive cards.
            const blocked = app.status !== "Live";
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
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: video ? "1fr auto" : "1fr",
                  gap: "var(--space-6)",
                  alignItems: "start",
                }}
              >
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
                    {app.description ?? app.question}
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
              <Link
                key={app.id}
                href={"href" in app && app.href ? app.href : `/apps/${app.id}`}
                className="card-hover"
                style={cardStyle}
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ═══════════════ Build your own · npx unite ═══════════════ */}
      <section className="tint-panel" style={{ borderTop: "1px solid var(--color-border)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 8vw, 96px) var(--space-6)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)", alignItems: "flex-start" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: 0, lineHeight: 1.15, maxWidth: "20ch" }}>
              Ready to make your own vertical UI app?
            </h2>
            <p style={{ fontSize: "1rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.65, maxWidth: "56ch" }}>
              Every primitive these apps are built on is yours to copy · real{" "}
              <code style={{ fontFamily: "var(--font-geist-mono)", fontSize: "0.85em" }}>writing-mode: vertical-rl</code>{" "}
              components, tokens only, no runtime dependency. Install the tokens once, then add any component.
            </p>
            <div style={{ width: "100%", maxWidth: 560 }}>
              <InstallCard command="npx verticallyworks init" github="https://github.com/jihoons0/vertically-works" />
            </div>
            <Link
              href="/components"
              className="btn-cta-hover pressable"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                height: 40, padding: "0 var(--space-5)",
                fontSize: "0.9375rem", fontWeight: 500,
                borderRadius: "var(--radius-lg)",
                border: "1px solid", color: "var(--color-fg)",
              }}
            >
              View components →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

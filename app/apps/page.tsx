import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

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
    icon: "聖",
    description:
      "A fully vertical, right-to-left Bible reader for Korean, Japanese, and Chinese. Every control, gesture, transition, and reading affordance rethought for the top→bottom, R→L axis.",
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
    name: "To-do",
    platform: "Web",
    status: "Live",
    icon: "記",
    href: "/apps/notes",
    description:
      "Vertically Do — a to-do list rethought for the vertical, right-to-left axis. Tasks are columns you read top→bottom, newest at the reading start; drag a column down to delete (a trashcan opens behind it in the vacated slot), sideways to reorder, and switch the whole interface across 한 / あ / 中.",
    challenges: [
      "Tasks as full-height columns that stack right→left and scroll on the column axis",
      "Vertical pull-to-delete with a trashcan revealed behind the card",
      "Orthogonal drag axes — vertical deletes, horizontal reorders",
      "contentEditable vertical-text input that stays column-centered",
      "한 / あ / 中 language toggle re-localizing the entire interface",
    ],
  },
  {
    id: "listen",
    name: "Listen",
    platform: "Web",
    status: "Live",
    icon: "楽",
    href: "/apps/listen",
    description:
      "Vertically Listen — a music player rethought for the vertical, right-to-left axis. The playlist is a shelf of full-height columns, lyrics fall like verse with line-synced karaoke, and playback advances down the reading axis — play points down, the scrubber fills from the top like text already read. A 차트 mode streams today's CJK top 10 as 30-second previews.",
    challenges: [
      "Transport on the reading axis — previous is up, next is down, play points down",
      "A seek scrubber that fills from the top (time flows like text) vs a volume slider that fills from the bottom (up = more)",
      "Playlist cells as full-height columns with status pills, stacking right→left",
      "Line-synced vertical karaoke — the active lyric column carries the accent and auto-scrolls",
      "Live CJK charts (한국·일본·중국·대만·홍콩) played as official 30-second previews",
    ],
  },
  {
    id: "maps",
    name: "Maps",
    platform: "Concept",
    status: "Planned",
    icon: "地",
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
        eyebrow="Applications"
        title="Real Implementations"
        description="What happens when vertical-first thinking is applied to actual product categories. Each application surfaces a different set of design challenges."
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-6) var(--space-24)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-5)",
        }}
      >
        {APPS.map((app) => (
          <Link
            key={app.id}
            href={"href" in app && app.href ? app.href : `/apps/${app.id}`}
            className="card-hover"
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "var(--space-8)",
              padding: "var(--space-8)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid",
              alignItems: "start",
            }}
          >
            <div
              style={{
                width: 56, height: 56,
                borderRadius: "var(--radius-xl)",
                background: "var(--color-bg-muted)",
                border: "1px solid var(--color-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.5rem", color: "var(--color-fg-muted)", flexShrink: 0,
              }}
              aria-hidden
            >
              {app.icon}
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
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

              <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-5)", lineHeight: 1.65, maxWidth: "56ch" }}>
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
          </Link>
        ))}
      </div>
    </>
  );
}

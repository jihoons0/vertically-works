import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/Reveal";
import { AppShowcase, type ShowcaseApp } from "@/components/apps/AppShowcase";
import { InstallBanner } from "@/components/ui/InstallBanner";

export const metadata: Metadata = {
  title: "Applications",
  description: "Real implementations of vertical-first interface design across product categories.",
};

// All applications, shipped first · Chat is live, Listen is still in progress.
const APPS: ShowcaseApp[] = [
  {
    id: "verse",
    name: "Verse",
    platform: "iOS",
    status: "Live",
    href: "/apps/verse",
    description:
      "A fully vertical, right-to-left Bible for Korean, Japanese, and Chinese. Columns snap one at a time and verse numbers stand upright with tate-chu-yoko.",
    media: { type: "video", src: "/videos/vertically-verse.mp4", aspect: "2 / 3" },
  },
  {
    id: "todo",
    name: "To-do",
    platform: "Web",
    status: "Live",
    href: "/apps/todo",
    description:
      "A to-do list where every task is a full-height column you read top to bottom. Pull down to delete, drag sideways to reorder, and switch 한 / あ / 中 to re-localize the whole interface.",
    media: { type: "video", src: "/videos/vertically-notes.mp4", aspect: "1294 / 1484" },
  },
  {
    id: "news",
    name: "News",
    platform: "Web",
    status: "Live",
    href: "/apps/news",
    description:
      "A daily front page of live Korean, Japanese, and Chinese headlines, set right-to-left as a vertical newspaper — real-world digits, acronyms, and line-breaking under load.",
    media: { type: "video", src: "/videos/vertically-news.mp4", aspect: "1734 / 1544" },
  },
  {
    id: "chat",
    name: "Chat",
    platform: "Web",
    status: "Live",
    href: "/apps/chat",
    description:
      "An AI chat that reads top to bottom, right to left. Every turn is a column — new turns enter from the left, oldest at the right edge, with the composer as the rightmost column.",
    media: { type: "video", src: "/videos/vertically-chat.mp4", aspect: "1828 / 1544" },
  },
  {
    id: "listen",
    name: "Listen",
    platform: "Web",
    status: "WIP",
    href: "/apps/listen",
    description:
      "A podcast player whose transcripts fall as time-synced vertical verse. Reading stays vertical while the transport controls stay horizontal.",
    media: null,
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
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {APPS.map((app, i) => (
            <Reveal key={app.id} delay={i * 60}>
              <AppShowcase app={app} reverse={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* ═══════════════ Build your own · shared install banner ═══════════════ */}
      <InstallBanner />
    </>
  );
}

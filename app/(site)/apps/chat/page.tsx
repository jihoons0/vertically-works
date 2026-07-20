import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AppHero } from "@/components/apps/AppHero";
import { AppVideo } from "@/components/home/AppVideo";
import { RelatedPill } from "@/components/ui/RelatedPill";
import { runningAppUrl } from "@/lib/appUrls";

// Cross-references rendered as badge links: ◆ component · ? challenge · ▲ principle
type Related = { label: string; href: string };

export const metadata: Metadata = {
  title: "Vertically Chat",
  description:
    "An AI chat interface built for vertical, right-to-left reading. Turns are columns, the thread flows right to left, and the assistant streams top to bottom.",
};

const FEATURES = [
  {
    title: "Newest at the left",
    description:
      "The thread is a row of vertical columns. The oldest turn sits flush against the right edge and each new turn enters from the left — the eye moves right→left through the conversation exactly as it does across a page of vertical Japanese. “Newest at the bottom” becomes “newest at the left.”",
    related: [
      { label: "Message", href: "/components/message" },
      { label: "Respect Reading Flow", href: "/principles#reading-flow" },
    ],
  },
  {
    title: "Speakers on one axis",
    description:
      "There are no left/right bubbles — per message there is no left or right in a vertical thread. The speaker is named at the top of each column, where reading begins: a filled mark for you, an open ring for the assistant.",
    related: [
      { label: "Message", href: "/components/message" },
      { label: "AI chat interfaces", href: "/challenges#ai-chat" },
    ],
  },
  {
    title: "A vertical composer",
    description:
      "The input is the rightmost column, where reading (and writing) begins. It commits fully to vertical writing rather than dropping a horizontal bar into the layout — the honest trade-off being the CJK IME candidate window, which assumes a horizontal baseline.",
    related: [
      { label: "Text Field", href: "/components/text-field" },
    ],
  },
  {
    title: "Answers streamed down the column",
    description:
      "Replies come from a real model and stream character-by-character, top to bottom, with a caret riding the writing head. Ask in 日本語, 한국어, or English — the interface, the persona, and the reply all follow the selected language.",
    related: [
      { label: "Mixed Language First", href: "/principles#mixed-first" },
    ],
  },
];

const DECISIONS = [
  {
    title: "Why newest at the left, not the bottom?",
    body: "“Newest at the bottom, scroll down” is a horizontal-page assumption. Vertical text advances right to left across columns, so the natural direction of “new” is leftward. The thread right-anchors: with few turns it hugs the right edge; as it fills, older columns scroll off to the right while the newest stays in view.",
    related: [
      { label: "Respect Reading Flow", href: "/principles#reading-flow" },
      { label: "Motion Has Meaning", href: "/principles#motion-meaning" },
    ],
  },
  {
    title: "Why is the composer a column, not a bar?",
    body: "A bottom input bar is the horizontal chat skeleton showing through. Making the composer the rightmost vertical column keeps the whole surface on one reading axis — you write the next turn where the reading starts. On phones a VisualViewport handler keeps that column above the on-screen keyboard.",
    related: [
      { label: "Text Field", href: "/components/text-field" },
      { label: "AI chat interfaces", href: "/challenges#ai-chat" },
    ],
  },
  {
    title: "Why a real model behind a demo?",
    body: "A canned reply proves the reading model but not the seam where live, unpredictable text meets vertical setting — digits, acronyms, mixed script, variable length. Real streamed answers are the stress test; a canned reply remains only as an offline fallback so the page always responds.",
    related: [
      { label: "Mixed CJK & Latin", href: "/challenges#mixed-language" },
    ],
  },
];

export default function VerticallyChatPage() {
  return (
    <>
      <AppHero
        title="Vertically Chat"
        description="What an AI chat interface becomes when the conversation reads top to bottom, right to left."
        status="Live"
        platform="Web"
        aside={
          <div>
            <h2 style={{ fontFamily: "var(--font-site-sans)", fontSize: "1.0625rem", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--color-fg)", margin: "0 0 var(--space-4)", lineHeight: 1.3 }}>
              Try this
            </h2>
            <Link
              href={runningAppUrl("chat")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-hover"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                height: 40, padding: "0 var(--space-5)",
                fontSize: "0.9375rem", fontWeight: 500,
                borderRadius: "var(--radius-lg)",
                background: "var(--color-fg)", color: "var(--color-bg)",
              }}
            >
              Open the chat
              <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
            </Link>
          </div>
        }
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(48px, 7vw, 80px) var(--space-6) var(--space-24)" }}>
        {/* Demo */}
        <Reveal style={{ marginBottom: "var(--space-16)" }}>
          <div
            style={{
              width: "100%",
              maxWidth: 720,
              margin: "0 auto",
              aspectRatio: "1828 / 1544",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg-muted)",
            }}
          >
            <AppVideo
              src="/videos/vertically-chat.mp4"
              poster="/images/apps/chat-poster.jpg"
              label="Vertically Chat demo · a vertical AI chat reading right to left"
            />
          </div>
        </Reveal>

        <section aria-labelledby="chat-features" style={{ marginBottom: "var(--space-16)" }}>
          <Reveal>
            <h2 id="chat-features" style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-8)" }}>
              Features
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-4)" }}>
            {FEATURES.map((f, i) => (
              <Reveal
                key={f.title}
                delay={i * 40}
                style={{
                  padding: "var(--space-6)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg)",
                }}
              >
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)", margin: "0 0 var(--space-3)", letterSpacing: "-0.01em" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-4)", lineHeight: 1.65 }}>
                  {f.description}
                </p>
                <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                  {(f.related as Related[]).map((r) => (
                    <RelatedPill key={r.label} label={r.label} href={r.href} />
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="chat-decisions" style={{ marginBottom: "var(--space-16)" }}>
          <Reveal>
            <h2 id="chat-decisions" style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-8)" }}>
              Design Decisions
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {DECISIONS.map((d, i) => (
              <Reveal
                key={d.title}
                delay={i * 50}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gap: "var(--space-8)",
                  padding: "var(--space-6) var(--space-8)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-bg)",
                }}
              >
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)", margin: 0, letterSpacing: "-0.01em", lineHeight: 1.45 }}>
                  {d.title}
                </h3>
                <div>
                  <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-4)", lineHeight: 1.65 }}>
                    {d.body}
                  </p>
                  <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                    {(d.related as Related[]).map((r) => (
                      <RelatedPill key={r.label} label={r.label} href={r.href} />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

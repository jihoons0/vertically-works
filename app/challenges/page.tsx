import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { InstallBanner } from "@/components/ui/InstallBanner";
import { RelatedPill } from "@/components/ui/RelatedPill";
import { ChallengeVisual } from "@/components/ChallengeVisual";

export const metadata: Metadata = {
  title: "Challenges",
  description: "Design problems with no obvious answer when the reading axis changes.",
};

// Related pills · `href` links into the component/app that wrestles with the
// challenge; entries without one stay plain concept tags.
type Related = { label: string; href?: string };

const CHALLENGES: {
  id: string;
  tag: string;
  status: string;
  question: string;
  description: string;
  related: Related[];
}[] = [
  {
    id: "motion-direction",
    tag: "Motion",
    status: "Open",
    question: "Should a sheet animate from screen geometry or reading direction?",
    description:
      "When a bottom sheet slides up in a horizontal interface, the direction matches gravity and screen edge proximity. In a vertical, RTL interface, dismissal toward the bottom-right conflicts with the reading direction. Which axis wins?",
    related: [
      { label: "Sheet", href: "/components/sheet" },
      { label: "Dialog", href: "/components/dialog" },
      { label: "Toast", href: "/components/toast" },
    ],
  },
  {
    id: "mixed-language",
    tag: "Typography",
    status: "Partially Resolved",
    question: "How should mixed CJK and Latin content behave in the same column?",
    description:
      "A verse reference like 「창 1:1」 contains hangul, ASCII colon, Latin digits, and CJK brackets · each needing different orientation. Unicode defines orientation per character class, but browser and OS implementations vary significantly.",
    related: [
      { label: "Verse", href: "/components/verse" },
      { label: "Text Field", href: "/components/text-field" },
      { label: "Vertically Verse", href: "/apps/vertically-verse" },
    ],
  },
  {
    id: "navigation-direction",
    tag: "Navigation",
    status: "Open",
    question: "Where does the navigation rail belong in a vertical-first interface?",
    description:
      "Horizontal apps put navigation at the bottom (mobile) or left (desktop) based on thumb reach and primary reading axis. In a vertical, RTL reading interface, the primary axis is down-the-column, and columns flow right-to-left. The \"natural\" position of a rail is not obvious.",
    related: [
      { label: "Tabs", href: "/components/tabs" },
      { label: "Chapter Navigation", href: "/components/chapter-navigation" },
    ],
  },
  {
    id: "selection",
    tag: "Interaction",
    status: "Open",
    question: "How does text selection work when reading flows top-to-bottom, right-to-left?",
    description:
      "Click-drag selection assumes a left-to-right baseline. The OS text selection rectangle must account for RTL column ordering, column breaks, and tate-chu-yoko groups that behave as single units.",
    related: [
      { label: "Marker", href: "/components/marker" },
      { label: "Hyperlink Treatment", href: "/components/hyperlink-treatment" },
      { label: "Vertically Verse", href: "/apps/vertically-verse" },
    ],
  },
  {
    id: "ime-vertical",
    tag: "IME",
    status: "Open",
    question: "Where does the IME candidate window appear when input is vertical?",
    description:
      "Input Method Editors (CJK composition) display candidate windows horizontally by default. In a vertical context, the candidate window placement must not obscure the composition point · but the platform IME API rarely exposes enough control to correct this.",
    related: [
      { label: "Search", href: "/components/search" },
      { label: "Text Field", href: "/components/text-field" },
      { label: "CJK Input" },
    ],
  },
  {
    id: "keyboard-navigation",
    tag: "Accessibility",
    status: "Open",
    question: "What do the arrow keys mean in a vertical, RTL interface?",
    description:
      "Arrow keys in a horizontal interface move left/right within a line and up/down between lines. In a vertical interface, \"next character\" is downward; \"next line\" is leftward. The keyboard navigation model must remap these to prevent disorientation.",
    related: [
      { label: "Tabs", href: "/components/tabs" },
      { label: "Slider", href: "/components/slider" },
      { label: "Popover Menu", href: "/components/popover-menu" },
    ],
  },
  {
    id: "drag-reorder",
    tag: "Interaction",
    status: "Open",
    question: "How does drag-and-drop reordering work when list items are columns?",
    description:
      "List reordering assumes a vertical list of horizontal rows. In a vertical reading interface, a list of columns flowing RTL has a different primary axis for reorder gestures · left-right drag maps to position change, not the usual up-down.",
    related: [
      { label: "Vertical List Cell", href: "/components/vertical-list-cell" },
      { label: "Vertically To-do", href: "/apps/vertically-do" },
    ],
  },
  {
    id: "ai-chat",
    tag: "AI",
    status: "Open",
    question: "How should AI chat interfaces adapt to vertical writing systems?",
    description:
      "AI conversation UIs are designed around horizontal text bubbles alternating left and right. For a CJK user reading vertically, this model imposes a foreign interaction pattern. What would a native vertical AI chat interface look like?",
    related: [
      { label: "Message", href: "/components/message" },
      { label: "Text Field", href: "/components/text-field" },
    ],
  },
];

export default function ChallengesPage() {
  return (
    <>
      <PageHeader title="Why Vertical Interfaces Are Difficult" />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "var(--space-8) var(--space-6) 0" }}>
        <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", lineHeight: 1.65, margin: 0 }}>
          Each challenge is an open{" "}
          <Link
            href="https://github.com/jihoons0/vertically-works/discussions"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-fg)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            Discussion on GitHub
          </Link>
          . Strong answers get merged into the spec.
        </p>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-6) var(--space-24)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
        }}
      >
        {CHALLENGES.map((c, i) => (
          <div key={c.id} id={c.id} className="doc-card has-visual">
            <span className="doc-card-number">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
                <span style={{ fontSize: "0.6875rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {c.tag}
                </span>
                <span
                  style={{
                    fontSize: "0.6875rem", fontWeight: 500,
                    padding: "1px 7px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)",
                    color: "var(--color-fg-subtle)",
                  }}
                >
                  {c.status}
                </span>
              </div>
              <h2 className="doc-card-title">{c.question}</h2>
              <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-4)", lineHeight: 1.65, maxWidth: "62ch" }}>
                {c.description}
              </p>
              {/* Related pills · link straight into the component/app that wrestles with this */}
              <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                {c.related.map((r) => (
                  <RelatedPill key={r.label} label={r.label} href={r.href} />
                ))}
              </div>
              {/* Each challenge is an open RFC Discussion · card index maps to discussion number */}
              <Link
                href={`https://github.com/jihoons0/vertically-works/discussions/${i + 1}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: "var(--space-4)", fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-fg)", textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                Discuss on GitHub
                <ArrowUpRight size={13} strokeWidth={2.25} aria-hidden />
              </Link>
            </div>

            <div
              aria-hidden
              style={{
                alignSelf: "stretch",
                minHeight: 128,
                borderRadius: "var(--radius-lg)",
                background: "var(--color-bg-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "var(--space-4)",
                overflow: "hidden",
              }}
            >
              <ChallengeVisual id={c.id} />
            </div>
          </div>
        ))}
      </div>

      <InstallBanner />
    </>
  );
}

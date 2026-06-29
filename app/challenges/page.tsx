import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Challenges",
  description: "Design problems with no obvious answer when the reading axis changes.",
};

const CHALLENGES = [
  {
    id: "motion-direction",
    tag: "Motion",
    status: "Open",
    question: "Should a sheet animate from screen geometry or reading direction?",
    description:
      "When a bottom sheet slides up in a horizontal interface, the direction matches gravity and screen edge proximity. In a vertical, RTL interface, dismissal toward the bottom-right conflicts with the reading direction. Which axis wins?",
    related: ["Drawer", "Sheet", "Modal"],
  },
  {
    id: "mixed-language",
    tag: "Typography",
    status: "Partially Resolved",
    question: "How should mixed CJK and Latin content behave in the same column?",
    description:
      "A verse reference like 「창 1:1」 contains hangul, ASCII colon, Latin digits, and CJK brackets — each needing different orientation. Unicode defines orientation per character class, but browser and OS implementations vary significantly.",
    related: ["Tate-chu-yoko", "Glyph Orientation", "Mixed Scripts"],
  },
  {
    id: "navigation-direction",
    tag: "Navigation",
    status: "Open",
    question: "Where does the navigation rail belong in a vertical-first interface?",
    description:
      "Horizontal apps put navigation at the bottom (mobile) or left (desktop) based on thumb reach and primary reading axis. In a vertical, RTL reading interface, the primary axis is down-the-column, and columns flow right-to-left. The \"natural\" position of a rail is not obvious.",
    related: ["Navigation Rail", "Sidebar", "Tab Bar"],
  },
  {
    id: "selection",
    tag: "Interaction",
    status: "Open",
    question: "How does text selection work when reading flows top-to-bottom, right-to-left?",
    description:
      "Click-drag selection assumes a left-to-right baseline. The OS text selection rectangle must account for RTL column ordering, column breaks, and tate-chu-yoko groups that behave as single units.",
    related: ["Text Selection", "Highlight", "Copy"],
  },
  {
    id: "ime-vertical",
    tag: "IME",
    status: "Open",
    question: "Where does the IME candidate window appear when input is vertical?",
    description:
      "Input Method Editors (CJK composition) display candidate windows horizontally by default. In a vertical context, the candidate window placement must not obscure the composition point — but the platform IME API rarely exposes enough control to correct this.",
    related: ["Search", "Text Field", "CJK Input"],
  },
  {
    id: "keyboard-navigation",
    tag: "Accessibility",
    status: "Open",
    question: "What do the arrow keys mean in a vertical, RTL interface?",
    description:
      "Arrow keys in a horizontal interface move left/right within a line and up/down between lines. In a vertical interface, \"next character\" is downward; \"next line\" is leftward. The keyboard navigation model must remap these to prevent disorientation.",
    related: ["Keyboard Navigation", "Focus Management", "Accessibility"],
  },
  {
    id: "drag-reorder",
    tag: "Interaction",
    status: "Open",
    question: "How does drag-and-drop reordering work when list items are columns?",
    description:
      "List reordering assumes a vertical list of horizontal rows. In a vertical reading interface, a list of columns flowing RTL has a different primary axis for reorder gestures — left-right drag maps to position change, not the usual up-down.",
    related: ["Sortable List", "Drag and Drop", "Gesture"],
  },
  {
    id: "ai-chat",
    tag: "AI",
    status: "Open",
    question: "How should AI chat interfaces adapt to vertical writing systems?",
    description:
      "AI conversation UIs are designed around horizontal text bubbles alternating left and right. For a CJK user reading vertically, this model imposes a foreign interaction pattern. What would a native vertical AI chat interface look like?",
    related: ["Messaging", "AI Interface", "Chat"],
  },
];

export default function ChallengesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Challenges"
        title="Why Vertical Interfaces Are Difficult"
        description="Design problems that have no obvious answer when the reading axis changes. Some are resolved. Most remain open questions."
      />

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
          <Link
            key={c.id}
            href={`/challenges/${c.id}`}
            className="card-hover"
            style={{
              display: "grid",
              gridTemplateColumns: "40px 1fr auto",
              gap: "var(--space-6)",
              padding: "var(--space-6) var(--space-8)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid",
              alignItems: "start",
            }}
          >
            <span style={{ fontSize: "0.75rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)", paddingTop: 3 }}>
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
              <p style={{ fontSize: "1.0625rem", fontWeight: 500, color: "var(--color-fg)", margin: "0 0 var(--space-3)", letterSpacing: "-0.01em", lineHeight: 1.4 }}>
                {c.question}
              </p>
              <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-4)", lineHeight: 1.65, maxWidth: "62ch" }}>
                {c.description}
              </p>
              <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                {c.related.map((r) => (
                  <span key={r} style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)", color: "var(--color-fg-subtle)" }}>
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <svg style={{ color: "var(--color-fg-subtle)", flexShrink: 0, marginTop: 3 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </>
  );
}

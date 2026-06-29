import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Patterns",
  description: "Combinations of components that represent real product flows in vertical interfaces.",
};

const PATTERNS = [
  {
    id: "reader",
    name: "Reader",
    description: "A long-form document reading experience: column layout, chapter navigation, highlights, annotations, and reading progress.",
    components: ["Verse", "Chapter Navigation", "Highlight", "Reading Progress", "Skeleton"],
    status: "Coming soon",
  },
  {
    id: "settings",
    name: "Settings",
    description: "A hierarchical settings interface: grouped lists, toggles, sliders, and section navigation — all adapted to the vertical axis.",
    components: ["Grouped List", "Toggle", "Slider", "Navigation Rail"],
    status: "Coming soon",
  },
  {
    id: "search",
    name: "Search",
    description: "Full-text search in a vertical document corpus: input, CJK IME composition, results list, and navigation to match.",
    components: ["Search", "Text Field", "Cell", "Reading Progress"],
    status: "Coming soon",
  },
  {
    id: "music-player",
    name: "Music Player",
    description: "Playback controls, queue, and now-playing view adapted to a vertical interface.",
    components: ["Button", "Slider", "Sortable List", "Sheet"],
    status: "Planned",
  },
  {
    id: "messaging",
    name: "Messaging",
    description: "A chat interface where conversation flow is reconsidered for vertical reading direction.",
    components: ["Text Field", "Cell", "Toast", "Attachment"],
    status: "Planned",
  },
  {
    id: "article",
    name: "Article",
    description: "Long-form editorial content in vertical layout: headings, paragraphs, pull quotes, and in-line media.",
    components: ["Heading", "Paragraph", "Quote", "Annotation", "Footnote"],
    status: "Planned",
  },
  {
    id: "navigation",
    name: "Navigation",
    description: "A full navigation pattern: rail, tabs, breadcrumbs, back navigation, and command palette — all for a vertical product.",
    components: ["Navigation Rail", "Tabs", "Breadcrumb", "Back Navigation", "Command Palette"],
    status: "Planned",
  },
  {
    id: "authentication",
    name: "Authentication",
    description: "Sign in, sign up, and error states adapted to vertical text input and layout.",
    components: ["Text Field", "Button", "Alert", "Toast"],
    status: "Planned",
  },
];

export default function PatternsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patterns"
        title="Product Flows"
        description="Patterns combine multiple components to represent real product flows. This is where the interaction model comes together."
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-6) var(--space-24)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "var(--space-4)",
        }}
      >
        {PATTERNS.map((p) => (
          <Link
            key={p.id}
            href={`/patterns/${p.id}`}
            className="card-hover"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-5)",
              padding: "var(--space-7)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-3)" }}>
              <h2 style={{ fontSize: "1.0625rem", fontWeight: 600, color: "var(--color-fg)", margin: 0, letterSpacing: "-0.02em" }}>
                {p.name}
              </h2>
              <span
                style={{
                  fontSize: "0.6875rem", fontWeight: 500, color: "var(--color-fg-subtle)",
                  padding: "1px 7px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)",
                  whiteSpace: "nowrap", flexShrink: 0, marginTop: 2,
                }}
              >
                {p.status}
              </span>
            </div>

            <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.65 }}>
              {p.description}
            </p>

            <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
              {p.components.map((c) => (
                <span key={c} style={{ fontSize: "0.75rem", padding: "2px 8px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)", color: "var(--color-fg-subtle)" }}>
                  {c}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

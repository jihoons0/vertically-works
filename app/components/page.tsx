import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Components",
  description: "Reusable interaction primitives for vertical interfaces. Each one answers a design question.",
};

const CATEGORIES = [
  {
    id: "actions",
    label: "Actions",
    components: [
      { id: "button", name: "Button", description: "Where does a label sit relative to the touch target in a vertical layout?", status: "Coming soon" },
      { id: "icon-button", name: "Icon Button", description: "How should icon-only actions adapt to vertical reading flow?", status: "Coming soon" },
      { id: "floating-action-button", name: "Floating Action Button", description: "Where does a FAB live in a vertical, RTL interface?", status: "Coming soon" },
      { id: "toggle", name: "Toggle", description: "How does a binary control orient on the vertical axis?", status: "Coming soon" },
      { id: "segmented-control", name: "Segmented Control", description: "Should segment options stack vertically or remain horizontal?", status: "Coming soon" },
    ],
  },
  {
    id: "inputs",
    label: "Inputs",
    components: [
      { id: "text-field", name: "Text Field", description: "How does a text input compose CJK characters in a vertical context?", status: "Coming soon" },
      { id: "search", name: "Search", description: "Where does the search input appear, and how does it integrate with vertical IME?", status: "Coming soon" },
      { id: "slider", name: "Slider", description: "A horizontal slider is counterintuitive on the vertical axis. What replaces it?", status: "Coming soon" },
      { id: "switch", name: "Switch", description: "Toggle state on the vertical axis.", status: "Coming soon" },
    ],
  },
  {
    id: "navigation",
    label: "Navigation",
    components: [
      { id: "navigation-rail", name: "Navigation Rail", description: "Should the primary navigation axis align with or cross the reading direction?", status: "Coming soon" },
      { id: "tabs", name: "Tabs", description: "Horizontal tabs in a vertical context — do they still make sense?", status: "Coming soon" },
      { id: "breadcrumb", name: "Breadcrumb", description: "How does path notation adapt to vertical reading?", status: "Coming soon" },
      { id: "pagination", name: "Pagination", description: "Page navigation in a column-scrolling document.", status: "Coming soon" },
      { id: "command-palette", name: "Command Palette", description: "How does a command interface appear in a vertical, RTL product?", status: "Coming soon" },
    ],
  },
  {
    id: "reading",
    label: "Reading",
    components: [
      { id: "verse", name: "Verse", description: "The atomic unit of vertical scripture layout.", status: "Coming soon" },
      { id: "highlight", name: "Highlight", description: "Selection and highlight states across RTL column order.", status: "Coming soon" },
      { id: "annotation", name: "Annotation", description: "Inline notes on vertical text — where do they appear?", status: "Coming soon" },
      { id: "chapter-navigation", name: "Chapter Navigation", description: "How does horizontal pull-to-paginate feel as a vertical gesture metaphor?", status: "Coming soon" },
      { id: "reading-progress", name: "Reading Progress", description: "Progress indication in a column-based document.", status: "Coming soon" },
    ],
  },
  {
    id: "overlays",
    label: "Overlays",
    components: [
      { id: "tooltip", name: "Tooltip", description: "Which direction should a tooltip expand when the baseline is vertical?", status: "Coming soon" },
      { id: "popover", name: "Popover", description: "Placement algorithm for a popover whose trigger is in a vertical column.", status: "Coming soon" },
      { id: "sheet", name: "Sheet", description: "Should sheets animate from screen edge or reading direction?", status: "Coming soon" },
      { id: "drawer", name: "Drawer", description: "A slide-in panel that reads vertically and animates on the R→L axis.", status: "Coming soon" },
      { id: "modal", name: "Modal", description: "How does a modal present in a full-vertical interface?", status: "Coming soon" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    components: [
      { id: "toast", name: "Toast", description: "Where does a transient notification appear in a vertical interface?", status: "Coming soon" },
      { id: "skeleton", name: "Skeleton", description: "A vertical-column shimmer that mirrors real reader metrics.", status: "Coming soon" },
      { id: "progress", name: "Progress", description: "Linear and circular progress in a vertical context.", status: "Coming soon" },
    ],
  },
];

export default function ComponentsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Components"
        title="Interaction Primitives"
        description="Reusable components for vertical interfaces. Every one is documented with purpose, problem, interactive demo, implementation notes, and open questions."
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "var(--space-12) var(--space-6) var(--space-24)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-16)",
        }}
      >
        {CATEGORIES.map((cat) => (
          <section key={cat.id}>
            <h2
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-fg-subtle)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                margin: "0 0 var(--space-5)",
              }}
            >
              {cat.label}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-3)" }}>
              {cat.components.map((comp) => (
                <Link
                  key={comp.id}
                  href={`/components/${comp.id}`}
                  className="card-hover"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-2)",
                    padding: "var(--space-5) var(--space-6)",
                    borderRadius: "var(--radius-xl)",
                    border: "1px solid",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)" }}>
                    <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)", margin: 0, letterSpacing: "-0.01em" }}>
                      {comp.name}
                    </h3>
                    <span
                      style={{
                        fontSize: "0.6875rem", fontWeight: 500,
                        color: "var(--color-fg-subtle)",
                        padding: "1px 7px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)",
                        whiteSpace: "nowrap", flexShrink: 0,
                      }}
                    >
                      {comp.status}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.6 }}>
                    {comp.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

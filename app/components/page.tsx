import type { Metadata } from "next";
import { ButtonDemo } from "@/components/demos/ButtonDemo";
import { NavRailDemo } from "@/components/demos/NavRailDemo";
import { TooltipDemo } from "@/components/demos/TooltipDemo";
import { ToggleDemo } from "@/components/demos/ToggleDemo";
import { SheetDemo } from "@/components/demos/SheetDemo";
import { VerseDemo } from "@/components/demos/VerseDemo";

export const metadata: Metadata = {
  title: "Components",
  description: "Reusable interaction primitives for vertical interfaces. Each one answers a design question.",
};

const FEATURED = [
  {
    id: "button",
    category: "Actions",
    name: "Button",
    problem: "Where does the label sit relative to the touch target when the button is oriented for a vertical layout?",
    intent: "Trigger an immediate action. In a vertical interface, label and icon orientation must match the reading axis — a rotated horizontal button is not a vertical button.",
    demo: <ButtonDemo />,
    variants: ["Primary", "Outline", "Ghost", "Disabled"],
    doList: ["Use writing-mode: vertical-rl on the label", "Keep touch target minimum 44×44px regardless of orientation", "Match label direction to surrounding reading flow"],
    dontList: ["Rotate a horizontal button with transform: rotate(90deg)", "Use icon-only buttons without an accessible label in vertical layouts", "Assume the tap target equals the visual text size"],
    openQuestion: "Should icon-only vertical buttons place the icon above or below its label? Does reading direction change this?",
    accessibility: "Min touch target 44×44. aria-label in the UI language. Ensure focus ring follows the vertical orientation.",
  },
  {
    id: "navigation-rail",
    category: "Navigation",
    name: "Navigation Rail",
    problem: "Should the primary navigation axis align with or cross the reading direction in a vertical-first interface?",
    intent: "Provide persistent access to top-level destinations. In horizontal UIs a left rail is intuitive because reading progresses rightward — away from it. In a vertical RTL interface this logic inverts.",
    demo: <NavRailDemo />,
    variants: ["Vertical left rail", "Horizontal bottom bar", "Floating compact"],
    doList: ["Place the rail where it least interrupts the reading axis", "Use large touch targets — rail items compete with text density", "Keep rail items to 3–5; more and the vertical space cost is too high"],
    dontList: ["Mirror a horizontal bottom bar directly into a vertical context without reconsideration", "Use horizontal labels inside a vertical rail item", "Animate rail transitions on the reading axis — it competes with content"],
    openQuestion: "For a right-to-left column reader, should the rail be on the left (destination side) or right (origin side)?",
    accessibility: "nav element with aria-label. Active item has aria-current='page'. Keyboard: Tab between items, Enter to activate.",
  },
  {
    id: "tooltip",
    category: "Overlays",
    name: "Tooltip",
    problem: "Which direction should a tooltip expand when the baseline is vertical?",
    intent: "Reveal supplementary information on hover or focus. Placement must not obscure adjacent vertical text or interrupt the reading flow.",
    demo: <TooltipDemo />,
    variants: ["Left (reading direction)", "Below (screen geometry)", "Right (counter-reading)"],
    doList: ["Default to the reading direction (left in RTL) so the tooltip appears where the reader just was", "Keep tooltip width ≤ 240px and avoid line-wrapping inside", "Dismiss on Escape and on pointer leave with a short delay (200ms)"],
    dontList: ["Place tooltips below vertical text triggers — they interrupt the column below", "Use tooltips for content the user needs to act on (use Popover instead)", "Animate the tooltip on the reading axis — slide from the trigger's edge instead"],
    openQuestion: "When a vertical text column is at the leftmost edge of the viewport, where does a left-placed tooltip go? Smart collision detection for vertical baselines is unsolved.",
    accessibility: "role='tooltip', aria-describedby on trigger. Keyboard accessible via focus. Not used for interactive content.",
  },
  {
    id: "toggle",
    category: "Inputs",
    name: "Toggle / Switch",
    problem: "Does the binary on/off axis conflict with the vertical reading axis, and how should it be oriented?",
    intent: "Control a boolean setting. The horizontal on/off direction of a toggle is orthogonal to vertical reading — which is actually an advantage: it clearly signals a different semantic axis.",
    demo: <ToggleDemo />,
    variants: ["Horizontal toggle (default)", "Vertical toggle (experimental)", "Labeled toggle row"],
    doList: ["Keep the toggle pill horizontal — the cross-axis communicates 'this is a setting, not a reading element'", "Always pair with a label that explains the current state, not just the control name", "Use haptic feedback on state change in native implementations"],
    dontList: ["Rotate toggle pills to be vertical — it makes them look like sliders", "Use color alone to convey state (contrast + iconography required)", "Place toggle labels vertically unless they are single CJK characters"],
    openQuestion: "In a fully vertical settings panel, does a horizontal toggle create cognitive dissonance or helpful contrast?",
    accessibility: "role='switch', aria-checked. Keyboard: Space to toggle. Label must describe the effect, not just the name.",
  },
  {
    id: "sheet",
    category: "Overlays",
    name: "Sheet",
    problem: "Should a sheet animate from screen geometry (edges) or reading direction (where the reader came from)?",
    intent: "Present a secondary surface over the primary content. The animation origin communicates the sheet's relationship to the content — from below feels like a new layer, from the reading direction feels like a continuation.",
    demo: <SheetDemo />,
    variants: ["Bottom sheet", "Right sheet (counter-reading)", "Left sheet (reading direction)"],
    doList: ["Choose animation direction based on the sheet's semantic relationship to content", "Use spring easing with slightly higher stiffness than horizontal equivalents — vertical reading gives less inertial context", "Always provide a visible dismiss handle and Escape key support"],
    dontList: ["Animate from the right in an RTL interface — this travels against the reader's flow", "Open sheets with a fade only — directional entry communicates spatial relationship", "Use sheets for content that needs to be compared with what's behind it (use Split View instead)"],
    openQuestion: "Should chapter-level navigation sheets enter from the right (where the next chapter is) or the bottom (new layer)? Both are defensible.",
    accessibility: "role='dialog', aria-modal='true'. Focus trapped inside. Dismiss via Escape. Focus returns to trigger on close.",
  },
  {
    id: "verse",
    category: "Reading",
    name: "Verse",
    problem: "How should selection, highlight, and verse numbering work in a top-to-bottom, right-to-left column layout?",
    intent: "Display a single unit of scripture text as a selectable, highlightable cell within a vertical column. The atomic unit of the reader.",
    demo: <VerseDemo />,
    variants: ["Default", "Selected", "Highlighted", "Verse + Chapter break"],
    doList: ["Place verse numbers as superscript-equivalent at the start of the vertical string (top of each glyph stack)", "Treat tate-chu-yoko digit groups (e.g., '23') as single selection units", "Keep highlight as a left border + background tint, not full inversion — text must remain readable"],
    dontList: ["Use horizontal text selection API for vertical content — it breaks on column boundaries", "Place verse numbers as separate column elements — they'll break RTL flow", "Apply highlight via text-shadow or outline — use background-color + border"],
    openQuestion: "How should a multi-verse selection that spans a column break be represented? The selection rectangle model doesn't extend across RTL columns.",
    accessibility: "Each verse is a paragraph with an aria-label including the verse reference. Highlight actions are announced via live region.",
  },
];

const COMING_SOON = [
  { category: "Actions", name: "Icon Button", question: "How should icon-only actions adapt to vertical reading flow?" },
  { category: "Actions", name: "FAB", question: "Where does a Floating Action Button live in a vertical, RTL interface?" },
  { category: "Actions", name: "Segmented Control", question: "Should segment options stack vertically or remain horizontal?" },
  { category: "Inputs", name: "Text Field", question: "How does a text input compose CJK characters in a vertical context?" },
  { category: "Inputs", name: "Search", question: "Where does the search input appear, and how does it integrate with vertical IME?" },
  { category: "Inputs", name: "Slider", question: "A horizontal slider is counterintuitive on the vertical axis. What replaces it?" },
  { category: "Navigation", name: "Tabs", question: "Horizontal tabs in a vertical context — do they still make sense?" },
  { category: "Navigation", name: "Command Palette", question: "How does a command interface appear in a vertical, RTL product?" },
  { category: "Navigation", name: "Breadcrumb", question: "How does path notation adapt to vertical reading?" },
  { category: "Reading", name: "Highlight", question: "Selection and highlight states across RTL column order." },
  { category: "Reading", name: "Annotation", question: "Inline notes on vertical text — where do they appear?" },
  { category: "Reading", name: "Chapter Navigation", question: "How does horizontal pull-to-paginate feel as a vertical gesture metaphor?" },
  { category: "Overlays", name: "Popover", question: "Placement algorithm for a popover whose trigger is in a vertical column." },
  { category: "Overlays", name: "Modal", question: "How does a modal present in a full-vertical interface?" },
  { category: "Overlays", name: "Context Menu", question: "Which axis does a context menu expand along in a vertical reading interface?" },
  { category: "Feedback", name: "Toast", question: "Where does a transient notification appear in a vertical interface?" },
  { category: "Feedback", name: "Skeleton", question: "A vertical-column shimmer that mirrors real reader metrics." },
];

function DosDonts({ doList, dontList }: { doList: string[]; dontList: string[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
      <div>
        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--space-3)" }}>Do</div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {doList.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
              <span style={{ color: "#16a34a", flexShrink: 0, marginTop: 1, fontSize: "0.875rem" }}>✓</span>
              <span style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", lineHeight: 1.6 }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#dc2626", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--space-3)" }}>Don&apos;t</div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {dontList.map((item, i) => (
            <li key={i} style={{ display: "flex", gap: "var(--space-3)", alignItems: "flex-start" }}>
              <span style={{ color: "#dc2626", flexShrink: 0, marginTop: 1, fontSize: "0.875rem" }}>✗</span>
              <span style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", lineHeight: 1.6 }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "var(--space-16) var(--space-6) var(--space-24)" }}>
      {/* Header */}
      <div style={{ marginBottom: "var(--space-16)", paddingBottom: "var(--space-12)", borderBottom: "1px solid var(--color-border)" }}>
        <span style={{ display: "inline-block", fontSize: "0.75rem", fontWeight: 500, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--space-4)" }}>
          Components
        </span>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.08, color: "var(--color-fg)", margin: "0 0 var(--space-5)", maxWidth: "18ch" }}>
          Interaction Primitives
        </h1>
        <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", color: "var(--color-fg-muted)", lineHeight: 1.65, maxWidth: "52ch", margin: 0 }}>
          Reusable components built for vertical interfaces. Each one documents a specific design question, interactive demo, do/don&apos;t guidance, and open research questions.
        </p>
      </div>

      {/* Featured components */}
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        {FEATURED.map((comp, idx) => (
          <section
            key={comp.id}
            id={comp.id}
            style={{
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
              background: "var(--color-bg)",
              overflow: "hidden",
              marginBottom: "var(--space-5)",
            }}
          >
            {/* Component header */}
            <div style={{ padding: "var(--space-8) var(--space-8) var(--space-6)", borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-subtle)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-4)" }}>
                <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", padding: "2px 8px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)" }}>
                  {comp.category}
                </span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", fontFamily: "var(--font-geist-mono)" }}>
                  #{String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--color-fg)", margin: "0 0 var(--space-3)" }}>
                {comp.name}
              </h2>
              <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: "0 0 var(--space-3)", lineHeight: 1.6, maxWidth: "60ch" }}>
                {comp.intent}
              </p>
              <div style={{ display: "flex", gap: "var(--space-2)", padding: "var(--space-4) var(--space-5)", borderRadius: "var(--radius-lg)", background: "var(--color-bg)", border: "1px solid var(--color-border)", marginTop: "var(--space-4)" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-fg-subtle)", flexShrink: 0 }}>Design question</span>
                <span style={{ fontSize: "0.75rem", color: "var(--color-border-strong)", marginInline: "var(--space-2)" }}>·</span>
                <span style={{ fontSize: "0.875rem", color: "var(--color-fg)", fontStyle: "italic", lineHeight: 1.5 }}>{comp.problem}</span>
              </div>
            </div>

            <div style={{ padding: "var(--space-8)", display: "flex", flexDirection: "column", gap: "var(--space-10)" }}>
              {/* Interactive demo */}
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--space-5)" }}>
                  Interactive Demo
                </div>
                {comp.demo}
              </div>

              {/* Variants */}
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--space-4)" }}>
                  Variants
                </div>
                <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}>
                  {comp.variants.map((v) => (
                    <span key={v} style={{ fontSize: "0.8125rem", padding: "var(--space-2) var(--space-4)", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)", color: "var(--color-fg-muted)" }}>
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* Do / Don't */}
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--space-5)" }}>
                  Guidance
                </div>
                <DosDonts doList={comp.doList} dontList={comp.dontList} />
              </div>

              {/* Accessibility */}
              <div style={{ padding: "var(--space-5) var(--space-6)", borderRadius: "var(--radius-lg)", background: "var(--color-bg-subtle)", border: "1px solid var(--color-border)" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--space-3)" }}>
                  Accessibility
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.7 }}>{comp.accessibility}</p>
              </div>

              {/* Open question */}
              <div style={{ padding: "var(--space-5) var(--space-6)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--color-border-strong)", background: "transparent" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--space-3)" }}>
                  Open Question
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.7, fontStyle: "italic" }}>{comp.openQuestion}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Coming soon grid */}
      <div style={{ marginTop: "var(--space-16)" }}>
        <div style={{ marginBottom: "var(--space-8)", paddingBottom: "var(--space-6)", borderBottom: "1px solid var(--color-border)" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--color-fg)", margin: "0 0 var(--space-2)" }}>
            Coming Soon
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "var(--color-fg-muted)", margin: 0 }}>
            {COMING_SOON.length} more components planned. Each will include a full interactive demo and documentation.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--space-3)" }}>
          {COMING_SOON.map((c) => (
            <div
              key={c.name}
              style={{
                padding: "var(--space-5) var(--space-6)",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--color-border)",
                background: "var(--color-bg)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-3)", marginBottom: "var(--space-2)" }}>
                <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-fg)", margin: 0, letterSpacing: "-0.01em" }}>
                  {c.name}
                </h3>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-fg-subtle)", padding: "1px 7px", borderRadius: "var(--radius-full)", border: "1px solid var(--color-border)", whiteSpace: "nowrap", flexShrink: 0 }}>
                  {c.category}
                </span>
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-fg-muted)", margin: 0, lineHeight: 1.6 }}>
                {c.question}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

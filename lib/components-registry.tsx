import { ButtonDemo } from "@/components/demos/ButtonDemo";
import { NavRailDemo } from "@/components/demos/NavRailDemo";
import { TooltipDemo } from "@/components/demos/TooltipDemo";
import { ToggleDemo } from "@/components/demos/ToggleDemo";
import { SheetDemo } from "@/components/demos/SheetDemo";
import { VerseDemo } from "@/components/demos/VerseDemo";

export type ComponentVariant = {
  name: string;
  demo: React.ReactNode;
  code: string;
};

export type ComponentEntry = {
  slug: string;
  name: string;
  category: string;
  description: string;
  problem: string;
  intent: string;
  variants: ComponentVariant[];
  doList: string[];
  dontList: string[];
  accessibility: string;
  openQuestion: string;
  status: "built" | "coming-soon";
};

const PLACEHOLDER_DEMO = (name: string, char?: string) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-4)",
      height: 200,
      color: "var(--color-fg-subtle)",
    }}
  >
    {char && (
      <span style={{ writingMode: "vertical-rl", fontSize: "2rem", letterSpacing: "0.1em", opacity: 0.3 }}>
        {char}
      </span>
    )}
    <span style={{ fontSize: "0.8125rem" }}>Interactive demo coming soon</span>
  </div>
);

export const COMPONENTS_REGISTRY: ComponentEntry[] = [
  // ── Actions ──────────────────────────────────────────────────────────────────
  {
    slug: "button",
    name: "Button",
    category: "Actions",
    description: "Trigger an immediate action. In a vertical interface, label and icon orientation must match the reading axis.",
    problem: "Where does the label sit relative to the touch target when the button is oriented for a vertical layout?",
    intent: "A rotated horizontal button is not a vertical button. The writing-mode property must be applied to the label itself.",
    variants: [
      {
        name: "Default",
        demo: <ButtonDemo />,
        code: `import { VerticalButton } from "@/components/ui/vertical-button"

export function ButtonDefault() {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <VerticalButton variant="primary">다음 장</VerticalButton>
      <VerticalButton variant="outline">이전 장</VerticalButton>
      <VerticalButton variant="ghost">설정</VerticalButton>
      <VerticalButton disabled>비활성</VerticalButton>
    </div>
  )
}`,
      },
    ],
    doList: [
      "Use writing-mode: vertical-rl on the label itself",
      "Keep touch target minimum 44×44px regardless of visual size",
      "Match label direction to surrounding reading flow",
    ],
    dontList: [
      "Rotate a horizontal button with transform: rotate(90deg)",
      "Use icon-only buttons without an accessible label",
      "Assume tap target equals the visible text bounds",
    ],
    accessibility: "Min touch target 44×44. aria-label in the UI language. Focus ring must follow vertical orientation.",
    openQuestion: "Should icon-only vertical buttons place the icon above or below the label? Does reading direction change this answer?",
    status: "built",
  },
  {
    slug: "icon-button",
    name: "Icon Button",
    category: "Actions",
    description: "An action triggered by an icon alone. Requires extra care for accessibility and hit targets in a vertical layout.",
    problem: "How should icon-only actions adapt to vertical reading flow without the label as orientation cue?",
    intent: "Icon buttons in vertical interfaces lose the directional cue the label provides. The icon itself must communicate directionality.",
    variants: [
      {
        name: "Default",
        demo: PLACEHOLDER_DEMO("Icon Button", "→"),
        code: `<button
  aria-label="다음 장으로 이동"
  style={{
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--color-border)",
    background: "transparent",
    cursor: "pointer",
  }}
>
  <svg width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2">
    {/* Down arrow — reading direction */}
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
</button>`,
      },
    ],
    doList: [
      "Always provide aria-label describing the action, not the icon",
      "Use directional icons that align with reading direction",
      "Maintain 44px minimum touch target",
    ],
    dontList: [
      "Use ambiguous icons without labels in novel vertical contexts",
      "Flip horizontal directional icons — redesign them for the vertical axis",
      "Rely on tooltip alone for accessibility",
    ],
    accessibility: "aria-label required. Role button implicit. Focus indicator must be visible at all sizes.",
    openQuestion: "Should 'back' and 'forward' icons rotate 90° in a vertical interface, or adopt entirely new metaphors?",
    status: "coming-soon",
  },
  {
    slug: "floating-action-button",
    name: "Floating Action Button",
    category: "Actions",
    description: "A persistent, elevated button for the primary action in a view.",
    problem: "Where does a FAB live in a vertical, RTL interface? Bottom-right is the horizontal convention — does it hold?",
    intent: "FAB position encodes priority and reachability. In a vertical RTL reader, bottom-right is the end of reading flow, not the beginning.",
    variants: [
      {
        name: "Default",
        demo: PLACEHOLDER_DEMO("FAB", "＋"),
        code: `<button
  aria-label="새 메모"
  style={{
    position: "fixed",
    // RTL: bottom-left puts it at the reading origin
    // Bottom-right puts it at the reading terminus
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "var(--color-fg)",
    color: "var(--color-bg)",
    border: "none",
    boxShadow: "0 4px 16px rgba(0,0,0,0.24)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <svg width="24" height="24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
</button>`,
      },
    ],
    doList: [
      "Place FAB where it doesn't obscure reading content",
      "Consider bottom-left for RTL interfaces where reading terminates at right",
      "Use extended FAB with vertical label for primary actions that need context",
    ],
    dontList: [
      "Blindly copy bottom-right positioning from horizontal conventions",
      "Place the FAB over the active reading column",
      "Use FAB for secondary or destructive actions",
    ],
    accessibility: "aria-label. Keyboard focusable. Visible focus ring. Does not trap focus.",
    openQuestion: "In a vertical RTL interface where columns flow right-to-left, is bottom-left (reading origin) or bottom-right (reading terminus) the more prominent position?",
    status: "coming-soon",
  },
  {
    slug: "toggle",
    name: "Toggle",
    category: "Actions",
    description: "A pressable element that switches between two states — on and off.",
    problem: "Does the binary on/off axis conflict with vertical reading direction, or does its perpendicular orientation provide useful contrast?",
    intent: "The horizontal on/off motion of a toggle is orthogonal to vertical reading — which actually signals a different semantic axis.",
    variants: [
      {
        name: "Default",
        demo: <ToggleDemo />,
        code: `import { Switch } from "@/components/ui/switch"

function Settings() {
  const [dark, setDark] = useState(true)
  const [serif, setSerif] = useState(false)

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        border: "1px solid var(--color-border)",
        borderRadius: 12,
      }}>
        <span>야간 모드</span>
        <Switch checked={dark} onCheckedChange={setDark} />
      </label>
      <label style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        border: "1px solid var(--color-border)",
        borderRadius: 12,
      }}>
        <span>명조체</span>
        <Switch checked={serif} onCheckedChange={setSerif} />
      </label>
    </div>
  )
}`,
      },
    ],
    doList: [
      "Keep toggle pill horizontal — the cross-axis communicates 'setting, not reading'",
      "Always pair with a label that explains current state effect",
      "Use haptic feedback on state change in native implementations",
    ],
    dontList: [
      "Rotate toggle pills to be vertical — they resemble sliders",
      "Use color alone to convey state",
      "Place toggle labels vertically unless they are single CJK characters",
    ],
    accessibility: "role='switch', aria-checked. Space to toggle. Label describes effect, not control name.",
    openQuestion: "In a fully vertical settings panel, does a horizontal toggle create useful contrast or cognitive dissonance?",
    status: "built",
  },
  {
    slug: "segmented-control",
    name: "Segmented Control",
    category: "Actions",
    description: "A horizontal set of mutually exclusive options. A common control that has no clear vertical-native equivalent.",
    problem: "Should segment options stack vertically (matching the reading axis) or remain horizontal (matching convention)?",
    intent: "Segmented controls are inherently horizontal. In a vertical interface, stacking segments vertically changes the affordance to feel like a list rather than a toggle.",
    variants: [
      {
        name: "Horizontal (conventional)",
        demo: PLACEHOLDER_DEMO("Segmented", "한·あ·中"),
        code: `// Horizontal — conventional layout
<div style={{
  display: "inline-flex",
  background: "var(--color-bg-muted)",
  borderRadius: "var(--radius-full)",
  padding: 3,
  gap: 2,
}}>
  {["한", "あ", "中"].map((label) => (
    <button key={label} style={{
      padding: "6px 16px",
      borderRadius: "var(--radius-full)",
      border: "none",
      background: active === label
        ? "var(--color-bg)"
        : "transparent",
      fontSize: "0.9375rem",
      fontWeight: active === label ? 600 : 400,
      cursor: "pointer",
    }}>
      {label}
    </button>
  ))}
</div>`,
      },
    ],
    doList: [
      "Limit to 3 segments maximum in a vertical interface — horizontal space is constrained",
      "Use single CJK characters as segment labels where possible",
      "Consider a vertical radio button list for >3 options",
    ],
    dontList: [
      "Stack segments vertically unless they represent a sequential progression",
      "Use long label text — it creates width pressure in narrow vertical layouts",
      "Use segmented controls for navigation between views (use tabs or rail instead)",
    ],
    accessibility: "role='radiogroup'. Each segment is role='radio'. aria-checked. Arrow keys navigate.",
    openQuestion: "Is a vertical segmented control (stacked) a distinct component, or just a radio button group with styling?",
    status: "coming-soon",
  },

  // ── Inputs ────────────────────────────────────────────────────────────────────
  {
    slug: "text-field",
    name: "Text Field",
    category: "Inputs",
    description: "Single-line text input with CJK IME composition support in a vertical interface.",
    problem: "How does a text input compose CJK characters in a vertical context, and where does the IME candidate window appear?",
    intent: "CJK input requires IME composition — an intermediate state where the candidate characters are shown before confirmation. The candidate window placement in a vertical context is largely unsolved.",
    variants: [
      {
        name: "Default",
        demo: PLACEHOLDER_DEMO("Text Field", "가나다"),
        code: `// Vertical text field — composition-aware
<div style={{ position: "relative" }}>
  <input
    type="text"
    placeholder="검색어를 입력하세요…"
    lang="ko"
    inputMode="text"
    style={{
      width: "100%",
      padding: "12px 16px",
      border: "1px solid var(--color-border)",
      borderRadius: 12,
      fontSize: "1rem",
      // NOTE: input itself stays horizontal
      // vertical rendering is handled by the surrounding layout
      color: "var(--color-fg)",
      background: "var(--color-bg)",
      outline: "none",
    }}
    onFocus={(e) => {
      e.currentTarget.style.borderColor = "var(--color-fg)"
    }}
    onBlur={(e) => {
      e.currentTarget.style.borderColor = "var(--color-border)"
    }}
  />
</div>`,
      },
    ],
    doList: [
      "Set lang attribute to match content language for IME accuracy",
      "Keep input field horizontal even in vertical layouts — rotating input is disorienting",
      "Show placeholder text in the target language",
    ],
    dontList: [
      "Apply writing-mode: vertical-rl to the input element itself",
      "Assume the IME candidate window won't obscure your vertical content",
      "Use a single text field for multi-line vertical prose",
    ],
    accessibility: "label element required. aria-describedby for error messages. autocomplete attribute appropriate to context.",
    openQuestion: "Where does the IME candidate window appear in a vertical layout? Platform IME APIs rarely expose enough control to reposition it.",
    status: "coming-soon",
  },
  {
    slug: "search",
    name: "Search",
    category: "Inputs",
    description: "Full-text search with CJK IME composition, results list, and navigation to match.",
    problem: "Where does the search input appear in a vertical interface, and how does it integrate with vertical IME?",
    intent: "Search in a vertical reading app must handle CJK composition, display results in a vertical-compatible list, and navigate to matches without breaking the column reading position.",
    variants: [
      {
        name: "Default",
        demo: PLACEHOLDER_DEMO("Search", "검"),
        code: `function VerticalSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "var(--color-bg)",
      zIndex: 100,
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Search input — horizontal, at top */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border)" }}>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색…"
          lang="ko"
          style={{ width: "100%", fontSize: "1rem" }}
        />
      </div>

      {/* Results — vertical text, scrollable */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {results.map((r, i) => (
          <div key={i} style={{
            padding: "12px 16px",
            borderBottom: "1px solid var(--color-border)",
            // Result text in vertical reading orientation
            writingMode: "horizontal-tb", // results stay horizontal for scanability
          }}>
            {r.text}
          </div>
        ))}
      </div>
    </div>
  )
}`,
      },
    ],
    doList: [
      "Keep the search input horizontal — composition requires horizontal baseline",
      "Show results in a scannable list, not vertical columns",
      "Highlight matches with background color, not text rotation",
    ],
    dontList: [
      "Display search results as vertical text — this slows scanning",
      "Open search in a new page — use an overlay so position is preserved",
      "Assume Korean/Japanese/Chinese input works without IME event handling",
    ],
    accessibility: "role='search'. aria-live region for results count. Results list with role='listbox'.",
    openQuestion: "Should search results be displayed horizontally (for faster scanning) or vertically (to match the reader's current mode)?",
    status: "coming-soon",
  },
  {
    slug: "slider",
    name: "Slider",
    category: "Inputs",
    description: "A drag control for selecting a value along a continuous range.",
    problem: "A horizontal slider is counterintuitive on the vertical reading axis. What replaces it?",
    intent: "Standard horizontal sliders conflict with vertical reading in a specific way: 'increase' goes right, but reading also goes (in a sense) left. A vertical drag-up-to-increase model resolves this.",
    variants: [
      {
        name: "Vertical drag",
        demo: PLACEHOLDER_DEMO("Slider", "▲"),
        code: `// Drag-up-to-increase vertical slider
function VerticalSlider({ value, onChange, min = 12, max = 32 }) {
  const trackRef = useRef(null)

  const handlePointer = (e) => {
    const rect = trackRef.current.getBoundingClientRect()
    const normalized = 1 - (e.clientY - rect.top) / rect.height
    const clamped = Math.max(0, Math.min(1, normalized))
    onChange(Math.round(min + clamped * (max - min)))
  }

  return (
    <div
      ref={trackRef}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        handlePointer(e)
      }}
      onPointerMove={(e) => {
        if (e.buttons === 1) handlePointer(e)
      }}
      style={{
        width: 4,
        height: 160,
        background: "var(--color-border)",
        borderRadius: 2,
        position: "relative",
        cursor: "ns-resize",
      }}
    >
      {/* Fill */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: \`\${((value - min) / (max - min)) * 100}%\`,
        background: "var(--color-fg)",
        borderRadius: 2,
      }} />
      {/* Thumb */}
      <div style={{
        position: "absolute",
        left: "50%",
        bottom: \`calc(\${((value - min) / (max - min)) * 100}% - 8px)\`,
        transform: "translateX(-50%)",
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: "var(--color-fg)",
        border: "2px solid var(--color-bg)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }} />
    </div>
  )
}`,
      },
    ],
    doList: [
      "Use drag-up-to-increase: upward motion = more, matches physical weight metaphor",
      "Show current value adjacent to the track in horizontal text",
      "Keep the track short and vertical — 120–200px is enough",
    ],
    dontList: [
      "Rotate a horizontal slider 90° — the interaction model breaks",
      "Use a vertical slider for fine-grained color or date selection",
      "Place the slider on the reading axis where it competes with text",
    ],
    accessibility: "role='slider', aria-valuenow/min/max. Arrow keys: up/right increase, down/left decrease. Page Up/Down jump.",
    openQuestion: "Should 'drag up = more' match the direction of physical weight (up = lighter = less) or follow the visual filled-track metaphor (up = filled = more)?",
    status: "coming-soon",
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Inputs",
    description: "A binary toggle that immediately applies a setting. Distinguished from a checkbox by its immediacy.",
    problem: "Does the horizontal on/off axis of a switch conflict with vertical reading direction?",
    intent: "The horizontal axis of a switch is orthogonal to reading direction — which is useful. It signals 'this is a control, not content.'",
    variants: [
      {
        name: "Default",
        demo: PLACEHOLDER_DEMO("Switch", "⏻"),
        code: `function Switch({ checked, onChange, label }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "10px 0",
      }}
    >
      <span>{label}</span>
      <div style={{
        width: 44,
        height: 26,
        borderRadius: 13,
        background: checked
          ? "var(--color-fg)"
          : "var(--color-border-strong)",
        position: "relative",
        transition: "background 200ms ease",
        flexShrink: 0,
      }}>
        <div style={{
          position: "absolute",
          top: 3,
          left: checked ? 21 : 3,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "white",
          transition: "left 200ms ease",
          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
        }} />
      </div>
    </button>
  )
}`,
      },
    ],
    doList: [
      "Apply change immediately on toggle (unlike checkbox which requires form submit)",
      "Show a brief confirmation toast when the change has side effects",
      "Keep the switch pill horizontal regardless of surrounding layout orientation",
    ],
    dontList: [
      "Use a switch when the change requires a confirmation step",
      "Stack switches in a vertical column without clear grouping",
      "Use a switch for filtering (use checkbox instead)",
    ],
    accessibility: "role='switch', aria-checked. Space or Enter to toggle. Visible focus. Label on same interactive element.",
    openQuestion: "In a purely vertical settings panel, is horizontal switch orientation intuitive or jarring?",
    status: "coming-soon",
  },

  // ── Navigation ────────────────────────────────────────────────────────────────
  {
    slug: "navigation-rail",
    name: "Navigation Rail",
    category: "Navigation",
    description: "Persistent access to top-level destinations in a vertical-first interface.",
    problem: "Should the primary navigation axis align with or cross the reading direction?",
    intent: "In horizontal UIs a left rail works because reading progresses rightward — away from the rail. In a vertical RTL interface this logic inverts.",
    variants: [
      {
        name: "Vertical rail vs Bottom bar",
        demo: <NavRailDemo />,
        code: `// Vertical navigation rail
function NavRail({ items, active, onSelect }) {
  return (
    <nav
      aria-label="주 탐색"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: "16px 8px",
        borderRight: "1px solid var(--color-border)",
        background: "var(--color-bg-subtle)",
        width: 56,
        height: "100%",
      }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          aria-current={active === item.id ? "page" : undefined}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            border: "none",
            background: active === item.id
              ? "var(--color-fg)"
              : "transparent",
            color: active === item.id
              ? "var(--color-bg)"
              : "var(--color-fg-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // Single CJK character as nav label
            fontSize: "1rem",
            writingMode: "vertical-rl",
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}`,
      },
    ],
    doList: [
      "Place the rail where it least interrupts the reading axis",
      "Use single CJK characters or icons as rail labels",
      "Keep rail items to 3–5; vertical space cost rises with each item",
    ],
    dontList: [
      "Mirror a bottom bar directly into a vertical context without reconsideration",
      "Use horizontal text labels in a narrow vertical rail",
      "Animate rail transitions on the reading axis",
    ],
    accessibility: "nav element with aria-label. Active item has aria-current='page'. Tab between items, Enter to activate.",
    openQuestion: "For a right-to-left column reader, should the rail be on the left (destination side) or right (origin side)?",
    status: "built",
  },
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    description: "Switch between related content panels. Horizontal tabs remain common even in vertical reading contexts.",
    problem: "Do horizontal tabs still make sense when the primary reading axis is vertical?",
    intent: "Tabs present a list of switchable views. In vertical interfaces, keeping tabs horizontal creates a clear horizontal/vertical semantic split: navigation = horizontal, reading = vertical.",
    variants: [
      {
        name: "Default",
        demo: PLACEHOLDER_DEMO("Tabs", "—"),
        code: `function VerticalContextTabs({ tabs, active, onChange }) {
  return (
    <div role="tablist" aria-label="읽기 보기" style={{
      display: "flex",
      borderBottom: "1px solid var(--color-border)",
      gap: 0,
    }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          aria-controls={\`panel-\${tab.id}\`}
          onClick={() => onChange(tab.id)}
          style={{
            padding: "10px 16px",
            border: "none",
            background: "transparent",
            borderBottom: active === tab.id
              ? "2px solid var(--color-fg)"
              : "2px solid transparent",
            fontSize: "0.875rem",
            fontWeight: active === tab.id ? 600 : 400,
            color: active === tab.id
              ? "var(--color-fg)"
              : "var(--color-fg-muted)",
            cursor: "pointer",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}`,
      },
    ],
    doList: [
      "Keep tabs horizontal — the horizontal axis separates content categories from reading content",
      "Limit labels to 3 CJK characters or a short word",
      "Place tab panel content in the vertical reading layout that follows",
    ],
    dontList: [
      "Stack tabs vertically without differentiating them from the rail",
      "Use tabs for sequential content (use pagination or chapter navigation instead)",
      "Add icons to tabs if labels are already short CJK characters",
    ],
    accessibility: "role='tablist'. Each tab is role='tab'. Each panel is role='tabpanel'. Arrow keys navigate between tabs.",
    openQuestion: "When tabs control vertical content panels, should tab keyboard navigation (left/right) feel directionally mismatched with the content (up/down)?",
    status: "coming-soon",
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    category: "Navigation",
    description: "Hierarchical path display indicating the user's location in the content structure.",
    problem: "How does path notation adapt to a vertical reading hierarchy?",
    intent: "Breadcrumbs in horizontal UIs flow left-to-right showing ancestor → child. In a vertical interface, the hierarchy may flow top-to-bottom, or remain horizontal as a deliberate contrast.",
    variants: [
      {
        name: "Horizontal (in vertical context)",
        demo: PLACEHOLDER_DEMO("Breadcrumb", "＞"),
        code: `function Breadcrumb({ items }) {
  return (
    <nav aria-label="경로" style={{
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: "0.8125rem",
      color: "var(--color-fg-muted)",
    }}>
      {items.map((item, i) => (
        <React.Fragment key={item.id}>
          {i > 0 && (
            <span aria-hidden style={{ opacity: 0.4 }}>›</span>
          )}
          {item.href ? (
            <a
              href={item.href}
              style={{ color: "inherit" }}
              aria-current={i === items.length - 1 ? "page" : undefined}
            >
              {item.label}
            </a>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

// Usage
<Breadcrumb items={[
  { id: "bible", label: "성경", href: "/" },
  { id: "gen", label: "창세기", href: "/gen" },
  { id: "ch1", label: "1장" },
]} />`,
      },
    ],
    doList: [
      "Keep breadcrumbs horizontal even in vertical interfaces — they represent a different axis (hierarchy)",
      "Use CJK book/chapter names naturally",
      "Show only 3 levels maximum — deeper hierarchies need a back button",
    ],
    dontList: [
      "Display breadcrumbs in vertical text — they are navigation metadata, not reading content",
      "Use breadcrumbs as the primary back mechanism on mobile",
      "Truncate breadcrumb labels with ellipsis — restructure the hierarchy instead",
    ],
    accessibility: "nav element with aria-label. Current page item has aria-current='page'. Ordered list structure.",
    openQuestion: "In a vertical RTL reader, should breadcrumb separators be › (rightward) or ↓ (downward, matching reading progression)?",
    status: "coming-soon",
  },

  // ── Reading ───────────────────────────────────────────────────────────────────
  {
    slug: "verse",
    name: "Verse",
    category: "Reading",
    description: "The atomic unit of vertical scripture layout — a selectable, highlightable text cell within a vertical column.",
    problem: "How should selection, highlight, and verse numbering work in a top-to-bottom, right-to-left column layout?",
    intent: "Each verse is a discrete unit that must support tapping, long-pressing, highlighting, and annotation — all while maintaining correct RTL column order.",
    variants: [
      {
        name: "Default",
        demo: <VerseDemo />,
        code: `function Verse({ reference, text, selected, highlighted, color, onTap }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        gap: 4,
        cursor: "pointer",
      }}
      onClick={onTap}
    >
      {/* Verse number — top of column */}
      <span style={{
        fontSize: "0.625rem",
        color: "var(--color-fg-subtle)",
        fontFamily: "var(--font-geist-mono)",
        flexShrink: 0,
        alignSelf: "flex-start",
      }}>
        {reference}
      </span>

      {/* Verse text */}
      <span style={{
        fontSize: "1rem",
        letterSpacing: "0.1em",
        lineHeight: 1.9,
        color: "var(--color-fg)",
        borderRadius: 4,
        padding: "0 3px",
        background: selected
          ? "rgba(99,102,241,0.18)"
          : highlighted
          ? \`\${color}44\`
          : "transparent",
        borderLeft: highlighted
          ? \`3px solid \${color}\`
          : "3px solid transparent",
        transition: "background 120ms ease",
        userSelect: "none",
      }}>
        {text}
      </span>
    </div>
  )
}`,
      },
    ],
    doList: [
      "Place verse numbers at the top of each text string (start of vertical rendering)",
      "Treat tate-chu-yoko digit groups as single selection units",
      "Use background-color + left border for highlights — not text inversion",
    ],
    dontList: [
      "Use the OS text selection API for vertical content — it breaks at column boundaries",
      "Place verse numbers as separate column elements — they'll disrupt RTL column flow",
      "Apply highlight via text-shadow or outline",
    ],
    accessibility: "Each verse is a paragraph with aria-label including reference. Highlight announced via live region.",
    openQuestion: "How should a multi-verse selection spanning a column break be represented visually? The rectangular selection model doesn't extend across RTL columns.",
    status: "built",
  },
  {
    slug: "highlight",
    name: "Highlight",
    category: "Reading",
    description: "Color-coded annotation applied to selected vertical text.",
    problem: "How should selection and highlight states work across RTL column order in a vertical layout?",
    intent: "Highlights must persist across sessions, survive verse re-rendering, and visually distinguish different annotation categories without obscuring the text.",
    variants: [
      {
        name: "Default",
        demo: PLACEHOLDER_DEMO("Highlight", "🎨"),
        code: `// Highlight applied as CSS custom property
// Color stored per-verse in user state

const HIGHLIGHT_COLORS = {
  yellow: "#FFD166",
  green: "#06D6A0",
  blue: "#118AB2",
  red: "#EF476F",
}

function highlightStyle(color) {
  return {
    background: \`\${color}40\`,       // 25% opacity
    borderLeft: \`3px solid \${color}\`, // full opacity marker
    borderRadius: 4,
    padding: "0 3px",
  }
}

// Usage — applied to the verse span
<span style={highlightStyle(HIGHLIGHT_COLORS.yellow)}>
  {verseText}
</span>`,
      },
    ],
    doList: [
      "Store highlights by verse reference, not by character offset",
      "Use distinct visual channels (color + border) for different highlight categories",
      "Persist highlights to local storage and sync across sessions",
    ],
    dontList: [
      "Store character offsets for vertical text — column reflow breaks them",
      "Use more than 4–5 highlight colors — they become indistinguishable",
      "Remove highlights on theme change — store color as a semantic label, not a hex value",
    ],
    accessibility: "Announce highlight application via live region. Provide keyboard mechanism to highlight selected text. Ensure color + non-color cues.",
    openQuestion: "Should highlight removal require a deliberate action (tap the highlight, choose 'remove') or a tap toggle? The latter risks accidental removal.",
    status: "coming-soon",
  },
  {
    slug: "chapter-navigation",
    name: "Chapter Navigation",
    category: "Reading",
    description: "Horizontal pull gesture to navigate between adjacent chapters in a column-scrolling document.",
    problem: "How does the horizontal pull-to-paginate feel as a vertical gesture metaphor?",
    intent: "Traditional pull-to-refresh is vertical. Rotating the metaphor 90°: overscrolling past the leftmost column triggers the next chapter. A ring fills as you pull, fires on release with haptic feedback.",
    variants: [
      {
        name: "Pull right → previous chapter",
        demo: PLACEHOLDER_DEMO("Chapter Nav", "←"),
        code: `// RTL pull-to-paginate
// Overscroll past leftmost column → next chapter
// Overscroll past rightmost column → previous chapter

function useChapterPull(scrollRef, onNext, onPrev) {
  const pulling = useRef(false)
  const startX = useRef(0)
  const THRESHOLD = 80

  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e) => {
    const el = scrollRef.current
    if (!el) return
    const dx = e.changedTouches[0].clientX - startX.current
    const atStart = el.scrollLeft <= 0
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1

    // RTL: scrollLeft is negative in some browsers
    if (atStart && dx > THRESHOLD) onPrev()   // right swipe at start
    if (atEnd && dx < -THRESHOLD) onNext()    // left swipe at end
  }

  return { onTouchStart, onTouchEnd }
}`,
      },
    ],
    doList: [
      "Use the horizontal overscroll gesture — it matches the column scrolling axis",
      "Show a progress ring filling as the user pulls",
      "Add haptic ticks at 25%, 50%, 75%, 100% and a strong landing haptic on trigger",
    ],
    dontList: [
      "Use vertical pull for chapter navigation — it conflicts with scroll",
      "Trigger immediately on overscroll — require a release gesture to confirm",
      "Show a spinner on chapter load — show the skeleton of the next chapter instead",
    ],
    accessibility: "Provide accessible alternative (toolbar buttons) for this gesture. Announce chapter change via aria-live.",
    openQuestion: "On desktop, what keyboard shortcut maps to chapter navigation in a vertical reader? Arrow keys are taken by text navigation.",
    status: "coming-soon",
  },

  // ── Overlays ──────────────────────────────────────────────────────────────────
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    description: "Reveal supplementary information on hover or focus without navigating away.",
    problem: "Which direction should a tooltip expand when the baseline is vertical?",
    intent: "Placement must not obscure adjacent vertical text or interrupt the reading flow. Left placement follows reading direction; below placement follows screen geometry.",
    variants: [
      {
        name: "Placement comparison",
        demo: <TooltipDemo />,
        code: `function Tooltip({ children, content, placement = "left" }) {
  const [visible, setVisible] = useState(false)

  const positionStyle = {
    left: {
      right: "calc(100% + 10px)",
      top: "50%",
      transform: "translateY(-50%)",
    },
    below: {
      bottom: "calc(100% + 10px)",
      left: "50%",
      transform: "translateX(-50%)",
    },
  }[placement]

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          style={{
            position: "absolute",
            writingMode: "horizontal-tb",
            background: "var(--color-fg)",
            color: "var(--color-bg)",
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: "0.8125rem",
            fontWeight: 500,
            whiteSpace: "nowrap",
            zIndex: 100,
            ...positionStyle,
          }}
        >
          {content}
        </div>
      )}
    </div>
  )
}`,
      },
    ],
    doList: [
      "Default to left placement — tooltip appears in the direction reader came from",
      "Keep tooltip width ≤ 240px",
      "Dismiss on Escape and pointer leave with 200ms delay",
    ],
    dontList: [
      "Place tooltips below vertical text triggers — they interrupt the column below",
      "Use tooltips for interactive content",
      "Animate tooltips on the reading axis",
    ],
    accessibility: "role='tooltip'. aria-describedby on trigger. Not used for required information. Keyboard accessible via focus.",
    openQuestion: "When a vertical column is at the leftmost edge of the viewport, where does a left-placed tooltip go? Smart collision detection for vertical baselines is unsolved.",
    status: "built",
  },
  {
    slug: "sheet",
    name: "Sheet",
    category: "Overlays",
    description: "A secondary surface that animates over primary content from a specific edge.",
    problem: "Should a sheet animate from screen geometry (edges) or reading direction (where the reader came from)?",
    intent: "Animation origin communicates spatial relationship. Bottom feels like a new layer. Right (in RTL) travels against reading direction. Left follows reading direction.",
    variants: [
      {
        name: "Edge comparison",
        demo: <SheetDemo />,
        code: `function Sheet({ children, open, onClose, edge = "bottom" }) {
  const [closing, setClosing] = useState(false)

  const close = () => {
    setClosing(true)
    setTimeout(() => { onClose(); setClosing(false) }, 260)
  }

  const animations = {
    bottom: closing ? "sheet-out-bottom" : "sheet-in-bottom",
    right:  closing ? "sheet-out-right"  : "sheet-in-right",
    left:   closing ? "sheet-out-left"   : "sheet-in-left",
  }

  const positions = {
    bottom: { bottom: 0, left: 0, right: 0, borderRadius: "16px 16px 0 0" },
    right:  { top: 0, right: 0, bottom: 0, width: "75%", borderRadius: "16px 0 0 16px" },
    left:   { top: 0, left: 0, bottom: 0, width: "75%", borderRadius: "0 16px 16px 0" },
  }

  if (!open) return null
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50 }} onClick={close}>
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.4)",
        animation: "fade-in 200ms ease",
      }} />
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{
          position: "absolute",
          background: "var(--color-bg)",
          padding: 24,
          animation: \`\${animations[edge]} 260ms cubic-bezier(0.32,0.72,0,1) both\`,
          ...positions[edge],
        }}
      >
        {children}
      </div>
    </div>
  )
}`,
      },
    ],
    doList: [
      "Choose animation direction based on semantic relationship to content",
      "Use spring easing with slightly higher stiffness than horizontal equivalents",
      "Always provide a visible dismiss handle and Escape key support",
    ],
    dontList: [
      "Animate from the right in an RTL interface — it travels against reading flow",
      "Open sheets with fade only — directional entry communicates spatial relationship",
      "Use sheets for content that needs to be compared with what's behind it",
    ],
    accessibility: "role='dialog', aria-modal='true'. Focus trapped. Dismiss via Escape. Focus returns to trigger on close.",
    openQuestion: "Should chapter-level navigation sheets enter from the right (where the next chapter is) or the bottom (new layer)? Both are defensible.",
    status: "built",
  },
  {
    slug: "dialog",
    name: "Dialog",
    category: "Overlays",
    description: "A modal window requiring user decision before proceeding.",
    problem: "How does a dialog present in a full-vertical interface without disorienting the user?",
    intent: "Dialogs interrupt reading. Their animation should feel orthogonal to reading direction — appearing from above (scale) rather than from a reading-axis edge.",
    variants: [
      {
        name: "Default",
        demo: PLACEHOLDER_DEMO("Dialog", "⚠"),
        code: `function Dialog({ open, onClose, title, description, actions }) {
  if (!open) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-desc"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      {/* Scrim */}
      <div
        onClick={onClose}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(2px)",
        }}
      />
      {/* Panel */}
      <div style={{
        position: "relative",
        background: "var(--color-bg)",
        borderRadius: 20,
        padding: 24,
        maxWidth: 340,
        width: "100%",
        // Scale-up: orthogonal to reading direction
        animation: "dialog-in 220ms cubic-bezier(0.34,1.56,0.64,1) both",
      }}>
        <h2 id="dialog-title" style={{ fontSize: "1rem", fontWeight: 700 }}>
          {title}
        </h2>
        <p id="dialog-desc" style={{ color: "var(--color-fg-muted)", marginTop: 8 }}>
          {description}
        </p>
        <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
          {actions}
        </div>
      </div>
    </div>
  )
}`,
      },
    ],
    doList: [
      "Animate with scale-up from center — avoids reading-axis conflict",
      "Keep dialogs to a maximum of 2 actions",
      "Trap focus inside the dialog until dismissed",
    ],
    dontList: [
      "Animate dialogs from the reading direction edges",
      "Use dialogs for non-critical information (use Toast instead)",
      "Place vertical text inside a dialog — it reads like content, not a decision interface",
    ],
    accessibility: "role='dialog', aria-modal, aria-labelledby, aria-describedby. Focus trapped. Escape closes. Focus returns to trigger.",
    openQuestion: "Should a dialog's action buttons be arranged horizontally (conventional) or vertically (matching the layout) in a fully vertical interface?",
    status: "coming-soon",
  },
  {
    slug: "drawer",
    name: "Drawer",
    category: "Overlays",
    description: "A slide-in panel that presents vertical content flowing R→L, matching the reading direction.",
    problem: "Which edge does a drawer enter from in a vertical, RTL reading interface?",
    intent: "The drawer from the right edge of an RTL interface arrives from the reading origin — it feels like the reader is being pulled back. The trailing edge (left) or top can feel more natural.",
    variants: [
      {
        name: "Navigator drawer",
        demo: PLACEHOLDER_DEMO("Drawer", "≡"),
        code: `function Drawer({ open, onClose, children }) {
  return (
    <>
      {/* Scrim */}
      {open && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
            zIndex: 40,
            animation: "fade-in 200ms ease",
          }}
        />
      )}

      {/* Panel — enters from TRAILING edge (left in RTL) */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,   // leading edge in LTR = trailing in RTL reading
        bottom: 0,
        width: "80%",
        maxWidth: 320,
        background: "var(--color-bg)",
        zIndex: 50,
        overflowY: "auto",
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 300ms cubic-bezier(0.32,0.72,0,1)",
        boxShadow: open ? "4px 0 32px rgba(0,0,0,0.2)" : "none",
      }}>
        {children}
      </div>
    </>
  )
}`,
      },
    ],
    doList: [
      "Use the left edge for drawers — it's the trailing edge in RTL and feels less intrusive",
      "Present drawer content in the same vertical orientation as the main content",
      "Animate with CSS transitions, not JS animation — smoother on low-power devices",
    ],
    dontList: [
      "Animate a drawer from the right (reading origin) in an RTL interface",
      "Put the drawer trigger inside the drawer itself",
      "Use a drawer for content that needs to stay in view alongside main content (use split view)",
    ],
    accessibility: "role='dialog' or role='navigation'. aria-label. Focus trapped when modal. Escape closes.",
    openQuestion: "Should a navigator drawer in a vertical RTL reader enter from the top (reading start) or the left (trailing edge in RTL columns)?",
    status: "coming-soon",
  },

  // ── Feedback ──────────────────────────────────────────────────────────────────
  {
    slug: "toast",
    name: "Toast",
    category: "Feedback",
    description: "A brief, auto-dismissing notification that doesn't interrupt the reading experience.",
    problem: "Where does a transient notification appear in a vertical interface without interrupting reading flow?",
    intent: "Toasts in horizontal apps appear at the top or bottom. In a vertical reading interface, the columns create visual corridors — a toast should appear outside the active reading column.",
    variants: [
      {
        name: "Default",
        demo: PLACEHOLDER_DEMO("Toast", "✓"),
        code: `function Toast({ message, visible }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "fixed",
        // Top-center: above the reading area
        // Avoids interrupting the column below
        top: 80,
        left: "50%",
        transform: \`translateX(-50%) translateY(\${visible ? 0 : -12}px)\`,
        opacity: visible ? 1 : 0,
        transition: "all 200ms cubic-bezier(0.34,1.56,0.64,1)",
        background: "var(--color-fg)",
        color: "var(--color-bg)",
        padding: "10px 18px",
        borderRadius: 999,
        fontSize: "0.875rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
        zIndex: 100,
        pointerEvents: "none",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      }}
    >
      {message}
    </div>
  )
}`,
      },
    ],
    doList: [
      "Position toasts at the top, above the reading area",
      "Keep messages to one line — this is acknowledgement, not information",
      "Auto-dismiss after 2 seconds, with a 300ms fade-out",
    ],
    dontList: [
      "Position toasts at the bottom of reading columns — they'll appear mid-sentence",
      "Use toasts for errors — use an inline alert or dialog instead",
      "Stack multiple toasts — replace with the latest",
    ],
    accessibility: "aria-live='polite', aria-atomic='true'. Not positioned based on visual layout — screenreaders announce regardless of position.",
    openQuestion: "In a full-screen vertical reader, is 'above the content' still the right position for toasts, or does it interrupt the reading start point?",
    status: "coming-soon",
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    category: "Feedback",
    description: "A vertical-column shimmer that mirrors real reader metrics while content loads.",
    problem: "How should loading state look in a column-based vertical reader without layout shift?",
    intent: "The skeleton should mirror the actual column geometry — same column width, same approximate glyph density — so content lands where the ghosts were.",
    variants: [
      {
        name: "Column skeleton",
        demo: PLACEHOLDER_DEMO("Skeleton", "▓"),
        code: `function ColumnSkeleton({ columns = 3, cellHeight = 24, cellsPerColumn = 20 }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "row-reverse", // RTL column order
      gap: 32,
      padding: 24,
    }}>
      {Array.from({ length: columns }).map((_, col) => (
        <div key={col} style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          width: cellHeight, // column width = cell height
        }}>
          {Array.from({ length: cellsPerColumn }).map((_, cell) => (
            <div
              key={cell}
              className="skeleton-pulse"
              style={{
                height: cellHeight,
                width: "100%",
                borderRadius: 3,
                // Slightly vary width for realism
                opacity: Math.random() > 0.9 ? 0.3 : 0.8,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// CSS
// .skeleton-pulse {
//   background: var(--color-border);
//   animation: pulse 1.5s ease-in-out infinite;
// }
// @keyframes pulse {
//   0%, 100% { opacity: 0.4; }
//   50% { opacity: 0.8; }
// }`,
      },
    ],
    doList: [
      "Match skeleton column width and cell height to actual rendered values",
      "Use RTL column order in the skeleton — columns flow right-to-left",
      "Vary glyph-level density slightly for visual realism",
    ],
    dontList: [
      "Use horizontal paragraph skeletons in a vertical reader",
      "Animate skeleton with a horizontal shimmer — use pulse opacity instead",
      "Show skeletons for less than 200ms — content loads too fast to need them",
    ],
    accessibility: "aria-busy='true' on the container. aria-label describing what's loading. Remove when content appears.",
    openQuestion: "Should the skeleton shimmer animate top-to-bottom (following reading direction) or use a simple pulse? Does directionality in the loading animation matter?",
    status: "coming-soon",
  },
];

export function getComponent(slug: string): ComponentEntry | undefined {
  return COMPONENTS_REGISTRY.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return COMPONENTS_REGISTRY.map((c) => c.slug);
}

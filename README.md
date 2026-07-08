# Vertically Works

**Real components for vertical writing interfaces.** Design tokens and vertical-first React components you copy into your project — plus the living documentation that explains every decision, at **[vertically.works](https://vertically.works)**.

Vertical writing systems — Korean (한국어), Japanese (日本語), Chinese (中文) — are treated here not as a typographic choice, but as the foundation of interaction: what a button, a toggle, a list, a dialog become when reading flows top→bottom, right→left.

---

## Quick start

```bash
# 1. Install the design tokens (writes components/vw/tokens.css)
npx verticallyworks init

# 2. Import them once, globally
#    CSS:  @import "./components/vw/tokens.css";   (after @import "tailwindcss"; if you use Tailwind)
#    or:   import "@/components/vw/tokens.css";    (in your root layout)

# 3. Copy components into your project
npx verticallyworks add vertical-button toggle
```

```tsx
import { VerticalButton } from "@/components/vw/vertical-button";
import { VerticalToggle } from "@/components/vw/toggle";

<VerticalButton variant="primary">다음 장</VerticalButton>
<VerticalToggle checked={dark} onCheckedChange={setDark} aria-label="야간 모드" />
```

Components are **source files you own** — real `writing-mode: vertical-rl` (never a rotation), styled entirely through the design tokens, keyboard and screen-reader accessible, reduced-motion aware, React-only with zero runtime dependencies.

Themes: set `data-theme="light" | "dark" | "sepia"` on `<html>`.

## Components

| Name | What it is | Docs |
| --- | --- | --- |
| `vertical-button` | A button whose label is set on the vertical reading axis | [button](https://vertically.works/components/button) |
| `toggle` | An on/off switch whose thumb travels the reading axis — up is on | [toggle](https://vertically.works/components/toggle) |
| `vertical-list-cell` | The full-height column cell behind every vertical list | [vertical-list-cell](https://vertically.works/components/vertical-list-cell) |
| `tooltip` | Opens to the left of its trigger — along the reading direction | [tooltip](https://vertically.works/components/tooltip) |
| `dialog` | A modal whose title, description, and actions read as columns | [dialog](https://vertically.works/components/dialog) |
| `sheet` | An edge sheet aware of the reading axis (bottom / left / right) | [sheet](https://vertically.works/components/sheet) |
| `text-field` | Vertical label, deliberately horizontal input (CJK IME needs the baseline) | [text-field](https://vertically.works/components/text-field) |
| `tabs` | A tab rail on the reading axis with full keyboard semantics | [tabs](https://vertically.works/components/tabs) |

`npx verticallyworks list` prints this from the live registry.

## Design tokens

Everything ships in one file, `tokens.css`:

- **Semantic colors** — `--color-bg/-subtle/-muted`, `--color-fg/-muted/-subtle`, `--color-border/-strong`, with full `light` / `dark` / `sepia` themes via `data-theme`
- **Spacing** — `--space-1` … `--space-32` (4px base)
- **Radius** — `--radius-sm` … `--radius-full`, plus continuous "squircle" corner smoothing where `corner-shape` is supported
- **Motion** — `--duration-micro` … `--duration-page` and `--easing-*` curves; every duration collapses to `0ms` under `prefers-reduced-motion`
- **Utilities** — `.writing-vertical`, `.writing-vertical-upright`, `.pressable` press feedback, `.corner-round`

Components never hardcode a color, size, or duration — restyle your copy by editing tokens.

## shadcn CLI compatibility (experimental)

The registry serves [shadcn-shaped](https://ui.shadcn.com/docs/registry) items, so this also works in a shadcn-initialized project:

```bash
npx shadcn@latest add https://vertically.works/r/vertical-button.json
```

## The documentation site

[vertically.works](https://vertically.works) is the living reference: every component ships with its design question, an interactive demo, do/don't guidance, accessibility notes, an open question — and the exact source `add` copies. The site dogfoods the same files.

```
registry/        Published source of truth (tokens.css, components/, registry.json)
packages/cli/    The `verticallyworks` npm package
scripts/         build-registry.mjs → emits public/r/*.json
app/             Next.js routes (the documentation site)
components/      Site components and interactive demos
docs/            Project meta-documentation (manifesto, blueprint)
```

### The applications

Three apps built on these principles, documented as case studies:

- **[Vertically Verse](https://vertically.works/apps/vertically-verse)** — a fully vertical, RTL scripture reader for iOS ([source](https://github.com/jihoons/exploring))
- **[Vertically Do](https://vertically.works/apps/vertically-do)** — a to-do list where tasks are columns ([use it](https://vertically.works/apps/notes))
- **[Vertically Listen](https://vertically.works/apps/vertically-listen)** — a podcast player with transcripts as vertical verse ([use it](https://vertically.works/apps/listen))

## Development

```bash
npm install
npm run dev      # builds the registry, then starts Next.js
npm run build    # builds the registry, then the site
npm run lint
```

Editing files under `registry/` mid-session? Re-run `npm run registry:build` to refresh `public/r/`. The site deploys to Vercel on push to `main`.

## License

[MIT](./LICENSE) © Jihoon Suh

---

One sentence: Vertically Works explores how software changes when writing direction becomes the foundation of interaction rather than a typographic afterthought.

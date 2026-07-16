<!-- Hero: docs/media/toggle.gif (549KB). Swap to docs/media/components.gif for the full 6-component grid if you prefer breadth over focus. -->
<p align="center">
  <img src="./docs/media/toggle.gif" alt="A vertical toggle whose thumb travels the reading axis · up is on" width="520" />
</p>

# Vertically Works

**Every UI component you know assumes horizontal text. This is what happens when it doesn't.**

Open-source React components for vertical writing interfaces · Korean (한국어), Japanese (日本語), Chinese (中文) · where reading flows top to bottom, right to left.

[![npm](https://img.shields.io/npm/v/verticallyworks)](https://www.npmjs.com/package/verticallyworks)
[![license](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![site](https://img.shields.io/badge/docs-vertically.works-black)](https://vertically.works)

True `writing-mode: vertical-rl` · never a rotation. A shadcn-style registry: components are source files you copy and own. Zero runtime dependencies. Keyboard, screen reader, and reduced-motion support built in.

The living reference is **[vertically.works](https://vertically.works)** · every component ships its design question, an interactive demo, do/don't guidance, accessibility notes, and the exact source the CLI copies.

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

Themes: set `data-theme="light" | "dark" | "sepia"` on `<html>`.

## Works with the shadcn CLI

The registry serves [shadcn-shaped](https://ui.shadcn.com/docs/registry) items, so components install straight into any shadcn-initialized project:

```bash
npx shadcn@latest add https://vertically.works/r/vertical-button.json
```

## Why this exists

The web's interaction layer was built on one assumption: text runs left to right. For vertical writing, that assumption breaks everything downstream of it · which way a toggle flips, where a tooltip opens, what the arrow keys mean, where the IME candidate window belongs.

This project started in 2019 as [an essay](https://uxdesign.cc/vertically-works-design-exploration-on-vertical-typography-75164eed11a8) asking whether vertical type could work in user interface. The honest answer then was that nobody knew · the components you would need to find out did not exist. Seven years later, this repository is the answer in progress: components on true writing-mode, applications that put them under real load, and [eight open questions](https://vertically.works/challenges) documented as carefully as the answers.

## Components

Each is a source file you own, styled entirely through the design tokens, accessible by default.

| Name                 | What it is                                                                  | Docs                                                                          |
| -------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `vertical-button`    | A button whose label is set on the vertical reading axis                    | [button](https://vertically.works/components/button)                          |
| `toggle`             | An on/off switch whose thumb travels the reading axis · up is on            | [toggle](https://vertically.works/components/toggle)                          |
| `vertical-list-cell` | The full-height column cell behind every vertical list                      | [vertical-list-cell](https://vertically.works/components/vertical-list-cell)  |
| `tooltip`            | Opens to the left of its trigger · along the reading direction              | [tooltip](https://vertically.works/components/tooltip)                        |
| `dialog`             | A modal whose title, description, and actions read as columns               | [dialog](https://vertically.works/components/dialog)                          |
| `sheet`              | An edge sheet aware of the reading axis (bottom / left / right)             | [sheet](https://vertically.works/components/sheet)                            |
| `text-field`         | Vertical label, deliberately horizontal input (CJK IME needs the baseline)  | [text-field](https://vertically.works/components/text-field)                  |
| `tabs`               | A tab rail on the reading axis with full keyboard semantics                 | [tabs](https://vertically.works/components/tabs)                              |

`npx verticallyworks list` prints the live registry. The full documented set · twenty components across actions, inputs, navigation, text, overlays, conversation, feedback, lists, and layout · lives at [vertically.works/components](https://vertically.works/components), landing in the registry as they harden.

## Design tokens

Everything ships in one file, `tokens.css`:

- **Semantic colors** · `--color-bg/-subtle/-muted`, `--color-fg/-muted/-subtle`, `--color-border/-strong`, with full `light` / `dark` / `sepia` themes via `data-theme`
- **Spacing** · `--space-1` … `--space-32` (4px base)
- **Radius** · `--radius-sm` … `--radius-full`, plus continuous "squircle" corner smoothing where `corner-shape` is supported
- **Motion** · `--duration-micro` … `--duration-page` and `--easing-*` curves; every duration collapses to `0ms` under `prefers-reduced-motion`
- **Utilities** · `.writing-vertical`, `.writing-vertical-upright`, `.pressable` press feedback, `.corner-round`

Components never hardcode a color, size, or duration · restyle your copy by editing tokens.

## The applications

Four apps built on these principles, documented as case studies:

- **[Vertically Verse](https://vertically.works/apps/vertically-verse)** · a fully vertical, RTL scripture reader for iOS · [TestFlight beta](https://testflight.apple.com/join/DY7MKU7m)
- **[Vertically To-do](https://vertically.works/apps/vertically-do)** · a to-do list where tasks are columns · [use it](https://vertically.works/apps/notes)
- **[Vertically Listen](https://vertically.works/apps/vertically-listen)** · a podcast player with transcripts as vertical verse · in progress
- **[Vertically News](https://vertically.works/apps/vertically-news)** · live KR/JP/CN headlines set as a vertical newspaper · [read it](https://vertically.works/apps/news)

## Open questions · contributing

Most questions in vertical interface design do not have correct answers yet. The eight hardest are pinned as [Discussions](https://github.com/jihoons0/vertically-works/discussions) · motion, mixed-script typography, navigation, text selection, IME, keyboard semantics, drag-and-drop, and what a vertical AI chat interface should be. Strong answers get merged into the spec.

Good first issues include JP / KR / CN documentation translations and new components from the documented set. Disagreement is a contribution.

## Repository layout

```
registry/        Published source of truth (tokens.css, components/, registry.json)
packages/cli/    The `verticallyworks` npm package
scripts/         build-registry.mjs → emits public/r/*.json
app/             Next.js routes (the documentation site)
components/      Site components and interactive demos
docs/            Project meta-documentation (manifesto, blueprint)
```

## Development

```bash
npm install
npm run dev      # builds the registry, then starts Next.js
npm run build    # builds the registry, then the site
npm run lint
```

Editing files under `registry/` mid-session? Re-run `npm run registry:build` to refresh `public/r/`. The site deploys to Vercel on push to `main`.

## About

Built by **[Jihoon Suh](https://jihoonsuh.com)** · designer in New York · [@jihoons0](https://x.com/jihoons0). Began in 2019.

## License

[MIT](./LICENSE) © Jihoon Suh

---

One sentence: Vertically Works explores how software changes when writing direction becomes the foundation of interaction rather than a typographic afterthought.

⭐ If this opened a question for you, a star helps other people find it.

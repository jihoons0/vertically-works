# Vertically Works — Repository Constitution

You are building Vertically Works, the canonical reference for vertical interface design.
This is a documentation platform, not a marketing website.
The knowledge is the product. The website is the first expression of it.

---

## What this is

An interactive documentation platform answering one question:
*If digital interfaces had been invented around vertical writing systems, what would software look like today?*

Audience: product designers, UX designers, design engineers, frontend engineers, researchers, and AI agents.

---

## Mandatory rules

- Never create marketing pages. Never write promotional copy.
- Every page must teach something. No content without insight.
- Every component ships with: purpose, problem, interactive demo, accessibility notes, implementation notes.
- Always prefer interactive demonstrations over paragraphs of explanation.
- Motion follows reading direction — never add animation that is purely decorative.
- Use `writing-mode: vertical-rl` and `text-orientation: mixed` for actual vertical text demos. Never fake vertical text by rotating horizontal text unless that is the explicit point of the demo.
- Accessibility is fundamental. Every interactive component ships with keyboard, touch, screen reader, and reduced motion behavior.
- Never hardcode motion values. Use the CSS custom property token system (`--duration-*`, `--easing-*`).
- Document uncertainty explicitly. Open questions belong in the docs alongside resolved ones.
- Show reasoning behind every design decision.
- Spacing comes from the `--space-*` token system. Never hardcode pixel values.
- Color comes from the semantic token system (`--color-bg`, `--color-fg`, etc.). Never hardcode hex values in components.

---

## Tech stack

- **Next.js 16** App Router, TypeScript strict mode
- **Tailwind CSS v4** — CSS-based config, no tailwind.config.js; custom tokens live in `app/globals.css` inside `@theme`
- **next-mdx-remote** — MDX content from `content/` directory, rendered per-route
- **next-themes** — dark/light/system theming via `data-theme` attribute
- **Geist Sans + Geist Mono** — loaded via `next/font/google`

---

## Folder structure

```
content/          MDX source files for all doc pages
  applications/
  challenges/
  principles/
  components/
app/              Next.js routes
components/       Shared React components
  nav/            Navigation
  layout/         Page layout primitives
  ui/             Design system UI components
  demos/          Interactive vertical-text demos (used in doc pages)
  providers/      React context providers
docs/             Meta-documentation about the project itself (not web content)
lib/              Utilities (MDX loading, metadata helpers)
public/           Static assets
```

---

## Design rules

- Large typography, minimal decoration, extensive whitespace
- No illustrations, no gradients, no marketing copy in the UI
- Monochromatic palette — the vertical text IS the visual signature
- Vertical text elements (`writing-mode: vertical-rl`) serve as live demonstrations, not decoration
- Every spacing value comes from `--space-*` tokens
- Every radius value comes from `--radius-*` tokens
- Every motion duration comes from `--duration-*` tokens
- Dark theme is fully supported via `[data-theme="dark"]` on `<html>`

---

## Component authoring rules

- All motion uses `--duration-*` and `--easing-*` CSS custom properties
- All components respect `@media (prefers-reduced-motion: reduce)`
- `writing-mode`, `text-orientation`, and `direction` are first-class here
- Interactive demos must be isolated — they should work standalone

---

## What ships next

Sprint 1 (current): Shell, navigation, MDX pipeline, homepage, stub pages
Sprint 2: Applications, Challenges, Principles pages with real content
Sprint 3: Component pages with interactive demos
Sprint 4: Playground
Sprint 5: Motion library

---

## Deployment

- This repo is the live site **https://vertically.works**, deployed by Vercel from the `main` branch. Pushing to `main` triggers a production deploy.
- **"ship it" means: commit and push to `main` so it deploys to https://vertically.works.** Do not just build locally — a change is not "shipped" until it is live on the site. **For the to-do app specifically, that means https://vertically.works/apps/notes.**
- **Route ⇄ file — do not get this wrong:** the App Router `app/` directory is the routing root and is NEVER part of the URL.
  - `app/apps/notes/page.tsx` → **`/apps/notes`** ✅ (the to-do app's canonical URL)
  - `app/notes/page.tsx` → `/notes` ❌
  `app/apps/notes` is NOT "apps/apps" nesting — it is the `app/` framework folder + the `apps/notes` URL path (`apps` appears once in the URL).

## Applications live here

- **`/apps/notes`** — **Vertically Do**, the vertical/RTL to-do app. Page at `app/apps/notes/`, plus `components/notes`, `lib/notes`. Rendered full-screen (no site chrome) via `components/layout/SiteFrame.tsx`; reachable from the `/apps` launcher's "To-do" card. This is a *different app* from Vertically Verse.
- Vertically **Verse** is the CJK **scripture (bible) reader** — `/apps/vertically-verse` + `/apps/verse/*`. Never conflate Verse (bible) with Notes (to-do).

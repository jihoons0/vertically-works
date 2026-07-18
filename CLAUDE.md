# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Vertically Works — Repository Constitution

You are building Vertically Works, the canonical reference for vertical interface design.
This is a documentation platform and component registry, not a marketing website.
The knowledge is the product. The website is the first expression of it.

The one question everything answers: *if digital interfaces had been invented around vertical writing systems (Korean, Japanese, Chinese), what would software look like today?*

Audience: product designers, UX designers, design engineers, frontend engineers, researchers, and AI agents.

---

## Commands

```bash
npm run dev             # builds the registry, then starts Next.js dev server
npm run build           # builds the registry, then the production site
npm run lint            # eslint
npm run registry:build  # regenerate public/r/*.json from registry/ (re-run after editing registry/ mid-session)
```

There is no test suite. Verification is `npm run build` + exercising pages in the browser.

**Next.js 16 warning (from AGENTS.md):** this is NOT the Next.js you know from training data — APIs, conventions, and file structure may differ. Read the relevant guide in `node_modules/next/dist/docs/` before writing framework-touching code, and heed deprecation notices.

---

## Architecture

The repo ships **two products from one source**:

1. **The documentation site** (https://vertically.works) — Next.js 16 App Router, TypeScript strict, Tailwind CSS v4 (CSS-based config, no tailwind.config.js), next-themes.
2. **The installable registry** — design tokens + copy-in React components, consumed via `npx verticallyworks init|add|list` (the CLI in `packages/cli`, published to npm) and via `npx shadcn add https://vertically.works/r/<name>.json`.

### The registry pipeline

- `registry/` is the **published source of truth**: `tokens.css`, `components/` (the `@/components/vw/*` reference implementations), `vertical-typography.md`, and the `registry.json` manifest.
- `scripts/build-registry.mjs` (zero-dependency, runs automatically before `dev`/`build`) inlines file contents and emits shadcn-registry-item-shaped JSON to `public/r/*.json`, which is what the CLI and shadcn consume from the live site.
- `registry.json` items carry a `siteSlug` linking each registry item to its doc page at `/components/[slug]`.
- The site **dogfoods the registry**: `app/globals.css` starts with `@import "../registry/tokens.css"` — the same file users install. Everything else in `globals.css` is site-only chrome.

### Documentation content is TSX, not MDX

There is no `content/` directory and no MDX pipeline (despite `next-mdx-remote` lingering in package.json). Component doc pages are driven by **`lib/components-registry.tsx`** — an array of `ComponentEntry` objects (slug, category, problem, intent, variants with demo + code, do/don't lists, accessibility, openQuestion, status) rendered by `app/components/[slug]`. Interactive demos live in `components/demos/`. To add or edit a component doc, edit that registry file and its demo component.

### The spec layer

`spec/` (BRAND.md, PRINCIPLES.md, README.md index) plus `registry/vertical-typography.md` are the **implementation-neutral source of truth** shared with the Swift apps (VerticallyKit, Vertically Verse, VerticallyPoemLab — separate repos). Rules are edited there first; each platform implements them. When changing a design rule, update the canonical doc, then the implementations.

`docs/` holds project provenance (00_MANIFESTO, 01_BLUEPRINT, 02_PROJECT_KICKOFF) — read for intent, not runtime. `gtm/` is go-to-market material (launch playbook, discussions, translations), not code. `AGENTS.md` carries the Next.js 16 warning quoted below.

### Design tokens & theming

- Canonical token definitions live in `registry/tokens.css`: semantic colors (`--color-bg/-subtle/-muted`, `--color-fg/-muted/-subtle`, `--color-border/-strong`), spacing (`--space-1`…`--space-32`, 4px base), radius (`--radius-*`), motion (`--duration-micro`…`--duration-page`, `--easing-*`).
- Three themes — `light` / `dark` / `sepia` — via `data-theme` on `<html>` (next-themes, `components/providers/ThemeProvider`).
- All durations collapse to ~0ms under `prefers-reduced-motion` (in tokens.css, plus a site-only universal reset in globals.css that also reaches inline styles).
- Tailwind v4 `@theme inline` in globals.css maps Tailwind names onto these tokens.

### Fonts

Site voice is **Libre Baskerville** (titles, `--font-title`) + **Noto Sans/Serif KR·JP·TC** (CJK families stream by unicode-range, no preload). **Geist Sans/Mono** remain for the embedded apps and code. All loaded in `app/layout.tsx` via `next/font/google`.

### The applications (detail pages + subdomain apps)

Each app has **two surfaces**: a **detail / case-study page** at `/apps/<name>` (site chrome), and — for the web apps — a **running app** served on its own **subdomain**. The running apps render **bare** (no chrome) because they live *outside* the `app/(site)` route group (see Route ⇄ file), not via a route allowlist.

Detail pages live in `app/(site)/apps/<name>/`: `verse`, `todo`, `news`, `listen`, `chat`. The `/apps` index links to them.

Running web apps live under **`app/run/<name>/`** and are served on subdomains via host-rewrites in `next.config.ts` (`<name>.vertically.works` → `/run/<name>`):

- **`todo.vertically.works`** → `/run/todo` — **Vertically To-do** (localStorage only). Detail `/apps/todo`. NOTE the folder split: the *route* is `app/run/todo/` but its components/logic still live in **`components/notes` / `lib/notes`** (the app's internal name is "notes").
- **`news.vertically.works`** → `/run/news` (+ `/article/[id]`) — **Vertically News**, RSS reader (`components/news`, `lib/news`; `app/api/news/*`). Detail `/apps/news`.
- **`listen.vertically.works`** → `/run/listen` — **Vertically Listen**, podcast player (`components/listen`, `lib/listen`; `app/api/podcasts|episodes|transcript`). Detail `/apps/listen`.
- **`chat.vertically.works`** → `/run/chat` — **Vertically Chat**, a WIP placeholder (no app built yet; tracks the `ai-chat` challenge). Detail `/apps/chat`.
- **Vertically Verse** is the CJK **scripture (bible) reader for iOS** — detail page `/apps/verse` plus `/verse/*` (privacy/support). No web app: **`verse.vertically.works` 307-redirects to the TestFlight beta**. A *different app* from To-do; never conflate Verse (bible) with To-do.

Detail-page "open the app" buttons use `runningAppUrl()` in `lib/appUrls.ts` (subdomain in prod, `/run/<name>` in dev); iframe embeds (`components/apps/AppEmbed`) stay same-origin on `/run/<name>`. Each web app keeps state in `lib/<app>/store.ts`, i18n in `lib/<app>/i18n.ts`, styles in `app/run/<app>/<app>.css`.

### Contact form

`app/api/contact/route.ts` emails home-page contact submissions via **Resend** to the owner inbox (reply-to = the visitor), with a mailto fallback if unconfigured. Needs `RESEND_API_KEY` (Vercel env + `.env.local`); sends `from` a **Resend-verified domain** (`vertically.works`). See `.env.example`.

### Chromed site routes (not bare)

Beyond the docs pages, two interactive surfaces get full site chrome: **`/playground`** (`components/PlaygroundClient.tsx`) — a live cross-writing-direction / language / theme / device previewer whose config serializes to the URL — and **`/about`**. Both use `components/layout/PageHeader`.

### Route ⇄ file — the `(site)` group + `/run` apps

The App Router `app/` directory is the routing root and is NEVER part of the URL. Route groups like `(site)` also never appear in the URL.

- **Chrome pages** live under **`app/(site)/…`** → e.g. `app/(site)/apps/todo/page.tsx` → **`/apps/todo`** (the To-do *detail* page). The `(site)` group supplies Navigation + Footer via `app/(site)/layout.tsx`.
- **Running apps** live *outside* the group under **`app/run/…`** → e.g. `app/run/todo/page.tsx` → **`/run/todo`**, rendered **bare** (no chrome). Subdomains host-rewrite onto these (`todo.vertically.works` → `/run/todo`).
- `app/api/…` also stays outside `(site)`.

Bare-vs-chrome is **structural now** (inside `app/(site)` = chrome; `app/run/*` = bare). The old pathname-based `BARE_ROUTES` list in `SiteFrame.tsx` is gone. When adding a new running app, put it in `app/run/<name>` and add a host-rewrite in `next.config.ts` — do NOT re-add a bare-route allowlist.

---

## Mandatory rules

- Never create marketing pages. Never write promotional copy.
- Every page must teach something. No content without insight.
- Every component ships with: purpose, problem, interactive demo, accessibility notes, implementation notes.
- Always prefer interactive demonstrations over paragraphs of explanation.
- Motion follows reading direction — never add animation that is purely decorative.
- Use `writing-mode: vertical-rl` and `text-orientation: mixed` for actual vertical text demos. Never fake vertical text by rotating horizontal text unless that is the explicit point of the demo.
- Accessibility is fundamental. Every interactive component ships with keyboard, touch, screen reader, and reduced motion behavior.
- Never hardcode motion values, spacing, or colors — use the token system (`--duration-*`, `--easing-*`, `--space-*`, `--radius-*`, `--color-*`). Registry components never hardcode a color, size, or duration.
- Document uncertainty explicitly. Open questions belong in the docs alongside resolved ones (`openQuestion` is a first-class field).
- Show reasoning behind every design decision.

## Design rules

- Large typography, minimal decoration, extensive whitespace.
- No illustrations, no gradients, no marketing copy in the UI.
- Monochromatic palette — the vertical text IS the visual signature.
- Vertical text elements (`writing-mode: vertical-rl`) serve as live demonstrations, not decoration.
- `writing-mode`, `text-orientation`, and `direction` are first-class here.
- Interactive demos must be isolated — they should work standalone.

---

## Deployment

- This repo is the live site **https://vertically.works**, deployed by Vercel from the `main` branch. Pushing to `main` triggers a production deploy.
- **"ship it" means: commit and push to `main` so it deploys to https://vertically.works.** Do not just build locally — a change is not "shipped" until it is live on the site. For the to-do app specifically, that means https://todo.vertically.works (detail page: https://vertically.works/apps/todo).
- **Subdomains** (`news`/`todo`/`listen`/`chat`/`verse`.vertically.works) are served by the same project via host-rewrites/redirects in `next.config.ts`. Infra (not in the repo): a wildcard `*.vertically.works` CNAME → `cname.vercel-dns.com` at the registrar (GoDaddy), and each host added as a domain on the Vercel project. Adding a new app subdomain = add the host-rewrite in config **and** the Vercel project domain (the wildcard CNAME already covers DNS).

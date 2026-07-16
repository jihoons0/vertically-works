# v0.1.0 release notes (draft)

Paste into **GitHub → Releases → Draft a new release**. Tag: `v0.1.0` · Target: `main` · Title: `v0.1.0 · Vertically Works`.
(A repo with zero releases reads as abandoned — this is purely a launch-hygiene tag. Publish it the morning of launch.)

---

## v0.1.0 · The first public cut

**Vertically Works** is an open-source design system for vertical writing interfaces — Korean, Japanese, Chinese — where reading flows top to bottom, right to left. Real `writing-mode: vertical-rl`, **never a rotation.**

### What's in it

- **Copy-and-own React components** on true `writing-mode: vertical-rl` — source files you own, zero runtime dependencies, styled entirely through design tokens.
- **A shadcn-compatible registry.** Install with the project CLI or the shadcn CLI:
  ```bash
  npx verticallyworks init
  npx verticallyworks add vertical-button toggle
  # or, in a shadcn project:
  npx shadcn@latest add https://vertically.works/r/vertical-button.json
  ```
- **Design tokens in one file** — semantic colors with `light` / `dark` / `sepia` themes, spacing, radius (incl. squircle corner smoothing), and motion tokens that collapse to `0ms` under `prefers-reduced-motion`.
- **Accessibility built in** — remapped arrow keys, RTL-aware focus order, screen-reader column order, reduced-motion support, documented per component.
- **Four applications** built on the system, documented as case studies: Vertically Verse (iOS, [TestFlight](https://testflight.apple.com/join/DY7MKU7m)), Vertically To-do, Vertically Listen, Vertically News.
- **The living reference** at [vertically.works](https://vertically.works) — every component ships its design question, an interactive demo, do/don't guidance, accessibility notes, and the exact source the CLI copies.

### This is a living study

Most questions in vertical interface design don't have correct answers yet. The eight hardest are open as [RFC Discussions](https://github.com/jihoons0/vertically-works/discussions) — strong answers get merged into the spec. Disagreement is a contribution.

**Docs:** https://vertically.works · **Contributing:** [CONTRIBUTING.md](./CONTRIBUTING.md) · **License:** MIT

---

_Note: "twenty components documented, a growing registry you install from" — the registry currently ships the core set (button, toggle, tabs, tooltip, dialog, sheet, text-field, list-cell, tiered-page) with the rest landing as they harden. Keep the count honest in the release copy._

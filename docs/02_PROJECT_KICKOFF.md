# Project Kickoff

How to start a new Vertically Works web project so it inherits everything the studio has
already learned — the manifesto, the typography rules, the tokens, and the component kit —
instead of rediscovering (or worse, reinventing) them.

## How to use this

1. Copy the prompt below into a fresh agent session (Claude Code or similar) in the new
   project's empty directory.
2. Fill in the first line — the one thing only you can supply. The more concrete that
   sentence, the better the proposed surface map.
3. Running **outside this machine** (claude.ai/code, a teammate)? Swap the repo paths for
   the published equivalents — `vertically.works/components/*` and the registry JSON at
   `vertically.works/r/*.json` — since the spec files won't be on disk there.

The "propose a surface map first" step is the highest-leverage line: it forces thinking in
terms of the existing kit before writing custom CSS, and surfaces registry gaps as deliberate
contributions rather than one-off code.

## The prompt

````markdown
You are building **<PROJECT NAME>** — <one sentence: what it is and who it's for>.

This is a **Vertically Works** studio project: an interface designed natively for
vertical (top→bottom), right-to-left CJK reading. Not a horizontal app with rotated
text — every control, gesture, transition, and reading affordance is rethought for
the vertical axis. Vertical writing survives digitally as typography, not as
interaction; this project is interaction.

## Read these first — the studio spec is the source of truth
- `vertically-works/docs/00_MANIFESTO.md` — the thesis (why vertical *interaction*, not just vertical type)
- `vertically-works/spec/PRINCIPLES.md` — design foundations, the vertical/RTL interaction model, materials, motion ethos
- `vertically-works/spec/BRAND.md` — naming, voice
- `vertically-works/registry/vertical-typography.md` — the BINDING typography rules: glyph orientation, tate-chu-yoko digits, punctuation verticalization, 금칙/kinsoku line breaking (KLREQ/JLREQ/UAX #50)
- `vertically-works/registry/tokens.css` — the design tokens

## Setup
- Next.js (App Router) + TypeScript.
- Install the kit, don't rewrite it: `npx verticallyworks init` (tokens), then
  `npx verticallyworks add vertical-button toggle tabs sheet dialog tooltip
  text-field vertical-list-cell tiered-page`.
  If the registry CLI isn't reachable, copy from `vertically-works/registry/`.
- Themes: `data-theme="light" | "dark" | "sepia"` on `<html>`. Ship all three.

## Non-negotiable rules
1. Vertical text is real `writing-mode: vertical-rl` — NEVER `transform: rotate(90deg)`.
2. Reading and navigation progress right→left: first item at the right edge,
   forward = leftward. Lists, drawers, and pagination all follow this axis.
3. DOM order = reading order (`flex-direction: row-reverse` handles the visual R→L),
   so screen readers and tab order read in sequence.
4. Typography follows vertical-typography.md exactly: digit groups ≤3 stay upright
   (tate-chu-yoko), Latin words rotate, punctuation uses vertical forms, kinsoku
   governs line breaks.
5. Every value comes from tokens (`--space-*`, `--radius-*`, `--duration-*`,
   `--easing-*`, semantic `--color-*`). No magic numbers.
6. Motion: springs or ≤300ms; animate opacity/transform only; interruptible;
   enter and exit on the same edge (spatial consistency); `prefers-reduced-motion`
   collapses to cross-fades — never zero feedback.
7. Chrome is itself vertical text, floating translucent over content; scroll-edge
   fades instead of hard 1px dividers; dim-to-focus for modals.
8. Use the studio's signature interactions where they fit: horizontal
   pull-to-paginate (a ring fills as you overscroll past the leftmost column, arms
   at 100%, fires on release), scroll-direction chrome minimize (reading forward
   collapses chrome, scrolling back restores), sliding-capsule toggles, and
   skeletons that mirror real column metrics so text lands where the ghosts were.

## Process
1. Start by proposing a surface map: each screen, which kit components cover it,
   and which NEW components this project will contribute back to the registry.
   Get approval before building.
2. Build screen by screen, verifying in a real browser (Playwright) as you go.
3. Final check across all three themes: computed writing-mode is vertical-rl
   everywhere (no rotation cheats), column order is R→L, keyboard order matches
   reading order, reduced-motion still gives feedback.
````

## Keeping this doc honest

This doc references the spec; it doesn't restate it. When a rule changes, change the
canonical doc ([`spec/`](../spec), [`registry/vertical-typography.md`](../registry/vertical-typography.md),
[`registry/tokens.css`](../registry/tokens.css)) — this prompt only needs editing when the
*list* of canonical sources or kit components changes (e.g. a new component worth
installing by default).

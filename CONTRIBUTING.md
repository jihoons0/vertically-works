# Contributing to Vertically Works

Vertically Works is a living study, not a finished specification — **disagreement is a contribution.**

## Where to start

- **Open questions** live as [RFC Discussions](https://github.com/jihoons0/vertically-works/discussions). The eight hardest problems in vertical interface design are pinned — motion, mixed-script typography, navigation, text selection, IME, keyboard semantics, drag-and-drop, and what a vertical AI chat interface should be. Propose your answer as a PR; strong answers get merged into the spec.
- **Good first issues** are labeled [`good first issue`](https://github.com/jihoons0/vertically-works/labels/good%20first%20issue) — mostly JP / KR / CN documentation translations and porting documented components into the installable registry.

## The bar for a component

Every component ships on true `writing-mode: vertical-rl` — **never a rotation** — styled only through the design tokens, with keyboard, screen-reader, and reduced-motion behavior. Match that bar:

- Never fake vertical text by rotating horizontal text.
- Never hardcode a color, size, or duration — use the `--color-*`, `--space-*`, `--radius-*`, `--duration-*` tokens.
- Document the accessibility behavior of every interactive component.
- Cite prior art where relevant — JLReq / CLReq / KLReq, UAX #50.

## Working in the repo

Components live in `registry/` (the published source of truth). After editing anything there, run `npm run registry:build` to refresh `public/r/`. See [`CLAUDE.md`](./CLAUDE.md) for the architecture.

```bash
npm install
npm run dev      # builds the registry, then starts Next.js
npm run lint
npm run build
```

## PR flow

Fork → branch → `npm run lint` && `npm run build` → open a PR that names the design question it answers. Be kind, concede good points, and show your reasoning — that's the whole ethos of the project.

# Brand

## The question

> **If digital interfaces had been invented around vertical writing systems, what would
> software look like today?**

Vertically Works explores that — an interaction model built *around* the vertical, right-to-left
axis, rather than a horizontal app with rotated text. Every control, gesture, transition, and
reading affordance is rethought for a top→bottom, R→L world.

## Motto

**The knowledge is the product.** The website is the canonical reference for vertical interface
design; the apps are the reference implementations. Vertical CJK typesetting is a first-class
writing mode almost no software treats as the primary axis — so we do.

## Voice

- **Reverent restraint.** Paper, ink, sliding panels. No decoration for its own sake, no
  confetti, no marketing gloss. Every element teaches or serves.
- **Precise, sourced, honest.** Rules cite their authorities (KLREQ / JLREQ / UAX #50). Document
  uncertainty; show the reasoning behind a decision.
- **Calm and physical.** Motion answers "what changed?" and "where did it go?"

## Audience

Product designers, UX designers, design engineers, frontend engineers, researchers — and AI
agents building vertical/RTL interfaces.

## The studio and its apps

**Vertically Works** is the umbrella studio; **`vertically.works`** is its public face (a
documentation platform + installable design system, not a marketing site).

Apps use the **"Vertically —"** naming pattern:

| Name | What | Bundle |
| --- | --- | --- |
| **Vertically Verse** | Vertical CJK **scripture** reader (KR/JP/CN) | `works.vertically.VerticallyVerse` |
| **VerticallyPoemLab** | Reading-led vertical **poetry** app (working name) | `works.vertically.VerticallyPoemLab` |

Shared foundation: the **VerticallyKit** Swift package (typography engine) on the app side, and
the **`registry/`** (`npx verticallyworks init`) on the web side — both implementing this spec.

## Icon language

App icons are set in the studio's own vertical type — a word rendered vertically on a warm
ground (e.g. Verse's 말씀·言葉·道). Opaque, no alpha; the vertical glyph *is* the mark.

# Principles

The design principles behind Vertically Works interfaces. They apply to the website and the
apps alike; each platform expresses them in its own stack.

## Design foundations

1. **Purposeful.** Motion and structure answer "what changed?" and "where did it go?" No
   decoration for its own sake. Every element teaches or serves.
2. **Interruptible.** A user can always scroll/tap through an in-flight animation; gestures track
   the finger 1:1 and can be grabbed and reversed mid-flight.
3. **Performant.** Animate `opacity` and `transform` only — never layout-driving values (width,
   column counts) in a hot path.
4. **Accessible.** Honor reduced motion, reduced transparency, and increased contrast. Reduced
   motion ⇒ cross-fades and near-instant state, **never zero feedback** (keep opacity/color).
5. **Consistent.** Timing/easing/spacing come from tokens, never magic numbers.

## Vertical / RTL interaction model (the studio's signature)

The novel layer — "what does X feel like on the vertical axis":

- **RTL-native chrome.** Controls are themselves vertical text and lay out right→left. The
  language/translation toggle is a vertical capsule whose active highlight *slides* between
  한 / あ / 中 (a `matchedGeometryEffect` / shared-layout morph, not a jump).
- **Spatial consistency.** What appears from one edge dismisses to the same edge. Drawers slide
  in and out on the R→L axis; a panel feels *spawned from* the control that opened it.
- **Horizontal pull-to-paginate.** The classic vertical pull-to-refresh, rotated: overscroll
  past the last (leftmost) column to load the next unit, past the first (rightmost) for the
  previous — a ring fills as you pull, arms at 100%, fires on release, with climbing haptics.
- **Scroll-direction immersion.** Reading forward collapses the chrome to reclaim surface;
  scrolling back, tapping the indicator, or selecting restores it.
- **The dissolve as transition.** Where used (VerticallyPoemLab), poems **materialize** and
  **dissipate** as you move between them — the effect *is* the spatial transition, not decoration.
  On paper, dark ink dispersing reads as sumi-e.
- **Loading respects the grid.** Skeletons mirror real column metrics so text lands where the
  ghosts were.

## Materials & depth

Translucent chrome floats over content (never opaque bars consuming a fixed strip); heavier/
darker materials separate structural regions, lighter ones draw attention to controls. Dim to
focus (modal + scrim); offset without a scrim for a parallel, non-blocking panel. Never stack a
light translucent surface on another. Scroll-edge fades, not hard 1px dividers.

## Typography

Vertical mincho/serif for reading; **size-specific** tracking and leading (tight/negative on
large display type, looser on body) — in vertical setting, "leading" is the inter-glyph and
inter-column spacing. Respect Dynamic Type; default to the platform's system CJK font unless a
bundled face is required. Full rules: [`registry/vertical-typography.md`](../registry/vertical-typography.md).

## Motion

Reach for **springs** (interruptible, velocity-aware) for anything a user can touch; critically
damped by default, a little bounce reserved for momentum-carrying gestures (a flick, a drag
release). Keep UI motion under ~300ms. Enter/exit along the same path; mirror the easing on
reversible transitions.

## Tokens

Canonical values live in **`registry/tokens.css`** (web) and are mirrored **1:1 in Swift** by
`VerticallyKit`'s **`Tokens.swift`** (`VWSpace`, `VWRadius`, `VWMotion`, `VWPalette` for
light / dark / **sepia**). That's the studio token SOT on each side.

| Group | Value (both sides) |
| --- | --- |
| **Spacing** | 4·8·12·16·20·24·32·40·48·64·80·96·128 (`--space-1…32` / `VWSpace.s1…s32`) |
| **Radius** | 4·6·8·12·9999 (`--radius-sm…full` / `VWRadius`) |
| **Motion** | 80·150·200·300·400 ms + easings (`--duration-*`/`--easing-*` / `VWMotion`) |
| **Color** | semantic light / dark / **sepia** (`--color-*` / `VWPalette.light/dark/sepia`) |

Adoption:
- **VerticallyPoemLab** — adopts `VerticallyKit` tokens: the studio **sepia** palette + `VWMotion`.
  One deliberate override: a near-black **poem ink** (`#241d14`) so the Metal dissolve reads as
  sumi-e (the sepia fg `#4b3b2b` is too light to disperse).
- **Vertically Verse** — still on its own `AppTheme` scale (spacing 2·4·8·12·16·24·36); the
  remaining drift. It adopts `VerticallyKit` tokens **after its App Store review** (changing live
  token values pre-review would alter the app and force a re-submission).

A JSON→Swift/CSS **codegen** (one file generating both) is deferred until manual sync hurts.

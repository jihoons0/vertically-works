# Vertically Works — Studio Spec (source of truth)

The canonical, **implementation-neutral** reference for the studio: the motto, the design
principles, the vertical-typography rules, the design tokens, and component semantics. Every
surface — this **website**, the **Swift apps** (Vertically Verse, VerticallyPoemLab), and the
shared **VerticallyKit** package — implements *these rules* in its own stack.

> **Why a spec, not shared code?** Swift can't feed a TS/React site and vice-versa. So we
> single-source the **rules**, not the **implementation**. Each platform builds to the spec.

## The two source-of-truth layers

| Layer | Home | Scope |
| --- | --- | --- |
| **Knowledge SOT** (rules, prose, semantics) | this `spec/` + `registry/` | cross-platform — website **and** apps |
| **Code SOT** (executable) | `registry/` (TS/CSS) · `VerticallyKit` (Swift) | per-ecosystem implementations of the spec |

## The map — where each thing actually lives

| What | Canonical source |
| --- | --- |
| **Motto / thesis / naming** | [`spec/BRAND.md`](./BRAND.md) |
| **Design principles + motion ethos** | [`spec/PRINCIPLES.md`](./PRINCIPLES.md) |
| **Vertical typography + 금칙/kinsoku rules** | [`registry/vertical-typography.md`](../registry/vertical-typography.md) — implementation-neutral |
| **Design tokens** (color light/dark/sepia, spacing, radius, motion) | [`registry/tokens.css`](../registry/tokens.css) — the values; installable via `npx verticallyworks init` |
| **Component semantics** (button, toggle, sheet, tabs, text-field, tooltip, list-cell) | [`registry/registry.json`](../registry/registry.json) titles/descriptions + [`registry/components/`](../registry/components) (TS reference impl) |
| **Swift reference implementation** | `../../VerticallyKit` (engine) + each app's `AppTheme`/`Motion`/`Theme` (tokens) |
| **New-project kickoff prompt** | [`docs/02_PROJECT_KICKOFF.md`](../docs/02_PROJECT_KICKOFF.md) — start a web project that inherits all of the above |

## Implementations of the spec

- **Web** — `registry/` (CSS tokens + TS components), consumed by the site and installable by others.
- **Swift apps** — `VerticallyKit` (the typography engine: `GlyphOrientation`, `composeColumns`)
  + per-app SwiftUI components and token files (`AppTheme.swift`, `Motion.swift`, PoemLab `Theme.swift`).

## Keeping it in sync

- The **rules** (typography, principles, brand) are edited here / in `registry/`; implementations
  follow. When a rule changes, update the canonical doc, then each implementation.
- **Tokens** are documented canonically in `registry/tokens.css`. The Swift token files currently
  **drift** from it (see [PRINCIPLES.md § Tokens](./PRINCIPLES.md#tokens)); aligning them — or a
  future JSON→Swift/CSS codegen — is deferred until the drift causes real bugs.
- **Typography** has one canonical file (`registry/vertical-typography.md`); the copies in
  `VerticallyKit/docs/` and `vertically verse/docs/` are pointers to it.

## Not yet (deliberately deferred)

- No token **codegen** pipeline (documented alignment only).
- No cross-platform component **code** sharing (semantics shared; each platform implements).
- **Future:** publish this `spec/` as pages on vertically.works, so the public "canonical
  reference" is generated from the SOT.

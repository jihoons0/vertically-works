# Good first issues (draft · 12)

Open these on GitHub before launch and label each `good first issue` (+ the topic label). They give first-time contributors an obvious on-ramp — the playbook wants 10–12 live at launch. Two buckets: **port a documented component into the installable registry**, and **translate a component's docs**.

Context for contributors: 20-ish components are *documented* at [vertically.works/components](https://vertically.works/components), but only the core set currently installs from the registry. "Porting" = taking a documented component's reference implementation into `registry/components/` + `registry/registry.json` so `npx verticallyworks add <name>` works. See `CONTRIBUTING.md` and `CLAUDE.md`.

---

## Bucket A · Port a documented component into the registry

Each of these is documented and demoed on the site but not yet installable. Same shape of work every time, so they're ideal repeat first issues.

1. **Add `icon-button` to the registry** — square, icon-only, accessible-label-required variant of the button. Labels: `good first issue` `registry`
2. **Add `search` to the registry** — search field with the horizontal-input / vertical-label treatment. Labels: `good first issue` `registry`
3. **Add `slider` to the registry** — a slider whose travel follows the reading axis. Labels: `good first issue` `registry`
4. **Add `popover-menu` to the registry** — menu that opens along the reading direction with correct arrow-key semantics. Labels: `good first issue` `registry` `a11y`
5. **Add `chapter-navigation` to the registry** — the column-axis chapter nav used in Verse. Labels: `good first issue` `registry`
6. **Add `hyperlink-treatment` to the registry** — inline-link styling that survives vertical flow and selection. Labels: `good first issue` `registry`
7. **Add `marker` to the registry** — the highlight/selection marker primitive. Labels: `good first issue` `registry`
8. **Add `toast` to the registry** — transient notification with reading-axis-aware entry/exit. Labels: `good first issue` `registry` `motion`

**Per-issue acceptance criteria (paste into each):**
- Reference implementation moved into `registry/components/`, tokens-only, true `writing-mode: vertical-rl`
- Added to `registry/registry.json` with `siteSlug`; `npm run registry:build` emits `public/r/<name>.json`
- `npx verticallyworks add <name>` installs it clean; keyboard + reduced-motion behavior intact

## Bucket B · Documentation translations

9. **Translate the `toggle` component page to Japanese (日本語)** — prose only; keep code, prop names, and links. Labels: `good first issue` `docs` `i18n` `ja`
10. **Translate the `sheet` component page to Korean (한국어)**. Labels: `good first issue` `docs` `i18n` `ko`
11. **Translate the `text-field` component page to Chinese (中文)** — especially the IME/tate-chu-yoko notes. Labels: `good first issue` `docs` `i18n` `zh`
12. **Translate the Quick Start + install flow (README) to any of JP / KR / CN** — pairs with `README.ja/ko/zh-CN.md`. Labels: `good first issue` `docs` `i18n`

---

_When you close one, thank the contributor by name in the changelog — early contributors are the flywheel, not the transaction._

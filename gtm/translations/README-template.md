<!--
  TRANSLATION TEMPLATE · for the JP / KR / CN launch writers
  Produce README.ja.md · README.ko.md · README.zh-CN.md from this.

  Rules:
  • ADAPT, don't literally translate. Lead with the local framing:
      JP → 縦書き as foundation, not decoration
      CN → 竖排/直排 as foundation
      KR → 세로쓰기 as foundation
  • KEEP verbatim: the name "Vertically Works", all code blocks, npx/shadcn
    commands, badges, URLs, token names (--color-*), component slugs, file paths.
  • TRANSLATE: all prose — tagline, one-liner, "Why this exists", the component
    "what it is" column, token bullet descriptions, app descriptions,
    contributing prose, About.
  • Source of truth for English prose: ../repo-readme.draft.md
  • Add a language switcher line under the title linking the sibling READMEs.
-->

<p align="center">
  <img src="[HERO GIF · docs/media/toggle.gif]" alt="[TRANSLATE alt: a vertical toggle whose thumb travels the reading axis · up is on]" width="720" />
</p>

# Vertically Works

<!-- Language switcher — KEEP, adjust which one is bold per file -->
**English** · [日本語](./README.ja.md) · [한국어](./README.ko.md) · [中文](./README.zh-CN.md)

> **[TRANSLATE tagline]** — English: "Every UI component you know assumes horizontal text. This is what happens when it doesn't."

**[TRANSLATE one-liner]** — English: Open-source React components for vertical writing interfaces · Korean (한국어), Japanese (日本語), Chinese (中文) · where reading flows top to bottom, right to left.

<!-- KEEP badges verbatim -->
[![npm](https://img.shields.io/npm/v/verticallyworks)](https://www.npmjs.com/package/verticallyworks)
[![license](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![site](https://img.shields.io/badge/docs-vertically.works-black)](https://vertically.works)

**[TRANSLATE]** True `writing-mode: vertical-rl` · never a rotation. A shadcn-style registry: components are source files you copy and own. Zero runtime dependencies. Keyboard, screen reader, and reduced-motion support built in.

## Quick start · [TRANSLATE heading]

<!-- KEEP the whole code block verbatim; TRANSLATE only the # comments -->
```bash
npx verticallyworks init
npx verticallyworks add vertical-button toggle
```

## [TRANSLATE] Works with the shadcn CLI

```bash
npx shadcn@latest add https://vertically.works/r/vertical-button.json
```

## [TRANSLATE heading: Why this exists]

**[TRANSLATE the two paragraphs from repo-readme.draft.md "Why this exists" — 2019 / seven years, the essay link, eight open questions. Do NOT mention Yanlin.]**

## [TRANSLATE: Components]

<!-- KEEP the table structure, names, and links. TRANSLATE only the middle column. -->
| Name | [TRANSLATE: What it is] | Docs |
| --- | --- | --- |
| `vertical-button` | … | [button](https://vertically.works/components/button) |
| `toggle` | … | [toggle](https://vertically.works/components/toggle) |
| … | … | … |

## [TRANSLATE: Design tokens]

<!-- KEEP token names in code; TRANSLATE the descriptions -->
- **[TRANSLATE] Semantic colors** · `--color-bg/-subtle/-muted`, … themes via `data-theme`
- **[TRANSLATE] Spacing / Radius / Motion / Utilities** · …

## [TRANSLATE: The applications]

<!-- KEEP links + TestFlight URL -->
- **[Vertically Verse](https://vertically.works/apps/vertically-verse)** · [TRANSLATE desc] · [TestFlight](https://testflight.apple.com/join/DY7MKU7m)
- **[Vertically To-do](https://vertically.works/apps/vertically-do)** · [TRANSLATE desc]
- **[Vertically Listen](https://vertically.works/apps/vertically-listen)** · [TRANSLATE desc]
- **[Vertically News](https://vertically.works/apps/vertically-news)** · [TRANSLATE desc]

## [TRANSLATE: Open questions · contributing]

**[TRANSLATE]** — keep the [Discussions](https://github.com/jihoons0/vertically-works/discussions) link and "strong answers get merged into the spec." Disagreement is a contribution.

## [TRANSLATE: About]

**[TRANSLATE]** Built by **[Jihoon Suh](https://jihoonsuh.com)** · [@jihoons0](https://x.com/jihoons0). Began in 2019, sparked by Yong Jae Lee's vertical-native Korean typeface Baram.

## License

[MIT](./LICENSE) © Jihoon Suh

# RFC Discussion drafts · the 8 open challenges

> **Status: all 8 are created and live** in the **Ideas** category (posted via the API on Jul 16) → https://github.com/jihoons0/vertically-works/discussions
> Remaining manual step: **pin up to 4** via the web UI (GitHub caps pins at 4, and pinning isn't exposed in the API). Suggested pins: **#8 AI chat, #2 mixed-script, #1 motion, #6 keyboard/a11y.**

The originals below (for reference / re-posting). Each closes with the same call so the pattern is legible: **propose your answer as a PR — strong answers get merged into the spec.**

Every post links its write-up on the site: `https://vertically.works/challenges#<id>`
Repo Discussions home: `https://github.com/jihoons0/vertically-works/discussions`

---

## RFC 1 · Should a sheet animate from screen geometry or reading direction?
**Labels:** `RFC` `motion`

In a horizontal interface a bottom sheet slides up: the direction matches gravity and the nearest screen edge, and dismissal downward feels natural. In a vertical, right-to-left interface those two forces split apart — dismissing toward the bottom-right runs *with* gravity but *against* the reading direction. Which axis should win?

**Where it shows up here:** `sheet`, `dialog`, `toast`. Today the demos favor the reading axis, but this is not settled.

**Open questions:**
- Does the answer differ for a transient toast vs. a modal sheet the user dismisses deliberately?
- Should the enter and exit directions ever differ (enter with reading flow, exit with gravity)?
- What does the gesture feel like on a touchscreen when the swipe-to-dismiss vector fights the scroll axis?

Write-up: https://vertically.works/challenges#motion-direction
**Propose your answer as a PR. Strong answers get merged into the spec.**

---

## RFC 2 · How should mixed CJK and Latin content behave in the same column?
**Labels:** `RFC` `typography`

A single reference like `「창 1:1」` contains hangul, an ASCII colon, Latin digits, and CJK brackets — each with different orientation rules. Unicode (UAX #50) defines orientation per character class, but browser and OS implementations vary, and tate-chu-yoko (縦中横) grouping of short digit runs is inconsistent.

**Where it shows up here:** `verse`, `text-field`, and **Vertically News** under live-headline load.

**Open questions:**
- Which digit/acronym runs should auto-compose as tate-chu-yoko, and where does that break down?
- How do we keep punctuation upright vs. rotated consistently across engines?
- Is there a token-level way to declare per-class orientation so component authors don't re-solve it each time?

Write-up: https://vertically.works/challenges#mixed-language
**Propose your answer as a PR. Strong answers get merged into the spec.**

---

## RFC 3 · Where does the navigation rail belong in a vertical-first interface?
**Labels:** `RFC` `navigation`

Horizontal apps place navigation at the bottom (thumb reach on mobile) or the left (desktop), keyed to the primary reading axis. In a vertical, RTL interface the primary axis is down-the-column and columns flow right-to-left — so the "natural" home for a rail is genuinely unclear.

**Where it shows up here:** `tabs`, `chapter-navigation`, and the chrome of **Vertically Verse**.

**Open questions:**
- Does the rail belong on the right (the reading origin) or the left (the reading destination)?
- Bottom-bar thumb ergonomics vs. reading-axis consistency — which do users forgive?
- Should the rail itself be set vertically, and if so, top-to-bottom or bottom-to-top?

Write-up: https://vertically.works/challenges#navigation-direction
**Propose your answer as a PR. Strong answers get merged into the spec.**

---

## RFC 4 · How does text selection work when reading flows top-to-bottom, right-to-left?
**Labels:** `RFC` `interaction`

Click-drag selection assumes a left-to-right baseline. In a vertical, RTL layout the selection rectangle has to account for column ordering, column breaks, and tate-chu-yoko groups that behave as a single unit — and native selection often gets this subtly wrong.

**Where it shows up here:** `marker`, `hyperlink-treatment`, and highlighting in **Vertically Verse**.

**Open questions:**
- What is the correct visual for a selection that spans a column break in RTL order?
- How should a tate-chu-yoko group select — atomically, or per character?
- Where can we lean on the platform, and where must we override it?

Write-up: https://vertically.works/challenges#selection
**Propose your answer as a PR. Strong answers get merged into the spec.**

---

## RFC 5 · Where should the IME candidate window appear when input is vertical?
**Labels:** `RFC` `ime`

CJK Input Method Editors render the candidate window horizontally by default. In a vertical context it must not cover the composition point — but platform IME APIs rarely expose enough control to place it well, which is part of why `text-field` keeps the *input* horizontal while the label is vertical.

**Where it shows up here:** `search`, `text-field`.

**Open questions:**
- Is a deliberately horizontal input the right trade, or can a truly vertical composition surface work today?
- What can be influenced through `writing-mode` + caret positioning vs. what is locked by the OS IME?
- How should the candidate window behave differently across macOS/iOS/Windows/Android?

Write-up: https://vertically.works/challenges#ime-vertical
**Propose your answer as a PR. Strong answers get merged into the spec.**

---

## RFC 6 · What should the arrow keys mean in a vertical, RTL interface?
**Labels:** `RFC` `accessibility`

Horizontally, arrow keys move left/right within a line and up/down between lines. Vertically, "next character" is downward and "next line" is leftward — so the keyboard model has to be remapped, and getting it wrong is instantly disorienting.

**Where it shows up here:** `tabs`, `slider`, `popover-menu` — every focusable, arrow-navigable component.

**Open questions:**
- Should ↓ always mean "next in reading order," or should physical arrows stay physical for muscle memory?
- How do Home/End, PageUp/PageDown translate?
- What does a screen-reader user expect the arrow semantics to be, and does that differ from a sighted keyboard user?

Write-up: https://vertically.works/challenges#keyboard-navigation
**Propose your answer as a PR. Strong answers get merged into the spec.**

---

## RFC 7 · How does drag-and-drop reordering work when list items are columns?
**Labels:** `RFC` `interaction`

List reordering assumes a vertical stack of horizontal rows. In a vertical reading interface a list is columns flowing RTL, so the reorder axis is horizontal — and a downward drag can mean something else entirely (in **Vertically To-do**, pulling a column down deletes it).

**Where it shows up here:** `vertical-list-cell`, and the gesture model of **Vertically To-do**.

**Open questions:**
- Horizontal drag = reorder, vertical drag = remove: is orthogonal-axis disambiguation the right general rule?
- What are the correct drop-indicator and insertion-point visuals in an RTL column list?
- How should keyboard-driven reordering map onto the same model?

Write-up: https://vertically.works/challenges#drag-reorder
**Propose your answer as a PR. Strong answers get merged into the spec.**

---

## RFC 8 · What should an AI chat interface be in vertical writing?
**Labels:** `RFC` `ai`

AI chat UIs are built around horizontal bubbles alternating left and right. For someone reading vertically, that model imports a foreign interaction pattern wholesale. What would a *native* vertical AI chat interface actually look like — and this is the one I most want the community to fight about.

**Where it shows up here:** `message`, `text-field` — the primitives exist; the composition does not yet.

**Open questions:**
- Where do "me" and "the assistant" live when columns flow right-to-left — and does alternating sides even survive?
- How does a streaming response read as it fills a column top-to-bottom?
- What happens to threading, citations, and code blocks (inherently horizontal) inside a vertical stream?

Write-up: https://vertically.works/challenges#ai-chat
**Propose your answer as a PR. Strong answers get merged into the spec.**

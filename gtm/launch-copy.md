# Launch-day copy · paste-ready

Everything you post on Tue Jul 21. Voice matches the site: spare, declarative, interpuncts. Link everywhere: **https://vertically.works** · repo: **github.com/jihoons0/vertically-works**

---

## 1 · Show HN (7:00–8:00am ET, from your own account)

**Title** (≤ 80 chars, no "I made"):
> Show HN: Vertically Works – UI components for vertical CJK writing (top-to-bottom, RTL)

**URL:** https://vertically.works

**First comment — post it immediately after submitting:**
> I'm Jihoon. The web's interaction layer assumes text runs left to right, and for Korean, Japanese, and Chinese that assumption breaks everything downstream of it — which way a toggle flips, where a tooltip opens, what the arrow keys mean, where the IME candidate window belongs.
>
> This started in 2019 as an essay asking whether vertical type could work in a real UI. The honest answer then was that nobody knew — the components you'd need to find out didn't exist. So over the years I built them: React components on true `writing-mode: vertical-rl` (never a rotation — rotation breaks selection, screen readers, and IME), a shadcn-style copy-and-own registry, and four apps that put them under real load, including a live vertical newspaper pulling KR/JP/CN headlines.
>
> It's a living study, not a finished spec. The eight hardest open problems — motion direction, mixed-script typography, IME placement, what a *vertical* AI chat interface even is — are open as GitHub Discussions, documented as carefully as the answers. Disagreement is a contribution. Happy to go deep on any of it.

**Thread-tending ammo** (from the site FAQ — have these ready):
- *"Most CJK is horizontal anyway"* → Yes, and that's the point: the axis is chosen by the toolchain now, not the designer. Vertical never died — novels, manga, scripture, newspapers, signage. Horizontal is a default, not a conclusion.
- *"Why not rotate?"* → Rotation transforms pixels, not behavior. Rotated text stops being text: selection breaks, SR order is wrong, IME falls apart. Everything here is real writing-mode.
- *"Does a11y actually work?"* → Arrow keys remap (next char is down, next line is left), focus traverses columns R→L, durations collapse to 0 under reduced-motion. What's unsolved is listed openly in Challenges.

**Rules:** live in the thread 6+ hours, answer everything, concede good points. **Never solicit upvotes, anywhere.**

---

## 2 · X thread (same morning). Pin it.

**1/** (attach `components.gif`)
> Every UI component you know assumes horizontal text.
>
> So I rebuilt the interface layer for vertical writing — Korean, Japanese, Chinese, where reading flows top to bottom, right to left.
>
> Open source, real `writing-mode: vertical-rl`, never a rotation. 🧵
> vertically.works

**2/** (attach `toggle` clip)
> A toggle's thumb should travel the reading axis. Up is on. It matches the column instead of cutting across it — a rotated horizontal switch never could.

**3/** (attach `sheet` clip)
> Motion follows reading direction, not screen gravity. A sheet dismisses along the column. Every duration collapses to zero under prefers-reduced-motion.

**4/** (attach `tooltip` clip)
> A tooltip opens to the left of its trigger — forward, along the reading direction. Small thing. Completely wrong if you rotate.

**5/** (attach `ime` / text-field clip)
> The label is vertical; the input stays deliberately horizontal. CJK IME composition needs a horizontal baseline — so the text field respects it instead of fighting it.

**6/** (attach `tabs` clip)
> Arrow keys remap: next character is down, next line is left, focus traverses columns right-to-left. Keyboard and screen-reader behavior is the foundation, not a follow-up.

**7/**
> The hardest problems are still open — where the IME window belongs, how mixed script behaves in one column, and what a *vertical* AI chat interface should even be. All documented as GitHub Discussions. Strong answers get merged into the spec.

**8/**
> Copy-and-own, zero runtime deps, shadcn-compatible:
>
> `npx verticallyworks add vertical-button toggle`
> `npx shadcn@latest add https://vertically.works/r/vertical-button.json`

**9/**
> A living study by one person, seven years in. If it opened a question for you, a ⭐ helps others find it.
> github.com/jihoons0/vertically-works

**Cross-post** tweet 1 natively to **Bluesky** and **Threads** (CSS/design folks are active on both).

---

## 3 · LinkedIn (same day) · leadership frame, not dev frame

> Korean, Japanese, and Chinese were written top to bottom for a thousand years before the web. Then every digital tool we built made horizontal the default — not by decision, but by inheritance.
>
> I spent seven years chasing one question: can vertical type actually work in an interface, not as a typographic effect but as behavior? The thing I kept relearning is that you cannot study a system with the wrong parts. You cannot evaluate vertical interaction using horizontal components. So the real work wasn't the demo — it was building the parts first: components on true writing-mode, then apps to put them under load, then documenting what still doesn't have an answer as carefully as what does.
>
> That's a design-systems lesson more than a typography one: the discipline is building the primitives and the measurement before you build the conclusion. Vertically Works is open source today. The open questions are the interesting part.
>
> vertically.works

---

## 4 · Reddit (one honest post each, spaced a day apart)

**r/reactjs** — title: *"I built copy-and-own React components for vertical writing (CJK) on real writing-mode: vertical-rl"*
> Sharing a project I've worked on for a while. It's a shadcn-style registry of components for vertical writing interfaces — Korean/Japanese/Chinese — built on true `writing-mode: vertical-rl` rather than rotating horizontal UI. Copy-and-own, zero runtime deps, and the registry works with the shadcn CLI. Accessibility (remapped arrow keys, RTL focus order, reduced-motion) was the hard part and it's documented per component. Not selling anything — it's MIT and I'd genuinely like feedback on the open problems. [link]

**r/web_design** — lead with the visual (embed `components.gif`), one paragraph, same honest maker tone.

---

## Do-not (keep these in view all day)
- Never solicit HN upvotes, from anyone, anywhere.
- Don't launch on a day Apple owns — slip to Wed.
- Reply to every substantive comment for 48 hours. Responsiveness is ranking fuel.

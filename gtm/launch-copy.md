# Launch-day copy · paste-ready

Everything you post on Tue Jul 21. Voice matches the site: spare, declarative, interpuncts. Link everywhere: **https://vertically.works** · repo: **github.com/jihoons0/vertically-works**

**Assets (all in `docs/media/`), generated from the site, no editor needed:**
`components.gif` (thread opener) · `toggle.gif` · `sheet.gif` · `tooltip.gif` · `tabs.gif` · `text-field.png` (the IME shot, static) · spares: `dialog.gif`, `accordion.gif`. All GIFs are <1MB.

---

## 1 · Show HN (7:00–8:00am ET, from your own account)

**Title** (≤ 80 chars, no "I made"):
> Show HN: Vertically Works – UI components for vertical CJK writing (top-to-bottom, RTL)

**URL:** https://vertically.works

**First comment — post it immediately after submitting:**
> I'm Jihoon. Every UI toolkit assumes text runs left to right. For Korean, Japanese, and Chinese that assumption is wrong, and it shows up everywhere downstream: which way a toggle flips, where a tooltip opens, what the arrow keys do, where the IME candidate window sits.
>
> I started in 2019 with an essay asking whether vertical type could work in a real UI. Nobody knew. The components you'd need to find out didn't exist, so I built them: React components on true `writing-mode: vertical-rl` (rotation breaks selection, screen readers, and IME, so I never rotate it), a shadcn-style copy-and-own registry, and four apps that put them under load, including a live vertical newspaper pulling KR/JP/CN headlines.
>
> I left it unfinished on purpose. The eight hardest problems are open as GitHub Discussions: motion direction, mixed-script typography, IME placement, and what a *vertical* AI chat interface should even be. I documented them as carefully as the answers. Tell me where I'm wrong.

**Thread-tending ammo** (from the site FAQ — have these ready):
- *"Most CJK is horizontal anyway"* → Yes, and that's the point: the toolchain picks the axis now, not the designer. Vertical never died: novels, manga, scripture, newspapers, signage. Horizontal is a default, not a conclusion.
- *"Why not rotate?"* → Rotation transforms pixels, not behavior. Rotated text stops being text: selection breaks, SR order is wrong, IME falls apart. Everything here is real writing-mode.
- *"Does a11y actually work?"* → Arrow keys remap (next char is down, next line is left), focus traverses columns R→L, durations collapse to 0 under reduced-motion. What's unsolved is listed openly in Challenges.

**Rules:** live in the thread 6+ hours, answer everything, concede good points. **Never solicit upvotes, anywhere.**

---

## 2 · X thread (same morning). Pin it.

**1/** (attach `components.gif`)
> Every UI component you know assumes horizontal text.
>
> So I rebuilt the interface layer for vertical writing. Korean, Japanese, Chinese, where reading flows top to bottom, right to left.
>
> Open source, real `writing-mode: vertical-rl`, never a rotation. 🧵
> vertically.works

**2/** (attach `toggle` clip)
> A toggle's thumb travels the reading axis. Up is on. It moves with the column the way a rotated switch can't.

**3/** (attach `sheet` clip)
> A sheet dismisses along the column, following the reading direction rather than screen gravity. Every duration collapses to zero under prefers-reduced-motion.

**4/** (attach `tooltip` clip)
> A tooltip opens to the left of its trigger, forward along the reading direction. Rotate it and it points backward.

**5/** (attach `text-field.png` — static)
> The label runs vertical. The input stays horizontal, because CJK IME composition needs a horizontal baseline. Fight that and the typing breaks.

**6/** (attach `tabs` clip)
> Arrow keys remap: next character is down, next line is left, focus moves through columns right to left. I built the keyboard and screen-reader behavior first.

**7/**
> The hardest problems are still open: where the IME window belongs, how mixed script behaves in one column, and what a *vertical* AI chat interface should even be. Each is a GitHub Discussion. Strong answers get merged into the spec.

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

> Korean, Japanese, and Chinese were written top to bottom for a thousand years before the web. Then every digital tool we built defaulted to horizontal, an inheritance nobody chose.
>
> I spent seven years on one question: can vertical type work in an interface at the level of behavior, not decoration? I kept relearning the same thing. You cannot study a system with the wrong parts. You cannot evaluate vertical interaction with horizontal components. So I built the parts first. Components on true writing-mode. Then apps to put them under load. Then the open questions, documented as carefully as the answers.
>
> That is a design-systems lesson more than a typography one: build the primitives and the measurement before the conclusion. Vertically Works is open source today, and the open questions are the interesting part.
>
> vertically.works

---

## 4 · Reddit (one honest post each, spaced a day apart)

**r/reactjs** — title: *"I built copy-and-own React components for vertical writing (CJK) on real writing-mode: vertical-rl"*
> Sharing a project I've worked on for a while. It's a shadcn-style registry of components for vertical writing interfaces (Korean, Japanese, Chinese), built on true `writing-mode: vertical-rl` instead of rotating horizontal UI. Copy-and-own, zero runtime deps, and it works with the shadcn CLI. Accessibility was the hard part (remapped arrow keys, RTL focus order, reduced-motion) and it's documented per component. It's MIT. I'd like feedback on the open problems. [link]

**r/web_design** — lead with the visual (embed `components.gif`), one paragraph, same honest maker tone.

---

## Do-not (keep these in view all day)
- Never solicit HN upvotes, from anyone, anywhere.
- Don't launch on a day Apple owns; slip to Wed.
- Reply to every substantive comment for 48 hours. Responsiveness is ranking fuel.

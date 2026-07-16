# Launch DMs · influencer seeding

> **Priority:** lead with the **CJK-native seeds in `cjk-seeds.md`** — a nod from a design engineer who lives 縦書き / 竖排 / 세로쓰기 outweighs this whole list. The names below are the **bridge tier** into the Western/LTR dev audience; within it, **Argyle, Jen Simmons, and Sara Soueidan** are the closest fit (writing-mode / i18n / a11y), and the rest are secondary craft seeds.

Send **Mon Jul 20** (day before launch). Rules from the playbook: **3 sentences, one clip, one link, zero ask for shares.** Warm up first — genuinely engage with each person's posts across the week so the DM isn't cold. Never ask for a retweet; let the work do it.

Link in every message: **https://vertically.works**
Sign-off handle: **[@jihoons0](https://x.com/jihoons0)**

Clip legend (from the 8 launch clips): `toggle` · `dialog` · `accordion` · `sheet` · `tabs` · `ime` (IME text field) · `verse` (Verse on iOS) · `todo` (To-do on web)

---

## 0 · shadcn — public tag, NOT a DM

Tag publicly with the working CLI command; do not DM. Attach `toggle`.

> Built a registry for vertical writing interfaces — Korean, Japanese, Chinese — on the shadcn model: copy-and-own, zero runtime deps. It installs straight through your CLI:
>
> `npx shadcn@latest add https://vertically.works/r/vertical-button.json`
>
> Real `writing-mode: vertical-rl`, never a rotation. Thanks for the registry pattern, @shadcn 🙏 → vertically.works

---

## 1 · Rauno Freiberg — @raunofreiberg (X DM) · clip: `toggle`

> Rauno — your writing on interface craft is a big part of why I obsessed over the small stuff here. I rebuilt UI primitives for vertical CJK writing on true `writing-mode: vertical-rl` (never rotation), so a toggle's thumb travels the reading axis and a sheet actually knows which edge is "forward." Sharing because I think you'll appreciate what changes once the axis flips: vertically.works

## 2 · Emil Kowalski — @emilkowalski_ (X DM) · clip: `sheet`

> Emil — Sonner and Vaul shaped how I think about motion, so this is partly your fault. I redesigned motion for the vertical reading axis: dismissal follows the column instead of screen gravity, and every duration collapses to zero under reduced-motion. Curious what you make of the edge sheet here: vertically.works

## 3 · Paco Coursey — @pacocoursey (X DM) · clip: `tabs`

> Paco — cmdk is a masterclass in getting the tiny interactions right, and that was the bar I held myself to. These are components for vertical writing (Korean/Japanese/Chinese) on real writing-mode, where arrow keys, focus order, and the tab rail all remap to the axis. Thought it might be your kind of rabbit hole: vertically.works

## 4 · Adam Argyle — @argyleink (X DM) · clip: `ime` or `verse`

> Adam — you've evangelized logical properties and writing-mode for years, so I finally built a whole component system on them. It's true `writing-mode: vertical-rl` with logical props end to end — no physical directions, no rotation — so it flips cleanly across KR/JP/CN. Would love your eyes on it: vertically.works

## 5 · Una Kravets — @una (X DM) · clip: `sheet`

> Una — your work on modern CSS layout is all over how this is built. It's a design system for vertical writing interfaces on `writing-mode: vertical-rl`, tokens-only, with light/dark/sepia and reduced-motion baked in. Sharing in case the layout problems are as fun for you as they were for me: vertically.works

## 6 · Ahmad Shadeed — @shadeed9 (X DM) · clip: `ime`

> Ahmad — your deep CSS write-ups, especially on RTL and logical properties, were reference material for this. I built components for vertical CJK writing where mixed script — hangul, kana, Latin digits, tate-chu-yoko — all has to behave inside one column. The mixed-script handling might be a fun one to pick apart: vertically.works

## 7 · Sara Soueidan — email via her site · lead with a11y · clip: `tabs`

> Sara — I built a component system for vertical writing interfaces (Korean/Japanese/Chinese), and I treated accessibility as the foundation rather than a follow-up, which is exactly why I wanted you to see it. Arrow keys remap (next character is down, next line is left), focus traverses columns right-to-left, screen-reader order follows the visual columns, and everything respects reduced-motion. If you ever have a moment, I'd genuinely value your read on where it still falls short: vertically.works

---

### Warm-up checklist (this week, before Jul 20)
- [ ] Follow all targets and turn on notifications
- [ ] Leave one genuine, specific reply on a recent post from each
- [ ] Have the right clip exported and ready to attach per person (see legend)
- [ ] Sara + anyone email-only: find the contact form / address on their site

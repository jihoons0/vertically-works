# Vertically Works · GTM

Working folder for the go-to-market. Launch target: **Tue Jul 21, 2026** (slip to Wed if Apple books Tuesday). Today: Jul 16 — **5 days out**.

## The docs here

| File | What it is |
|---|---|
| `launch-playbook.md` | Strategy: objectives, positioning, calendar, phases 0–5, budget, do-not list. |
| `hire-briefs.md` | Two contractor briefs — motion editor + JP/zh-CN launch writers. |
| `cjk-seeds.md` | **Priority** seeding list — CJK-native design engineers who live vertical writing, by region, with reach channels + how to find more. |
| `dm-drafts.md` | Launch-day DMs — the Western/bridge tier (9 targets) + the shadcn public-tag tweet. Send Jul 20. |
| `discussions.md` | The 8 RFC Discussion posts (one per open challenge), paste-ready + pinnable. |
| `repo-readme.draft.md` | Paste-ready README for the repo root. **Not yet live** — placeholders filled except the hero GIF. |
| `README.md` | This index. Status, reconciliation, and how we build it together. |

---

## Do they make sense? Short answer: yes.

This is a real plan — grounded in the product, honest about mechanics (HN star-velocity → Trending → compounding), and correctly refuses the things that get you buried (no HN upvote soliciting, never launch on a day Apple owns). The CJK flywheel (Phase 2) is the genuinely differentiated move; HN is the crowded, higher-variance bet. Strengths and risks are in the playbook's own framing.

**But a few things don't line up yet — mostly because the site moved after these were written.**

### Reconciliation · GTM docs vs. the live site

| Item | GTM docs say | Site says now | Action |
|---|---|---|---|
| Essay year | "the 2020 essay", "six years later" (playbook §4/§5.1, README draft) | **2019**, "seven years" (shipped) | Update the docs to 2019 / seven. You confirmed it's 2019 work. |
| Yanlin Ma | Named in the HN story (playbook §5.1) and README draft About | **Omitted site-wide** (your call) | Decide: omit from README/HN story too, or keep only as a private origin note. Recommend omit for consistency. |
| Hero line | README hero = "Every UI component you know assumes horizontal text." | Site H1 = **"Interfaces for vertical writing"**; the hook is the subhead's first line | Fine to differ, but align voice — I'd lead the README with the same H1 and keep the hook as the sub-line. |
| Component count | "twenty components" | **21 built / ~9 installable** in the registry | Pick wording. Site currently says "20 components" + "a growing registry you install from" (honest). Keep that framing; round 20 is fine. |

### Already shipped — Phase 0 is largely done

The copy sprint and half the hygiene list are live on the site:

- ✅ Naming architecture (Apps / Vertically Apps / Verse·To-do·Listen·News / Vertically To-do)
- ✅ News shows **Live** everywhere (the homepage/apps-page conflict is resolved)
- ✅ 7 principles on both pages (the 6-vs-7 mismatch is fixed)
- ✅ "canonical reference" retired from every rendered surface
- ✅ Hero (launch mode) + subhead + stat row + byline w/ avatar; About page + FAQ; "Say hello" contact; footer copy + "The 2019 essay" link; one-liner meta/title/OG

### Repo hygiene — status

- ✅ `CONTRIBUTING.md` — written (root); points at Discussions + good-first-issues
- ✅ Fixed the **dead Verse source link** in root `README.md` → TestFlight
- ✅ `v0.1.0` release notes drafted → `release-v0.1.0.md` (you tag/publish on launch morning)
- ✅ Good-first-issues drafted → `good-first-issues.md` (12, real registry-gap + translations)
- ✅ Translation scaffolds → `translations/` (annotated template + ja/ko/zh-CN stubs)
- ✅ **Hero GIF** made from your recording → `docs/media/toggle.gif` (549KB, cropped to the toggle tile) + `docs/media/components.gif` (699KB, full 6-tile grid for social/X)
- ✅ **Root `README.md` swapped** with the reconciled draft (toggle GIF hero, TestFlight, @jihoons0, 2019/seven, Discussions link)
- ✅ **8 RFC Discussions created & live** under the Ideas category → /discussions. **Manual step left:** pin up to 4 in the web UI (API can't pin; GitHub caps at 4)
- [ ] Surface a TestFlight/App Store badge on the Verse **card + apps listing** (site change — say go)
- [ ] Reconcile the component count (site "20" vs 21 built)

### Resolved this session

- ✅ App Store link → **TestFlight** (`testflight.apple.com/join/DY7MKU7m`) — filled in README draft; the dead Verse source link is removed from the live root README
- ✅ X handle → **@jihoons0** — filled in README draft
- ✅ Verse source repo → not needed, removed
- ✅ Essay year → **2019 / seven years** and **Yanlin omitted** in the README draft (matches the site)

### Still blocked — need from you (or external)

- **Hero GIF** (motion-editor deliverable) — the only thing gating the README going live
- `hello@vertically.works` alias (external)
- GitHub repo settings: **enable Discussions**, topics, **About URL → vertically.works**, social preview image

---

## How we build this together

**I own (in-repo / code — say go and I'll batch it):**
- Reconcile + stage the root README (2019/seven, Yanlin decision, hero line, placeholders clearly marked)
- `CONTRIBUTING.md`; fix the dead Verse link; draft `v0.1.0` release notes
- Scaffold `README.ja/ko/zh-CN.md` for the writers to fill
- Draft the **8 RFC Discussion posts** and **10–12 good-first-issues** as paste-ready `gtm/` files
- Any site fixes (App Store badge once you give the URL; the "20 vs 21" number)
- Later: the **AI-chat-in-vertical-Japanese prototype** (Phase 5) — that's a build, and it doubles as your AI case study

**You own (human / external — nothing I can do for you):**
- Post the two **hire briefs today** (they were slotted for Jul 15 — already a day behind)
- All posting: Show HN, X thread, LinkedIn, Reddit, Bluesky/Threads
- The 9 influencer **DMs** and warm-up engagement
- App Store editorial pitch; newsletter submissions; one paid sponsorship
- GitHub repo settings (topics, About URL, social image, enable Discussions) — or hand me the `gh` go-ahead and I'll run them

## Critical path / timing reality

**Motion clips are the long pole.** They gate the README hero GIF, the X thread, and HN's visual proof — and the editor hire hasn't gone out yet. If finals can't land by **Jul 20**, use the plan's built-in Tue→Wed slip rather than launching without video. Copy and hygiene are mostly done; the launch's readiness is really a function of (1) posting the editor brief today and (2) the App Store / X-handle / Discussions placeholders getting filled.

## Suggested next step (this session)

Say the word and I'll knock out the in-repo Phase 0 batch now:
1. `CONTRIBUTING.md`
2. Fix the dead Verse source link
3. Reconcile + stage the root README (placeholders flagged, 2019/seven, Yanlin per your call)
4. Scaffold the three translation READMEs
5. Draft the 8 RFC Discussion posts + the good-first-issues list as `gtm/` files

Then you post the hires and fill the three blockers (App Store URL, X handle, Discussions on).

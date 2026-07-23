# Vertically Works · Launch Playbook
Owner: Jihoon Suh · Prepared: Jul 16, 2026
Companion files: `site-copy.md` (all rewritten copy), `README.md` (paste-ready), `hire-briefs.md` (editor + translators)

---

## 1 · Objective and targets

**Outcomes:** (a) personal brand as design engineer / design leader, (b) GitHub stars and contributions.

**Targets:**
- 2,000 stars in 30 days
- GitHub Trending (TypeScript) on launch day
- 5+ external contributors by September
- One recorded talk or podcast by October
- 5+ inbound DMs from design leaders / hiring-adjacent people

**Starting state:** repo at 0 stars, 0 forks, no releases. This is a cold launch, and the first impression is still intact. The whole plan turns on one coordinated 48-hour star-velocity window: velocity triggers Trending, and Trending compounds.

---

## 2 · Positioning · three hooks, three audiences

1. **Narrative (HN, LinkedIn, press):** The web was built left to right. Korean, Japanese, and Chinese were written top to bottom for a thousand years before it. Vertically Works rebuilds the interface layer.
2. **Dev (X, GitHub, newsletters):** shadcn-model ownership. Real `writing-mode: vertical-rl`, never rotation. Source you copy and own, zero runtime dependencies, and the registry works with the shadcn CLI. "shadcn for vertical writing" reads at a glance.
3. **Discussion (comments, contributions):** the 8 open challenges, especially "what should an AI chat interface be in vertical writing." People argue in the open questions, and comment volume drives ranking.

**Master one-liner (every surface):** Open-source React components for vertical writing interfaces · Korean, Japanese, Chinese · where reading flows top to bottom, right to left.

**Naming architecture (locked):** Formal: Vertically Verse / Vertically To-do / Vertically Listen / Vertically News. Shorthand on-site: Verse / To-do / Listen / News. Nav says Apps; apps page H1 says Vertically Apps. Full name at first mention and everywhere external; shorthand wherever family context is on screen.

---

## 3 · Calendar at a glance

| Date | Milestone |
|---|---|
| Wed Jul 15 | Post both hire briefs (10 min total) |
| Thu Jul 16 | Erebor onsite · no launch work |
| Fri Jul 17 | LinqAlpha deadline · send raw screen captures to editor |
| Sat–Sun Jul 18–19 | Copy sprint + repo hygiene (Phase 0 core) |
| Mon Jul 20 | Star seeding, 9 early-access DMs, stage all assets |
| Tue Jul 21 | LAUNCH · Show HN 7am ET + X thread + LinkedIn (slip to Wed if Apple books Tuesday) |
| Jul 22–31 | CJK flywheel (Phase 2) |
| Jul 27–Aug 14 | Newsletters + earned media (Phase 3) |
| Aug–Oct | Brand compounding (Phase 5) |

---

## 4 · Phase 0 · Reposition and hygiene (Jul 15–20)

### Copy (all drafted in site-copy.md)
- New hero (launch mode H1 + subhead)
- Byline block: "A living study by Jihoon Suh" + links · your name is currently invisible on the site
- About section: the 2019 essay → Baram typeface → Yanlin → seven years → working system
- FAQ pre-answering the three guaranteed HN attacks (most digital CJK is horizontal / why not rotate / does a11y work)
- Voice fix: we → I; retire "canonical reference" until the numbers back it
- One-liner system across title tag, meta, OG, GitHub About, npm, X bio
- README rewrite (paste-ready in README.md): hero GIF up top, story line, shadcn compat promoted, badges, author section, star CTA

### Repo hygiene
- Tag v0.1.0 release with notes (no releases reads as abandoned)
- Add topics: react, design-system, cjk, typography, shadcn, i18n, a11y
- Social preview image; About URL → vertically.works (currently vercel.app)
- Pin the 8 challenges as GitHub Discussions labeled RFC, each ending "propose your answer as a PR"
- Open 10–12 good-first-issues: JP/KR/CN doc translations + new components from the documented set
- Ten-line CONTRIBUTING.md pointing at Discussions
- Fix: Verse source link (dead username), News status conflict (Live on apps page, Coming soon on homepage), 6 vs 7 principles between pages, App Store badge visible at listing level

### Hires (briefs in hire-briefs.md)
- Motion editor: 8 clips × 3 formats, finals Jul 20, $600–1,000
- JP + zh-CN writers: launch article, README translation, posts, outlet tips, $250–400 each · KR you handle with KIDNY review

### Seeding (Mon Jul 20)
- 50–80 stars from KIDNY, Coinbase/Meta friends, communities. Stars only. NEVER solicit HN upvotes: vote-ring detection flags and buries the post.
- Send the 9 early-access DMs (see 5.3)

---

## 5 · Phase 1 · Launch day (Tue Jul 21)

### 5.1 Show HN
- Post 7:00–8:00am ET Tuesday from your own account
- Title: `Show HN: Vertically Works – UI components for vertical CJK writing (top-to-bottom, RTL)`
- Immediately add a first comment: the personal story (Baram typeface, the 2019 essay with Yanlin, seven years, why rotation fails, the IME problem). The About section in site-copy.md is 90% of this comment.
- Live in the thread 6+ hours. Answer everything, concede good points, link the Challenges page for open questions. The FAQ answers are your prepared ammunition.
- A front page run realistically delivers 1,000–3,000 stars.

### 5.2 X thread (same morning)
- Tweet 1: the toggle clip + one line: "Every UI component you know assumes horizontal text. I rebuilt the interface layer for vertical writing · Korean, Japanese, Chinese." + link
- Thread: 4 component clips with one insight each, 2 challenges as open questions, the npx command, the shadcn CLI command, close with the repo. Pin it.
- Cross-post the video natively to Bluesky and Threads (CSS/design communities are active on both; your Meta network lives on Threads).

### 5.3 Influencer seeding (DMs sent Mon Jul 20)
Nine targets: shadcn (skip DM, tag publicly with the working shadcn CLI command), Rauno Freiberg, Emil Kowalski, Paco Coursey, Adam Argyle, Una Kravets, Ahmad Shadeed (X DMs), Sara Soueidan (email via site, lead with a11y), Jen Simmons (Bluesky/Mastodon, verify handle; she evangelized writing-mode for years and is at Apple WebKit).
- Format: 3 sentences, one clip attached, one link, zero ask for shares. Warm up by engaging with their posts this week.

### 5.4 LinkedIn (same day)
Leadership frame, not dev frame: what building for a billion overlooked readers taught you about design systems. This is the version Apple and Erebor interviewers find when they Google you.

### 5.5 Also on launch day
- Submit to Vercel community showcase and tag them (Next.js on Vercel; they amplify registry-ecosystem projects)
- Reddit: one honest post each to r/reactjs and r/web_design, spaced a day apart, written as a maker sharing, not marketing

### Rules
- Never solicit HN upvotes, anywhere, from anyone
- If Apple books the presentation for Tuesday, launch Wednesday · never split attention
- Reply to every substantive comment for the first 48 hours; responsiveness is ranking fuel

---

## 6 · Phase 2 · CJK flywheel (Jul 22–31)

**Japan (highest independent viral potential · 縦書き is culturally loaded):**
- Zenn launch article (adapted by your JP writer, published under your account)
- Tip emails to Gigazine and Publickey (writer drafts to their norms)
- Target: Hatena Bookmark hot entry
- Publish README.ja.md

**Korea:**
- Submit to GeekNews (news.hada.io), post on Disquiet and Careerly
- 요즘IT article
- KIDNY community showcase · your own network, use it
- Publish README.ko.md (you or KIDNY review)

**China:**
- Juejin article + V2EX post (zh-CN writer)
- Publish README.zh-CN.md

**App Store editorial (free, high upside):**
- Pitch Vertically Verse for editorial feature in the JP/KR/CN storefronts via App Store Connect. Apple editorial loves culturally significant reading apps.

---

## 7 · Phase 3 · Earned media (Jul 27–Aug 14)

**Free submissions (do all):** React Status, JavaScript Weekly, Frontend Focus, This Week in React, Bytes, TLDR Web Dev, Codrops Collective, CSS-Tricks newsletter, awesome-shadcn-ui, awesome-react-components, awesome-design-systems.

**Guest essay (pitch one):** Smashing Magazine or CSS-Tricks: "What I learned shipping 20 components in writing-mode: vertical-rl." Deep CSS craft is their lane.

**One paid sponsorship** after the organic wave, to catch stragglers: Cooperpress (React Status / Frontend Focus, ~$1,500–2,000) or This Week in React.

---

## 8 · Phase 5 · Brand compounding (Aug–Oct)

- **The AI essay + prototype:** "What does an AI chat interface look like in vertical Japanese?" built on challenge 08. Doubles as the AI design case study your portfolio needs · delegation and trust framing welcome. Publish on your site, cross-post, thread it.
- **Podcast pitches:** Dive Club (best fit), Design Details, Syntax, ShopTalk. Pitch after launch numbers exist.
- **Talk CFPs:** FEConf Korea (fall), JSConf JP (Nov/Dec). Plus one NYC meetup (React NYC, Design Systems Coalition) for a fast recorded asset.
- **Monthly cadence:** one challenge spotlight post per month picking an open question and the best community answer. Keeps the repo alive between waves.

---

## 9 · Budget (~$5,500)

| Item | Amount | Note |
|---|---|---|
| Motion editor | $600–1,000 | 8 clips, finals Jul 20 |
| JP + zh-CN writers | $500–800 | Articles, READMEs, posts, tips |
| Newsletter sponsorship | $1,500–2,500 | One, after organic wave |
| Component/contribution bounties | $1,000–1,500 | Optional, only if contribution goal lags |
| X ads | $500 max | Boost launch video to shadcn/Vercel follower lookalikes · brand awareness, not star acquisition |

Honest note: ads are the weakest lever for stars. The budget's best ROI is content production (clips, translations) and earned reach.

---

## 10 · Do-not list

- Do not solicit HN upvotes, ever
- Do not launch on a day Apple owns
- Do not reference the "After the Interface" essay or any Agentic Coinbase material as assets
- Do not claim "canonical" until traction exists
- Do not rotate: the phrase "never a rotation" is the technical identity · keep it in every pitch

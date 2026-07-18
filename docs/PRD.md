# Vertically Works — PRD / Architecture Record

A living record of product structure, architecture decisions, and notable changes.
The high-level product/design vision lives in [`01_BLUEPRINT.md`](./01_BLUEPRINT.md); this
file tracks the concrete **information architecture, routing, and infra** as they stand,
plus a change log.

---

## URL & routing model

Two surfaces per app: a **detail / case-study page** on the main domain (site chrome), and,
for the web apps, a **running app** on its own **subdomain** (bare, no chrome).

| Surface | Public URL | Internal route |
|---|---|---|
| App index | `vertically.works/apps` | `app/(site)/apps/page.tsx` |
| Verse detail | `vertically.works/apps/verse` | `app/(site)/apps/verse/` |
| To-do detail | `vertically.works/apps/todo` | `app/(site)/apps/todo/` |
| News detail | `vertically.works/apps/news` | `app/(site)/apps/news/` |
| Listen detail | `vertically.works/apps/listen` | `app/(site)/apps/listen/` |
| Chat detail | `vertically.works/apps/chat` | `app/(site)/apps/chat/` |
| To-do **app** | `todo.vertically.works` | `app/run/todo/` |
| News **app** | `news.vertically.works` (+ `/article/[id]`) | `app/run/news/` |
| Listen **app** | `listen.vertically.works` | `app/run/listen/` |
| Chat **app** (WIP) | `chat.vertically.works` | `app/run/chat/` |
| Verse (iOS) | `verse.vertically.works` → TestFlight | redirect only |

**Chrome is structural**: routes inside `app/(site)/` get Navigation + Footer (via
`app/(site)/layout.tsx` → `SiteFrame`); routes under `app/run/*` and `app/api/*` render bare.
There is no `BARE_ROUTES` allowlist anymore.

**Subdomains** are wired in `next.config.ts`:
- `rewrites()` — host-matched, `<name>.vertically.works` → `/run/<name>`. Split so the app
  root beats the marketing homepage (`beforeFiles`, `source:"/"`) while `/:path*` runs
  `afterFiles` so `/_next`, `/api`, `/videos` pass through untouched.
- `redirects()` — `verse.vertically.works` → TestFlight (307); 301s from old slugs
  (`/apps/vertically-do` → `/apps/todo`, `/apps/notes` → `/apps/todo`, old news article
  deep links → the news subdomain).
- `lib/appUrls.ts` `runningAppUrl()` — subdomain in prod, `/run/<name>` in dev; used by
  detail-page "open the app" buttons. iframe embeds (`AppEmbed`) stay same-origin on `/run/*`.
- News client routing derives its base from `window.location` so article URLs work on the
  subdomain root and at `/run/news` in dev.

## Applications

- **Vertically To-do** — vertical/RTL to-do, localStorage only. Components/logic in
  `components/notes` + `lib/notes` (internal name "notes"); route `app/run/todo`.
- **Vertically News** — live CJK RSS front page, `app/api/news/*`.
- **Vertically Listen** — podcast player with vertical transcripts, `app/api/podcasts|episodes|transcript`.
- **Vertically Chat** — WIP placeholder for a native vertical AI-chat interface (tracks the
  `ai-chat` challenge). Detail page live; app is a "coming soon" stub.
- **Vertically Verse** — iOS-only CJK scripture reader. Detail page + `/verse/*` legal pages;
  `verse.vertically.works` redirects to the TestFlight beta.

## Contact intake

Home-page contact form → `app/api/contact/route.ts` → emailed to the owner inbox via
**Resend** (reply-to = the visitor). Sends `from` a Resend-verified domain
(`vertically.works`). Requires `RESEND_API_KEY` (Vercel env + `.env.local`, see `.env.example`);
falls back to a `mailto:` draft if unconfigured.

## Deployment & infrastructure

- Vercel, auto-deploy from `main`. `vertically.works` is the primary domain.
- Subdomains: wildcard `*.vertically.works` CNAME → `cname.vercel-dns.com` at the registrar
  (GoDaddy), and each host added as a domain on the Vercel project. TLS auto-issues per host.
- Adding a new app subdomain: create `app/run/<name>`, add the host-rewrite in `next.config.ts`,
  and add the Vercel project domain. The wildcard CNAME already covers DNS.

---

## Change log

### 2026-07-18 — URL restructure + app subdomains
- Detail pages moved to short slugs `/apps/{verse,todo,news,listen,chat}` (dropped the
  `vertically-` prefix); added a `/apps/chat` WIP detail.
- Running apps moved from `/apps/{notes,news,listen}` to an internal `/run/*` namespace and are
  now served on `<name>.vertically.works` subdomains via host-rewrites.
- Chrome refactored into an `app/(site)` route group (removed the pathname-based `BARE_ROUTES`).
- `verse.vertically.works` → TestFlight redirect; 301s from all old paths.
- Origin-banner shader is theme-aware (distinct dark-mode palette).

### 2026-07-16 — Contact form delivery
- Added `/api/contact` (Resend) so the contact form actually reaches the owner inbox, with a
  mailto fallback. Owner/support email standardized to `contact@designwithorbital.com` (public
  mailto links) with delivery via the verified `vertically.works` sender.
- Copy pass to strip AI-writing tells across the site; installed the `stop-slop` writing skill.

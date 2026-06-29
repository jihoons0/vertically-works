# Vertically Works

The canonical reference for vertical interface design.

**vertically.works** is a documentation platform exploring interaction patterns for vertical writing systems — Korean (한국어), Japanese (日本語), and Chinese (中文). It treats writing direction not as a typographic choice, but as the foundation of interaction.

---

## What's here

```
content/        MDX documentation (components, patterns, principles, challenges)
app/            Next.js routes
components/     React components and interactive demos
docs/           Project meta-documentation (manifesto, blueprint, design decisions)
lib/            Utilities
public/         Static assets
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How docs are organized

Content lives in `content/` as MDX files. Each file has frontmatter:

```mdx
---
title: Button
description: How should a button behave in a vertical interface?
status: published
category: components
---
```

Routes in `app/` read MDX from `content/` via `lib/mdx.ts`.

## How components work

Every documented component has:
- **Purpose** — why it exists
- **Problem** — the specific vertical-interface question it answers
- **Interactive demo** — live in the browser, not a screenshot
- **Implementation notes** — what to actually do
- **Do / Don't** — concrete guidance
- **Open questions** — what we don't know yet

## Development

```bash
npm run dev      # dev server
npm run build    # production build
npm run lint     # lint
```

## Deploy

This project deploys to Vercel. Connect the GitHub repo to a Vercel project targeting `vertically.works`.

## The application

[Vertically Verse](https://github.com/jihoons/exploring) — the companion iOS app — is the first implementation of these principles: a fully vertical, RTL scripture reader for Korean, Japanese, and Chinese.

---

One sentence: Vertically Works explores how software changes when writing direction becomes the foundation of interaction rather than a typographic afterthought.

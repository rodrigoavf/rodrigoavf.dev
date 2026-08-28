# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The personal site at **rodrigoavf.dev** — a place to publish notes, tutorials and
ideas about **data analysis and data engineering**, and to showcase projects as a
portfolio.

Content is mostly long-form text, but posts also need to support **images**,
**embeds** (Power BI reports, YouTube, iframes), and **download links** to
material.

## Stack

| Concern    | Choice                                 |
| ---------- | -------------------------------------- |
| Framework  | Next.js 16 (App Router, React 19)      |
| Language   | TypeScript                             |
| Styling    | Tailwind CSS v4 (CSS-first, no config) |
| Content    | MDX files in the repo (planned)        |
| Hosting    | Vercel Hobby, custom domain            |
| Rendering  | Static (SSG) — no database, no backend |

Everything is statically prerendered. There is no server, no database, and no
paid service, so the site stays comfortably inside the Vercel Hobby free tier.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # production build (run before pushing)
npm run lint    # eslint
```

Always run `npm run build` and `npm run lint` before committing — the build runs
TypeScript checking too.

## Layout

```
src/
  app/
    layout.tsx          root layout: header, footer, fonts, metadata
    page.tsx            home page
    globals.css         Tailwind import + design tokens
    writing/page.tsx    post index          (placeholder)
    projects/page.tsx   project index       (placeholder)
    about/page.tsx      about               (placeholder)
    not-found.tsx       404
  components/           shared UI
  lib/site.ts           single source of truth for name, nav, links, metadata
public/                 static assets served at /
HowToEdit.mdx           authoring cheat sheet (personal reference, not a page)
```

`HowToEdit.mdx` at the repo root is the owner's own reference for writing posts
— frontmatter fields, image paths, embed syntax, MDX pitfalls. It is deliberately
outside `content/`, so it is never rendered or published. Keep it in sync when
the content model changes.

## Content model

**Decision: content lives in the repo as MDX** (`.mdx`), not plain `.md`.

MDX is markdown that can also render React components. Ordinary posts are written
as plain markdown and read exactly like markdown; the moment a post needs
something markdown can't express — a Power BI embed, a callout, a chart — a
component can be dropped inline. This is what resolves the "will markdown handle
images and embeds?" concern: it does, without locking anything down.

Planned shape:

```
content/
  posts/
    how-to-vlookup-in-excel.mdx
  projects/
    some-dashboard.mdx
```

Each file starts with YAML frontmatter:

```mdx
---
title: How to VLOOKUP in Excel
date: 2026-08-28
summary: One or two lines used on the index page and in social previews.
tags: [excel, tutorial]
draft: false
---

Plain markdown for the body.

![A screenshot](/images/posts/vlookup/step-1.png)

<PowerBIEmbed src="https://app.powerbi.com/view?r=..." />
```

The URL slug is the filename. Editing a file and pushing is the whole publishing
workflow — Vercel rebuilds on push.

### Where things live

- **Images** — commit to `public/images/posts/<slug>/`, reference as
  `/images/posts/<slug>/name.png`. Prefer `next/image` (via an MDX component
  override) so they are optimized and lazy-loaded. Keep files small; large
  binaries do not belong in git.
- **Embeds** — a small React component per embed type (`<PowerBIEmbed>`,
  `<YouTube>`), each wrapping a responsive `<iframe>`. Power BI must be published
  with *Publish to web* for a public iframe to work.
- **Downloads** — host large material externally (OneDrive, Google Drive, S3) and
  link to it. Only small files (a sample `.csv`, a `.pbix` under a few MB) should
  go in `public/downloads/`.

## Conventions

- Path alias `@/*` → `src/*`.
- Colors come from the CSS variables in `globals.css` (`background`, `surface`,
  `foreground`, `muted`, `border`, `accent`) and are used as Tailwind utilities
  (`text-muted`, `border-border`). Light and dark are both defined there —
  **never hardcode a hex value in a component**, and never add a color to only
  one of the two themes.
- Layout width is `max-w-3xl` with `px-6`. Keep pages consistent with that.
- Server Components by default; add `"use client"` only where interactivity
  genuinely requires it.
- Site name, nav, and social links live in `src/lib/site.ts` — edit them there,
  not inline in components.

## Current state

Scaffolding and design system are in place. The home page and the
writing/projects/about pages render **placeholder content only**.

Not built yet:

- The MDX pipeline (`content/` directory, frontmatter parsing, `[slug]` routes,
  post index, syntax highlighting, embed components).
- `sitemap.ts`, `robots.ts`, RSS feed, OG images.
- Real copy, real posts, real projects.

## Deployment

Vercel, connected to this GitHub repo. Push to the default branch deploys to
production; other branches get preview URLs. No environment variables are
required. Next.js is auto-detected, so no `vercel.json` is needed.

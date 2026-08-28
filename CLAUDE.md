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
| Content    | MDX files in the repo                  |
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
    layout.tsx            root layout: header, footer, fonts, metadata
    page.tsx              home page
    globals.css           design tokens, themes, prose styles
    writing/page.tsx      post index
    writing/[slug]/       a post
    projects/page.tsx     project index
    projects/[slug]/      a project
    tags/[tag]/           everything sharing a tag
    feed.xml/route.ts     RSS
    sitemap.ts robots.ts  SEO
    not-found.tsx         404
  components/
    mdx/                  components usable inside posts + the renderer
    entry-list.tsx        post rows, project cards, tag pills
    entry-page.tsx        the shared article layout
    theme-toggle.tsx      light/dark switch
    theme-script.tsx      pre-paint theme, avoids a flash
  lib/
    site.ts               name, nav, links, metadata
    content.ts            reads and validates content/, the content API
    image-size.ts         intrinsic image dimensions, read at build time
content/
  posts/*.mdx             a post per file; filename = URL slug
  projects/*.mdx          same, for projects
public/                   static assets served at /
HowToEdit.mdx             authoring cheat sheet (personal reference, not a page)
```

`HowToEdit.mdx` at the repo root is the owner's own reference for writing posts
— frontmatter fields, image paths, embed syntax, MDX pitfalls. It is deliberately
outside `content/`, so it is never rendered or published. Keep it in sync when
the content model changes.

## Content model

**Content lives in the repo as MDX** (`.mdx`), not plain `.md`.

MDX is markdown that can also render React components. Ordinary posts are written
as plain markdown and read exactly like markdown; the moment a post needs
something markdown can't express — a Power BI embed, a callout, a chart — a
component can be dropped inline. This is what resolves the "will markdown handle
images and embeds?" concern: it does, without locking anything down.

Shape:

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
  (`text-muted`, `border-border`). **Never hardcode a hex value in a component.**
- There are three theme states: an explicit choice sets `data-theme` on `<html>`;
  with no choice the OS preference applies. Every token must therefore be defined
  in all three blocks in `globals.css` — bare `:root`, the
  `prefers-color-scheme: dark` block, and `:root[data-theme="dark"]`. Adding a
  colour to only one of them is the easy mistake here.
- Width comes from two CSS variables in `globals.css`: `--container` (the page,
  64rem) and `--measure` (the readable text column, 42rem). Use the `<Container>`
  component rather than setting a max width per page.
- Inside an article, `.prose` is a grid: text sits in the `--measure` column, and
  any direct child with the `wide` class (figures, embeds, code blocks, tables)
  spans the full container. Add `wide` to new block-level MDX components.
- Server Components by default; add `"use client"` only where interactivity
  genuinely requires it.
- Site name, nav, and social links live in `src/lib/site.ts` — edit them there,
  not inline in components.
- **The contact address is stored ROT13-encoded** (`site.emailRot13`) and decoded
  only inside `<EmailLink>`'s click handler, so it is in neither the prerendered
  HTML nor the live DOM. That component is a `<button>`, not an `<a>`, precisely
  because an anchor would have to expose the decoded `mailto:` in an attribute.
  Never turn it back into a plain `mailto:` link, never paste the plain address
  into the source, and never put it in metadata, JSON-LD or an `aria-label` —
  those all ship in the HTML.

## Current state

The mechanics are complete and tested. What is missing is **content** — the
site ships with example files that exist to demonstrate the pipeline.

Working:

- MDX pipeline: frontmatter parsing and validation, `[slug]` routes for posts and
  projects, indexes, tag pages, drafts, reading time.
- Authoring components: `<Figure>`, `<Callout>`, `<PowerBIEmbed>`, `<YouTube>`,
  `<Embed>`; markdown images routed through `next/image` with dimensions measured
  from the file at build time.
- Syntax highlighting via Shiki, emitting both themes as CSS variables so a theme
  switch needs no re-highlight.
- Light/dark themes with a toggle, an OS-preference default, and no flash on load.
- `sitemap.xml`, `robots.txt`, RSS at `/feed.xml`, per-page OpenGraph metadata.

Not built:

- Dynamic OG images (`opengraph-image.tsx`) — posts currently fall back to the
  `cover` image where one is set.
- Search, pagination, and comments. None are worth adding until there is enough
  content to need them.

**Delete when real content arrives:** `content/posts/example-post.mdx`,
`content/posts/draft-example.mdx`, `content/projects/example-project.mdx`,
`public/images/posts/example-post/`, `public/downloads/example.csv`.

## Content rules enforced at build time

`src/lib/content.ts` throws — failing `npm run build` — when a file has a
filename that is not lowercase-with-hyphens, a missing `title`/`date`/`summary`,
a `date` that is not `YYYY-MM-DD`, or `tags` that are not a list. This is
deliberate: a broken post should stop the deploy, not ship half-rendered.

Drafts (`draft: true`) are visible in `npm run dev` and excluded from
`npm run build`, so an unfinished post can be pushed safely.

## Deployment

Vercel, connected to this GitHub repo. Push to the default branch deploys to
production; other branches get preview URLs. No environment variables are
required. Next.js is auto-detected, so no `vercel.json` is needed.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

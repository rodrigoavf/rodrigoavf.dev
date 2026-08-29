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
    writing/              post index + [slug]
    projects/             project index + [slug]
    cheat-sheets/         cheat sheet index + [slug]
    tags/[tag]/           everything sharing a tag
    feed.xml/route.ts     RSS
    search-index.json/    the static search index
    sitemap.ts robots.ts  SEO
    not-found.tsx         404
  components/
    mdx/                  components usable inside posts + the renderer
    entry-list.tsx        post rows, project cards, tag pills
    entry-page.tsx        the shared article layout
    search-dialog.tsx     the search UI
    theme-toggle.tsx      light/dark switch
    theme-script.tsx      pre-paint theme, avoids a flash
  lib/
    site.ts               name, nav, links, metadata
    content.ts            collections, reads and validates content/
    search.ts             ranking, shared by the dialog and its tests
    image-size.ts         intrinsic image dimensions, read at build time
content/
  posts/*.mdx             a post per file; filename = URL slug
  projects/*.mdx          same, for projects
  cheatsheets/*.mdx       same, for cheat sheets
public/                   static assets served at /
HowToEdit.mdx             authoring cheat sheet (personal reference, not a page)
```

The logo is an SVG path, not a bitmap: `src/components/logo.tsx` draws the mark
in the header, taking its gradient stops from `--logo-from` / `--logo-mid` /
`--logo-to` so it can darken for the light theme. `src/app/icon.svg` is the
favicon (the mark on the logo's navy rounded square, always in the true brand
colours, since it never sits on a light background) and Next generates the
`<link rel="icon">` from its filename. `src/app/apple-icon.png` is rendered from
that same SVG. `public/logo-mark.svg` is the standalone mark for anywhere
outside the app.

`public/Rodrigo_Portrait.png` is a cut-out with a real alpha channel, rendered by
`<Portrait>`. Nothing is painted behind it — no glow, no frame. Its one
treatment is a short bottom fade (the source is cropped mid-shoulder, and the
hard edge would otherwise read as a mistake); keep the fade narrow, since a
taller one eats into the figure. On the home page it carries the same bottom
padding as the text column so its base sits level with the hero buttons. It is
519x480, so do not render it much wider than ~300px.

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

There are three collections, defined in one place — `COLLECTIONS` in
`src/lib/content.ts`:

| Directory            | URL             | Index layout |
| -------------------- | --------------- | ------------ |
| `content/posts`      | `/writing`      | dated rows   |
| `content/projects`   | `/projects`     | cards        |
| `content/cheatsheets`| `/cheat-sheets` | cards        |

```
content/
  posts/
    how-to-vlookup-in-excel.mdx
  projects/
    some-dashboard.mdx
  cheatsheets/
    dax-quick-reference.mdx
```

**To add a collection**, add an entry to `COLLECTIONS` and copy one of the
route pairs under `src/app/`. Tag pages, the sitemap and search all iterate over
`COLLECTIONS`, so they pick it up with no further changes.

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

## Writing style

Applies whenever you're asked to write or edit content for `content/` (posts,
projects, cheat sheets) — not to this file or other repo docs.

**Nothing that reads as AI-written.** Concretely:

- **No em dashes (`—`).** Rephrase with a period, comma, colon, or
  parentheses instead.
- Avoid the "It's not just X, it's Y" construction, and don't lean on
  rule-of-three lists as a crutch ("fast, reliable, and scalable").
- Skip stock phrasing: "delve into", "leverage", "robust", "seamless",
  "unlock", "game-changing", "cutting-edge", "boundless", "navigate the
  landscape", "in today's fast-paced/digital world", "let's dive in", "in
  conclusion", "furthermore", "moreover".
- No meta-commentary about being an AI, a model, or an assistant. Write in
  the owner's voice, first person, like he sat down and wrote it himself.
- No filler openers ("In this post, we'll explore...") or filler closers
  ("In conclusion, ..."). Open on the problem or the point. Stop when the
  point is made — no restating it in a wrap-up paragraph.

**Tone: professional but conversational** — the way a good Medium technical
writeup reads, not a corporate blog post and not a textbook. Plain sentences,
contractions are fine ("it's", "didn't"), first person for projects and
opinions. Short paragraphs. A dry aside is fine; a forced joke is not.

**Structure**, matching the existing posts and projects: `##` section
headings (never `#` — the frontmatter `title` already renders as the page's
`#`), a stated problem, what was built or learned, concrete detail (code, a
table, real numbers), and an honest closing note on what's still rough or
what you'd change, rather than a tidy summary paragraph.

**Placeholders.** When an image or a code sample isn't available yet, don't
skip it or invent fake content to fill the gap — leave an obvious
placeholder:

- **Images:** use `<Figure>` (or plain `![alt](...)`) pointing at the real
  eventual path under `/images/posts/<slug>/`, with specific alt text and a
  caption describing what the image will show. The file doesn't need to
  exist yet — a missing image never fails the build.
- **Code or config supplied later** (real notebook code, a flow export, a
  full file): a fenced code block with one comment line saying what belongs
  there, e.g. `# Paste the PySpark notebook code here — collects X, writes Y
  to Z`. Never pass off invented code as the real implementation.

## Conventions

- Path alias `@/*` → `src/*`.
- **The palette comes from the logo.** Dark mode is the logo's own colours —
  navy `#050a16` behind turquoise `#2ef4ca` and cyan `#00c3ff`. Light mode is
  the same hues darkened until they carry AA on white; the logo's turquoise
  itself sits at 1.4:1 on white and is effectively invisible there, so it can
  never be used as-is on a light background.
- Colors come from the CSS variables in `globals.css` (`background`, `surface`,
  `foreground`, `muted`, `border`, `accent`, `on-accent`, `warning`) and are used
  as Tailwind utilities (`text-muted`, `border-border`). **Never hardcode a hex
  value in a component.**
- **Each collection has its own hue** — `--tone-posts` (the logo's cyan),
  `--tone-cheatsheets` (the logo's turquoise), and `--tone-projects` (amber,
  which the logo does not have; three cool hues would be too close to tell
  apart). Put `data-tone={collection}` on a
  wrapper and every `tone` utility inside it (`text-tone`, `bg-tone`,
  `border-tone`) resolves to that collection's colour. This is what stops the
  site reading as monochrome, and it carries meaning: colour tells you what kind
  of thing you are looking at, in cards, tags and search results alike.
- **`==text==` in a post body renders in that collection's tone.** A remark
  plugin (`src/lib/remark-tone-highlight.ts`) rewrites it to
  `<mark class="tone-mark">`, which `globals.css` paints with `var(--tone)` and
  no background fill. Both delimiters must hug their text, which is what keeps
  `if a == b` out of it, and only `text` nodes are visited, so code is untouched.
  `toPlainText` strips the same markers via `stripHighlightMarkers`, so they
  never leak into the search index — keep the two in step.
- `--on-accent` is the text colour to use on an `--accent` fill. It flips
  between themes, because the accent is dark on light and light on dark — a
  hardcoded white button label would vanish in dark mode.
- Every colour pair is checked against WCAG AA (4.5:1) in both themes. When
  changing a token, re-check it — `color-mix` results are not obvious by eye,
  and the tones sit on both `background` and `surface`.
- There are three theme states: an explicit choice sets `data-theme` on `<html>`;
  with no choice the OS preference applies. Every token must therefore be defined
  in all three blocks in `globals.css` — bare `:root`, the
  `prefers-color-scheme: dark` block, and `:root[data-theme="dark"]`. Adding a
  colour to only one of them is the easy mistake here.
- **There is one width for everything.** `--container` in `globals.css` (64rem)
  is it — paragraphs, headings, figures, embeds, code blocks and tables all use
  the same box, so nothing is inset relative to anything else. Use the
  `<Container>` component rather than setting a max width per page, and do not
  reintroduce a narrower column for prose.
- **Code blocks wrap; they never scroll sideways.** `.prose pre` is
  `white-space: pre-wrap`, and `.prose pre code` pins its single grid column to
  `minmax(0, 1fr)` — without that the implicit column sizes to its widest line
  and the wrapping silently stops working. Blocks fold to 30 rows: the cap lives
  in `--code-collapsed-height` and is applied by CSS from the first paint, so a
  long block never renders full height and then snaps shut on hydration.
  `<CodeBlock>` re-derives the same figure from the computed line height to
  decide whether to offer the expander, so the two must agree. The cap is on
  *rendered rows*, not source lines — a wrapped line costs more than one row,
  which is the point on a phone.
- `html` sets `scrollbar-gutter: stable`. **Do not remove it.** Without it, pages
  long enough to scroll (Home, Writing) lose scrollbar width from the viewport
  while short ones (Projects, About) do not, so the centred layout — header
  included — jumps sideways a few pixels as you navigate between them.
- Server Components by default; add `"use client"` only where interactivity
  genuinely requires it.
- Site name, role, location, nav, and social links live in `src/lib/site.ts` —
  edit them there, not inline in components.
- `<PageShell>` takes an optional `aside`, which puts an element beside the page
  title. Only that header row splits into two columns — everything below stays
  the full page width, so the single-width rule still holds for content.
- The About page (`src/app/about/page.tsx`) is plain JSX, not MDX: its content is
  structured data (roles, skills, certifications) rather than prose, and there is
  only ever one of it. Update the arrays at the top of the file.
- **Never put the phone number or postal address from the CV on the site.** The
  contact route is `<EmailLink>` and LinkedIn, nothing more.
- **The contact address is stored ROT13-encoded** (`site.emailRot13`) and decoded
  only inside `<EmailLink>`'s click handler, so it is in neither the prerendered
  HTML nor the live DOM. That component is a `<button>`, not an `<a>`, precisely
  because an anchor would have to expose the decoded `mailto:` in an attribute.
  Never turn it back into a plain `mailto:` link, never paste the plain address
  into the source, and never put it in metadata, JSON-LD or an `aria-label` —
  those all ship in the HTML.

## Current state

The mechanics are complete and tested. What is missing is **your own content** —
everything in `content/` today is an example written to populate the pages, and
is meant to be deleted.

Working:

- MDX pipeline: frontmatter parsing and validation, `[slug]` routes for all three
  collections, indexes, tag pages, drafts, reading time.
- Tag filters at the top of all three indexes (`/writing`, `/projects`,
  `/cheat-sheets`), linking to the shared `/tags/[tag]` pages.
- Authoring components: `<Figure>`, `<Callout>`, `<PowerBIEmbed>`, `<YouTube>`,
  `<Embed>`; markdown images routed through `next/image` with dimensions measured
  from the file at build time.
- Syntax highlighting via Shiki, emitting both themes as CSS variables so a theme
  switch needs no re-highlight.
- Code blocks wrap instead of scrolling sideways, and fold to 30 rows with a
  *Show all N lines* control (`src/components/mdx/code-block.tsx`).
- Light/dark themes with a toggle, an OS-preference default, and no flash on load.
- Client-side search over every collection (see below).
- `sitemap.xml`, `robots.txt`, RSS at `/feed.xml`, per-page OpenGraph metadata.

Not built:

- Dynamic OG images (`opengraph-image.tsx`) — entries fall back to the `cover`
  image where one is set.
- Pagination and comments. Neither is worth adding until there is enough content
  to need them.

**Delete when real content arrives:** everything under `content/`, plus
`public/images/posts/example-post/` and `public/downloads/example.csv`.

## Search

Search is entirely static and client-side — there is no server to query, which
keeps it inside the Hobby tier.

`/search-index.json` is a route handler marked `force-static`, so it is built
once at deploy time. `<SearchDialog>` fetches it the first time someone opens
search (never on a normal page load), caches it for the session, and ranks
matches with `src/lib/search.ts`.

Two things there are deliberate and easy to undo by accident:

- **`toPlainText` keeps code and table text.** On a site of cheat sheets the
  best search terms — `SUMX`, `XLOOKUP`, `groupby` — live almost entirely inside
  fenced blocks and tables. Stripping them makes search look broken.
- **Underscores are not stripped** as emphasis markers, because doing so turns
  `dense_rank` into `denserank`.

The index is a few KB gzipped. If it ever passes a few hundred KB — well over a
hundred entries — index titles, summaries and tags only, or move to a real
inverted index.

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

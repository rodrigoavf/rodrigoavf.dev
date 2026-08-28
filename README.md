# rodrigoavf.dev

Personal site — notes, tutorials and projects on data analysis and data
engineering.

Built with [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind
CSS v4, statically prerendered and deployed on Vercel.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
```

```bash
npm run build   # production build
npm run lint    # eslint
```

## Deploying

Import the repository at [vercel.com/new](https://vercel.com/new). Next.js is
auto-detected — no configuration or environment variables are needed. Pushes to
the default branch deploy to production; other branches get preview URLs.

To attach the custom domain: Vercel project → **Settings → Domains → Add**, then
point the domain's DNS at Vercel as instructed there.

## Where things are

See [CLAUDE.md](./CLAUDE.md) for the project structure, the content model, and
the conventions to follow when adding to the site.

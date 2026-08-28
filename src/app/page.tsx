import Link from "next/link";
import { site } from "@/lib/site";

// Placeholder data. Replace with posts loaded from `content/` once the
// MDX pipeline lands — see CLAUDE.md.
const placeholderPosts = [
  {
    slug: "#",
    title: "Placeholder: a post about data modelling",
    date: "Coming soon",
    summary:
      "Short one- or two-line summary of the post, pulled from the MDX frontmatter.",
    tags: ["placeholder"],
  },
  {
    slug: "#",
    title: "Placeholder: a tutorial with a Power BI embed",
    date: "Coming soon",
    summary:
      "Walkthroughs, screenshots, embedded reports and downloadable sample files live here.",
    tags: ["placeholder"],
  },
  {
    slug: "#",
    title: "Placeholder: a short note on something I found interesting",
    date: "Coming soon",
    summary: "Not everything needs to be a full tutorial.",
    tags: ["placeholder"],
  },
];

const placeholderProjects = [
  {
    href: "#",
    title: "Placeholder project",
    summary: "What it does, what it was built with, and what problem it solved.",
  },
  {
    href: "#",
    title: "Another placeholder project",
    summary: "Dashboards, pipelines, tooling — one card each.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="border-b border-border py-20 sm:py-28">
        <p className="font-mono text-sm text-accent">Hi, I&apos;m {site.name}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {site.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">
          This is a placeholder introduction. A couple of sentences about who you
          are, what you work on, and what someone can expect to find here.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/writing"
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Read the writing
          </Link>
          <Link
            href="/about"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-surface"
          >
            About me
          </Link>
        </div>
      </section>

      <section className="border-b border-border py-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Latest writing</h2>
          <Link
            href="/writing"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            All posts →
          </Link>
        </div>

        <ul className="mt-8 flex flex-col divide-y divide-border">
          {placeholderPosts.map((post) => (
            <li key={post.title} className="py-5 first:pt-0 last:pb-0">
              <Link href={post.slug} className="group block">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-medium tracking-tight transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <span className="font-mono text-xs text-muted">
                    {post.date}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted text-pretty">
                  {post.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-16">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
          <Link
            href="/projects"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            All projects →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {placeholderProjects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent"
            >
              <h3 className="font-medium tracking-tight">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
                {project.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

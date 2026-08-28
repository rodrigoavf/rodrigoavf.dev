import Link from "next/link";
import { Container } from "@/components/container";
import { EntryCards, EntryList } from "@/components/entry-list";
import { EmptyState } from "@/components/page-shell";
import { getEntries } from "@/lib/content";
import { site } from "@/lib/site";

export default function Home() {
  const posts = getEntries("posts").slice(0, 5);
  const projects = getEntries("projects").slice(0, 4);

  return (
    <Container>
      <section className="border-b border-border py-20 sm:py-28">
        <p className="font-mono text-sm text-accent">Hi, I&apos;m {site.name}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {site.tagline}
        </h1>
        <p className="mt-6 max-w-[var(--measure)] text-lg leading-relaxed text-muted text-pretty">
          {site.intro}
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

        <div className="mt-8">
          {posts.length > 0 ? (
            <EntryList entries={posts} />
          ) : (
            <EmptyState>
              No posts yet. Add an .mdx file to content/posts/ to publish one.
            </EmptyState>
          )}
        </div>
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

        <div className="mt-8">
          {projects.length > 0 ? (
            <EntryCards entries={projects} />
          ) : (
            <EmptyState>
              No projects yet. Add an .mdx file to content/projects/ to publish one.
            </EmptyState>
          )}
        </div>
      </section>
    </Container>
  );
}

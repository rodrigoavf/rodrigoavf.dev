import Link from "next/link";
import { Container } from "@/components/container";
import { EntryCards, EntryList } from "@/components/entry-list";
import { EmptyState } from "@/components/page-shell";
import { Portrait } from "@/components/portrait";
import { getEntries } from "@/lib/content";
import { site } from "@/lib/site";

export default function Home() {
  const posts = getEntries("posts").slice(0, 5);
  const projects = getEntries("projects").slice(0, 4);
  const sheets = getEntries("cheatsheets").slice(0, 4);

  return (
    <>
      {/* Full-width so the colour wash can span the viewport. Doing this with
          negative insets on a pseudo-element instead caused horizontal
          overflow, and a negative z-index hid it behind the body background. */}
      <div className="hero-glow border-b border-border">
        <Container>
          {/* The portrait is bottom-aligned and carries the same bottom
              padding as the text column, so its base lands level with the two
              buttons rather than below them. */}
          <section className="flex flex-col gap-10 pt-20 sm:pt-28 lg:flex-row lg:items-end lg:gap-12">
            <div className="pb-20 sm:pb-28 lg:flex-1">
              <p className="font-mono text-sm text-accent">
                Hi, I&apos;m {site.name}
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {site.tagline}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted text-pretty">
                {site.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/writing"
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-on-accent transition-opacity hover:opacity-90"
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
            </div>

            <Portrait
              priority
              className="w-48 self-center sm:w-56 lg:w-72 lg:self-end lg:pb-28"
              sizes="(min-width: 1024px) 288px, 224px"
            />
          </section>
        </Container>
      </div>

      <Container>
        <HomeSection
          tone="posts"
          title="Latest writing"
          href="/writing"
          linkLabel="All posts"
          bordered
        >
          {posts.length > 0 ? (
            <EntryList entries={posts} />
          ) : (
            <EmptyState>
              No posts yet. Add an .mdx file to content/posts/ to publish one.
            </EmptyState>
          )}
        </HomeSection>

        <HomeSection
          tone="projects"
          title="Projects"
          href="/projects"
          linkLabel="All projects"
          bordered
        >
          {projects.length > 0 ? (
            <EntryCards entries={projects} />
          ) : (
            <EmptyState>
              No projects yet. Add an .mdx file to content/projects/ to publish
              one.
            </EmptyState>
          )}
        </HomeSection>

        <HomeSection
          tone="cheatsheets"
          title="Cheat Sheets"
          href="/cheat-sheets"
          linkLabel="All cheat sheets"
        >
          {sheets.length > 0 ? (
            <EntryCards entries={sheets} />
          ) : (
            <EmptyState>
              No cheat sheets yet. Add an .mdx file to content/cheatsheets/ to
              publish one.
            </EmptyState>
          )}
        </HomeSection>
      </Container>
    </>
  );
}

function HomeSection({
  tone,
  title,
  href,
  linkLabel,
  bordered = false,
  children,
}: {
  tone: string;
  title: string;
  href: string;
  linkLabel: string;
  bordered?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      data-tone={tone}
      className={`py-16 ${bordered ? "border-b border-border" : ""}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight">
          <span aria-hidden="true" className="h-4 w-1 rounded-full bg-tone" />
          {title}
        </h2>
        <Link
          href={href}
          className="text-sm text-muted transition-colors hover:text-tone"
        >
          {linkLabel} →
        </Link>
      </div>

      <div className="mt-8">{children}</div>
    </section>
  );
}

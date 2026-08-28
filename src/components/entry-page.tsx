import Link from "next/link";
import { Container } from "@/components/container";
import { MdxContent } from "@/components/mdx/mdx-content";
import { Figure } from "@/components/mdx/figure";
import { formatDate, type Entry } from "@/lib/content";

/** The shared article layout for a single post or project. */
export function EntryPage({ entry, backTo }: { entry: Entry; backTo: { href: string; label: string } }) {
  return (
    <Container className="py-12 sm:py-16">
      <Link
        href={backTo.href}
        className="font-mono text-sm text-muted transition-colors hover:text-foreground"
      >
        ← {backTo.label}
      </Link>

      <header className="mt-8 border-b border-border pb-8">
        {entry.draft ? (
          <p className="mb-3 inline-block rounded-md border border-warning/40 bg-warning/10 px-2 py-0.5 font-mono text-xs text-warning">
            Draft — not published on the live site
          </p>
        ) : null}

        <h1 className="max-w-[var(--measure)] text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {entry.title}
        </h1>

        <p className="mt-4 max-w-[var(--measure)] text-lg leading-relaxed text-muted text-pretty">
          {entry.summary}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted">
          <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{entry.readingMinutes} min read</span>
          {entry.tags.length > 0 ? (
            <>
              <span aria-hidden="true">·</span>
              <ul className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/tags/${tag}`}
                      className="transition-colors hover:text-accent"
                    >
                      #{tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </header>

      {entry.cover ? (
        <div className="mt-10">
          <Figure src={entry.cover} alt="" />
        </div>
      ) : null}

      <article className="prose mt-10">
        <MdxContent source={entry.body} />
      </article>
    </Container>
  );
}

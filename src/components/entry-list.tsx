import Link from "next/link";
import { formatDate, type Entry } from "@/lib/content";

/** The standard post row: title, date, summary. Used on indexes and the home page. */
export function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ul className="flex flex-col divide-y divide-border">
      {entries.map((entry) => (
        <li key={entry.href} className="py-5 first:pt-0 last:pb-0">
          <Link href={entry.href} className="group block">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-medium tracking-tight transition-colors group-hover:text-accent">
                {entry.title}
              </h3>
              <time
                dateTime={entry.date}
                className="font-mono text-xs text-muted"
              >
                {formatDate(entry.date)}
              </time>
            </div>
            <p className="mt-1.5 max-w-[var(--measure)] text-sm leading-relaxed text-muted text-pretty">
              {entry.summary}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Project cards, which lead with the summary rather than a date. */
export function EntryCards({ entries }: { entries: Entry[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {entries.map((entry) => (
        <Link
          key={entry.href}
          href={entry.href}
          className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent"
        >
          <h3 className="font-medium tracking-tight transition-colors group-hover:text-accent">
            {entry.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
            {entry.summary}
          </p>
          {entry.tags.length > 0 ? (
            <p className="mt-3 font-mono text-xs text-muted">
              {entry.tags.join(" · ")}
            </p>
          ) : null}
        </Link>
      ))}
    </div>
  );
}

export function TagList({
  tags,
}: {
  tags: { tag: string; count: number }[];
}) {
  if (tags.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map(({ tag, count }) => (
        <li key={tag}>
          <Link
            href={`/tags/${tag}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1 text-xs transition-colors hover:border-accent hover:text-accent"
          >
            {tag}
            <span className="text-muted">{count}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

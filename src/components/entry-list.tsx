import Link from "next/link";
import { formatDate, type Entry } from "@/lib/content";

/** The standard post row: title, date, summary. Used on indexes and the home page. */
export function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ul className="flex flex-col divide-y divide-border">
      {entries.map((entry) => (
        <li key={entry.href} data-tone={entry.collection} className="py-5 first:pt-0 last:pb-0">
          <Link href={entry.href} className="group block">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-medium tracking-tight transition-colors group-hover:text-tone">
                {entry.title}
              </h3>
              <time
                dateTime={entry.date}
                className="font-mono text-xs text-muted"
              >
                {formatDate(entry.date)}
              </time>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted text-pretty">
              {entry.summary}
            </p>
            {entry.tags.length > 0 ? (
              <p className="mt-2 font-mono text-xs text-tone/80">
                {entry.tags.map((tag) => `#${tag}`).join("  ")}
              </p>
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Project and cheat-sheet cards, which lead with the summary rather than a date. */
export function EntryCards({ entries }: { entries: Entry[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {entries.map((entry) => (
        <Link
          key={entry.href}
          href={entry.href}
          data-tone={entry.collection}
          className="group relative overflow-hidden rounded-xl border border-border bg-surface p-5 transition-colors hover:border-tone/50"
        >
          {/* A hairline of the collection's colour along the top edge. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-0.5 bg-tone opacity-60 transition-opacity group-hover:opacity-100"
          />
          <h3 className="font-medium tracking-tight transition-colors group-hover:text-tone">
            {entry.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
            {entry.summary}
          </p>
          {entry.tags.length > 0 ? (
            <p className="mt-3 font-mono text-xs text-tone/80">
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
            className="inline-flex items-center gap-1.5 rounded-lg border border-tone/25 bg-tone/8 px-2.5 py-1 text-xs text-tone transition-colors hover:border-tone/60 hover:bg-tone/15"
          >
            {tag}
            <span className="opacity-60">{count}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

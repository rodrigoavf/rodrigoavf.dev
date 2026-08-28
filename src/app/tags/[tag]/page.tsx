import { notFound } from "next/navigation";
import { EntryCards, EntryList } from "@/components/entry-list";
import { PageShell } from "@/components/page-shell";
import {
  COLLECTIONS,
  COLLECTION_NAMES,
  getEntries,
  type Collection,
} from "@/lib/content";

type Props = { params: Promise<{ tag: string }> };

function entriesByCollection(tag: string) {
  return COLLECTION_NAMES.map((name) => ({
    name,
    entries: getEntries(name).filter((entry) => entry.tags.includes(tag)),
  })).filter((group) => group.entries.length > 0);
}

export function generateStaticParams() {
  const tags = new Set(
    COLLECTION_NAMES.flatMap((name) =>
      getEntries(name).flatMap((entry) => entry.tags),
    ),
  );
  return [...tags].map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props) {
  const tag = decodeURIComponent((await params).tag);
  return {
    title: `Tagged “${tag}”`,
    description: `Everything tagged ${tag}.`,
  };
}

export default async function TagPage({ params }: Props) {
  const tag = decodeURIComponent((await params).tag).toLowerCase();
  const groups = entriesByCollection(tag);
  if (groups.length === 0) notFound();

  const total = groups.reduce((sum, group) => sum + group.entries.length, 0);

  return (
    <PageShell
      title={`Tagged “${tag}”`}
      intro={`${total} ${total === 1 ? "entry" : "entries"}.`}
    >
      {groups.map((group, index) => (
        <section key={group.name} className={index > 0 ? "mt-14" : undefined}>
          <h2 className="mb-6 text-xl font-semibold tracking-tight">
            {COLLECTIONS[group.name as Collection].label}
          </h2>
          {COLLECTIONS[group.name as Collection].layout === "list" ? (
            <EntryList entries={group.entries} />
          ) : (
            <EntryCards entries={group.entries} />
          )}
        </section>
      ))}
    </PageShell>
  );
}

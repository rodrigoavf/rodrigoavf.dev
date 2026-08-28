import { notFound } from "next/navigation";
import { EntryCards, EntryList } from "@/components/entry-list";
import { PageShell } from "@/components/page-shell";
import { getEntries, getTags } from "@/lib/content";

type Props = { params: Promise<{ tag: string }> };

/** Every tag used by either collection. */
function allTags() {
  return [
    ...new Set([
      ...getTags("posts").map((t) => t.tag),
      ...getTags("projects").map((t) => t.tag),
    ]),
  ];
}

export function generateStaticParams() {
  return allTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  return {
    title: `Tagged “${decodeURIComponent(tag)}”`,
    description: `Posts and projects tagged ${decodeURIComponent(tag)}.`,
  };
}

export default async function TagPage({ params }: Props) {
  const tag = decodeURIComponent((await params).tag).toLowerCase();

  const posts = getEntries("posts").filter((e) => e.tags.includes(tag));
  const projects = getEntries("projects").filter((e) => e.tags.includes(tag));
  if (posts.length === 0 && projects.length === 0) notFound();

  const total = posts.length + projects.length;

  return (
    <PageShell
      title={`Tagged “${tag}”`}
      intro={`${total} ${total === 1 ? "entry" : "entries"}.`}
    >
      {posts.length > 0 ? (
        <section>
          <h2 className="mb-6 text-xl font-semibold tracking-tight">Writing</h2>
          <EntryList entries={posts} />
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className={posts.length > 0 ? "mt-14" : undefined}>
          <h2 className="mb-6 text-xl font-semibold tracking-tight">Projects</h2>
          <EntryCards entries={projects} />
        </section>
      ) : null}
    </PageShell>
  );
}

import { EntryList, TagList } from "@/components/entry-list";
import { EmptyState, PageShell } from "@/components/page-shell";
import { getEntries, getTags } from "@/lib/content";

export const metadata = {
  title: "Writing",
  description: "Notes, tutorials and ideas about data analysis and data engineering.",
};

export default function WritingPage() {
  const posts = getEntries("posts");
  const tags = getTags("posts");

  return (
    <PageShell
      tone="posts"
      title="Writing"
      intro="Notes, tutorials and ideas about data analysis and data engineering."
    >
      {tags.length > 0 ? (
        <div className="mb-10">
          <TagList tags={tags} />
        </div>
      ) : null}

      {posts.length > 0 ? (
        <EntryList entries={posts} />
      ) : (
        <EmptyState>
          No posts yet. Add an .mdx file to content/posts/ to publish one.
        </EmptyState>
      )}
    </PageShell>
  );
}

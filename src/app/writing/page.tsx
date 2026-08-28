import { PageShell, Placeholder } from "@/components/page-shell";

export const metadata = { title: "Writing" };

export default function WritingPage() {
  return (
    <PageShell
      title="Writing"
      intro="Notes, tutorials and ideas about data analysis and data engineering."
    >
      <Placeholder>
        No posts yet — this is where the list of posts will render.
      </Placeholder>
    </PageShell>
  );
}

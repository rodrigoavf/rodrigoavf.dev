import { EntryCards, TagList } from "@/components/entry-list";
import { EmptyState, PageShell } from "@/components/page-shell";
import { getEntries, getTags } from "@/lib/content";

export const metadata = {
  title: "Projects",
  description: "Dashboards, pipelines and tools I have built.",
};

export default function ProjectsPage() {
  const projects = getEntries("projects");
  const tags = getTags("projects");

  return (
    <PageShell
      tone="projects"
      title="Projects"
      intro="Dashboards, pipelines and tools I have built."
    >
      {tags.length > 0 ? (
        <div className="mb-10">
          <TagList tags={tags} />
        </div>
      ) : null}

      {projects.length > 0 ? (
        <EntryCards entries={projects} />
      ) : (
        <EmptyState>
          No projects yet. Add an .mdx file to content/projects/ to publish one.
        </EmptyState>
      )}
    </PageShell>
  );
}

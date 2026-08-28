import { EntryCards } from "@/components/entry-list";
import { EmptyState, PageShell } from "@/components/page-shell";
import { getEntries } from "@/lib/content";

export const metadata = {
  title: "Projects",
  description: "Dashboards, pipelines and tools I have built.",
};

export default function ProjectsPage() {
  const projects = getEntries("projects");

  return (
    <PageShell
      title="Projects"
      intro="Dashboards, pipelines and tools I have built."
    >
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

import { PageShell, Placeholder } from "@/components/page-shell";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <PageShell
      title="Projects"
      intro="Dashboards, pipelines and tools I have built."
    >
      <Placeholder>
        No projects yet — this is where the project cards will render.
      </Placeholder>
    </PageShell>
  );
}

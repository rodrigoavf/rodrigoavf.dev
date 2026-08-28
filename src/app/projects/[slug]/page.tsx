import { notFound } from "next/navigation";
import { EntryPage } from "@/components/entry-page";
import { getEntries, getEntry } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getEntries("projects").map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getEntry("projects", slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: project.href },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `${site.url}${project.href}`,
      images: project.cover ? [project.cover] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getEntry("projects", slug);
  if (!project) notFound();

  return (
    <EntryPage
      entry={project}
      backTo={{ href: "/projects", label: "All projects" }}
    />
  );
}

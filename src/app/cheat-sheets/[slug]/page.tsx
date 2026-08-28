import { notFound } from "next/navigation";
import { EntryPage } from "@/components/entry-page";
import { getEntries, getEntry } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getEntries("cheatsheets").map((sheet) => ({ slug: sheet.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const sheet = getEntry("cheatsheets", slug);
  if (!sheet) return {};

  return {
    title: sheet.title,
    description: sheet.summary,
    alternates: { canonical: sheet.href },
    openGraph: {
      type: "article",
      title: sheet.title,
      description: sheet.summary,
      url: `${site.url}${sheet.href}`,
      images: sheet.cover ? [sheet.cover] : undefined,
    },
  };
}

export default async function CheatSheetPage({ params }: Props) {
  const { slug } = await params;
  const sheet = getEntry("cheatsheets", slug);
  if (!sheet) notFound();

  return (
    <EntryPage
      entry={sheet}
      backTo={{ href: "/cheat-sheets", label: "All cheat sheets" }}
    />
  );
}

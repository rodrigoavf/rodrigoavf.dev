import { notFound } from "next/navigation";
import { EntryPage } from "@/components/entry-page";
import { getEntries, getEntry } from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getEntries("posts").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getEntry("posts", slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: post.href },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: `${site.url}${post.href}`,
      publishedTime: post.date,
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getEntry("posts", slug);
  if (!post) notFound();

  return (
    <EntryPage entry={post} backTo={{ href: "/writing", label: "All writing" }} />
  );
}

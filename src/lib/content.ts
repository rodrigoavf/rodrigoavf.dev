import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Collection = "posts" | "projects";

export type Entry = {
  slug: string;
  collection: Collection;
  /** URL path for this entry, e.g. `/writing/my-post`. */
  href: string;
  title: string;
  /** ISO `YYYY-MM-DD`, exactly as authored. */
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
  cover?: string;
  /** Raw MDX body, frontmatter stripped. */
  body: string;
  readingMinutes: number;
};

const CONTENT_DIR = path.join(process.cwd(), "content");

/** Where each collection is published. */
const BASE_PATH: Record<Collection, string> = {
  posts: "/writing",
  projects: "/projects",
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    // Thrown during the build, so a malformed post fails `next build` loudly
    // rather than shipping a half-broken page.
    throw new Error(`[content] ${message}`);
  }
}

function readingMinutes(body: string) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function parseEntry(collection: Collection, filename: string): Entry {
  const slug = filename.replace(/\.mdx?$/, "");
  const filePath = path.join(CONTENT_DIR, collection, filename);
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  const where = `${collection}/${filename}`;

  assert(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug),
    `${where}: filename must be lowercase-with-hyphens (it becomes the URL).`,
  );
  assert(typeof data.title === "string" && data.title, `${where}: missing "title".`);
  assert(data.date, `${where}: missing "date".`);
  assert(
    typeof data.summary === "string" && data.summary,
    `${where}: missing "summary".`,
  );

  // gray-matter turns an unquoted YYYY-MM-DD into a Date; normalise both forms
  // back to a plain ISO day so rendering never depends on the server timezone.
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date);
  assert(
    /^\d{4}-\d{2}-\d{2}$/.test(date),
    `${where}: "date" must be YYYY-MM-DD, got "${date}".`,
  );

  const tags = data.tags ?? [];
  assert(Array.isArray(tags), `${where}: "tags" must be a list, e.g. [excel, sql].`);

  return {
    slug,
    collection,
    href: `${BASE_PATH[collection]}/${slug}`,
    title: data.title,
    date,
    summary: data.summary,
    tags: tags.map((tag: unknown) => String(tag).toLowerCase()),
    draft: data.draft === true,
    cover: typeof data.cover === "string" ? data.cover : undefined,
    body: content,
    readingMinutes: readingMinutes(content),
  };
}

/**
 * Every entry in a collection, newest first.
 *
 * Drafts are included in `next dev` so they can be previewed, and excluded from
 * production builds so pushing an unfinished post is harmless.
 */
export function getEntries(collection: Collection): Entry[] {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => parseEntry(collection, file))
    .filter((entry) => !entry.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getEntry(collection: Collection, slug: string) {
  return getEntries(collection).find((entry) => entry.slug === slug);
}

/** Tags across a collection with their counts, most used first. */
export function getTags(collection: Collection) {
  const counts = new Map<string, number>();
  for (const entry of getEntries(collection)) {
    for (const tag of entry.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

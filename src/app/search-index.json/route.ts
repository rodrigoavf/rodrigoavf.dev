import { COLLECTIONS, getAllEntries, toPlainText } from "@/lib/content";

/**
 * The search index, built once at deploy time and served as a static file.
 *
 * Search runs entirely in the visitor's browser: there is no server to query,
 * and the whole index is a few KB. It is fetched lazily the first time someone
 * opens search, so it costs nothing on a normal page load.
 */
export const dynamic = "force-static";

/**
 * Per-entry cap on indexed body text.
 *
 * Set high deliberately: truncating means a word further down a long post is
 * silently unfindable, which is worse than a slightly larger file. This is a
 * guard against one pathological entry, not a size-saving measure.
 *
 * The whole index is one lazily-fetched, gzipped static file. If it ever grows
 * past a few hundred KB — well over a hundred posts — index titles, summaries
 * and tags only, or move to a real inverted index.
 */
const BODY_LIMIT = 20_000;

export type SearchDocument = {
  title: string;
  href: string;
  summary: string;
  tags: string[];
  date: string;
  collection: string;
  collectionLabel: string;
  text: string;
};

export function GET() {
  const documents: SearchDocument[] = getAllEntries().map((entry) => ({
    title: entry.title,
    href: entry.href,
    summary: entry.summary,
    tags: entry.tags,
    date: entry.date,
    collection: entry.collection,
    collectionLabel: COLLECTIONS[entry.collection].label,
    text: toPlainText(entry.body).slice(0, BODY_LIMIT),
  }));

  return Response.json(documents);
}

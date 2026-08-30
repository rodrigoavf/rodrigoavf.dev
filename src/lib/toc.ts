import GithubSlugger from "github-slugger";
import { stripHighlightMarkers } from "./remark-tone-highlight";

export type TocItem = { id: string; text: string };

/** Strips the markdown markup a heading line can carry, leaving plain text. */
function cleanHeadingText(raw: string) {
  return stripHighlightMarkers(raw)
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
    .trim();
}

/**
 * Level-2 headings for the sidebar TOC, in document order.
 *
 * Ids are derived with the same slugger `rehype-slug` uses on the rendered
 * page, walking every heading level (not just `##`) so duplicate-title
 * numbering lines up with the ids actually present in the HTML — a slugger
 * fed only the `##` lines would dedupe differently.
 */
export function getToc(body: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;

  for (const line of body.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const text = cleanHeadingText(match[2]);
    if (!text) continue;
    const id = slugger.slug(text);

    if (match[1].length === 2) items.push({ id, text });
  }

  return items;
}

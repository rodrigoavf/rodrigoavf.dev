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

export type SearchResult = SearchDocument & {
  score: number;
  /** A short quote from the body around the first match, when there is one. */
  excerpt?: string;
};

/** Field weights — a title hit should always outrank a body hit. */
const WEIGHTS = { title: 10, tag: 6, summary: 3, text: 1 };

function normalise(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // strip accents, so "grafico" finds "gráfico"
}

/** Score one field: whole-word matches count for more than substrings. */
function scoreField(haystack: string, term: string, weight: number) {
  const index = haystack.indexOf(term);
  if (index === -1) return 0;

  const before = haystack[index - 1];
  const after = haystack[index + term.length];
  const atWordStart = index === 0 || !/[a-z0-9]/.test(before ?? "");
  const wholeWord = atWordStart && !/[a-z0-9]/.test(after ?? "");

  return weight * (wholeWord ? 2 : atWordStart ? 1.5 : 1);
}

function buildExcerpt(text: string, term: string) {
  const index = normalise(text).indexOf(term);
  if (index === -1) return undefined;

  const start = Math.max(0, index - 45);
  const end = Math.min(text.length, index + term.length + 75);
  return `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${
    end < text.length ? "…" : ""
  }`;
}

/**
 * Ranks documents against a query.
 *
 * Every term must appear somewhere in a document for it to match, so adding a
 * word narrows the results rather than widening them — which is what people
 * expect from a search box.
 */
export function search(
  documents: SearchDocument[],
  query: string,
  limit = 8,
): SearchResult[] {
  const terms = normalise(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const results: SearchResult[] = [];

  for (const doc of documents) {
    const fields = {
      title: normalise(doc.title),
      tag: normalise(doc.tags.join(" ")),
      summary: normalise(doc.summary),
      text: normalise(doc.text),
    };

    let score = 0;
    let matchedEveryTerm = true;

    for (const term of terms) {
      const termScore =
        scoreField(fields.title, term, WEIGHTS.title) +
        scoreField(fields.tag, term, WEIGHTS.tag) +
        scoreField(fields.summary, term, WEIGHTS.summary) +
        scoreField(fields.text, term, WEIGHTS.text);

      if (termScore === 0) {
        matchedEveryTerm = false;
        break;
      }
      score += termScore;
    }

    if (!matchedEveryTerm) continue;

    // A body excerpt only earns its place when the match is *not* already
    // visible in the title or summary — otherwise the summary reads better,
    // especially where the body is a flattened table or code block.
    const shownElsewhere =
      fields.title.includes(terms[0]) || fields.summary.includes(terms[0]);

    results.push({
      ...doc,
      score,
      excerpt: shownElsewhere ? undefined : buildExcerpt(doc.text, terms[0]),
    });
  }

  return results
    .sort((a, b) => b.score - a.score || b.date.localeCompare(a.date))
    .slice(0, limit);
}

/**
 * `==like this==` in a post body, rendered in the collection's own colour.
 *
 * The marker is deliberately the one thing markdown does not already spend:
 * `*`, `_`, `~` and `` ` `` all mean something, `==` means nothing. The output
 * is a `<mark>` styled in globals.css against `--tone`, so the same source
 * comes out cyan in a post, amber in a project and turquoise in a cheat sheet
 * with nothing declared per file.
 *
 * Both delimiters must hug their text (`==so==`, never `== so ==`), which is
 * what keeps an ordinary comparison — `if a == b == c` — out of it.
 */
const HIGHLIGHT = /==(?!\s)((?:[^=\n]|=(?!=))+)(?<!\s)==/g;

/** The same rule, for stripping the markers out of the search index. */
export function stripHighlightMarkers(text: string) {
  HIGHLIGHT.lastIndex = 0;
  return text.replace(HIGHLIGHT, "$1");
}

type Node = {
  type: string;
  value?: string;
  data?: Record<string, unknown>;
  children?: Node[];
};

/**
 * Only `text` nodes are touched, so a `==` inside inline or fenced code is
 * left alone — mdast keeps those as a `value`, never as text children.
 */
function split(value: string): Node[] | null {
  HIGHLIGHT.lastIndex = 0;
  if (!HIGHLIGHT.test(value)) return null;
  HIGHLIGHT.lastIndex = 0;

  const out: Node[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = HIGHLIGHT.exec(value))) {
    if (match.index > last) {
      out.push({ type: "text", value: value.slice(last, match.index) });
    }
    out.push({
      type: "emphasis",
      // mdast-util-to-hast applies hName/hProperties over the node's own
      // handler, so this comes out as <mark>, not <em>.
      data: { hName: "mark", hProperties: { className: ["tone-mark"] } },
      children: [{ type: "text", value: match[1] }],
    });
    last = match.index + match[0].length;
  }

  if (last < value.length) {
    out.push({ type: "text", value: value.slice(last) });
  }
  return out;
}

export function remarkToneHighlight() {
  return (tree: Node) => walk(tree);
}

function walk(node: Node) {
  const children = node.children;
  if (!children) return;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.type === "text" && typeof child.value === "string") {
      const parts = split(child.value);
      if (parts) {
        children.splice(i, 1, ...parts);
        i += parts.length - 1;
      }
      continue;
    }
    walk(child);
  }
}

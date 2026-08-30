import type { TocItem } from "@/lib/toc";

/**
 * Level-2 headings, floating in the left margin outside the article's own
 * column. It sits at `fixed` positioning rather than in the page's flow, so
 * it takes up no space and never touches the width of anything else — it
 * only appears once the viewport is wide enough to fit it without crowding
 * the (unchanged) container.
 */
export function Toc({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="fixed top-24 hidden max-h-[calc(100vh-8rem)] w-56 overflow-y-auto 2xl:block"
      style={{ left: "max(1rem, calc(50% - var(--container) / 2 - 2rem - 14rem))" }}
    >
      <p className="mb-3 font-mono text-xs text-muted uppercase">On this page</p>
      <ul className="space-y-2.5 border-l border-border pl-4 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-muted transition-colors hover:text-tone"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

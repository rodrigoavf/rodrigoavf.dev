"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

/**
 * Level-2 headings, floating in the left margin outside the article's own
 * column. It sits at `fixed` positioning rather than in the page's flow, so
 * it takes up no space and never touches the width of anything else — it
 * only appears once the viewport is wide enough to fit it without crowding
 * the (unchanged) container.
 */
export function Toc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    // A thin detection band near the top of the viewport (below the sticky
    // header). The heading that crosses into it — scrolling in either
    // direction — becomes the active one.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

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
              className={`transition-colors hover:text-tone ${
                item.id === activeId ? "text-tone" : "text-muted"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

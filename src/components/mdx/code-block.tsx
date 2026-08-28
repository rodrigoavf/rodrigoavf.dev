"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { CopyButton } from "@/components/copy-button";

/**
 * How much of a long block is shown before it is cut off. Counted in rendered
 * rows, not source lines — code wraps, so a single long line can occupy
 * several rows and it is the height on screen that matters here.
 *
 * The same number drives `--code-collapsed-height` in globals.css, which is
 * what actually clips the block; keep the two in step.
 */
const COLLAPSED_LINES = 30;

/**
 * A fenced code block: wrapped rather than side-scrolling, and cut off at
 * {@link COLLAPSED_LINES} rows with a control to see the rest.
 *
 * The collapse is applied by CSS from the first paint, so a long block never
 * renders full height and then snaps shut on hydration. Whether the block is
 * long enough to *need* the control can only be known once it has been laid
 * out, so the button appears after measuring — for a short block that measure
 * simply lifts the (never-reached) cap and nothing moves.
 */
export function CodeBlock({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  // null until measured: collapse optimistically, but stay quiet about it.
  const [overflows, setOverflows] = useState<boolean | null>(null);
  const [lineCount, setLineCount] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    setLineCount(pre.querySelectorAll("[data-line]").length);

    // scrollHeight is the full content height whether or not the block is
    // currently clipped, so this holds in both states.
    const measure = () => {
      const style = getComputedStyle(pre);
      const lineHeight = parseFloat(style.lineHeight);
      const padding =
        parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      if (!lineHeight) return;
      setOverflows(pre.scrollHeight > COLLAPSED_LINES * lineHeight + padding + 1);
    };

    measure();

    // Re-measure on resize: a narrower column rewraps the code into more rows.
    const observer = new ResizeObserver(measure);
    observer.observe(pre);
    return () => observer.disconnect();
  }, []);

  const toggle = useCallback(() => {
    setExpanded((wasExpanded) => {
      // Collapsing a long block can leave the top of it far above the
      // viewport; pull it back into view once the new height has painted.
      if (wasExpanded) {
        requestAnimationFrame(() => {
          preRef.current?.scrollIntoView({ block: "nearest" });
        });
      }
      return !wasExpanded;
    });
  }, []);

  const collapsed = !expanded && overflows !== false;

  return (
    <div className="group my-6">
      <div className="relative" data-code-collapsed={collapsed || undefined}>
        <pre ref={preRef} {...props}>
          {children}
        </pre>
        <CopyButton />
        {overflows && !expanded ? <div className="code-fade" /> : null}
      </div>
      {overflows ? (
        <button
          type="button"
          onClick={toggle}
          aria-expanded={expanded}
          className="mt-2 w-full cursor-pointer rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted transition hover:text-foreground"
        >
          {expanded
            ? "Show less"
            : `Show all ${lineCount} lines`}
        </button>
      ) : null}
    </div>
  );
}

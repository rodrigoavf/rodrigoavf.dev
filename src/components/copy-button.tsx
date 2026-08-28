"use client";

import { useRef, useState } from "react";

/** Copies the text of the sibling <pre> it is rendered next to. */
export function CopyButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const code = ref.current?.parentElement?.querySelector("pre")?.innerText;
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard access denied (insecure origin, or the user blocked it).
      // Nothing useful to do — the code is still selectable by hand.
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      className="absolute top-2.5 right-2.5 cursor-pointer rounded-md border border-border bg-surface px-2 py-1 text-xs text-muted opacity-0 transition group-hover:opacity-100 hover:text-foreground focus-visible:opacity-100"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { search, type SearchDocument, type SearchResult } from "@/lib/search";

/** Fetched once, the first time search is opened, then kept for the session. */
let cachedIndex: SearchDocument[] | null = null;

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [documents, setDocuments] = useState<SearchDocument[] | null>(
    cachedIndex,
  );
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results: SearchResult[] = documents ? search(documents, query) : [];

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  // Open with ⌘K / Ctrl+K from anywhere, close with Escape.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((wasOpen) => !wasOpen);
      } else if (event.key === "Escape") {
        close();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  // Load the index on first open. It is a static file, so this is one cheap
  // request that the browser then caches.
  useEffect(() => {
    if (!open || cachedIndex) return;

    let cancelled = false;
    fetch("/search-index.json")
      .then((response) => response.json())
      .then((data: SearchDocument[]) => {
        cachedIndex = data;
        if (!cancelled) setDocuments(data);
      })
      .catch(() => {
        // Offline or the file failed to load; the dialog says so.
        if (!cancelled) setDocuments([]);
      });

    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Keep the highlighted row in view when arrowing past the fold.
  useEffect(() => {
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function onInputKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && results[active]) {
      event.preventDefault();
      router.push(results[active].href);
      close();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-2.5 py-1.5 text-sm text-muted transition-colors hover:text-foreground sm:w-56 sm:justify-between"
      >
        <span className="flex items-center gap-2">
          <SearchIcon />
          <span className="hidden sm:inline">Search</span>
        </span>
        <kbd className="hidden font-mono text-xs text-muted sm:inline">⌘K</kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-background/70 p-4 pt-[10vh] backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
            className="flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <SearchIcon />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Search posts, projects and cheat sheets…"
                aria-label="Search query"
                className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <kbd className="font-mono text-xs text-muted">esc</kbd>
            </div>

            <div className="overflow-y-auto">
              {documents === null ? (
                <Message>Loading…</Message>
              ) : query.trim() === "" ? (
                <Message>
                  Type to search {documents.length}{" "}
                  {documents.length === 1 ? "entry" : "entries"}.
                </Message>
              ) : results.length === 0 ? (
                <Message>
                  Nothing matches “{query}”.
                </Message>
              ) : (
                <ul ref={listRef} className="p-2">
                  {results.map((result, index) => (
                    <li key={result.href}>
                      <Link
                        href={result.href}
                        onClick={close}
                        onMouseEnter={() => setActive(index)}
                        data-active={index === active}
                        data-tone={result.collection}
                        className="block rounded-lg px-3 py-2.5 data-[active=true]:bg-background"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-medium tracking-tight">
                            {result.title}
                          </span>
                          <span className="shrink-0 font-mono text-xs text-tone">
                            {result.collectionLabel}
                          </span>
                        </div>
                        <p className="mt-0.5 line-clamp-2 text-sm text-muted">
                          {result.excerpt ?? result.summary}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Message({ children }: { children: React.ReactNode }) {
  return <p className="px-4 py-8 text-center text-sm text-muted">{children}</p>;
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="size-4 shrink-0 text-muted"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

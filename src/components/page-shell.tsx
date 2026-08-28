import type { ReactNode } from "react";
import { Container } from "@/components/container";

export function PageShell({
  title,
  intro,
  tone,
  aside,
  children,
}: {
  title: string;
  intro?: string;
  /** Collection name, so tags and accents on this page use its hue. */
  tone?: string;
  /** Optional element beside the title. Only the header splits into two
      columns; everything below stays the full page width. */
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Container className="py-16 sm:py-20" data-tone={tone}>
      <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-12">
        {/* flex-1 so that with no aside this fills the row: without it the
            block shrinks to fit and the intro wraps narrower than the content
            below it. */}
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          {intro ? (
            <p className="mt-4 leading-relaxed text-muted text-pretty">
              {intro}
            </p>
          ) : null}
        </div>
        {aside}
      </div>
      {children ? <div className="mt-12">{children}</div> : null}
    </Container>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-border px-5 py-10 text-center text-sm text-muted">
      {children}
    </p>
  );
}

import type { ReactNode } from "react";
import { Container } from "@/components/container";

export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <Container className="py-16 sm:py-20">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-4 max-w-[var(--measure)] leading-relaxed text-muted text-pretty">
          {intro}
        </p>
      ) : null}
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

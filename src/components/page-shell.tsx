export function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-4 max-w-xl leading-relaxed text-muted text-pretty">
          {intro}
        </p>
      ) : null}
      {children ? <div className="mt-10">{children}</div> : null}
    </div>
  );
}

export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-border px-5 py-8 text-center text-sm text-muted">
      {children}
    </p>
  );
}

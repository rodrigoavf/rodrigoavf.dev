import type { ReactNode } from "react";

const styles = {
  note: "border-accent/40 bg-accent/5",
  warning: "border-warning/40 bg-warning/5",
} as const;

const labels = {
  note: "Note",
  warning: "Warning",
} as const;

/** A highlighted aside. `<Callout type="warning">…</Callout>` */
export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof styles;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className={`my-6 rounded-xl border px-5 py-4 ${styles[type]}`}>
      <p className="mb-1 text-sm font-semibold tracking-tight">
        {title ?? labels[type]}
      </p>
      <div className="callout-body text-sm leading-relaxed">{children}</div>
    </aside>
  );
}

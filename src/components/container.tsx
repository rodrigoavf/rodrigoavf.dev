import type { ReactNode } from "react";

/** The site's single content width. Every page uses this. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--container)] px-6 ${className}`}
    >
      {children}
    </div>
  );
}

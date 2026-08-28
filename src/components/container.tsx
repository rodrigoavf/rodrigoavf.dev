import type { ReactNode } from "react";

/** The site's single content width. Every page uses this. */
export function Container({
  children,
  className = "",
  ...props
}: {
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mx-auto w-full max-w-[var(--container)] px-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

import Link from "next/link";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-6 px-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight transition-opacity hover:opacity-70"
        >
          {site.domain}
        </Link>

        <nav className="flex items-center gap-5 text-sm text-muted">
          {site.nav
            .filter((item) => item.href !== "/")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}

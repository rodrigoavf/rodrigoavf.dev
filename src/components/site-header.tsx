import Link from "next/link";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight transition-opacity hover:opacity-70"
        >
          {site.domain}
        </Link>

        <div className="flex items-center gap-5">
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
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}

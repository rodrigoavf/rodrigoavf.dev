import Link from "next/link";
import { Container } from "@/components/container";
import { SearchDialog } from "@/components/search-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";

const navItems = site.nav.filter((item) => item.href !== "/");

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="font-mono text-sm font-medium tracking-tight transition-opacity hover:opacity-70"
          >
            {site.domain}
          </Link>

          {/* Inline from sm up; below that the links move to their own row so
              the bar cannot overflow on a phone. */}
          <nav className="hidden items-center gap-5 text-sm text-muted sm:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <SearchDialog />
            <ThemeToggle />
          </div>
        </div>

        <nav className="-mx-6 flex gap-5 overflow-x-auto px-6 pb-3 text-sm text-muted sm:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}

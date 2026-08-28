import { Container } from "@/components/container";
import { EmailLink } from "@/components/email-link";
import { site } from "@/lib/site";

export function SiteFooter() {
  const linkStyles = "transition-colors hover:text-foreground";

  return (
    <footer className="mt-24 border-t border-border">
      <Container className="flex flex-col gap-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>

        <ul className="flex flex-wrap items-center gap-5">
          {site.social.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={linkStyles}
                target="_blank"
                rel="noreferrer noopener"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <EmailLink className={linkStyles} />
          </li>
          <li>
            <a href="/feed.xml" className={linkStyles}>
              RSS
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}

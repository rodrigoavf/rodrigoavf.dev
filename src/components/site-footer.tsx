import { EmailLink } from "@/components/email-link";
import { site } from "@/lib/site";

export function SiteFooter() {
  const linkStyles = "transition-colors hover:text-foreground";

  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>

        <ul className="flex flex-wrap gap-5">
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
        </ul>
      </div>
    </footer>
  );
}

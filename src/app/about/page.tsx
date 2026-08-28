import { PageShell } from "@/components/page-shell";

export const metadata = {
  title: "About",
  description: "About Rodrigo Vaz.",
};

export default function AboutPage() {
  return (
    <PageShell title="About">
      <div className="prose">
        <p>
          Placeholder — a short bio, what you work on, and how to get in touch.
        </p>
        <p>
          This page is plain JSX rather than MDX, since there is only ever one
          of it. Edit <code>src/app/about/page.tsx</code> directly.
        </p>
      </div>
    </PageShell>
  );
}

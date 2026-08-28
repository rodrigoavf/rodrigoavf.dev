import { PageShell, Placeholder } from "@/components/page-shell";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <PageShell title="About">
      <Placeholder>
        Placeholder — a short bio, what you work on, and how to get in touch.
      </Placeholder>
    </PageShell>
  );
}

import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell title="Page not found" intro="That page doesn't exist (yet).">
      <Link href="/" className="text-sm text-accent hover:underline">
        ← Back home
      </Link>
    </PageShell>
  );
}

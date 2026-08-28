import { EntryCards } from "@/components/entry-list";
import { EmptyState, PageShell } from "@/components/page-shell";
import { COLLECTIONS, getEntries } from "@/lib/content";

export const metadata = {
  title: "Cheat Sheets",
  description: "Quick references I keep coming back to.",
};

export default function CheatSheetsPage() {
  const sheets = getEntries("cheatsheets");

  return (
    <PageShell
      tone="cheatsheets"
      title="Cheat Sheets"
      intro="Quick references I keep coming back to — syntax, shortcuts and the things that never stick."
    >
      {sheets.length > 0 ? (
        <EntryCards entries={sheets} />
      ) : (
        <EmptyState>{COLLECTIONS.cheatsheets.empty}</EmptyState>
      )}
    </PageShell>
  );
}

import { EntryCards, TagList } from "@/components/entry-list";
import { EmptyState, PageShell } from "@/components/page-shell";
import { COLLECTIONS, getEntries, getTags } from "@/lib/content";

export const metadata = {
  title: "Cheat Sheets",
  description: "Quick references I keep coming back to.",
};

export default function CheatSheetsPage() {
  const sheets = getEntries("cheatsheets");
  const tags = getTags("cheatsheets");

  return (
    <PageShell
      tone="cheatsheets"
      title="Cheat Sheets"
      intro="Quick references I keep coming back to — syntax, shortcuts and the things that never stick."
    >
      {tags.length > 0 ? (
        <div className="mb-10">
          <TagList tags={tags} />
        </div>
      ) : null}

      {sheets.length > 0 ? (
        <EntryCards entries={sheets} />
      ) : (
        <EmptyState>{COLLECTIONS.cheatsheets.empty}</EmptyState>
      )}
    </PageShell>
  );
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { SignOutButton } from "@/components/sign-out-button";
import { EntryRow } from "@/components/journal/entry-row";
import { createEntry } from "@/app/journal/actions";
import { createClient } from "@/utils/supabase/server";
import type { JournalEntrySummary } from "@/types/journal";

export const metadata: Metadata = {
  title: "Journal",
  robots: { index: false, follow: false },
};

// Always render fresh — the entry list changes as pages are added/edited.
export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default async function JournalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirectTo=/journal");

  const { data, error } = await supabase
    .from("journal_entries")
    .select("id, title, updated_at")
    .order("updated_at", { ascending: false });

  const entries = (data ?? []) as JournalEntrySummary[];

  return (
    <Container size="prose" className="py-16 sm:py-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl">Journal</h1>
          <p className="text-muted mt-1 text-sm">
            Signed in as <span className="text-fg">{user.email}</span>
          </p>
        </div>
        <SignOutButton />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">
          {entries.length} {entries.length === 1 ? "page" : "pages"}
        </h2>
        <form action={createEntry}>
          <button
            type="submit"
            className="bg-accent text-accent-contrast hover:bg-accent-hover rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            New entry
          </button>
        </form>
      </div>

      {error ? (
        <p className="border-border bg-surface text-muted mt-8 rounded-md border p-4 text-sm">
          Could not load entries. If this is the first run, make sure the{" "}
          <code>journal_entries</code> table and its RLS policies have been created (see the
          migration in <code>supabase/migrations</code>).
        </p>
      ) : entries.length === 0 ? (
        <p className="text-muted mt-10">
          No pages yet. Start your notebook with <span className="text-fg">New entry</span>.
        </p>
      ) : (
        <ul className="border-border mt-6 border-t">
          {entries.map((entry) => (
            <EntryRow
              key={entry.id}
              id={entry.id}
              title={entry.title}
              updatedLabel={dateFmt.format(new Date(entry.updated_at))}
            />
          ))}
        </ul>
      )}
    </Container>
  );
}

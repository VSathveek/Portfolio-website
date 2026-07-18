import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { JournalEditor } from "@/components/journal/journal-editor";
import type { JournalEntry } from "@/types/journal";

export const metadata: Metadata = {
  title: "Entry",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function JournalEntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?redirectTo=/journal/${id}`);

  // RLS ensures this returns a row only if the current user owns it.
  const { data: entry } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("id", id)
    .maybeSingle<JournalEntry>();

  if (!entry) notFound();

  return <JournalEditor entryId={entry.id} title={entry.title} initialScene={entry.scene} />;
}

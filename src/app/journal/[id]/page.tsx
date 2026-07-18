import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/container";
import { createClient } from "@/utils/supabase/server";
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

  return (
    <Container size="prose" className="py-12 sm:py-16">
      <Link href="/journal" className="text-accent hover:text-accent-hover text-sm">
        ← All pages
      </Link>
      <h1 className="mt-4 text-2xl sm:text-3xl">{entry.title}</h1>
      <p className="border-border bg-surface text-muted mt-8 rounded-md border p-6 text-sm">
        The drawing editor lands in Phase 5. This page will host the Excalidraw canvas with
        debounced autosave for this entry.
      </p>
    </Container>
  );
}

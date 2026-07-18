/** A journal entry as stored in Supabase (see the journal_entries migration). */
export type JournalEntry = {
  id: string;
  user_id: string;
  title: string;
  /** Excalidraw scene JSON; null until the editor first saves (Phase 5). */
  scene: unknown | null;
  created_at: string;
  updated_at: string;
};

/** Lightweight shape used by the entry list. */
export type JournalEntrySummary = Pick<JournalEntry, "id" | "title" | "updated_at">;

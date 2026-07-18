"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

/** Ensures there's a signed-in user; returns the Supabase client and user id. */
async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirectTo=/journal");
  return { supabase, userId: user.id };
}

/** Create a blank entry and open it in the editor. */
export async function createEntry() {
  const { supabase, userId } = await requireUser();

  const { data, error } = await supabase
    .from("journal_entries")
    .insert({ user_id: userId, title: "Untitled" })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(`Could not create entry: ${error?.message ?? "unknown error"}`);
  }

  revalidatePath("/journal");
  redirect(`/journal/${data.id}`);
}

/** Rename an entry the current user owns (RLS enforces ownership). */
export async function renameEntry(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  if (!id) return;

  const { supabase } = await requireUser();
  const { error } = await supabase
    .from("journal_entries")
    .update({ title: title || "Untitled" })
    .eq("id", id);

  if (error) throw new Error(`Could not rename entry: ${error.message}`);
  revalidatePath("/journal");
}

/** Delete an entry the current user owns (RLS enforces ownership). */
export async function deleteEntry(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { supabase } = await requireUser();
  const { error } = await supabase.from("journal_entries").delete().eq("id", id);

  if (error) throw new Error(`Could not delete entry: ${error.message}`);
  revalidatePath("/journal");
}

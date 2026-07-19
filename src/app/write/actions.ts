"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirectTo=/write");
  return { supabase, userId: user.id };
}

/** Create a blank draft and open it in the studio. */
export async function createPost() {
  const { supabase, userId } = await requireUser();

  const slug = `untitled-${crypto.randomUUID().slice(0, 8)}`;
  const { data, error } = await supabase
    .from("posts")
    .insert({ user_id: userId, slug, title: "Untitled", content: [] })
    .select("id")
    .single();

  if (error || !data) throw new Error(`Could not create post: ${error?.message ?? "unknown"}`);

  revalidatePath("/write");
  redirect(`/write/${data.id}`);
}

/** Delete one of the current user's posts (RLS enforces ownership). */
export async function deletePost(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const { supabase } = await requireUser();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(`Could not delete post: ${error.message}`);

  revalidatePath("/write");
  revalidatePath("/blog");
}

/** Publish or unpublish a post; stamps published_at on first publish. */
export async function setPublished(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const publish = String(formData.get("publish") ?? "") === "true";
  if (!id) return;

  const { supabase } = await requireUser();

  const patch: { published: boolean; published_at?: string } = { published: publish };
  if (publish) {
    const { data } = await supabase.from("posts").select("published_at").eq("id", id).maybeSingle();
    if (!data?.published_at) patch.published_at = new Date().toISOString();
  }

  const { error } = await supabase.from("posts").update(patch).eq("id", id);
  if (error) throw new Error(`Could not update post: ${error.message}`);

  revalidatePath("/write");
  revalidatePath("/blog");
}

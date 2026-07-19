import "server-only";
import { createClient } from "@/utils/supabase/server";
import type { Post, PostSummary } from "@/types/post";

/**
 * Public post queries. These run under the visitor's session (or anon), so RLS
 * returns only published posts to the public — drafts stay invisible.
 */

export async function getPublishedPosts(): Promise<PostSummary[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("slug, title, description, published_at, updated_at")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false });

  return (data ?? []).map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: (p.published_at ?? p.updated_at) as string,
  }));
}

export async function getPublishedPost(slug: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle<Post>();

  return data ?? null;
}

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatPostDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : dateFmt.format(d);
}

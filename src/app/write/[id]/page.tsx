import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { PostEditor } from "@/components/write/post-editor";
import type { Post } from "@/types/post";

export const metadata: Metadata = {
  title: "Edit post",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?redirectTo=/write/${id}`);

  const { data: post } = await supabase.from("posts").select("*").eq("id", id).maybeSingle<Post>();

  if (!post) notFound();

  return <PostEditor post={post} />;
}

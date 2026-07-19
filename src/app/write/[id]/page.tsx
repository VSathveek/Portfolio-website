import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/container";
import { createClient } from "@/utils/supabase/server";
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

  return (
    <Container size="prose" className="py-12 sm:py-16">
      <Link href="/write" className="text-accent hover:text-accent-hover text-sm">
        ← All posts
      </Link>
      <h1 className="mt-4 text-2xl sm:text-3xl">{post.title}</h1>
      <p className="border-border bg-surface text-muted mt-8 rounded-md border p-6 text-sm">
        The block editor (rich text + drawings) is added in the next step.
      </p>
    </Container>
  );
}

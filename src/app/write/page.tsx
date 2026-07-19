import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { SignOutButton } from "@/components/sign-out-button";
import { PostRow } from "@/components/write/post-row";
import { createPost } from "@/app/write/actions";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

type Row = { id: string; title: string; published: boolean; updated_at: string };

export default async function WritePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirectTo=/write");

  const { data } = await supabase
    .from("posts")
    .select("id, title, published, updated_at")
    .order("updated_at", { ascending: false });

  const posts = (data ?? []) as Row[];

  return (
    <Container size="prose" className="py-16 sm:py-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl">Writing studio</h1>
          <p className="text-muted mt-1 text-sm">
            Signed in as <span className="text-fg">{user.email}</span>
          </p>
        </div>
        <SignOutButton />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </h2>
        <form action={createPost}>
          <button
            type="submit"
            className="bg-accent text-accent-contrast hover:bg-accent-hover rounded-md px-4 py-2 text-sm font-medium transition-colors"
          >
            New post
          </button>
        </form>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted mt-10">
          No posts yet. Start writing with <span className="text-fg">New post</span>.
        </p>
      ) : (
        <ul className="border-border mt-6 border-t">
          {posts.map((p) => (
            <PostRow
              key={p.id}
              id={p.id}
              title={p.title}
              published={p.published}
              updatedLabel={dateFmt.format(new Date(p.updated_at))}
            />
          ))}
        </ul>
      )}
    </Container>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { getPublishedPosts, formatPostDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes and write-ups on machine learning, interpretability, and engineering.",
};

// Reads from the database — render per request (drafts never appear here).
export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHeader
        title="Writing"
        lead="Occasional notes on the things I work on — interpretability, retrieval, and engineering."
      />

      <Container size="prose" className="py-8">
        {posts.length === 0 ? (
          <p className="text-muted">No posts yet.</p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <p className="text-faint text-xs">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </p>
                <h2 className="mt-1 text-xl leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                    {post.title}
                  </Link>
                </h2>
                {post.description && (
                  <p className="text-muted mt-2 leading-relaxed">{post.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}

        <p className="text-faint mt-12 text-sm">
          <a href="/blog/rss.xml" className="hover:text-accent">
            RSS feed ↗
          </a>
        </p>
      </Container>
    </>
  );
}

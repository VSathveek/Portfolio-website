import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { PostContent } from "@/components/blog/post-content";
import { getPublishedPost, formatPostDate } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description ?? undefined,
    openGraph: {
      title: post.title,
      description: post.description ?? undefined,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const date = post.published_at ?? post.updated_at;

  return (
    <Container size="prose" className="py-16 sm:py-20">
      <Link href="/blog" className="text-accent hover:text-accent-hover text-sm">
        ← Writing
      </Link>

      <article className="mt-6">
        <header>
          <p className="text-faint text-sm">
            <time dateTime={date}>{formatPostDate(date)}</time>
          </p>
          <h1 className="mt-2 text-3xl leading-tight sm:text-4xl">{post.title}</h1>
          {post.description && <p className="text-muted mt-3 text-lg">{post.description}</p>}
        </header>

        <div className="mt-8">
          <PostContent blocks={post.content} />
        </div>
      </article>
    </Container>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/container";
import { getAllPosts, getPost, formatPostDate } from "@/lib/blog";

// Pre-render every post at build time.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <Container size="prose" className="py-16 sm:py-20">
      <Link href="/blog" className="text-accent hover:text-accent-hover text-sm">
        ← Writing
      </Link>

      <article className="mt-6">
        <header>
          <p className="text-faint text-sm">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </p>
          <h1 className="mt-2 text-3xl leading-tight sm:text-4xl">{post.title}</h1>
        </header>

        {/* prose gives reading-friendly typography; prose-invert handles dark mode. */}
        <div className="prose prose-neutral dark:prose-invert prose-a:text-accent prose-headings:font-serif prose-headings:font-medium mt-8 max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </Container>
  );
}

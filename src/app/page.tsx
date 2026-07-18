import Link from "next/link";
import { Container } from "@/components/container";
import { site } from "@/lib/site";

// Phase 1: a minimal hero that exercises the design system (type scale,
// accent, tokens). The full bio, research interests, and links are built
// out in Phase 2.
export default function Home() {
  return (
    <Container size="prose" className="py-20 sm:py-28">
      <p className="text-faint text-sm font-medium tracking-wide uppercase">{site.tagline}</p>
      <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{site.name}</h1>
      <p className="text-muted mt-6 text-lg leading-relaxed">
        I study machine learning and its internals — from retrieval-augmented systems to the
        mechanistic interpretability of transformers.{" "}
        {/* TODO(me): confirm/tune this one-line summary in Phase 2. */}
      </p>

      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {site.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-accent hover:text-accent-hover transition-colors"
          >
            {s.label}
          </a>
        ))}
      </div>

      <p className="text-faint mt-12 text-sm">
        Full bio, research, and projects arrive next —{" "}
        <Link href="/research" className="text-accent hover:text-accent-hover">
          research
        </Link>{" "}
        and{" "}
        <Link href="/projects" className="text-accent hover:text-accent-hover">
          projects
        </Link>
        .
      </p>
    </Container>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Tag } from "@/components/tag";
import { site } from "@/lib/site";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  description: `${site.name} — ${site.tagline}. Research in mechanistic interpretability, retrieval-augmented generation, and applied machine learning.`,
};

const featured = projects.filter((p) => p.featured);

export default function Home() {
  return (
    <>
      {/* Intro / bio */}
      <Container size="prose" className="pt-16 pb-8 sm:pt-24">
        <p className="text-faint text-sm font-medium tracking-wide uppercase">{site.tagline}</p>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">{site.name}</h1>

        <div className="text-muted mt-6 space-y-4 text-lg leading-relaxed">
          {profile.bio.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>

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
      </Container>

      {/* Research interests */}
      <Container size="prose" className="py-8">
        <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">
          Research interests
        </h2>
        <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {profile.interests.map((interest) => (
            <li key={interest} className="text-muted flex gap-2">
              <span aria-hidden="true" className="text-accent">
                ·
              </span>
              {interest}
            </li>
          ))}
        </ul>
      </Container>

      {/* Selected work */}
      <Container size="prose" className="py-8">
        <div className="flex items-baseline justify-between">
          <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">
            Selected work
          </h2>
          <Link
            href="/projects"
            className="text-accent hover:text-accent-hover text-sm transition-colors"
          >
            All projects →
          </Link>
        </div>

        <ul className="mt-6 space-y-8">
          {featured.map((p) => (
            <li key={p.title}>
              <h3 className="text-xl">
                {p.repo ? (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {p.title}
                  </a>
                ) : (
                  p.title
                )}
              </h3>
              <p className="text-muted mt-2 leading-relaxed">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Tag } from "@/components/tag";
import { Aurora } from "@/components/motion/aurora";
import { Marquee } from "@/components/motion/marquee";
import { Counter } from "@/components/motion/counter";
import { Reveal, RevealLines } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { OpenSource } from "@/components/open-source";
import { site } from "@/lib/site";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { ossStats } from "@/data/opensource";

export const metadata: Metadata = {
  description: `${site.name}. ${site.tagline}. Document ingestion, retrieval-augmented generation, and the Python services around them. Contributor to Docling and Unstructured.`,
};

const featured = projects.filter((p) => p.featured);

/** Scrolling capability ticker under the hero. Decorative reinforcement. */
const stack = [
  "Python",
  "FastAPI",
  "PyTorch",
  "RAG",
  "Docling",
  "Unstructured",
  "FAISS",
  "OCR",
  "PostgreSQL",
  "React",
  "TypeScript",
  "Docker",
  "AWS",
  "Rust",
];

export default function Home() {
  const { availability } = site;

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/*  Hero                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden">
        <Aurora />

        <Container size="wide" className="pt-20 pb-14 sm:pt-28 sm:pb-20">
          {availability.open && (
            <Reveal y={8}>
              <p className="border-border bg-surface/70 text-muted inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-sm backdrop-blur">
                <span className="relative inline-flex size-2">
                  <span className="pulse-dot absolute inset-0" aria-hidden="true" />
                  <span className="bg-positive relative inline-flex size-2 rounded-full" />
                </span>
                {availability.label}
              </p>
            </Reveal>
          )}

          <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight sm:text-7xl">
            <RevealLines
              lines={["Varanasi", "Sathveek"]}
              lineClassName="text-gradient"
              step={110}
            />
          </h1>

          <Reveal delay={320} y={16} className="mt-6 max-w-[62ch]">
            <p className="text-fg text-xl leading-relaxed sm:text-2xl">
              I make document pipelines accurate, so your model reasons over what the file actually
              said.
            </p>
          </Reveal>

          <Reveal delay={420} y={16} className="mt-5 max-w-[62ch]">
            <p className="text-muted leading-relaxed">
              Contributor to{" "}
              <a
                href="https://github.com/docling-project/docling"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover link-underline transition-colors"
              >
                Docling
              </a>{" "}
              (IBM) and{" "}
              <a
                href="https://github.com/Unstructured-IO/unstructured"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover link-underline transition-colors"
              >
                Unstructured
              </a>
              . {availability.detail}.
            </p>
          </Reveal>

          {/* Calls to action */}
          <Reveal delay={520} y={16} className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="bg-fg text-bg inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start a project
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <Link
              href="/projects"
              className="border-border text-fg hover:border-accent inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
            >
              See the work
            </Link>
            <a
              href="/Varanasi_Sathveek_CV.pdf"
              className="text-muted hover:text-fg link-underline inline-flex items-center px-1 py-2.5 text-sm transition-colors"
            >
              Download CV
            </a>
          </Reveal>

          {/* Headline numbers */}
          <Reveal delay={620} y={16} className="mt-12">
            <dl className="grid max-w-xl grid-cols-3 gap-6">
              <div>
                <dt className="text-faint text-xs tracking-wide uppercase">Merged upstream PRs</dt>
                <dd className="text-fg mt-1.5 font-serif text-3xl">
                  <Counter value={ossStats.merged} />
                </dd>
              </div>
              <div>
                <dt className="text-faint text-xs tracking-wide uppercase">
                  Engineering internships
                </dt>
                <dd className="text-fg mt-1.5 font-serif text-3xl">
                  <Counter value={3} />
                </dd>
              </div>
              <div>
                <dt className="text-faint text-xs tracking-wide uppercase">Shipped projects</dt>
                <dd className="text-fg mt-1.5 font-serif text-3xl">
                  <Counter value={projects.length} suffix="+" />
                </dd>
              </div>
            </dl>
          </Reveal>
        </Container>

        {/* Capability ticker */}
        <div className="border-border/70 border-y py-4">
          <Marquee duration={44}>
            {stack.map((item) => (
              <span
                key={item}
                className="text-faint flex items-center gap-8 px-4 font-mono text-sm whitespace-nowrap"
              >
                {item}
                <span className="bg-border size-1 rounded-full" aria-hidden="true" />
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Upstream open source, the strongest proof, so it goes first     */}
      {/* ---------------------------------------------------------------- */}
      <OpenSource />

      {/* ---------------------------------------------------------------- */}
      {/*  Services                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Container size="wide" className="py-16 sm:py-20">
        <Reveal>
          <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">
            What I can help with
          </h2>
        </Reveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {profile.services.map((service, i) => (
            <Reveal as="li" key={service.title} delay={i * 80} y={18} className="h-full">
              <SpotlightCard className="h-full p-6">
                <h3 className="text-fg text-lg">{service.title}</h3>
                <p className="text-muted mt-2.5 leading-relaxed">{service.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </Container>

      {/* ---------------------------------------------------------------- */}
      {/*  Selected work                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Container size="wide" className="py-16 sm:py-20">
        <Reveal>
          <div className="flex items-baseline justify-between">
            <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">
              Selected work
            </h2>
            <Link
              href="/projects"
              className="text-accent hover:text-accent-hover link-underline text-sm transition-colors"
            >
              All projects →
            </Link>
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 90} y={18} className="h-full">
              <SpotlightCard className="flex h-full flex-col p-6">
                <h3 className="text-xl">
                  {p.repo ? (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent link-underline transition-colors"
                    >
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                </h3>
                <p className="text-muted mt-3 flex-1 leading-relaxed">{p.description}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </Container>

      {/* ---------------------------------------------------------------- */}
      {/*  Research interests                                              */}
      {/* ---------------------------------------------------------------- */}
      <Container size="wide" className="py-16 sm:py-20">
        <Reveal>
          <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">
            Research interests
          </h2>
        </Reveal>
        <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {profile.interests.map((interest, i) => (
            <Reveal as="li" key={interest} delay={i * 60} y={10}>
              <span className="text-muted border-border flex gap-3 border-b py-3">
                <span aria-hidden="true" className="text-accent font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {interest}
              </span>
            </Reveal>
          ))}
        </ul>
      </Container>

      {/* ---------------------------------------------------------------- */}
      {/*  Closing call to action                                          */}
      {/* ---------------------------------------------------------------- */}
      <Container size="wide" className="pt-8 pb-24">
        <Reveal y={20}>
          <SpotlightCard className="relative overflow-hidden p-8 text-center sm:p-14">
            <div
              aria-hidden="true"
              className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-60"
            />
            <h2 className="font-serif text-3xl sm:text-4xl">
              Got documents your pipeline can&apos;t read properly?
            </h2>
            <p className="text-muted mx-auto mt-4 max-w-[52ch] leading-relaxed">
              Send me a sample and what it should produce. I&apos;ll tell you where the accuracy is
              being lost, and whether it&apos;s worth paying someone to fix.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="bg-fg text-bg inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
              >
                Get in touch
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="border-border text-fg hover:border-accent inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
              >
                {site.email}
              </a>
            </div>
          </SpotlightCard>
        </Reveal>
      </Container>
    </>
  );
}

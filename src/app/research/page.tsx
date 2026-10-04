import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { papers } from "@/data/research";
import { experience } from "@/data/experience";
import { contributions } from "@/data/opensource";

export const metadata: Metadata = {
  title: "Research & Experience",
  description:
    "Mechanistic interpretability of transformers, retrieval and document understanding, graph-based analysis of relational data, and upstream open-source work.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        title="Research & Experience"
        size="wide"
        lead="I work on the internals of machine-learning systems: interpretability, retrieval, document understanding, and structure in relational data. Some of it is research, some of it ships."
      />

      {/* Working papers */}
      <Container size="wide" className="py-10">
        <Reveal>
          <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">
            Working papers
          </h2>
        </Reveal>

        <ul className="mt-8 space-y-4">
          {papers.map((paper, i) => (
            <Reveal as="li" key={paper.title} delay={i * 80} y={16}>
              <SpotlightCard className="p-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                  <h3 className="text-lg leading-snug">{paper.title}</h3>
                  {paper.status && (
                    <span className="border-border text-muted shrink-0 rounded-full border px-2.5 py-0.5 text-xs">
                      {paper.status}
                    </span>
                  )}
                </div>
                <p className="text-faint mt-2 text-sm">
                  {paper.authors} · {paper.venue} · {paper.year}
                </p>
                {paper.description && (
                  <p className="text-muted mt-3.5 leading-relaxed">{paper.description}</p>
                )}
                {paper.links && paper.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-x-5 text-sm">
                    {paper.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent-hover link-underline transition-colors"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </Container>

      {/* Open source, framed as engineering research output rather than a list */}
      <Container size="wide" className="py-10">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">
              Upstream contributions
            </h2>
            <p className="text-faint text-sm">
              Fixes to the document-parsing libraries that RAG systems depend on
            </p>
          </div>
        </Reveal>

        <ol className="border-border mt-8 border-t">
          {contributions.map((c, i) => (
            <Reveal as="li" key={c.pr} delay={i * 70} y={12}>
              <div className="border-border flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b py-5">
                <div className="min-w-0 flex-1">
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg hover:text-accent link-underline font-mono text-sm transition-colors"
                  >
                    {c.repo} #{c.pr}
                  </a>
                  <p className="text-muted mt-1.5 leading-relaxed">{c.title}</p>
                </div>
                <span className="text-faint shrink-0 text-sm">
                  {c.status === "merged"
                    ? c.shippedIn
                      ? `Merged, ${c.shippedIn}`
                      : "Merged"
                    : "In review"}
                </span>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>

      {/* Experience */}
      <Container size="wide" className="py-10 pb-24">
        <Reveal>
          <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">Experience</h2>
        </Reveal>

        <ol className="mt-8 space-y-4">
          {experience.map((job, i) => (
            <Reveal as="li" key={`${job.org}-${job.period}`} delay={i * 80} y={16}>
              <SpotlightCard className="p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg leading-snug">{job.role}</h3>
                  <span className="text-faint text-sm">{job.period}</span>
                </div>
                <p className="text-muted mt-1">
                  {job.org} <span className="text-faint">· {job.location}</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {job.points.map((point) => (
                    <li
                      key={point.slice(0, 32)}
                      className="text-muted flex gap-2.5 leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-accent mt-2.5 size-1 shrink-0 rounded-full"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </ol>
      </Container>
    </>
  );
}

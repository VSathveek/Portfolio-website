import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { papers } from "@/data/research";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research and experience: mechanistic interpretability of transformers, retrieval-augmented systems, and graph-based analysis of relational data.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        title="Research & Experience"
        lead="I work on the internals of machine-learning systems — interpretability, retrieval, and structure in relational data — across independent research and internships."
      />

      {/* Working papers / manuscripts */}
      <Container size="prose" className="py-8">
        <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">Working papers</h2>
        <ul className="mt-6 space-y-8">
          {papers.map((paper) => (
            <li key={paper.title}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg leading-snug">{paper.title}</h3>
                {paper.status && (
                  <span className="border-border text-muted rounded-full border px-2 py-0.5 text-xs">
                    {paper.status}
                  </span>
                )}
              </div>
              <p className="text-faint mt-1 text-sm">
                {paper.authors} · {paper.venue} · {paper.year}
              </p>
              {paper.description && (
                <p className="text-muted mt-3 leading-relaxed">{paper.description}</p>
              )}
              {paper.links && paper.links.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-x-4 text-sm">
                  {paper.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent-hover"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </Container>

      {/* Experience — academic-CV style */}
      <Container size="prose" className="py-8">
        <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">Experience</h2>
        <ol className="mt-6 space-y-10">
          {experience.map((job) => (
            <li key={`${job.org}-${job.period}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg leading-snug">{job.role}</h3>
                <span className="text-faint text-sm">{job.period}</span>
              </div>
              <p className="text-muted mt-0.5">
                {job.org} · <span className="text-faint">{job.location}</span>
              </p>
              <ul className="mt-3 space-y-2">
                {job.points.map((point) => (
                  <li key={point.slice(0, 32)} className="text-muted flex gap-2.5 leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="bg-accent mt-2 size-1 shrink-0 rounded-full"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </>
  );
}

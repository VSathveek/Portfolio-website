import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { Aurora } from "@/components/motion/aurora";
import { CopyButton } from "@/components/copy-button";
import { site } from "@/lib/site";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { contributions } from "@/data/opensource";

export const metadata: Metadata = {
  title: "CV",
  description:
    "Curriculum vitae of Varanasi Sathveek: education, experience, open-source contributions, projects, skills and awards.",
};

/** Downloadable PDF, kept in /public and regenerated from the same resume. */
const CV_PDF = "/Varanasi_Sathveek_CV.pdf";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-border text-faint mt-14 mb-5 border-b pb-2 text-sm font-semibold tracking-wide uppercase">
      {children}
    </h2>
  );
}

/** Bulleted point with the accent dot used throughout the CV. */
function Point({ children }: { children: React.ReactNode }) {
  return (
    <li className="text-muted flex gap-2.5 leading-relaxed">
      <span aria-hidden="true" className="bg-accent mt-2.5 size-1 shrink-0 rounded-full" />
      <span>{children}</span>
    </li>
  );
}

export default function CvPage() {
  const featured = projects.filter((p) => p.featured);
  const merged = contributions.filter((c) => c.status === "merged");

  return (
    <>
      {/* Masthead. Screen only: the PDF already has its own header. */}
      <section className="relative isolate overflow-hidden print:hidden">
        <Aurora className="opacity-70" />
        <Container size="prose" className="pt-16 pb-8 sm:pt-24">
          <Reveal y={10}>
            <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">Curriculum Vitae</h1>
          </Reveal>

          <Reveal delay={100} y={12}>
            <p className="text-muted mt-4 leading-relaxed">
              {site.tagline}. Based in {site.location}, working remotely worldwide.
            </p>
          </Reveal>

          <Reveal delay={180} y={12}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={CV_PDF}
                download
                className="bg-fg text-bg inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
              >
                Download PDF
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
                  <path d="M12 3v12M7 11l5 5 5-5M5 21h14" />
                </svg>
              </a>
              <a
                href={CV_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border text-fg hover:border-accent inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
              >
                Open PDF in a new tab
              </a>
              <CopyButton value={site.email} className="px-3.5 py-2" />
            </div>
          </Reveal>

          <Reveal delay={240} y={10}>
            <ul className="text-muted mt-6 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-accent link-underline transition-colors"
                >
                  {site.email}
                </a>
              </li>
              {site.socials
                .filter((s) => s.href.startsWith("http"))
                .map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent link-underline transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <Container size="prose" className="pb-24">
        {/* Education */}
        <SectionHeading>Education</SectionHeading>
        <Reveal y={12}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-lg leading-snug">{profile.education.school}</h3>
            <span className="text-faint text-sm">{profile.education.period}</span>
          </div>
          <p className="text-muted mt-1">
            {profile.education.degree}. {profile.education.detail}
          </p>
          <p className="text-faint mt-0.5 text-sm">{profile.education.location}</p>
          <p className="text-muted mt-3 text-sm leading-relaxed">
            <span className="text-faint">Relevant coursework: </span>
            {profile.education.coursework.join(", ")}.
          </p>
        </Reveal>

        {/* Experience */}
        <SectionHeading>Experience</SectionHeading>
        <ol className="space-y-9">
          {experience.map((job, i) => (
            <Reveal as="li" key={`${job.org}-${job.period}`} delay={i * 70} y={14}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-lg leading-snug">
                  {job.role}, {job.org}
                </h3>
                <span className="text-faint text-sm">{job.period}</span>
              </div>
              <p className="text-faint mt-0.5 text-sm">
                {job.location}
                {job.context ? ` · ${job.context}` : ""}
              </p>
              <ul className="mt-3 space-y-2">
                {job.points.map((point) => (
                  <Point key={point.slice(0, 32)}>{point}</Point>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>

        {/* Open source. Placed above projects because it is third-party verified. */}
        <SectionHeading>Open-source contributions</SectionHeading>
        <ul className="space-y-6">
          {contributions.map((c, i) => (
            <Reveal as="li" key={c.pr} delay={i * 70} y={14}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="leading-snug">
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent link-underline transition-colors"
                  >
                    {c.repo}
                  </a>{" "}
                  <span className="text-faint font-mono text-sm">#{c.pr}</span>
                </h3>
                <span className="text-faint text-sm">
                  {c.status === "merged"
                    ? c.shippedIn
                      ? `Merged, ${c.shippedIn}`
                      : "Merged"
                    : "In review"}
                </span>
              </div>
              <p className="text-muted mt-1.5 text-sm">
                {c.title} <span className="text-faint">({c.org})</span>
              </p>
            </Reveal>
          ))}
        </ul>

        {/* Selected projects */}
        <SectionHeading>Selected projects</SectionHeading>
        <ul className="space-y-6">
          {featured.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 70} y={14}>
              <h3 className="leading-snug">
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
                )}{" "}
                <span className="text-faint text-sm">({p.tags.join(", ")})</span>
              </h3>
              <p className="text-muted mt-1.5 leading-relaxed">{p.description}</p>
            </Reveal>
          ))}
        </ul>

        {/* Skills */}
        <SectionHeading>Technical skills</SectionHeading>
        <Reveal y={12}>
          <dl className="space-y-3.5">
            {skillGroups.map((group) => (
              <div key={group.label} className="sm:flex sm:gap-5">
                <dt className="text-fg shrink-0 font-medium sm:w-52">{group.label}</dt>
                <dd className="text-muted">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Achievements */}
        <SectionHeading>Achievements</SectionHeading>
        <Reveal y={12}>
          <ul className="space-y-2">
            {profile.achievements.map((a) => (
              <Point key={a.slice(0, 32)}>{a}</Point>
            ))}
          </ul>
        </Reveal>

        {/* Closing line, screen only. */}
        <Reveal y={14}>
          <p className="border-border text-muted mt-14 border-t pt-8 leading-relaxed print:hidden">
            {merged.length > 0 && (
              <>
                {merged.length} merged upstream contribution
                {merged.length === 1 ? "" : "s"} to document-parsing libraries.{" "}
              </>
            )}
            Available for remote contract work.{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent hover:text-accent-hover link-underline transition-colors"
            >
              Get in touch
            </a>
            .
          </p>
        </Reveal>
      </Container>
    </>
  );
}

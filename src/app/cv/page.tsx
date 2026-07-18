import type { Metadata } from "next";
import { Container } from "@/components/container";
import { profile } from "@/data/profile";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum vitae of Varanasi Sathveek — education, experience, skills, and awards.",
};

/** Path to the downloadable PDF (lives in /public). */
const CV_PDF = "/Varanasi_Sathveek_CV.pdf";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-border text-faint mt-12 mb-4 border-b pb-1 text-sm font-semibold tracking-wide uppercase">
      {children}
    </h2>
  );
}

export default function CvPage() {
  const featured = projects.filter((p) => p.featured);

  return (
    <Container size="prose" className="py-16 sm:py-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl sm:text-4xl">Curriculum Vitae</h1>
        <a
          href={CV_PDF}
          download
          className="bg-accent text-accent-contrast hover:bg-accent-hover inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          Download PDF ↓
        </a>
      </div>

      {/* Education */}
      <SectionHeading>Education</SectionHeading>
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 className="text-lg leading-snug">{profile.education.school}</h3>
          <span className="text-faint text-sm">{profile.education.period}</span>
        </div>
        <p className="text-muted mt-0.5">
          {profile.education.degree} · {profile.education.detail}
        </p>
        <p className="text-muted mt-3 text-sm">
          <span className="text-faint">Relevant coursework: </span>
          {profile.education.coursework.join(", ")}.
        </p>
      </div>

      {/* Experience */}
      <SectionHeading>Experience</SectionHeading>
      <ol className="space-y-8">
        {experience.map((job) => (
          <li key={`${job.org}-${job.period}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-lg leading-snug">
                {job.role}, {job.org}
              </h3>
              <span className="text-faint text-sm">{job.period}</span>
            </div>
            <p className="text-faint mt-0.5 text-sm">{job.location}</p>
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

      {/* Selected projects */}
      <SectionHeading>Selected Projects</SectionHeading>
      <ul className="space-y-5">
        {featured.map((p) => (
          <li key={p.title}>
            <h3 className="leading-snug">
              {p.title} <span className="text-faint">— {p.tags.join(", ")}</span>
            </h3>
            <p className="text-muted mt-1 leading-relaxed">{p.description}</p>
          </li>
        ))}
      </ul>

      {/* Technical skills */}
      <SectionHeading>Technical Skills</SectionHeading>
      <dl className="space-y-3">
        {skillGroups.map((group) => (
          <div key={group.label} className="sm:flex sm:gap-4">
            <dt className="shrink-0 font-medium sm:w-44">{group.label}</dt>
            <dd className="text-muted">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>

      {/* Achievements */}
      <SectionHeading>Achievements</SectionHeading>
      <ul className="space-y-2">
        {profile.achievements.map((a) => (
          <li key={a.slice(0, 32)} className="text-muted flex gap-2.5 leading-relaxed">
            <span aria-hidden="true" className="bg-accent mt-2 size-1 shrink-0 rounded-full" />
            {a}
          </li>
        ))}
      </ul>
    </Container>
  );
}

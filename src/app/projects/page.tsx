import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Tag } from "@/components/tag";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { projects, type Project } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Document AI, retrieval and systems work, from a biomedical RAG assistant and trade-document risk screening to WebRTC recording infrastructure and a Rust Bluetooth mesh.",
};

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="flex h-full flex-col p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-xl leading-snug">{project.title}</h3>
        {project.year && <span className="text-faint text-sm">{project.year}</span>}
      </div>

      <p className="text-muted mt-3 flex-1 leading-relaxed">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      {(project.repo || project.demo) && (
        <div className="mt-5 flex flex-wrap gap-x-5 text-sm">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover link-underline transition-colors"
            >
              Code ↗
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover link-underline transition-colors"
            >
              Demo ↗
            </a>
          )}
        </div>
      )}
    </SpotlightCard>
  );
}

function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <ul className="mt-8 grid gap-4 md:grid-cols-2">
      {items.map((p, i) => (
        <Reveal as="li" key={p.title} delay={i * 80} y={18} className="h-full">
          <ProjectCard project={p} />
        </Reveal>
      ))}
    </ul>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        size="wide"
        lead="Document AI and retrieval work first, then the systems and research builds around it. Every project links to its public repository."
      />

      <Container size="wide" className="py-10">
        <Reveal>
          <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">Selected</h2>
        </Reveal>
        <ProjectGrid items={featured} />
      </Container>

      <Container size="wide" className="py-10 pb-24">
        <Reveal>
          <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">
            More projects
          </h2>
        </Reveal>
        <ProjectGrid items={others} />
      </Container>
    </>
  );
}

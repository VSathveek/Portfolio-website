import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Tag } from "@/components/tag";
import { projects, type Project } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects in machine learning, retrieval, and full-stack development — from a biomedical RAG system to data dashboards and mobile apps.",
};

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);

function ProjectItem({ project }: { project: Project }) {
  return (
    <li>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-xl leading-snug">{project.title}</h3>
        {project.year && <span className="text-faint text-sm">{project.year}</span>}
      </div>
      <p className="text-muted mt-2 leading-relaxed">{project.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      {(project.repo || project.demo) && (
        <div className="mt-3 flex flex-wrap gap-x-4 text-sm">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover"
            >
              Code ↗
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover"
            >
              Demo ↗
            </a>
          )}
        </div>
      )}
    </li>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        lead="A mix of research-driven machine-learning work and full-stack builds. Code links are shown where the repositories are public."
      />

      <Container size="prose" className="py-8">
        <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">Selected</h2>
        <ul className="mt-6 space-y-10">
          {featured.map((p) => (
            <ProjectItem key={p.title} project={p} />
          ))}
        </ul>
      </Container>

      <Container size="prose" className="py-8">
        <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">More projects</h2>
        <ul className="mt-6 space-y-10">
          {others.map((p) => (
            <ProjectItem key={p.title} project={p} />
          ))}
        </ul>
      </Container>
    </>
  );
}

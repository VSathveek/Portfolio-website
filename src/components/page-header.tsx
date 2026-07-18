import { Container } from "@/components/container";

type PageHeaderProps = {
  title: string;
  lead?: string;
};

/** Consistent page title + optional lead paragraph across content pages. */
export function PageHeader({ title, lead }: PageHeaderProps) {
  return (
    <Container size="prose" className="pt-16 pb-4 sm:pt-20">
      <h1 className="text-3xl sm:text-4xl">{title}</h1>
      {lead && <p className="text-muted mt-4 text-lg leading-relaxed">{lead}</p>}
    </Container>
  );
}

import { Container } from "@/components/container";
import { Aurora } from "@/components/motion/aurora";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  title: string;
  lead?: string;
  /** `wide` matches the homepage grid; `prose` keeps the reading column. */
  size?: "prose" | "wide";
};

/**
 * Consistent page title + optional lead across content pages, over a cropped
 * version of the homepage's ambient backdrop so inner pages feel like the
 * same site rather than a plain document.
 */
export function PageHeader({ title, lead, size = "prose" }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Only the top third of the aurora shows through, enough for a tint. */}
      <Aurora className="opacity-70" />
      <Container size={size} className={cn("pt-16 pb-6 sm:pt-24 sm:pb-8")}>
        <Reveal y={10}>
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">{title}</h1>
        </Reveal>
        {lead && (
          <Reveal delay={110} y={12}>
            <p className="text-muted mt-5 max-w-[58ch] text-lg leading-relaxed">{lead}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — email and social links.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        lead="I'm happy to talk about research, collaborations, or interesting problems. Email is the best way to reach me."
      />

      <Container size="prose" className="py-8">
        <dl className="space-y-6">
          <div>
            <dt className="text-faint text-sm font-semibold tracking-wide uppercase">Email</dt>
            <dd className="mt-1">
              <a
                href={`mailto:${site.email}`}
                className="text-accent hover:text-accent-hover transition-colors"
              >
                {site.email}
              </a>
            </dd>
          </div>

          <div>
            <dt className="text-faint text-sm font-semibold tracking-wide uppercase">Elsewhere</dt>
            <dd className="mt-1">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {site.socials
                  .filter((s) => s.href.startsWith("http"))
                  .map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent-hover transition-colors"
                      >
                        {s.label} ↗
                      </a>
                    </li>
                  ))}
              </ul>
            </dd>
          </div>

          <div>
            <dt className="text-faint text-sm font-semibold tracking-wide uppercase">Location</dt>
            <dd className="text-muted mt-1">{site.location}</dd>
          </div>
        </dl>
      </Container>
    </>
  );
}

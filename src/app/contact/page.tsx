import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { CopyButton } from "@/components/copy-button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} about document ingestion, RAG pipelines and extraction work. Remote, worldwide.`,
};

/**
 * A pre-filled mail link. Giving people the shape of the first message gets a
 * far better brief than an empty compose window does, and it quietly filters
 * out enquiries that were never going to go anywhere.
 */
const mailto = (() => {
  const subject = "Project enquiry";
  const body = [
    "Hi Sathveek,",
    "",
    "What we're building:",
    "",
    "The document problem we're hitting:",
    "",
    "Sample files I can share: (yes / no)",
    "",
    "Rough timeline and budget:",
    "",
    "Thanks,",
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
})();

/** What makes an enquiry easy to answer well. */
const helpful = [
  {
    title: "A sample file",
    body: "One real document that is giving you trouble, redacted if it needs to be. This is the single most useful thing you can send.",
  },
  {
    title: "What it should produce",
    body: "The fields, the structure or the answer you expected to get out of it, and what you are getting instead.",
  },
  {
    title: "Where it sits",
    body: "Whether this is a prototype, something already in production, or a decision you are still weighing up.",
  },
  {
    title: "Timeline and budget",
    body: "Even a rough range. It tells me quickly whether I am the right person or whether I should point you elsewhere.",
  },
];

export default function ContactPage() {
  const { availability } = site;

  return (
    <>
      <PageHeader
        title="Get in touch"
        size="wide"
        lead="Send me a document your pipeline cannot read properly and what it should have produced. I will tell you where the accuracy is being lost, and whether it is worth paying someone to fix it."
      />

      <Container size="wide" className="pb-8">
        {/* Primary contact card */}
        <Reveal y={16}>
          <SpotlightCard className="p-6 sm:p-8">
            {availability.open && (
              <p className="text-muted inline-flex items-center gap-2.5 text-sm">
                <span className="relative inline-flex size-2">
                  <span className="pulse-dot absolute inset-0" aria-hidden="true" />
                  <span className="bg-positive relative inline-flex size-2 rounded-full" />
                </span>
                {availability.label}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
              <a
                href={`mailto:${site.email}`}
                className="text-fg hover:text-accent link-underline font-serif text-2xl break-all transition-colors sm:text-3xl"
              >
                {site.email}
              </a>
              <CopyButton value={site.email} />
            </div>

            <p className="text-muted mt-5 max-w-[58ch] leading-relaxed">
              Email is by far the best way to reach me. I read everything and reply to real
              enquiries within two working days.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={mailto}
                className="bg-fg text-bg inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start a project enquiry
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
              </a>
              <a
                href="/cv"
                className="border-border text-fg hover:border-accent inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
              >
                View CV
              </a>
            </div>
          </SpotlightCard>
        </Reveal>
      </Container>

      {/* What to include */}
      <Container size="wide" className="py-10">
        <Reveal>
          <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">
            What makes an enquiry easy to answer
          </h2>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {helpful.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 80} y={16} className="h-full">
              <SpotlightCard className="h-full p-5">
                <h3 className="text-fg text-base">{item.title}</h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">{item.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </Container>

      {/* Practicalities */}
      <Container size="wide" className="py-10 pb-24">
        <Reveal>
          <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">
            Working together
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <dl className="border-border mt-6 grid gap-x-10 gap-y-6 border-t pt-8 sm:grid-cols-2">
            <div>
              <dt className="text-fg font-medium">Where I work</dt>
              <dd className="text-muted mt-1.5 leading-relaxed">
                Remote, worldwide. I am based in {site.location}, on IST (UTC+5:30), and keep
                regular overlap with both US and European working hours.
              </dd>
            </div>
            <div>
              <dt className="text-fg font-medium">How engagements usually start</dt>
              <dd className="text-muted mt-1.5 leading-relaxed">
                A small, scoped, paid piece of work: one parser bug, one extraction target, or an
                audit of an existing pipeline. It is low risk for you and it tells us both quickly
                whether this is a good fit.
              </dd>
            </div>
            <div>
              <dt className="text-fg font-medium">Rates</dt>
              <dd className="text-muted mt-1.5 leading-relaxed">
                Hourly or fixed price per piece of work, invoiced in USD, EUR or GBP. Tell me the
                problem and I will quote against it rather than against a day rate.
              </dd>
            </div>
            <div>
              <dt className="text-fg font-medium">Confidentiality</dt>
              <dd className="text-muted mt-1.5 leading-relaxed">
                Happy to sign an NDA before you send anything sensitive. If that is easier, say so
                in your first email and we will do that first.
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={140}>
          <div className="border-border mt-10 border-t pt-8">
            <h3 className="text-faint text-sm font-semibold tracking-wide uppercase">Elsewhere</h3>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {site.socials
                .filter((s) => s.href.startsWith("http"))
                .map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent-hover link-underline transition-colors"
                    >
                      {s.label} ↗
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </>
  );
}

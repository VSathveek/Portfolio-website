import { Container } from "@/components/container";
import { Reveal } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { contributions } from "@/data/opensource";

/** Small status chip: merged reads as a credential, open as work in flight. */
function StatusPill({ status, shippedIn }: { status: "merged" | "open"; shippedIn?: string }) {
  const merged = status === "merged";
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
      style={{
        borderColor: merged
          ? "color-mix(in oklab, var(--positive) 35%, transparent)"
          : "var(--border)",
        color: merged ? "var(--positive)" : "var(--faint)",
        background: merged
          ? "color-mix(in oklab, var(--positive) 10%, transparent)"
          : "transparent",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        {merged ? (
          <path d="M5 3.254V3.25v.005a.75.75 0 1 1 0-.005ZM4.25 1.5a1.75 1.75 0 0 0-.75 3.332v6.336a1.75 1.75 0 1 0 1.5 0V8.061a2.75 2.75 0 0 0 1.75.689h1.5a1.25 1.25 0 0 1 1.25 1.25v1.168a1.75 1.75 0 1 0 1.5 0V10a2.75 2.75 0 0 0-2.75-2.75h-1.5A1.25 1.25 0 0 1 5 6V4.832A1.75 1.75 0 0 0 4.25 1.5Z" />
        ) : (
          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0Z" />
        )}
      </svg>
      {merged ? (shippedIn ? `Merged · ${shippedIn}` : "Merged") : "In review"}
    </span>
  );
}

/**
 * Upstream contributions, presented as the proof they are: real code, in
 * repositories the reader may already depend on, with the bug explained in
 * plain language so a non-specialist can tell why it mattered.
 */
export function OpenSource() {
  return (
    <Container size="wide" className="py-16 sm:py-20">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-faint text-sm font-semibold tracking-wide uppercase">
            Upstream open source
          </h2>
          <p className="text-faint text-sm">
            Code merged into the libraries production RAG stacks run on
          </p>
        </div>
      </Reveal>

      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {contributions.map((c, i) => (
          <Reveal as="li" key={c.pr} delay={i * 90} y={18} className="h-full">
            <SpotlightCard className="flex h-full flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-fg truncate font-mono text-sm">{c.repo}</p>
                  <p className="text-faint mt-0.5 text-xs">
                    {c.org} · {c.what}
                  </p>
                </div>
                <StatusPill status={c.status} shippedIn={c.shippedIn} />
              </div>

              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg hover:text-accent link-underline mt-4 font-serif text-base leading-snug transition-colors"
              >
                {c.title}
              </a>

              <p className="text-muted mt-3 flex-1 text-sm leading-relaxed">{c.impact}</p>

              <p className="text-faint mt-4 font-mono text-xs">#{c.pr}</p>
            </SpotlightCard>
          </Reveal>
        ))}
      </ul>
    </Container>
  );
}

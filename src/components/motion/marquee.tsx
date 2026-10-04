import { cn } from "@/lib/cn";

/**
 * Edge-faded infinite ticker. The children are rendered twice inside one
 * track, which is then translated by -50% on loop, so the second copy lands
 * exactly where the first began and the seam is invisible. The duplicate is
 * hidden from assistive tech so the content isn't announced twice.
 *
 * Hovering pauses it (see `.marquee:hover` in globals.css) so anything
 * clickable inside stays reachable.
 */
export function Marquee({
  children,
  duration = 36,
  className,
}: {
  children: React.ReactNode;
  /** Seconds for one full loop. Longer = calmer. */
  duration?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "marquee group relative overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]",
        className
      )}
    >
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

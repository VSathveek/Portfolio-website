"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: React.ReactNode;
  /** Render as a different element (defaults to a plain div). */
  as?: React.ElementType;
  /** Delay before this element animates in, in ms. Use it to stagger a list. */
  delay?: number;
  /** Distance travelled on the way in, in px. */
  y?: number;
  /** Starting blur, e.g. "6px". Adds a soft focus-in. */
  blur?: string;
  /** Starting scale, e.g. 0.97. */
  scale?: number;
  /** Replay the animation each time the element re-enters the viewport. */
  repeat?: boolean;
  className?: string;
};

/**
 * Scroll-triggered entrance animation.
 *
 * The actual transition lives in `globals.css` under `[data-reveal]`; this
 * component only toggles `data-visible`. Doing it that way keeps the hidden
 * state scoped to `.js`, so the content is still readable if JavaScript never
 * runs, and it means the transition is skipped wholesale under
 * `prefers-reduced-motion` without any logic here.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  y = 14,
  blur,
  scale,
  repeat = false,
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the browser can't observe, just show the content. Deferred to the
    // next frame so this isn't a synchronous setState inside the effect.
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!repeat) observer.disconnect();
        } else if (repeat) {
          setVisible(false);
        }
      },
      // Fire a little before the element reaches the fold so the motion
      // reads as "already settling" rather than "popping in late".
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [repeat]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-visible={visible ? "true" : "false"}
      className={className}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-y": `${y}px`,
          ...(blur ? { "--reveal-blur": blur } : {}),
          ...(scale ? { "--reveal-scale": scale } : {}),
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

/**
 * Splits a heading into lines that rise in sequence. Unlike <Reveal> this
 * fires on mount rather than on scroll, so it's meant for above-the-fold
 * headings only; below the fold it would finish before you ever saw it.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  startDelay = 0,
  step = 90,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  startDelay?: number;
  step?: number;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        // Each line needs its own clipping block so the rise is masked.
        <span key={line} className="block overflow-hidden">
          <span
            className={cn("reveal-line", lineClassName)}
            style={{ "--line-delay": `${startDelay + i * step}ms` } as React.CSSProperties}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

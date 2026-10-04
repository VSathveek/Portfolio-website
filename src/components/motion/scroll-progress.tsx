"use client";

import { useEffect, useRef } from "react";

/**
 * Hairline reading-progress bar, pinned under the sticky header.
 *
 * Scroll events are coalesced into a single rAF callback and the result is
 * written straight to a CSS variable, so scrolling never triggers a React
 * render.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      el.style.setProperty("--progress", String(Math.min(1, Math.max(0, progress))));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px">
      <div
        ref={ref}
        className="scroll-progress from-accent h-full w-full bg-gradient-to-r to-[var(--glow-b)]"
      />
    </div>
  );
}

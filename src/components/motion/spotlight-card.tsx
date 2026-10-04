"use client";

import { useCallback, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * A card whose background carries a soft glow that follows the cursor.
 *
 * The pointer handler only writes two CSS custom properties; the gradient
 * itself is painted by `.spotlight::before` in globals.css. That keeps this
 * off the React render path entirely, no state, no re-renders on mousemove.
 */
export function SpotlightCard({
  children,
  as: Tag = "div",
  className,
  ...rest
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <Tag
      ref={ref}
      onPointerMove={handleMove}
      className={cn(
        "spotlight lift border-border bg-surface/60 rounded-xl border backdrop-blur-sm",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

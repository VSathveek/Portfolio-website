/** Small pill for a technology/keyword tag. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-border bg-surface/70 text-muted hover:border-accent/50 hover:text-fg inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors duration-300">
      {children}
    </span>
  );
}

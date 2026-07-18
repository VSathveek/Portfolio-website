/** Small pill for a technology/keyword tag. */
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border-border bg-surface text-muted inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs">
      {children}
    </span>
  );
}

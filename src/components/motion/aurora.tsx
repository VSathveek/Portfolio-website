import { cn } from "@/lib/cn";

/**
 * Ambient backdrop for the hero: three slowly drifting colour blobs behind a
 * masked dot grid, with a grain layer on top to stop the gradients looking
 * like flat plastic. Purely decorative, so it is hidden from assistive tech
 * and sits behind content with `-z-10`.
 *
 * Opacity is driven by `--glow-strength`, which is much lower in light mode:
 * on paper white a strong gradient reads as a mistake, while on deep ink it reads
 * as depth.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("grain pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className="aurora-blob"
        style={
          {
            background: "var(--glow-a)",
            width: "38rem",
            height: "38rem",
            top: "-14rem",
            left: "-10rem",
            "--drift-x": "60px",
            "--drift-y": "40px",
            "--drift-scale": 1.18,
            "--drift-duration": "24s",
          } as React.CSSProperties
        }
      />
      <div
        className="aurora-blob"
        style={
          {
            background: "var(--glow-b)",
            width: "30rem",
            height: "30rem",
            top: "-8rem",
            right: "-8rem",
            "--drift-x": "-50px",
            "--drift-y": "50px",
            "--drift-scale": 1.1,
            "--drift-duration": "31s",
            "--drift-delay": "-6s",
          } as React.CSSProperties
        }
      />
      <div
        className="aurora-blob"
        style={
          {
            background: "var(--glow-c)",
            width: "26rem",
            height: "26rem",
            top: "10rem",
            left: "38%",
            "--drift-x": "40px",
            "--drift-y": "-45px",
            "--drift-scale": 1.22,
            "--drift-duration": "38s",
            "--drift-delay": "-14s",
          } as React.CSSProperties
        }
      />
      <div className="dot-grid absolute inset-0" />
    </div>
  );
}

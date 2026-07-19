"use client";

import dynamic from "next/dynamic";

/**
 * Isolation boundary for the embedded drawing block (Excalidraw is client-only).
 * Swapping to another canvas later only touches this file.
 */
const DrawingBlockCanvas = dynamic(() => import("@/components/write/drawing-block-canvas"), {
  ssr: false,
  loading: () => (
    <div className="border-border text-muted flex h-[440px] items-center justify-center rounded-md border text-sm">
      Loading canvas…
    </div>
  ),
});

export function DrawingBlock(props: {
  initialScene: unknown;
  onChange: (scene: unknown, svg: string) => void;
}) {
  return <DrawingBlockCanvas {...props} />;
}

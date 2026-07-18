"use client";

import dynamic from "next/dynamic";

/**
 * Isolation boundary for the drawing editor. Excalidraw is client-only (no SSR)
 * and touches `window` at import time, so it's loaded with ssr:false and only
 * rendered after mount. To swap in tldraw later, change the import below — the
 * rest of the app depends only on this component's props.
 */
const ExcalidrawCanvas = dynamic(() => import("@/components/journal/excalidraw-canvas"), {
  ssr: false,
  loading: () => (
    <div className="text-muted flex h-[calc(100dvh-4rem)] items-center justify-center text-sm">
      Loading editor…
    </div>
  ),
});

export type JournalEditorProps = {
  entryId: string;
  title: string;
  initialScene: unknown;
};

export function JournalEditor(props: JournalEditorProps) {
  return <ExcalidrawCanvas {...props} />;
}

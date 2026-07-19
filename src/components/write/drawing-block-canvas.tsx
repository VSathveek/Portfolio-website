"use client";

import "@excalidraw/excalidraw/index.css";
import { Excalidraw, exportToSvg, serializeAsJSON } from "@excalidraw/excalidraw";
import { useCallback, useRef, useState } from "react";
import { useTheme } from "next-themes";

type ExcalidrawInitialData = React.ComponentProps<typeof Excalidraw>["initialData"];
type ChangeArgs = Parameters<NonNullable<React.ComponentProps<typeof Excalidraw>["onChange"]>>;

type Props = {
  initialScene: unknown;
  /** Fires (debounced) with a serializable scene and an exported SVG snapshot. */
  onChange: (scene: unknown, svg: string) => void;
};

function buildInitialData(rawScene: unknown): ExcalidrawInitialData {
  const scene = rawScene as { elements?: unknown[]; appState?: Record<string, unknown> } | null;
  const appState = { viewBackgroundColor: "#ffffff", ...(scene?.appState ?? {}) };
  if (scene && Array.isArray(scene.elements) && scene.elements.length > 0) {
    return { elements: scene.elements, appState } as ExcalidrawInitialData;
  }
  return { appState } as ExcalidrawInitialData;
}

export default function DrawingBlockCanvas({ initialScene, onChange }: Props) {
  const { resolvedTheme } = useTheme();
  const [initialData] = useState<ExcalidrawInitialData>(() => buildInitialData(initialScene));
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = useCallback(
    (elements: ChangeArgs[0], appState: ChangeArgs[1], files: ChangeArgs[2]) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(async () => {
        // Serializable scene for re-editing.
        const scene = JSON.parse(serializeAsJSON(elements, appState, files, "local"));
        // Light, transparent SVG snapshot for public display on a white card.
        const svgEl = await exportToSvg({
          elements,
          appState: { ...appState, exportBackground: false, exportWithDarkMode: false },
          files,
          exportPadding: 8,
        });
        onChange(scene, new XMLSerializer().serializeToString(svgEl));
      }, 800);
    },
    [onChange]
  );

  return (
    <div className="border-border h-[440px] w-full overflow-hidden rounded-md border">
      <Excalidraw
        initialData={initialData}
        onChange={handleChange}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        UIOptions={{ canvasActions: { toggleTheme: false } }}
      />
    </div>
  );
}

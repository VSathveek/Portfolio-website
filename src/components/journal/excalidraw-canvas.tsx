"use client";

import "@excalidraw/excalidraw/index.css";
import { Excalidraw, convertToExcalidrawElements, serializeAsJSON } from "@excalidraw/excalidraw";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { updateScene } from "@/app/journal/actions";

type ExcalidrawInitialData = React.ComponentProps<typeof Excalidraw>["initialData"];
type ChangeArgs = Parameters<NonNullable<React.ComponentProps<typeof Excalidraw>["onChange"]>>;

type SaveStatus = "idle" | "dirty" | "saving" | "saved" | "error";

const AUTOSAVE_MS = 1200;

// A4-ish page in Excalidraw units (96dpi), stacked to read like a bound notebook.
const PAGE_W = 794;
const PAGE_H = 1123;
const PAGE_GAP = 48;

/** Seed a fresh entry with two stacked "paper" pages so it never opens as a blank void. */
function defaultPages() {
  return convertToExcalidrawElements(
    [0, 1].map((i) => ({
      type: "rectangle" as const,
      x: 0,
      y: i * (PAGE_H + PAGE_GAP),
      width: PAGE_W,
      height: PAGE_H,
      strokeColor: "#d7d5cc",
      backgroundColor: "#ffffff",
      fillStyle: "solid" as const,
      strokeWidth: 1,
      roughness: 0,
    }))
  );
}

function buildInitialData(rawScene: unknown): ExcalidrawInitialData {
  const scene = rawScene as {
    elements?: unknown[];
    appState?: Record<string, unknown>;
    files?: unknown;
  } | null;

  const paperAppState = { viewBackgroundColor: "#faf9f6", gridModeEnabled: true };

  if (scene && Array.isArray(scene.elements) && scene.elements.length > 0) {
    return {
      elements: scene.elements,
      files: scene.files ?? undefined,
      appState: { ...scene.appState, ...paperAppState },
      scrollToContent: true,
    } as ExcalidrawInitialData;
  }

  return {
    elements: defaultPages(),
    appState: paperAppState,
    scrollToContent: true,
  } as ExcalidrawInitialData;
}

export default function ExcalidrawCanvas({
  entryId,
  title,
  initialScene,
}: {
  entryId: string;
  title: string;
  initialScene: unknown;
}) {
  const { resolvedTheme } = useTheme();
  // initialData is read once by Excalidraw on mount — compute it a single time.
  const [initialData] = useState<ExcalidrawInitialData>(() => buildInitialData(initialScene));

  const [status, setStatus] = useState<SaveStatus>("idle");
  const sceneRef = useRef<{
    elements: ChangeArgs[0];
    appState: ChangeArgs[1];
    files: ChangeArgs[2];
  } | null>(null);
  const lastSavedRef = useRef<string>("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Seed the "last saved" snapshot so autosave only fires on genuine changes.
  useEffect(() => {
    const s = initialScene as { elements?: unknown[]; appState?: unknown; files?: unknown } | null;
    if (s?.elements) {
      lastSavedRef.current = serializeAsJSON(
        s.elements as ChangeArgs[0],
        (s.appState ?? {}) as ChangeArgs[1],
        (s.files ?? {}) as ChangeArgs[2],
        "local"
      );
    }
  }, [initialScene]);

  const save = useCallback(async () => {
    const scene = sceneRef.current;
    if (!scene) return;

    const json = serializeAsJSON(scene.elements, scene.appState, scene.files, "local");
    if (json === lastSavedRef.current) {
      setStatus("saved");
      return;
    }

    setStatus("saving");
    try {
      await updateScene(entryId, JSON.parse(json));
      lastSavedRef.current = json;
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }, [entryId]);

  const handleChange = useCallback<
    NonNullable<React.ComponentProps<typeof Excalidraw>["onChange"]>
  >(
    (elements, appState, files) => {
      sceneRef.current = { elements, appState, files };
      setStatus("dirty");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => void save(), AUTOSAVE_MS);
    },
    [save]
  );

  // Flush a pending save on unmount so nothing is lost when navigating away.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (sceneRef.current) {
        const json = serializeAsJSON(
          sceneRef.current.elements,
          sceneRef.current.appState,
          sceneRef.current.files,
          "local"
        );
        if (json !== lastSavedRef.current) void updateScene(entryId, JSON.parse(json));
      }
    };
  }, [entryId]);

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col">
      {/* Editor toolbar */}
      <div className="border-border flex items-center justify-between gap-4 border-b px-4 py-2.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/journal" className="text-accent hover:text-accent-hover shrink-0 text-sm">
            ← All pages
          </Link>
          <span aria-hidden className="text-border">
            |
          </span>
          <h1 className="truncate font-serif text-base">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <SaveIndicator status={status} />
          <button
            type="button"
            onClick={() => void save()}
            className="border-border text-muted hover:bg-surface hover:text-fg rounded-md border px-3 py-1.5 text-sm transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      {/* Canvas — Excalidraw needs a parent with an explicit, non-zero height. */}
      <div className="min-h-0 flex-1">
        <Excalidraw
          initialData={initialData}
          onChange={handleChange}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          UIOptions={{ canvasActions: { toggleTheme: false } }}
        />
      </div>
    </div>
  );
}

function SaveIndicator({ status }: { status: SaveStatus }) {
  const map: Record<SaveStatus, { label: string; className: string }> = {
    idle: { label: "All changes saved", className: "text-faint" },
    dirty: { label: "Unsaved changes…", className: "text-faint" },
    saving: { label: "Saving…", className: "text-muted" },
    saved: { label: "Saved", className: "text-muted" },
    error: { label: "Save failed — retry", className: "text-red-600 dark:text-red-400" },
  };
  const { label, className } = map[status];
  return (
    <span className={`text-xs ${className}`} role="status" aria-live="polite">
      {label}
    </span>
  );
}

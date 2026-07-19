"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { updatePost, setPublished } from "@/app/write/actions";
import { TextBlock } from "@/components/write/text-block";
import { DrawingBlock } from "@/components/write/drawing-block";
import type { Block, Post } from "@/types/post";

type SaveStatus = "idle" | "dirty" | "saving" | "saved" | "error";
const AUTOSAVE_MS = 1300;

function newId() {
  return crypto.randomUUID();
}

export function PostEditor({ post }: { post: Post }) {
  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [description, setDescription] = useState(post.description ?? "");
  const [blocks, setBlocks] = useState<Block[]>(post.content ?? []);
  const [published, setPublishedState] = useState(post.published);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const firstRender = useRef(true);

  const save = useCallback(async () => {
    setStatus("saving");
    const res = await updatePost(post.id, { title, description, slug, content: blocks });
    if (res.ok) {
      setStatus("saved");
      setError(null);
    } else {
      setStatus("error");
      setError(res.error);
    }
  }, [post.id, title, description, slug, blocks]);

  // Debounced autosave whenever any field or block changes.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setStatus("dirty");
    const t = setTimeout(save, AUTOSAVE_MS);
    return () => clearTimeout(t);
  }, [save]);

  // Block operations
  const addText = () =>
    setBlocks((b) => [...b, { id: newId(), type: "text", doc: null, html: "" }]);
  const addDrawing = () =>
    setBlocks((b) => [...b, { id: newId(), type: "drawing", scene: null, svg: "" }]);
  const removeBlock = (id: string) => setBlocks((b) => b.filter((x) => x.id !== id));
  const moveBlock = (id: string, dir: -1 | 1) =>
    setBlocks((b) => {
      const i = b.findIndex((x) => x.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= b.length) return b;
      const next = [...b];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  const setText = (id: string, doc: unknown, html: string) =>
    setBlocks((b) => b.map((x) => (x.id === id && x.type === "text" ? { ...x, doc, html } : x)));
  const setDrawing = (id: string, scene: unknown, svg: string) =>
    setBlocks((b) =>
      b.map((x) => (x.id === id && x.type === "drawing" ? { ...x, scene, svg } : x))
    );

  const togglePublish = async () => {
    const next = !published;
    const fd = new FormData();
    fd.set("id", post.id);
    fd.set("publish", String(next));
    await save(); // persist latest content before flipping state
    await setPublished(fd);
    setPublishedState(next);
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-8">
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/write" className="text-accent hover:text-accent-hover text-sm">
          ← All posts
        </Link>
        <div className="flex items-center gap-3">
          <SaveIndicator status={status} error={error} />
          {published && (
            <Link
              href={`/blog/${slug}`}
              target="_blank"
              className="text-accent hover:text-accent-hover text-sm"
            >
              View ↗
            </Link>
          )}
          <button
            type="button"
            onClick={() => void save()}
            className="border-border text-muted hover:bg-surface hover:text-fg rounded-md border px-3 py-1.5 text-sm transition-colors"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => void togglePublish()}
            className="bg-accent text-accent-contrast hover:bg-accent-hover rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
          >
            {published ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>

      {/* Post meta */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        aria-label="Post title"
        className="placeholder:text-faint w-full bg-transparent font-serif text-3xl leading-tight outline-none sm:text-4xl"
      />
      <div className="text-faint mt-3 flex items-center gap-1 text-sm">
        <span>/blog/</span>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())}
          placeholder="slug"
          aria-label="URL slug"
          className="text-muted placeholder:text-faint flex-1 bg-transparent outline-none"
        />
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Short description (shown in the list and previews)"
        aria-label="Description"
        rows={2}
        className="border-border bg-surface focus-visible:border-accent mt-4 w-full resize-none rounded-md border px-3 py-2 text-sm outline-none"
      />

      {/* Blocks */}
      <div className="mt-8 space-y-6">
        {blocks.map((block, i) => (
          <div key={block.id} className="border-border rounded-lg border p-4">
            <div className="text-faint mb-3 flex items-center justify-between text-xs">
              <span className="tracking-wide uppercase">
                {block.type === "text" ? "Text" : "Drawing"}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveBlock(block.id, -1)}
                  disabled={i === 0}
                  className="hover:text-fg rounded px-1.5 py-0.5 disabled:opacity-30"
                  aria-label="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(block.id, 1)}
                  disabled={i === blocks.length - 1}
                  className="hover:text-fg rounded px-1.5 py-0.5 disabled:opacity-30"
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="rounded px-1.5 py-0.5 transition-colors hover:text-red-600 dark:hover:text-red-400"
                  aria-label="Delete block"
                >
                  ✕
                </button>
              </div>
            </div>

            {block.type === "text" ? (
              <TextBlock
                initialDoc={block.doc}
                onChange={(doc, html) => setText(block.id, doc, html)}
              />
            ) : (
              <DrawingBlock
                initialScene={block.scene}
                onChange={(scene, svg) => setDrawing(block.id, scene, svg)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Add blocks */}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={addText}
          className="border-border text-muted hover:bg-surface hover:text-fg rounded-md border px-4 py-2 text-sm transition-colors"
        >
          + Text
        </button>
        <button
          type="button"
          onClick={addDrawing}
          className="border-border text-muted hover:bg-surface hover:text-fg rounded-md border px-4 py-2 text-sm transition-colors"
        >
          + Drawing
        </button>
      </div>
    </div>
  );
}

function SaveIndicator({ status, error }: { status: SaveStatus; error: string | null }) {
  const map: Record<SaveStatus, string> = {
    idle: "All changes saved",
    dirty: "Unsaved changes…",
    saving: "Saving…",
    saved: "Saved",
    error: error ?? "Save failed",
  };
  const isError = status === "error";
  return (
    <span
      role="status"
      aria-live="polite"
      className={`text-xs ${isError ? "text-red-600 dark:text-red-400" : "text-faint"}`}
    >
      {map[status]}
    </span>
  );
}

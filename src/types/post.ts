/**
 * A blog post is an ordered list of blocks. Rich-text blocks store both the
 * Tiptap document (for re-editing) and the rendered HTML (for public display,
 * so the public page needs no editor code). Drawing blocks store the Excalidraw
 * scene (for re-editing) and an exported SVG (for public display).
 */
export type TextBlock = {
  id: string;
  type: "text";
  doc: unknown; // Tiptap JSON document
  html: string; // rendered HTML snapshot
};

export type DrawingBlock = {
  id: string;
  type: "drawing";
  scene: unknown; // Excalidraw scene
  svg: string; // exported SVG markup
};

export type Block = TextBlock | DrawingBlock;

export type Post = {
  id: string;
  user_id: string;
  slug: string;
  title: string;
  description: string | null;
  content: Block[];
  published: boolean;
  created_at: string;
  updated_at: string;
  published_at: string | null;
};

export type PostSummary = {
  slug: string;
  title: string;
  description: string | null;
  date: string; // published_at or updated_at
};

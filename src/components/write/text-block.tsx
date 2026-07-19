"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback } from "react";

type TextBlockProps = {
  /** Initial Tiptap document (JSON), or null for an empty block. */
  initialDoc: unknown;
  /** Fires on every edit with the current document JSON and rendered HTML. */
  onChange: (doc: unknown, html: string) => void;
};

function ToolbarButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()} // keep editor selection
      onClick={onClick}
      aria-pressed={isActive}
      className={`rounded px-2 py-1 text-xs transition-colors ${
        isActive ? "bg-accent text-accent-contrast" : "text-muted hover:bg-surface hover:text-fg"
      }`}
    >
      {label}
    </button>
  );
}

/** A single rich-text block backed by Tiptap. */
export function TextBlock({ initialDoc, onChange }: TextBlockProps) {
  const handleUpdate = useCallback(
    ({ editor }: { editor: Editor }) => onChange(editor.getJSON(), editor.getHTML()),
    [onChange]
  );

  const editor = useEditor({
    extensions: [StarterKit.configure({ heading: { levels: [2, 3] } })],
    content: (initialDoc as object) ?? "",
    immediatelyRender: false, // required under SSR (Next.js)
    onUpdate: handleUpdate,
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral dark:prose-invert max-w-none min-h-[6rem] focus:outline-none prose-headings:font-serif prose-headings:font-medium prose-a:text-accent",
      },
    },
  });

  if (!editor) return <div className="min-h-[6rem]" />;

  return (
    <div>
      <div className="border-border mb-2 flex flex-wrap gap-1 border-b pb-2">
        <ToolbarButton
          label="B"
          isActive={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="I"
          isActive={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="H2"
          isActive={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          label="H3"
          isActive={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <ToolbarButton
          label="• List"
          isActive={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="1. List"
          isActive={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          label="❝"
          isActive={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarButton
          label="Code"
          isActive={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

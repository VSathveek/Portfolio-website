"use client";

import Link from "next/link";
import { useState } from "react";
import { renameEntry, deleteEntry } from "@/app/journal/actions";
import { SubmitButton } from "@/components/submit-button";

type EntryRowProps = {
  id: string;
  title: string;
  updatedLabel: string;
};

/** One notebook entry: open, inline-rename, or delete. */
export function EntryRow({ id, title, updatedLabel }: EntryRowProps) {
  const [editing, setEditing] = useState(false);

  return (
    <li className="border-border flex items-center gap-3 border-b py-3">
      {editing ? (
        <form
          action={renameEntry}
          onSubmit={() => setEditing(false)}
          className="flex flex-1 items-center gap-2"
        >
          <input type="hidden" name="id" value={id} />
          <input
            name="title"
            defaultValue={title}
            autoFocus
            aria-label="Entry title"
            className="border-border bg-surface focus-visible:border-accent flex-1 rounded-md border px-2.5 py-1.5 text-sm outline-none"
          />
          <SubmitButton
            pendingLabel="Saving…"
            className="bg-accent text-accent-contrast hover:bg-accent-hover rounded-md px-2.5 py-1.5 text-xs font-medium"
          >
            Save
          </SubmitButton>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="border-border text-muted hover:text-fg rounded-md border px-2.5 py-1.5 text-xs"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <Link href={`/journal/${id}`} className="group flex flex-1 items-baseline gap-3">
            <span className="group-hover:text-accent font-serif text-lg transition-colors">
              {title}
            </span>
            <span className="text-faint text-xs">{updatedLabel}</span>
          </Link>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-muted hover:text-fg rounded-md px-2 py-1 text-xs transition-colors"
          >
            Rename
          </button>
          <form
            action={deleteEntry}
            onSubmit={(e) => {
              if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) {
                e.preventDefault();
              }
            }}
          >
            <input type="hidden" name="id" value={id} />
            <SubmitButton
              pendingLabel="Deleting…"
              className="text-muted rounded-md px-2 py-1 text-xs transition-colors hover:text-red-600 dark:hover:text-red-400"
            >
              Delete
            </SubmitButton>
          </form>
        </>
      )}
    </li>
  );
}

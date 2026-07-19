"use client";

import Link from "next/link";
import { deletePost, setPublished } from "@/app/write/actions";
import { SubmitButton } from "@/components/submit-button";

type PostRowProps = {
  id: string;
  title: string;
  published: boolean;
  updatedLabel: string;
};

/** One post in the studio list: open, publish/unpublish, or delete. */
export function PostRow({ id, title, published, updatedLabel }: PostRowProps) {
  return (
    <li className="border-border flex items-center gap-3 border-b py-3">
      <Link href={`/write/${id}`} className="group flex flex-1 items-baseline gap-3">
        <span className="group-hover:text-accent font-serif text-lg transition-colors">
          {title}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${
            published ? "bg-accent/10 text-accent" : "border-border text-faint border"
          }`}
        >
          {published ? "Published" : "Draft"}
        </span>
        <span className="text-faint text-xs">{updatedLabel}</span>
      </Link>

      <form action={setPublished}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="publish" value={(!published).toString()} />
        <SubmitButton
          pendingLabel="…"
          className="text-muted hover:text-fg rounded-md px-2 py-1 text-xs transition-colors"
        >
          {published ? "Unpublish" : "Publish"}
        </SubmitButton>
      </form>

      <form
        action={deletePost}
        onSubmit={(e) => {
          if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) e.preventDefault();
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
    </li>
  );
}

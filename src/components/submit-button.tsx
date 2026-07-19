"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/cn";
import { Spinner } from "@/components/spinner";

type SubmitButtonProps = {
  children: React.ReactNode;
  /** Label shown while the form action is in flight (defaults to children). */
  pendingLabel?: React.ReactNode;
  className?: string;
};

/**
 * Submit button that reflects the enclosing form's pending state: it disables
 * itself and shows a spinner while the server action runs. Must be rendered
 * inside a <form action={...}>.
 */
export function SubmitButton({ children, pendingLabel, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={cn(className, pending && "cursor-not-allowed opacity-70")}
    >
      <span className="inline-flex items-center gap-1.5">
        {pending && <Spinner className="size-3.5" />}
        {pending ? (pendingLabel ?? children) : children}
      </span>
    </button>
  );
}

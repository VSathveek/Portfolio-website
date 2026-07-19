import { logout } from "@/app/login/actions";
import { SubmitButton } from "@/components/submit-button";

/** A form that posts to the sign-out server action, with a pending state. */
export function SignOutButton() {
  return (
    <form action={logout}>
      <SubmitButton
        pendingLabel="Signing out…"
        className="border-border text-muted hover:bg-surface hover:text-fg rounded-md border px-3 py-1.5 text-sm transition-colors"
      >
        Sign out
      </SubmitButton>
    </form>
  );
}

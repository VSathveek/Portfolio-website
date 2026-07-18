import { logout } from "@/app/login/actions";

/** A form that posts to the sign-out server action — no client JS required. */
export function SignOutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="border-border text-muted hover:bg-surface hover:text-fg rounded-md border px-3 py-1.5 text-sm transition-colors"
      >
        Sign out
      </button>
    </form>
  );
}

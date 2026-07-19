import type { Metadata } from "next";
import { Container } from "@/components/container";
import { login } from "@/app/login/actions";
import { SubmitButton } from "@/components/submit-button";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Private area.",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; redirectTo?: string }>;
}) {
  const { error, redirectTo } = await searchParams;

  return (
    <Container size="prose" className="py-20 sm:py-28">
      <div className="mx-auto max-w-sm">
        <h1 className="text-2xl">Sign in</h1>
        <p className="text-muted mt-2 text-sm">Private area — journal access.</p>

        <form action={login} className="mt-8 space-y-4" noValidate>
          <input type="hidden" name="redirectTo" value={redirectTo ?? "/journal"} />

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="border-border bg-surface focus-visible:border-accent mt-1.5 w-full rounded-md border px-3 py-2 text-sm outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="border-border bg-surface focus-visible:border-accent mt-1.5 w-full rounded-md border px-3 py-2 text-sm outline-none"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <SubmitButton
            pendingLabel="Signing in…"
            className="bg-accent text-accent-contrast hover:bg-accent-hover w-full rounded-md px-4 py-2 text-sm font-medium transition-colors [&>span]:justify-center"
          >
            Sign in
          </SubmitButton>
        </form>
      </div>
    </Container>
  );
}

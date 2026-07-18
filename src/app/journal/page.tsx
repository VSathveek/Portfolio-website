import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { SignOutButton } from "@/components/sign-out-button";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Journal",
  robots: { index: false, follow: false },
};

export default async function JournalPage() {
  // Middleware already gates this route, but we re-verify server-side with
  // getUser() before rendering any private content (defense in depth).
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/journal");
  }

  return (
    <Container size="prose" className="py-16 sm:py-20">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl sm:text-4xl">Journal</h1>
        <SignOutButton />
      </div>
      <p className="text-muted mt-4">
        Signed in as <span className="text-fg">{user.email}</span>.
      </p>
      <p className="text-faint mt-8 text-sm">
        The notebook — entry list and drawing editor — arrives in Phases 4 and 5.
      </p>
    </Container>
  );
}

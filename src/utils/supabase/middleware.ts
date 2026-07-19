import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { tryGetSupabaseConfig } from "@/utils/supabase/config";

/**
 * Refreshes the Supabase session on every matched request and gates the
 * private journal. Uses getUser() (which revalidates the token with Supabase
 * Auth) rather than trusting the cookie session — this is the server-side
 * check that actually protects /journal.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  // If Supabase isn't configured yet, don't break the public site — just skip
  // session refresh and route gating for this request.
  const config = tryGetSupabaseConfig();
  if (!config) return supabaseResponse;
  const { url, key } = config;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // Do not run code between createServerClient and getUser() — it must be the
  // first await so the session is refreshed before any redirect decision.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Private areas: the drawing journal and the writing studio.
  const isPrivate = pathname.startsWith("/journal") || pathname.startsWith("/write");

  // Unauthenticated → bounce to login, remembering the target.
  if (!user && isPrivate) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Already signed in → skip the login page, go to the journal.
  if (user && pathname === "/login") {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/journal";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

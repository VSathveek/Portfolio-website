import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "@/utils/supabase/config";

/**
 * Supabase client for Server Components, Route Handlers, and Server Actions.
 * Reads/writes the session via Next's cookie store. The setAll try/catch is
 * needed because Server Components can't set cookies — the middleware refresh
 * handles that case instead.
 */
export async function createClient() {
  const cookieStore = await cookies();
  const { url, key } = getSupabaseConfig();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component — safe to ignore; middleware
          // refreshes the session cookies on each request.
        }
      },
    },
  });
}

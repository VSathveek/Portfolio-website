/**
 * Reads the public Supabase config from the environment. These are the URL and
 * the publishable key — both safe to ship to the browser (access is gated by
 * Row Level Security). Throws a clear error if they're missing so a
 * misconfigured deploy fails loudly instead of silently.
 */
export function getSupabaseConfig() {
  const config = tryGetSupabaseConfig();

  if (!config) {
    throw new Error(
      "Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local (and in Vercel)."
    );
  }

  return config;
}

/**
 * Non-throwing variant for the middleware, which runs on every request: if the
 * env is not configured yet (e.g. a deploy before the Vercel vars are set), we
 * skip auth rather than 500 the entire site.
 */
export function tryGetSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

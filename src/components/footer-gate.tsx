"use client";

import { usePathname } from "next/navigation";

/** Hides the public site footer inside the private journal and on the login page. */
export function FooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hidden =
    pathname.startsWith("/journal") ||
    pathname.startsWith("/write") ||
    pathname.startsWith("/login");
  if (hidden) return null;
  return <>{children}</>;
}

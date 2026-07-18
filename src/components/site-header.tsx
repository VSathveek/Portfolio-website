"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { ThemeToggle } from "@/components/theme-toggle";

/** Is `href` the current page? (Exact match for "/", prefix match otherwise.) */
function useIsActive() {
  const pathname = usePathname();
  return (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
}

export function SiteHeader() {
  const isActive = useIsActive();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-border bg-bg/80 supports-[backdrop-filter]:bg-bg/70 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="font-serif text-lg tracking-tight" onClick={() => setOpen(false)}>
          {site.name}
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                isActive(item.href) ? "text-fg" : "text-muted hover:bg-surface hover:text-fg"
              )}
            >
              {item.label}
            </Link>
          ))}
          <span className="bg-border mx-1 h-5 w-px" aria-hidden="true" />
          <ThemeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="border-border text-muted hover:text-fg inline-flex size-9 items-center justify-center rounded-md border"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-border bg-bg border-t md:hidden"
        >
          <ul className="mx-auto flex max-w-5xl flex-col px-4 py-2 sm:px-6">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-sm",
                    isActive(item.href) ? "text-fg" : "text-muted hover:bg-surface hover:text-fg"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

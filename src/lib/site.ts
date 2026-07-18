/**
 * Central site configuration — identity, navigation, and social links.
 * Kept in one place so pages and the layout stay in sync. Real content
 * comes from the owner's resume (see Phase 2 pages).
 */
export const site = {
  name: "Varanasi Sathveek",
  shortName: "Sathveek",
  tagline: "Computer Science undergraduate, NIT Andhra Pradesh",
  email: "sathveekvaranasi@gmail.com",
  url: "https://portfolio-website-amber-pi-50.vercel.app",
  /** Primary navigation. Routes under /research, /projects, /cv arrive in Phase 2. */
  nav: [
    { href: "/", label: "Home" },
    { href: "/research", label: "Research" },
    { href: "/projects", label: "Projects" },
    { href: "/cv", label: "CV" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/VSathveek" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vsathveek" },
    { label: "LeetCode", href: "https://leetcode.com/u/Varanasi_Sathveek/" },
    { label: "Email", href: "mailto:sathveekvaranasi@gmail.com" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];

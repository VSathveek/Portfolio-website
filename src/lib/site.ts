/**
 * Central site configuration: identity, navigation and social links.
 * Kept in one place so pages and the layout stay in sync.
 */
export const site = {
  name: "Varanasi Sathveek",
  shortName: "Sathveek",
  /** Leads with the work, not the enrolment status. See /cv for the rest. */
  tagline: "ML engineer, document AI and retrieval systems",
  email: "sathveekvaranasi@gmail.com",
  url: "https://varanasisathveek.vercel.app",
  /**
   * Shown as the hero status pill. Set `open: false` when booked and the
   * pill disappears everywhere at once.
   */
  availability: {
    open: true,
    label: "Available for contract work",
    detail: "Remote, worldwide · IST (UTC+5:30), with overlap into US and EU hours",
  },
  /** Primary navigation. */
  nav: [
    { href: "/", label: "Home" },
    { href: "/research", label: "Research" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Writing" },
    { href: "/cv", label: "CV" },
    { href: "/contact", label: "Contact" },
  ],
  location: "Tadepalligudem, Andhra Pradesh, India",
  socials: [
    { label: "GitHub", href: "https://github.com/VSathveek" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vsathveek" },
    { label: "LeetCode", href: "https://leetcode.com/u/Varanasi_Sathveek/" },
    { label: "Email", href: "mailto:sathveekvaranasi@gmail.com" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];

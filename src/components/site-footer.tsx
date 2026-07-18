import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border mt-24 border-t">
      <div className="text-muted mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {year} {site.name}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {site.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="hover:text-accent transition-colors"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

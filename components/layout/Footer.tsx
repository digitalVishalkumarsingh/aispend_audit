import Link from "next/link";
import Container from "@/components/ui/Container";

const COLUMNS: Array<{ title: string; links: Array<{ href: string; label: string }> }> = [
  {
    title: "Product",
    links: [
      { href: "#features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/audit", label: "Run audit" },
      { href: "#examples", label: "Examples" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/changelog", label: "Changelog" },
      { href: "/docs", label: "Docs" },
      { href: "/benchmarks", label: "Benchmarks" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/security", label: "Security" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.06] bg-bg-deep">
      {/* Top edge glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <Container size="lg" className="py-16">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr]">
          {/* Brand block */}
          <div>
            <Link href="/" className="flex items-center gap-2.5" aria-label="StackSave home">
              <span className="relative grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-accent to-[#818cf8] shadow-[0_0_18px_-4px_rgba(94,106,210,0.7)]">
                <span className="text-[13px] font-semibold leading-none text-white">S</span>
                <span className="absolute inset-0 rounded-md ring-1 ring-inset ring-white/20" />
              </span>
              <span className="text-[15px] font-medium tracking-tight text-fg">
                StackSave
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-fg-muted">
              Audit your AI tool spend in 60 seconds. Built for startups tired of
              guessing where their subscription budget goes.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="grid h-8 w-8 place-items-center rounded-md border border-white/10 text-fg-muted transition-colors hover:border-white/20 hover:text-fg"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-8 w-8 place-items-center rounded-md border border-white/10 text-fg-muted transition-colors hover:border-white/20 hover:text-fg"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39s1.97.13 2.89.39c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.26 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5z" />
                </svg>
              </a>
              <a
                href="mailto:hello@stacksave.app"
                aria-label="Email"
                className="grid h-8 w-8 place-items-center rounded-md border border-white/10 text-fg-muted transition-colors hover:border-white/20 hover:text-fg"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-medium uppercase tracking-wider text-fg-muted/70">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-fg-muted transition-colors hover:text-fg"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="text-[12px] text-fg-muted/70">
            © {new Date().getFullYear()} StackSave. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-[12px] text-fg-muted/70">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            All systems operational
          </p>
        </div>
      </Container>
    </footer>
  );
}

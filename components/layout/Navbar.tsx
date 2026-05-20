"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import MobileMenu from "./MobileMenu";

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "#examples", label: "Examples" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-white/[0.06] bg-bg-base/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-10">
          {/* Brand */}
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="StackSave home"
          >
            <span className="relative grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-accent to-[#818cf8] shadow-[0_0_18px_-4px_rgba(94,106,210,0.7)]">
              <span className="text-[13px] font-semibold leading-none text-white">
                S
              </span>
              <span className="absolute inset-0 rounded-md ring-1 ring-inset ring-white/20" />
            </span>
            <span className="text-[15px] font-medium tracking-tight text-fg">
              StackSave
            </span>
          </Link>

          {/* Center nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-[13px] text-fg-muted transition-colors hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-md px-3 py-1.5 text-[13px] text-fg-muted transition-colors hover:text-fg md:inline-block"
            >
              Sign in
            </Link>
            <Link
              href="/audit"
              className={cn(
                "hidden items-center gap-1.5 rounded-md px-3.5 py-1.5 text-[13px] font-medium md:inline-flex",
                "bg-white text-bg-base transition-all duration-200",
                "shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset,0_0_24px_-6px_rgba(255,255,255,0.4)]",
                "hover:bg-white/90"
              )}
            >
              Start free audit
              <span aria-hidden className="text-fg-muted/60">→</span>
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-md border border-white/10 text-fg-muted transition-colors hover:border-white/20 hover:text-fg md:hidden"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                {menuOpen ? (
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M2.5 5h11M2.5 11h11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type NavLink = { href: string; label: string };

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
};

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 md:hidden",
        "transition-opacity duration-300",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div
        className={cn(
          "absolute inset-x-4 top-20 rounded-2xl border border-white/10",
          "bg-bg-elevated/95 p-6 shadow-2xl backdrop-blur-xl",
          "transition-transform duration-300",
          open ? "translate-y-0" : "-translate-y-4"
        )}
      >
        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-lg px-3 py-3 text-base text-fg-muted transition-colors hover:bg-white/5 hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-6">
          <Link
            href="/audit"
            onClick={onClose}
            className="rounded-lg bg-accent px-4 py-3 text-center text-sm font-medium text-white shadow-[0_0_24px_-6px_rgba(94,106,210,0.6)] transition-colors hover:bg-accent-bright"
          >
            Start free audit
          </Link>
          <Link
            href="/login"
            onClick={onClose}
            className="rounded-lg border border-white/10 px-4 py-3 text-center text-sm text-fg-muted transition-colors hover:border-white/20 hover:text-fg"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

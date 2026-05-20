import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-6 py-32">
        <div className="relative max-w-lg text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-16 -top-16 h-48 bg-accent/20 blur-3xl"
          />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted backdrop-blur-md">
              <span className="h-1 w-1 rounded-full bg-accent" />
              404
            </div>
            <h1 className="mt-6 text-[44px] font-medium leading-[1.05] tracking-[-0.03em] text-gradient-fg sm:text-[56px]">
              Page not found.
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
              The page you&apos;re looking for isn&apos;t here. It may have moved,
              been renamed, or never existed.
            </p>
            <div className="mt-10 flex items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-[13px] font-medium text-bg-base shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_8px_24px_-8px_rgba(255,255,255,0.4)] transition-all hover:bg-white/90"
              >
                Back home
              </Link>
              <Link
                href="/audit"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-4 text-[13px] text-fg-muted transition-all hover:border-white/20 hover:text-fg"
              >
                Run an audit →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

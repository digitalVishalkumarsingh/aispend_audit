"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-1 items-center justify-center px-6">
      <div className="relative max-w-md text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 -top-10 h-40 bg-accent/20 blur-3xl"
        />
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-bright">
            Error
          </p>
          <h1 className="mt-4 text-[32px] font-medium leading-tight tracking-tight text-gradient-fg sm:text-[40px]">
            Something broke on our end.
          </h1>
          <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">
            We&apos;ve logged the error and the team has been pinged. You can retry
            or head back home.
          </p>
          {error.digest ? (
            <p className="mt-4 font-mono text-[11px] text-fg-muted/60">
              ref: {error.digest}
            </p>
          ) : null}
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-[13px] font-medium text-bg-base shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_8px_24px_-8px_rgba(255,255,255,0.4)] transition-all hover:bg-white/90"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-4 text-[13px] text-fg-muted transition-all hover:border-white/20 hover:text-fg"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

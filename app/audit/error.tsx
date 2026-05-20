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
    <div className="flex min-h-[60vh] flex-1 items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-bright">
          Audit error
        </p>
        <h2 className="mt-3 text-[28px] font-medium leading-tight tracking-tight text-gradient-fg">
          We couldn&apos;t finish your audit.
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">
          The calculation engine hit an unexpected case. Your data is safe — try
          running it again.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-[13px] font-medium text-bg-base transition-all hover:bg-white/90"
          >
            Retry
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
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  /** Pre-resolved share URL from the server. Falls back to `window.location`. */
  shareUrl?: string;
};

/**
 * Header actions on the result page: copy the share link to the clipboard and
 * trigger the browser print dialog so the user can save a PDF.
 */
export default function ShareActions({ shareUrl }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = shareUrl ?? (typeof window !== "undefined" ? window.location.href : "");
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can fail in non-secure contexts; ignore silently.
    }
  }

  function print() {
    if (typeof window !== "undefined") window.print();
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={copy}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-md border border-white/10 bg-white/[0.02] px-4 text-[13px] text-fg-muted backdrop-blur-md transition-all",
          "hover:border-white/20 hover:text-fg"
        )}
      >
        {copied ? "Copied ✓" : "Copy link"}
      </button>
      <button
        type="button"
        onClick={print}
        className="inline-flex h-10 items-center gap-2 rounded-md bg-white px-4 text-[13px] font-medium text-bg-base shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_8px_24px_-8px_rgba(255,255,255,0.4)] transition-all hover:bg-white/90"
      >
        Download PDF
      </button>
    </div>
  );
}

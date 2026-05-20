"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type {
  GenerateSummaryRequest,
  GenerateSummaryResponse,
} from "@/types/api";

type Props = {
  auditId: string;
  /** Persisted summary from the server, if one was already generated. */
  initialSummary?: string;
};

type State =
  | { kind: "idle"; text: string; source?: "openai" | "fallback" }
  | { kind: "loading" }
  | { kind: "error"; message: string };

/**
 * AI-generated CFO summary block. If no summary was persisted yet, the card
 * triggers `POST /api/generate-summary` on mount. A small button lets the user
 * regenerate later.
 */
export default function AuditCard({ auditId, initialSummary }: Props) {
  const [state, setState] = useState<State>(
    initialSummary
      ? { kind: "idle", text: initialSummary }
      : { kind: "loading" }
  );
  // Guard against React Strict Mode double-fire in dev.
  const ranOnce = useRef(false);

  async function generate() {
    setState({ kind: "loading" });
    const payload: GenerateSummaryRequest = { auditId };
    try {
      const res = await fetch("/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as GenerateSummaryResponse;
      if (!json.ok) {
        setState({ kind: "error", message: json.error });
        return;
      }
      setState({
        kind: "idle",
        text: json.data.summary,
        source: json.data.source,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Network error";
      setState({ kind: "error", message });
    }
  }

  useEffect(() => {
    if (initialSummary || ranOnce.current) return;
    ranOnce.current = true;
    void generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSummary]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-elevated/50 p-6 backdrop-blur-sm sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-fg-muted/70">
          <span className="grid h-5 w-5 place-items-center rounded bg-gradient-to-br from-accent to-[#818cf8]">
            <span className="text-[9px] font-semibold text-white">AI</span>
          </span>
          CFO-ready summary
          {state.kind === "idle" && state.source ? (
            <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] normal-case tracking-normal text-fg-muted/60">
              {state.source}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={generate}
          disabled={state.kind === "loading"}
          className={cn(
            "rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[11px] text-fg-muted transition-colors",
            "hover:border-white/20 hover:text-fg disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          {state.kind === "loading" ? "Generating…" : "Regenerate"}
        </button>
      </div>

      <div className="mt-4 text-[15px] leading-relaxed text-fg">
        {state.kind === "loading" ? (
          <div className="space-y-2" aria-hidden>
            <div className="h-3 w-11/12 animate-pulse rounded bg-white/[0.06]" />
            <div className="h-3 w-10/12 animate-pulse rounded bg-white/[0.06]" />
            <div className="h-3 w-9/12 animate-pulse rounded bg-white/[0.06]" />
            <div className="h-3 w-7/12 animate-pulse rounded bg-white/[0.06]" />
          </div>
        ) : state.kind === "error" ? (
          <p role="alert" className="text-[13px] text-red-300">
            Couldn&apos;t generate a summary: {state.message}
          </p>
        ) : (
          <p className="whitespace-pre-wrap">{state.text}</p>
        )}
      </div>
    </div>
  );
}

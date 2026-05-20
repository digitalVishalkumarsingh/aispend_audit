"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import TeamSizeInput from "./TeamSizeInput";
import ToolSelector from "./ToolSelector";
import UsagePattern, { type UsageValue } from "./UsagePattern";
import { cn } from "@/lib/cn";
import type {
  CreateAuditRequest,
  CreateAuditResponse,
} from "@/types/api";
import type { ToolEntry } from "@/types/audit";

type Status = { kind: "idle" } | { kind: "submitting" } | { kind: "error"; message: string };

/**
 * Single-page audit form. Posts to `POST /api/audit` and navigates to the
 * resulting `/result/[id]` page on success. Validation lives server-side; the
 * client only blocks submission when the form is obviously empty.
 */
export default function SpendForm() {
  const router = useRouter();
  const [tools, setTools] = useState<ToolEntry[]>([]);
  const [teamSize, setTeamSize] = useState<number>(10);
  const [usagePattern, setUsagePattern] = useState<UsageValue | undefined>("moderate");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const canSubmit = tools.length > 0 && teamSize >= 1 && status.kind !== "submitting";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus({ kind: "submitting" });

    const payload: CreateAuditRequest = {
      teamSize,
      usagePattern,
      tools,
    };

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as CreateAuditResponse;
      if (!json.ok) {
        setStatus({ kind: "error", message: json.error });
        return;
      }
      router.push(`/result/${json.data.id}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Network error";
      setStatus({ kind: "error", message });
    }
  }

  const submitting = status.kind === "submitting";

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      {/* Tools */}
      <section>
        <header className="mb-4">
          <h2 className="text-[18px] font-medium tracking-tight text-fg">
            Which AI tools does your team pay for?
          </h2>
          <p className="mt-1 text-[13px] text-fg-muted">
            Pick from the catalog or add your own. Adjust seats and monthly cost so they match your bill.
          </p>
        </header>
        <ToolSelector value={tools} onChange={setTools} />
      </section>

      {/* Team size */}
      <section>
        <header className="mb-3">
          <h2 className="text-[18px] font-medium tracking-tight text-fg">
            How big is the team using these tools?
          </h2>
          <p className="mt-1 text-[13px] text-fg-muted">
            Total headcount across every tool above.
          </p>
        </header>
        <TeamSizeInput value={teamSize} onChange={setTeamSize} disabled={submitting} />
      </section>

      {/* Usage */}
      <section>
        <header className="mb-3">
          <h2 className="text-[18px] font-medium tracking-tight text-fg">
            How heavily are they used?
          </h2>
          <p className="mt-1 text-[13px] text-fg-muted">
            Best guess across the team. Drives the recommendation thresholds.
          </p>
        </header>
        <UsagePattern value={usagePattern} onChange={setUsagePattern} disabled={submitting} />
      </section>

      {/* Submit */}
      <div className="flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] text-fg-muted/60">
          Nothing leaves your browser until you submit.
        </p>
        <button
          type="submit"
          disabled={!canSubmit}
          className={cn(
            "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-white px-5 text-[13px] font-medium text-bg-base shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_8px_24px_-8px_rgba(255,255,255,0.4)] transition-all hover:bg-white/90",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          {submitting ? (
            <>
              <span
                aria-hidden
                className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-bg-base/30 border-t-bg-base"
              />
              Running audit…
            </>
          ) : (
            <>
              Run my audit
              <span aria-hidden className="text-fg-muted/60">→</span>
            </>
          )}
        </button>
      </div>

      {status.kind === "error" ? (
        <div
          role="alert"
          className="rounded-lg border border-red-400/30 bg-red-500/5 px-4 py-3 text-[13px] text-red-200"
        >
          {status.message}
        </div>
      ) : null}
    </form>
  );
}

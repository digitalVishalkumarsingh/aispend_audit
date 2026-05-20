"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { SaveLeadRequest, SaveLeadResponse } from "@/types/api";

type Props = {
  auditId?: string;
  /** Free-text label for analytics (e.g. "audit-result", "newsletter") */
  source?: string;
  /** Headline shown above the input. */
  title?: string;
  /** Smaller sub-line, optional. */
  description?: string;
  /** Override the submit button copy. */
  cta?: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; emailSent: boolean }
  | { kind: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Reusable email capture. Posts to `POST /api/save-lead` and renders a calm
 * inline success state. The backend de-dups by email and fires the audit
 * confirmation email when an `auditId` is supplied.
 */
export default function EmailCaptureForm({
  auditId,
  source = "audit-result",
  title = "Get this report in your inbox",
  description = "We'll email a copy you can forward to whoever owns SaaS budget.",
  cta = "Email me the report",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const valid = EMAIL_RE.test(email.trim());
  const submitting = status.kind === "submitting";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!valid || submitting) return;
    setStatus({ kind: "submitting" });

    const payload: SaveLeadRequest = {
      email: email.trim(),
      auditId,
      source,
    };

    try {
      const res = await fetch("/api/save-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as SaveLeadResponse;
      if (!json.ok) {
        setStatus({ kind: "error", message: json.error });
        return;
      }
      setStatus({ kind: "success", emailSent: json.data.emailSent });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Network error";
      setStatus({ kind: "error", message });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] p-4 text-[13px] text-emerald-200">
        <p className="font-medium text-emerald-100">You&apos;re on the list.</p>
        <p className="mt-1 text-emerald-200/80">
          {status.emailSent
            ? "A copy of the report is on its way — check your inbox in a minute or two."
            : "We saved your address. The report link is at the top of this page."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {title ? (
        <div>
          <h3 className="text-[14px] font-medium text-fg">{title}</h3>
          {description ? (
            <p className="mt-1 text-[13px] text-fg-muted">{description}</p>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          disabled={submitting}
          className="h-10 flex-1 rounded-md border border-white/10 bg-bg-deep/60 px-3 text-[13px] text-fg outline-none transition-colors focus:border-accent/40 placeholder:text-fg-muted/50"
        />
        <button
          type="submit"
          disabled={!valid || submitting}
          className={cn(
            "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-white px-4 text-[13px] font-medium text-bg-base shadow-[0_1px_0_0_rgba(255,255,255,0.5)_inset,0_8px_24px_-8px_rgba(255,255,255,0.4)] transition-all hover:bg-white/90",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
        >
          {submitting ? (
            <>
              <span
                aria-hidden
                className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-bg-base/30 border-t-bg-base"
              />
              Sending…
            </>
          ) : (
            cta
          )}
        </button>
      </div>

      {status.kind === "error" ? (
        <p role="alert" className="text-[12px] text-red-300">
          {status.message}
        </p>
      ) : (
        <p className="text-[11px] text-fg-muted/60">
          No spam, ever. One email with your report — that&apos;s it.
        </p>
      )}
    </form>
  );
}

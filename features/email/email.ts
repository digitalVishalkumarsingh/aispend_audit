/**
 * Email orchestrator. Composes the audit-confirmation template with the Resend
 * client and degrades gracefully when no API key is configured: in that case
 * the function resolves with `{ sent: false, reason: "not-configured" }` rather
 * than throwing, so the calling route can still return a 200 to the user.
 */
import { renderAuditConfirmationEmail } from "./templates/audit-confirmation";
import { ResendError, sendEmail } from "@/services/resend/client";
import { buildShareLink } from "@/features/share/generate-share-link";
import { hasResend } from "@/lib/env";
import type { AuditResult } from "@/types/audit";

export type SendAuditConfirmationInput = {
    to: string;
    audit: AuditResult;
};

export type SendEmailOutcome =
    | { sent: true; id: string }
    | { sent: false; reason: "not-configured" | "send-failed"; error?: string };

export async function sendAuditConfirmation(
    input: SendAuditConfirmationInput
): Promise<SendEmailOutcome> {
    if (!hasResend()) {
        return { sent: false, reason: "not-configured" };
    }

    const reportUrl = buildShareLink(input.audit.id);
    const { subject, html, text } = renderAuditConfirmationEmail({
        reportUrl,
        monthlySavings: input.audit.monthlySavings,
        annualSavings: input.audit.annualSavings,
    });

    try {
        const { id } = await sendEmail({
            to: input.to,
            subject,
            html,
            text,
        });
        return { sent: true, id };
    } catch (err) {
        const message =
            err instanceof ResendError
                ? err.message
                : err instanceof Error
                    ? err.message
                    : "Unknown email error";
        console.warn("[email] Resend send failed:", message);
        return { sent: false, reason: "send-failed", error: message };
    }
}

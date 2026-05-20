/**
 * Helpers that turn an `AuditResult` into the social-share strings consumed by
 * Open Graph / Twitter cards. Lives in `features/share` so the values are
 * authored alongside the share-link builder.
 */
import type { AuditResult } from "@/types/audit";

const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export function buildShareTitle(audit: AuditResult): string {
    if (audit.monthlySavings > 0) {
        return `Saved ${fmt(audit.monthlySavings)}/mo on AI tools`;
    }
    return `StackSave — AI spend audit`;
}

export function buildShareDescription(audit: AuditResult): string {
    if (audit.monthlySavings > 0) {
        return `${fmt(audit.annualSavings)} annualized — ${audit.savingsPercent}% cut across ${audit.input.tools.length} tools.`;
    }
    return `Audit ran across ${audit.input.tools.length} AI tools.`;
}

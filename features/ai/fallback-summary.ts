/**
 * Deterministic, template-based summary used when the LLM is unavailable
 * (no API key, rate limited, transient failure). Reads the same `AuditResult`
 * and produces a CFO-readable paragraph using string interpolation.
 *
 * This is intentionally boring — it should always succeed and never surprise.
 */
import type { AuditResult } from "@/types/audit";

const fmt = (n: number) =>
    `$${Math.round(n).toLocaleString("en-US")}`;

export function buildFallbackSummary(audit: AuditResult): string {
    const {
        currentMonthlySpend,
        monthlySavings,
        annualSavings,
        savingsPercent,
        idleSeats,
        recommendations,
        input,
    } = audit;

    const topThree = recommendations
        .slice()
        .sort((a, b) => b.monthlySavings - a.monthlySavings)
        .slice(0, 3);

    const headline =
        monthlySavings > 0
            ? `Your team is spending ${fmt(currentMonthlySpend)}/month on ${input.tools.length} AI tools, and roughly ${fmt(monthlySavings)} of that — about ${savingsPercent}% — is recoverable without losing any active workflows.`
            : `Your team is spending ${fmt(currentMonthlySpend)}/month on ${input.tools.length} AI tools. Spend looks well-calibrated for your team size; no obvious waste detected.`;

    const recsParagraph =
        topThree.length > 0
            ? `The biggest opportunities: ${topThree
                .map((r) => `${r.toolName} (${r.description.toLowerCase()}, saves ${fmt(r.monthlySavings)}/mo)`)
                .join("; ")}.`
            : "";

    const idleNote =
        idleSeats > 0
            ? `We also flagged ${idleSeats} seat${idleSeats === 1 ? "" : "s"} with no activity in the last 30 days — reclaiming or downgrading these is the lowest-risk action.`
            : "";

    const closing =
        monthlySavings > 0
            ? `Annualized, acting on every recommendation would return roughly ${fmt(annualSavings)} to the budget. Start with the largest line item this week.`
            : `Re-run this audit next quarter — AI tool stacks drift fast.`;

    return [headline, recsParagraph, idleNote, closing]
        .filter(Boolean)
        .join(" ");
}

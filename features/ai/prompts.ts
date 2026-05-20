/**
 * Prompt construction for the audit-summary LLM call.
 * Keep prompts in one file so they're easy to A/B and version.
 */
import type { AuditResult } from "@/types/audit";

export const SYSTEM_PROMPT = [
    "You are an analyst writing a short, CFO-ready summary of a team's AI tool spend audit.",
    "Tone: confident, plain-English, no buzzwords, no emojis, no hedging.",
    "Structure: 3–4 short paragraphs.",
    "  1) One-sentence headline of the finding (with the dollar figure).",
    "  2) The top 2–3 specific recommendations and why.",
    "  3) A closing line on annualized impact and next step.",
    "Constraints: under 180 words. Use real numbers from the data; never invent figures.",
    "Format: plain prose only — no markdown, no bullet lists, no headings.",
].join("\n");

/**
 * Build the user-message payload from an audit. We hand-format the data as a
 * compact briefing so the model doesn't have to parse JSON.
 */
export function buildUserPrompt(audit: AuditResult): string {
    const lines: string[] = [];
    lines.push(`Team size: ${audit.input.teamSize}`);
    if (audit.input.teamType) lines.push(`Team type: ${audit.input.teamType}`);
    if (audit.input.usagePattern)
        lines.push(`Usage pattern: ${audit.input.usagePattern}`);

    lines.push("");
    lines.push("Current tools:");
    for (const t of audit.input.tools) {
        const idle =
            t.activeUsers != null
                ? ` (active users: ${t.activeUsers}/${t.seats})`
                : "";
        lines.push(
            `- ${t.name} · ${t.tier} · ${t.seats} seats · $${t.monthlyCost}/mo${idle}`
        );
    }

    lines.push("");
    lines.push(`Current monthly spend: $${audit.currentMonthlySpend}`);
    lines.push(`Recommended monthly spend: $${audit.recommendedMonthlySpend}`);
    lines.push(
        `Monthly savings: $${audit.monthlySavings} (${audit.savingsPercent}% cut)`
    );
    lines.push(`Annualized savings: $${audit.annualSavings}`);
    lines.push(`Idle seats detected: ${audit.idleSeats}`);

    lines.push("");
    lines.push("Top recommendations:");
    for (const r of audit.recommendations.slice(0, 5)) {
        lines.push(
            `- ${r.toolName}: ${r.description} → saves $${r.monthlySavings}/mo`
        );
    }

    lines.push("");
    lines.push("Write the summary now.");
    return lines.join("\n");
}

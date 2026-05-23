/**
 * Deterministic, template-based summary used when the LLM is unavailable
 * (no API key, rate limited, transient failure).
 *
 * Produces a polished CFO-style executive summary using only local data.
 */

import type { AuditResult } from "@/types/audit";

const fmt = (n: number) =>
  `$${Math.round(n).toLocaleString("en-US")}`;

export function buildFallbackSummary(
  audit: AuditResult
): string {

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
    .sort(
      (a, b) =>
        b.monthlySavings - a.monthlySavings
    )
    .slice(0, 3);

  const headline =
    monthlySavings > 0
      ? `Your team is currently spending approximately ${fmt(currentMonthlySpend)}/month across ${input.tools.length} AI tool${input.tools.length === 1 ? "" : "s"}, with an estimated ${fmt(monthlySavings)}/month (${savingsPercent}%) recoverable without disrupting active workflows.`
      : `Your team is currently spending approximately ${fmt(currentMonthlySpend)}/month across ${input.tools.length} AI tool${input.tools.length === 1 ? "" : "s"}. Current spend appears appropriately aligned with team usage, with no major optimization opportunities identified.`;

  const recommendationsParagraph =
    topThree.length > 0
      ? `The highest-impact opportunities include ${topThree
          .map(
            (r) =>
              `${r.toolName}, where ${r.description.toLowerCase()} could reduce spend by approximately ${fmt(r.monthlySavings)}/month`
          )
          .join("; ")}.`
      : "";

  const idleSeatsParagraph =
    idleSeats > 0
      ? `We also identified ${idleSeats} inactive seat${
          idleSeats === 1 ? "" : "s"
        } with no activity in the last 30 days. Reclaiming or downgrading unused licenses is typically the lowest-risk optimization and can immediately reduce unnecessary spend.`
      : "";

  const closing =
    monthlySavings > 0
      ? `If all recommendations are implemented, projected annual savings would total approximately ${fmt(annualSavings)}. Prioritize the largest subscription category first to maximize immediate financial impact.`
      : `We recommend repeating this audit quarterly, as AI software utilization and subscription patterns can change rapidly over time.`;

  return [
    headline,
    recommendationsParagraph,
    idleSeatsParagraph,
    closing,
  ]
    .filter(Boolean)
    .join(" ");
}
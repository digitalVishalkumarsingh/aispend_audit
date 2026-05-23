/**
 * Prompt construction for the audit-summary Gemini call.
 * Keep prompts centralized for easier iteration and prompt tuning.
 */

import type { AuditResult } from "@/types/audit";

export const SYSTEM_PROMPT = [
  "You are a senior financial operations analyst writing concise executive summaries for CFOs.",
  "Your task is to analyze AI software spending and identify optimization opportunities.",
  "Tone: professional, direct, confident, plain-English, executive-ready.",
  "Avoid buzzwords, emojis, hype, or overly technical explanations.",
  "Write 3 concise paragraphs.",
  "",
  "Structure:",
  "1. Executive summary of current spend and recoverable savings.",
  "2. Top optimization opportunities with financial impact.",
  "3. Annualized savings estimate and recommended next action.",
  "",
  "Rules:",
  "- Use only the provided data.",
  "- Never invent numbers.",
  "- Keep response under 180 words.",
  "- Avoid markdown, bullet lists, or headings.",
  "- Make the writing sound natural and business-oriented.",
].join("\n");

/**
 * Build the AI prompt from structured audit data.
 */

export function buildUserPrompt(
  audit: AuditResult
): string {

  const lines: string[] = [];

  lines.push("COMPANY AI SPEND AUDIT");
  lines.push("");

  lines.push(`Team size: ${audit.input.teamSize}`);

  if (audit.input.teamType) {
    lines.push(
      `Team type: ${audit.input.teamType}`
    );
  }

  if (audit.input.usagePattern) {
    lines.push(
      `Usage pattern: ${audit.input.usagePattern}`
    );
  }

  lines.push("");
  lines.push("CURRENT TOOLS:");

  for (const tool of audit.input.tools) {

    const usage =
      tool.activeUsers != null
        ? ` | active users ${tool.activeUsers}/${tool.seats}`
        : "";

    lines.push(
      `${tool.name} | ${tool.tier} plan | ${tool.seats} seats | $${tool.monthlyCost}/month${usage}`
    );
  }

  lines.push("");
  lines.push("FINANCIAL SUMMARY:");

  lines.push(
    `Current monthly spend: $${audit.currentMonthlySpend}`
  );

  lines.push(
    `Recommended monthly spend: $${audit.recommendedMonthlySpend}`
  );

  lines.push(
    `Potential monthly savings: $${audit.monthlySavings}`
  );

  lines.push(
    `Savings percentage: ${audit.savingsPercent}%`
  );

  lines.push(
    `Projected annual savings: $${audit.annualSavings}`
  );

  lines.push(
    `Inactive seats detected: ${audit.idleSeats}`
  );

  lines.push("");
  lines.push("TOP RECOMMENDATIONS:");

  for (const rec of audit.recommendations.slice(0, 5)) {

    lines.push(
      `${rec.toolName}: ${rec.description} | estimated savings $${rec.monthlySavings}/month`
    );
  }

  lines.push("");
  lines.push(
    "Generate the executive summary now."
  );

  return lines.join("\n");
}
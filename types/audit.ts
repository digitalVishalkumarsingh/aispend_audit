/**
 * Canonical data shapes for the audit pipeline.
 * `AuditInput`  → what the user submits from the form
 * `AuditResult` → what the engine returns (and what we persist)
 */

export type ToolEntry = {
    /** Tool slug, e.g. "chatgpt-team", "cursor-pro" */
    toolId: string;
    /** Human-readable name shown in the UI / report */
    name: string;
    /** Current plan tier, e.g. "Team", "Pro", "Enterprise" */
    tier: string;
    /** Number of paid seats */
    seats: number;
    /** Monthly cost in USD (per the audit run) */
    monthlyCost: number;
    /** Active users in the last 30 days (optional, drives idle-seat detection) */
    activeUsers?: number;
};

export type AuditInput = {
    teamSize: number;
    /** "engineering" | "product" | "design" | "mixed" | "other" */
    teamType?: string;
    /** "heavy" | "moderate" | "light" — overall usage intensity */
    usagePattern?: "heavy" | "moderate" | "light";
    tools: ToolEntry[];
};

export type Recommendation = {
    toolId: string;
    toolName: string;
    /** "downgrade" | "cancel-seats" | "consolidate" | "switch-tier" | "drop-tool" */
    action: string;
    /** Human-readable description shown in the report */
    description: string;
    /** Monthly savings if applied (USD) */
    monthlySavings: number;
};

export type AuditResult = {
    /** Server-assigned identifier (used in the share URL) */
    id: string;
    /** ISO timestamp */
    createdAt: string;
    input: AuditInput;
    currentMonthlySpend: number;
    recommendedMonthlySpend: number;
    monthlySavings: number;
    annualSavings: number;
    savingsPercent: number;
    idleSeats: number;
    recommendations: Recommendation[];
    /** AI-generated paragraph; absent until `/api/generate-summary` runs */
    summary?: string;
};

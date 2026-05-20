/**
 * Pure numeric helpers used to aggregate audit totals.
 * All math is done in dollars; rounding happens at the edges (display + API).
 */
import type { Recommendation, ToolEntry } from "@/types/audit";

export function sumCurrentSpend(tools: ToolEntry[]): number {
    return tools.reduce((acc, t) => acc + t.monthlyCost, 0);
}

export function sumRecommendedSavings(recs: Recommendation[]): number {
    return recs.reduce((acc, r) => acc + r.monthlySavings, 0);
}

/** Count seats with no activity in the last 30 days (across all tools). */
export function countIdleSeats(tools: ToolEntry[]): number {
    let idle = 0;
    for (const t of tools) {
        if (t.activeUsers == null) continue;
        const unused = Math.max(0, t.seats - t.activeUsers);
        idle += unused;
    }
    return idle;
}

export function pct(part: number, whole: number): number {
    if (whole <= 0) return 0;
    return Math.round((part / whole) * 100);
}

/** Round to nearest dollar; clamps NaN/negatives to 0 for safety. */
export function dollars(n: number): number {
    if (!Number.isFinite(n) || n < 0) return 0;
    return Math.round(n);
}

/**
 * Heuristic recommendation engine.
 *
 * Three rules, in priority order:
 *   1. Idle seats     → cancel unused seats at the current price.
 *   2. Over-tiered    → downgrade to a cheaper catalog tier when no enterprise
 *                       feature is implied by team size.
 *   3. Light usage    → suggest the cheapest tier when `usagePattern === "light"`.
 *
 * Each rule returns a `Recommendation` with concrete monthly savings; the
 * orchestrator filters out anything below `MIN_SAVINGS_THRESHOLD` and caps the
 * list at `MAX_RECOMMENDATIONS`.
 */
import {
    IDLE_SEAT_RATIO,
    MAX_RECOMMENDATIONS,
    MIN_SAVINGS_THRESHOLD,
} from "./constants";
import { findCatalogEntry, findCheaperTier } from "./pricing-rules";
import type { AuditInput, Recommendation, ToolEntry } from "@/types/audit";

function idleSeatRec(t: ToolEntry): Recommendation | null {
    if (t.activeUsers == null || t.seats <= 0) return null;
    const unused = t.seats - t.activeUsers;
    if (unused <= 0) return null;

    const ratio = t.activeUsers / t.seats;
    if (ratio >= IDLE_SEAT_RATIO) return null;

    const perSeat = t.monthlyCost / t.seats;
    const savings = perSeat * unused;
    return {
        toolId: t.toolId,
        toolName: t.name,
        action: "cancel-seats",
        description: `Cancel ${unused} inactive seat${unused === 1 ? "" : "s"} (only ${t.activeUsers}/${t.seats} used in last 30 days)`,
        monthlySavings: savings,
    };
}

function downgradeRec(t: ToolEntry, teamSize: number): Recommendation | null {
    const cheaper = findCheaperTier(t.toolId, t.tier);
    if (!cheaper) return null;

    // Don't push large teams off their enterprise plan — usually a contract reason.
    if (teamSize >= 50 && /enterprise/i.test(t.tier)) return null;

    const seatsToMove = t.activeUsers ?? t.seats;
    if (seatsToMove <= 0) return null;

    const currentPerSeat = t.monthlyCost / Math.max(t.seats, 1);
    const newSpend = cheaper.pricePerSeat * seatsToMove;
    const oldSpend = currentPerSeat * seatsToMove;
    const savings = oldSpend - newSpend;
    if (savings <= 0) return null;

    return {
        toolId: t.toolId,
        toolName: t.name,
        action: "switch-tier",
        description: `Move ${seatsToMove} seat${seatsToMove === 1 ? "" : "s"} from ${t.tier} to ${cheaper.tier} ($${cheaper.pricePerSeat}/seat)`,
        monthlySavings: savings,
    };
}

function lightUsageRec(
    t: ToolEntry,
    usagePattern: AuditInput["usagePattern"]
): Recommendation | null {
    if (usagePattern !== "light") return null;
    const entry = findCatalogEntry(t.toolId);
    if (!entry || entry.tiers.length === 0) return null;
    const cheapest = entry.tiers[0];
    if (cheapest.tier.toLowerCase() === t.tier.toLowerCase()) return null;

    const seats = t.activeUsers ?? t.seats;
    const newSpend = cheapest.pricePerSeat * seats;
    const savings = t.monthlyCost - newSpend;
    if (savings <= 0) return null;

    return {
        toolId: t.toolId,
        toolName: t.name,
        action: "drop-tool",
        description: `Light usage detected — drop to ${cheapest.tier} ($${cheapest.pricePerSeat}/seat)`,
        monthlySavings: savings,
    };
}

export function buildRecommendations(input: AuditInput): Recommendation[] {
    const recs: Recommendation[] = [];

    for (const t of input.tools) {
        const idle = idleSeatRec(t);
        if (idle) {
            recs.push(idle);
            // If idle was applied, skip downgrade for the same tool — they stack noisily.
            continue;
        }
        const downgrade = downgradeRec(t, input.teamSize);
        if (downgrade) {
            recs.push(downgrade);
            continue;
        }
        const light = lightUsageRec(t, input.usagePattern);
        if (light) recs.push(light);
    }

    return recs
        .filter((r) => r.monthlySavings >= MIN_SAVINGS_THRESHOLD)
        .sort((a, b) => b.monthlySavings - a.monthlySavings)
        .slice(0, MAX_RECOMMENDATIONS);
}

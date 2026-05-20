/**
 * Shape transformers between persisted/internal forms and wire forms.
 * Currently a single rounding pass — kept in its own file so adding e.g. PDF
 * or CSV exports later doesn't bloat the engine.
 */
import { dollars } from "./savings-calculator";
import type { AuditResult, Recommendation } from "@/types/audit";

function roundRec(r: Recommendation): Recommendation {
    return { ...r, monthlySavings: dollars(r.monthlySavings) };
}

/** Round every dollar field on an `AuditResult` to the nearest whole dollar. */
export function roundAuditResult(audit: AuditResult): AuditResult {
    return {
        ...audit,
        currentMonthlySpend: dollars(audit.currentMonthlySpend),
        recommendedMonthlySpend: dollars(audit.recommendedMonthlySpend),
        monthlySavings: dollars(audit.monthlySavings),
        annualSavings: dollars(audit.annualSavings),
        recommendations: audit.recommendations.map(roundRec),
    };
}

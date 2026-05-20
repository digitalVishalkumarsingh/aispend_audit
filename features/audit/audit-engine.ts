/**
 * Top-level audit orchestrator.
 *
 * `runAudit()` takes a validated `AuditInput`, runs the recommendation engine,
 * computes aggregate totals, and returns the computed slice of `AuditResult`
 * (i.e. everything except `id`/`createdAt`/`input`/`summary`).
 *
 * Persistence lives in `services/database/audit-service` — this module stays
 * pure so it's trivially testable.
 */
import { buildRecommendations } from "./recommendation-engine";
import {
    countIdleSeats,
    pct,
    sumCurrentSpend,
    sumRecommendedSavings,
} from "./savings-calculator";
import { roundAuditResult } from "./transformers";
import type { AuditInput, AuditResult } from "@/types/audit";

export type ComputedAudit = Omit<AuditResult, "id" | "createdAt" | "input" | "summary">;

export function runAudit(input: AuditInput): ComputedAudit {
    const recommendations = buildRecommendations(input);
    const currentMonthlySpend = sumCurrentSpend(input.tools);
    const monthlySavings = sumRecommendedSavings(recommendations);
    const recommendedMonthlySpend = Math.max(0, currentMonthlySpend - monthlySavings);
    const annualSavings = monthlySavings * 12;
    const savingsPercent = pct(monthlySavings, currentMonthlySpend);
    const idleSeats = countIdleSeats(input.tools);

    // Reuse the result-rounding helper by stuffing the computed fields into a
    // throwaway shell — keeps rounding logic in one place.
    const rounded = roundAuditResult({
        id: "",
        createdAt: "",
        input,
        currentMonthlySpend,
        recommendedMonthlySpend,
        monthlySavings,
        annualSavings,
        savingsPercent,
        idleSeats,
        recommendations,
    });

    return {
        currentMonthlySpend: rounded.currentMonthlySpend,
        recommendedMonthlySpend: rounded.recommendedMonthlySpend,
        monthlySavings: rounded.monthlySavings,
        annualSavings: rounded.annualSavings,
        savingsPercent: rounded.savingsPercent,
        idleSeats: rounded.idleSeats,
        recommendations: rounded.recommendations,
    };
}

/**
 * High-level entry point for AI summary generation.
 * Tries the LLM first; on any failure (missing key, rate limit, timeout,
 * malformed response) falls back to the deterministic template so the user
 * always gets a summary.
 */
import { chatCompletion, OpenAIError } from "@/services/openai/client";
import { buildFallbackSummary } from "./fallback-summary";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompts";
import { hasOpenAI } from "@/lib/env";
import type { AuditResult } from "@/types/audit";

export type GenerateSummaryOutput = {
    summary: string;
    source: "openai" | "fallback";
};

/** 8-second hard cap on the LLM round trip. */
const LLM_TIMEOUT_MS = 8000;

export async function generateAuditSummary(
    audit: AuditResult
): Promise<GenerateSummaryOutput> {
    if (!hasOpenAI()) {
        return { summary: buildFallbackSummary(audit), source: "fallback" };
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), LLM_TIMEOUT_MS);

    try {
        const summary = await chatCompletion({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: buildUserPrompt(audit) },
            ],
            temperature: 0.4,
            maxTokens: 400,
            signal: controller.signal,
        });
        return { summary, source: "openai" };
    } catch (err) {
        // Log without leaking the API key — `OpenAIError` doesn't carry it
        if (err instanceof OpenAIError) {
            console.warn("[ai-summary] OpenAI failed, using fallback:", err.message);
        } else {
            console.warn("[ai-summary] Unexpected error, using fallback:", err);
        }
        return { summary: buildFallbackSummary(audit), source: "fallback" };
    } finally {
        clearTimeout(timer);
    }
}

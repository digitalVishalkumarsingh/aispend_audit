/**
 * High-level entry point for AI summary generation.
 * Tries Gemini first; on any failure falls back to deterministic summary.
 */

import { chatCompletion, GeminiError } from "../../services/openai/client";
import { buildFallbackSummary } from "./fallback-summary";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompts";
import { hasGemini } from "../../lib/env";

import type { AuditResult } from "../../types/audit";

export type GenerateSummaryOutput = {
  summary: string;
  source: "gemini" | "fallback";
};

/** 8-second hard cap on the AI round trip. */
const LLM_TIMEOUT_MS = 8000;

export async function generateAuditSummary(
  audit: AuditResult
): Promise<GenerateSummaryOutput> {

  if (!hasGemini()) {
    return {
      summary: buildFallbackSummary(audit),
      source: "fallback",
    };
  }

  const controller = new AbortController();

  const timer = setTimeout(() => {
    controller.abort();
  }, LLM_TIMEOUT_MS);

  try {

    const summary = await chatCompletion({
      messages: [
        {
          role: "user",
          content: `
${SYSTEM_PROMPT}

${buildUserPrompt(audit)}
          `.trim(),
        },
      ],
      temperature: 0.4,
      maxTokens: 400,
      signal: controller.signal,
    });

    return {
      summary,
      source: "gemini",
    };

  } catch (err) {

    if (err instanceof GeminiError) {

      console.warn(
        "[ai-summary] Gemini failed, using fallback:",
        err.message
      );

    } else {

      console.warn(
        "[ai-summary] Unexpected error, using fallback:",
        err
      );
    }

    return {
      summary: buildFallbackSummary(audit),
      source: "fallback",
    };

  } finally {

    clearTimeout(timer);
  }
}
/**
 * Wire shapes for all `/api/*` route handlers.
 * Keep these stable — the client uses them via the typed fetch helpers.
 */

import type { AuditInput, AuditResult } from "./audit";
import type { Lead, LeadInput } from "./lead";

export type ApiSuccess<T> = {
  ok: true;
  data: T;
};

export type ApiError = {
  ok: false;
  error: string;
  code?: string;
};

export type ApiResponse<T> =
  | ApiSuccess<T>
  | ApiError;

// POST /api/audit
export type CreateAuditRequest = AuditInput;

export type CreateAuditResponse =
  ApiResponse<AuditResult>;

// GET /api/audit?id=...
export type GetAuditResponse =
  ApiResponse<AuditResult>;

// POST /api/generate-summary

export type GenerateSummaryRequest = {
  auditId: string;
};

export type AISource =
  | "gemini"
  | "fallback";

export type GenerateSummaryResponse =
  ApiResponse<{
    summary: string;
    source: AISource;
  }>;

// POST /api/save-lead

export type SaveLeadRequest = LeadInput;

export type SaveLeadResponse =
  ApiResponse<Lead>;
/**
 * POST /api/generate-summary
 * Body: { auditId: string }
 * Generates (or regenerates) the CFO-ready paragraph for an existing audit and
 * persists it back onto the record. Always returns a summary — either from the
 * LLM or the deterministic fallback (see `features/ai/ai-summary`).
 */
import { generateAuditSummary } from "@/features/ai/ai-summary";
import {
  getAudit,
  updateAuditSummary,
} from "@/services/database/audit-service";
import type {
  GenerateSummaryRequest,
  GenerateSummaryResponse,
} from "@/types/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json<T>(body: T, init?: ResponseInit): Response {
  return Response.json(body, init);
}

export async function POST(request: Request): Promise<Response> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json<GenerateSummaryResponse>(
      { ok: false, error: "Invalid JSON body", code: "bad_json" },
      { status: 400 }
    );
  }

  const auditId = (raw as Partial<GenerateSummaryRequest> | null)?.auditId;
  if (typeof auditId !== "string" || auditId.length === 0) {
    return json<GenerateSummaryResponse>(
      { ok: false, error: "`auditId` is required", code: "missing_id" },
      { status: 400 }
    );
  }

  const audit = await getAudit(auditId);
  if (!audit) {
    return json<GenerateSummaryResponse>(
      { ok: false, error: "Audit not found", code: "not_found" },
      { status: 404 }
    );
  }

  const { summary, source } = await generateAuditSummary(audit);
  await updateAuditSummary(auditId, summary);

  return json<GenerateSummaryResponse>({
    ok: true,
    data: { summary, source },
  });
}

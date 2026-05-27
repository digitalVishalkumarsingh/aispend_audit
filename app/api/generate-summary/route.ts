/**
 * POST /api/generate-summary
 * Body: { auditId: string }
 */

import * as aiSummary from "@/features/ai/ai-summary";

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

function json<T>(
  body: T,
  init?: ResponseInit
): Response {
  return Response.json(body, init);
}

export async function POST(
  request: Request
): Promise<Response> {

  try {

    let raw: unknown;

    try {
      raw = await request.json();
    } catch {
      return json<GenerateSummaryResponse>(
        {
          ok: false,
          error: "Invalid JSON body",
          code: "bad_json",
        },
        { status: 400 }
      );
    }

    const auditId =
      (raw as Partial<GenerateSummaryRequest> | null)
        ?.auditId;

    if (
      typeof auditId !== "string" ||
      auditId.trim().length === 0
    ) {
      return json<GenerateSummaryResponse>(
        {
          ok: false,
          error: "`auditId` is required",
          code: "missing_id",
        },
        { status: 400 }
      );
    }

    const audit = await getAudit(auditId);

    if (!audit) {
      return json<GenerateSummaryResponse>(
        {
          ok: false,
          error: "Audit not found",
          code: "not_found",
        },
        { status: 404 }
      );
    }

    const generateFn =
      aiSummary.generateAuditSummary ??
      aiSummary.default;

    const { summary, source } = await generateFn(audit);

    await updateAuditSummary(
      auditId,
      summary
    );

    return json<GenerateSummaryResponse>({
      ok: true,
      data: {
        summary,
        source,
      },
    });

  } catch (error) {

    console.error(
      "[generate-summary-route]",
      error
    );

    return json<GenerateSummaryResponse>(
      {
        ok: false,
        error: "Internal server error",
        code: "server_error",
      },
      { status: 500 }
    );
  }
}

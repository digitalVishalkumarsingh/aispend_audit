/**
 * POST /api/audit   → run an audit and persist it; returns the saved `AuditResult`.
 * GET  /api/audit?id=… → fetch a previously-saved audit.
 *
 * Both responses use the `ApiResponse<T>` envelope from `types/api`.
 */
import { runAudit } from "@/features/audit/audit-engine";
import { validateAuditInput, ValidationError } from "@/features/audit/validators";
import { getAudit, saveAudit } from "@/services/database/audit-service";
import type {
  CreateAuditResponse,
  GetAuditResponse,
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
    return json<CreateAuditResponse>(
      { ok: false, error: "Invalid JSON body", code: "bad_json" },
      { status: 400 }
    );
  }

  let input;
  try {
    input = validateAuditInput(raw);
  } catch (err) {
    if (err instanceof ValidationError) {
      return json<CreateAuditResponse>(
        { ok: false, error: err.message, code: err.field ?? "validation" },
        { status: 400 }
      );
    }
    throw err;
  }

  const computed = runAudit(input);
  const audit = await saveAudit(input, computed);

  return json<CreateAuditResponse>({ ok: true, data: audit }, { status: 201 });
}

export async function GET(request: Request): Promise<Response> {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return json<GetAuditResponse>(
      { ok: false, error: "Missing `id` query parameter", code: "missing_id" },
      { status: 400 }
    );
  }
  const audit = await getAudit(id);
  if (!audit) {
    return json<GetAuditResponse>(
      { ok: false, error: "Audit not found", code: "not_found" },
      { status: 404 }
    );
  }
  return json<GetAuditResponse>({ ok: true, data: audit });
}

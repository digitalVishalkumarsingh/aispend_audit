/**
 * POST /api/save-lead
 * Body: { email, auditId?, source? }
 * Persists a lead (de-duped by email), then fires the confirmation email
 * asynchronously when an `auditId` is supplied. Email-send failures do NOT
 * fail the request — they're recorded on the lead via `emailSent: false`.
 */
import { sendAuditConfirmation } from "@/features/email/email";
import { validateLeadInput, ValidationError } from "@/features/audit/validators";
import {
  getAudit,
  markLeadEmailSent,
  saveLead,
} from "@/services/database/audit-service";
import type { SaveLeadResponse } from "@/types/api";

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
    return json<SaveLeadResponse>(
      { ok: false, error: "Invalid JSON body", code: "bad_json" },
      { status: 400 }
    );
  }

  let input;
  try {
    input = validateLeadInput(raw);
  } catch (err) {
    if (err instanceof ValidationError) {
      return json<SaveLeadResponse>(
        { ok: false, error: err.message, code: err.field ?? "validation" },
        { status: 400 }
      );
    }
    throw err;
  }

  const lead = await saveLead(input);

  // Best-effort confirmation email when we have an audit to point at.
  if (input.auditId && !lead.emailSent) {
    const audit = await getAudit(input.auditId);
    if (audit) {
      const outcome = await sendAuditConfirmation({
        to: lead.email,
        audit,
      });
      if (outcome.sent) {
        await markLeadEmailSent(lead.id);
        lead.emailSent = true;
      }
    }
  }

  return json<SaveLeadResponse>({ ok: true, data: lead }, { status: 201 });
}

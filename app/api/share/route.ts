/**
 * GET /api/share?id=…
 * Returns the canonical share URL + social metadata for an audit. Used by the
 * client "Copy link" button so the report URL is built server-side from the
 * configured `APP_URL` (avoids stale `window.location` issues in previews).
 */
import { buildShareLink } from "@/features/share/generate-share-link";
import {
  buildShareDescription,
  buildShareTitle,
} from "@/features/share/metadata";
import { getAudit } from "@/services/database/audit-service";
import type { ApiResponse } from "@/types/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ShareResponse = ApiResponse<{
  url: string;
  title: string;
  description: string;
}>;

function json<T>(body: T, init?: ResponseInit): Response {
  return Response.json(body, init);
}

export async function GET(request: Request): Promise<Response> {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return json<ShareResponse>(
      { ok: false, error: "Missing `id` query parameter", code: "missing_id" },
      { status: 400 }
    );
  }

  const audit = await getAudit(id);
  if (!audit) {
    return json<ShareResponse>(
      { ok: false, error: "Audit not found", code: "not_found" },
      { status: 404 }
    );
  }

  return json<ShareResponse>({
    ok: true,
    data: {
      url: buildShareLink(audit.id),
      title: buildShareTitle(audit),
      description: buildShareDescription(audit),
    },
  });
}

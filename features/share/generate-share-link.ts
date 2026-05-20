/**
 * Build absolute share URLs for an audit report.
 * Reads `APP_URL` from `lib/env`, which defaults to the production origin.
 */
import { env } from "@/lib/env";

export function buildShareLink(auditId: string): string {
    const base = env.APP_URL.replace(/\/+$/, "");
    return `${base}/result/${encodeURIComponent(auditId)}`;
}

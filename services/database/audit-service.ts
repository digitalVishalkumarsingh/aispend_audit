/**
 * Persistence layer for audits and leads.
 *
 * All functions operate against the abstract `KVStore` from `lib/db`. Swap the
 * underlying store there (Vercel KV, Redis, Postgres) without touching this file.
 *
 * Key scheme:
 *   audit:<id>        → AuditResult
 *   audit:index       → string[] of audit ids (newest-first, capped at 200)
 *   lead:<id>         → Lead
 *   lead:by-email:<email-lowercased>  → lead id (for de-dup)
 */
import { db, newId } from "@/lib/db";
import type { AuditInput, AuditResult } from "@/types/audit";
import type { Lead, LeadInput } from "@/types/lead";

const AUDIT_KEY = (id: string) => `audit:${id}`;
const LEAD_KEY = (id: string) => `lead:${id}`;
const LEAD_BY_EMAIL_KEY = (email: string) =>
    `lead:by-email:${email.trim().toLowerCase()}`;

// ────────────────────────────────────────────────────────────────────────────
// Audits
// ────────────────────────────────────────────────────────────────────────────

export async function saveAudit(input: AuditInput, computed: Omit<AuditResult, "id" | "createdAt" | "input">): Promise<AuditResult> {
    const audit: AuditResult = {
        id: newId("aud"),
        createdAt: new Date().toISOString(),
        input,
        ...computed,
    };
    await db.set(AUDIT_KEY(audit.id), audit);
    return audit;
}

export async function getAudit(id: string): Promise<AuditResult | null> {
    if (!id) return null;
    return db.get<AuditResult>(AUDIT_KEY(id));
}

export async function updateAuditSummary(
    id: string,
    summary: string
): Promise<AuditResult | null> {
    const existing = await getAudit(id);
    if (!existing) return null;
    const updated: AuditResult = { ...existing, summary };
    await db.set(AUDIT_KEY(id), updated);
    return updated;
}

// ────────────────────────────────────────────────────────────────────────────
// Leads
// ────────────────────────────────────────────────────────────────────────────

export async function saveLead(input: LeadInput): Promise<Lead> {
    const email = input.email.trim().toLowerCase();

    // De-dup by email: if we've seen this address, return the existing record so
    // re-submitting the form doesn't create duplicates or re-send emails.
    const existingId = await db.get<string>(LEAD_BY_EMAIL_KEY(email));
    if (existingId) {
        const existing = await db.get<Lead>(LEAD_KEY(existingId));
        if (existing) return existing;
    }

    const lead: Lead = {
        id: newId("lead"),
        createdAt: new Date().toISOString(),
        email,
        auditId: input.auditId,
        source: input.source,
        emailSent: false,
    };

    await db.set(LEAD_KEY(lead.id), lead);
    await db.set(LEAD_BY_EMAIL_KEY(email), lead.id);
    return lead;
}

export async function markLeadEmailSent(id: string): Promise<void> {
    const lead = await db.get<Lead>(LEAD_KEY(id));
    if (!lead) return;
    await db.set(LEAD_KEY(id), { ...lead, emailSent: true });
}

export async function getLead(id: string): Promise<Lead | null> {
    return db.get<Lead>(LEAD_KEY(id));
}

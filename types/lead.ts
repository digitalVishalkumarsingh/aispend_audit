/**
 * Lead = an email captured during the audit flow (e.g. to send the full report).
 * Stored separately from the audit so audits remain anonymous unless the user
 * explicitly opts in to email follow-up.
 */
export type Lead = {
    /** Server-assigned identifier */
    id: string;
    /** ISO timestamp */
    createdAt: string;
    email: string;
    /** Audit this lead was captured from, if any */
    auditId?: string;
    /** Free-text source label (e.g. "audit-result", "newsletter-cta") */
    source?: string;
    /** Whether the confirmation email was successfully dispatched */
    emailSent: boolean;
};

export type LeadInput = {
    email: string;
    auditId?: string;
    source?: string;
};

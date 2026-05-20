/**
 * Minimal fetch-based Resend client. No SDK, no extra dependency.
 * Docs: https://resend.com/docs/api-reference/emails/send-email
 */
import { env } from "@/lib/env";

export type SendEmailOptions = {
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
    /** Override the default sender configured in env */
    from?: string;
    /** Reply-to address (single value) */
    replyTo?: string;
};

export type SendEmailResult = {
    id: string;
};

export class ResendError extends Error {
    constructor(
        message: string,
        public readonly status?: number,
        public readonly body?: unknown
    ) {
        super(message);
        this.name = "ResendError";
    }
}

const RESEND_URL = "https://api.resend.com/emails";

export async function sendEmail(
    opts: SendEmailOptions
): Promise<SendEmailResult> {
    if (!env.RESEND_API_KEY) {
        throw new ResendError("RESEND_API_KEY is not configured");
    }

    const payload = {
        from: opts.from ?? env.RESEND_FROM_EMAIL,
        to: Array.isArray(opts.to) ? opts.to : [opts.to],
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
        reply_to: opts.replyTo,
    };

    const res = await fetch(RESEND_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify(payload),
        cache: "no-store",
    });

    const json = (await res.json().catch(() => ({}))) as {
        id?: string;
        message?: string;
        name?: string;
    };

    if (!res.ok || !json.id) {
        throw new ResendError(
            json.message ?? `Resend request failed (${res.status})`,
            res.status,
            json
        );
    }

    return { id: json.id };
}

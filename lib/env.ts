/**
 * Centralized, lazy-evaluated env access.
 * All API keys are optional at boot — the corresponding feature degrades to a
 * fallback path when its key is absent (e.g. AI summary → deterministic fallback,
 * email → no-op). This keeps `next build` from blowing up in CI without secrets.
 */

function read(name: string): string | undefined {
    const v = process.env[name];
    return v && v.trim().length > 0 ? v.trim() : undefined;
}

export const env = {
    // LLM
    OPENAI_API_KEY: read("OPENAI_API_KEY"),
    OPENAI_MODEL: read("OPENAI_MODEL") ?? "gpt-4o-mini",
    OPENAI_BASE_URL: read("OPENAI_BASE_URL") ?? "https://api.openai.com/v1",

    // Email
    RESEND_API_KEY: read("RESEND_API_KEY"),
    RESEND_FROM_EMAIL: read("RESEND_FROM_EMAIL") ?? "StackSave <hello@stacksave.app>",

    // Database (reserved for future swap to real backend)
    DATABASE_URL: read("DATABASE_URL"),

    // App
    APP_URL: read("NEXT_PUBLIC_APP_URL") ?? "https://stacksave.app",
    NODE_ENV: read("NODE_ENV") ?? "development",
} as const;

export function hasOpenAI(): boolean {
    return Boolean(env.OPENAI_API_KEY);
}

export function hasResend(): boolean {
    return Boolean(env.RESEND_API_KEY);
}

export function isProd(): boolean {
    return env.NODE_ENV === "production";
}

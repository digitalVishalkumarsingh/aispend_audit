/**
 * Centralized, lazy-evaluated env access.
 * Missing services gracefully degrade instead of crashing the app.
 */

function read(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim().length > 0 ? v.trim() : undefined;
}

export const env = {
  // Gemini AI
  GEMINI_API_KEY: read("GEMINI_API_KEY"),

  // Email
  RESEND_API_KEY: read("RESEND_API_KEY"),
  RESEND_FROM_EMAIL:
    read("RESEND_FROM_EMAIL") ??
    "StackSave <onboarding@resend.dev>",

  // Database
  MONGODB_URI:
    read("MONGODB_URI") ??
    "mongodb://localhost:27017/aiaudit",

  // App
  APP_URL:
    read("NEXT_PUBLIC_APP_URL") ??
    "https://aispendaudit-tau.vercel.app",

  NODE_ENV: read("NODE_ENV") ?? "development",
} as const;

// Feature flags

export function hasGemini(): boolean {
  return Boolean(env.GEMINI_API_KEY);
}

export function hasResend(): boolean {
  return Boolean(env.RESEND_API_KEY);
}

export function isProd(): boolean {
  return env.NODE_ENV === "production";
}
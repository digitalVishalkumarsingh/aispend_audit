import { env } from "@/lib/env";

export type ChatMessage = {
  role: "user" | "model";
  content: string;
};

export type ChatCompletionOptions = {
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  signal?: AbortSignal;
};

export class GeminiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly body?: unknown
  ) {
    super(message);
    this.name = "GeminiError";
  }
}

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function chatCompletion(
  opts: ChatCompletionOptions
): Promise<string> {
  const GEMINI_API_KEY = (env as { GEMINI_API_KEY?: string }).GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    throw new GeminiError("GEMINI_API_KEY is not configured");
  }

  const prompt = opts.messages
    .map((m) => m.content)
    .join("\n");

  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature: opts.temperature ?? 0.4,
      maxOutputTokens: opts.maxTokens ?? 400,
    },
  };

  const res = await fetch(
    `${GEMINI_URL}?key=${env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: opts.signal,
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new GeminiError(
      `Gemini request failed (${res.status})`,
      res.status,
      errBody
    );
  }

  const json = await res.json();

  const text =
    json.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!text) {
    throw new GeminiError(
      "Gemini returned empty response",
      res.status,
      json
    );
  }

  return text;
}
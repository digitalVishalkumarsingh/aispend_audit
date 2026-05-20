/**
 * Minimal fetch-based OpenAI Chat Completions client.
 * Avoids the `openai` SDK so we keep the bundle slim and stay runtime-agnostic
 * (works in both Node and Edge runtimes).
 */
import { env } from "@/lib/env";

export type ChatMessage = {
    role: "system" | "user" | "assistant";
    content: string;
};

export type ChatCompletionOptions = {
    messages: ChatMessage[];
    model?: string;
    temperature?: number;
    maxTokens?: number;
    /** Optional abort signal for caller-side timeouts */
    signal?: AbortSignal;
};

export class OpenAIError extends Error {
    constructor(
        message: string,
        public readonly status?: number,
        public readonly body?: unknown
    ) {
        super(message);
        this.name = "OpenAIError";
    }
}

/**
 * Call the OpenAI Chat Completions endpoint and return the first message text.
 * Throws `OpenAIError` on non-2xx responses or missing API key.
 */
export async function chatCompletion(
    opts: ChatCompletionOptions
): Promise<string> {
    if (!env.OPENAI_API_KEY) {
        throw new OpenAIError("OPENAI_API_KEY is not configured");
    }

    const url = `${env.OPENAI_BASE_URL}/chat/completions`;
    const body = {
        model: opts.model ?? env.OPENAI_MODEL,
        messages: opts.messages,
        temperature: opts.temperature ?? 0.4,
        max_tokens: opts.maxTokens ?? 400,
    };

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify(body),
        signal: opts.signal,
        // Route handlers are uncached by default, but be explicit:
        cache: "no-store",
    });

    if (!res.ok) {
        const errBody = await res.text().catch(() => "");
        throw new OpenAIError(
            `OpenAI request failed (${res.status})`,
            res.status,
            errBody
        );
    }

    const json = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
    };
    const text = json.choices?.[0]?.message?.content?.trim();
    if (!text) {
        throw new OpenAIError("OpenAI returned an empty completion", res.status, json);
    }
    return text;
}

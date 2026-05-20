/**
 * Reference pricing for common AI tools (USD / seat / month, list price).
 * Used to suggest downgrades and detect over-tiered plans. Numbers are
 * intentionally conservative — real list prices may change, so treat this as a
 * heuristic catalog, not the source of truth for billing.
 */

export type ToolTier = {
    /** Human label, e.g. "Plus", "Team", "Enterprise" */
    tier: string;
    /** Per-seat monthly USD */
    pricePerSeat: number;
};

export type ToolCatalogEntry = {
    /** Canonical slug (matches `ToolEntry.toolId`) */
    toolId: string;
    /** Pretty name shown to users */
    name: string;
    /** Tiers ordered cheapest → most expensive. */
    tiers: ToolTier[];
};

export const TOOL_CATALOG: readonly ToolCatalogEntry[] = [
    {
        toolId: "chatgpt",
        name: "ChatGPT",
        tiers: [
            { tier: "Plus", pricePerSeat: 20 },
            { tier: "Team", pricePerSeat: 30 },
            { tier: "Enterprise", pricePerSeat: 60 },
        ],
    },
    {
        toolId: "claude",
        name: "Claude",
        tiers: [
            { tier: "Pro", pricePerSeat: 20 },
            { tier: "Team", pricePerSeat: 30 },
        ],
    },
    {
        toolId: "cursor",
        name: "Cursor",
        tiers: [
            { tier: "Pro", pricePerSeat: 20 },
            { tier: "Business", pricePerSeat: 40 },
        ],
    },
    {
        toolId: "copilot",
        name: "GitHub Copilot",
        tiers: [
            { tier: "Individual", pricePerSeat: 10 },
            { tier: "Business", pricePerSeat: 19 },
            { tier: "Enterprise", pricePerSeat: 39 },
        ],
    },
    {
        toolId: "perplexity",
        name: "Perplexity",
        tiers: [
            { tier: "Pro", pricePerSeat: 20 },
            { tier: "Enterprise", pricePerSeat: 40 },
        ],
    },
    {
        toolId: "gemini",
        name: "Gemini",
        tiers: [
            { tier: "Advanced", pricePerSeat: 20 },
            { tier: "Business", pricePerSeat: 30 },
        ],
    },
] as const;

export function findCatalogEntry(toolId: string): ToolCatalogEntry | undefined {
    return TOOL_CATALOG.find((t) => t.toolId === toolId);
}

/** Returns the next-cheaper tier for a given tool/tier combo, if any. */
export function findCheaperTier(
    toolId: string,
    currentTier: string
): ToolTier | undefined {
    const entry = findCatalogEntry(toolId);
    if (!entry) return undefined;
    const idx = entry.tiers.findIndex(
        (t) => t.tier.toLowerCase() === currentTier.toLowerCase()
    );
    if (idx <= 0) return undefined;
    return entry.tiers[idx - 1];
}

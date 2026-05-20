/**
 * Runtime validators for API payloads. We deliberately avoid pulling in zod to
 * keep the bundle minimal — the shapes are small enough to validate by hand.
 */
import {
    MAX_MONTHLY_COST,
    MAX_SEATS_PER_TOOL,
    MAX_TEAM_SIZE,
    MAX_TOOLS,
} from "./constants";
import type { AuditInput, ToolEntry } from "@/types/audit";
import type { LeadInput } from "@/types/lead";

export class ValidationError extends Error {
    constructor(message: string, public readonly field?: string) {
        super(message);
        this.name = "ValidationError";
    }
}

function isFiniteNumber(v: unknown): v is number {
    return typeof v === "number" && Number.isFinite(v);
}

function isNonEmptyString(v: unknown): v is string {
    return typeof v === "string" && v.trim().length > 0;
}

function validateTool(t: unknown, idx: number): ToolEntry {
    if (!t || typeof t !== "object") {
        throw new ValidationError(`tools[${idx}] must be an object`, `tools[${idx}]`);
    }
    const o = t as Record<string, unknown>;
    if (!isNonEmptyString(o.toolId))
        throw new ValidationError(`tools[${idx}].toolId is required`, `tools[${idx}].toolId`);
    if (!isNonEmptyString(o.name))
        throw new ValidationError(`tools[${idx}].name is required`, `tools[${idx}].name`);
    if (!isNonEmptyString(o.tier))
        throw new ValidationError(`tools[${idx}].tier is required`, `tools[${idx}].tier`);
    if (!isFiniteNumber(o.seats) || o.seats < 0 || o.seats > MAX_SEATS_PER_TOOL)
        throw new ValidationError(
            `tools[${idx}].seats must be 0..${MAX_SEATS_PER_TOOL}`,
            `tools[${idx}].seats`
        );
    if (
        !isFiniteNumber(o.monthlyCost) ||
        o.monthlyCost < 0 ||
        o.monthlyCost > MAX_MONTHLY_COST
    )
        throw new ValidationError(
            `tools[${idx}].monthlyCost must be 0..${MAX_MONTHLY_COST}`,
            `tools[${idx}].monthlyCost`
        );

    const activeUsers =
        o.activeUsers === undefined || o.activeUsers === null
            ? undefined
            : (() => {
                if (!isFiniteNumber(o.activeUsers) || o.activeUsers < 0)
                    throw new ValidationError(
                        `tools[${idx}].activeUsers must be a non-negative number`,
                        `tools[${idx}].activeUsers`
                    );
                return o.activeUsers;
            })();

    return {
        toolId: o.toolId.trim(),
        name: o.name.trim(),
        tier: o.tier.trim(),
        seats: Math.round(o.seats),
        monthlyCost: Math.round(o.monthlyCost * 100) / 100,
        activeUsers: activeUsers !== undefined ? Math.round(activeUsers) : undefined,
    };
}

export function validateAuditInput(body: unknown): AuditInput {
    if (!body || typeof body !== "object")
        throw new ValidationError("Request body must be a JSON object");
    const o = body as Record<string, unknown>;

    if (!isFiniteNumber(o.teamSize) || o.teamSize < 1 || o.teamSize > MAX_TEAM_SIZE)
        throw new ValidationError(`teamSize must be 1..${MAX_TEAM_SIZE}`, "teamSize");

    if (!Array.isArray(o.tools) || o.tools.length === 0)
        throw new ValidationError("tools must be a non-empty array", "tools");
    if (o.tools.length > MAX_TOOLS)
        throw new ValidationError(`tools cannot exceed ${MAX_TOOLS} entries`, "tools");

    const tools = o.tools.map(validateTool);

    const usagePattern =
        o.usagePattern === undefined
            ? undefined
            : o.usagePattern === "heavy" || o.usagePattern === "moderate" || o.usagePattern === "light"
                ? o.usagePattern
                : (() => {
                    throw new ValidationError(
                        "usagePattern must be 'heavy' | 'moderate' | 'light'",
                        "usagePattern"
                    );
                })();

    return {
        teamSize: Math.round(o.teamSize),
        teamType: isNonEmptyString(o.teamType) ? o.teamType.trim() : undefined,
        usagePattern,
        tools,
    };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLeadInput(body: unknown): LeadInput {
    if (!body || typeof body !== "object")
        throw new ValidationError("Request body must be a JSON object");
    const o = body as Record<string, unknown>;

    if (!isNonEmptyString(o.email) || !EMAIL_RE.test(o.email.trim()))
        throw new ValidationError("email must be a valid email address", "email");

    return {
        email: o.email.trim().toLowerCase(),
        auditId: isNonEmptyString(o.auditId) ? o.auditId.trim() : undefined,
        source: isNonEmptyString(o.source) ? o.source.trim() : undefined,
    };
}

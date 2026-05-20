/**
 * Tunable thresholds used by the audit engine.
 * Keep these here so product/finance can adjust them without touching logic.
 */

/** Active-user ratio below which a seat block is flagged for downsizing. */
export const IDLE_SEAT_RATIO = 0.6;

/** Cap on number of recommendations returned (UI shows top N). */
export const MAX_RECOMMENDATIONS = 8;

/** Min monthly savings (USD) for a recommendation to be surfaced. */
export const MIN_SAVINGS_THRESHOLD = 5;

/** Hard caps on AuditInput shape so we reject obvious junk before computing. */
export const MAX_TEAM_SIZE = 5000;
export const MAX_TOOLS = 50;
export const MAX_SEATS_PER_TOOL = 10000;
export const MAX_MONTHLY_COST = 1_000_000;

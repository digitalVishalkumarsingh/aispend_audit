/**
 * Tiny key/value store interface used by the audit + lead services.
 *
 * The default implementation is an in-process `Map` — sufficient for local dev
 * and for prototyping on a single warm serverless instance. Swap in a real
 * backend by replacing `createMemoryStore()` with e.g. a Vercel KV / Upstash
 * client that satisfies the same `KVStore` interface.
 *
 * NOTE for production on Vercel: each serverless invocation may receive a fresh
 * module instance, so the in-memory store can lose data between requests.
 * Plug in a persistent backend before launch.
 */

export interface KVStore {
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, value: T): Promise<void>;
    del(key: string): Promise<void>;
    list(prefix: string): Promise<string[]>;
}

function createMemoryStore(): KVStore {
    // Cache the underlying Map on globalThis so HMR in `next dev` doesn't wipe it
    // between hot reloads. The `as` cast is the only un-typed bit.
    const g = globalThis as unknown as { __stacksaveStore?: Map<string, unknown> };
    if (!g.__stacksaveStore) {
        g.__stacksaveStore = new Map();
    }
    const store = g.__stacksaveStore;

    return {
        async get<T>(key: string): Promise<T | null> {
            const v = store.get(key);
            return v === undefined ? null : (v as T);
        },
        async set<T>(key: string, value: T): Promise<void> {
            store.set(key, value);
        },
        async del(key: string): Promise<void> {
            store.delete(key);
        },
        async list(prefix: string): Promise<string[]> {
            const out: string[] = [];
            for (const k of store.keys()) {
                if (k.startsWith(prefix)) out.push(k);
            }
            return out;
        },
    };
}

export const db: KVStore = createMemoryStore();

/** Generate a short, URL-safe id (no deps). */
export function newId(prefix: string): string {
    // 8 bytes → 16 hex chars, ample for a public share URL
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    return `${prefix}_${hex}`;
}

import type { backendInterface } from "@/backend";

/**
 * A mutable holder for the actor the mocked `useActor` returns. `vi.mock`
 * factories are hoisted above imports, so they cannot close over a test-local
 * variable; they can, however, `await import()` this module and read
 * `holder.current` at call time.
 */
export const holder: { current: backendInterface | null } = { current: null };

export function setActor(actor: backendInterface | null): void {
  holder.current = actor;
}

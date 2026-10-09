# Project Guidance

## User Preferences

- Professional, trustworthy, warm, welcoming, human, empathetic tone
- Modern but not overly futuristic; suitable for teenagers, adults, and older users
- Sophisticated but welcoming colour palette, strong typography, clear spacing, high-quality imagery, subtle animations
- Must not look like a typical school project
- Search bar is a homepage-level website-wide quick-access feature, not part of the three main sections
- Exactly two problem categories: Physical Wellbeing and Mental Wellbeing
- Information, AI Helper, and Real-Life Examples are sub-sections within each category, never top-level categories
- Never invent statistics, studies, quotations, or sources
- Citations kept visually discreet
- AI must never present itself as a medical professional
- Avoid excessive pop-ups, animations, or distracting effects
- Get in Touch page shows the real creator details: Hoang Truong Giang, truong-giang_hoang@bvishanoi.com, British Vietnamese International School, Vietnam, Hanoi, Duke of Edinburgh's Bronze Award
- Contact form messages are emailed to truong-giang_hoang@bvishanoi.com

## Verified Commands

- **typecheck**: `pnpm typecheck (from src/frontend/); mops check (from src/backend/)`
- **fix**: `pnpm fix (from src/frontend/); mops check --fix (from src/backend/)`
- **build**: `pnpm build (from src/frontend/); mops build (from src/backend/)`

## Learnings

- Caffeine Inference credentials (CAFFEINE_INFERENCE_API_KEY) are not provisioned in the local preflight environment, so askHelper returns #err(#unavailable) there; the chat endpoint must always wrap Config.fromEnv<system>() inside the try block so an unprovisioned config returns a graceful error instead of trapping with IC0503.
- Backend seed data must not reference image paths that were never added under src/frontend/public; wire an onError fallback (handleImageError in src/lib/site.ts) on every content image so a missing asset never renders a broken-image icon.
- A CSS variable defined in index.css is not a Tailwind colour until it is registered in tailwind.config.js colors; register success/foreground there before using border-success/bg-success/text-success.
- Motoko search endpoints must rank matches explicitly (exact title > title contains > summary > section body > synonym, with a stable tiebreak); Map.values() iteration order is not relevance order, so results[0] is meaningless without ranking.
- Motoko has no triple-quoted string literal; author long Markdown as concatenated single-line strings with \n escapes. A switch expression used directly as an inline lambda body is a parser error. catch requires a bound variable. Any file declaring Map.Map<Nat, _> needs import Nat "mo:core/Nat". moc requires the actor to be the only non-imported declaration in main.mo.
- OQL auto-derivation (.toEntity) only works for all-primitive records; records with variants, arrays or nested records need .toEntityManual with explicit .payload/.flatten. A single-record persisted field is exposed with Entity.manual over a one-element iterator.
- TanStack Router's typed Link rejects paths not present in the route tree, so register every route (even placeholder components) in App.tsx before other files link to it. Generated backend.ts exports Category as a value enum; import it as a value when comparing with === or using it as a query key.
- The frontend test lane is Vitest + Testing Library (jsdom) with a typed actor mock, and the backend lane is PocketIC; the root test script is `pnpm --dir app test`. Run pnpm fix (biome check --write) before pnpm check to resolve organizeImports and format diagnostics in one pass.
- An awaited inter-canister call that traps (e.g. EmailClient.sendServiceEmail with an unconfigured integrations canister, IC0503) aborts the whole update call; wrap best-effort sends in try/catch so the stored result is still returned.
- A `?? fallback` on a query result only covers null/undefined; when a frozen backend seed returns bracketed placeholder values, detect them per field (e.g. /^\[.*\]$/) and substitute real values so the fallback is live in the normal path.
- Migration files under src/backend/migrations/ are frozen and reject writes; seed values that must change at runtime belong in a constant or a new migration, not an edit to an applied migration.
- The autonomous local tester blocks controls that trigger real external email side effects, so a contact-form submit that sends email is reported inconclusive (external_boundary) rather than verified; the page rendering itself is still verified.

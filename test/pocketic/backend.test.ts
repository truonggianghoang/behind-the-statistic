import { PocketIc } from "@dfinity/pic";
import type { Actor, CanisterFixture } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

let pic: PocketIc | undefined;
let actor: Actor<_SERVICE>;
let canisterId: CanisterFixture<_SERVICE>["canisterId"];

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  ({ actor, canisterId } = await pic.setupCanister<_SERVICE>({
    idlFactory,
    wasm: BACKEND_WASM,
  }));
});

afterAll(async () => {
  await pic?.tearDown();
});

it("serves the site content the shell renders", async () => {
  const content = await actor.getSiteContent();
  expect(content.siteName).toBe("Behind the Statistic");
  expect(content.tagline).toBe("Real people. Real struggles. Real understanding.");
  expect(content.introduction.length).toBeGreaterThan(0);
  expect(content.whyThisMatters.heading.length).toBeGreaterThan(0);
  expect(content.whyThisMatters.paragraphs.length).toBeGreaterThan(0);
});

it("lists problems across both categories without trapping", async () => {
  const all = await actor.listProblems([]);
  expect(all.length).toBeGreaterThan(0);
  const physical = await actor.listProblems([{ physical: null }]);
  const mental = await actor.listProblems([{ mental: null }]);
  expect(physical.length).toBeGreaterThan(0);
  expect(mental.length).toBeGreaterThan(0);
  expect(physical.length + mental.length).toBe(all.length);
  for (const problem of all) {
    expect(problem.sections.length).toBeGreaterThan(0);
    expect(problem.sources.length).toBeGreaterThan(0);
  }
});

it("returns a single problem by slug and an empty option for an unknown slug", async () => {
  const anxiety = await actor.getProblem("anxiety");
  expect(anxiety).toHaveLength(1);
  expect(anxiety[0].title).toBe("Anxiety");
  expect(anxiety[0].category).toEqual({ mental: null });

  const missing = await actor.getProblem("no-such-slug");
  expect(missing).toEqual([]);
});

it("routes a typed search term to the matching problem across both categories", async () => {
  const anxiety = await actor.searchProblems("Anxiety");
  expect(anxiety.length).toBeGreaterThan(0);
  expect(anxiety[0].slug).toBe("anxiety");

  const obesity = await actor.searchProblems("Obesity");
  expect(obesity.length).toBeGreaterThan(0);
  expect(obesity[0].slug).toBe("obesity");

  const synonym = await actor.searchProblems("insomnia");
  expect(synonym.length).toBeGreaterThan(0);
  expect(synonym[0].slug).toBe("sleep-problems");

  const none = await actor.searchProblems("zzzznotatopic");
  expect(none).toEqual([]);
});

it("returns real-life examples carrying every required field", async () => {
  const examples = await actor.listExamples({ mental: null });
  expect(examples.length).toBeGreaterThan(0);
  for (const example of examples) {
    expect(example.person.length).toBeGreaterThan(0);
    expect(example.situation.length).toBeGreaterThan(0);
    expect(example.problem.length).toBeGreaterThan(0);
    expect(example.impact.length).toBeGreaterThan(0);
    expect(example.journey.length).toBeGreaterThan(0);
    expect(example.source.organisation.length).toBeGreaterThan(0);
  }
});

it("returns the homepage featured-issue strip", async () => {
  const featured = await actor.listFeaturedIssues();
  expect(featured.length).toBeGreaterThan(0);
  for (const issue of featured) {
    expect(issue.slug.length).toBeGreaterThan(0);
    expect(issue.title.length).toBeGreaterThan(0);
  }
});

it("validates and stores a contact submission", async () => {
  const missingName = await actor.submitContact("", "a@b.com", "hello there");
  expect(missingName).toEqual({ err: { missingName: null } });

  const invalidEmail = await actor.submitContact("Ada", "not-an-email", "hello there");
  expect(invalidEmail).toEqual({ err: { invalidEmail: null } });

  const ok = await actor.submitContact("Ada", "ada@example.com", "hello there");
  expect(ok).toHaveProperty("ok");
});

// The accepted request makes email delivery best-effort: the submission is
// stored and `#ok` returned even when the email/integrations service is
// unconfigured and its call traps. In this replica the integrations canister is
// not configured, so this call exercises exactly that branch — if the send were
// not wrapped in try/catch, `submitContact` would trap here instead of
// resolving, and this test would fail rather than pass.
it("returns #ok for a valid submission even though email delivery cannot succeed", async () => {
  const first = await actor.submitContact("Ada", "ada@example.com", "first message");
  expect(first).toHaveProperty("ok");
  const firstId = (first as { ok: { id: bigint } }).ok.id;
  expect(typeof firstId).toBe("bigint");

  // A second submission gets a distinct id, proving the store happened on each
  // call rather than the ok result being a fixed stub.
  const second = await actor.submitContact("Grace", "grace@example.com", "second message");
  expect(second).toHaveProperty("ok");
  const secondId = (second as { ok: { id: bigint } }).ok.id;
  expect(secondId).not.toBe(firstId);
});

it("rejects an empty AI Helper question instead of trapping", async () => {
  const result = await actor.askHelper({ mental: null }, "   ", []);
  expect(result).toEqual({ err: { emptyQuestion: null } });
});

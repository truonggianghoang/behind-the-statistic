import { setActor } from "@/__tests__/actor-holder";
import { renderWithProviders } from "@/__tests__/render";
import { createActorMock } from "@/__tests__/test-utils";
import type { backendInterface } from "@/backend";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Same seam as the other suites: the app reaches the backend through `useActor`
// from `@caffeineai/core-infrastructure`. Mocking that one module keeps every
// call local; the actor itself is a typed mock read from a holder module because
// `vi.mock` factories are hoisted above imports.
vi.mock("@caffeineai/core-infrastructure", async () => {
  const { holder } = await import("@/__tests__/actor-holder");
  return {
    useActor: () => ({ actor: holder.current, isFetching: false }),
    InternetIdentityProvider: ({ children }: { children: unknown }) => children,
  };
});

import App from "@/App";

function goTo(path: string): void {
  window.history.pushState({}, "", path);
}

// The accepted request requires the real creator details to render even when the
// backend content is unavailable. These are the values the page must fall back
// to; they are asserted as observable text, not as an internal constant.
const REAL_DETAILS = {
  createdBy: "Hoang Truong Giang",
  email: "truong-giang_hoang@bvishanoi.com",
  organisation: "British Vietnamese International School",
  location: "Vietnam, Hanoi",
  project: "Duke of Edinburgh's Bronze Award",
};

async function expectRealDetails(): Promise<void> {
  const panel = await screen.findByRole("complementary", {
    name: /project details/i,
  });
  await within(panel).findByText(REAL_DETAILS.createdBy);

  const rows: Array<[string, string]> = [
    ["Created by", REAL_DETAILS.createdBy],
    ["Email", REAL_DETAILS.email],
    ["School / Organisation", REAL_DETAILS.organisation],
    ["Location", REAL_DETAILS.location],
    ["Project", REAL_DETAILS.project],
  ];
  for (const [label, value] of rows) {
    const term = within(panel).getByText(label);
    const row = term.closest("div");
    expect(row).not.toBeNull();
    expect(within(row as HTMLElement).getByText(value)).toBeInTheDocument();
  }
}

describe("Get in Touch — backend unavailable", () => {
  beforeEach(() => {
    goTo("/get-in-touch");
  });

  it("still renders the real creator details when getSiteContent rejects", async () => {
    const failing = createActorMock();
    failing.getSiteContent = async () => {
      throw new Error("backend unreachable");
    };
    setActor(failing);
    renderWithProviders(<App />);

    await expectRealDetails();
  });

  it("still renders the real creator details when no actor is available", async () => {
    setActor(null);
    renderWithProviders(<App />);

    await expectRealDetails();
  });
});

describe("Get in Touch — contact submission consumer contract", () => {
  beforeEach(() => {
    goTo("/get-in-touch");
  });

  it("sends the trimmed form values to submitContact and reports success", async () => {
    const calls: Array<[string, string, string]> = [];
    const actor: backendInterface = createActorMock({
      submitContact: (name, email, message) => {
        calls.push([name, email, message]);
        return { __kind__: "ok", ok: { id: 7n } };
      },
    });
    setActor(actor);

    const user = userEvent.setup();
    renderWithProviders(<App />);

    await user.type(
      await screen.findByLabelText(/^name$/i),
      "  Ada Lovelace  ",
    );
    await user.type(screen.getByLabelText(/^email$/i), "  ada@example.com  ");
    await user.type(
      screen.getByLabelText(/^message$/i),
      "  I found this resource really helpful, thank you.  ",
    );
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(
      await screen.findByText(/your message has been sent/i),
    ).toBeInTheDocument();
    expect(calls).toEqual([
      [
        "Ada Lovelace",
        "ada@example.com",
        "I found this resource really helpful, thank you.",
      ],
    ]);
  });
});

import { setActor } from "@/__tests__/actor-holder";
import { renderWithProviders } from "@/__tests__/render";
import { SITE_CONTENT, createActorMock } from "@/__tests__/test-utils";
import type { SiteContent } from "@/backend";
import { screen, within } from "@testing-library/react";
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

// A deliberately non-placeholder fixture: the request intentionally replaces the
// placeholder contact details with real values, so this suite must not freeze
// the old placeholders. It asserts the rendering contract instead — whatever
// `getSiteContent` returns is what the page shows.
const DETAILS: SiteContent["contactDetails"] = {
  createdBy: "Jordan Rivera",
  email: "jordan.rivera@example.org",
  organisation: "Riverside Community School",
  location: "Bristol, United Kingdom",
  project: "Duke of Edinburgh's Bronze Award",
};

describe("Get in Touch — contact details rendering contract", () => {
  beforeEach(() => {
    goTo("/get-in-touch");
  });

  it("renders every contact detail returned by the backend under its label", async () => {
    setActor(
      createActorMock({
        siteContent: { ...SITE_CONTENT, contactDetails: DETAILS },
      }),
    );
    renderWithProviders(<App />);

    const panel = await screen.findByRole("complementary", {
      name: /project details/i,
    });
    // The panel renders immediately with skeletons; wait for the loaded value
    // before asserting the rows, so this is not a timing race.
    await within(panel).findByText(DETAILS.createdBy);

    const rows: Array<[string, string]> = [
      ["Created by", DETAILS.createdBy],
      ["Email", DETAILS.email],
      ["School / Organisation", DETAILS.organisation],
      ["Location", DETAILS.location],
      ["Project", DETAILS.project],
    ];
    for (const [label, value] of rows) {
      const term = within(panel).getByText(label);
      const row = term.closest("div");
      expect(row).not.toBeNull();
      expect(within(row as HTMLElement).getByText(value)).toBeInTheDocument();
    }
  });

  it("shows the contact form alongside the details panel", async () => {
    setActor(
      createActorMock({
        siteContent: { ...SITE_CONTENT, contactDetails: DETAILS },
      }),
    );
    renderWithProviders(<App />);

    expect(
      await screen.findByRole("heading", { name: /send a message/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("complementary", { name: /project details/i }),
    ).toBeInTheDocument();
  });
});

// The accepted request replaces the bracketed backend placeholders with the real
// creator details, and requires the page to render those details even when the
// backend returns placeholders or no usable content at all. These are the new
// branches the pass-through contract above does not exercise.
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

describe("Get in Touch — placeholder fallback", () => {
  beforeEach(() => {
    goTo("/get-in-touch");
  });

  it("substitutes the real creator details for bracketed backend placeholders", async () => {
    setActor(
      createActorMock({
        siteContent: {
          ...SITE_CONTENT,
          contactDetails: {
            createdBy: "[Your Name]",
            email: "[Your Email]",
            organisation: "[School / Organisation — optional]",
            location: "[Location — optional]",
            project: "[Project]",
          },
        },
      }),
    );
    renderWithProviders(<App />);

    await expectRealDetails();
  });

  it("falls back to the real creator details when the backend returns no contact details", async () => {
    setActor(
      createActorMock({
        siteContent: {
          ...SITE_CONTENT,
          contactDetails: undefined as unknown as SiteContent["contactDetails"],
        },
      }),
    );
    renderWithProviders(<App />);

    await expectRealDetails();
  });
});

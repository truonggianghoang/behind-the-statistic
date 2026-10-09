import { setActor } from "@/__tests__/actor-holder";
import { renderWithProviders } from "@/__tests__/render";
import { createActorMock } from "@/__tests__/test-utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Same seam as the core journey suite: the app reaches the backend through
// `useActor` from `@caffeineai/core-infrastructure`. Mocking that one module
// keeps every call local; the actor itself is a typed mock read from a holder
// module because `vi.mock` factories are hoisted above imports.
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

describe("Behind the Statistic — changed-behavior branches", () => {
  beforeEach(() => {
    setActor(createActorMock());
    goTo("/");
  });

  it("routes a suggestion chip to the matching problem page", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    await user.click(await screen.findByRole("button", { name: "Obesity" }));

    expect(
      await screen.findByRole("heading", { level: 1, name: "Obesity" }),
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/issues/physical/obesity");
  });

  it("shows a friendly prompt when the search is submitted empty", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    await user.click(await screen.findByRole("button", { name: /^search$/i }));

    expect(
      await screen.findByText(/type a topic to search/i),
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/");
  });

  it("shows a no-results state instead of navigating when nothing matches", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const input = await screen.findByRole("searchbox", {
      name: /search wellbeing topics/i,
    });
    await user.type(input, "zzzznotatopic");
    await user.click(screen.getByRole("button", { name: /^search$/i }));

    expect(
      await screen.findByText(/couldn't find a topic matching/i),
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/");
  });

  it("shows a retryable error instead of trapping when the AI Helper is unavailable", async () => {
    setActor(
      createActorMock({
        askHelper: () => ({
          __kind__: "err",
          err: {
            __kind__: "unavailable",
            unavailable: "The AI Helper is temporarily unavailable.",
          },
        }),
      }),
    );
    const user = userEvent.setup();
    goTo("/issues/mental");
    renderWithProviders(<App />);

    const input = await screen.findByRole("textbox", {
      name: /ask the mental wellbeing helper a question/i,
    });
    await user.type(input, "What is anxiety?");
    await user.click(screen.getByRole("button", { name: /send question/i }));

    expect(
      await screen.findByText(/helper is unavailable right now/i),
    ).toBeInTheDocument();
    // The user's question is preserved so they can retry.
    expect(screen.getByText("What is anxiety?")).toBeInTheDocument();
  });

  it("rejects a malformed email and a too-short message", async () => {
    const user = userEvent.setup();
    goTo("/get-in-touch");
    renderWithProviders(<App />);

    await user.type(await screen.findByLabelText(/^name$/i), "Ada");
    await user.type(screen.getByLabelText(/^email$/i), "not-an-email");
    await user.type(screen.getByLabelText(/^message$/i), "short");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument();
  });

  it("shows a retryable error when the contact submission fails", async () => {
    setActor(
      createActorMock({
        submitContact: () => ({
          __kind__: "err",
          err: "missingMessage" as never,
        }),
      }),
    );
    const user = userEvent.setup();
    goTo("/get-in-touch");
    renderWithProviders(<App />);

    await user.type(await screen.findByLabelText(/^name$/i), "Ada");
    await user.type(screen.getByLabelText(/^email$/i), "ada@example.com");
    await user.type(
      screen.getByLabelText(/^message$/i),
      "I found this resource really helpful, thank you.",
    );
    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(
      await screen.findByText(/something went wrong\. please try again/i),
    ).toBeInTheDocument();
  });

  it("shows a not-found state for an unknown problem slug", async () => {
    goTo("/issues/mental/no-such-topic");
    renderWithProviders(<App />);

    expect(
      await screen.findByRole("heading", {
        name: /we couldn't find that topic/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to mental wellbeing/i }),
    ).toBeInTheDocument();
  });
});

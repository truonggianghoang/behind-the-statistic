import { setActor } from "@/__tests__/actor-holder";
import { renderWithProviders } from "@/__tests__/render";
import { SITE_CONTENT, createActorMock } from "@/__tests__/test-utils";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// The app reaches the backend through `useActor` from
// `@caffeineai/core-infrastructure`. Mocking that one module is the seam: the
// real provider would try to reach a canister over the network. The factory is
// hoisted above imports, so it reads the actor from a holder module at call
// time rather than closing over a test-local variable.
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

describe("Behind the Statistic — core journeys", () => {
  beforeEach(() => {
    setActor(createActorMock());
    goTo("/");
  });

  it("renders the homepage shell with site name, tagline, hero and CTA", async () => {
    renderWithProviders(<App />);

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: SITE_CONTENT.siteName,
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(SITE_CONTENT.tagline).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("img", { name: /community room/i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /explore the issues/i }).length,
    ).toBeGreaterThan(0);
    expect(
      document.querySelector('[data-ocid="home.explore_issues_button"]'),
    ).toBeInTheDocument();
  });

  it("shows the persistent navigation hierarchy on every page", async () => {
    renderWithProviders(<App />);
    const primary = await screen.findByRole("navigation", { name: "Primary" });
    for (const label of [
      "Home",
      "Understanding the Issues",
      "Why This Matters",
      "Get in Touch",
    ]) {
      expect(
        within(primary).getByRole("link", { name: label }),
      ).toBeInTheDocument();
    }
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("routes a typed 'Anxiety' search to the Anxiety problem page", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const input = await screen.findByRole("searchbox", {
      name: /search wellbeing topics/i,
    });
    await user.type(input, "Anxiety");
    await user.click(screen.getByRole("button", { name: /^search$/i }));

    expect(
      await screen.findByRole("heading", { level: 1, name: "Anxiety" }),
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/issues/mental/anxiety");
  });

  it("routes a typed 'Obesity' search to the Obesity problem page", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const input = await screen.findByRole("searchbox", {
      name: /search wellbeing topics/i,
    });
    await user.type(input, "Obesity");
    await user.click(screen.getByRole("button", { name: /^search$/i }));

    expect(
      await screen.findByRole("heading", { level: 1, name: "Obesity" }),
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/issues/physical/obesity");
  });

  it("presents Information, AI Helper and Real-Life Examples on a category page", async () => {
    goTo("/issues/mental");
    renderWithProviders(<App />);

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Mental Wellbeing",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /what this section covers/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /ask about mental wellbeing/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /behind every statistic is a real person/i,
      }),
    ).toBeInTheDocument();
  });

  it("opens a dedicated problem page with all nine required sections", async () => {
    goTo("/issues/mental/anxiety");
    renderWithProviders(<App />);

    expect(
      await screen.findByRole("heading", { level: 1, name: "Anxiety" }),
    ).toBeInTheDocument();

    const required = [
      "What is it?",
      "Why does it matter?",
      "Causes / contributing factors",
      "Effects",
      "Who can be affected?",
      "Impact on everyday life",
      "What can help?",
      "How can others support someone experiencing it?",
      "Reliable sources",
    ];
    for (const heading of required) {
      expect(
        screen.getByRole("heading", { name: heading }),
      ).toBeInTheDocument();
    }
  });

  it("returns an educational AI Helper reply carrying the not-medical-advice disclaimer", async () => {
    const user = userEvent.setup();
    goTo("/issues/mental");
    renderWithProviders(<App />);

    const input = await screen.findByRole("textbox", {
      name: /ask the mental wellbeing helper a question/i,
    });
    await user.type(input, "What is anxiety?");
    await user.click(screen.getByRole("button", { name: /send question/i }));

    expect(
      await screen.findByText(/educational answer about What is anxiety\?/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/does not replace professional advice/i),
    ).toBeInTheDocument();
  });

  it("shows person, situation, problem, impact, journey and source on an example", async () => {
    goTo("/issues/mental");
    renderWithProviders(<App />);

    expect(
      await screen.findByText("A young person supported by a charity"),
    ).toBeInTheDocument();
    expect(screen.getByText(/their situation/i)).toBeInTheDocument();
    expect(screen.getByText(/how it affected their life/i)).toBeInTheDocument();
    expect(screen.getByText(/their journey/i)).toBeInTheDocument();
    expect(screen.getByText(/social media & self-esteem/i)).toBeInTheDocument();
    expect(screen.getByText(/source:/i)).toBeInTheDocument();
  });

  it("validates the contact form and shows a success confirmation on submit", async () => {
    const user = userEvent.setup();
    goTo("/get-in-touch");
    renderWithProviders(<App />);

    const submit = await screen.findByRole("button", { name: /send message/i });
    await user.click(submit);

    expect(
      await screen.findByText(/please enter your name/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/please enter your email address/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/please write a short message/i),
    ).toBeInTheDocument();

    await user.type(screen.getByLabelText(/^name$/i), "Ada");
    await user.type(screen.getByLabelText(/^email$/i), "ada@example.com");
    await user.type(
      screen.getByLabelText(/^message$/i),
      "I found this resource really helpful, thank you.",
    );
    await user.click(submit);

    expect(
      await screen.findByText(/your message has been sent/i),
    ).toBeInTheDocument();
  });

  it("renders the Why This Matters story page", async () => {
    goTo("/why-this-matters");
    renderWithProviders(<App />);

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "Why This Matters",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /what this site is trying to do/i }),
    ).toBeInTheDocument();
  });

  it("renders a not-found page for an unknown route", async () => {
    goTo("/definitely-not-a-page");
    renderWithProviders(<App />);

    expect(
      await screen.findByRole("heading", { name: /this page has moved on/i }),
    ).toBeInTheDocument();
  });
});

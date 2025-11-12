import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

describe("Header", () => {
  const html = document.documentElement;
  let theme;
  let user;
  beforeEach(() => {
    theme = { matches: true };
    window.matchMedia = vi.fn().mockImplementation(() => theme);
    user = userEvent.setup();
  });

  afterEach(() => {
    cleanup();
    html.classList.remove("dark");
    localStorage.clear();
  });

  it("adds dark class when prefers dark", () => {
    render(<Header />);
    expect(html.classList.contains("dark")).toBe(true);
  });

  it("dose not add dark class when prefer light", () => {
    theme.matches = false;
    render(<Header />);
    expect(html.classList.contains("dark")).toBe(false);
  });

  it("loads theme if saved in localStorage", () => {
    localStorage.setItem("theme", "dark");
    render(<Header />);
    expect(html.classList.contains("dark")).toBe(true);

    localStorage.setItem("theme", "light");
    render(<Header />);
    expect(html.classList.contains("dark")).toBe(false);
  });

  it("change theme and icons", async () => {
    render(<Header />);
    const toggleBtn = screen.getByTestId("toggleBtn");
    const sunIcon = screen.getByTestId("sunIcon");
    const moonIcon = screen.getByTestId("moonIcon");

    await user.click(toggleBtn);
    expect(localStorage.getItem("theme")).toBe("light");
    expect(html.classList.contains("dark")).toBe(false);
    expect(sunIcon.classList.contains("opacity-0")).toBe(true);
    expect(moonIcon.classList.contains("opacity-100")).toBe(true);

    await user.click(toggleBtn);
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(html.classList.contains("dark")).toBe(true);
    expect(sunIcon.classList.contains("opacity-100")).toBe(true);
    expect(moonIcon.classList.contains("opacity-0")).toBe(true);
  });
});

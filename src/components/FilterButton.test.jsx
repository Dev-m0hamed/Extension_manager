import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FilterButton from "./FilterButton";

describe("filterButton component", () => {
  it("renders button with correct label", () => {
    render(<FilterButton value="All" filter="" setFilter={() => {}} />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
  });

  it("applies active styles when selected", () => {
    render(<FilterButton value="All" filter="All" setFilter={() => {}} />);
    const button = screen.getByRole("button", { name: "All" });
    expect(button).toHaveClass(
      "bg-red-700 dark:bg-red-500 text-neutral-0 dark:text-neutral-900 hover:opacity-80"
    );
  });

  it("calls setFilter with value when clicked", async () => {
    const setFilter = vi.fn();
    const user = userEvent.setup();

    render(<FilterButton value="All" filter="" setFilter={setFilter} />);
    await user.click(screen.getByRole("button", { name: "All" }));
    expect(setFilter).toHaveBeenCalledWith("All");
  });
});

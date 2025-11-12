import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Extension from "./Extensions";
import data from "../../public/data.json";

describe("Extensions", () => {
  let user;
  beforeEach(() => {
    user = userEvent.setup();
    render(<Extension />);
  });
  it("renders all extensions initially", async () => {
    for (const ext of data) {
      expect(await screen.findByText(ext.name)).toBeInTheDocument();
    }
  });

  it("filters active extensions when clicking Active button", async () => {
    await user.click(screen.getByRole("button", { name: "Active" }));
    const activeExt = data.filter((ext) => ext.isActive);
    for (const ext of activeExt) {
      expect(await screen.findByText(ext.name)).toBeInTheDocument();
    }
  });

  it("filters inactive extensions when clicking Inactive button", async () => {
    await user.click(screen.getByRole("button", { name: "Inactive" }));
    const inactiveExt = data.filter((ext) => !ext.isActive);
    for (const ext of inactiveExt) {
      expect(await screen.findByText(ext.name)).toBeInTheDocument();
    }
  });

  it("removes extension when click remove", async () => {
    const firstExt = data[0];
    const removeBtn = await screen.findAllByRole("button", { name: "Remove" });
    await user.click(removeBtn[0]);
    expect(screen.queryByText(firstExt.name)).not.toBeInTheDocument();
  });
});

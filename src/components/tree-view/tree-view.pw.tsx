import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";

import { TreeViewDefault } from "./components.test-pw";

test.describe("Accessibility tests for TreeView", () => {
  test("should pass accessibility tests for the collapsed tree", async ({
    mount,
    page,
  }) => {
    await mount(<TreeViewDefault />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for an expanded tree", async ({
    mount,
    page,
  }) => {
    await mount(<TreeViewDefault />);
    await page.getByRole("button", { name: "Item 1", exact: true }).click();
    await page.getByRole("button", { name: "Item 1.1", exact: true }).click();
    await checkAccessibility(page);
  });
});

test.describe("Interaction tests for TreeView", () => {
  test("should expand and collapse a parent item using click", async ({
    mount,
    page,
  }) => {
    await mount(<TreeViewDefault />);

    const toggle = page.getByRole("button", { name: "Item 1", exact: true });
    const treeItem = page.getByRole("treeitem", {
      name: "Item 1",
      exact: true,
    });

    await toggle.click();
    await expect(treeItem).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("Item 1.2")).toBeVisible();

    await toggle.click();
    await expect(treeItem).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByText("Item 1.2")).toBeHidden();
  });

  test("should expand a parent item using the Enter key", async ({
    mount,
    page,
  }) => {
    await mount(<TreeViewDefault />);

    const toggle = page.getByRole("button", { name: "Item 1", exact: true });

    await toggle.press("Enter");

    await expect(
      page.getByRole("treeitem", { name: "Item 1", exact: true }),
    ).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("Item 1.2")).toBeVisible();
  });

  test("should expand a parent item using the Space key", async ({
    mount,
    page,
  }) => {
    await mount(<TreeViewDefault />);

    const toggle = page.getByRole("button", { name: "Item 1", exact: true });

    await toggle.press("Space");

    await expect(
      page.getByRole("treeitem", { name: "Item 1", exact: true }),
    ).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("Item 1.2")).toBeVisible();
  });

  test("should name the nested group after its parent item", async ({
    mount,
    page,
  }) => {
    await mount(<TreeViewDefault />);

    await page.getByRole("button", { name: "Item 1", exact: true }).click();

    await expect(
      page.getByRole("group", { name: "Item 1", exact: true }),
    ).toBeVisible();
  });

  test("should link a link item to its href", async ({ mount, page }) => {
    await mount(<TreeViewDefault />);

    await page.getByRole("button", { name: "Item 1", exact: true }).click();

    await expect(page.getByRole("link", { name: "Item 1.2" })).toHaveAttribute(
      "href",
      "#",
    );
  });
});

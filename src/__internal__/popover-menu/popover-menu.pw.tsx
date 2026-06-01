import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  PopoverMenuComponent,
  PopoverMenuWithPreselection,
} from "./components.test-pw";

test.describe("Accessibility tests", () => {
  test("passes accessibility tests when open", async ({ mount, page }) => {
    await mount(<PopoverMenuComponent openByDefault />);
    await checkAccessibility(page);
  });

  (["small", "medium", "large"] as const).forEach((size) => {
    test(`passes accessibility tests with size ${size} and menu open`, async ({
      mount,
      page,
    }) => {
      await mount(<PopoverMenuComponent size={size} openByDefault />);
      await checkAccessibility(page);
    });
  });

  test("passes accessibility tests with a custom width", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuComponent width="400px" openByDefault />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests with disabled items", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuComponent withDisabledItems openByDefault />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests with first item keyboard-highlighted via ArrowDown", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuComponent openByDefault />);
    await page.keyboard.press("ArrowDown");
    await checkAccessibility(page);
  });

  test("passes accessibility tests with middle item keyboard-highlighted via ArrowDown", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuComponent openByDefault />);
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await checkAccessibility(page);
  });

  test("passes accessibility tests with last item keyboard-highlighted via ArrowUp", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuComponent openByDefault />);
    await page.keyboard.press("ArrowUp");
    await checkAccessibility(page);
  });

  test("passes accessibility tests with disabled item skipped via ArrowDown", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuComponent withDisabledItems openByDefault />);
    // ArrowDown twice: first item highlighted, then disabled item skipped to third
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await checkAccessibility(page);
  });

  test("passes accessibility tests with selected item and tick icon visible", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuWithPreselection />);
    await checkAccessibility(page);
  });

  test("passes accessibility tests with selected item keyboard-highlighted", async ({
    mount,
    page,
  }) => {
    await mount(<PopoverMenuWithPreselection />);
    // ArrowDown from no highlight jumps to selected item ("Two" at index 1)
    await page.keyboard.press("ArrowDown");
    await checkAccessibility(page);
  });

  (["small", "medium", "large"] as const).forEach((size) => {
    test(`passes accessibility tests with size ${size} and selected item with icon`, async ({
      mount,
      page,
    }) => {
      await mount(<PopoverMenuWithPreselection size={size} />);
      await checkAccessibility(page);
    });
  });
});

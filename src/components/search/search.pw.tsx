import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  SearchComponent,
  SearchComponentInverseWithLabelHintAndError,
  SearchComponentWithLabelHintAndError,
  SearchComponentWithDropdown,
} from "./components.test-pw";

test.describe("Search input behaviour", () => {
  test("should clear the input when Escape is pressed", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent />);

    const input = page.getByRole("searchbox");
    await input.fill("foo");
    await input.press("Escape");

    await expect(input).toHaveValue("");
  });

  test("should clear the input when the close icon is clicked", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent />);

    const input = page.getByRole("searchbox");
    await input.fill("foo");

    // The native Chromium cancel button (×) for <input type="search"> is rendered
    // at the right-hand end of the input's content area when the input has a value
    const box = await input.boundingBox();

    if (box) {
      await page.mouse.click(box.x + box.width - 16, box.y + box.height / 2);
    }

    await expect(input).toHaveValue("");
  });
});

test.describe("Accessibility tests for Search", () => {
  test("should check accessibility with label, hint text and error", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponentWithLabelHintAndError />);

    await checkAccessibility(page);
  });

  test("should check accessibility with inverse, label, hint text and error", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponentInverseWithLabelHintAndError />);

    await checkAccessibility(page);
  });
});

test.describe("Search with dropdown", () => {
  test("should render dropdown items when open", async ({ mount, page }) => {
    await mount(<SearchComponentWithDropdown />);

    await expect(
      page.locator('[data-component="popover-menu-item"]').first(),
    ).toBeVisible();
  });

  test("should keep the search input focused when navigating the dropdown with arrow keys", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponentWithDropdown />);
    const input = page.getByRole("combobox");

    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowDown");

    await expect(input).toBeFocused();
  });

  test("should apply a virtual highlight to the first item when ArrowDown is pressed", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponentWithDropdown />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowDown");

    await expect(
      page.locator('[data-component="popover-menu-item"]').first(),
    ).toHaveAttribute("data-has-focus", "true");
  });

  test("should move the virtual highlight to the next item on a subsequent ArrowDown", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponentWithDropdown />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");

    await expect(
      page.locator('[data-component="popover-menu-item"]').nth(1),
    ).toHaveAttribute("data-has-focus", "true");
    await expect(
      page.locator('[data-component="popover-menu-item"]').first(),
    ).toHaveAttribute("data-has-focus", "false");
  });

  test("should apply a virtual highlight to the last item when ArrowUp is pressed with no existing highlight", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponentWithDropdown />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowUp");

    await expect(
      page.locator('[data-component="popover-menu-item"]').last(),
    ).toHaveAttribute("data-has-focus", "true");
  });

  test("should select an item when Enter is pressed on a highlighted item", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponentWithDropdown />);
    const input = page.getByRole("combobox");

    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await expect(input).toHaveValue("term-1");
  });

  test("should select an item when it is clicked", async ({ mount, page }) => {
    await mount(<SearchComponentWithDropdown />);
    const input = page.getByRole("combobox");

    await page.keyboard.press("Tab");
    await page.locator('[data-component="popover-menu-item"]').nth(1).click();

    await expect(input).toHaveValue("term-2");
  });

  test("should keep the search input focused after an item is clicked", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponentWithDropdown />);
    const input = page.getByRole("combobox");

    await page.keyboard.press("Tab");
    await page.locator('[data-component="popover-menu-item"]').first().click();

    await expect(input).toBeFocused();
  });

  test("should pass accessibility tests with the dropdown open", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponentWithDropdown />);

    await checkAccessibility(page);
  });
});

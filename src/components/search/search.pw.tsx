import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  SearchComponent,
  SearchComponentInverseWithLabelHintAndError,
  SearchComponentWithLabelHintAndError,
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

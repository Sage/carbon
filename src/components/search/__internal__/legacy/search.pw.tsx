import React from "react";
import { test, expect } from "../../../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../../../playwright/support/helper";
import {
  SearchComponent,
  SearchComponentDarkBackground,
} from "./components.test-pw";

test.describe("Accessibility tests for Search", () => {
  test("should check accessibility for searchButton", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent searchButton />);

    await checkAccessibility(page);
  });

  // check accessibility when typing due to cursor colour changes
  [true, false].forEach((showButton) => {
    test(`should check accessibility with variant prop set to dark and 'searchButton' is ${showButton}`, async ({
      mount,
      page,
    }) => {
      await mount(<SearchComponentDarkBackground searchButton={showButton} />);

      await checkAccessibility(page);

      await page.keyboard.press("Tab");
      await expect(page.getByRole("textbox")).toBeFocused();

      await checkAccessibility(page);

      await page.keyboard.type("hello world");

      await checkAccessibility(page);
    });
  });
});

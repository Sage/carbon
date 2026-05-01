import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  getDataElementByValue,
  tooltipPreview,
} from "../../../playwright/components";
import { CHARACTERS } from "../../../playwright/support/constants";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  SearchComponent,
  SearchComponentDarkBackground,
} from "./components.test-pw";

const testDataStandard = CHARACTERS.STANDARD;

test.describe("Accessibility tests for Search", () => {
  test("should check accessibility for searchButton", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent searchButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility with validation error as string", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponent error="Message" />);

    await checkAccessibility(page);
  });

  test("should check accessibility with the tooltip visible", async ({
    mount,
    page,
  }) => {
    await mount(
      <SearchComponent
        m="250px"
        error={testDataStandard}
        tooltipPosition="right"
      />,
    );

    const searchErrorIcon = getDataElementByValue(page, "error");
    await searchErrorIcon.hover();
    const tooltipPreviewElement = tooltipPreview(page);

    await checkAccessibility(page, tooltipPreviewElement);
  });

  // check accessibility when typing due to cursor colour changes
  [true, false].forEach((showButton) => {
    test(`should check accessibility with variant prop set to default and 'searchButton' is ${showButton}`, async ({
      mount,
      page,
    }) => {
      await mount(<SearchComponent searchButton={showButton} />);

      await checkAccessibility(page);

      await page.keyboard.press("Tab");
      await expect(page.getByRole("textbox")).toBeFocused();

      await checkAccessibility(page);

      await page.keyboard.type("hello world");

      await checkAccessibility(page);
    });
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

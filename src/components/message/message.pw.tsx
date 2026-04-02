import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { MessageComponent } from "./components.test-pw";
import { MessageProps } from ".";
import { checkAccessibility } from "../../../playwright/support/helper";

import { CHARACTERS } from "../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("Accessibility tests", () => {
  (
    [
      "error",
      "info",
      "success",
      "warning",
      "neutral",
      "ai",
      "error-subtle",
      "info-subtle",
      "success-subtle",
      "warning-subtle",
      "ai-subtle",
      "callout-subtle",
    ] as MessageProps["variant"][]
  ).forEach((variant) => {
    test(`should check ${variant} as variant`, async ({ mount, page }) => {
      await mount(<MessageComponent variant={variant} />);
      await checkAccessibility(page);
    });
  });

  testData.forEach((id) => {
    test(`should check ${id} as id`, async ({ mount, page }) => {
      await mount(<MessageComponent id={id} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((title) => {
    test(`should check ${title} as title`, async ({ mount, page }) => {
      await mount(<MessageComponent title={title} />);
      await checkAccessibility(page);
    });
  });

  [true, false].forEach((boolVal) => {
    test(`should check ${boolVal} for transparent background`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent transparent={boolVal} />);
      await checkAccessibility(page);
    });
  });

  [true, false].forEach((boolVal) => {
    test(`should check showCloseIcon when it's ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent showCloseIcon={boolVal} />);
      await checkAccessibility(page);
    });
  });

  testData.forEach((ariaLabel) => {
    test(`should check closeButtonAriaLabel as ${ariaLabel}`, async ({
      mount,
      page,
    }) => {
      await mount(<MessageComponent closeButtonAriaLabel={ariaLabel} />);
      await checkAccessibility(page);
    });
  });
});

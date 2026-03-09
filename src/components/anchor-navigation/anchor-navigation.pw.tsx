import React from "react";
import { test } from "../../../playwright/helpers/base-test";

import {
  AnchorNavigationComponent,
  InFullScreenDialog,
} from "../anchor-navigation/components.test-pw";

import { checkAccessibility } from "../../../playwright/support/helper";
import { DIALOG_FULL_SCREEN } from "../../../playwright/components/dialog/locators";

test.describe("Accessibility tests for Anchor Navigation component", () => {
  test("should pass accessibility tests for AnchorNavigationComponent example", async ({
    mount,
    page,
  }) => {
    await mount(<AnchorNavigationComponent />);

    await checkAccessibility(page);
  });

  test("should pass when rendered in full screen dialog", async ({
    mount,
    page,
  }) => {
    await mount(<InFullScreenDialog />);
    await page.getByText("open AnchorNavigation").click();

    await checkAccessibility(page, page.locator(DIALOG_FULL_SCREEN));
  });
});

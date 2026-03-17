import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import {
  InDialog,
  InDialogFullScreen,
  WithBothErrorsAndWarningsSummary,
  WithErrorsSummary,
  WithWarningsSummary,
} from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";
import { dataComponentButtonByText } from "../../../playwright/components/pages/index";

test.describe("Accessibility tests for Form component", () => {
  test(`should pass accessibility tests for InDialog example`, async ({
    mount,
    page,
  }) => {
    await mount(<InDialog />);

    const dialogButton = dataComponentButtonByText(page, "Open Preview");
    await dialogButton.click();
    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for InDialogFullScreen example`, async ({
    mount,
    page,
  }) => {
    await mount(<InDialogFullScreen />);

    const dialogButton = dataComponentButtonByText(page, "Open Preview");
    await dialogButton.click();

    /* The colour contrast accessiiblity check has been omitted here due to a false positive
    where the box-shadow is incorrectly compared to the sticky footer background colour */
    await checkAccessibility(page, page.getByRole("dialog"), "color-contrast");
  });

  test(`should pass accessibility tests for WithBothErrorsAndWarningsSummary example`, async ({
    mount,
    page,
  }) => {
    await mount(<WithBothErrorsAndWarningsSummary />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for WithErrorsSummary example`, async ({
    mount,
    page,
  }) => {
    await mount(<WithErrorsSummary />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for WithWarningsSummary example`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWarningsSummary />);

    await checkAccessibility(page);
  });
});

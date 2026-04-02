import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { FormProps } from ".";
import {
  FormComponent,
  InDialog,
  InDialogFullScreen,
  WithBothErrorsAndWarningsSummary,
  WithErrorsSummary,
} from "./components.test-pw";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
} from "../../../playwright/support/helper";
import { dataComponentButtonByText } from "../../../playwright/components/pages/index";
import { getComponent } from "../../../playwright/components";

test.describe("check props for Form component", () => {
  test(`should call onSubmit callback when save button is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <FormComponent
        onSubmit={() => {
          callbackCount += 1;
        }}
      />,
    );

    const saveButton = page.getByRole("button");
    await saveButton.click();
    expect(callbackCount).toBe(1);
  });
});

(
  [
    ["30px", 30],
    ["100px", 100],
    ["200px", 200],
  ] as [FormProps["height"], number][]
).forEach(([height, heightVal]) => {
  test(`should render with height of ${height}`, async ({ mount, page }) => {
    await mount(<FormComponent height={height} />);

    const form = getComponent(page, "form");
    await assertCssValueIsApproximately(form, "height", heightVal);
  });
});

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
});

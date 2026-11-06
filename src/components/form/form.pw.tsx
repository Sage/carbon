import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  Composition,
  FormComponent,
  FooterButtonsInDialog,
  ValidationSummary,
  DeprecatedErrorAndWarningCountSummary,
  DeprecatedStickyFooter,
} from "./components.test-pw";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
} from "../../../playwright/support/helper";
import { getComponent } from "../../../playwright/components";

test.describe("check props for Form component", () => {
  test(`should call onSubmit when the save button is triggered`, async ({
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

  test(`should render with the height set by the height prop`, async ({
    mount,
    page,
  }) => {
    await mount(<FormComponent height="100px" />);

    const form = getComponent(page, "form");
    await assertCssValueIsApproximately(form, "height", 100);
  });
});

test.describe("Accessibility tests for Form component", () => {
  test(`should pass accessibility tests for footer buttons in Dialog`, async ({
    mount,
    page,
  }) => {
    await mount(<FooterButtonsInDialog />);

    const dialogButton = page.getByRole("button", { name: "Open Preview" });
    await dialogButton.click();
    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for deprecated errorCount and warningCount summary`, async ({
    mount,
    page,
  }) => {
    await mount(<DeprecatedErrorAndWarningCountSummary />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for Composition example`, async ({
    mount,
    page,
  }) => {
    await mount(<Composition />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for deprecated sticky footer`, async ({
    mount,
    page,
  }) => {
    await mount(<DeprecatedStickyFooter />);

    await checkAccessibility(page);
  });
});

test.describe("Validation summary composed with Message", () => {
  test(`should focus the first summary link and not call onSubmit when submitted with empty required fields`, async ({
    mount,
    page,
  }) => {
    let submitCount = 0;
    await mount(
      <ValidationSummary
        onSubmit={() => {
          submitCount += 1;
        }}
      />,
    );

    await page.getByRole("button", { name: "Save changes" }).click();

    await expect(page.getByRole("link").first()).toBeFocused();
    expect(submitCount).toBe(0);
  });

  test(`should pass accessibility tests when the summary and field errors are shown`, async ({
    mount,
    page,
  }) => {
    await mount(<ValidationSummary />);

    await page.getByRole("button", { name: "Save changes" }).click();

    await checkAccessibility(page);
  });
});

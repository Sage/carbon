import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import Form, { FormProps } from ".";
import {
  FormComponent,
  FormWithLeftSidedButtons,
  FormWithRightSidedButtons,
  FormWithFullWidthButtons,
  DefaultWithStickyFooter,
  FormAlignmentExample,
  InDialog,
  InDialogFullScreen,
  InDialogFullScreenWithStickyFooter,
  InDialogWithStickyFooter,
  WithAdditionalButtons,
  WithBothErrorsAndWarningsSummary,
  WithButtonsAlignedToTheLeft,
  WithCustomFooterPadding,
  WithErrorsSummary,
  WithFullWidthButtons,
  WithLabelsInline,
  WithWarningsSummary,
} from "./components.test-pw";
import Textbox from "../textbox";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
} from "../../../playwright/support/helper";
import {
  getElement,
  getComponent,
  getDataElementByValue,
} from "../../../playwright/components/index";
import { dataComponentButtonByText } from "../../../playwright/components/pages/index";

test.describe("check props for Form component", () => {
  ([
    ["left", "start"],
    ["right", "end"],
  ] as [FormProps["buttonAlignment"], string][]).forEach(
    ([buttonAlignment, webkitAlign]) => {
      test(`should render with buttonAlignment ${buttonAlignment}`, async ({
        mount,
        page,
      }) => {
        await mount(<FormComponent buttonAlignment={buttonAlignment} />);

        await expect(getDataElementByValue(page, "form-footer")).toHaveCSS(
          "-webkit-box-pack",
          webkitAlign
        );
      });
    }
  );

  test(`should render with children`, async ({ mount, page }) => {
    await mount(
      <Form>
        <Textbox label="Textbox" />
      </Form>
    );

    await expect(getElement(page, "input")).toBeVisible();
  });

  [3, 11, 9].forEach((errorCount) => {
    test(`should render with errorCount as ${errorCount}`, async ({
      mount,
      page,
    }) => {
      await mount(<FormComponent errorCount={errorCount} />);

      const errors = getElement(page, "errors");
      await expect(errors).toHaveCSS("color", "rgb(162, 44, 59)");
      await expect(errors).toHaveText(`${errorCount} errors`);
      await expect(errors).toBeVisible();
    });
  });

  ([
    [0, 281],
    [3, 329],
    [5, 361],
    [7, 401],
  ] as [FormProps["fieldSpacing"], number][]).forEach(
    ([fieldSpacing, formHeight]) => {
      test(`should render with fieldSpacing as ${fieldSpacing}`, async ({
        mount,
        page,
      }) => {
        await mount(<FormComponent fieldSpacing={fieldSpacing} />);

        const form = getComponent(page, "form");
        await assertCssValueIsApproximately(form, "height", formHeight);
      });
    }
  );

  test(`should render with leftSideButtons`, async ({ mount, page }) => {
    await mount(<FormWithLeftSidedButtons />);

    const cancelButton = page.getByRole("button").filter({ hasText: "Cancel" });
    const buttonClass = page
      .getByRole("button")
      .filter({ hasText: "Cancel" })
      .locator("..");
    await expect(cancelButton).toBeVisible();
    await expect(buttonClass).toHaveCSS("justify-content", "flex-end");
  });

  [true, false].forEach((noValidate) => {
    test(`should render with noValidate prop ${noValidate}`, async ({
      mount,
      page,
    }) => {
      await mount(<FormComponent noValidate={noValidate} />);

      if (noValidate) {
        await expect(getComponent(page, "form")).toHaveAttribute(
          "noValidate",
          /.*/
        );
      } else {
        await expect(getComponent(page, "form")).not.toHaveAttribute(
          "noValidate",
          /.*/
        );
      }
    });
  });

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
      />
    );

    const saveButton = page.getByRole("button");
    await saveButton.click();
    expect(callbackCount).toBe(1);
  });

  test(`should render with rightSideButtons`, async ({ mount, page }) => {
    await mount(<FormWithRightSidedButtons />);

    const cancelButton = page.getByRole("button").filter({ hasText: "Other" });
    const buttonClass = page
      .getByRole("button")
      .filter({ hasText: "Other" })
      .locator("..");
    await expect(cancelButton).toBeVisible();
    await expect(buttonClass).toHaveCSS("justify-content", "normal");
  });

  test(`should render with saveButton`, async ({ mount, page }) => {
    await mount(<FormComponent />);

    const saveButton = page.getByRole("button");
    await expect(saveButton).toBeVisible();
    await expect(saveButton).toHaveText("Save");
  });

  ([
    [true, "rgba(0, 0, 0, 0.05) 0px -4px 12px 0px"],
    [false, "none"],
  ] as [FormProps["stickyFooter"], string][]).forEach(([bool, boxShadow]) => {
    test(`should render with boxShadow value of ${boxShadow} when stickyFooter is ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(<FormComponent stickyFooter={bool} />);

      await expect(getDataElementByValue(page, "form-footer")).toHaveCSS(
        "box-shadow",
        boxShadow
      );
    });
  });

  [2, 4, 6].forEach((warningCount) => {
    test(`should render with warningCount as ${warningCount}`, async ({
      mount,
      page,
    }) => {
      await mount(<FormComponent warningCount={warningCount} />);

      const warnings = getElement(page, "warnings");
      await expect(warnings).toHaveCSS("color", "rgb(167, 72, 0)");
      await expect(warnings).toHaveText(`${warningCount} warnings`);
      await expect(warnings).toBeVisible();
    });
  });

  ([
    ["30px", 30],
    ["100px", 100],
    ["200px", 200],
  ] as [FormProps["height"], number][]).forEach(([height, heightVal]) => {
    test(`should render with height of ${height}`, async ({ mount, page }) => {
      await mount(<FormComponent height={height} />);

      const form = getComponent(page, "form");
      await assertCssValueIsApproximately(form, "height", heightVal);
    });
  });

  ([
    [false, 98],
    [true, 1366],
  ] as [FormProps["fullWidthButtons"], number][]).forEach(
    ([bool, buttonWidth]) => {
      test(`should render with buttonWidth of ${buttonWidth} when fullWidthButtons prop is ${bool}`, async ({
        mount,
        page,
      }) => {
        await mount(<FormWithFullWidthButtons fullWidthButtons={bool} />);

        const submitButton = getComponent(page, "button").filter({
          hasText: "submit",
        });
        await assertCssValueIsApproximately(submitButton, "width", buttonWidth);
      });
    }
  );
});

test.describe("Accessibility tests for Form component", () => {
  test(`should pass tests for DefaultWithStickyFooter example`, async ({
    mount,
    page,
  }) => {
    await mount(<DefaultWithStickyFooter />);

    await checkAccessibility(page);
  });

  test(`should pass tests for FormAlignmentExample`, async ({
    mount,
    page,
  }) => {
    await mount(<FormAlignmentExample />);

    await checkAccessibility(page);
  });

  test(`should pass tests for InDialog example`, async ({ mount, page }) => {
    await mount(<InDialog />);

    const dialogButton = dataComponentButtonByText(page, "Open Preview");
    await dialogButton.click();
    await checkAccessibility(page);
  });

  test(`should pass tests for InDialogFullScreen example`, async ({
    mount,
    page,
  }) => {
    await mount(<InDialogFullScreen />);

    const dialogButton = dataComponentButtonByText(page, "Open Preview");
    await dialogButton.click();

    // color-contrast ignored until we can investigate and fix FE-6245
    await checkAccessibility(page, undefined, "color-contrast");
  });

  test(`should pass tests for InDialogFullScreenWithStickyFooter example`, async ({
    mount,
    page,
  }) => {
    await mount(<InDialogFullScreenWithStickyFooter />);

    const dialogButton = dataComponentButtonByText(page, "Open Preview");
    await dialogButton.click();

    // color-contrast ignored until we can investigate and fix FE-6245

    await checkAccessibility(page, page.getByRole("dialog"), "color-contrast");
  });

  test(`should pass tests for InDialogWithStickyFooter example`, async ({
    mount,
    page,
  }) => {
    await mount(<InDialogWithStickyFooter />);

    const dialogButton = dataComponentButtonByText(page, "Open Preview");
    await dialogButton.click();
    await checkAccessibility(page);
  });

  test(`should pass tests for WithAdditionalButtons example`, async ({
    mount,
    page,
  }) => {
    await mount(<WithAdditionalButtons />);

    await checkAccessibility(page);
  });

  test(`should pass tests for WithBothErrorsAndWarningsSummary example`, async ({
    mount,
    page,
  }) => {
    await mount(<WithBothErrorsAndWarningsSummary />);

    await checkAccessibility(page);
  });

  test(`should pass tests for WithButtonsAlignedToTheLeft example`, async ({
    mount,
    page,
  }) => {
    await mount(<WithButtonsAlignedToTheLeft />);

    await checkAccessibility(page);
  });

  test(`should pass tests for WithCustomFooterPadding example`, async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomFooterPadding />);

    await checkAccessibility(page);
  });

  test(`should pass tests for WithErrorsSummary example`, async ({
    mount,
    page,
  }) => {
    await mount(<WithErrorsSummary />);

    await checkAccessibility(page);
  });

  test(`should pass tests for WithFullWidthButtons example`, async ({
    mount,
    page,
  }) => {
    await mount(<WithFullWidthButtons />);

    await checkAccessibility(page);
  });

  test(`should pass tests for WithLabelsInline example`, async ({
    mount,
    page,
  }) => {
    await mount(<WithLabelsInline />);

    await checkAccessibility(page);
  });

  test(`should pass tests for WithWarningsSummary example`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWarningsSummary />);

    await checkAccessibility(page);
  });
});

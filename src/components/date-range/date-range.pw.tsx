import { expect, test } from "@playwright/experimental-ct-react";
import React from "react";
import {
  getDataElementByValue,
  icon,
  tooltipPreview,
} from "../../../playwright/components";
import {
  dateRangeComponentInput,
  dateRangeComponentLabel,
} from "../../../playwright/components/date-range/index";
import {
  ERROR_ICON,
  ICON,
  INFO_ICON,
  WARNING_ICON,
} from "../../../playwright/components/locators";
import { CHARACTERS, VALIDATION } from "../../../playwright/support/constants";
import {
  checkAccessibility,
  checkElementBorderColours,
  waitForAnimationEnd,
} from "../../../playwright/support/helper";
import {
  DateRangeCustom,
  DateRangeNewValidation,
  DateRangeWithinPopover,
} from "./components.test-pw";
import { DateRangeProps } from "./date-range.component";
import {
  END_DATE,
  START_DATE,
} from "../../../playwright/components/date-range/locators";
import { textboxInput } from "../../../playwright/components/textbox";

const testText = "test_playwright";
const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS] as const;
const START_DATE_RANGE_INDEX = 0;
const END_DATE_RANGE_INDEX = 1;

test.describe("Functionality tests for DateRange component", () => {
  testData.forEach((startLabel) => {
    test(`should check the startLabel renders as ${startLabel}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom startLabel={startLabel} />);

      const dateRangeStartDateLabelElement = dateRangeComponentLabel(
        page,
        START_DATE_RANGE_INDEX,
      );

      await expect(dateRangeStartDateLabelElement).toHaveText(startLabel);
    });
  });

  testData.forEach((endLabel) => {
    test(`should check the endLabel renders as ${endLabel}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom endLabel={endLabel} />);

      const dateRangeComponentLabelElementEndDateRange =
        dateRangeComponentLabel(page, END_DATE_RANGE_INDEX);

      await expect(dateRangeComponentLabelElementEndDateRange).toHaveText(
        endLabel,
      );
    });
  });

  testData.forEach((startError) => {
    test(`should check the startError as string renders as ${startError}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom startError={startError} />);

      const dateRangeComponentInputElementIcon = page
        .locator(ICON)
        .nth(START_DATE_RANGE_INDEX);
      await dateRangeComponentInputElementIcon.hover();

      await expect(tooltipPreview(page)).toHaveText(startError);
      await checkElementBorderColours(
        page,
        dateRangeComponentInput(page, START_DATE_RANGE_INDEX).locator(".."),
        VALIDATION.ERROR,
      );
    });
  });

  testData.forEach((endError) => {
    test(`should check the endError as string renders as ${endError}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom endError={endError} />);

      const dateRangeComponentInputElementIcon = page
        .locator(ICON)
        .nth(END_DATE_RANGE_INDEX);
      await dateRangeComponentInputElementIcon.hover();

      await expect(tooltipPreview(page)).toHaveText(endError);
      await checkElementBorderColours(
        page,
        dateRangeComponentInput(page, END_DATE_RANGE_INDEX).locator(".."),
        VALIDATION.ERROR,
      );
    });
  });

  testData.forEach((startWarning) => {
    test(`should check the startWarning as string renders as ${startWarning}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom startWarning={startWarning} />);

      const dateRangeComponentInputElementIcon = page
        .locator(ICON)
        .nth(START_DATE_RANGE_INDEX);
      await dateRangeComponentInputElementIcon.hover();

      await expect(tooltipPreview(page)).toHaveText(startWarning);
      await checkElementBorderColours(
        page,
        dateRangeComponentInput(page, START_DATE_RANGE_INDEX).locator(".."),
        VALIDATION.WARNING,
      );
    });
  });

  testData.forEach((endWarning) => {
    test(`should check the endWarning as string renders as ${endWarning}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom endWarning={endWarning} />);

      const dateRangeComponentInputElementIcon = page
        .locator(ICON)
        .nth(END_DATE_RANGE_INDEX);
      await dateRangeComponentInputElementIcon.hover();

      await expect(tooltipPreview(page)).toHaveText(endWarning);
      await checkElementBorderColours(
        page,
        dateRangeComponentInput(page, END_DATE_RANGE_INDEX).locator(".."),
        VALIDATION.WARNING,
      );
    });
  });

  testData.forEach((startInfo) => {
    test(`should check the startInfo as string renders as ${startInfo}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom startInfo={startInfo} />);

      const dateRangeComponentInputElementIcon = page
        .locator(ICON)
        .nth(START_DATE_RANGE_INDEX);
      await dateRangeComponentInputElementIcon.hover();

      await expect(tooltipPreview(page)).toHaveText(startInfo);
      await checkElementBorderColours(
        page,
        dateRangeComponentInput(page, START_DATE_RANGE_INDEX).locator(".."),
        VALIDATION.INFO,
      );
    });
  });

  testData.forEach((endInfo) => {
    test(`should check the endInfo as string renders as ${endInfo}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom endInfo={endInfo} />);

      const dateRangeComponentInputElementIcon = page
        .locator(ICON)
        .nth(END_DATE_RANGE_INDEX);
      await dateRangeComponentInputElementIcon.hover();

      await expect(tooltipPreview(page)).toHaveText(endInfo);
      await checkElementBorderColours(
        page,
        dateRangeComponentInput(page, END_DATE_RANGE_INDEX).locator(".."),
        VALIDATION.INFO,
      );
    });
  });

  test("should check the startError as boolean", async ({ mount, page }) => {
    await mount(<DateRangeCustom startError />);

    await checkElementBorderColours(
      page,
      dateRangeComponentInput(page, START_DATE_RANGE_INDEX).locator(".."),
      VALIDATION.ERROR,
    );
  });

  test("should check the endError as boolean", async ({ mount, page }) => {
    await mount(<DateRangeCustom endError />);

    await checkElementBorderColours(
      page,
      dateRangeComponentInput(page, END_DATE_RANGE_INDEX).locator(".."),
      VALIDATION.ERROR,
    );
  });

  test("should check the startWarning as boolean", async ({ mount, page }) => {
    await mount(<DateRangeCustom startWarning />);

    await checkElementBorderColours(
      page,
      dateRangeComponentInput(page, START_DATE_RANGE_INDEX).locator(".."),
      VALIDATION.WARNING,
    );
  });

  test("should check the endWarning as boolean", async ({ mount, page }) => {
    await mount(<DateRangeCustom endWarning />);

    await checkElementBorderColours(
      page,
      dateRangeComponentInput(page, END_DATE_RANGE_INDEX).locator(".."),
      VALIDATION.WARNING,
    );
  });

  test("should check the startInfo as boolean", async ({ mount, page }) => {
    await mount(<DateRangeCustom startInfo />);

    await checkElementBorderColours(
      page,
      dateRangeComponentInput(page, START_DATE_RANGE_INDEX).locator(".."),
      VALIDATION.INFO,
    );
  });

  test("should check the endInfo as boolean", async ({ mount, page }) => {
    await mount(<DateRangeCustom endInfo />);

    await checkElementBorderColours(
      page,
      dateRangeComponentInput(page, END_DATE_RANGE_INDEX).locator(".."),
      VALIDATION.INFO,
    );
  });

  testData.forEach((error) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should check the validationOnLabel with error state as ${error}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateRangeCustom
          startError={error}
          endError={error}
          validationOnLabel
        />,
      );

      const dateRangeComponentLabelElementStartDateIcon = page
        .locator(ERROR_ICON)
        .nth(START_DATE_RANGE_INDEX);
      await dateRangeComponentLabelElementStartDateIcon.hover();
      const tooltipElement = tooltipPreview(page);
      await waitForAnimationEnd(tooltipElement);

      await expect(tooltipElement).toHaveText(error);

      await page.hover("body"); // hover on body to close the tooltip

      const dateRangeComponentLabelElementEndDateIcon = page
        .locator(ERROR_ICON)
        .nth(END_DATE_RANGE_INDEX);
      await dateRangeComponentLabelElementEndDateIcon.hover();
      await waitForAnimationEnd(tooltipElement);

      await expect(tooltipElement).toHaveText(error);
    });
  });

  testData.forEach((warning) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should check the validationOnLabel with warning state as ${warning}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateRangeCustom
          startWarning={warning}
          endWarning={warning}
          validationOnLabel
        />,
      );

      const dateRangeComponentLabelElementStartDateIcon = page
        .locator(WARNING_ICON)
        .nth(START_DATE_RANGE_INDEX);
      await dateRangeComponentLabelElementStartDateIcon.hover();
      const tooltipElement = tooltipPreview(page);
      await waitForAnimationEnd(tooltipElement);

      await expect(tooltipElement).toHaveText(warning);

      await page.hover("body"); // hover on body to close the tooltip

      const dateRangeComponentLabelElementEndDateIcon = page
        .locator(WARNING_ICON)
        .nth(END_DATE_RANGE_INDEX);
      await dateRangeComponentLabelElementEndDateIcon.hover();
      await waitForAnimationEnd(tooltipElement);

      await expect(tooltipElement).toHaveText(warning);
    });
  });

  testData.forEach((info) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should check the validationOnLabel with info state as ${info}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateRangeCustom startInfo={info} endInfo={info} validationOnLabel />,
      );

      const dateRangeComponentLabelElementStartDateIcon = page
        .locator(INFO_ICON)
        .nth(START_DATE_RANGE_INDEX);

      await dateRangeComponentLabelElementStartDateIcon.hover();
      const tooltipElement = tooltipPreview(page);
      await waitForAnimationEnd(tooltipElement);

      await expect(tooltipElement).toHaveText(info);

      await page.hover("body"); // hover on body to close the tooltip

      const dateRangeComponentLabelElementEndDateInfoIcon = page
        .locator(INFO_ICON)
        .nth(END_DATE_RANGE_INDEX);

      await dateRangeComponentLabelElementEndDateInfoIcon.hover();
      await waitForAnimationEnd(tooltipElement);
      await expect(tooltipElement).toHaveText(info);
    });
  });

  (
    [
      [true, "top", "flex"],
      [false, "bottom", "block"],
    ] as const
  ).forEach(([boolean, cssValue, displayValue]) => {
    test(`should check the labelsInline prop is set to ${boolean}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom labelsInline={boolean} />);

      const startDateElement = page.locator(START_DATE);

      await expect(startDateElement).toHaveCSS("vertical-align", cssValue);

      const dateRangeComponentLabelElementStartDateParent =
        dateRangeComponentLabel(page, START_DATE_RANGE_INDEX)
          .locator("..")
          .locator("..");

      await expect(dateRangeComponentLabelElementStartDateParent).toHaveCSS(
        "display",
        displayValue,
      );

      const endDateElement = page.locator(END_DATE);

      await expect(endDateElement).toHaveCSS("vertical-align", cssValue);

      const dateRangeComponentLabelElementEndDateIndexParent =
        dateRangeComponentLabel(page, END_DATE_RANGE_INDEX)
          .locator("..")
          .locator("..");

      await expect(dateRangeComponentLabelElementEndDateIndexParent).toHaveCSS(
        "display",
        displayValue,
      );
    });
  });

  test("should check the startDateProps prop", async ({ mount, page }) => {
    await mount(
      <DateRangeCustom
        startDateProps={{
          disabled: true,
        }}
      />,
    );

    const startDateInput = getDataElementByValue(page, "input").nth(
      START_DATE_RANGE_INDEX,
    );

    await expect(startDateInput).toHaveAttribute("disabled", "");
  });

  test("should check the endDateProps prop", async ({ mount, page }) => {
    await mount(
      <DateRangeCustom
        endDateProps={{
          disabled: true,
        }}
      />,
    );

    const endDateInput = getDataElementByValue(page, "input").nth(
      END_DATE_RANGE_INDEX,
    );

    await expect(endDateInput).toHaveAttribute("disabled", "");
  });

  (["top", "bottom", "left", "right"] as const).forEach((position) => {
    test(`should check the tooltipPosition is set to ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateRangeCustom
          m={9}
          tooltipPosition={position}
          startError={testText}
        />,
      );

      const iconElement = icon(page);
      await iconElement.nth(0).hover();

      await expect(tooltipPreview(page)).toHaveAttribute(
        "data-placement",
        position,
      );

      await page.hover("body"); // hover on body to close the tooltip
    });
  });

  test("should check keyboard navigation is working correctly when DateRange is inside PopoverContainer", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeWithinPopover />);

    const popoverButton = page.locator('[data-component="button"]');
    await popoverButton.click();

    const popoverContainer = page.locator(
      '[data-element="popover-container-content"]',
    );

    await expect(popoverContainer).toBeVisible();

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const startDayPicker = page.getByTestId("date-picker");
    await startDayPicker.waitFor();

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const startDayButton = page.getByRole("button", {
      name: "Saturday, October 1st, 2016",
    });
    await expect(startDayButton).toBeFocused();

    await page.keyboard.press("Tab");

    const endDateInput = page.getByLabel("End");
    await expect(endDateInput).toBeFocused();

    const endDayPicker = page.getByTestId("date-picker");
    await endDayPicker.waitFor();

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const endDayButton = page.getByRole("button", {
      name: "Friday, December 30th, 2016",
    });
    await expect(endDayButton).toBeFocused();

    await page.keyboard.press("Tab");

    await expect(endDayPicker).not.toBeVisible();
    await expect(popoverContainer).not.toBeVisible();
    await expect(popoverButton).toBeFocused();
  });
});

test.describe("Event tests for DateRange component", () => {
  ([0, 1] as const).forEach((inputIndex) => {
    test(`should call onChange callback when a clear event is triggered on ${inputIndex} DateRange input`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <DateRangeCustom
          onChange={() => {
            callbackCount += 1;
          }}
        />,
      );

      const getDataElementByValueElementInputEqInputIndex =
        getDataElementByValue(page, "input").nth(inputIndex);
      await getDataElementByValueElementInputEqInputIndex.clear();

      expect(callbackCount).toEqual(1);
    });
  });

  ([0, 1] as const).forEach((inputIndex) => {
    testData.forEach((value) => {
      test(`should call onChange callback when a type event is triggered on ${inputIndex} DateRange input using ${value}`, async ({
        mount,
        page,
      }) => {
        let callbackCount = 0;
        await mount(
          <DateRangeCustom
            onChange={() => {
              callbackCount += 1;
            }}
          />,
        );

        await textboxInput(page).nth(inputIndex).type(value);

        expect(callbackCount).toEqual(value.length);
      });
    });
  });

  test("should call onChange callback when a type event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <DateRangeCustom
        onChange={() => {
          callbackCount += 1;
        }}
        name={testText}
        id={testText}
      />,
    );

    await textboxInput(page).nth(START_DATE_RANGE_INDEX).type("1");

    expect(callbackCount).toEqual(1);
  });
});

test.describe("Accessibility tests for Date Range", () => {
  testData.forEach((startLabel) => {
    test(`should check accessibility with startLabel rendered as ${startLabel}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom startLabel={startLabel} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((endLabel) => {
    test(`should check accessibility with endLabel rendered as ${endLabel}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom endLabel={endLabel} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((startError) => {
    test(`should check accessibility with startError as string rendered as ${startError}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom startError={startError} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((endError) => {
    test(`should check accessibility with endError as string rendered as ${endError}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom endError={endError} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((startWarning) => {
    test(`should check accessibility with startWarning as string rendered as ${startWarning}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom startWarning={startWarning} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((endWarning) => {
    test(`should check accessibility with endWarning as string rendered as ${endWarning}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom endWarning={endWarning} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((startInfo) => {
    test(`should check accessibility with startInfo as string rendered as ${startInfo}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom startInfo={startInfo} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((endInfo) => {
    test(`should check accessibility with endInfo as string rendered as ${endInfo}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom endInfo={endInfo} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((error) => {
    test(`should check accessibility with validationOnLabel rendered with error state as ${error}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateRangeCustom
          startError={error}
          endError={error}
          validationOnLabel
        />,
      );

      await checkAccessibility(page);
    });
  });

  testData.forEach((warning) => {
    test(`should check accessibility with validationOnLabel rendered with warning state as ${warning}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateRangeCustom
          startWarning={warning}
          endWarning={warning}
          validationOnLabel
        />,
      );

      await checkAccessibility(page);
    });
  });

  testData.forEach((info) => {
    test(`should check accessibility with validationOnLabel rendered with info state as ${info}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateRangeCustom startInfo={info} endInfo={info} validationOnLabel />,
      );

      await checkAccessibility(page);
    });
  });

  (
    ["top", "bottom", "left", "right"] as DateRangeProps["tooltipPosition"][]
  ).forEach((position) => {
    test(`should check accessibility with tooltipPosition set to ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateRangeCustom
          m={9}
          tooltipPosition={position}
          startError={testText}
        />,
      );
      const errorIconElement = getDataElementByValue(page, "error");
      await errorIconElement.hover();

      await checkAccessibility(page, tooltipPreview(page));

      await page.hover("body"); // hover on body to close the tooltip
    });
  });

  test("should check accessibility with startError as a boolean", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCustom startError />);

    await checkAccessibility(page);
  });

  test("should check accessibility with endError as a boolean", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCustom endError />);

    await checkAccessibility(page);
  });

  test("should check accessibility with startWarning as a boolean", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCustom startWarning />);

    await checkAccessibility(page);
  });

  test("should check accessibility with endWarning as a boolean", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCustom endWarning />);

    await checkAccessibility(page);
  });

  test("should check accessibility with startInfo as a boolean", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCustom startInfo />);

    await checkAccessibility(page);
  });

  test("should check accessibility with endInfo as a boolean", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCustom endInfo />);

    await checkAccessibility(page);
  });

  ([true, false] as const).forEach((boolean) => {
    test(`should check accessibility with labelsInline prop set to ${boolean}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateRangeCustom labelsInline={boolean} />);

      await checkAccessibility(page);
    });
  });

  test("should check accessibility with startDateProps prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <DateRangeCustom
        startDateProps={{
          disabled: true,
        }}
      />,
    );

    await checkAccessibility(page);
  });

  test("should check accessibility with endDateProps prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <DateRangeCustom
        endDateProps={{
          disabled: true,
        }}
      />,
    );

    await checkAccessibility(page);
  });

  test("should check accessibility with new validation", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeNewValidation />);

    await checkAccessibility(page);
  });
});

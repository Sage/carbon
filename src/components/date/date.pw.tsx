import React from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  DateInputLegacyControlled,
  DateInputTypicalControlled,
  DateInputValidationStates,
  DateInputWithNextFocusableElement,
  DateInputInsideDialog,
} from "./components.test-pw";
import { getDataElementByValue } from "../../../playwright/components";
import {
  checkAccessibility,
  containsClass,
} from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";
import { dayPickerWrapper } from "../../../playwright/components/date-input/index";

dayjs.extend(advancedFormat);

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const TODAY = dayjs().format("dddd, MMMM Do, YYYY");
const DATE_INPUT = dayjs("2022-05-01").format("DD/MM/YYYY");
const TODAY_DATE_INPUT = dayjs().format("DD/MM/YYYY");
const NEXT_MONTH = dayjs("2022-05-01").add(1, "months").format("MMMM YYYY");
const ACTUAL_MONTH = dayjs("2022-05-01").format("MMMM YYYY");
const MIN_DATE = "04/04/2030";
const DAY_BEFORE_MIN_DATE = "Wednesday, April 3rd, 2030";
const DAY_AFTER_MAX_DATE = "Friday, April 5th, 2030";

test.describe("Functionality tests", () => {
  [
    { size: "small", width: "128px", height: "32px" },
    { size: "medium", width: "144px", height: "40px" },
    { size: "large", width: "176px", height: "48px" },
  ].forEach(({ size, width, height }) => {
    test(`should render the ${size} date input at ${width} by ${height}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateInputTypicalControlled
          size={size as "small" | "medium" | "large"}
        />,
      );

      await expect(page.locator('[data-role="input-wrapper"]')).toHaveCSS(
        "width",
        width,
      );
      await expect(page.locator('[data-role="input-container"]')).toHaveCSS(
        "height",
        height,
      );
    });
  });

  test(`should check the minDate prop`, async ({ mount, page }) => {
    await mount(<DateInputLegacyControlled minDate="2030-04-04" />);

    const input = getDataElementByValue(page, "input");
    await input.fill(MIN_DATE);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const dayPicker = page.getByRole("button", {
      name: DAY_BEFORE_MIN_DATE,
    });
    await expect(dayPicker).toBeDisabled();
  });

  test(`should check the maxDate prop`, async ({ mount, page }) => {
    await mount(<DateInputLegacyControlled maxDate="2030-04-04" />);

    const input = getDataElementByValue(page, "input");
    await input.fill(MIN_DATE);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const dayPicker = page.getByRole("button", {
      name: DAY_AFTER_MAX_DATE,
    });
    await expect(dayPicker).toBeDisabled();
  });

  test(`should check the date is set to today's day`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled />);

    const input = getDataElementByValue(page, "input");
    await input.fill(TODAY_DATE_INPUT);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const todayButton = page.getByRole("button", { name: `Today, ${TODAY}` });
    const todayCell = page.getByRole("gridcell").filter({
      has: todayButton,
    });

    await expect(todayButton).toBeVisible();
    await containsClass(todayCell, "rdp-day");
    await containsClass(todayCell, "rdp-today");
  });

  test("completes a typical keyboard selection journey", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputTypicalControlled value="01/05/2022" />);

    const input = page.getByRole("textbox", { name: "Date" });
    await page.getByRole("button", { name: "Open calendar" }).click();

    await expect(
      page.getByRole("button", {
        name: "Sunday, May 1st, 2022, selected",
      }),
    ).toBeFocused();

    await page
      .getByRole("combobox", { name: "Choose the month" })
      .selectOption({ label: "June" });

    await page
      .getByRole("button", { name: "Wednesday, June 15th, 2022" })
      .press("Enter");

    await expect(input).toHaveValue("15/06/2022");
    await expect(input).toBeFocused();
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  [true, false].forEach((disablePortal) => {
    test(`closes the typical ${
      disablePortal ? "non-portalled" : "portalled"
    } date picker when clicking outside the input and picker after keyboard navigation`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateInputTypicalControlled
          value="01/05/2022"
          disablePortal={disablePortal}
        />,
      );

      await page.getByRole("button", { name: "Open calendar" }).click();

      const datePicker = page.getByTestId("date-picker");
      await expect(datePicker).toBeVisible();

      const selectedDay = page.getByRole("button", {
        name: "Sunday, May 1st, 2022, selected",
      });
      await expect(selectedDay).toBeFocused();
      for (const key of [
        "ArrowDown",
        "ArrowDown",
        "ArrowDown",
        "ArrowDown",
        "ArrowUp",
        "ArrowLeft",
      ]) {
        await page.keyboard.press(key);
      }

      const dateWrapper = page.locator('[data-component="date"]');
      const wrapperBox = (await dateWrapper.boundingBox()) as {
        x: number;
        y: number;
        width: number;
        height: number;
      };
      // Click near the bottom-right edge of the wrapper — inside the wrapper
      // boundary but outside the text input and picker, to verify the
      // click-away handler closes the picker in this scenario.
      await page.mouse.click(
        wrapperBox.x + wrapperBox.width - 8,
        wrapperBox.y + wrapperBox.height - 8,
      );

      await expect(datePicker).toBeHidden();
    });
  });

  [
    ["bottom", 0],
    ["top", 400],
  ].forEach(([position, margin]) => {
    test(`should show Date input at the ${position} position`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputLegacyControlled mt={`${margin}px`} />);

      const calendarIcon = page.getByTestId("icon");
      await calendarIcon.click();

      const floatingDatePicker = page.locator("[data-floating-placement]");
      await expect(floatingDatePicker).toHaveAttribute(
        "data-floating-placement",
        `${position}-start`,
      );
      await expect(floatingDatePicker).toBeVisible();
    });
  });

  test("should use the month selector to show the next month", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled />);

    const input = getDataElementByValue(page, "input");
    await input.fill(DATE_INPUT);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const monthSelector = page.getByRole("combobox", {
      name: "Choose the month",
    });
    await monthSelector.selectOption({ label: "June" });
    await expect(monthSelector).toHaveValue("5");
  });

  test("should use the year selector to show a different year", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled />);

    const input = getDataElementByValue(page, "input");
    await input.fill(DATE_INPUT);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const yearSelector = page.getByRole("combobox", {
      name: "Choose the year",
    });
    await yearSelector.selectOption({ label: "2023" });
    await expect(yearSelector).toHaveValue("2023");
  });

  test(`should allow a user to tab into the picker and through its controls`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled value="12/12/2022" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const dayPicker = page.getByTestId("date-picker");
    await dayPicker.waitFor();

    const dayButton = page.getByRole("button", {
      name: "Monday, December 12th, 2022, selected",
    });
    await expect(dayButton).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Close" })).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("combobox", { name: "Choose the month" }),
    ).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("combobox", { name: "Choose the year" }),
    ).toBeFocused();
  });

  test(`should focus the close button when focus is on a day element and Tab is pressed`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputWithNextFocusableElement value="01/05/2022" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const dayPicker = page.getByTestId("date-picker");
    await dayPicker.waitFor();

    const dayButton = page.getByRole("button", {
      name: "Sunday, May 1st, 2022",
    });
    await dayButton.press("Tab");

    await expect(dayPicker).toBeVisible();
    await expect(page.getByRole("button", { name: "Close" })).toBeFocused();
  });

  test(`should focus today's date if no day selected when tabbing to day elements`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled value="" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const todayButton = page.getByRole("button", { name: `Today, ${TODAY}` });
    await todayButton.waitFor();

    await expect(todayButton).toBeFocused();
  });

  test(`day buttons are navigable with the arrow keys`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled value="14/04/2022" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();
    const datePicker = page.getByTestId("date-picker");
    await datePicker.waitFor();

    const day14Button = page.getByRole("button", {
      name: "Thursday, April 14th, 2022, selected",
    });
    await expect(day14Button).toBeFocused();

    const day21Button = page.getByRole("button", {
      name: "Thursday, April 21st, 2022",
    });
    await day14Button.press("ArrowDown");
    await expect(day21Button).toBeFocused();

    const day22Button = page.getByRole("button", {
      name: "Friday, April 22nd, 2022",
    });
    await day21Button.press("ArrowRight");
    await expect(day22Button).toBeFocused();

    const day15Button = page.getByRole("button", {
      name: "Friday, April 15th, 2022",
    });
    await day22Button.press("ArrowUp");
    await expect(day15Button).toBeFocused();

    await day15Button.press("ArrowLeft");
    await expect(day14Button).toBeFocused();
  });

  test(`navigates to previous month when left arrow is pressed while first day of a month button is focused`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled value="01/04/2022" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();
    await page.getByLabel("Date", { exact: true }).press("Tab");

    const datePicker = page.getByTestId("date-picker");
    await datePicker.waitFor();

    const day1Button = page.getByRole("button", {
      name: "Friday, April 1st, 2022",
    });
    await day1Button.press("ArrowLeft");

    const day31Button = page.getByRole("button", {
      name: "Thursday, March 31st, 2022",
    });
    await day31Button.waitFor();

    await expect(day31Button).toBeFocused();

    await expect(
      page.getByRole("dialog", { name: "Choose a date" }),
    ).toBeVisible();
  });

  test(`navigates to previous month, when up arrow is pressed on a day button if a previous-month day is displayed above`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled value="04/04/2022" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();
    await page.getByLabel("Date", { exact: true }).press("Tab");

    const datePicker = page.getByTestId("date-picker");
    await datePicker.waitFor();

    const day4Button = page.getByRole("button", {
      name: "Monday, April 4th, 2022",
    });
    await day4Button.press("ArrowUp");

    const day28Button = page.getByRole("button", {
      name: "Monday, March 28th, 2022",
    });
    await day28Button.waitFor();

    await expect(day28Button).toBeFocused();

    await expect(
      page.getByRole("dialog", { name: "Choose a date" }),
    ).toBeVisible();
  });

  test("navigates to previous month, when down arrow is pressed on a day button if a previous-month day is displayed below", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled value="24/04/2022" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();
    await page.getByLabel("Date", { exact: true }).press("Tab");

    const datePicker = page.getByTestId("date-picker");
    await datePicker.waitFor();

    const day24Button = page.getByRole("button", {
      name: "Sunday, April 24th, 2022",
    });
    await day24Button.press("ArrowDown");

    const day1Button = page.getByRole("button", {
      name: "Sunday, May 1st, 2022",
    });
    await day1Button.waitFor();

    await expect(day1Button).toBeFocused();

    await expect(
      page.getByRole("dialog", { name: "Choose a date" }),
    ).toBeVisible();
  });

  ["Enter", "Space"].forEach((key) => {
    test(`updates selected date when ${key} pressed on a day button`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputLegacyControlled value="14/04/2022" />);

      const calendarIcon = page.getByTestId("icon");
      await calendarIcon.click();

      const dateInput = page.getByLabel("Date", { exact: true });
      await dateInput.press("Tab");

      const datePicker = page.getByTestId("date-picker");
      await datePicker.waitFor();

      const day25Button = page.getByRole("button", {
        name: "Monday, April 25th, 2022",
      });
      await day25Button.press(key);

      await expect(dateInput).toHaveValue("25/04/2022");
    });
  });

  test("navigates to the next month, when right arrow is pressed on last day of a month button", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled value="31/05/2022" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    await page.getByLabel("Date", { exact: true }).press("Tab");

    const datePicker = page.getByTestId("date-picker");
    await datePicker.waitFor();

    const day31Button = page.getByRole("button", {
      name: "Tuesday, May 31st, 2022",
    });
    await day31Button.press("ArrowRight");

    const day1Button = page.getByRole("button", {
      name: "Wednesday, June 1st, 2022",
    });
    await day1Button.waitFor();

    await expect(day1Button).toBeFocused();

    await expect(
      page.getByRole("dialog", { name: "Choose a date" }),
    ).toBeVisible();
  });

  test(`when maxWidth has no value it should render as 100%`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled inputWidth={100} maxWidth="" />);

    const inputParent = getDataElementByValue(page, "input")
      .locator("..")
      .locator("..");
    await expect(inputParent).toHaveCSS("max-width", "100%");
  });

  test(`should check the pickerProps prop`, async ({ mount, page }) => {
    await mount(
      <DateInputLegacyControlled pickerProps={{ numberOfMonths: 2 }} />,
    );

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const months = page.getByRole("grid");
    await expect(months).toHaveCount(2);
    const pickerHeading1 = page.getByText(ACTUAL_MONTH, { exact: true });
    await expect(pickerHeading1).toHaveText(ACTUAL_MONTH);
    const pickerHeading2 = page.getByText(NEXT_MONTH, { exact: true });
    await expect(pickerHeading2).toHaveText(NEXT_MONTH);
  });

  test("date picker does not float above the rest of the page, when disablePortal prop is true", async ({
    mount,
    page,
  }) => {
    await mount(
      <div
        id="clipping-container"
        style={{
          position: "relative",
          overflow: "hidden",
          border: "1px solid black",
        }}
      >
        <DateInputLegacyControlled disablePortal />
      </div>,
    );

    const input = page.getByLabel("Date");
    await input.click();
    const datePicker = dayPickerWrapper(page);
    await expect(datePicker).not.toBeInViewport();
  });

  test("date picker floats above the rest of the page, when disablePortal prop is false", async ({
    mount,
    page,
  }) => {
    await mount(
      <div
        id="clipping-container"
        style={{
          position: "relative",
          overflow: "hidden",
          border: "1px solid black",
        }}
      >
        <DateInputLegacyControlled disablePortal={false} />
      </div>,
    );

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const datePicker = dayPickerWrapper(page);
    await expect(datePicker).toBeInViewport();
  });
});

test.describe("When nested inside of a Dialog component", () => {
  test("should not close the Dialog when Datepicker is closed by pressing an escape key", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputInsideDialog />);

    const calendarIcon = getDataElementByValue(page, "calendar_today");
    await calendarIcon.click();

    const datePicker = page.getByTestId("date-picker");
    await datePicker.waitFor();

    await datePicker.press("Escape");

    await expect(datePicker).toBeHidden();
    await expect(page.getByRole("dialog", { name: "Dialog" })).toBeVisible();
  });
});

test.describe("Accessibility tests", () => {
  test(`should check accessibility for the default component`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    await checkAccessibility(page);
  });

  test(`should check accessibility for component with autoFocus prop`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled autoFocus />);

    await checkAccessibility(page);
  });

  test(`should check accessibility for component with disabled prop`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled disabled />);

    await checkAccessibility(page);
  });

  test(`should check accessibility for component with readOnly prop`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled readOnly />);

    await checkAccessibility(page);
  });

  testData.forEach((fieldHelp) => {
    test(`should check accessibility with the fieldHelp renders ${fieldHelp}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputLegacyControlled fieldHelp={fieldHelp} />);

      await checkAccessibility(page);
    });
  });

  test(`should check accessibility for component with required prop`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled required />);

    await checkAccessibility(page);
  });

  test(`should check accessibility for component with validation`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputValidationStates />);

    await checkAccessibility(page);
  });

  test(`should check accessibility when the picker is open`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputLegacyControlled />);

    const input = getDataElementByValue(page, "input");
    await input.click();
    await checkAccessibility(page);
  });

  test("should check accessibility when the typical picker is open", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputTypicalControlled />);

    await page.getByRole("button", { name: "Open calendar" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await checkAccessibility(page);
  });

  test("should check accessibility when the typical picker is open with range modifiers", async ({
    mount,
    page,
  }) => {
    const today = new Date();
    const rangeEnd = new Date(today);
    rangeEnd.setDate(today.getDate() + 7);

    await mount(
      <DateInputTypicalControlled
        pickerProps={{
          modifiers: {
            range_start: today,
            range_middle: { after: today, before: rangeEnd },
            range_end: rangeEnd,
          },
        }}
      />,
    );

    await page.getByRole("button", { name: "Open calendar" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await checkAccessibility(page);
  });
});

import React from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat.js";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  DateInputCustom,
  DateInputValidationNewDesign,
  WithSiblingButton,
  DateInputInsideDialog,
} from "./components.test-pw";
import { DateInputProps } from ".";
import { getDataElementByValue } from "../../../playwright/components";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  SIZE,
  CHARACTERS,
  VALIDATION,
} from "../../../playwright/support/constants";
import { dayPickerHeading } from "../../../playwright/components/date-input/index";

dayjs.extend(advancedFormat);

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const TODAY = dayjs().format("dddd, MMMM Do, YYYY");
const NEXT_MONTH = dayjs("2022-05-01").add(1, "months").format("MMMM YYYY");
const PREVIOUS_MONTH = dayjs("2022-05-01")
  .subtract(1, "months")
  .format("MMMM YYYY");
const arrowKeys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];

test.describe("Functionality tests", () => {
  arrowKeys.forEach((key) => {
    test(`should not change the displayed month when ${key} is pressed and next button is focused`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom value="01/05/2022" />);

      const calendarIcon = page.getByTestId("icon");
      await calendarIcon.click();

      const datePicker = page.getByTestId("date-picker");
      await datePicker.waitFor();

      const nextMonthButton = page.getByRole("button", { name: "Next month" });
      await nextMonthButton.press(key);

      const pickerHeading = datePicker.getByRole("status");
      await expect(pickerHeading).toHaveText("May 2022");
    });
  });

  arrowKeys.forEach((key) => {
    test(`should not change the displayed month when ${key} is pressed and previous button is focused`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom value="01/05/2022" />);

      const calendarIcon = page.getByTestId("icon");
      await calendarIcon.click();

      const nextMonthButton = page.getByRole("button", { name: "Next month" });
      await nextMonthButton.waitFor();

      await nextMonthButton.focus();
      await nextMonthButton.press(key);

      const datePicker = page.getByTestId("date-picker");
      const pickerHeading = datePicker.getByRole("status");
      await expect(pickerHeading).toHaveText("May 2022");
    });
  });

  test(`should allow a user to tab into the picker and through its controls`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom value="12/12/2022" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const dayPicker = page.getByTestId("date-picker");
    await dayPicker.waitFor();

    await page.keyboard.press("Tab");
    const previousMonthButton = page.getByRole("button", {
      name: "Previous month",
    });
    await expect(previousMonthButton).toBeFocused();

    await page.keyboard.press("Tab");
    const nextMonthButton = page.getByRole("button", {
      name: "Next month",
    });
    await expect(nextMonthButton).toBeFocused();

    await page.keyboard.press("Tab");
    const dayButton = page.getByRole("button", {
      name: "Monday, December 12th, 2022",
    });
    await expect(dayButton).toBeFocused();
  });

  test(`should close the picker and focus the next element in the DOM when focus is on a day element and tab pressed`, async ({
    mount,
    page,
  }) => {
    await mount(<WithSiblingButton value="01/05/2022" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const dayPicker = page.getByTestId("date-picker");
    await dayPicker.waitFor();

    const dayButton = page.getByRole("button", {
      name: "Sunday, May 1st, 2022",
    });
    await dayButton.press("Tab");

    const fooButton = page.getByRole("button", { name: "foo" });
    await expect(dayPicker).toBeHidden();
    await expect(fooButton).toBeFocused();
  });

  test(`should focus today's date if no day selected when tabbing to day elements`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom value="" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    await page.getByLabel("Date").press("Tab");

    const todayButton = page.getByRole("button", { name: `Today, ${TODAY}` });
    await todayButton.waitFor();

    await page
      .getByRole("button", { name: "Next month", exact: true })
      .press("Tab");

    await expect(todayButton).toBeFocused();
  });

  test(`day buttons are navigable with the arrow keys`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom value="14/04/2022" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();
    await page.getByLabel("Date").press("Tab");

    const datePicker = page.getByTestId("date-picker");
    await datePicker.waitFor();

    await page
      .getByRole("button", { name: "Next month", exact: true })
      .press("Tab");
    const day14Button = page.getByRole("button", {
      name: "Thursday, April 14th, 2022",
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
    await mount(<DateInputCustom value="01/04/2022" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();
    await page.getByLabel("Date").press("Tab");

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

    const pickerHeading = datePicker.getByRole("status");
    await expect(pickerHeading).toHaveText("March 2022");
  });

  test(`navigates to previous month, when up arrow is pressed on a day button if a previous-month day is displayed above`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom value="04/04/2022" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();
    await page.getByLabel("Date").press("Tab");

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

    const pickerHeading = datePicker.getByRole("status");
    await expect(pickerHeading).toHaveText("March 2022");
  });

  test("navigates to previous month, when down arrow is pressed on a day button if a previous-month day is displayed below", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom value="24/04/2022" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();
    await page.getByLabel("Date").press("Tab");

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

    const pickerHeading = datePicker.getByRole("status");
    await expect(pickerHeading).toHaveText("May 2022");
  });

  ["Enter", "Space"].forEach((key) => {
    test(`updates selected date when ${key} pressed on a day button`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom value="14/04/2022" />);

      const calendarIcon = page.getByTestId("icon");
      await calendarIcon.click();

      const dateInput = page.getByLabel("Date");
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
    await mount(<DateInputCustom value="31/05/2022" />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    await page.getByLabel("Date").press("Tab");

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

    const pickerHeading = datePicker.getByRole("status");
    await expect(pickerHeading).toHaveText("June 2022");
  });

  [
    ["Enter", "next", "chevron_right"],
    ["Space", "next", "chevron_right"],
    ["Enter", "previous", "chevron_left"],
    ["Space", "previous", "chevron_left"],
  ].forEach(([key, month, arrow]) => {
    test(`should change the displayed month when ${key} is pressed and ${month} button is focused`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom />);

      const calendarIcon = page.getByTestId("icon");
      await calendarIcon.click();

      const arrowParent = getDataElementByValue(page, arrow).locator("..");
      await arrowParent.focus();
      const arrowElement = getDataElementByValue(page, arrow);
      await arrowElement.press(key);

      const pickerHeading = dayPickerHeading(page);
      if (month === "next") {
        await expect(pickerHeading).toHaveText(NEXT_MONTH);
      } else if (month === "previous") {
        await expect(pickerHeading).toHaveText(PREVIOUS_MONTH);
      }
    });
  });
});

test.describe("When nested inside of a Dialog component", () => {
  test("should not close the Dialog when Datepicker is closed by pressing an escape key", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputInsideDialog />);

    const calendarIcon = getDataElementByValue(page, "calendar");
    await calendarIcon.click();

    const datePicker = page.getByTestId("date-picker");
    await datePicker.waitFor();

    await datePicker.press("Escape");

    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(datePicker).toBeHidden();
  });
});

test.describe("Accessibility tests", () => {
  test(`should check accessibility for the default component`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    await checkAccessibility(page);
  });

  ([SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE] as DateInputProps["size"][]).forEach(
    (size) => {
      test(`should check accessibility with size set to ${size}`, async ({
        mount,
        page,
      }) => {
        await mount(<DateInputCustom size={size} />);

        const calendarIcon = page.getByTestId("icon");
        await calendarIcon.click();

        await checkAccessibility(page);
      });
    },
  );

  test(`should check accessibility for component with disabled prop`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom disabled />);

    await checkAccessibility(page);
  });

  test(`should check accessibility for component with readOnly prop`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom readOnly />);

    await checkAccessibility(page);
  });

  testData.forEach((fieldHelp) => {
    test(`should check accessibility with the fieldHelp renders ${fieldHelp}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom fieldHelp={fieldHelp} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((label) => {
    test(`should check accessibility with the label renders ${label}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom label={label} />);

      await checkAccessibility(page);
    });
  });

  test(`should check accessibility for component with required prop`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom required />);

    await checkAccessibility(page);
  });

  [
    [VALIDATION.ERROR, "error", true],
    [VALIDATION.WARNING, "warning", true],
    [VALIDATION.INFO, "info", true],
  ].forEach((borderColor, type, bool) => {
    test(`should check accessibility for DateInput is ${borderColor} when validation is ${type} and boolean prop is ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateInputCustom
          labelInline
          labelAlign="right"
          {...{ [type]: bool }}
        />,
      );

      await checkAccessibility(page);
    });
  });

  test(`should check accessibility for component with new validation`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputValidationNewDesign />);

    await checkAccessibility(page);
  });

  test(`should check accessibility when the picker is open`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const inputParent = getDataElementByValue(page, "input").locator("..");
    await inputParent.click();
    await checkAccessibility(page);
  });
});

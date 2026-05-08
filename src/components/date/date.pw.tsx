import React from "react";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  DateInputCustom,
  DateInputValidationNewDesign,
  WithSiblingButton,
  DateInputInsideDialog,
} from "./components.test-pw";
import { getDataElementByValue } from "../../../playwright/components";
import {
  verifyRequiredAsteriskForLabel,
  checkAccessibility,
  containsClass,
} from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  dayPickerWrapper,
  dayPickerHeading,
} from "../../../playwright/components/date-input/index";

dayjs.extend(advancedFormat);

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const TODAY = dayjs().format("dddd, MMMM Do, YYYY");
const DATE_INPUT = dayjs("2022-05-01").format("DD/MM/YYYY");
const TODAY_DATE_INPUT = dayjs().format("DD/MM/YYYY");
const NEXT_MONTH = dayjs("2022-05-01").add(1, "months").format("MMMM YYYY");
const ACTUAL_MONTH = dayjs("2022-05-01").format("MMMM YYYY");
const PREVIOUS_MONTH = dayjs("2022-05-01")
  .subtract(1, "months")
  .format("MMMM YYYY");
const MIN_DATE = "04/04/2030";
const DAY_BEFORE_MIN_DATE = "Wednesday, April 3rd, 2030";
const DAY_AFTER_MAX_DATE = "Friday, April 5th, 2030";
const arrowKeys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];

test.describe("Functionality tests", () => {
  testData.forEach((fieldHelp) => {
    test(`should check the fieldHelp renders ${fieldHelp}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom fieldHelp={fieldHelp} />);

      const helpPreview = getDataElementByValue(page, "help");
      await expect(helpPreview).toHaveText(fieldHelp);
    });
  });

  testData.forEach((label) => {
    test(`should check the label renders ${label}`, async ({ mount, page }) => {
      await mount(<DateInputCustom label={label} />);

      await expect(getDataElementByValue(page, "label")).toHaveText(label);
    });
  });

  test(`should check the minDate prop`, async ({ mount, page }) => {
    await mount(<DateInputCustom minDate="2030-04-04" />);

    const input = getDataElementByValue(page, "input");
    await input.fill(MIN_DATE);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const dayPicker = page.locator(
      `button[aria-label="${DAY_BEFORE_MIN_DATE}"]`,
    );
    await expect(dayPicker).toHaveAttribute("disabled", "");
  });

  test(`should check the maxDate prop`, async ({ mount, page }) => {
    await mount(<DateInputCustom maxDate="2030-04-04" />);

    const input = getDataElementByValue(page, "input");
    await input.fill(MIN_DATE);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const dayPicker = page.locator(
      `button[aria-label="${DAY_AFTER_MAX_DATE}"]`,
    );
    await expect(dayPicker).toHaveAttribute("disabled", "");
  });

  test(`should check the date is set to today's day`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const dayClass = `rdp-day rdp-today`;
    const input = getDataElementByValue(page, "input");
    await input.fill(TODAY_DATE_INPUT);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const todayButton = page.getByRole("button", { name: `Today, ${TODAY}` });
    const todayCell = page.getByRole("gridcell").filter({
      has: todayButton,
    });

    await expect(todayButton).toBeVisible();
    await containsClass(todayCell, dayClass);
  });

  test(`should not open dayPicker after click on input`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const inputParent = getDataElementByValue(page, "input").locator("..");
    await inputParent.click();

    const wrapper = dayPickerWrapper(page);
    await expect(wrapper).toBeHidden();
  });

  test(`should not close dayPicker after double click on input`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const inputParent = getDataElementByValue(page, "input").locator("..");
    await inputParent.click();
    await inputParent.click();

    const wrapper = dayPickerWrapper(page);
    await expect(wrapper).toBeVisible();
  });

  test(`should open dayPicker after click on icon`, async ({ mount, page }) => {
    await mount(<DateInputCustom />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();
    const wrapper = dayPickerWrapper(page);
    await expect(wrapper).toBeVisible();
  });

  test(`should close dayPicker after click on icon when dayPicker is open`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const calendarIcon = getDataElementByValue(page, "calendar");
    await calendarIcon.click();

    await calendarIcon.click();
    const wrapper = dayPickerWrapper(page);
    await expect(wrapper).toBeHidden();
  });

  [
    ["bottom", 0],
    ["top", 400],
  ].forEach(([position, margin]) => {
    test(`should show Date input at the ${position} position`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom mt={`${margin}px`} />);

      const calendarIcon = page.getByTestId("icon");
      await calendarIcon.click();

      const wrapperParent = dayPickerWrapper(page).locator("..");
      await expect(wrapperParent).toHaveAttribute(
        "data-floating-placement",
        `${position}-start`,
      );
      await expect(wrapperParent).toBeVisible();
    });
  });

  test("should use chevron_right arrow in DayPicker to verify next month is shown", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const input = getDataElementByValue(page, "input");
    await input.fill(DATE_INPUT);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const arrowElement = getDataElementByValue(page, "chevron_right");
    await arrowElement.click();
    const pickerHeading = dayPickerHeading(page);
    await expect(pickerHeading).toHaveText(NEXT_MONTH);
  });

  test("should use chevron_left arrow in DayPicker to verify previous month is shown", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const input = getDataElementByValue(page, "input");
    await input.fill(DATE_INPUT);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const arrowElement = getDataElementByValue(page, "chevron_left");
    await arrowElement.click();
    const pickerHeading = dayPickerHeading(page);
    await expect(pickerHeading).toHaveText(PREVIOUS_MONTH);
  });

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

  test("should change to next month when Enter is pressed and next button is focused", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const arrowParent = getDataElementByValue(page, "chevron_right").locator(
      "..",
    );
    await arrowParent.focus();
    const arrowElement = getDataElementByValue(page, "chevron_right");
    await arrowElement.press("Enter");

    const pickerHeading = dayPickerHeading(page);
    await expect(pickerHeading).toHaveText(NEXT_MONTH);
  });

  test("should change to next month when Space is pressed and next button is focused", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const arrowParent = getDataElementByValue(page, "chevron_right").locator(
      "..",
    );
    await arrowParent.focus();
    const arrowElement = getDataElementByValue(page, "chevron_right");
    await arrowElement.press("Space");

    const pickerHeading = dayPickerHeading(page);
    await expect(pickerHeading).toHaveText(NEXT_MONTH);
  });

  test("should change to previous month when Enter is pressed and previous button is focused", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const arrowParent = getDataElementByValue(page, "chevron_left").locator(
      "..",
    );
    await arrowParent.focus();
    const arrowElement = getDataElementByValue(page, "chevron_left");
    await arrowElement.press("Enter");

    const pickerHeading = dayPickerHeading(page);
    await expect(pickerHeading).toHaveText(PREVIOUS_MONTH);
  });

  test("should change to previous month when Space is pressed and previous button is focused", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const arrowParent = getDataElementByValue(page, "chevron_left").locator(
      "..",
    );
    await arrowParent.focus();
    const arrowElement = getDataElementByValue(page, "chevron_left");
    await arrowElement.press("Space");

    const pickerHeading = dayPickerHeading(page);
    await expect(pickerHeading).toHaveText(PREVIOUS_MONTH);
  });

  test(`when maxWidth has no value it should render as 100%`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom inputWidth={100} maxWidth="" />);

    const inputParent = getDataElementByValue(page, "input")
      .locator("..")
      .locator("..");
    await expect(inputParent).toHaveCSS("max-width", "100%");
  });

  test(`should render Date with disabled prop`, async ({ mount, page }) => {
    await mount(<DateInputCustom disabled />);

    const input = getDataElementByValue(page, "input");
    await expect(input).toBeDisabled();
  });

  test(`should render Date with read only prop`, async ({ mount, page }) => {
    await mount(<DateInputCustom readOnly />);

    const input = getDataElementByValue(page, "input");
    await expect(input).not.toBeEditable();
  });

  test(`should check the pickerProps prop`, async ({ mount, page }) => {
    await mount(<DateInputCustom pickerProps={{ numberOfMonths: 2 }} />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const months = page.locator("div[class=rdp-month]");
    await expect(months).toHaveCount(2);
    const pickerHeading1 = page
      .locator(".rdp-month_caption")
      .locator("span")
      .nth(0);
    await expect(pickerHeading1).toBeVisible();
    await expect(pickerHeading1).toHaveText(ACTUAL_MONTH);
    const pickerHeading2 = page
      .locator(".rdp-month_caption")
      .locator("span")
      .nth(1);
    await expect(pickerHeading2).toBeVisible();
    await expect(pickerHeading2).toHaveText(NEXT_MONTH);
  });

  test(`should check the required prop`, async ({ mount, page }) => {
    await mount(<DateInputCustom required />);

    await verifyRequiredAsteriskForLabel(page);
  });

  test(`should check the autofocus prop`, async ({ mount, page }) => {
    await mount(<DateInputCustom autoFocus />);

    const input = getDataElementByValue(page, "input");
    await expect(input).toBeFocused();
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
        <DateInputCustom disablePortal />
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
        <DateInputCustom disablePortal={false} />
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

  test(`should check accessibility for component with autoFocus prop`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom autoFocus />);

    await checkAccessibility(page);
  });

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

  test(`should check accessibility for component with required prop`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom required />);

    await checkAccessibility(page);
  });

  test(`should check accessibility for component with validation`, async ({
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

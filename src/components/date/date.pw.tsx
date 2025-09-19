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
import { DateInputProps } from ".";
import {
  getDataElementByValue,
  icon,
  tooltipPreview,
} from "../../../playwright/components";
import {
  verifyRequiredAsteriskForLabel,
  assertCssValueIsApproximately,
  checkAccessibility,
  getStyle,
  containsClass,
} from "../../../playwright/support/helper";
import {
  SIZE,
  CHARACTERS,
  VALIDATION,
} from "../../../playwright/support/constants";
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

  (
    [
      ["left", "start"],
      ["right", "end"],
    ] as [DateInputProps["labelAlign"], string][]
  ).forEach(([labelAlign, cssValue]) => {
    test(`should check the label align is set to ${labelAlign}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateInputCustom
          labelAlign={labelAlign}
          labelHelp="labelHelp"
          labelInline
        />,
      );

      const label = getDataElementByValue(page, "label").locator("..");
      await expect(label).toHaveCSS("justify-content", `flex-${cssValue}`);
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

  [
    ["chevron_right", "next"],
    ["chevron_left", "previous"],
  ].forEach(([arrow, month]) => {
    test(`should use ${arrow} arrow in DayPicker to verify ${month} month is shown`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom />);

      const input = getDataElementByValue(page, "input");
      await input.fill(DATE_INPUT);

      const calendarIcon = page.getByTestId("icon");
      await calendarIcon.click();

      const arrowElement = getDataElementByValue(page, arrow);
      await arrowElement.click();
      const pickerHeading = dayPickerHeading(page);
      if (month === "next") {
        await expect(pickerHeading).toHaveText(NEXT_MONTH);
      } else if (month === "previous") {
        await expect(pickerHeading).toHaveText(PREVIOUS_MONTH);
      }
    });
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

  test("closes picker and refocuses input, when escape key is pressed", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const dateInput = page.getByLabel("Date");
    await dateInput.press("Tab");

    const datePicker = page.getByTestId("date-picker");
    await datePicker.waitFor();

    await datePicker.press("Escape");

    await dateInput.waitFor();
    await expect(dateInput).toBeFocused();
    await expect(datePicker).toBeHidden();
  });

  test("closes picker and refocuses input, when shift + tab is pressed on previous month button", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const dateInput = page.getByLabel("Date");
    await dateInput.press("Tab");

    const previousMonthButton = page.getByRole("button", {
      name: "Previous month",
    });
    await previousMonthButton.waitFor();

    await previousMonthButton.press("Shift+Tab");

    const datePicker = page.getByTestId("date-picker");
    await expect(dateInput).toBeFocused();
    await expect(datePicker).toBeHidden();
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

  (
    [
      [SIZE.SMALL, 29, 30.5],
      [SIZE.MEDIUM, 37, 38.5],
      [SIZE.LARGE, 45, 46.5],
    ] as [DateInputProps["size"], number, number][]
  ).forEach(([size, minValue, maxValue]) => {
    test(`should check the ${size} size of the DateInput`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom size={size} />);

      const input = getDataElementByValue(page, "input");
      await input.click();
      const val = await getStyle(input, "height");
      expect(parseInt(val)).toBeGreaterThanOrEqual(minValue);
      expect(parseInt(val)).toBeLessThanOrEqual(maxValue);
    });
  });

  [
    [10, 90, 135, 1229],
    [30, 70, 409, 956],
    [80, 20, 1092, 273],
  ].forEach(([label, input, labelRatio, inputRatio]) => {
    test(`should use ${label} as labelWidth, ${input} as inputWidth and render it with correct label and input width ratios`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateInputCustom labelInline labelWidth={label} inputWidth={input} />,
      );

      const labelElement = getDataElementByValue(page, "label").locator("..");
      await assertCssValueIsApproximately(labelElement, "width", labelRatio);
      const inputElement = getDataElementByValue(page, "input").locator("..");
      await assertCssValueIsApproximately(inputElement, "width", inputRatio);
    });
  });

  ["10%", "30%", "50%", "80%", "100%"].forEach((maxWidth) => {
    test(`should check maxWidth is ${maxWidth} for Date Input component`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom maxWidth={maxWidth} />);

      const inputParent = getDataElementByValue(page, "input")
        .locator("..")
        .locator("..");
      await expect(inputParent).toHaveCSS("max-width", maxWidth);
    });
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

  test(`should render Date icon with disabled style`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom disabled />);

    const calendarIcon = page.getByTestId("icon");
    await expect(calendarIcon).toBeVisible();
    await expect(calendarIcon).toHaveCSS("color", "rgba(0, 0, 0, 0.3)");
  });

  test(`should render Date with read only prop`, async ({ mount, page }) => {
    await mount(<DateInputCustom readOnly />);

    const input = getDataElementByValue(page, "input");
    await expect(input).not.toBeEditable();
  });

  test(`should render Date icon with read only style`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom readOnly />);

    const calendarIcon = page.getByTestId("icon");
    await expect(calendarIcon).toBeVisible();
    await expect(calendarIcon).toHaveCSS("color", "rgba(0, 0, 0, 0.3)");
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

  test(`should have the expected border radius styling`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    const input = getDataElementByValue(page, "input");
    await input.click();
    await expect(input).toHaveCSS("border-radius", "4px");
    const dayPicker1 = page
      .getByLabel("Sunday, May 1st, 2022, selected")
      .locator("..");
    await expect(dayPicker1).toHaveCSS("border-radius", "32px");
    const dayPicker2 = page.getByLabel("Monday, May 2nd, 2022").locator("..");
    await expect(dayPicker2).toHaveCSS("border-radius", "32px");
    const dayPickerNavButton1 = page.getByLabel("Previous month");
    await expect(dayPickerNavButton1).toHaveCSS("border-radius", "4px");
    const dayPickerNavButton2 = page.getByLabel("Next month");
    await expect(dayPickerNavButton2).toHaveCSS("border-radius", "4px");
  });

  test(`should have the expected focus styling`, async ({ mount, page }) => {
    await mount(<DateInputCustom />);

    await page.focus("body");
    await page.keyboard.press("Tab");
    const inputParent = getDataElementByValue(page, "input").locator("..");
    await expect(inputParent).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(inputParent).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );

    const calendarIcon = page.getByTestId("icon");
    await calendarIcon.click();

    await page.keyboard.press("Tab");
    const dayPickerNavButton1 = page.getByLabel("Previous month");
    await dayPickerNavButton1.focus();
    await expect(dayPickerNavButton1).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(dayPickerNavButton1).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );

    await page.keyboard.press("Tab");
    const dayPickerNavButton2 = page.getByLabel("Next month");
    await dayPickerNavButton2.focus();
    await expect(dayPickerNavButton2).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(dayPickerNavButton2).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );

    await page.keyboard.press("Tab");
    const dayPicker1 = page.getByLabel("Sunday, May 1st, 2022").locator("..");
    await dayPicker1.focus();
    await expect(dayPicker1).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset",
    );
    await expect(dayPicker1).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");

    await page.keyboard.press("ArrowRight");
    const dayPicker2 = page.getByLabel("Monday, May 2nd, 2022").locator("..");
    await dayPicker2.focus();
    await expect(dayPicker2).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset",
    );
    await expect(dayPicker2).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");
  });

  (["top", "bottom", "left", "right"] as const).forEach((position) => {
    test(`should check the tooltipPosition is set to ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateInputCustom
          m={9}
          tooltipPosition={position}
          error="Error message"
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

  testData.forEach((label) => {
    test(`should check accessibility with the label renders ${label}`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom label={label} />);

      await checkAccessibility(page);
    });
  });

  (["left", "right"] as DateInputProps["labelAlign"][]).forEach(
    (labelAlign) => {
      test(`should check accessibility with the label align is set to ${labelAlign}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <DateInputCustom
            labelAlign={labelAlign}
            labelHelp="labelHelp"
            labelInline
          />,
        );

        await checkAccessibility(page);
      });
    },
  );

  test(`should check accessibility for component with required prop`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom required />);

    await checkAccessibility(page);
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`should check accessibility for DateInput with ${type} validation icon on label`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateInputCustom
          labelInline
          labelAlign="right"
          validationOnLabel
          {...{ [type]: "Message" }}
        />,
      );

      await checkAccessibility(page);
    });
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`should check accessibility for DateInput with ${type} validation icon`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateInputCustom
          labelInline
          labelAlign="right"
          {...{ [type]: "Message" }}
        />,
      );

      await checkAccessibility(page);
    });
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

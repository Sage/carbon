import React from "react";
import { expect, test } from "@playwright/experimental-ct-react17";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import {
  DateInputCustom,
  DateInputValidationNewDesign,
  DateInputWithButton,
  DateWithLocales,
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
  toBeFocusedDelayed,
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
import { HooksConfig } from "../../../playwright";
import { alertDialogPreview } from "../../../playwright/components/dialog";

dayjs.extend(advancedFormat);

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const DAY_PICKER_PREFIX = "rdp-";
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
const DDMMYYY_DATE_TO_ENTER = "27,05,2022";
const MMDDYYYY_DATE_TO_ENTER = "05,27,2022";
const YYYYMMDD_DATE_TO_ENTER = "2022,05,27";
const DDMMYYY_DATE_TO_ENTER_SHORT = "1,7,22";
const MMDDYYYY_DATE_TO_ENTER_SHORT = "7,1,22";
const YYYYMMDD_DATE_TO_ENTER_SHORT = "22,7,1";
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

    const dayPicker = page.locator(
      `button[aria-label="${DAY_BEFORE_MIN_DATE}"]`,
    );
    await expect(dayPicker).toHaveAttribute("disabled", "");
  });

  test(`should check the maxDate prop`, async ({ mount, page }) => {
    await mount(<DateInputCustom maxDate="2030-04-04" />);

    const input = getDataElementByValue(page, "input");
    await input.fill(MIN_DATE);

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

    const todayButton = page.getByRole("button", { name: `Today, ${TODAY}` });
    const todayCell = page.getByRole("gridcell").filter({
      has: todayButton,
    });

    await expect(todayButton).toBeVisible();
    await containsClass(todayCell, dayClass);
  });

  test(`should open dayPicker after click on input`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const inputParent = getDataElementByValue(page, "input").locator("..");
    await inputParent.click();

    const wrapper = dayPickerWrapper(page);
    await expect(wrapper).toBeVisible();
  });

  test(`should not close dayPicker after double click on input`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const inputParent = getDataElementByValue(page, "input").locator("..");
    await inputParent.click();
    await inputParent.click();

    const wrapper = dayPickerWrapper(page);
    await expect(wrapper).toBeVisible();
  });

  test(`should open dayPicker after click on icon`, async ({ mount, page }) => {
    await mount(<DateInputCustom />);

    const calendarIcon = getDataElementByValue(page, "calendar");
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
    await expect(wrapper).toHaveCount(0);
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

      const inputParent = getDataElementByValue(page, "input").locator("..");
      await inputParent.click();
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
      const inputParent = getDataElementByValue(page, "input").locator("..");
      await inputParent.click();
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
      await mount(<DateInputCustom />);

      const inputParent = getDataElementByValue(page, "input").locator("..");
      await inputParent.click();
      const rightArrow = getDataElementByValue(page, "chevron_right").locator(
        "..",
      );
      await rightArrow.focus();
      await rightArrow.press(key);
      const pickerHeading = dayPickerHeading(page);
      await expect(pickerHeading).toHaveText("May 2022");
    });
  });

  arrowKeys.forEach((key) => {
    test(`should not change the displayed month when ${key} is pressed and previous button is focused`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom />);

      const inputParent = getDataElementByValue(page, "input").locator("..");
      await inputParent.click();
      const rightArrow = getDataElementByValue(page, "chevron_left").locator(
        "..",
      );
      await rightArrow.focus();
      await rightArrow.press(key);
      const pickerHeading = dayPickerHeading(page);
      await expect(pickerHeading).toHaveText("May 2022");
    });
  });

  test(`should allow a user to tab into the picker and through its controls`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom value="12/12/2022" />);

    await page.focus("body");
    await page.keyboard.press("Tab");
    const input = getDataElementByValue(page, "input");
    await expect(input).toBeFocused();
    await page.keyboard.press("Tab");
    const arrowLeft = getDataElementByValue(page, "chevron_left").locator("..");
    await expect(arrowLeft).toBeFocused();
    await page.keyboard.press("Tab");
    const arrowRight = getDataElementByValue(page, "chevron_right").locator(
      "..",
    );
    await expect(arrowRight).toBeFocused();
    await page.keyboard.press("Tab");
    const dayPicker = page.locator(`.rdp-selected`).locator("button");
    await expect(dayPicker).toBeFocused();
  });

  test(`should close the picker and focus the next element in the DOM when focus is on a day element and tab pressed`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputWithButton />);

    await page.focus("body");
    await page.keyboard.press("Tab");
    const input = getDataElementByValue(page, "input");
    await expect(input).toBeFocused();
    await page.keyboard.press("Tab");
    const arrowLeft = getDataElementByValue(page, "chevron_left").locator("..");
    await expect(arrowLeft).toBeFocused();
    await page.keyboard.press("Tab");
    const arrowRight = getDataElementByValue(page, "chevron_right").locator(
      "..",
    );
    await expect(arrowRight).toBeFocused();
    await page.keyboard.press("Tab");
    const dayPicker = page
      .locator(`.${DAY_PICKER_PREFIX}selected`)
      .locator("button");
    await expect(dayPicker).toBeFocused();
    await page.keyboard.press("Tab");
    const wrapper = dayPickerWrapper(page);
    await expect(wrapper).toHaveCount(0);
    const fooButton = page.getByRole("button");
    await expect(fooButton).toBeFocused();
  });

  test(`should focus today's date if no day selected when tabbing to day elements`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom value="" />);

    await page.focus("body");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const dayPicker = page
      .locator(`.${DAY_PICKER_PREFIX}today`)
      .locator("button");
    await toBeFocusedDelayed(dayPicker);
    await page.keyboard.press("Tab");
    const wrapper = dayPickerWrapper(page);
    await expect(wrapper).toHaveCount(0);
  });

  test(`should navigate through the day elements using the arrow keys`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom value="14/04/2022" />);

    await page.focus("body");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press(arrowKeys[3]);
    const focusedElement1 = page
      .locator(`.${DAY_PICKER_PREFIX}focused`)
      .locator("button")
      .filter({ hasText: "21" });
    await toBeFocusedDelayed(focusedElement1);
    await page.keyboard.press(arrowKeys[3]);
    const focusedElement2 = page
      .locator(`.${DAY_PICKER_PREFIX}focused`)
      .locator("button")
      .filter({ hasText: "28" });
    await toBeFocusedDelayed(focusedElement2);

    await page.keyboard.press(arrowKeys[1]);
    const focusedElement3 = page
      .locator(`.${DAY_PICKER_PREFIX}focused`)
      .locator("button")
      .filter({ hasText: "27" });
    await toBeFocusedDelayed(focusedElement3);
    await page.keyboard.press(arrowKeys[1]);
    const focusedElement4 = page
      .locator(`.${DAY_PICKER_PREFIX}focused`)
      .locator("button")
      .filter({ hasText: "26" });
    await toBeFocusedDelayed(focusedElement4);

    await page.keyboard.press(arrowKeys[0]);
    const focusedElement5 = page
      .locator(`.${DAY_PICKER_PREFIX}focused`)
      .locator("button")
      .filter({ hasText: "27" });
    await toBeFocusedDelayed(focusedElement5);
    await page.keyboard.press(arrowKeys[0]);
    const focusedElement6 = page
      .locator(`.${DAY_PICKER_PREFIX}focused`)
      .locator("button")
      .filter({ hasText: "28" });
    await toBeFocusedDelayed(focusedElement6);

    await page.keyboard.press(arrowKeys[2]);
    const focusedElement7 = page
      .locator(`.${DAY_PICKER_PREFIX}focused`)
      .locator("button")
      .filter({ hasText: "21" });
    await toBeFocusedDelayed(focusedElement7);
    await page.keyboard.press(arrowKeys[2]);
    const focusedElement8 = page
      .locator(`.${DAY_PICKER_PREFIX}focused`)
      .locator("button")
      .filter({ hasText: "14" });
    await toBeFocusedDelayed(focusedElement8);
  });

  test(`should navigate to the previous month when left arrow pressed on first day element of a month`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom value="14/04/2022" />);

    await page.focus("body");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press(arrowKeys[1]);
    const focusedElement = page
      .locator(`.${DAY_PICKER_PREFIX}focused`)
      .locator("button")
      .filter({ hasText: "13" });
    await toBeFocusedDelayed(focusedElement);
    const pickerHeading = dayPickerHeading(page);
    await expect(pickerHeading).toHaveText(PREVIOUS_MONTH);
  });

  [
    ["24", "1"],
    ["25", "2"],
    ["26", "3"],
    ["27", "4"],
    ["28", "5"],
    ["29", "6"],
    ["30", "7"],
  ].forEach(([result, day]) => {
    test(`should navigate to day ${result} of previous month when up arrow pressed on day ${day} of first week of current month`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom value={`0${day}/05/2022`} />);

      await page.focus("body");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press(arrowKeys[2]);
      if (day === "1") {
        const focusedElement = page
          .locator(`.${DAY_PICKER_PREFIX}focused`)
          .locator("button")
          .filter({ hasText: result });
        await toBeFocusedDelayed(focusedElement);
      } else {
        const focusedElement = page
          .locator(`.${DAY_PICKER_PREFIX}focused`)
          .locator("button")
          .filter({ hasText: result });
        await toBeFocusedDelayed(focusedElement);
      }
      const pickerHeading = dayPickerHeading(page);
      await expect(pickerHeading).toHaveText(PREVIOUS_MONTH);
    });
  });

  [
    ["7", "31"],
    ["6", "30"],
    ["5", "29"],
    ["4", "28"],
    ["3", "27"],
    ["2", "26"],
    ["1", "25"],
  ].forEach(([result, day]) => {
    test(`should navigate to day ${result} of next month when down arrow pressed on day ${day} of last week of current month`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom value={`${day}/05/2022`} />);

      await page.focus("body");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press(arrowKeys[3]);
      if (day === "30" || day === "31") {
        const focusedElement = page
          .locator(`.${DAY_PICKER_PREFIX}focused`)
          .locator("button")
          .filter({ hasText: result });
        await toBeFocusedDelayed(focusedElement);
      } else {
        const focusedElement = page
          .locator(`.${DAY_PICKER_PREFIX}focused`)
          .locator("button")
          .filter({ hasText: result })
          .filter({ hasNotText: "30" })
          .filter({ hasNotText: "31" });
        await toBeFocusedDelayed(focusedElement);
      }
      const pickerHeading = dayPickerHeading(page);
      await expect(pickerHeading).toHaveText(NEXT_MONTH);
    });
  });

  ["Enter", "Space"].forEach((key) => {
    test(`should update the selected date when ${key} pressed on a day element`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom value="14/04/2022" />);

      await page.focus("body");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press(arrowKeys[1]);
      const focusedElement = page
        .locator(`.${DAY_PICKER_PREFIX}focused`)
        .locator("button")
        .filter({ hasText: "13" });
      await toBeFocusedDelayed(focusedElement);
      await page.keyboard.press(key);
      await expect(getDataElementByValue(page, "input")).toHaveValue(
        "13/04/2022",
      );
    });
  });

  test(`should close the picker when escape is pressed and input focused`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    await page.focus("body");
    await page.keyboard.press("Tab");
    const wrapper = dayPickerWrapper(page);
    await expect(wrapper).toHaveCount(1);
    await page.keyboard.press("Escape");
    await expect(wrapper).toHaveCount(0);
  });

  test(`should close the picker when escape is pressed and focus is within the picker and refocus the input`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    await page.focus("body");
    await page.keyboard.press("Tab");
    const wrapper = dayPickerWrapper(page);
    await expect(wrapper).toHaveCount(1);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Escape");
    await expect(wrapper).toHaveCount(0);
    await expect(getDataElementByValue(page, "input")).toBeFocused();
  });

  test(`should close the picker when shift + tab is pressed and focus is on the previous month button in the picker and refocus the input`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    await page.focus("body");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const wrapper = dayPickerWrapper(page);
    await expect(wrapper).toHaveCount(1);
    await page.keyboard.press("Shift+Tab");
    await expect(wrapper).toHaveCount(0);
    await expect(getDataElementByValue(page, "input")).toBeFocused();
  });

  test(`should navigate to the next month when right arrow pressed on last day element of a month`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom value="31/05/2022" />);

    await page.focus("body");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press(arrowKeys[0]);
    const focusedElement = page
      .locator(`.${DAY_PICKER_PREFIX}focused`)
      .locator("button")
      .filter({ hasText: "1" })
      .filter({ hasNotText: "31" });
    await toBeFocusedDelayed(focusedElement);
    const pickerHeading = dayPickerHeading(page);
    await expect(pickerHeading).toHaveText(NEXT_MONTH);
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

      const inputParent = getDataElementByValue(page, "input").locator("..");
      await inputParent.click();
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

    const calendarIcon = getDataElementByValue(page, "calendar");
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

    const calendarIcon = getDataElementByValue(page, "calendar");
    await expect(calendarIcon).toBeVisible();
    await expect(calendarIcon).toHaveCSS("color", "rgba(0, 0, 0, 0.3)");
  });

  test(`should check the pickerProps prop`, async ({ mount, page }) => {
    await mount(<DateInputCustom pickerProps={{ numberOfMonths: 2 }} />);

    const input = getDataElementByValue(page, "input");
    await input.click();
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
    const wrapper = dayPickerWrapper(page);
    await expect(wrapper).toBeVisible();
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
    const input = page.getByLabel("Date");
    await input.click();
    const datePicker = dayPickerWrapper(page);
    await expect(datePicker).toBeInViewport();
  });

  test(`should have the expected border radius styling`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

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
  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("should not close the Dialog when Datepicker is closed by pressing an escape key", async ({
    mount,
    page,
  }) => {
    await mount(<DateInputInsideDialog />);

    await page.focus("body");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const wrapper = dayPickerWrapper(page);
    const dialogElement = alertDialogPreview(page);
    await expect(wrapper).toHaveCount(1);
    await page.keyboard.press("Tab");
    await page.keyboard.press("Escape");
    await expect(wrapper).toHaveCount(0);
    await expect(getDataElementByValue(page, "input")).toBeFocused();
    await expect(dialogElement).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialogElement).not.toBeVisible();
  });
});

test.describe("Events tests", () => {
  test(`should call onChange callback when a clear event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <DateInputCustom
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    const input = getDataElementByValue(page, "input");
    await input.clear();
    expect(callbackCount).toBe(1);
  });

  test(`should call onChange callback when a type event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <DateInputCustom
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    const input = getDataElementByValue(page, "input");
    await input.fill("1");
    expect(callbackCount).toBe(1);
  });

  (
    [
      ["en-US", "05/12/2022", "enUS"],
      ["en-CA", "05/12/2022", "enCA"],
      ["en-ZA", "12/05/2022", "enZA"],
      ["de", "12.05.2022", "de"],
      ["es-ES", "12/05/2022", "es"],
      ["fr-FR", "12/05/2022", "fr"],
      ["fr-CA", "12/05/2022", "frCA"],
      ["zh-CN", "2022/05/12", "zhCN"],
      ["pl-PL", "12.05.2022", "pl"],
      ["bg-BG", "12.05.2022", "bg"],
      ["zh-HK", "12/05/2022", "zhHK"],
      ["hu-HU", "2022. 05. 12.", "hu"],
      ["fi-FI", "12.05.2022", "fi"],
      ["de-AT", "12.05.2022", "deAT"],
      ["ko-KR", "2022. 05. 12.", "ko"],
      ["ar-EG", "12/05/2022", "arEG"],
      ["hi-HI", "12/05/2022", "hi"],
      ["sl-SI", "12. 05. 2022", "sl"],
      ["lv", "12.05.2022.", "lv"],
    ] as const
  ).forEach(([localeValue, formattedValueParam, dateFnsLocaleKey]) => {
    test(`should use ${localeValue} locale and change the formattedValue to ${formattedValueParam} after selecting date`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount<HooksConfig>(
        <DateWithLocales
          onChange={() => {
            callbackCount += 1;
          }}
        />,
        {
          hooksConfig: { localeName: dateFnsLocaleKey },
        },
      );

      const getDatetoEnter = () => {
        if (["en-US", "en-CA"].includes(localeValue))
          return MMDDYYYY_DATE_TO_ENTER;
        if (["zh-CN", "hu-HU", "ko-KR"].includes(localeValue))
          return YYYYMMDD_DATE_TO_ENTER;
        return DDMMYYY_DATE_TO_ENTER;
      };

      const input = getDataElementByValue(page, "input");
      await input.fill(getDatetoEnter());
      await input.click();

      const pickerByText = page.getByRole("gridcell").filter({ hasText: "12" });
      await pickerByText.click();
      await expect(input).toHaveValue(formattedValueParam);

      expect(callbackCount).toBe(3);
    });
  });

  (
    [
      ["en-US", "05/27/2022", "enUS"],
      ["en-CA", "05/27/2022", "enCA"],
      ["en-ZA", "27/05/2022", "enZA"],
      ["de", "27.05.2022", "de"],
      ["es-ES", "27/05/2022", "es"],
      ["fr-FR", "27/05/2022", "fr"],
      ["fr-CA", "27/05/2022", "frCA"],
      ["zh-CN", "2022/05/27", "zhCN"],
      ["pl-PL", "27.05.2022", "pl"],
      ["bg-BG", "27.05.2022", "bg"],
      ["zh-HK", "27/05/2022", "zhHK"],
      ["hu-HU", "2022. 05. 27.", "hu"],
      ["fi-FI", "27.05.2022", "fi"],
      ["de-AT", "27.05.2022", "deAT"],
      ["ko-KR", "2022. 05. 27.", "ko"],
      ["ar-EG", "27/05/2022", "arEG"],
      ["hi-HI", "27/05/2022", "hi"],
      ["sl-SI", "27. 05. 2022", "sl"],
      ["lv", "27.05.2022.", "lv"],
    ] as const
  ).forEach(([localeValue, formattedValueParam, dateFnsLocaleKey]) => {
    test(`should use ${localeValue} locale and change the formattedValue to ${formattedValueParam} after typing the date`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount<HooksConfig>(
        <DateWithLocales
          onChange={() => {
            callbackCount += 1;
          }}
        />,
        {
          hooksConfig: { localeName: dateFnsLocaleKey },
        },
      );

      const getDatetoEnter = () => {
        if (["en-US", "en-CA"].includes(localeValue))
          return MMDDYYYY_DATE_TO_ENTER;
        if (["zh-CN", "hu-HU", "ko-KR"].includes(localeValue))
          return YYYYMMDD_DATE_TO_ENTER;
        return DDMMYYY_DATE_TO_ENTER;
      };

      const input = getDataElementByValue(page, "input");
      await input.fill(getDatetoEnter());
      await input.blur();
      await expect(input).toHaveValue(formattedValueParam);

      expect(callbackCount).toBe(2);
    });
  });

  (
    [
      ["en-US", "07/01/2022", "enUS"],
      ["en-CA", "07/01/2022", "enCA"],
      ["en-ZA", "01/07/2022", "enZA"],
      ["de", "01.07.2022", "de"],
      ["es-ES", "01/07/2022", "es"],
      ["fr-FR", "01/07/2022", "fr"],
      ["fr-CA", "01/07/2022", "frCA"],
      ["zh-CN", "2022/07/01", "zhCN"],
      ["pl-PL", "01.07.2022", "pl"],
      ["bg-BG", "01.07.2022", "bg"],
      ["zh-HK", "01/07/2022", "zhHK"],
      ["hu-HU", "2022. 07. 01.", "hu"],
      ["fi-FI", "01.07.2022", "fi"],
      ["de-AT", "01.07.2022", "deAT"],
      ["ko-KR", "2022. 07. 01.", "ko"],
      ["ar-EG", "01/07/2022", "arEG"],
      ["hi-HI", "01/07/2022", "hi"],
      ["sl-SI", "01. 07. 2022", "sl"],
      ["lv", "01.07.2022.", "lv"],
    ] as const
  ).forEach(([localeValue, formattedValueParam, dateFnsLocaleKey]) => {
    test(`should use ${localeValue} locale and change the formattedValue to ${formattedValueParam} after typing short date`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount<HooksConfig>(
        <DateWithLocales
          onChange={() => {
            callbackCount += 1;
          }}
        />,
        {
          hooksConfig: { localeName: dateFnsLocaleKey },
        },
      );

      const getDatetoEnter = () => {
        if (["en-US", "en-CA"].includes(localeValue))
          return MMDDYYYY_DATE_TO_ENTER_SHORT;
        if (["zh-CN", "hu-HU", "ko-KR"].includes(localeValue))
          return YYYYMMDD_DATE_TO_ENTER_SHORT;
        return DDMMYYY_DATE_TO_ENTER_SHORT;
      };

      const input = getDataElementByValue(page, "input");
      await input.fill(getDatetoEnter());
      await input.blur();
      await expect(input).toHaveValue(formattedValueParam);

      expect(callbackCount).toBe(2);
    });
  });

  test(`should call onBlur callback when a blur event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <DateInputCustom
        onBlur={() => {
          callbackCount += 1;
        }}
      />,
    );

    const input = getDataElementByValue(page, "input");
    await input.clear();
    await input.blur();
    expect(callbackCount).toBe(1);
  });

  test(`should call the onBlur callback using allowEmptyValue prop and output an empty and not null rawValue`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;

    await mount(
      <DateInputCustom
        onBlur={() => {
          callbackCount += 1;
        }}
        allowEmptyValue
      />,
    );

    const input = getDataElementByValue(page, "input");
    await input.clear();
    await input.blur();
    await expect(input).toHaveAttribute("value", "");
    expect(callbackCount).toBe(1);
  });

  test(`should call the onChange callback using allowEmptyValue prop and output an empty and not null rawValue`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;

    await mount(
      <DateInputCustom
        onChange={() => {
          callbackCount += 1;
        }}
        allowEmptyValue
      />,
    );

    const input = getDataElementByValue(page, "input");
    await input.fill(MIN_DATE);
    await input.clear();
    await expect(input).toHaveAttribute("Value", "");
    expect(callbackCount).toBe(2);
  });
});

test.describe("Accessibility tests", () => {
  test(`should check accessibility for the default component`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    await checkAccessibility(page);
  });

  ([SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE] as DateInputProps["size"][]).forEach(
    (size) => {
      test(`should check accessibility with size set to ${size}`, async ({
        mount,
        page,
      }) => {
        await mount(<DateInputCustom size={size} />);

        const calendarIcon = getDataElementByValue(page, "calendar");
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

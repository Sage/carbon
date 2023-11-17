import React from "react";
import { expect, test } from "@playwright/experimental-ct-react17";
import dayjs from "dayjs";
import Confirm from "../confirm";
import {
  DateInputCustom,
  DateInputValidationNewDesign,
  DateInputWithButton,
} from "./components.test-pw";
import { DateInputProps } from ".";
import {
  enUS,
  zhCN,
  de,
  hu,
  bg,
  enCA,
  enZA,
  zhHK,
  fi,
  es,
  fr,
  frCA,
  pl,
  hi,
  deAT,
  ko,
  arEG,
  sl,
  lv,
} from "../../locales/date-fns-locales";
import sageTheme from "../../style/themes/sage/index";
import {
  dateInput,
  dayPickerDay,
  dayPickerWrapper,
  dateIcon,
  dateInputParent,
  dayPickerParent,
  dayPickerHeading,
  dayPickerByText,
  dayPickerNavButtons,
} from "../../../playwright/components/date-input";
import {
  getDataElementByValue,
  fieldHelpPreview,
} from "../../../playwright/components";
import {
  verifyRequiredAsteriskForLabel,
  assertCssValueIsApproximately,
  checkGoldenOutline,
  keyCode,
  checkAccessibility,
  isInViewport,
} from "../../../playwright/support/helper";
import {
  SIZE,
  CHARACTERS,
  VALIDATION,
} from "../../../playwright/support/constants";
import { HooksConfig } from "../../../playwright";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const DAY_PICKER_PREFIX = "DayPicker-Day--";
const TODAY = dayjs().format("ddd D MMM YYYY");
const DATE_INPUT = dayjs("2022-05-01").format("DD/MM/YYYY");
const TODAY_DATE_INPUT = dayjs().format("DD/MM/YYYY");
const NEXT_MONTH = dayjs("2022-05-01").add(1, "months").format("MMMM YYYY");
const ACTUAL_MONTH = dayjs("2022-05-01").format("MMMM YYYY");
const PREVIOUS_MONTH = dayjs("2022-05-01")
  .subtract(1, "months")
  .format("MMMM YYYY");
const MIN_DATE = "04/04/2030";
const DAY_BEFORE_MIN_DATE = "Wed 3 Apr 2030";
const DAY_AFTER_MAX_DATE = "Fri 5 Apr 2030";
const DDMMYYY_DATE_TO_ENTER = "27,05,2022";
const MMDDYYYY_DATE_TO_ENTER = "05,27,2022";
const YYYYMMDD_DATE_TO_ENTER = "2022,05,27";
const DDMMYYY_DATE_TO_ENTER_SHORT = "1,7,22";
const MMDDYYYY_DATE_TO_ENTER_SHORT = "7,1,22";
const YYYYMMDD_DATE_TO_ENTER_SHORT = "22,7,1";
const DATE_TO_VERIFY = "2022-05-12";
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

  ([
    ["left", "start"],
    ["right", "end"],
  ] as [DateInputProps["labelAlign"], string][]).forEach(
    ([labelAlign, cssValue]) => {
      test(`should check the label align is set to ${labelAlign}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <DateInputCustom
            labelAlign={labelAlign}
            labelHelp="labelHelp"
            labelInline
          />
        );

        const label = getDataElementByValue(page, "label").locator("..");
        await expect(label).toHaveCSS("justify-content", `flex-${cssValue}`);
      });
    }
  );

  test(`should check the minDate prop`, async ({ mount, page }) => {
    await mount(<DateInputCustom minDate="2030-04-04" />);

    const input = getDataElementByValue(page, "input");
    await input.clear();
    await input.fill(MIN_DATE);

    const dayPicker = page
      .getByRole("row")
      .locator(`div[aria-label="${DAY_BEFORE_MIN_DATE}"]`);
    await expect(dayPicker).toHaveAttribute("aria-disabled", "true");
    await expect(dayPicker).toHaveAttribute("aria-selected", "false");
  });

  test(`should check the maxDate prop`, async ({ mount, page }) => {
    await mount(<DateInputCustom maxDate="2030-04-04" />);

    const input = getDataElementByValue(page, "input");
    await input.clear();
    await input.fill(MIN_DATE);

    const dayPicker = page
      .getByRole("row")
      .locator(`div[aria-label="${DAY_AFTER_MAX_DATE}"]`);
    await expect(dayPicker).toHaveAttribute("aria-disabled", "true");
    await expect(dayPicker).toHaveAttribute("aria-selected", "false");
  });

  test(`should check the date is set to today's day`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const dayClass = `DayPicker-Day ${DAY_PICKER_PREFIX}selected ${DAY_PICKER_PREFIX}today`;
    const input = getDataElementByValue(page, "input");
    await input.clear();
    await input.fill(TODAY_DATE_INPUT);

    const dayPicker = page
      .getByRole("row")
      .locator(`div[aria-label="${TODAY}"]`);
    await expect(dayPicker).toHaveAttribute("aria-label", TODAY);
    await expect(dayPicker).toHaveAttribute("class", dayClass);
  });

  test(`should open dayPicker after click on input`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const inputParent = getDataElementByValue(page, "input").locator("..");
    await inputParent.click();

    const wrapper = page.locator('div[class="DayPicker-wrapper"]');
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

    const wrapper = page.locator('div[class="DayPicker-wrapper"]');
    await expect(wrapper).toBeVisible();
  });

  test(`should open dayPicker after click on icon`, async ({ mount, page }) => {
    await mount(<DateInputCustom />);

    const calendarIcon = getDataElementByValue(page, "calendar");
    await calendarIcon.click();
    const wrapper = page.locator('div[class="DayPicker-wrapper"]');
    await expect(wrapper).toBeVisible();
  });

  test(`should close dayPicker after click on icon and dayPicker is open`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const calendarIcon = getDataElementByValue(page, "calendar");
    await calendarIcon.click();
    await calendarIcon.click();
    const wrapper = page.locator('div[class="DayPicker-wrapper"]');
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
      const wrapperParent = page
        .locator('div[class="DayPicker-wrapper"]')
        .locator("..")
        .locator("..");
      await expect(wrapperParent).toHaveAttribute(
        "data-floating-placement",
        `${position}-start`
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
      await input.clear();
      await input.fill(DATE_INPUT);
      const inputParent = getDataElementByValue(page, "input").locator("..");
      await inputParent.click();
      const arrowElement = getDataElementByValue(page, arrow);
      await arrowElement.click();
      const pickerHeading = page.locator(".DayPicker-Caption").locator("div");
      if (month === "next") {
        await expect(pickerHeading).toHaveText(NEXT_MONTH);
      } else if (month === "previous") {
        await expect(pickerHeading).toHaveText(PREVIOUS_MONTH);
      } else {
        throw new Error("Only Next or Previous month can be applied");
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
        ".."
      );
      await rightArrow.focus();
      await rightArrow.press(key);
      const pickerHeading = page.locator(".DayPicker-Caption").locator("div");
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
        ".."
      );
      await rightArrow.focus();
      await rightArrow.press(key);
      const pickerHeading = page.locator(".DayPicker-Caption").locator("div");
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
      ".."
    );
    await expect(arrowRight).toBeFocused();
    await page.keyboard.press("Tab");
    const dayPicker = page.locator(".DayPicker-Day--selected");
    await expect(dayPicker).toBeFocused();
  });

  test(`should close the picker and focus the next element in the DOM when focus is on a day element and tab pressed`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputWithButton />);

    await page.focus("body");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    const wrapper = page.locator('div[class="DayPicker-wrapper"]');
    await expect(wrapper).toHaveCount(0);
    const fooButton = page.locator('[data-element="foo-button"]');
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
    const dayPicker = page.locator(".DayPicker-Day--today");
    await expect(dayPicker).toBeFocused();
    await page.keyboard.press("Tab");
    const wrapper = page.locator('div[class="DayPicker-wrapper"]');
    await expect(wrapper).toHaveCount(0);
  });

  test(`should navigate through the day elements using the arrow keys`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    await page.focus("body");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press(arrowKeys[3]);
    const focusedElement1 = page
      .getByRole("row")
      .nth(2)
      .locator("div")
      .filter({ hasText: "8" });
    await expect(focusedElement1).toBeFocused();
    await page.keyboard.press(arrowKeys[3]);
    const focusedElement2 = page
      .getByRole("row")
      .nth(3)
      .locator("div")
      .filter({ hasText: "15" });
    await expect(focusedElement2).toBeFocused();

    await page.keyboard.press(arrowKeys[1]);
    const focusedElement3 = page
      .getByRole("row")
      .nth(3)
      .locator("div")
      .filter({ hasText: "14" });
    await expect(focusedElement3).toBeFocused();
    await page.keyboard.press(arrowKeys[1]);
    const focusedElement4 = page
      .getByRole("row")
      .nth(3)
      .locator("div")
      .filter({ hasText: "13" });
    await expect(focusedElement4).toBeFocused();

    await page.keyboard.press(arrowKeys[0]);
    const focusedElement5 = page
      .getByRole("row")
      .nth(3)
      .locator("div")
      .filter({ hasText: "14" });
    await expect(focusedElement5).toBeFocused();
    await page.keyboard.press(arrowKeys[0]);
    const focusedElement6 = page
      .getByRole("row")
      .nth(3)
      .locator("div")
      .filter({ hasText: "15" });
    await expect(focusedElement6).toBeFocused();

    await page.keyboard.press(arrowKeys[2]);
    const focusedElement7 = page
      .getByRole("row")
      .nth(2)
      .locator("div")
      .filter({ hasText: "8" });
    await expect(focusedElement7).toBeFocused();
    await page.keyboard.press(arrowKeys[2]);
    const focusedElement8 = page
      .getByRole("row")
      .nth(1)
      .locator("div")
      .filter({ hasText: "1" });
    await expect(focusedElement8).toBeFocused();
  });

  test(`should navigate to the previous month when left arrow pressed on first day element of a month`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    await page.focus("body");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press(arrowKeys[1]);
    const focusedElement = page
      .getByRole("row")
      .nth(5)
      .locator("div")
      .filter({ hasText: "30" });
    await expect(focusedElement).toBeFocused();
    const pickerHeading = page.locator(".DayPicker-Caption").locator("div");
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
  ].forEach(([result, input]) => {
    test(`should navigate to day ${result} of previous month when up arrow pressed on day ${input} of first week of current month`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom value={`0${input}/05/2022`} />);

      await page.focus("body");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press(arrowKeys[2]);
      if (input === "1") {
        const focusedElement = page
          .getByRole("row")
          .nth(4)
          .locator("div")
          .filter({ hasText: result });
        await expect(focusedElement).toBeFocused();
      } else {
        const focusedElement = page
          .getByRole("row")
          .nth(5)
          .locator("div")
          .filter({ hasText: result });
        await expect(focusedElement).toBeFocused();
      }
      const pickerHeading = page.locator(".DayPicker-Caption").locator("div");
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
  ].forEach(([result, input]) => {
    test(`should navigate to day ${result} of next month when down arrow pressed on day ${input} of last week of current month`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom value={`${input}/05/2022`} />);

      await page.focus("body");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press(arrowKeys[3]);
      if (input === "30" || input === "31") {
        const focusedElement = page
          .getByRole("row")
          .nth(2)
          .locator("div")
          .filter({ hasText: result });
        await expect(focusedElement).toBeFocused();
      } else {
        const focusedElement = page
          .getByRole("row")
          .nth(1)
          .locator("div")
          .filter({ hasText: result })
          .filter({ hasNotText: "30" })
          .filter({ hasNotText: "31" });
        await expect(focusedElement).toBeFocused();
      }
      const pickerHeading = page.locator(".DayPicker-Caption").locator("div");
      await expect(pickerHeading).toHaveText(NEXT_MONTH);
    });
  });

  ["Enter", "Space"].forEach((key) => {
    test(`should update the selected date when ${key} pressed on a day element`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom />);

      await page.focus("body");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press("Tab");
      await page.keyboard.press(arrowKeys[1]);
      const focusedElement = page
        .getByRole("row")
        .nth(5)
        .locator("div")
        .filter({ hasText: "30" });
      await expect(focusedElement).toBeFocused();
      await page.keyboard.press(key);
      await expect(getDataElementByValue(page, "input")).toHaveValue(
        "30/04/2022"
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
    const wrapper = page.locator('div[class="DayPicker-wrapper"]');
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
    const wrapper = page.locator('div[class="DayPicker-wrapper"]');
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
    const wrapper = page.locator('div[class="DayPicker-wrapper"]');
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
      .getByRole("row")
      .nth(1)
      .locator("div")
      .filter({ hasText: "1" })
      .filter({ hasNotText: "31" });
    await expect(focusedElement).toBeFocused();
    const pickerHeading = page.locator(".DayPicker-Caption").locator("div");
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

      const pickerHeading = page.locator(".DayPicker-Caption").locator("div");
      if (month === "next") {
        await expect(pickerHeading).toHaveText(NEXT_MONTH);
      } else if (month === "previous") {
        await expect(pickerHeading).toHaveText(PREVIOUS_MONTH);
      }
    });
  });

  ([
    [SIZE.SMALL, 30],
    [SIZE.MEDIUM, 38],
    [SIZE.LARGE, 46],
  ] as [DateInputProps["size"], number][]).forEach(([size, approxValue]) => {
    test(`should check the ${size} of the DateInput`, async ({
      mount,
      page,
    }) => {
      await mount(<DateInputCustom size={size} />);

      const inputParent = getDataElementByValue(page, "input").locator("..");
      await inputParent.click();
      await inputParent.waitFor();
      await assertCssValueIsApproximately(inputParent, "height", approxValue);
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
        <DateInputCustom labelInline labelWidth={label} inputWidth={input} />
      );

      const labelElement = getDataElementByValue(page, "label").locator("..");
      await assertCssValueIsApproximately(labelElement, "width", labelRatio);
      const inputElement = getDataElementByValue(page, "input").locator("..");
      await assertCssValueIsApproximately(inputElement, "width", inputRatio);
    });
  });

  ["10%", "30%", "50%", "80%", "100%"].forEach((maxWidth) => {
    test(`should check maxWidth as ${maxWidth} for Date Input component`, async ({
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
    await expect(input).toHaveAttribute("readonly", /.*/);
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
    const months = page.locator("div[class=DayPicker-Month]");
    await expect(months).toHaveCount(2);
    const pickerHeading1 = page
      .locator(".DayPicker-Caption")
      .locator("div")
      .nth(0);
    await expect(pickerHeading1).toBeVisible();
    await expect(pickerHeading1).toHaveText(ACTUAL_MONTH);
    const pickerHeading2 = page
      .locator(".DayPicker-Caption")
      .locator("div")
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
    const wrapper = page.locator('div[class="DayPicker-wrapper"]');
    await expect(wrapper).toBeVisible();
  });

  [true, false].forEach((state) => {
    test(`should render with disablePortal prop ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Confirm open height="60px" onConfirm={() => {}}>
          <DateInputCustom disablePortal={state} />
        </Confirm>
      );

      const input = getDataElementByValue(page, "input");
      await input.click();
      const wrapper = page.locator('div[class="DayPicker-wrapper"]');
      if (state) {
        await expect(wrapper).not.toBeInViewport();
      } else {
        await expect(wrapper).toBeInViewport();
      }
    });
  });

  test(`should have the expected border radius styling`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    const input = getDataElementByValue(page, "input");
    await input.click();
    await expect(input).toHaveCSS("border-radius", "4px");
    const dayPicker1 = page.getByLabel("Sun 1 May 2022");
    await expect(dayPicker1).toHaveCSS("border-radius", "32px");
    const dayPicker2 = page.getByLabel("Mon 2 May 2022");
    await expect(dayPicker2).toHaveCSS("border-radius", "32px");
    const dayPickerNavButton1 = page.getByLabel("Previous month");
    await expect(dayPickerNavButton1).toHaveCSS("border-radius", "4px");
    const dayPickerNavButton2 = page.getByLabel("Next month");
    await expect(dayPickerNavButton2).toHaveCSS("border-radius", "4px");
  });

  test(`should have the expected styling when opt out flag is true`, async ({
    mount,
    page,
  }) => {
    await mount<HooksConfig>(<DateInputCustom />, {
      hooksConfig: { focusRedesignOptOut: true },
    });

    await page.focus("body");
    await page.keyboard.press("Tab");
    const inputParent = getDataElementByValue(page, "input").locator("..");
    await checkGoldenOutline(inputParent);
    const dayPicker1 = page.getByLabel("Sun 1 May 2022");
    await dayPicker1.focus();
    await checkGoldenOutline(dayPicker1);
    const dayPicker2 = page.getByLabel("Mon 2 May 2022");
    await dayPicker2.focus();
    await checkGoldenOutline(dayPicker2);
    const dayPickerNavButton1 = page.getByLabel("Previous month");
    await dayPickerNavButton1.focus();
    await checkGoldenOutline(dayPickerNavButton1);
    const dayPickerNavButton2 = page.getByLabel("Next month");
    await dayPickerNavButton2.focus();
    await checkGoldenOutline(dayPickerNavButton2);
  });

  test(`should have the expected styling when opt out flag is false`, async ({
    mount,
    page,
  }) => {
    await mount(<DateInputCustom />);

    await page.focus("body");
    await page.keyboard.press("Tab");
    const wrapperParent = page
      .locator('div[class="DayPicker-wrapper"]')
      .locator("..")
      .locator("..");
    await expect(wrapperParent).toHaveCSS("margin-top", "4px");
    const inputParent = getDataElementByValue(page, "input").locator("..");
    await expect(inputParent).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    await expect(inputParent).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px"
    );
    const dayPicker1 = page.getByLabel("Sun 1 May 2022");
    await dayPicker1.focus();
    await expect(dayPicker1).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset"
    );
    await expect(dayPicker1).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");
    const dayPicker2 = page.getByLabel("Mon 2 May 2022");
    await dayPicker2.focus();
    await expect(dayPicker2).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset"
    );
    await expect(dayPicker2).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");
    const dayPickerNavButton1 = page.getByLabel("Previous month");
    await dayPickerNavButton1.focus();
    await expect(dayPickerNavButton1).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    await expect(dayPickerNavButton1).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px"
    );
    const dayPickerNavButton2 = page.getByLabel("Next month");
    await dayPickerNavButton2.focus();
    await expect(dayPickerNavButton2).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
    );
    await expect(dayPickerNavButton2).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px"
    );
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
      />
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
      />
    );

    const input = getDataElementByValue(page, "input");
    await input.fill("1");
    expect(callbackCount).toBe(1);
  });

  [
    ["en-US", "05/12/2022", enUS],
    ["en-CA", "05/12/2022", enCA],
    ["en-ZA", "12/05/2022", enZA],
    ["de", "12.05.2022", de],
    ["es-ES", "12/05/2022", es],
    ["fr-FR", "12/05/2022", fr],
    ["fr-CA", "12/05/2022", frCA],
    ["zh-CN", "2022/05/12", zhCN],
    ["pl-PL", "12.05.2022", pl],
    ["bg-BG", "12.05.2022", bg],
    ["zh-HK", "12/05/2022", zhHK],
    ["hu-HU", "2022. 05. 12.", hu],
    ["fi-FI", "12.05.2022", fi],
    ["de-AT", "12.05.2022", deAT],
    ["ko-KR", "2022. 05. 12.", ko],
    ["ar-EG", "12/05/2022", arEG],
    ["hi-HI", "12/05/2022", hi],
    ["sl-SI", "12. 05. 2022", sl],
    ["lv", "12.05.2022.", lv],
  ].forEach((localeValue, formattedValueParam, dateFnsLocaleValue) => {
    test(`should use ${localeValue} locale and change the formattedValue to ${formattedValueParam} after selecting date`, async ({
      mount,
      page,
    }) => {
      // const callback: DateInputProps["onChange"] = cy.stub().as("onChange");
      // await mount(
      //   <DateInputCustom onChange={callback} />,
      //   sageTheme,
      //   {
      //     locale: () => localeValue,
      //     date: {
      //       dateFnsLocale: () => dateFnsLocaleValue,
      //       ariaLabels: {
      //         previousMonthButton: () => "Previous month",
      //         nextMonthButton: () => "Next month",
      //       },
      //     },
      //   }
      // );
      // const getDatetoEnter = () => {
      //   if (["en-US", "en-CA"].includes(localeValue))
      //     return MMDDYYYY_DATE_TO_ENTER;
      //   if (["zh-CN", "hu-HU", "ko-KR"].includes(localeValue))
      //     return YYYYMMDD_DATE_TO_ENTER;
      //   return DDMMYYY_DATE_TO_ENTER;
      // };
      // dateInput().clear().type(getDatetoEnter(), { delay: 0 });
      // dateInput().click();
      // dayPickerByText("12").click();
      // dateInput()
      //   .wait(250)
      //   .should("have.attr", "value", formattedValueParam)
      //   .then(() => {
      //     cy.get("@onChange")
      //       .invoke("getCalls")
      //       .its("12")
      //       .its("args[0].target.value.rawValue")
      //       .should("equal", DATE_TO_VERIFY);
      //     cy.get("@onChange")
      //       .invoke("getCalls")
      //       .its("12")
      //       .its("args[0].target.value.formattedValue")
      //       .should("equal", formattedValueParam);
      //   });
    });
  });

  [
    ["en-US", "05/27/2022", enUS],
    ["en-CA", "05/27/2022", enCA],
    ["en-ZA", "27/05/2022", enZA],
    ["de", "27.05.2022", de],
    ["es-ES", "27/05/2022", es],
    ["fr-FR", "27/05/2022", fr],
    ["fr-CA", "27/05/2022", frCA],
    ["zh-CN", "2022/05/27", zhCN],
    ["pl-PL", "27.05.2022", pl],
    ["bg-BG", "27.05.2022", bg],
    ["zh-HK", "27/05/2022", zhHK],
    ["hu-HU", "2022. 05. 27.", hu],
    ["fi-FI", "27.05.2022", fi],
    ["de-AT", "27.05.2022", deAT],
    ["ko-KR", "2022. 05. 27.", ko],
    ["ar-EG", "27/05/2022", arEG],
    ["hi-HI", "27/05/2022", hi],
    ["sl-SI", "27. 05. 2022", sl],
    ["lv", "27.05.2022.", lv],
  ].forEach((localeValue, formattedValueParam, dateFnsLocaleValue) => {
    test(`should use ${localeValue} locale and change the formattedValue to ${formattedValueParam} after type the date`, async ({
      mount,
      page,
    }) => {
      // const callback: DateInputProps["onChange"] = cy.stub().as("onChange");
      // await mount(
      //   <DateInputCustom onChange={callback} />,
      //   sageTheme,
      //   {
      //     locale: () => localeValue,
      //     date: {
      //       dateFnsLocale: () => dateFnsLocaleValue,
      //       ariaLabels: {
      //         previousMonthButton: () => "Previous month",
      //         nextMonthButton: () => "Next month",
      //       },
      //     },
      //   }
      // );
      // const getDatetoEnter = () => {
      //   if (["en-US", "en-CA"].includes(localeValue))
      //     return MMDDYYYY_DATE_TO_ENTER;
      //   if (["zh-CN", "hu-HU", "ko-KR"].includes(localeValue))
      //     return YYYYMMDD_DATE_TO_ENTER;
      //   return DDMMYYY_DATE_TO_ENTER;
      // };
      // dateInput().clear().type(getDatetoEnter(), { delay: 0 });
      // dateInput().blur();
      // dateInput()
      //   .wait(250)
      //   .should("have.attr", "value", formattedValueParam)
      //   .then(() => {
      //     cy.get("@onChange")
      //       .invoke("getCalls")
      //       .its("11")
      //       .its("args[0].target.value.rawValue")
      //       .should("equal", "2022-05-27");
      //     cy.get("@onChange")
      //       .invoke("getCalls")
      //       .its("11")
      //       .its("args[0].target.value.formattedValue")
      //       .should("equal", formattedValueParam);
      //   });
    });
  });

  [
    ["en-US", "07/01/2022", enUS],
    ["en-CA", "07/01/2022", enCA],
    ["en-ZA", "01/07/2022", enZA],
    ["de", "01.07.2022", de],
    ["es-ES", "01/07/2022", es],
    ["fr-FR", "01/07/2022", fr],
    ["fr-CA", "01/07/2022", frCA],
    ["zh-CN", "2022/07/01", zhCN],
    ["pl-PL", "01.07.2022", pl],
    ["bg-BG", "01.07.2022", bg],
    ["zh-HK", "01/07/2022", zhHK],
    ["hu-HU", "2022. 07. 01.", hu],
    ["fi-FI", "01.07.2022", fi],
    ["de-AT", "01.07.2022", deAT],
    ["ko-KR", "2022. 07. 01.", ko],
    ["ar-EG", "01/07/2022", arEG],
    ["hi-HI", "01/07/2022", hi],
    ["sl-SI", "01. 07. 2022", sl],
    ["lv", "01.07.2022.", lv],
  ].forEach((localeValue, formattedValueParam, dateFnsLocaleValue) => {
    test(`should use ${localeValue} locale and change the formattedValue to ${formattedValueParam} after typing short date`, async ({
      mount,
      page,
    }) => {
      // const callback: DateInputProps["onChange"] = cy.stub().as("onChange");
      // await mount(
      //   <DateInputCustom onChange={callback} />,
      //   sageTheme,
      //   {
      //     locale: () => localeValue,
      //     date: {
      //       dateFnsLocale: () => dateFnsLocaleValue,
      //       ariaLabels: {
      //         previousMonthButton: () => "Previous month",
      //         nextMonthButton: () => "Next month",
      //       },
      //     },
      //   }
      // );
      // const getDatetoEnter = () => {
      //   if (["en-US", "en-CA"].includes(localeValue))
      //     return MMDDYYYY_DATE_TO_ENTER_SHORT;
      //   if (["zh-CN", "hu-HU", "ko-KR"].includes(localeValue))
      //     return YYYYMMDD_DATE_TO_ENTER_SHORT;
      //   return DDMMYYY_DATE_TO_ENTER_SHORT;
      // };
      // dateInput().clear().type(getDatetoEnter(), { delay: 0 });
      // dateInput().blur();
      // dateInput()
      //   .wait(250)
      //   .should("have.attr", "value", formattedValueParam)
      //   .then(() => {
      //     cy.get("@onChange")
      //       .invoke("getCalls")
      //       .its("7")
      //       .its("args[0].target.value.rawValue")
      //       .should("equal", "2022-07-01");
      //     cy.get("@onChange")
      //       .invoke("getCalls")
      //       .its("7")
      //       .its("args[0].target.value.formattedValue")
      //       .should("equal", formattedValueParam);
      //   });
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
      />
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
      />
    );

    const input = getDataElementByValue(page, "input");
    await input.clear();
    await input.blur();

    // cy.get("@onBlur")
    //   .invoke("getCalls")
    //   .its("0")
    //   .its("args[0].target.value.rawValue")
    //   .should("equal", "")
    //   .and("not.equal", null);

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
        onBlur={() => {
          callbackCount += 1;
        }}
        allowEmptyValue
      />
    );

    const input = getDataElementByValue(page, "input");
    await input.fill(MIN_DATE);
    // dateInput().type(MIN_DATE, { delay: 0 });
    // dateInput().clear();

    // cy.get("@onBlur")
    //   .invoke("getCalls")
    //   .its("10")
    //   .its("args[0].target.value.rawValue")
    //   .should("equal", "")
    //   .and("not.equal", null);
    await expect(input).toHaveAttribute("value", "");
    expect(callbackCount).toBe(1);
  });
});

test.describe("Accessibility tests", () => {
  test(`should check accessibility the default component`, async ({
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
    }
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
          />
        );

        await checkAccessibility(page);
      });
    }
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
        />
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
        />
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
        <DateInputCustom labelInline labelAlign="right" {...{ [type]: bool }} />
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

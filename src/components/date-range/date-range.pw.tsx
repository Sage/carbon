import React from "react";
import type { Page } from "@playwright/test";
import { test, expect } from "../../../playwright/helpers/base-test";
import { CHARACTERS } from "../../../playwright/support/constants";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  DateRangeCombined,
  DateRangeCombinedInForm,
  DateRangeCustom,
  DateRangeNewValidation,
  DateRangeSizes,
} from "./components.test-pw";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS] as const;

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

test.describe("Standard size", () => {
  test("applies the top-level size to both inputs", async ({ mount, page }) => {
    await mount(<DateRangeSizes />);

    for (const [size, height] of [
      ["small", 32],
      ["large", 48],
    ] as const) {
      const range = page.getByTestId(`date-range-${size}`);
      for (const name of ["Start", "End"]) {
        const box = await range
          .getByRole("textbox", { name })
          .locator("xpath=ancestor::*[@data-role='input-container'][1]")
          .boundingBox();
        expect(box?.height).toBe(height);
      }
    }
  });

  test("positions the picker below the active input", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCustom />);

    const startInput = page.locator('[data-element="start-date"]');
    const inputContainer = startInput.locator('[data-role="input-container"]');
    await startInput.getByRole("button", { name: "Open calendar" }).click();

    const [inputBox, pickerBox] = await Promise.all([
      inputContainer.boundingBox(),
      page.getByRole("dialog").boundingBox(),
    ]);
    expect(pickerBox?.x).toBe(inputBox?.x);
    expect(pickerBox?.y).toBeGreaterThanOrEqual(
      (inputBox?.y ?? 0) + (inputBox?.height ?? 0),
    );
  });
});

test.describe("Standard read-only", () => {
  // Single-input read-only behaviour is covered by DateInput; this checks the pair.
  test("tabs from the start input to the end input, skipping the start calendar button", async ({
    mount,
    page,
  }) => {
    await mount(
      <DateRangeCustom
        startDateProps={{ readOnly: true }}
        endDateProps={{ readOnly: true }}
      />,
    );

    await page.getByRole("textbox", { name: "start label" }).focus();
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("textbox", { name: "end label" }),
    ).toBeFocused();

    await checkAccessibility(page);
  });
});

test.describe("Combined date range", () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.setFixedTime(new Date(2025, 6, 10, 12));
  });

  const trigger = (page: Page) =>
    page.getByRole("combobox", { name: /^Date range/ });
  const day = (page: Page, name: RegExp) => page.getByRole("button", { name });

  (
    [
      ["small", 32],
      ["medium", 40],
      ["large", 48],
    ] as const
  ).forEach(([size, height]) => {
    test(`matches the DateInput height and keeps its width when the value changes at ${size} size`, async ({
      mount,
      page,
    }) => {
      await mount(
        <DateRangeCombined
          size={size}
          initialValue={["15/07/2025", "28/07/2025"]}
        />,
      );
      const field = page.locator('[data-role="input-container"]');

      const filled = await field.boundingBox();
      expect(filled?.height).toBe(height);

      await trigger(page).click();
      await page.getByRole("button", { name: "Clear" }).click();
      expect((await field.boundingBox())?.width).toBe(filled?.width);
    });
  });

  test("opens on Enter and focuses today with no value", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCombined />);

    await trigger(page).focus();
    await page.keyboard.press("Enter");

    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(day(page, /10 July 2025/)).toBeFocused();
  });

  test("positions the picker below the combined trigger", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCombined />);

    const rangeTrigger = trigger(page);
    await rangeTrigger.click();

    const [triggerBox, pickerBox] = await Promise.all([
      rangeTrigger.boundingBox(),
      page.getByRole("dialog").boundingBox(),
    ]);
    expect(pickerBox?.x).toBe(triggerBox?.x);
    expect(pickerBox?.y).toBeGreaterThanOrEqual(
      (triggerBox?.y ?? 0) + (triggerBox?.height ?? 0),
    );
  });

  test("opens on Space and focuses the start date in its month", async ({
    mount,
    page,
  }) => {
    await mount(
      <DateRangeCombined initialValue={["15/03/2024", "20/03/2024"]} />,
    );

    await trigger(page).focus();
    await page.keyboard.press(" ");

    await expect(page.getByRole("grid")).toHaveAccessibleName("March 2024");
    await expect(day(page, /15 March 2024/)).toBeFocused();
  });

  test("selects with Enter and Space, keeps the calendar open, and Apply reports and returns focus", async ({
    mount,
    page,
  }) => {
    let applied: string[] = [];
    await mount(
      <DateRangeCombined
        onChange={(ev) => {
          applied = ev.target.value.map((value) => value.rawValue as string);
        }}
      />,
    );

    await trigger(page).click();
    await expect(day(page, /10 July 2025/)).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(trigger(page)).toHaveText("10/07/2025 to");
    await expect(page.getByRole("status")).toHaveText(
      "Start date Thursday, 10 July 2025. Choose an end date.",
    );

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press(" ");
    await expect(trigger(page)).toHaveText("10/07/2025 to 18/07/2025");
    await expect(page.getByRole("dialog")).toBeVisible();

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Apply" })).toBeFocused();
    expect(applied).toEqual([]);
    await page.keyboard.press("Enter");

    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(trigger(page)).toBeFocused();
    expect(applied).toEqual(["2025-07-10", "2025-07-18"]);
  });

  test("cycles Tab through day, Clear, Apply, month and year, and Shift+Tab reverses it", async ({
    mount,
    page,
  }) => {
    await mount(
      <DateRangeCombined initialValue={["15/07/2025", "28/07/2025"]} />,
    );

    await trigger(page).click();
    const order = [
      day(page, /15 July 2025/),
      page.getByRole("button", { name: "Clear" }),
      page.getByRole("button", { name: "Apply" }),
      page.getByRole("combobox", { name: "Choose the month" }),
      page.getByRole("combobox", { name: "Choose the year" }),
      day(page, /15 July 2025/),
    ];

    await expect(order[0]).toBeFocused();
    for (const control of order.slice(1)) {
      await page.keyboard.press("Tab");
      await expect(control).toBeFocused();
    }
    for (const control of order.slice(0, -1).reverse()) {
      await page.keyboard.press("Shift+Tab");
      await expect(control).toBeFocused();
    }
  });

  test("Apply with only a start date closes and reports the partial range", async ({
    mount,
    page,
  }) => {
    let applied: (string | null)[] = [];
    await mount(
      <DateRangeCombined
        onChange={(ev) => {
          applied = ev.target.value.map((value) => value.rawValue);
        }}
      />,
    );

    await trigger(page).click();
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Apply" })).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(trigger(page)).toHaveText("10/07/2025 to");
    await expect(trigger(page)).toBeFocused();
    expect(applied).toEqual(["2025-07-10", ""]);
  });

  test("moves focus to the first date after changing the month", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCombined />);

    await trigger(page).click();
    await page
      .getByRole("combobox", { name: "Choose the month" })
      .selectOption("8");
    await page.keyboard.press("Tab");

    await expect(day(page, /\b1 September 2025\b/)).toBeFocused();
  });

  test("Esc discards the draft and returns focus to the trigger", async ({
    mount,
    page,
  }) => {
    await mount(
      <DateRangeCombined initialValue={["01/07/2025", "05/07/2025"]} />,
    );

    await trigger(page).click();
    await day(page, /15 July 2025/).click();
    await expect(trigger(page)).toHaveText("15/07/2025 to");
    await page.keyboard.press("Escape");

    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(trigger(page)).toHaveText("01/07/2025 to 05/07/2025");
    await expect(trigger(page)).toBeFocused();
  });

  test("clicking outside discards the draft and leaves focus where clicked", async ({
    mount,
    page,
  }) => {
    await mount(
      <>
        <input aria-label="Outside" />
        <DateRangeCombined initialValue={["01/07/2025", "05/07/2025"]} />
      </>,
    );

    await trigger(page).click();
    await day(page, /15 July 2025/).click();
    await page.getByRole("textbox", { name: "Outside" }).click();

    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(trigger(page)).toHaveText("01/07/2025 to 05/07/2025");
    await expect(page.getByRole("textbox", { name: "Outside" })).toBeFocused();
  });

  test("submitting a form while the calendar is open submits the value, not the draft", async ({
    mount,
    page,
  }) => {
    let submitted: string[] = [];
    await mount(
      <DateRangeCombinedInForm
        onSubmit={(start, end) => {
          submitted = [start, end];
        }}
      />,
    );

    await trigger(page).click();
    await expect(day(page, /10 July 2025/)).toBeFocused();
    await page.keyboard.press("Enter");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Enter");
    await expect(trigger(page)).toHaveText("10/07/2025 to 11/07/2025");
    await page.getByRole("button", { name: "Submit" }).click();
    await expect.poll(() => submitted).toEqual(["", ""]);

    await trigger(page).click();
    await expect(day(page, /10 July 2025/)).toBeFocused();
    await page.keyboard.press("Enter");
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Enter");
    await page.getByRole("button", { name: "Apply" }).click();
    await page.getByRole("button", { name: "Submit" }).click();
    await expect.poll(() => submitted).toEqual(["2025-07-10", "2025-07-11"]);
  });

  test("passes accessibility checks when closed", async ({ mount, page }) => {
    await mount(
      <DateRangeCombined
        initialValue={["15/07/2025", "28/07/2025"]}
        required
        error="Select a range"
      />,
    );

    await checkAccessibility(page);
  });

  test("passes accessibility checks with a warning and when disabled", async ({
    mount,
    page,
  }) => {
    await mount(
      <>
        <DateRangeCombined warning="Check the dates" />
        <DateRangeCombined disabled />
      </>,
    );

    await checkAccessibility(page);
  });

  test("passes accessibility checks when open with a partial range", async ({
    mount,
    page,
  }) => {
    await mount(<DateRangeCombined initialValue={["15/07/2025", ""]} />);

    await trigger(page).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await checkAccessibility(page);
  });

  test("passes accessibility checks when open with a complete range", async ({
    mount,
    page,
  }) => {
    await mount(
      <DateRangeCombined initialValue={["15/07/2025", "28/07/2025"]} />,
    );

    await trigger(page).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    await checkAccessibility(page);
  });
});

import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import TimeComponent from "./components.test-pw";
import { getDataComponentByValue } from "../../../playwright/components";
import { checkAccessibility } from "../../../playwright/support/helper";

const sizeMap = {
  small: { width: 48, height: 32, hintGap: 4 },
  medium: { width: 56, height: 40, hintGap: 8 },
  large: { width: 64, height: 48, hintGap: 12 },
} as const;

const hintGapTolerance = 6;

test.describe("Time component", () => {
  test("should only call onBlur when the user navigates via tabbing and neither input is focused", async ({
    mount,
    page,
  }) => {
    let count = 0;
    const onBlurCb = () => {
      count += 1;
    };
    await mount(<TimeComponent onBlurCb={onBlurCb} />);

    const hoursInput = getDataComponentByValue(page, "hours").locator("input");
    const minutesInput = getDataComponentByValue(page, "minutes").locator(
      "input",
    );

    await hoursInput.focus();
    await page.keyboard.press("Tab");
    await expect(minutesInput).toBeFocused();
    expect(count).toBe(0);
    await page.keyboard.press("Tab");
    await expect(minutesInput).not.toBeFocused();
    expect(count).toBe(1);
  });

  test("should only call onBlur when the user navigates via shift tabbing and neither input is focused", async ({
    mount,
    page,
  }) => {
    let count = 0;
    const onBlurCb = () => {
      count += 1;
    };
    await mount(<TimeComponent onBlurCb={onBlurCb} />);

    const hoursInput = getDataComponentByValue(page, "hours").locator("input");
    const minutesInput = getDataComponentByValue(page, "minutes").locator(
      "input",
    );

    await minutesInput.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(hoursInput).toBeFocused();
    expect(count).toBe(0);
    await page.keyboard.press("Shift+Tab");
    await expect(hoursInput).not.toBeFocused();
    expect(count).toBe(1);
  });

  (Object.keys(sizeMap) as Array<keyof typeof sizeMap>).forEach((size) => {
    test(`should render ${size} input containers with expected dimensions and hint gap`, async ({
      mount,
      page,
    }) => {
      const { width, height, hintGap } = sizeMap[size];

      await mount(
        <TimeComponent
          label="Time"
          legendHint="Hint text"
          size={size}
          value={{ hours: "12", minutes: "30" }}
          onChange={() => {}}
        />,
      );

      const hoursInputContainer = getDataComponentByValue(
        page,
        "hours",
      ).locator('[data-role="input-container"]');
      const minutesInputContainer = getDataComponentByValue(
        page,
        "minutes",
      ).locator('[data-role="input-container"]');

      const hoursBox = await hoursInputContainer.boundingBox();
      const minutesBox = await minutesInputContainer.boundingBox();

      expect(hoursBox?.width).toBeCloseTo(width, 0);
      expect(hoursBox?.height).toBeCloseTo(height, 0);
      expect(minutesBox?.width).toBeCloseTo(width, 0);
      expect(minutesBox?.height).toBeCloseTo(height, 0);

      const hint = page.getByText("Hint text");
      const hoursLabel = page.getByText("Hours");
      const hintBox = await hint.boundingBox();
      const hoursLabelBox = await hoursLabel.boundingBox();

      expect(hoursLabelBox).not.toBeNull();
      expect(hintBox).not.toBeNull();

      const actualHintGap =
        (hoursLabelBox?.y || 0) - ((hintBox?.y || 0) + (hintBox?.height || 0));

      expect(actualHintGap).toBeGreaterThanOrEqual(hintGap - hintGapTolerance);
      expect(actualHintGap).toBeLessThanOrEqual(hintGap + hintGapTolerance);
    });
  });

  test("should keep the colon vertically centered and place the AM/PM toggle below inputs on narrow screens", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 900 });

    await mount(
      <TimeComponent
        label="Time"
        size="medium"
        toggleValue="AM"
        value={{ hours: "12", minutes: "30", period: "AM" }}
        onChange={() => {}}
      />,
    );

    const hoursInputContainer = getDataComponentByValue(page, "hours").locator(
      '[data-role="input-container"]',
    );
    const minutesInputContainer = getDataComponentByValue(
      page,
      "minutes",
    ).locator('[data-role="input-container"]');
    const colon = page.locator('[data-role="time-colon"]');
    const toggleGroup = getDataComponentByValue(
      page,
      "time-button-toggle-group",
    );

    const amToggle = getDataComponentByValue(page, "am-button-toggle");
    const pmToggle = getDataComponentByValue(page, "pm-button-toggle");

    const hoursBox = await hoursInputContainer.boundingBox();
    const minutesBox = await minutesInputContainer.boundingBox();
    const colonBox = await colon.boundingBox();
    const toggleBox = await toggleGroup.boundingBox();
    const amBox = await amToggle.boundingBox();
    const pmBox = await pmToggle.boundingBox();

    expect(hoursBox).not.toBeNull();
    expect(minutesBox).not.toBeNull();
    expect(colonBox).not.toBeNull();
    expect(toggleBox).not.toBeNull();
    expect(amBox).not.toBeNull();
    expect(pmBox).not.toBeNull();

    const hoursCenterY = (hoursBox?.y || 0) + (hoursBox?.height || 0) / 2;
    const minutesCenterY = (minutesBox?.y || 0) + (minutesBox?.height || 0) / 2;
    const colonCenterY = (colonBox?.y || 0) + (colonBox?.height || 0) / 2;

    expect(Math.abs(colonCenterY - hoursCenterY)).toBeLessThanOrEqual(2);
    expect(Math.abs(colonCenterY - minutesCenterY)).toBeLessThanOrEqual(2);

    const inputsBottom = Math.max(
      (hoursBox?.y || 0) + (hoursBox?.height || 0),
      (minutesBox?.y || 0) + (minutesBox?.height || 0),
    );
    const toggleTop = toggleBox?.y || 0;
    const toggleGap = toggleTop - inputsBottom;

    expect(toggleTop).toBeGreaterThan(inputsBottom);
    expect(toggleGap).toBeGreaterThanOrEqual(12);
    expect(toggleGap).toBeLessThanOrEqual(22);

    expect(Math.abs((amBox?.height || 0) - (pmBox?.height || 0))).toBeLessThan(
      1,
    );
    expect(
      Math.abs((toggleBox?.height || 0) - (amBox?.height || 0)),
    ).toBeLessThanOrEqual(4);
  });

  test.describe("Accessibility tests", () => {
    test("should pass for default implementation", async ({ mount, page }) => {
      await mount(
        <TimeComponent
          label="label"
          value={{ hours: "12", minutes: "30" }}
          onChange={() => {}}
        />,
      );

      await checkAccessibility(page);
    });

    test("should pass when both inputs have an error", async ({
      mount,
      page,
    }) => {
      await mount(
        <TimeComponent
          label="label"
          hoursInputProps={{ error: "error" }}
          minutesInputProps={{ error: "error" }}
          value={{ hours: "12", minutes: "30" }}
          onChange={() => {}}
        />,
      );

      await checkAccessibility(page);
    });

    test("should pass when both inputs have a warning", async ({
      mount,
      page,
    }) => {
      await mount(
        <TimeComponent
          label="label"
          hoursInputProps={{ warning: "warning" }}
          minutesInputProps={{ warning: "warning" }}
          value={{ hours: "12", minutes: "30" }}
          onChange={() => {}}
        />,
      );

      await checkAccessibility(page);
    });

    test("should pass when toggle control rendered", async ({
      mount,
      page,
    }) => {
      await mount(
        <TimeComponent
          label="label"
          value={{ hours: "12", minutes: "30", period: "AM" }}
          onChange={() => {}}
        />,
      );

      await checkAccessibility(page);
    });

    test("should pass when toggle control rendered and disabled prop set", async ({
      mount,
      page,
    }) => {
      await mount(
        <TimeComponent
          disabled
          label="label"
          value={{ hours: "12", minutes: "30", period: "AM" }}
          onChange={() => {}}
        />,
      );

      await checkAccessibility(page);
    });

    test("should pass when toggle control rendered and readOnly prop set", async ({
      mount,
      page,
    }) => {
      await mount(
        <TimeComponent
          readOnly
          label="label"
          value={{ hours: "12", minutes: "30", period: "AM" }}
          onChange={() => {}}
        />,
      );

      await checkAccessibility(page);
    });
  });
});

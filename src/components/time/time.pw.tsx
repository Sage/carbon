import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import TimeComponent from "./components.test-pw";
import { getDataComponentByValue } from "../../../playwright/components";
import { checkAccessibility } from "../../../playwright/support/helper";

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

    // disabled styling for label, input hint etc fail colour contrast
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

      await checkAccessibility(page, undefined, "color-contrast");
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

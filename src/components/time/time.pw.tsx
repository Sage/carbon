import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { TimeProps } from ".";
import {
  getDataComponentByValue,
  getDataElementByValue,
  getDataRoleByValue,
} from "../../../playwright/components";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
  verifyRequiredAsteriskForLegend,
} from "../../../playwright/support/helper";
import TimeComponent from "./components.test-pw";
import {
  CHARACTERS,
  SIZE,
  VALIDATION,
} from "../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("Time component", () => {
  test("should render with data-element attribute set", async ({
    mount,
    page,
  }) => {
    await mount(<TimeComponent data-element={CHARACTERS.STANDARD} />);

    await expect(
      getDataElementByValue(page, CHARACTERS.STANDARD),
    ).toBeVisible();
  });

  test("should render with data-role attribute set", async ({
    mount,
    page,
  }) => {
    await mount(<TimeComponent data-role={CHARACTERS.STANDARD} />);

    await expect(getDataRoleByValue(page, CHARACTERS.STANDARD)).toBeVisible();
  });

  testData.forEach((text) => {
    test(`should render with ${text} as a legend`, async ({ mount, page }) => {
      await mount(<TimeComponent label={text} />);

      const legend = getDataElementByValue(page, "legend");

      await expect(legend).toHaveText(text);
    });
  });

  testData.forEach((text) => {
    test(`should render with ${text} as a hours input label`, async ({
      mount,
      page,
    }) => {
      await mount(<TimeComponent hoursInputProps={{ label: text }} />);

      const label = getDataElementByValue(page, "label").first();

      await expect(label).toHaveText(text);
    });
  });

  testData.forEach((text) => {
    test(`should render with ${text} as a minutes input label`, async ({
      mount,
      page,
    }) => {
      await mount(<TimeComponent minutesInputProps={{ label: text }} />);

      const label = getDataElementByValue(page, "label").last();

      await expect(label).toHaveText(text);
    });
  });

  testData.forEach((inputHint) => {
    test(`should render inputHint with ${inputHint} as text`, async ({
      mount,
      page,
    }) => {
      await mount(<TimeComponent inputHint={inputHint} />);

      const hint = page.getByText(inputHint);

      await expect(hint).toBeVisible();
    });
  });

  test("should render with required attribute set on inputs and `*` after legend element", async ({
    mount,
    page,
  }) => {
    await mount(<TimeComponent label="label" required />);

    await verifyRequiredAsteriskForLegend(page);
    await expect(
      getDataComponentByValue(page, "hours").locator("input"),
    ).toHaveAttribute("required", "");
    await expect(
      getDataComponentByValue(page, "minutes").locator("input"),
    ).toHaveAttribute("required", "");
  });

  test("should render with name attribute on the root", async ({
    mount,
    page,
  }) => {
    await mount(<TimeComponent name={CHARACTERS.STANDARD} />);

    await expect(getDataComponentByValue(page, "time")).toHaveAttribute(
      "name",
      CHARACTERS.STANDARD,
    );
  });

  test("should render with inputs and toggles disabled when prop set", async ({
    mount,
    page,
  }) => {
    await mount(<TimeComponent disabled toggleValue="AM" />);

    const hoursInput = getDataComponentByValue(page, "hours").locator("input");
    const minutesInput = getDataComponentByValue(page, "minutes").locator(
      "input",
    );
    const amToggleButton = getDataComponentByValue(
      page,
      "am-button-toggle",
    ).locator("button");
    const pmToggleButton = getDataComponentByValue(
      page,
      "pm-button-toggle",
    ).locator("button");

    await expect(hoursInput).toBeDisabled();
    await expect(minutesInput).toBeDisabled();
    await expect(amToggleButton).toBeDisabled();
    await expect(pmToggleButton).toBeDisabled();
  });

  test("should render with inputs as non-editable and toggles disabled when readOnly prop set", async ({
    mount,
    page,
  }) => {
    await mount(<TimeComponent readOnly toggleValue="AM" />);

    const hoursInput = getDataComponentByValue(page, "hours").locator("input");
    const minutesInput = getDataComponentByValue(page, "minutes").locator(
      "input",
    );
    const amToggleButton = getDataComponentByValue(
      page,
      "am-button-toggle",
    ).locator("button");
    const pmToggleButton = getDataComponentByValue(
      page,
      "pm-button-toggle",
    ).locator("button");

    await expect(hoursInput).not.toBeEditable();
    await expect(minutesInput).not.toBeEditable();
    await expect(amToggleButton).toBeDisabled();
    await expect(pmToggleButton).toBeDisabled();
  });

  test("should allow typing in inputs, verify the value and onChange was called correct number of times", async ({
    mount,
    page,
  }) => {
    let count = 0;
    const onChangeCb = () => {
      count += 1;
    };
    await mount(<TimeComponent onChangeCb={onChangeCb} />);

    const inputValue = "1";
    const hoursInput = getDataComponentByValue(page, "hours").locator("input");
    const minutesInput = getDataComponentByValue(page, "minutes").locator(
      "input",
    );

    await hoursInput.fill(inputValue);
    await expect(hoursInput).toHaveValue(inputValue);
    expect(count).toBe(1);
    await minutesInput.fill(inputValue);
    expect(count).toBe(2);
    await expect(minutesInput).toHaveValue(inputValue);
  });

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

  (
    [
      [VALIDATION.ERROR, "error", true],
      [VALIDATION.WARNING, "warning", true],
      ["rgb(102, 132, 148)", "error", false],
      ["rgb(102, 132, 148)", "warning", false],
    ] as [string, string, boolean][]
  ).forEach(([borderColor, type, bool]) => {
    test(`should render hours input with ${borderColor} border when ${type} is ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TimeComponent
          label="label"
          value={{ hours: "", minutes: "" }}
          onChange={() => {}}
          {...{ hoursInputProps: { [type]: bool } }}
        />,
      );

      const hoursInputPresentation = page
        .locator("input")
        .first()
        .locator("..");

      await expect(hoursInputPresentation).toHaveCSS(
        "border-top-color",
        borderColor,
      );
      await expect(hoursInputPresentation).toHaveCSS(
        "border-bottom-color",
        borderColor,
      );
      await expect(hoursInputPresentation).toHaveCSS(
        "border-left-color",
        borderColor,
      );
      await expect(hoursInputPresentation).toHaveCSS(
        "border-right-color",
        borderColor,
      );
    });
  });

  (
    [
      [VALIDATION.ERROR, "error", true],
      [VALIDATION.WARNING, "warning", true],
      ["rgb(102, 132, 148)", "error", false],
      ["rgb(102, 132, 148)", "warning", false],
    ] as [string, string, boolean][]
  ).forEach(([borderColor, type, bool]) => {
    test(`should render minutes input with ${borderColor} border when ${type} is ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TimeComponent
          label="label"
          value={{ hours: "", minutes: "" }}
          onChange={() => {}}
          {...{ minutesInputProps: { [type]: bool } }}
        />,
      );

      const minutesInputPresentation = page
        .locator("input")
        .last()
        .locator("..");

      await expect(minutesInputPresentation).toHaveCSS(
        "border-top-color",
        borderColor,
      );
      await expect(minutesInputPresentation).toHaveCSS(
        "border-bottom-color",
        borderColor,
      );
      await expect(minutesInputPresentation).toHaveCSS(
        "border-left-color",
        borderColor,
      );
      await expect(minutesInputPresentation).toHaveCSS(
        "border-right-color",
        borderColor,
      );
    });
  });

  (
    [
      [VALIDATION.ERROR, "error", true],
      [VALIDATION.WARNING, "warning", true],
      ["rgb(102, 132, 148)", "error", false],
      ["rgb(102, 132, 148)", "warning", false],
    ] as [string, string, boolean][]
  ).forEach(([borderColor, type, bool]) => {
    test(`should render both inputs with ${borderColor} border when ${type} is ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TimeComponent
          label="label"
          value={{ hours: "", minutes: "" }}
          onChange={() => {}}
          {...(type === "error" && {
            hoursInputProps: { error: bool },
            minutesInputProps: { error: bool },
          })}
          {...(type === "warning" && {
            hoursInputProps: { warning: bool },
            minutesInputProps: { warning: bool },
          })}
        />,
      );

      const hoursInputPresentation = page
        .locator("input")
        .first()
        .locator("..");
      const minutesInputPresentation = page
        .locator("input")
        .last()
        .locator("..");

      await expect(hoursInputPresentation).toHaveCSS(
        "border-top-color",
        borderColor,
      );
      await expect(hoursInputPresentation).toHaveCSS(
        "border-bottom-color",
        borderColor,
      );
      await expect(hoursInputPresentation).toHaveCSS(
        "border-left-color",
        borderColor,
      );
      await expect(hoursInputPresentation).toHaveCSS(
        "border-right-color",
        borderColor,
      );
      await expect(minutesInputPresentation).toHaveCSS(
        "border-top-color",
        borderColor,
      );
      await expect(minutesInputPresentation).toHaveCSS(
        "border-bottom-color",
        borderColor,
      );
      await expect(minutesInputPresentation).toHaveCSS(
        "border-left-color",
        borderColor,
      );
      await expect(minutesInputPresentation).toHaveCSS(
        "border-right-color",
        borderColor,
      );
    });
  });

  (
    [
      [SIZE.SMALL, 30],
      [SIZE.MEDIUM, 38],
      [SIZE.LARGE, 46],
    ] as [TimeProps["size"], number][]
  ).forEach(([size, height]) => {
    test(`should render the inputs and toggles with height of ${height}px when size is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TimeComponent
          label="label"
          value={{ hours: "", minutes: "", period: "AM" }}
          onChange={() => {}}
          size={size}
        />,
      );

      const hoursInput = page.locator("input").first();
      const minutesInput = page.locator("input").last();
      const toggleButtons = getDataComponentByValue(
        page,
        "time-button-toggle-group",
      ).first();

      await assertCssValueIsApproximately(hoursInput, "height", height);
      await assertCssValueIsApproximately(minutesInput, "height", height);
      await assertCssValueIsApproximately(toggleButtons, "height", height + 2);
    });
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

    test("should pass when required prop set", async ({ mount, page }) => {
      await mount(
        <TimeComponent
          required
          label="label"
          value={{ hours: "12", minutes: "30" }}
          onChange={() => {}}
        />,
      );

      await checkAccessibility(page);
    });

    test("should pass when input hint text is rendered", async ({
      mount,
      page,
    }) => {
      await mount(
        <TimeComponent
          label="label"
          inputHint="input hint"
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

    test("should pass when the hours input has an error", async ({
      mount,
      page,
    }) => {
      await mount(
        <TimeComponent
          label="label"
          hoursInputProps={{ error: "error" }}
          value={{ hours: "12", minutes: "30" }}
          onChange={() => {}}
        />,
      );

      await checkAccessibility(page);
    });

    test("should pass when the minutes input has an error", async ({
      mount,
      page,
    }) => {
      await mount(
        <TimeComponent
          label="label"
          minutesInputProps={{ error: "error" }}
          value={{ hours: "12", minutes: "30" }}
          onChange={() => {}}
        />,
      );

      await checkAccessibility(page);
    });

    test("should pass when the hours input has a warning", async ({
      mount,
      page,
    }) => {
      await mount(
        <TimeComponent
          label="label"
          hoursInputProps={{ warning: "warning" }}
          value={{ hours: "12", minutes: "30" }}
          onChange={() => {}}
        />,
      );

      await checkAccessibility(page);
    });

    test("should pass when the minutes input has a warning", async ({
      mount,
      page,
    }) => {
      await mount(
        <TimeComponent
          label="label"
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

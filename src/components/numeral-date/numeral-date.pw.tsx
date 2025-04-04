import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import NumeralDate, { NumeralDateProps } from ".";
import {
  NumeralDateComponent,
  NumeralDateControlled,
} from "./components.test-pw";

import {
  numeralDateComponent,
  numeralDateInput,
} from "../../../playwright/components/numeral-date";

import Box from "../box";

import {
  fieldHelpPreview,
  getDataElementByValue,
  getDataComponentByValue,
  getDataRoleByValue,
  tooltipPreview,
} from "../../../playwright/components";

import {
  checkAccessibility,
  verifyRequiredAsteriskForLegend,
  assertCssValueIsApproximately,
} from "../../../playwright/support/helper";

import { ICON } from "../../../playwright/components/locators";
import {
  CHARACTERS,
  SIZE,
  VALIDATION,
} from "../../../playwright/support/constants";
import { HooksConfig } from "../../../playwright";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const dynamicValidations: [string, string, string, string][] = [
  ["02", "29", "2001", "Day in February should be a number within 1-28."],
  ["02", "30", "2004", "Day in February should be a number within 1-29."],
  ["06", "31", "2001", "Day in June should be a number within 1-30."],
  ["09", "31", "2001", "Day in September should be a number within 1-30."],
  ["12", "32", "2001", "Day in December should be a number within 1-31."],
];

test.describe("NumeralDate component", () => {
  test("should render NumeralDate with data-element prop", async ({
    mount,
    page,
  }) => {
    await mount(<NumeralDateComponent data-element={CHARACTERS.STANDARD} />);

    await expect(
      getDataElementByValue(page, CHARACTERS.STANDARD),
    ).toBeVisible();
  });

  test("should render NumeralDate with data-role prop", async ({
    mount,
    page,
  }) => {
    await mount(<NumeralDateComponent data-role={CHARACTERS.STANDARD} />);

    await expect(getDataRoleByValue(page, CHARACTERS.STANDARD)).toBeVisible();
  });

  test("should render NumeralDate with id prop", async ({ mount, page }) => {
    await mount(<NumeralDateComponent id={CHARACTERS.STANDARD} />);

    const fieldset = page.locator("fieldset");
    await expect(fieldset).toHaveId(CHARACTERS.STANDARD);
  });

  testData.forEach((label) => {
    test(`should render NumeralDate with ${label} as a label`, async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateComponent label={label} />);

      const legend = getDataElementByValue(page, "legend");
      await expect(legend).toHaveText(label);
    });
  });

  test("should render NumeralDate with labelInline prop", async ({
    mount,
    page,
  }) => {
    await mount(<NumeralDateComponent labelInline />);

    const legend = getDataElementByValue(page, "legend");
    await expect(legend).toHaveCSS("float", "left");
  });

  (
    [
      ["left", "start"],
      ["right", "end"],
    ] as [NumeralDateProps["labelAlign"], string][]
  ).forEach(([labelAlign, cssValue]) => {
    test(`should render NumeralDate with labelAlign prop set to ${labelAlign}`, async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateComponent labelInline labelAlign={labelAlign} />);

      const legend = getDataElementByValue(page, "legend");
      await expect(legend).toHaveCSS("justify-content", `flex-${cssValue}`);
    });
  });

  testData.forEach((labelHelp) => {
    test(`should render NumeralDate with labelHelp prop set to ${labelHelp}`, async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateComponent labelInline labelHelp={labelHelp} />);

      const question = getDataElementByValue(page, "question");
      await question.click();

      await expect(tooltipPreview(page)).toHaveText(labelHelp);
    });
  });

  (
    [
      [1, "8px"],
      [2, "16px"],
    ] as [NumeralDateProps["labelSpacing"], string][]
  ).forEach(([spacing, padding]) => {
    test(`should render NumeralDate with labelSpacing prop set to ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateComponent labelInline labelSpacing={spacing} />);

      const legend = getDataElementByValue(page, "legend");
      await expect(legend).toHaveCSS("padding-right", padding);
    });
  });

  (
    [
      [10, 135],
      [30, 409],
      [80, 1092],
    ] as [NumeralDateProps["labelWidth"], number][]
  ).forEach(([label, labelRatio]) => {
    test(`should use ${label} as labelWidth and render it with the correct ratio`, async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateComponent labelInline labelWidth={label} />);

      const legend = getDataElementByValue(page, "legend");
      await assertCssValueIsApproximately(legend, "width", labelRatio);
    });
  });

  test("should render NumeralDate with required prop", async ({
    mount,
    page,
  }) => {
    await mount(<NumeralDateComponent required />);

    await verifyRequiredAsteriskForLegend(page);
  });

  test("should render NumeralDate with name prop", async ({ mount, page }) => {
    await mount(<NumeralDateComponent name={CHARACTERS.STANDARD} />);

    await expect(numeralDateComponent(page)).toHaveAttribute(
      "name",
      CHARACTERS.STANDARD,
    );
  });

  test("should render NumeralDate with disabled prop", async ({
    mount,
    page,
  }) => {
    await mount(<NumeralDateComponent disabled />);

    const input = numeralDateInput(page, 0);
    await expect(input).toBeDisabled();
  });

  test("should render NumeralDate with readOnly prop", async ({
    mount,
    page,
  }) => {
    await mount(<NumeralDateComponent readOnly />);

    const input = numeralDateInput(page, 0);
    await expect(input).not.toBeEditable();
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`should render NumeralDate with a ${type} validation icon on input`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NumeralDateComponent
          labelInline
          labelAlign="right"
          {...{ [type]: "Message" }}
        />,
      );

      const input = numeralDateInput(page, 2).locator("..");
      await expect(input.locator(ICON)).toHaveAttribute("data-element", type);
    });
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`should render Numeral with a ${type} validation icon on label`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NumeralDateComponent
          labelInline
          labelAlign="right"
          validationOnLabel
          {...{ [type]: "Message" }}
        />,
      );

      const legend = getDataElementByValue(page, "legend");
      const validationIcon = legend.locator(`[data-element="${type}"]`);

      await expect(validationIcon).toBeVisible();
    });
  });

  test("should input into NumeralDate and verify the value", async ({
    mount,
    page,
  }) => {
    await mount(<NumeralDateComponent />);

    const inputValue = "15";
    const input = numeralDateInput(page, 0);
    await input.fill(inputValue);

    await expect(input).toHaveValue(inputValue);
  });

  test("should render NumeralDate with defaultValue prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <NumeralDate defaultValue={{ dd: "10", mm: "12", yyyy: "2022" }} />,
    );

    await expect(numeralDateInput(page, 0)).toHaveValue("10");
    await expect(numeralDateInput(page, 1)).toHaveValue("12");
    await expect(numeralDateInput(page, 2)).toHaveValue("2022");
  });

  (
    [
      [0, "Day should be a number within a 1-31 range.", "Day"],
      [1, "Month should be a number within a 1-12 range.", "Month"],
      [2, "Year should be a number within a 1800-2200 range.", "Year"],
    ] as [number, string, string][]
  ).forEach(([inputIndex, tooltipText, field]) => {
    test(`should render NumeralDate with error message for ${field} with enableInternalError prop`, async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateComponent enableInternalError />);

      const errorInput = "55";

      const input = numeralDateInput(page, inputIndex);
      await input.fill(errorInput);
      await input.blur();

      const errorIcon = numeralDateInput(page, 2).locator("..").locator(ICON);
      await expect(errorIcon).toHaveAttribute("data-element", "error");

      await errorIcon.hover();
      await expect(tooltipPreview(page)).toHaveText(tooltipText);
    });
  });

  dynamicValidations.forEach(([month, day, year, validationString]) => {
    test(`should display dynamic internal error message in tooltip when validationRedesignOptIn is false, month is ${month}, day is ${day} and year is ${year}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NumeralDateComponent
          enableInternalError
          value={{ dd: "", mm: month, yyyy: year }}
        />,
      );

      const input = numeralDateInput(page, 0);
      await input.fill(day);
      await input.blur();

      const errorIcon = numeralDateInput(page, 2).locator("..").locator(ICON);
      await expect(errorIcon).toHaveAttribute("data-element", "error");

      await errorIcon.hover();
      await expect(tooltipPreview(page)).toHaveText(validationString);
    });
  });

  dynamicValidations.forEach(([month, day, year, validationString]) => {
    test(`should display dynamic internal warning message in tooltip when validationRedesignOptIn is false, month is ${month}, day is ${day} and year is ${year}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NumeralDateComponent
          enableInternalWarning
          value={{ dd: "", mm: month, yyyy: year }}
        />,
      );

      const input = numeralDateInput(page, 0);
      await input.fill(day);
      await input.blur();

      const warningIcon = numeralDateInput(page, 2).locator("..").locator(ICON);
      await expect(warningIcon).toHaveAttribute("data-element", "warning");

      await warningIcon.hover();
      await expect(tooltipPreview(page)).toHaveText(validationString);
    });
  });

  dynamicValidations.forEach(([month, day, year, validationString]) => {
    test(`should display dynamic internal error message when validationRedesignOptIn is true, month is ${month}, day is ${day} and year is ${year}`, async ({
      mount,
      page,
    }) => {
      await mount<HooksConfig>(
        <NumeralDateComponent
          enableInternalError
          value={{ dd: "", mm: month, yyyy: year }}
        />,
        { hooksConfig: { validationRedesignOptIn: true } },
      );

      const input = numeralDateInput(page, 0);
      await input.fill(day);
      await input.blur();

      const errorMessage = page.getByText(validationString);
      await expect(errorMessage).toBeVisible();
    });
  });

  dynamicValidations.forEach(([month, day, year, validationString]) => {
    test(`should display dynamic internal warning message when validationRedesignOptIn is true, month is ${month}, day is ${day} and year is ${year}`, async ({
      mount,
      page,
    }) => {
      await mount<HooksConfig>(
        <NumeralDateComponent
          enableInternalWarning
          value={{ dd: "", mm: month, yyyy: year }}
        />,
        { hooksConfig: { validationRedesignOptIn: true } },
      );

      const input = numeralDateInput(page, 0);
      await input.fill(day);
      await input.blur();

      const warningMessage = page.getByText(validationString);
      await expect(warningMessage).toBeVisible();
    });
  });

  (
    [
      [0, "Day should be a number within a 1-31 range.", "Day"],
      [1, "Month should be a number within a 1-12 range.", "Month"],
      [2, "Year should be a number within a 1800-2200 range.", "Year"],
    ] as [number, string, string][]
  ).forEach(([inputIndex, tooltipText, field]) => {
    test(`should render NumeralDate with warning message for ${field} with enableInternalWarning prop`, async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateComponent enableInternalWarning />);

      const warningInput = "55";

      const input = numeralDateInput(page, inputIndex);
      await input.fill(warningInput);
      await input.blur();

      const warningIcon = numeralDateInput(page, 2).locator("..").locator(ICON);
      await expect(warningIcon).toHaveAttribute("data-element", "warning");

      await warningIcon.hover();
      await expect(tooltipPreview(page)).toHaveText(tooltipText);
    });
  });

  test('should render NumeralDate with `["dd", "mm", "yyyy"]` dateFormat prop', async ({
    mount,
    page,
  }) => {
    await mount(<NumeralDateComponent dateFormat={["dd", "mm", "yyyy"]} />);

    await expect(numeralDateInput(page, 0)).toHaveAccessibleName("Day");
    await expect(numeralDateInput(page, 1)).toHaveAccessibleName("Month");
    await expect(numeralDateInput(page, 2)).toHaveAccessibleName("Year");
  });

  test('should render NumeralDate with `["mm", "dd", "yyyy"]` dateFormat prop', async ({
    mount,
    page,
  }) => {
    await mount(<NumeralDateComponent dateFormat={["mm", "dd", "yyyy"]} />);

    await expect(numeralDateInput(page, 0)).toHaveAccessibleName("Month");
    await expect(numeralDateInput(page, 1)).toHaveAccessibleName("Day");
    await expect(numeralDateInput(page, 2)).toHaveAccessibleName("Year");
  });

  test('should render NumeralDate with `["dd", "mm"]` dateFormat prop', async ({
    mount,
    page,
  }) => {
    await mount(<NumeralDateComponent dateFormat={["dd", "mm"]} />);

    await expect(numeralDateInput(page, 0)).toHaveAccessibleName("Day");
    await expect(numeralDateInput(page, 1)).toHaveAccessibleName("Month");
    await expect(numeralDateInput(page, 2)).not.toBeVisible();
  });

  test('should render NumeralDate with `["mm", "dd"]` dateFormat prop', async ({
    mount,
    page,
  }) => {
    await mount(<NumeralDateComponent dateFormat={["mm", "dd"]} />);

    await expect(numeralDateInput(page, 0)).toHaveAccessibleName("Month");
    await expect(numeralDateInput(page, 1)).toHaveAccessibleName("Day");
    await expect(numeralDateInput(page, 2)).not.toBeVisible();
  });

  test('should render NumeralDate with `["mm", "yyyy"]` dateFormat prop', async ({
    mount,
    page,
  }) => {
    await mount(<NumeralDateComponent dateFormat={["mm", "yyyy"]} />);

    await expect(numeralDateInput(page, 0)).toHaveAccessibleName("Month");
    await expect(numeralDateInput(page, 1)).toHaveAccessibleName("Year");
    await expect(numeralDateInput(page, 2)).not.toBeVisible();
  });

  (
    [
      [VALIDATION.ERROR, "error", true],
      [VALIDATION.WARNING, "warning", true],
      [VALIDATION.INFO, "info", true],
      ["rgb(102, 132, 148)", "error", false],
      ["rgb(102, 132, 148)", "warning", false],
      ["rgb(102, 132, 148)", "info", false],
    ] as [string, string, boolean][]
  ).forEach(([borderColor, type, bool]) => {
    test(`should render with ${borderColor} input border when validation type ${type} is ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NumeralDateComponent
          labelInline
          labelAlign="right"
          {...{ [type]: bool }}
        />,
      );

      const inputParent = numeralDateInput(page, 2).locator("..");

      await expect(inputParent).toHaveCSS("border-top-color", borderColor);
      await expect(inputParent).toHaveCSS("border-bottom-color", borderColor);
      await expect(inputParent).toHaveCSS("border-left-color", borderColor);
      await expect(inputParent).toHaveCSS("border-right-color", borderColor);
    });
  });

  (
    [
      [SIZE.SMALL, 30],
      [SIZE.MEDIUM, 38],
      [SIZE.LARGE, 46],
    ] as [NumeralDateProps["size"], number][]
  ).forEach(([size, height]) => {
    test(`should use ${size} as size and render NumeralDate with ${height} as height`, async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateComponent size={size} />);

      const input = numeralDateInput(page, 0);
      await assertCssValueIsApproximately(input, "height", height);
    });
  });

  (
    [
      [SIZE.SMALL, 44, 66],
      [SIZE.MEDIUM, 50, 80],
      [SIZE.LARGE, 64, 84],
    ] as [NumeralDateProps["size"], number, number][]
  ).forEach(([size, inputWidth, inputWidthYear]) => {
    test(`should use ${size} as size and render inputs with expected widths`, async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateComponent size={size} />);

      const day = page.getByRole("presentation").nth(0);
      const month = page.getByRole("presentation").nth(1);
      const year = page.getByRole("presentation").nth(2);
      await expect(day).toHaveCSS("min-width", `${inputWidth}px`);
      await expect(month).toHaveCSS("min-width", `${inputWidth}px`);
      await expect(year).toHaveCSS("min-width", `${inputWidthYear}px`);
    });
  });

  test("should render with expected width when validation tooltip renders within the Year field and size is small", async ({
    mount,
    page,
  }) => {
    await mount(
      <NumeralDateComponent
        size={SIZE.SMALL}
        error="error"
        validationOnLabel={false}
      />,
    );

    const year = page.getByRole("presentation").nth(2);
    await expect(year).toHaveCSS("min-width", "75px");
  });

  (
    [
      [399, false],
      [400, true],
      [401, true],
    ] as [number, boolean][]
  ).forEach(([viewport, isInline]) => {
    test(`should render NumeralDate with labelInline when the adaptiveLabelBreakpoint prop is 400 with a viewport of ${viewport}`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({ width: viewport, height: 300 });
      await mount(<NumeralDateComponent adaptiveLabelBreakpoint={400} />);

      const legend = getDataElementByValue(page, "legend");

      if (isInline) {
        await expect(legend).toHaveCSS("float", "left");
      } else {
        await expect(legend).not.toHaveCSS("float", "left");
      }
    });
  });

  testData.forEach(([fieldHelp]) => {
    test(`should render NumeralDate with fieldHelp prop ${fieldHelp}`, async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateComponent fieldHelp={fieldHelp} />);

      await expect(fieldHelpPreview(page)).toHaveText(fieldHelp);
    });
  });

  (
    ["top", "bottom", "left", "right"] as NumeralDateProps["tooltipPosition"][]
  ).forEach((position) => {
    test(`should render NumeralDate with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box m="250px">
          <NumeralDateComponent
            error={CHARACTERS.STANDARD}
            tooltipPosition={position}
          />
        </Box>,
      );

      await getDataElementByValue(page, "error").hover();

      await expect(tooltipPreview(page)).toHaveText(CHARACTERS.STANDARD);
      await expect(tooltipPreview(page)).toHaveAttribute(
        "data-placement",
        position as string,
      );
    });
  });

  test("should render NumeralDate with helpAriaLabel prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <NumeralDateComponent
        labelHelp="fieldHelp"
        helpAriaLabel={CHARACTERS.STANDARD}
      />,
    );

    const help = getDataComponentByValue(page, "help");

    await expect(help).toHaveAttribute("aria-label", CHARACTERS.STANDARD);
  });

  test.describe("Accessibility tests for NumeralDate component", () => {
    test("should pass accessibility tests for NumeralDate component", async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateComponent />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests for NumeralDateControlled component ", async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateControlled />);

      await checkAccessibility(page);
    });

    (
      [
        ["dd", "mm", "yyyy"],
        ["mm", "dd", "yyyy"],
        ["dd", "mm"],
        ["mm", "dd"],
        ["mm", "yyyy"],
      ] as NumeralDateProps["dateFormat"][]
    ).forEach((dateFormat) => {
      test(`should pass accessibility tests for NumeralDate when dateFormat prop is ${dateFormat}`, async ({
        mount,
        page,
      }) => {
        await mount(<NumeralDateComponent dateFormat={dateFormat} />);

        await checkAccessibility(page);
      });
    });

    test("should pass accessibility tests for NumeralDateControlled component with enableInternalError prop", async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateControlled enableInternalError />);

      const errorInput = "55";

      const input = numeralDateInput(page, 0);
      await input.fill(errorInput);
      await input.blur();

      const errorIcon = numeralDateInput(page, 2).locator("..").locator(ICON);
      await errorIcon.hover();

      await checkAccessibility(page, tooltipPreview(page));
    });

    test("should pass accessibility tests for NumeralDateControlled component with enableInternalWarning prop", async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateControlled enableInternalWarning />);

      const warningInput = "55";

      const input = numeralDateInput(page, 0);
      await input.fill(warningInput);
      await input.blur();

      const warningIcon = numeralDateInput(page, 2).locator("..").locator(ICON);
      await warningIcon.hover();

      await checkAccessibility(page, tooltipPreview(page));
    });

    test("should pass accessibility tests for NumeralDateControlled component with labelInline prop", async ({
      mount,
      page,
    }) => {
      await mount(
        <NumeralDateControlled
          labelInline
          labelAlign="right"
          labelWidth={30}
        />,
      );

      await checkAccessibility(page);
    });

    test("should pass accessibility tests for NumeralDateControlled component with adaptive behaviour", async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({
        width: 700,
        height: 300,
      });
      await mount(
        <NumeralDateControlled
          labelInline
          labelAlign="right"
          labelWidth={30}
          adaptiveLabelBreakpoint={960}
        />,
      );

      await checkAccessibility(page);
    });

    test("should pass accessibility tests for NumeralDateControlled component with labelHelp prop", async ({
      mount,
      page,
    }) => {
      await mount(
        <NumeralDateControlled
          labelHelp="Label help"
          helpAriaLabel="Label help"
        />,
      );

      const question = getDataElementByValue(page, "question");
      await question.click();

      await checkAccessibility(page, tooltipPreview(page));
    });

    test("should pass accessibility tests for NumeralDateControlled component with fieldHelp prop", async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateControlled fieldHelp="Field help" />);

      await checkAccessibility(page);
    });

    (["small", "medium", "large"] as NumeralDateProps["size"][]).forEach(
      (size) => {
        test(`should pass accessibility tests for NumeralDate when sizes prop is ${size}`, async ({
          mount,
          page,
        }) => {
          await mount(<NumeralDateComponent size={size} />);

          await checkAccessibility(page);
        });
      },
    );
  });
});

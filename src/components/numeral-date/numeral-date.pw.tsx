import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import { NumeralDateProps } from ".";
import {
  NumeralDateComponent,
  NumeralDateControlled,
} from "./components.test-pw";

import {
  numeralDateComponent,
  numeralDateInput,
} from "../../../playwright/components/numeral-date";

import {
  getDataElementByValue,
  getDataRoleByValue,
} from "../../../playwright/components";

import {
  checkAccessibility,
  verifyRequiredAsteriskForLegend,
  assertCssValueIsApproximately,
} from "../../../playwright/support/helper";

import { CHARACTERS, SIZE } from "../../../playwright/support/constants";
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

  test("should input into NumeralDate and verify the value", async ({
    mount,
    page,
  }) => {
    await mount(<NumeralDateControlled />);

    const inputValue = "15";
    const input = numeralDateInput(page, 0);
    await input.fill(inputValue);

    await expect(input).toHaveValue(inputValue);
  });

  dynamicValidations.forEach(([month, day, year, validationString]) => {
    test(`should display dynamic internal error message when validationRedesignOptIn is true, month is ${month}, day is ${day} and year is ${year}`, async ({
      mount,
      page,
    }) => {
      await mount<HooksConfig>(
        <NumeralDateControlled
          enableInternalError
          initialValue={{ dd: "", mm: month, yyyy: year }}
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
        <NumeralDateControlled
          enableInternalWarning
          initialValue={{ dd: "", mm: month, yyyy: year }}
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
    await expect(numeralDateInput(page, 2)).toBeHidden();
  });

  test('should render NumeralDate with `["mm", "dd"]` dateFormat prop', async ({
    mount,
    page,
  }) => {
    await mount(<NumeralDateComponent dateFormat={["mm", "dd"]} />);

    await expect(numeralDateInput(page, 0)).toHaveAccessibleName("Month");
    await expect(numeralDateInput(page, 1)).toHaveAccessibleName("Day");
    await expect(numeralDateInput(page, 2)).toBeHidden();
  });

  test('should render NumeralDate with `["mm", "yyyy"]` dateFormat prop', async ({
    mount,
    page,
  }) => {
    await mount(<NumeralDateComponent dateFormat={["mm", "yyyy"]} />);

    await expect(numeralDateInput(page, 0)).toHaveAccessibleName("Month");
    await expect(numeralDateInput(page, 1)).toHaveAccessibleName("Year");
    await expect(numeralDateInput(page, 2)).toBeHidden();
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

  test.describe("Accessibility tests for NumeralDate component", () => {
    test("should pass accessibility tests for NumeralDate component", async ({
      mount,
      page,
    }) => {
      await mount(<NumeralDateComponent />);

      await checkAccessibility(page);
    });

    test("should pass accessibility tests for NumeralDateControlled component", async ({
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

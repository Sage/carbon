import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import {
  NumeralDateComponent,
  NumeralDateControlled,
} from "./components.test-pw";

import { numeralDateInput } from "../../../playwright/components/numeral-date";

import { checkAccessibility } from "../../../playwright/support/helper";

import { HooksConfig } from "../../../playwright";
const dynamicValidations: [string, string, string, string][] = [
  ["02", "29", "2001", "Day in February should be a number within 1-28."],
  ["02", "30", "2004", "Day in February should be a number within 1-29."],
  ["06", "31", "2001", "Day in June should be a number within 1-30."],
  ["09", "31", "2001", "Day in September should be a number within 1-30."],
  ["12", "32", "2001", "Day in December should be a number within 1-31."],
];

test.describe("NumeralDate component", () => {
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
  });
});

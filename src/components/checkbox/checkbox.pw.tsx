import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import {
  CheckboxComponent,
  CheckboxGroupComponent,
} from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";

const boolVals = [true, false];

test.describe("should check accessibility for Checkbox component", () => {
  boolVals.forEach((booleanValue) => {
    test(`should pass accessibility tests with checked state set to ${booleanValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<CheckboxComponent checked={booleanValue} />);

      await checkAccessibility(page);
    });
  });

  boolVals.forEach((booleanValue) => {
    test(`should pass accessibility tests with indeterminate state set to ${booleanValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<CheckboxComponent checked={booleanValue} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests with disabled prop", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent disabled />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests as a required field", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent label="Required Checkbox" required />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with inputHint", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent inputHint="Hint Text" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with error message", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent error="Error has occurred" />);

    await checkAccessibility(page);
  });
});

test.describe("should check accessibility for Checkbox Group component", () => {
  test("should pass accessibility tests by default", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxGroupComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with !@#$%^*()_+-=~[];:.,?{}&\"'<> as legend", async ({
    mount,
    page,
  }) => {
    await mount(
      <CheckboxGroupComponent legend={CHARACTERS.SPECIALCHARACTERS} />,
    );

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with inputHint", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxGroupComponent legendHint="Hint Text" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with error", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxGroupComponent error="error message" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when disabled", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxGroupComponent legend="CheckboxGroup" disabled />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests as a required field", async ({
    mount,
    page,
  }) => {
    await mount(
      <CheckboxGroupComponent legend="Required CheckboxGroup" required />,
    );

    await checkAccessibility(page);
  });
});

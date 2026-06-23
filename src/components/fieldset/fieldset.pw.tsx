import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import FieldsetComponent from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";

const specialCharacters = [
  CHARACTERS.STANDARD,
  CHARACTERS.DIACRITICS,
  CHARACTERS.SPECIALCHARACTERS,
];

test.describe("Accessibility tests for Fieldset component", () => {
  test(`should pass accessibility tests for default story`, async ({
    mount,
    page,
  }) => {
    await mount(<FieldsetComponent />);

    await checkAccessibility(page);
  });

  specialCharacters.forEach((chars) => {
    test(`should pass accessibility tests when legend text is ${chars}`, async ({
      mount,
      page,
    }) => {
      await mount(<FieldsetComponent legend={chars} />);

      await checkAccessibility(page);
    });
  });

  specialCharacters.forEach((chars) => {
    test(`should pass accessibility tests when legend hint text is ${chars}`, async ({
      mount,
      page,
    }) => {
      await mount(<FieldsetComponent legendHint={chars} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass accessibility tests with error validation`, async ({
    mount,
    page,
  }) => {
    await mount(<FieldsetComponent error="error message" />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests with warning validation`, async ({
    mount,
    page,
  }) => {
    await mount(<FieldsetComponent warning="warning message" />);

    await checkAccessibility(page);
  });
});

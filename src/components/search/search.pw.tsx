import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  SearchComponentInverseWithLabelHintAndError,
  SearchComponentWithLabelHintAndError,
} from "./components.test-pw";

test.describe("Accessibility tests for Search", () => {
  test("should check accessibility with label, hint text and error", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponentWithLabelHintAndError />);

    await checkAccessibility(page);
  });

  test("should check accessibility with inverse, label, hint text and error", async ({
    mount,
    page,
  }) => {
    await mount(<SearchComponentInverseWithLabelHintAndError />);

    await checkAccessibility(page);
  });
});

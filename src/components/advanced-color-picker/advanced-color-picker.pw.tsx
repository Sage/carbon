import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { AdvancedColorPickerCustom } from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Accessibility tests for AdvancedColorPicker component", () => {
  test("should pass accessibility tests for AdvancedColorPicker default", async ({
    mount,
    page,
  }) => {
    await mount(<AdvancedColorPickerCustom />);

    await checkAccessibility(page);
  });
});

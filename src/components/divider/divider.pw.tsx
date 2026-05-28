import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import {
  DividerComponent,
  DarkBackgroundOnInverseDivider,
} from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Accessibility tests for Divider component", () => {
  test("should pass accessibility checks for the default vertical divider", async ({
    mount,
    page,
  }) => {
    await mount(<DividerComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility checks for the inverse divider on a dark background", async ({
    mount,
    page,
  }) => {
    await mount(<DarkBackgroundOnInverseDivider />);

    await checkAccessibility(page);
  });
});

import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import "../../../playwright/components";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  CardComponent,
  Interactive,
  WithStringAsChild,
} from "../../../src/components/card/components.test-pw";

test.describe("Accessibility tests for Card component", () => {
  test("should pass accessibility tests for default example", async ({
    mount,
    page,
  }) => {
    await mount(<CardComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for interactive example", async ({
    mount,
    page,
  }) => {
    await mount(<Interactive />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with a string as a child", async ({
    mount,
    page,
  }) => {
    await mount(<WithStringAsChild />);

    await checkAccessibility(page);
  });
});

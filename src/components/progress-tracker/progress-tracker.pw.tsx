import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import { checkAccessibility } from "../../../playwright/support/helper";
import ProgressTracker from ".";

test.describe("Accessibility tests for Progress Tracker component", () => {
  test("should pass accessibility tests for default Progress Tracker", async ({
    mount,
    page,
  }) => {
    await mount(<ProgressTracker progress={50} />);

    await checkAccessibility(page);
  });
});

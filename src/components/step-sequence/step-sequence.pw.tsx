import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import {
  StepSequenceComponent,
  StepSequenceItemComponent,
} from "./components.test-pw";

import { StepSequenceItemProps } from ".";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Accessibility tests for StepSequence component", () => {
  test("should check StepSequence component for accessibility", async ({
    mount,
    page,
  }) => {
    await mount(<StepSequenceComponent />);

    await checkAccessibility(page);
  });

  test("should check ariaLabel for accessibility", async ({ mount, page }) => {
    await mount(<StepSequenceItemComponent aria-label="Step 1 of 5" />);

    await checkAccessibility(page);
  });

  test("should check item with description for accessibility", async ({
    mount,
    page,
  }) => {
    await mount(
      <StepSequenceItemComponent description="This is a description" />,
    );

    await checkAccessibility(page);
  });

  (
    ["complete", "current", "incomplete"] as StepSequenceItemProps["status"][]
  ).forEach((status) => {
    test(`should check status is set to ${status}`, async ({ mount, page }) => {
      await mount(
        <StepSequenceItemComponent
          status={status}
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
        />,
      );

      await checkAccessibility(page);
    });
  });
});

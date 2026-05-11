import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  StepSequenceComponent,
  StepSequenceItemCustom,
} from "./components.test-pw";

import { StepSequenceItemProps } from ".";
import { checkAccessibility } from "../../../playwright/support/helper";

import { CHARACTERS } from "../../../playwright/support/constants";
import { stepSequenceDataComponentItem } from "../../../playwright/components/step-sequence";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("tests for StepSequence component", () => {
  testData.forEach((ariaLabel) => {
    test(`should check ariaLabel is set to ${ariaLabel}`, async ({
      mount,
      page,
    }) => {
      await mount(<StepSequenceItemCustom aria-label={ariaLabel} />);
      await expect(stepSequenceDataComponentItem(page)).toHaveAttribute(
        "aria-label",
        ariaLabel,
      );
    });
  });

  testData.forEach((hiddenCompleteLabel) => {
    test(`should check hiddenCompleteLabel is set to ${hiddenCompleteLabel}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <StepSequenceItemCustom
          status="complete"
          hiddenCompleteLabel={hiddenCompleteLabel}
        />,
      );

      const expectedLabelChild = stepSequenceDataComponentItem(page)
        .locator("span")
        .nth(0);
      await expect(expectedLabelChild).toHaveText(hiddenCompleteLabel);
    });
  });

  testData.forEach((hiddenCurrentLabel) => {
    test(`should check hiddenCurrentLabel is set to ${hiddenCurrentLabel}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <StepSequenceItemCustom
          status="current"
          hiddenCurrentLabel={hiddenCurrentLabel}
        />,
      );
      const expectedLabelChild = stepSequenceDataComponentItem(page)
        .locator("span")
        .nth(0);
      await expect(expectedLabelChild).toHaveText(hiddenCurrentLabel);
    });
  });
});

test.describe("Accessibility tests for StepSequence component", () => {
  ["horizontal", "vertical"].forEach((orientation) => {
    test(`should check orientation is set to ${orientation}`, async ({
      mount,
      page,
    }) => {
      await mount(<StepSequenceComponent orientation={orientation} />);

      await checkAccessibility(page);
    });
  });

  test("should check children for accessibility tests", async ({
    mount,
    page,
  }) => {
    await mount(<StepSequenceItemCustom />);

    await checkAccessibility(page);
  });

  test("should check indicator for accessibility", async ({ mount, page }) => {
    await mount(<StepSequenceItemCustom status="incomplete" indicator="1" />);
    await checkAccessibility(page);
  });

  test("should check ariaLabel for accessibility", async ({ mount, page }) => {
    await mount(<StepSequenceItemCustom aria-label="Step 1 of 5" />);
    await checkAccessibility(page);
  });

  (
    ["complete", "current", "incomplete"] as StepSequenceItemProps["status"][]
  ).forEach((status) => {
    test(`should check status is set to ${status}`, async ({ mount, page }) => {
      await mount(<StepSequenceItemCustom status={status} />);
      await checkAccessibility(page);
    });
  });

  test("should check hiddenCompleteLabel for accessibility", async ({
    mount,
    page,
  }) => {
    await mount(
      <StepSequenceItemCustom
        status="complete"
        hiddenCompleteLabel="Complete"
      />,
    );
    await checkAccessibility(page);
  });

  test("should check hiddenCurrentLabel for accessibility", async ({
    mount,
    page,
  }) => {
    await mount(
      <StepSequenceItemCustom status="current" hiddenCurrentLabel="Current" />,
    );
    await checkAccessibility(page);
  });

  (
    ["complete", "current", "incomplete"] as StepSequenceItemProps["status"][]
  ).forEach((status) => {
    test(`should check hideIndicator prop when status is set to ${status}`, async ({
      mount,
      page,
    }) => {
      await mount(<StepSequenceItemCustom status={status} hideIndicator />);
      await checkAccessibility(page);
    });
  });
});

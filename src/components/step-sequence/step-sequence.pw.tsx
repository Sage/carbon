import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  StepSequenceComponent,
  StepSequenceItemCustom,
} from "./components.test-pw";

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
      await mount(
        <StepSequenceItemCustom
          stepNumber={1}
          title="Test"
          aria-label={ariaLabel}
        />,
      );
      await expect(stepSequenceDataComponentItem(page)).toHaveAttribute(
        "aria-label",
        ariaLabel,
      );
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
    await mount(<StepSequenceItemCustom stepNumber={1} title="Test" />);

    await checkAccessibility(page);
  });
});

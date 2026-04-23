import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import {
  StepSequenceComponent,
  StepSequenceItemCustom,
} from "./components.test-pw";

import { StepSequenceItemProps } from ".";
import { checkAccessibility } from "../../../playwright/support/helper";

import { CHARACTERS } from "../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

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

  ["-100", "0", "999", testData[0], testData[1]].forEach((indicator) => {
    test(`should check indicator is set to ${indicator}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <StepSequenceItemCustom status="incomplete" indicator={indicator} />,
      );
      await checkAccessibility(page);
    });
  });

  testData.forEach((ariaLabel) => {
    test(`should check ariaLabel is set to ${ariaLabel}`, async ({
      mount,
      page,
    }) => {
      await mount(<StepSequenceItemCustom aria-label={ariaLabel} />);
      await checkAccessibility(page);
    });
  });

  (
    ["complete", "current", "incomplete"] as StepSequenceItemProps["status"][]
  ).forEach((status) => {
    test(`should check status is set to ${status}`, async ({ mount, page }) => {
      await mount(<StepSequenceItemCustom status={status} />);
      await checkAccessibility(page);
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
      await checkAccessibility(page);
    });
  });

  testData.forEach((hiddenCurrentLabel) => {
    test(`should check hiddenCurrentLabel is set to ${hiddenCurrentLabel}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <StepSequenceItemCustom
          status="complete"
          hiddenCurrentLabel={hiddenCurrentLabel}
        />,
      );
      await checkAccessibility(page);
    });
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

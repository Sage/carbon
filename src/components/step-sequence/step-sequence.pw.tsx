import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  StepSequenceComponent,
  StepSequenceItemCustom,
} from "./components.test-pw";

import { StepSequenceItemProps } from ".";
import { checkAccessibility } from "../../../playwright/support/helper";
import {
  stepSequenceDataComponent,
  stepSequenceDataComponentItem,
} from "../../../playwright/components/step-sequence";

import { ICON } from "../../../playwright/components/locators";

import { CHARACTERS } from "../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("Testing StepSequence component properties", () => {
  ["horizontal", "vertical"].forEach((orientation) => {
    test(`should check orientation is set to ${orientation}`, async ({
      mount,
      page,
    }) => {
      await mount(<StepSequenceComponent orientation={orientation} />);

      await expect(stepSequenceDataComponent(page)).toHaveAttribute(
        "orientation",
        orientation,
      );

      if (orientation === "vertical") {
        await expect(stepSequenceDataComponent(page)).toHaveCSS(
          "flex-direction",
          "column",
        );
      }
    });
  });

  test("should check StepSequenceItem with children", async ({
    mount,
    page,
  }) => {
    await mount(<StepSequenceItemCustom />);

    await expect(
      stepSequenceDataComponentItem(page).locator("span").nth(1),
    ).toHaveText("Name");
  });

  ["-100", "0", "999", testData[0], testData[1]].forEach((indicator) => {
    test(`should check indicator is set to ${indicator}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <StepSequenceItemCustom status="incomplete" indicator={indicator} />,
      );
      const expectedLabelChild = stepSequenceDataComponentItem(page)
        .locator("span > span")
        .nth(0);
      await expect(expectedLabelChild).toHaveText(indicator);
    });
  });

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

  (
    [
      ["complete", "rgb(0, 138, 33)"],
      ["current", "rgba(0, 0, 0, 0.9)"],
      ["incomplete", "rgba(0, 0, 0, 0.55)"],
    ] as [StepSequenceItemProps["status"], string][]
  ).forEach(([status, color]) => {
    test(`should check status is set to ${status}`, async ({ mount, page }) => {
      await mount(<StepSequenceItemCustom status={status} />);
      await expect(stepSequenceDataComponentItem(page)).toHaveCSS(
        "color",
        color,
      );

      const expectedLabelChild = stepSequenceDataComponentItem(page)
        .locator("span > span")
        .nth(0);
      await expect(expectedLabelChild).toHaveCSS("color", color);
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

  test("should check hideIndicator prop when status is set to complete", async ({
    mount,
    page,
  }) => {
    await mount(<StepSequenceItemCustom status="complete" hideIndicator />);
    const expectedLabelChild =
      stepSequenceDataComponentItem(page).locator(ICON);
    await expect(expectedLabelChild).toBeVisible();
    await expect(stepSequenceDataComponentItem(page)).toHaveCSS(
      "color",
      "rgb(0, 138, 33)",
    );
  });

  (
    [
      ["current", "rgba(0, 0, 0, 0.9)"],
      ["incomplete", "rgba(0, 0, 0, 0.55)"],
    ] as [StepSequenceItemProps["status"], string][]
  ).forEach(([status, color]) => {
    test(`should check hideIndicator prop when status is set to ${status}`, async ({
      mount,
      page,
    }) => {
      await mount(<StepSequenceItemCustom status={status} hideIndicator />);
      const expectedLabelChild =
        stepSequenceDataComponentItem(page).locator(ICON);
      await expect(expectedLabelChild).not.toBeVisible();
      await expect(stepSequenceDataComponentItem(page)).toHaveCSS(
        "color",
        color,
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

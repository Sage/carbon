import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import { checkAccessibility } from "../../../playwright/support/helper";

import {
  RadioButtonControlled,
  RadioButtonGroupControlled,
  RadioButtonWithConditionalContent,
} from "./components.test-pw";

test("keyboard navigation works correctly in RadioButtonGroup", async ({
  mount,
  page,
}) => {
  await mount(<RadioButtonGroupControlled />);

  const radio1 = page.getByRole("radio", { name: "Radio Button 1" });
  const radio2 = page.getByRole("radio", { name: "Radio Button 2" });
  const radio3 = page.getByRole("radio", { name: "Radio Button 3" });

  await page.keyboard.press("Tab");
  await expect(radio1).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(radio2).toBeFocused();

  await page.keyboard.press("ArrowDown");
  await expect(radio3).toBeFocused();

  await page.keyboard.press("ArrowUp");
  await expect(radio2).toBeFocused();

  await page.keyboard.press("ArrowUp");
  await expect(radio1).toBeFocused();
});

test("clicking on a RadioButton selects it", async ({ mount, page }) => {
  await mount(<RadioButtonGroupControlled />);

  const radio1 = page.getByRole("radio", { name: "Radio Button 1" });
  const radio2 = page.getByRole("radio", { name: "Radio Button 2" });
  const radio3 = page.getByRole("radio", { name: "Radio Button 3" });

  await radio1.click();
  await expect(radio1).toBeChecked();
  await expect(radio2).not.toBeChecked();
  await expect(radio3).not.toBeChecked();

  await radio2.click();
  await expect(radio1).not.toBeChecked();
  await expect(radio2).toBeChecked();
  await expect(radio3).not.toBeChecked();

  await radio3.click();
  await expect(radio1).not.toBeChecked();
  await expect(radio2).not.toBeChecked();
  await expect(radio3).toBeChecked();
});

test("renders `conditionalContent` when RadioButton is selected and closes when another RadioButton is selected", async ({
  mount,
  page,
}) => {
  await mount(<RadioButtonWithConditionalContent />);

  await page.getByRole("radio", { name: "Radio Button 1" }).click();
  await expect(
    page.getByRole("textbox", { name: "Revealed Textbox" }),
  ).toBeVisible();

  await page.getByRole("radio", { name: "Radio Button 2" }).click();
  await expect(
    page.getByRole("textbox", { name: "Revealed Textbox" }),
  ).toBeHidden();
});

test.describe("Accessibility tests for RadioButton", () => {
  test("should pass accessibility when `legend` is set", async ({
    mount,
    page,
  }) => {
    await mount(<RadioButtonGroupControlled legend="Radio Group Legend" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility when `legendHint` is set", async ({
    mount,
    page,
  }) => {
    await mount(
      <RadioButtonGroupControlled
        legend="Radio Group Legend"
        legendHint="This is a hint"
      />,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility when `error` is set", async ({
    mount,
    page,
  }) => {
    await mount(
      <RadioButtonGroupControlled
        legend="Radio Group Legend"
        error="This is an error"
      />,
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility when `inputHint` is set on RadioButton", async ({
    mount,
    page,
  }) => {
    await mount(<RadioButtonControlled inputHint="This is an input hint" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility when `conditionalContent` is set on RadioButton", async ({
    mount,
    page,
  }) => {
    await mount(<RadioButtonWithConditionalContent />);

    await page.getByRole("radio", { name: "Radio Button 1" }).click();

    await expect(
      page.getByRole("textbox", { name: "Revealed Textbox" }),
    ).toBeVisible();
    await checkAccessibility(page);

    await page.getByRole("radio", { name: "Radio Button 2" }).click();
    await expect(
      page.getByRole("textbox", { name: "Revealed Textbox" }),
    ).toBeHidden();
    await checkAccessibility(page);
  });
});

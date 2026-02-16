import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { AdvancedColorPickerCustom } from "./components.test-pw";
import {
  currentColorDescription,
  advancedColorPickerCell,
  simpleColorPickerInput,
} from "../../../playwright/components/advanced-color-picker";
import {
  dialog as advancedColorPickerParent,
  dialogWithRole,
} from "../../../playwright/components/dialog/index";
import { closeIconButton } from "../../../playwright/components/index";
import { CHARACTERS } from "../../../playwright/support/constants";
import { checkAccessibility } from "../../../playwright/support/helper";

test("when AdvancedColorPicker is opened and then closed, with the `restoreFocusOnClose` prop passed as `false`, the call to action element should not be focused", async ({
  mount,
  page,
}) => {
  await mount(
    <AdvancedColorPickerCustom open={false} restoreFocusOnClose={false} />,
  );

  const initialCell = advancedColorPickerCell(page);
  const dialog = page.getByRole("dialog");
  await expect(initialCell).not.toBeFocused();
  await expect(dialog).toBeHidden();

  await initialCell.click();
  await expect(dialog).toBeVisible();
  const closeButton = page.getByLabel("Close");
  await closeButton.click();
  await expect(initialCell).not.toBeFocused();
  await expect(dialog).toBeHidden();
});

test.describe("should render AdvancedColorPicker component and check functionality", () => {
  test("should regain focus on color after second tab", async ({
    mount,
    page,
  }) => {
    await mount(<AdvancedColorPickerCustom />);

    const picker = simpleColorPickerInput(page, 7);
    const icon = closeIconButton(page);
    await picker.focus();
    await picker.press("Tab");
    await icon.press("Tab");

    await expect(simpleColorPickerInput(page, 7)).toBeFocused();
  });
});

test.describe("should render AdvancedColorPicker component and check props", () => {
  const testPropValue = CHARACTERS.STANDARD;

  test("should render AdvancedColorPicker with aria-describedby prop", async ({
    mount,
    page,
  }) => {
    await mount(<AdvancedColorPickerCustom aria-describedby={testPropValue} />);

    await expect(advancedColorPickerParent(page)).toHaveAttribute(
      "aria-describedby",
      testPropValue,
    );
  });

  test("should render AdvancedColorPicker with aria-label prop", async ({
    mount,
    page,
  }) => {
    await mount(<AdvancedColorPickerCustom aria-label={testPropValue} />);

    await expect(advancedColorPickerParent(page)).toHaveAttribute(
      "aria-label",
      testPropValue,
    );
  });

  test("should render AdvancedColorPicker open button with aria-label prop", async ({
    mount,
    page,
  }) => {
    await mount(<AdvancedColorPickerCustom aria-label="Change colour" />);

    await expect(advancedColorPickerCell(page)).toHaveAttribute(
      "aria-label",
      "Change colour",
    );
  });

  test("should render AdvancedColorPicker with aria-labelledby prop", async ({
    mount,
    page,
  }) => {
    await mount(<AdvancedColorPickerCustom aria-labelledby={testPropValue} />);

    await expect(advancedColorPickerParent(page)).toHaveAttribute(
      "aria-labelledby",
      testPropValue,
    );
  });

  test("should render AdvancedColorPicker with role prop", async ({
    mount,
    page,
  }) => {
    await mount(<AdvancedColorPickerCustom role={testPropValue} />);

    await expect(dialogWithRole(page, testPropValue)).toHaveAttribute(
      "role",
      testPropValue,
    );
  });

  test("should render AdvancedColorPicker with name prop passed to color", async ({
    mount,
    page,
  }) => {
    await mount(<AdvancedColorPickerCustom name="playwrightTestColorName" />);

    await expect(simpleColorPickerInput(page, 6)).toHaveAttribute(
      "name",
      "playwrightTestColorName",
    );
  });

  test("should render AdvancedColorPicker with correct description when color is selected", async ({
    mount,
    page,
  }) => {
    await mount(<AdvancedColorPickerCustom />);

    await expect(currentColorDescription(page)).toContainText(
      "Current colour assigned: orchid",
    );
  });
});

test.describe("Accessibility tests for AdvancedColorPicker component", () => {
  test("should pass accessibility tests for AdvancedColorPicker default", async ({
    mount,
    page,
  }) => {
    await mount(<AdvancedColorPickerCustom />);

    await checkAccessibility(page);
  });
});

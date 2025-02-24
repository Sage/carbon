import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { AdvancedColorPickerCustom } from "./components.test-pw";
import {
  currentColorDescription,
  advancedColorPickerCell,
  simpleColorPickerInput,
  simpleColorPickerComponent,
  advancedColorPickerPreview,
} from "../../../playwright/components/advanced-color-picker";
import { alertDialogPreview as advancedColorPickerParent } from "../../../playwright/components/dialog/index";
import { closeIconButton } from "../../../playwright/components/index";
import { CHARACTERS } from "../../../playwright/support/constants";
import { checkAccessibility } from "../../../playwright/support/helper";

// TODO: Skipped due to flaky focus behaviour. To review in FE-6428
test.skip("should have the expected styling when focused", async ({
  mount,
  page,
}) => {
  await mount(<AdvancedColorPickerCustom open />);

  const icon = closeIconButton(page);
  await icon.focus();
  await expect(closeIconButton(page)).toHaveCSS(
    "box-shadow",
    "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
  );
  await expect(closeIconButton(page)).toHaveCSS(
    "outline",
    "rgba(0, 0, 0, 0) solid 3px",
  );
});

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
  await expect(dialog).not.toBeVisible();

  await initialCell.click();
  await expect(dialog).toBeVisible();
  const closeButton = page.getByLabel("Close");
  await closeButton.click();
  await expect(initialCell).not.toBeFocused();
  await expect(dialog).not.toBeVisible();
});

test.describe("should render AdvancedColorPicker component and check functionality", () => {
  (
    [
      ["ArrowUp", 2],
      ["ArrowLeft", 6],
      ["ArrowRight", 8],
    ] as [string, number][]
  ).forEach(([key, index]) => {
    test(`should use ${key} key and move selection`, async ({
      mount,
      page,
    }) => {
      await mount(<AdvancedColorPickerCustom />);

      const picker = simpleColorPickerInput(page, 7);
      await picker.press(key);
      await expect(simpleColorPickerInput(page, index)).toBeChecked();
    });
  });

  test("should move selection down using downarrow", async ({
    mount,
    page,
  }) => {
    await mount(<AdvancedColorPickerCustom />);

    const picker = simpleColorPickerInput(page, 7);
    await picker.press("ArrowUp");
    const newPicker = simpleColorPickerInput(page, 2);
    await newPicker.press("ArrowDown");
    await expect(simpleColorPickerInput(page, 7)).toBeChecked();
  });

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

  (["Space", "Enter"] as const).forEach((key) => {
    test(`should close AdvancedColorPicker using ${key} on selected color`, async ({
      mount,
      page,
    }) => {
      await mount(<AdvancedColorPickerCustom />);

      const picker = simpleColorPickerInput(page, 7);
      await picker.press(key);
      await expect(simpleColorPickerComponent(page)).not.toBeVisible();
    });
  });

  [1, 2, 3].forEach((index) => {
    test(`should confirm dedicated ${index} color was selected`, async ({
      mount,
      page,
    }) => {
      await mount(<AdvancedColorPickerCustom />);

      const input = simpleColorPickerInput(page, index);
      await input.click();
      await expect(simpleColorPickerInput(page, index)).toBeChecked();
    });
  });
});

test.describe("should render AdvancedColorPicker component and check props", () => {
  const testPropValue = CHARACTERS.STANDARD;
  const colors = [
    { value: "#111222", label: "superBlack" },
    { value: "#333555", label: "black" },
  ];

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

    await expect(advancedColorPickerParent(page)).toHaveAttribute(
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

  test("should render AdvancedColorPicker with availableColors prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <AdvancedColorPickerCustom
        availableColors={colors}
        selectedColor="#111222"
      />,
    );

    await expect(simpleColorPickerInput(page, 0)).toHaveAttribute(
      "value",
      colors[0].value,
    );
    await expect(simpleColorPickerInput(page, 0)).toHaveAttribute(
      "aria-label",
      colors[0].label,
    );
    await expect(simpleColorPickerInput(page, 1)).toHaveAttribute(
      "value",
      colors[1].value,
    );
    await expect(simpleColorPickerInput(page, 1)).toHaveAttribute(
      "aria-label",
      colors[1].label,
    );
  });

  test("should render AdvancedColorPicker with selectedColor prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <AdvancedColorPickerCustom
        availableColors={colors}
        selectedColor="#333555"
      />,
    );

    await expect(simpleColorPickerInput(page, 1)).toHaveAttribute(
      "value",
      colors[1].value,
    );
    await expect(simpleColorPickerInput(page, 1)).toHaveAttribute(
      "aria-label",
      colors[1].label,
    );
  });

  test("should render AdvancedColorPicker with defaultColor prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <AdvancedColorPickerCustom
        availableColors={colors}
        defaultColor="#111222"
      />,
    );

    await expect(advancedColorPickerPreview(page)).toHaveAttribute(
      "color",
      colors[0].value,
    );
  });

  [true, false].forEach((bool) => {
    test(`should render AdvancedColorPicker with open prop set to ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(<AdvancedColorPickerCustom open={bool} />);

      if (bool) {
        await expect(advancedColorPickerParent(page)).toBeVisible();
      } else {
        await expect(advancedColorPickerParent(page)).not.toBeVisible();
      }
    });
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

test("color picker preview should have the expected border radius styling", async ({
  mount,
  page,
}) => {
  await mount(<AdvancedColorPickerCustom />);
  await expect(advancedColorPickerPreview(page)).toHaveCSS(
    "border-radius",
    "4px",
  );
});

import React from "react";
import { test, expect } from "../../../../../playwright/helpers/base-test";
import { SwitchProps } from ".";
import { SwitchComponent, WithMargin } from "./components.test-pw";
import {
  switchDataComponent,
  switchInput,
  switchLabel,
} from "../../../../../playwright/components/switch/index";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
} from "../../../../../playwright/support/helper";
import { CHARACTERS, SIZE } from "../../../../../playwright/support/constants";

test.describe("Prop tests for next Switch component", () => {
  [
    CHARACTERS.STANDARD,
    CHARACTERS.DIACRITICS,
    CHARACTERS.SPECIALCHARACTERS,
  ].forEach((label) => {
    test(`should render with ${label} as label`, async ({ mount, page }) => {
      await mount(<SwitchComponent label={label} />);

      await expect(switchLabel(page)).toHaveText(label);
    });
  });

  test("should render with autoFocus prop", async ({ mount, page }) => {
    await mount(<SwitchComponent autoFocus />);

    await expect(switchInput(page)).toBeFocused();
  });

  test("should render with checked state set to true", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent checked />);

    await expect(switchInput(page)).toBeChecked();
  });

  test("should render with checked state set to false", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent checked={false} />);

    await expect(switchInput(page)).not.toBeChecked();
  });

  test("should render with disabled set to true", async ({ mount, page }) => {
    await mount(<SwitchComponent disabled />);

    await expect(switchInput(page)).toBeDisabled();
    await expect(switchLabel(page)).toBeDisabled();
  });

  test("should render with disabled set to false", async ({ mount, page }) => {
    await mount(<SwitchComponent disabled={false} />);

    await expect(switchInput(page)).toBeEnabled();
    await expect(switchLabel(page)).toBeEnabled();
  });

  test("should render properly with loading prop set to true", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent loading checked={false} />);

    await expect(switchInput(page)).toBeDisabled();
    await expect(page.locator('[data-role="switch-loader"]')).toBeVisible();
  });

  test("should render properly with loading prop set to false", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent loading={false} checked={false} />);

    await expect(switchInput(page)).toBeEnabled();
    await expect(page.locator('[data-role="switch-loader"]')).toBeHidden();
  });

  test("should render with data-element", async ({ mount, page }) => {
    await mount(<SwitchComponent data-element={CHARACTERS.STANDARD} />);

    await expect(switchDataComponent(page)).toHaveAttribute(
      "data-element",
      CHARACTERS.STANDARD,
    );
  });

  test("should render with data-role", async ({ mount, page }) => {
    await mount(<SwitchComponent data-role={CHARACTERS.STANDARD} />);

    await expect(switchDataComponent(page)).toHaveAttribute(
      "data-role",
      CHARACTERS.STANDARD,
    );
  });

  test("should render with id", async ({ mount, page }) => {
    await mount(<SwitchComponent id={CHARACTERS.STANDARD} />);

    await expect(switchInput(page)).toHaveId(CHARACTERS.STANDARD);
  });

  test("should render with name", async ({ mount, page }) => {
    await mount(<SwitchComponent name={CHARACTERS.STANDARD} />);

    await expect(switchInput(page)).toHaveAttribute(
      "name",
      CHARACTERS.STANDARD,
    );
  });

  test("should render with value", async ({ mount, page }) => {
    await mount(<SwitchComponent value="switchvalue" />);

    await expect(switchInput(page)).toHaveValue("switchvalue");
  });

  (
    [
      [SIZE.SMALL, 40, 24],
      [SIZE.LARGE, 72, 40],
    ] as [SwitchProps["size"], number, number][]
  ).forEach(([size, width, height]) => {
    test(`should render with size set to ${size}`, async ({ mount, page }) => {
      await mount(<SwitchComponent size={size} />);

      await assertCssValueIsApproximately(switchInput(page), "height", height);
      await assertCssValueIsApproximately(switchInput(page), "width", width);
    });
  });

  [true, false].forEach((boolVal) => {
    test(`should render with labelInline set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent labelInline={boolVal} />);

      await expect(switchDataComponent(page)).toHaveCSS(
        "flex-direction",
        boolVal ? "row" : "column",
      );
    });
  });

  (
    [
      [1, 8],
      [2, 16],
    ] as [SwitchProps["labelSpacing"], number][]
  ).forEach(([spacing, expectedMargin]) => {
    test(`should render with labelSpacing set to ${spacing} when labelInline`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SwitchComponent labelInline label="Label" labelSpacing={spacing} />,
      );

      await assertCssValueIsApproximately(
        switchLabel(page),
        "margin-right",
        expectedMargin,
      );
    });
  });

  ([10, 30, 80] as SwitchProps["labelWidth"][]).forEach((labelWidth) => {
    test(`should render with labelWidth set to ${labelWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <div style={{ width: "1000px" }}>
          <SwitchComponent labelInline labelWidth={labelWidth} />
        </div>,
      );

      await assertCssValueIsApproximately(
        switchLabel(page),
        "width",
        (labelWidth as number) * 10,
      );
    });
  });

  (
    [
      [399, "row"],
      [400, "row"],
      [401, "column"],
    ] as [number, string][]
  ).forEach(([breakpoint, expectedDirection]) => {
    test(`should render properly with adaptiveLabelBreakpoint set to ${breakpoint}`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({ width: 400, height: 300 });

      await mount(
        <SwitchComponent
          labelInline
          adaptiveLabelBreakpoint={breakpoint as number}
        />,
      );

      await expect(switchDataComponent(page)).toHaveCSS(
        "flex-direction",
        expectedDirection,
      );
    });
  });

  [
    CHARACTERS.STANDARD,
    CHARACTERS.DIACRITICS,
    CHARACTERS.SPECIALCHARACTERS,
  ].forEach((hint) => {
    test(`should render with inputHint "${hint}"`, async ({ mount, page }) => {
      await mount(<SwitchComponent inputHint={hint} />);

      await expect(page.locator('[data-element="input-hint"]')).toHaveText(
        hint,
      );
    });
  });

  test("should render with custom processingLabel when loading", async ({
    mount,
    page,
  }) => {
    await mount(
      <SwitchComponent
        loading
        processingLabel="Please wait..."
        checked={false}
      />,
    );

    await expect(page.getByText("Please wait...")).toBeVisible();
  });

  test("label should have margin-bottom of 3px when no inputHint", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent />);

    await expect(switchLabel(page)).toHaveCSS("margin-bottom", "3px");
  });

  test("label should not have margin-bottom when inputHint is provided", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent inputHint="Some hint text" />);

    await expect(switchLabel(page)).toHaveCSS("margin-bottom", "0px");
  });

  test("label should not have margin-bottom when labelInline is true", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent labelInline />);

    await expect(switchLabel(page)).toHaveCSS("margin-bottom", "0px");
  });

  test("renders with the expected border radius on track", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent />);

    await expect(switchDataComponent(page).locator("div").nth(1)).toHaveCSS(
      "border-radius",
      "999px",
    );
  });
});

test.describe("Event tests", () => {
  test("should call onChange callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;

    await mount(
      <SwitchComponent
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    await switchInput(page).click();

    expect(callbackCount).toBe(1);
  });

  test("should call onBlur callback when a blur event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;

    await mount(
      <SwitchComponent
        onBlur={() => {
          callbackCount += 1;
        }}
      />,
    );

    await switchInput(page).focus();
    await switchInput(page).blur();

    expect(callbackCount).toBe(1);
  });

  test("should call onFocus callback when a focus event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;

    await mount(
      <SwitchComponent
        onFocus={() => {
          callbackCount += 1;
        }}
      />,
    );

    await switchInput(page).focus();

    expect(callbackCount).toBe(1);
  });
});

test.describe("Accessibility tests", () => {
  [
    CHARACTERS.STANDARD,
    CHARACTERS.DIACRITICS,
    CHARACTERS.SPECIALCHARACTERS,
  ].forEach((label) => {
    test(`check accessibility with ${label} as label`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent label={label} />);

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((boolVal) => {
    test(`check accessibility when loading prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent loading={boolVal} checked={false} />);

      await checkAccessibility(page);
    });
  });

  test("check accessibility with data-element prop set", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent data-element={CHARACTERS.STANDARD} />);

    await checkAccessibility(page);
  });

  test("check accessibility with data-role prop set", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent data-role={CHARACTERS.STANDARD} />);

    await checkAccessibility(page);
  });

  test("check accessibility with autoFocus prop set", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent autoFocus />);

    await checkAccessibility(page);
  });

  [true, false].forEach((boolVal) => {
    test(`check accessibility with checked set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent checked={boolVal} />);

      await checkAccessibility(page);
    });
  });

  test("check accessibility with disabled set to true", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent disabled />);

    // Disabled UI components are exempt from WCAG colour-contrast requirements
    await checkAccessibility(page, undefined, "color-contrast");
  });

  test("check accessibility with disabled set to false", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent disabled={false} />);

    await checkAccessibility(page);
  });

  test("check accessibility with id prop set", async ({ mount, page }) => {
    await mount(<SwitchComponent id={CHARACTERS.STANDARD} />);

    await checkAccessibility(page);
  });

  [true, false].forEach((boolVal) => {
    test(`check accessibility when labelInline is set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent labelInline={boolVal} />);

      await checkAccessibility(page);
    });
  });

  ([10, 30, 80] as SwitchProps["labelWidth"][]).forEach((labelWidth) => {
    test(`check accessibility with labelWidth set to ${labelWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent labelInline labelWidth={labelWidth} />);

      await checkAccessibility(page);
    });
  });

  ([1, 2] as SwitchProps["labelSpacing"][]).forEach((spacing) => {
    test(`check accessibility with labelSpacing set to ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SwitchComponent labelInline label="label" labelSpacing={spacing} />,
      );

      await checkAccessibility(page);
    });
  });

  test("check accessibility with name prop", async ({ mount, page }) => {
    await mount(<SwitchComponent name={CHARACTERS.STANDARD} />);

    await checkAccessibility(page);
  });

  ([SIZE.SMALL, SIZE.LARGE] as SwitchProps["size"][]).forEach((size) => {
    test(`check accessibility with size set to ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent size={size} />);

      await checkAccessibility(page);
    });
  });

  test("check accessibility with value prop", async ({ mount, page }) => {
    await mount(<SwitchComponent value="switchvalue" />);

    await checkAccessibility(page);
  });

  [399, 400, 401].forEach((breakpoint) => {
    test(`check accessibility when label is inline with adaptiveLabelBreakpoint set to ${breakpoint}`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({ width: 400, height: 300 });

      await mount(
        <SwitchComponent labelInline adaptiveLabelBreakpoint={breakpoint} />,
      );

      await checkAccessibility(page);
    });
  });

  [
    CHARACTERS.STANDARD,
    CHARACTERS.DIACRITICS,
    CHARACTERS.SPECIALCHARACTERS,
  ].forEach((hint) => {
    test(`check accessibility with inputHint set to ${hint}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent inputHint={hint} />);

      await checkAccessibility(page);
    });
  });

  test("check accessibility with processingLabel prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <SwitchComponent
        loading
        processingLabel="Please wait..."
        checked={false}
      />,
    );

    await checkAccessibility(page);
  });

  test("check accessibility with processingLabelBelowSwitch prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <SwitchComponent loading processingLabelBelowSwitch checked={false} />,
    );

    await checkAccessibility(page);
  });

  test("check accessibility for WithMargin example", async ({
    mount,
    page,
  }) => {
    await mount(<WithMargin />);

    await checkAccessibility(page);
  });
});

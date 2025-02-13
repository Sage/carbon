import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import Box from "../box";
import Switch, { SwitchProps } from ".";
import {
  SwitchComponent,
  SwitchComponentValidations,
  WithMargin,
} from "./components.test-pw";
import {
  switchDataComponent,
  switchInput,
  switchStyling,
  switchLabel,
  switchLabelParent,
  switchIcon,
  switchHelpIcon,
  switchFieldHelp,
} from "../../../playwright/components/switch/index";
import {
  getComponent,
  fieldHelpPreview,
  tooltipPreview,
  getDataElementByValue,
  getDataRoleByValue,
} from "../../../playwright/components/index";
import {
  assertCssValueIsApproximately,
  verifyRequiredAsteriskForLabel,
  checkAccessibility,
} from "../../../playwright/support/helper";
import {
  CHARACTERS,
  VALIDATION,
  SIZE,
} from "../../../playwright/support/constants";

const testData = CHARACTERS.STANDARD;

test.describe("Prop tests for Switch component", () => {
  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("should have the expected styling when focused", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent />);

    await switchInput(page).click();

    await expect(switchStyling(page)).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );

    await expect(switchStyling(page)).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
  });

  [
    CHARACTERS.STANDARD,
    CHARACTERS.DIACRITICS,
    CHARACTERS.SPECIALCHARACTERS,
  ].forEach((fieldHelp) => {
    test(`should render with ${fieldHelp} as fieldHelp`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent fieldHelp={fieldHelp} />);

      await expect(fieldHelpPreview(page)).toHaveText(fieldHelp);
    });
  });

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

  [true, false].forEach((boolVal) => {
    test(`should render properly with loading prop set as ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent loading={boolVal} />);

      if (boolVal) {
        await expect(switchInput(page)).toBeDisabled();

        await expect(
          getDataRoleByValue(page, "switch-slider-loader"),
        ).toBeVisible();
      } else {
        await expect(switchInput(page)).not.toBeDisabled();
      }
    });
  });

  test("should render with data-component", async ({ mount, page }) => {
    await mount(<SwitchComponent data-component={CHARACTERS.STANDARD} />);

    await expect(getComponent(page, CHARACTERS.STANDARD)).toHaveAttribute(
      "data-component",
      CHARACTERS.STANDARD,
    );
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

  test("should render with autoFocus prop", async ({ mount, page }) => {
    await mount(<SwitchComponent autoFocus />);

    await expect(switchInput(page)).toBeFocused();
  });

  [true, false].forEach((boolVal) => {
    test(`should render with checked state set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent checked={boolVal} />);

      if (boolVal) {
        await expect(switchInput(page)).toBeChecked();
      } else {
        await expect(switchInput(page)).not.toBeChecked();
      }
    });
  });

  [true, false].forEach((boolVal) => {
    test(`should check with disabled state set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent disabled={boolVal} />);

      if (boolVal) {
        await expect(switchInput(page)).toBeDisabled();

        await expect(switchLabel(page)).toBeDisabled();
      } else {
        await expect(switchInput(page)).not.toBeDisabled();

        await expect(switchLabel(page)).not.toBeDisabled();
      }
    });
  });

  [true, false].forEach((boolVal) => {
    test(`should render with fieldHelpInline set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SwitchComponent
          fieldHelp="Inline fieldhelp"
          fieldHelpInline={boolVal}
        />,
      );

      await expect(switchFieldHelp(page)).toHaveAttribute(
        "data-element",
        "help",
      );
    });
  });

  test("should render with id", async ({ mount, page }) => {
    await mount(<SwitchComponent id={CHARACTERS.STANDARD} />);

    await expect(switchInput(page)).toHaveId(CHARACTERS.STANDARD);
  });

  (
    [
      [true, 24, 0, 8],
      [false, 16, 8, 0],
    ] as [SwitchProps["labelInline"], number, number, number][]
  ).forEach(([boolVal, height, margin, padding]) => {
    test(`should render with labelInline prop set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent labelInline={boolVal} />);

      if (boolVal) {
        await expect(switchLabelParent(page)).toHaveCSS(
          "box-sizing",
          "border-box",
        );
      } else {
        await expect(switchLabelParent(page)).not.toHaveCSS(
          "box-sizing",
          "border-box",
        );
      }
      await assertCssValueIsApproximately(
        switchLabelParent(page),
        "height",
        height,
      );

      await assertCssValueIsApproximately(
        switchLabelParent(page),
        "margin-bottom",
        margin,
      );

      await assertCssValueIsApproximately(
        switchLabelParent(page),
        "padding-right",
        padding,
      );
    });
  });

  (
    [
      [10, 130],
      [30, 390],
      [80, 1041],
    ] as [SwitchProps["labelWidth"], number][]
  ).forEach(([labelWidth, labelRatio]) => {
    test(`should render with labelWidth prop set to ${labelWidth} and with correct label width ratio`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent labelWidth={labelWidth} />);

      const label = switchLabelParent(page);
      await assertCssValueIsApproximately(label, "width", labelRatio);
    });
  });

  (
    [
      [90, 1171],
      [70, 911],
      [20, 260],
    ] as [SwitchProps["inputWidth"], number][]
  ).forEach(([inputWidth, inputRatio]) => {
    test(`should render with inputWidth prop set to ${inputWidth} and with correct input width ratio`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent labelInline inputWidth={inputWidth} />);

      const input = switchStyling(page);
      await assertCssValueIsApproximately(input, "width", inputRatio);
    });
  });

  test("should render with labelHelp", async ({ mount, page }) => {
    await mount(
      <SwitchComponent label="Label For Switch" labelHelp="Label Help" />,
    );

    await switchIcon(page).hover();

    await expect(tooltipPreview(page)).toHaveText("Label Help");
  });

  (
    [
      [1, 8],
      [2, 17],
    ] as [SwitchProps["labelSpacing"], number][]
  ).forEach(([spacing, padding]) => {
    test(`should render with labelSpacing prop set to ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SwitchComponent labelInline label="label" labelSpacing={spacing} />,
      );

      await assertCssValueIsApproximately(
        switchLabelParent(page),
        "padding-right",
        padding,
      );
    });
  });

  test("should render with name", async ({ mount, page }) => {
    await mount(<SwitchComponent name={CHARACTERS.STANDARD} />);

    await expect(switchInput(page)).toHaveAttribute(
      "name",
      CHARACTERS.STANDARD,
    );
  });

  test("should render with error", async ({ mount, page }) => {
    await mount(<SwitchComponent error />);

    const boxSvg = switchStyling(page);
    await expect(boxSvg).toHaveCSS("border-color", VALIDATION.ERROR);
  });

  test("should render with warning", async ({ mount, page }) => {
    await mount(<SwitchComponent warning />);

    const boxSvg = switchStyling(page);
    await expect(boxSvg).toHaveCSS("border-color", VALIDATION.WARNING);
  });

  test("should render with info", async ({ mount, page }) => {
    await mount(<SwitchComponent info />);

    const boxSvg = switchStyling(page);
    await expect(boxSvg).toHaveCSS("border-color", "rgb(102, 132, 148)");
  });

  ["error", "warning", "info"].forEach((validation) => {
    test(`should render with ${validation} validation icon`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponentValidations />);

      const validate = getDataElementByValue(page, validation);
      await expect(validate).toHaveAttribute("data-component", "icon");
    });
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`should render with ${type} validation as tooltip message`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponentValidations />);

      await getDataElementByValue(page, type).hover();
      await expect(tooltipPreview(page)).toHaveText(type);
    });
  });

  ["error", "warning", "info"].forEach((validation) => {
    test(`should render with validation on label as ${validation}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponentValidations validationOnLabel />);

      const validate = getDataElementByValue(page, validation);
      await expect(validate).toHaveAttribute("data-component", "icon");
    });
  });

  [true, false].forEach((boolVal) => {
    test(`should render with reverse set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent reverse={boolVal} />);

      if (boolVal) {
        const switchWithLabel = page.locator('[data-element="label"]');

        await expect(switchWithLabel).not.toHaveAttribute("role", "switch");
      } else {
        await expect(switchInput(page)).not.toHaveAttribute(
          "data-element",
          "label",
        );

        await expect(switchInput(page)).toHaveAttribute("role", "switch");
      }
    });
  });

  (
    [
      [SIZE.SMALL, 65, 24],
      [SIZE.LARGE, 83, 44],
    ] as [SwitchProps["size"], number, number][]
  ).forEach(([size, width, height]) => {
    test(`should render with size set to ${size}`, async ({ mount, page }) => {
      await mount(<SwitchComponent size={size} />);

      await assertCssValueIsApproximately(switchInput(page), "height", height);

      await assertCssValueIsApproximately(switchInput(page), "width", width);
    });
  });

  test("should render with value prop", async ({ mount, page }) => {
    await mount(<SwitchComponent value="switchvalue" />);

    await expect(switchInput(page)).toHaveValue("switchvalue");
  });

  [
    [399, 24],
    [400, 24],
    [401, 16],
  ].forEach(([breakpoint, height]) => {
    test(`should render properly with adaptiveLabelBreakpoint set to ${breakpoint}`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({ width: 400, height: 300 });

      await mount(
        <SwitchComponent labelInline adaptiveLabelBreakpoint={breakpoint} />,
      );

      if (breakpoint <= 400) {
        await expect(switchLabelParent(page)).toHaveCSS(
          "box-sizing",
          "border-box",
        );
      } else {
        await expect(switchLabelParent(page)).not.toHaveCSS(
          "box-sizing",
          "border-box",
        );
      }

      await assertCssValueIsApproximately(
        switchLabelParent(page),
        "height",
        height,
      );
    });
  });

  test("verify Switch component as a required field", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent required />);

    await verifyRequiredAsteriskForLabel(page);
  });

  (
    ["bottom", "left", "right", "top"] as SwitchProps["tooltipPosition"][]
  ).forEach((position) => {
    test(`should render with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box m="250px">
          <SwitchComponent labelHelp="Switch info" tooltipPosition={position} />
        </Box>,
      );

      await switchIcon(page).hover();

      await expect(tooltipPreview(page)).toHaveText("Switch info");

      await expect(tooltipPreview(page)).toHaveAttribute(
        "data-placement",
        `${position}`,
      );
    });
  });

  test("should render with helpAriaLabel", async ({ mount, page }) => {
    await mount(
      <SwitchComponent
        labelHelp="Label Help"
        helpAriaLabel="This text provides more information for the label"
      />,
    );

    await switchIcon(page).hover();
    await expect(switchHelpIcon(page)).toHaveAttribute(
      "aria-label",
      "This text provides more information for the label",
    );
  });

  [true, false].forEach((boolVal) => {
    test(`should have proper state when defaultChecked set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Switch label="Label" name="switch-name" defaultChecked={boolVal} />,
      );

      if (boolVal) {
        await expect(switchStyling(page).locator("div")).toHaveAttribute(
          "type",
          "on",
        );
      } else {
        await expect(switchStyling(page).locator("div")).toHaveAttribute(
          "type",
          "off",
        );
      }
    });
  });

  test("renders with the expected border radius", async ({ mount, page }) => {
    await mount(<SwitchComponent />);

    await expect(switchStyling(page)).toHaveCSS("border-radius", "32px");
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

  // skipped because of https://jira.sage.com/browse/FE-5534
  test.skip("should call onChange callback when a keyboard event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <SwitchComponent
        autoFocus
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    await switchInput(page).focus();

    await page.keyboard.down("Space");

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

  test("should call onClick callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <SwitchComponent
        onClick={() => {
          callbackCount += 1;
        }}
      />,
    );

    await switchInput(page).click();
    expect(callbackCount).toBe(1);
  });
});

test.describe("Accessibility tests", () => {
  [
    CHARACTERS.STANDARD,
    CHARACTERS.DIACRITICS,
    CHARACTERS.SPECIALCHARACTERS,
  ].forEach((fieldHelp) => {
    test(`check accessibility with ${fieldHelp} as fieldHelp`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent fieldHelp={fieldHelp} />);

      await checkAccessibility(page);
    });
  });

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
      await mount(<SwitchComponent loading={boolVal} />);

      await checkAccessibility(page);
    });
  });

  test("check accessibility with data-component prop set", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponent data-component={CHARACTERS.STANDARD} />);

    await checkAccessibility(page);
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
    test(`check accessibility with checked prop set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent checked={boolVal} />);

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((boolVal) => {
    test(`check accessibility with disabled prop set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent disabled={boolVal} />);

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((boolVal) => {
    test(`check accessibility with inline fieldHelp prop set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SwitchComponent
          fieldHelp="Inline fieldhelp"
          fieldHelpInline={boolVal}
        />,
      );

      await checkAccessibility(page);
    });
  });

  test("check accessibility with id prop set", async ({ mount, page }) => {
    await mount(<SwitchComponent id={CHARACTERS.STANDARD} />);

    await checkAccessibility(page);
  });

  [true, false].forEach((boolVal) => {
    test(`check accessibility when labelInline prop is set to ${boolVal}`, async ({
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
      await mount(<SwitchComponent labelWidth={labelWidth} />);

      await checkAccessibility(page);
    });
  });

  ([90, 70, 20] as SwitchProps["inputWidth"][]).forEach((inputWidth) => {
    test(`check accessibility with inputWidth set to ${inputWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent labelInline inputWidth={inputWidth} />);

      await checkAccessibility(page);
    });
  });

  test("check accessibility with labelHelp", async ({ mount, page }) => {
    await mount(
      <SwitchComponent label="Label For Switch" labelHelp="Label Help" />,
    );

    await checkAccessibility(page);
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

  test("check accessibility with validation prop", async ({ mount, page }) => {
    await mount(<SwitchComponentValidations />);

    await checkAccessibility(page);
  });

  test("check accessibility with validation on label", async ({
    mount,
    page,
  }) => {
    await mount(<SwitchComponentValidations validationOnLabel />);

    await checkAccessibility(page);
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`check accessibility with validations set to ${type} as string`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent {...{ [type]: "Message" }} />);

      await checkAccessibility(page);
    });
  });

  (
    ["top", "bottom", "left", "right"] as SwitchProps["tooltipPosition"][]
  ).forEach((tooltipPositionValue) => {
    test(`check accessibility with tooltip set to ${tooltipPositionValue} position`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box width="700px" height="108px">
          <Box p="100px">
            <SwitchComponent
              error={testData}
              tooltipPosition={tooltipPositionValue}
            />
          </Box>
        </Box>,
      );

      await checkAccessibility(page);
    });
  });

  [true, false].forEach((boolVal) => {
    test(`check accessibility with reverse set to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent reverse={boolVal} />);

      await checkAccessibility(page);
    });
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

  test("check accessibility with required prop", async ({ mount, page }) => {
    await mount(<SwitchComponent required />);

    await checkAccessibility(page);
  });

  (
    ["bottom", "left", "right", "top"] as SwitchProps["tooltipPosition"][]
  ).forEach((position) => {
    test(`check accessibility with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box m="250px">
          <SwitchComponent labelHelp="Switch info" tooltipPosition={position} />
        </Box>,
      );

      await checkAccessibility(page);
    });
  });

  test("check accessibility with helpAriaLabel prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <SwitchComponent
        labelHelp="Label Help"
        helpAriaLabel="This text provides more information for the label"
      />,
    );

    await checkAccessibility(page);
  });

  [true, false].forEach((boolVal) => {
    test(`check accessibility when defaultChecked is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Switch label="Label" name="switch-name" defaultChecked={boolVal} />,
      );

      await checkAccessibility(page);
    });
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`check accessibility with validation set to ${type} as a boolean`, async ({
      mount,
      page,
    }) => {
      await mount(<SwitchComponent {...{ [type]: true }} />);

      await checkAccessibility(page);
    });
  });

  test("check accessibility for withMargin example", async ({
    mount,
    page,
  }) => {
    await mount(<WithMargin />);

    await checkAccessibility(page);
  });
});

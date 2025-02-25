import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { CommonCheckableInputProps } from "__internal__/checkable-input/checkable-input.component";
import Box from "../box";
import { Checkbox, CheckboxProps, CheckboxGroupProps } from ".";
import {
  CheckboxComponent,
  CheckboxGroupComponent,
  CheckboxGroupComponentNewValidation,
  Sizes,
  Reversed,
  WithCustomLabelWidth,
} from "./components.test-pw";
import {
  checkboxComponent,
  checkboxRole,
  checkboxGroup,
  checkboxLabel,
  checkboxgroupLegend,
  checkboxInlineFieldHelp,
  checkboxIcon,
  checkboxGroupIcon,
  checkboxSvg,
  checkboxHelpIcon,
  checkboxGroupFlex,
} from "../../../playwright/components/checkbox";
import {
  fieldHelpPreview,
  getComponent,
  tooltipPreview,
} from "../../../playwright/components/index";
import {
  SIZE,
  VALIDATION,
  COLOR,
  CHARACTERS,
} from "../../../playwright/support/constants";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
  verifyRequiredAsteriskForLegend,
  verifyRequiredAsteriskForLabel,
} from "../../../playwright/support/helper";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const boolVals = [true, false];

test("should have the expected focus styling", async ({ mount, page }) => {
  await mount(<CheckboxComponent data-component={CHARACTERS.STANDARD} />);

  const checkboxElement = checkboxRole(page);
  await checkboxElement.focus();
  const focusedElement = checkboxRole(page).locator("..").locator("div");
  await expect(focusedElement).toHaveCSS(
    "box-shadow",
    "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
  );
  await expect(focusedElement).toHaveCSS(
    "outline",
    "rgba(0, 0, 0, 0) solid 3px",
  );
});

test.describe("should render Checkbox component and check props", () => {
  test(`should render with data-component set to ${CHARACTERS.STANDARD}`, async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent data-component={CHARACTERS.STANDARD} />);

    const checkbox = getComponent(page, CHARACTERS.STANDARD);
    await expect(checkbox).toHaveAttribute(
      "data-component",
      CHARACTERS.STANDARD,
    );
  });

  test(`should render with data-element set to ${CHARACTERS.STANDARD}`, async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent data-element={CHARACTERS.STANDARD} />);

    const checkbox = checkboxComponent(page);
    await expect(checkbox).toHaveAttribute("data-element", CHARACTERS.STANDARD);
  });

  test(`should render with data-role set to ${CHARACTERS.STANDARD}`, async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent data-role={CHARACTERS.STANDARD} />);

    const checkbox = checkboxComponent(page);
    await expect(checkbox).toHaveAttribute("data-role", CHARACTERS.STANDARD);
  });

  boolVals.forEach((booleanValue) => {
    test(`should render with checked state set to ${booleanValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<CheckboxComponent checked={booleanValue} />);

      const checkboxElement = checkboxRole(page);

      if (boolVals) {
        expect(checkboxElement).toBeTruthy();
      } else {
        expect(checkboxElement).toBeFalsy();
      }
    });
  });

  testData.forEach((label) => {
    test(`should render with ${label} as a label`, async ({ mount, page }) => {
      await mount(<CheckboxComponent label={label} />);

      const boxLabel = checkboxLabel(page);
      await expect(boxLabel).toHaveText(label);
    });
  });

  testData.forEach((fieldHelp) => {
    test(`should render with ${fieldHelp} as fieldHelp`, async ({
      mount,
      page,
    }) => {
      await mount(<CheckboxComponent fieldHelp={fieldHelp} />);

      const preview = fieldHelpPreview(page);
      await expect(preview).toHaveText(fieldHelp);
    });
  });

  test("should render with inline fieldHelp", async ({ mount, page }) => {
    await mount(
      <CheckboxComponent fieldHelp="Inline fieldhelp" fieldHelpInline />,
    );

    const inlineFieldHelp = checkboxInlineFieldHelp(page);
    await expect(inlineFieldHelp).toHaveText("Inline fieldhelp");
  });

  test("should render with helpAriaLabel", async ({ mount, page }) => {
    await mount(
      <CheckboxComponent
        label="Label For CheckBox"
        labelHelp="Label Help"
        helpAriaLabel="This text provides more information for the label"
      />,
    );

    const checkboxIconElement = checkboxIcon(page);
    await checkboxIconElement.hover();
    const checkboxHelpElement = checkboxHelpIcon(page);
    await expect(checkboxHelpElement).toHaveAttribute(
      "aria-label",
      "This text provides more information for the label",
    );
  });

  boolVals.forEach((booleanValue) => {
    test(`should render with disabled prop set to ${booleanValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<CheckboxComponent disabled={booleanValue} />);

      if (booleanValue) {
        await expect(checkboxRole(page)).toBeDisabled();
      } else {
        await expect(checkboxRole(page)).toBeEnabled();
      }
    });
  });

  test(`should render with id set to ${CHARACTERS.STANDARD}`, async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent id={CHARACTERS.STANDARD} />);

    const checkboxElement = checkboxRole(page);
    await expect(checkboxElement).toHaveId(CHARACTERS.STANDARD);
  });

  test("should render with name", async ({ mount, page }) => {
    await mount(<CheckboxComponent name="confirm permission" />);

    const checkboxElement = checkboxRole(page);
    await expect(checkboxElement).toHaveAttribute("name", "confirm permission");
  });

  test("should render with value prop", async ({ mount, page }) => {
    await mount(<CheckboxComponent value="checkboxvalue" />);

    const checkboxElement = checkboxRole(page);
    await expect(checkboxElement).toHaveValue("checkboxvalue");
  });

  (
    [
      [SIZE.SMALL, 16],
      [SIZE.LARGE, 24],
    ] as [CommonCheckableInputProps["size"], number][]
  ).forEach(([size, sizeInPx]) => {
    test(`should render with size set to ${size}`, async ({ mount, page }) => {
      await mount(<CheckboxComponent size={size} />);

      const checkboxElement = checkboxRole(page);
      await assertCssValueIsApproximately(checkboxElement, "height", sizeInPx);
      await assertCssValueIsApproximately(checkboxElement, "width", sizeInPx);
    });
  });

  (
    [
      [1, "8px"],
      [2, "16px"],
    ] as [CommonCheckableInputProps["labelSpacing"], string][]
  ).forEach(([spacing, padding]) => {
    test(`should check labelSpacing set to ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(<CheckboxComponent labelSpacing={spacing} />);

      const labelParent = checkboxLabel(page).locator("..");
      await expect(labelParent).toHaveCSS("padding-left", padding);
    });
  });

  [
    [10, 90, 135, 1229],
    [30, 70, 409, 956],
    [80, 20, 1092, 273],
  ].forEach(([labelWidth, inputWidth, labelRatio, inputRatio]) => {
    test(`should render Checkbox using ${labelWidth} as labelWidth, ${inputWidth} as inputWidth and render it with correct label and input width ratios`, async ({
      mount,
      page,
    }) => {
      await mount(
        <CheckboxComponent
          labelInline
          labelWidth={labelWidth}
          inputWidth={inputWidth}
        />,
      );

      const labelParent = checkboxLabel(page).locator("..");
      await assertCssValueIsApproximately(labelParent, "width", labelRatio);
      const checkbox = checkboxRole(page).locator("..");
      await assertCssValueIsApproximately(checkbox, "width", inputRatio);
    });
  });

  test("should render as a required field", async ({ mount, page }) => {
    await mount(<CheckboxComponent label="Required Checkbox" required />);

    await verifyRequiredAsteriskForLabel(page);
  });

  test("should render with autoFocus", async ({ mount, page }) => {
    await mount(<CheckboxComponent autoFocus />);

    const checkboxElement = checkboxRole(page);
    await expect(checkboxElement).toBeFocused();
  });

  test("should render with error", async ({ mount, page }) => {
    await mount(<CheckboxComponent error />);

    const boxSvg = checkboxSvg(page);
    await expect(boxSvg).toHaveCSS("border-bottom-color", VALIDATION.ERROR);
  });

  test("should render with warning", async ({ mount, page }) => {
    await mount(<CheckboxComponent warning />);

    const boxSvg = checkboxSvg(page);
    await expect(boxSvg).toHaveCSS("border-bottom-color", VALIDATION.WARNING);
  });

  test("should render with info", async ({ mount, page }) => {
    await mount(<CheckboxComponent info />);

    const boxSvg = checkboxSvg(page);
    await expect(boxSvg).toHaveCSS("border-bottom-color", VALIDATION.INFO);
  });

  test("should render with error icon", async ({ mount, page }) => {
    await mount(<CheckboxComponent error="Error has occurred" />);

    const checkboxIconElement = checkboxIcon(page);
    await expect(checkboxIconElement).toHaveAttribute("data-element", "error");
  });

  test("should render with warning icon", async ({ mount, page }) => {
    await mount(<CheckboxComponent warning="Warning has occurred" />);

    const checkboxIconElement = checkboxIcon(page);
    await expect(checkboxIconElement).toHaveAttribute(
      "data-element",
      "warning",
    );
  });

  test("should render with info icon", async ({ mount, page }) => {
    await mount(<CheckboxComponent info="Info has occurred" />);

    const checkboxIconElement = checkboxIcon(page);
    await expect(checkboxIconElement).toHaveAttribute("data-element", "info");
  });

  (
    [
      [true, 0],
      [false, 1],
    ] as [CheckboxProps["reverse"], number][]
  ).forEach(([reverseValue, position]) => {
    test(`should render Checkbox with reverse prop set to ${reverseValue}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <CheckboxComponent label="Checkbox Label" reverse={reverseValue} />,
      );

      if (reverseValue) {
        const checkboxElement = checkboxComponent(page)
          .locator("div:nth-child(1) > div > div:nth-child(1)")
          .nth(position);
        await expect(checkboxElement).toHaveText("Checkbox Label");
      } else {
        const checkboxElement = checkboxComponent(page)
          .locator("div:nth-child(1) > div > div:nth-child(2)")
          .nth(position);
        await expect(checkboxElement).toHaveText("Checkbox Label");
      }
    });
  });

  (
    ["bottom", "left", "right", "top"] as CheckboxProps["tooltipPosition"][]
  ).forEach((position) => {
    test(`should render CheckboxComponent component with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box m="250px">
          <CheckboxComponent
            labelHelp="Tooltip info"
            tooltipPosition={position}
          />
        </Box>,
      );

      const checkboxIconElement = checkboxIcon(page);
      await checkboxIconElement.hover();
      const tooltipElement = tooltipPreview(page);
      await expect(tooltipElement).toHaveText("Tooltip info");
      await expect(tooltipElement).toHaveAttribute(
        "data-placement",
        `${position}`,
      );
    });
  });

  test("should render with tick color set to black by default", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent checked />);

    const checkboxElement = checkboxRole(page);
    await expect(checkboxElement).toBeChecked();
    await expect(checkboxElement).toHaveCSS("color", COLOR.BLACK);
  });

  (["small", "large"] as CheckboxProps["size"][]).forEach((size) => {
    test(`should render with the expected border radius styling when size is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<CheckboxComponent size={size} />);

      const boxSvg = checkboxSvg(page);
      await expect(boxSvg).toHaveCSS(
        "border-radius",
        size === "small" ? "2px" : "4px",
      );
    });
  });
});

test.describe("should render CheckBox component and check events", () => {
  test("should call onBlur callback when a blur event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <CheckboxComponent
        onBlur={() => {
          callbackCount += 1;
        }}
      />,
    );

    const checkboxElement = checkboxRole(page);
    await checkboxElement.focus();
    await checkboxElement.blur();
    expect(callbackCount).toBe(1);
  });

  test("should call onChange callback when a check event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <CheckboxComponent
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    const checkboxElement = checkboxRole(page);
    await checkboxElement.click();
    expect(callbackCount).toBe(1);
  });

  test("should call onChange callback when an uncheck event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <CheckboxComponent
        checked
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    const checkboxElement = checkboxRole(page);
    await checkboxElement.click();
    expect(callbackCount).toBe(1);
  });

  test("should call onFocus callback when a focus event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <CheckboxComponent
        onFocus={() => {
          callbackCount += 1;
        }}
      />,
    );

    const checkboxElement = checkboxRole(page);
    await checkboxElement.focus();
    expect(callbackCount).toBe(1);
  });

  test("should call onClick callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <CheckboxComponent
        onClick={() => {
          callbackCount += 1;
        }}
      />,
    );

    const checkboxElement = checkboxRole(page);
    await checkboxElement.click();
    expect(callbackCount).toBe(1);
  });
});

test.describe("should render CheckboxGroup component and check props", () => {
  testData.forEach((legendValue) => {
    test(`should render CheckboxGroup component with ${legendValue} as legend`, async ({
      mount,
      page,
    }) => {
      await mount(<CheckboxGroupComponent legend={legendValue} />);

      const groupLegendElement = checkboxgroupLegend(page);
      await expect(groupLegendElement).toHaveText(legendValue);
    });
  });

  test("should render CheckboxGroup component with error", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxGroupComponent error />);

    const boxSvg = checkboxSvg(page).nth(0);
    await expect(boxSvg).toHaveCSS("border-bottom-color", VALIDATION.ERROR);
  });

  test("should render CheckboxGroup component with warning", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxGroupComponent warning />);

    const boxSvg = checkboxSvg(page).nth(0);
    await expect(boxSvg).toHaveCSS("border-bottom-color", VALIDATION.WARNING);
  });

  test("should render CheckboxGroup component with info", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxGroupComponent info />);

    const boxSvg = checkboxSvg(page).nth(0);
    await expect(boxSvg).toHaveCSS("border-bottom-color", VALIDATION.INFO);
  });

  test("should render CheckboxGroup component with error message", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxGroupComponent error="Error has occurred" />);

    const validationMessage = checkboxGroupIcon(page);
    await expect(validationMessage).toHaveAttribute("data-element", "error");
  });

  test("should render CheckboxGroup component with warning message", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxGroupComponent warning="Warning has occurred" />);

    const validationMessage = checkboxGroupIcon(page);
    await expect(validationMessage).toHaveAttribute("data-element", "warning");
  });

  test("should render CheckboxGroup component with info message", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxGroupComponent info="Info has occurred" />);

    const validationMessage = checkboxGroupIcon(page);
    await expect(validationMessage).toHaveAttribute("data-element", "info");
  });

  (
    [
      ["left", "flex-start"],
      ["right", "flex-end"],
    ] as [CheckboxGroupProps["legendAlign"], string][]
  ).forEach(([position, assertion]) => {
    test(`should render CheckboxGroup component with inline legend aligned to ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <CheckboxGroupComponent
          legend="CheckBox Legend"
          legendWidth={20}
          legendAlign={position}
          legendInline
        />,
      );

      const groupLegendElement = checkboxgroupLegend(page);
      await expect(groupLegendElement).toHaveCSS("justify-content", assertion);
    });
  });

  [20, 40].forEach((width) => {
    test(`should render CheckboxGroup component with inline legend width set to ${width}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <CheckboxGroupComponent
          legend="CheckBox Legend"
          legendWidth={width}
          legendInline
        />,
      );

      const groupLegendElement = checkboxgroupLegend(page);
      await expect(groupLegendElement).toHaveAttribute("width", `${width}`);
    });
  });

  test("should render CheckboxGroup component with children", async ({
    mount,
    page,
  }) => {
    await mount(
      <CheckboxGroupComponent>
        <Checkbox
          id="checkbox_id three"
          key="checkbox_id-three"
          name="checkbox_id-three"
          label="Checkbox 3"
        />
      </CheckboxGroupComponent>,
    );

    const checkboxGroupElement = checkboxGroup(page);
    await expect(checkboxGroupElement).toContainText("Checkbox 3");
  });

  (
    [
      [1, "8px"],
      [2, "16px"],
    ] as [CheckboxGroupProps["legendSpacing"], string][]
  ).forEach(([spacing, padding]) => {
    test(`should render CheckboxGroup component with legendSpacing set to ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <CheckboxGroupComponent
          legend="AVeryVeryLongLegend"
          legendSpacing={spacing}
          legendWidth={10}
          legendInline
        />,
      );

      const groupLegendElement = checkboxgroupLegend(page);
      await expect(groupLegendElement).toHaveCSS("padding-right", padding);
    });
  });

  (
    [
      "top",
      "bottom",
      "left",
      "right",
    ] as CheckboxGroupProps["tooltipPosition"][]
  ).forEach((position) => {
    test(`should render CheckboxGroupComponent component with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <CheckboxGroupComponent
          legend="Checkbox Legend"
          error="Something is wrong"
          tooltipPosition={position}
        />,
      );

      const checkboxIconElement = checkboxGroupIcon(page);
      await checkboxIconElement.hover();
      const tooltipElement = tooltipPreview(page);
      await expect(tooltipElement).toHaveText("Something is wrong");
      await expect(tooltipElement).toHaveAttribute(
        "data-placement",
        `${position}`,
      );
    });
  });

  test("should render CheckboxGroup component as a required field", async ({
    mount,
    page,
  }) => {
    await mount(
      <CheckboxGroupComponent legend="Required CheckboxGroup" required />,
    );

    await verifyRequiredAsteriskForLegend(page);
  });

  test("should render CheckboxGroup component with new validation error", async ({
    mount,
    page,
  }) => {
    await mount(
      <CheckboxGroupComponentNewValidation error="Error Message (Fix is required)" />,
    );

    const checkboxGroupElement1 = checkboxGroup(page)
      .locator("div")
      .nth(1)
      .locator("p");
    await expect(checkboxGroupElement1).toContainText(
      "Error Message (Fix is required)",
    );
    await expect(checkboxGroupElement1).toHaveCSS("color", "rgb(203, 55, 74)");
    const checkboxGroupElement2 = checkboxGroup(page)
      .locator("div")
      .nth(1)
      .locator("span");
    await expect(checkboxGroupElement2).toHaveCSS(
      "background-color",
      "rgb(203, 55, 74)",
    );
    await expect(checkboxGroupElement2).toHaveCSS("position", "absolute");
  });

  test("should render CheckboxGroup component with new validation warning", async ({
    mount,
    page,
  }) => {
    await mount(
      <CheckboxGroupComponentNewValidation warning="Warning Message (Fix is optional)" />,
    );

    const checkboxGroupElement1 = checkboxGroup(page)
      .locator("div")
      .nth(1)
      .locator("p");
    await expect(checkboxGroupElement1).toContainText(
      "Warning Message (Fix is optional)",
    );
    await expect(checkboxGroupElement1).toHaveCSS("color", "rgb(191, 82, 0)");
    const checkboxGroupElement2 = checkboxGroup(page)
      .locator("div")
      .nth(1)
      .locator("span");
    await expect(checkboxGroupElement2).toHaveCSS(
      "background-color",
      "rgb(239, 103, 0)",
    );
    await expect(checkboxGroupElement2).toHaveCSS("position", "absolute");
  });

  (
    [
      [true, "row"],
      [false, "column"],
    ] as [CheckboxGroupProps["inline"], string][]
  ).forEach(([bool, flex]) => {
    test(`should render CheckboxGroup component with new validation and inline prop set to ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <CheckboxGroupComponentNewValidation required inline={bool} />,
      );

      const groupFlexElement = checkboxGroupFlex(page);
      await expect(groupFlexElement).toHaveCSS("flex-direction", flex);
    });
  });
});

test.describe("should check accessibility for Checkbox component", () => {
  boolVals.forEach((booleanValue) => {
    test(`should pass accessibility tests with checked state set to ${booleanValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<CheckboxComponent checked={booleanValue} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests with fieldHelp", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent fieldHelp="Inline fieldhelp" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with inline fieldHelp", async ({
    mount,
    page,
  }) => {
    await mount(
      <CheckboxComponent fieldHelp="Inline fieldhelp" fieldHelpInline />,
    );

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with help icon", async ({
    mount,
    page,
  }) => {
    await mount(
      <CheckboxComponent label="Label For CheckBox" labelHelp="Label Help" />,
    );

    const checkboxIconElement = checkboxIcon(page);
    await checkboxIconElement.hover();
    await checkAccessibility(page, tooltipPreview(page));
  });

  test("should pass accessibility tests with disabled prop", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent disabled />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with different sizes", async ({
    mount,
    page,
  }) => {
    await mount(<Sizes />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for reversed prop", async ({
    mount,
    page,
  }) => {
    await mount(<Reversed />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Checkbox with custom label width", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomLabelWidth />);

    await checkAccessibility(page);
  });

  ([1, 2] as CommonCheckableInputProps["labelSpacing"][]).forEach((spacing) => {
    test(`should pass accessibility tests with ${spacing} as labelSpacing`, async ({
      mount,
      page,
    }) => {
      await mount(<CheckboxComponent labelSpacing={spacing} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests as a required field", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent label="Required Checkbox" required />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with autoFocus", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent autoFocus />);

    await checkAccessibility(page);
  });

  (
    ["bottom", "left", "right", "top"] as CheckboxProps["tooltipPosition"][]
  ).forEach((position) => {
    test(`should render CheckboxComponent component with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box m="250px">
          <CheckboxComponent
            labelHelp="Tooltip info"
            tooltipPosition={position}
          />
        </Box>,
      );

      const checkboxIconElement = checkboxIcon(page);
      await checkboxIconElement.hover();
      await checkAccessibility(page, tooltipPreview(page));
    });
  });

  test("should pass accessibility tests with error message", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent error="Error has occurred" />);

    const checkboxIconElement = checkboxIcon(page);
    await checkboxIconElement.hover();
    await checkAccessibility(page, tooltipPreview(page));
  });

  test("should pass accessibility tests with warning message", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent warning="Warning has occurred" />);

    const checkboxIconElement = checkboxIcon(page);
    await checkboxIconElement.hover();
    await checkAccessibility(page, tooltipPreview(page));
  });

  test("should pass accessibility tests with info message", async ({
    mount,
    page,
  }) => {
    await mount(<CheckboxComponent info="Info has occurred" />);

    const checkboxIconElement = checkboxIcon(page);
    await checkboxIconElement.hover();
    await checkAccessibility(page, tooltipPreview(page));
  });
});

test.describe("should check accessibility for Checkbox Group component", () => {
  test("should pass accessibility tests with !@#$%^*()_+-=~[];:.,?{}&\"'<> as legend", async ({
    mount,
    page,
  }) => {
    await mount(
      <CheckboxGroupComponent legend={CHARACTERS.SPECIALCHARACTERS} />,
    );

    await checkAccessibility(page);
  });

  (["left", "right"] as CheckboxGroupProps["legendAlign"][]).forEach(
    (position) => {
      test(`should pass accessibility tests with inline legend aligned to ${position}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <CheckboxGroupComponent
            legend="CheckBox Legend"
            legendWidth={20}
            legendAlign={position}
            legendInline
          />,
        );

        await checkAccessibility(page);
      });
    },
  );

  [20, 40].forEach((width) => {
    test(`should pass accessibility tests with inline legend width set to ${width}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <CheckboxGroupComponent
          legend="CheckBox Legend"
          legendWidth={width}
          legendInline
        />,
      );

      await checkAccessibility(page);
    });
  });

  ([1, 2] as CheckboxGroupProps["legendSpacing"][]).forEach((spacing) => {
    test(`should pass accessibility tests with legendSpacing set to ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <CheckboxGroupComponent
          legend="AVeryVeryLongLegend"
          legendSpacing={spacing}
          legendWidth={10}
          legendInline
        />,
      );

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests as a required field", async ({
    mount,
    page,
  }) => {
    await mount(
      <CheckboxGroupComponent legend="Required CheckboxGroup" required />,
    );

    await checkAccessibility(page);
  });

  (
    [
      "top",
      "bottom",
      "left",
      "right",
    ] as CheckboxGroupProps["tooltipPosition"][]
  ).forEach((position) => {
    test(`should pass accessibility tests with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <CheckboxGroupComponent
          legend="Checkbox Legend"
          error="Something is wrong"
          tooltipPosition={position}
        />,
      );

      const checkboxIconElement = checkboxGroupIcon(page);
      await checkboxIconElement.hover();
      await checkAccessibility(page, tooltipPreview(page));
    });
  });
});

import { expect, test } from "@playwright/experimental-ct-react17";
import React from "react";
import {
  fieldHelpPreview,
  getComponent,
  tooltipPreview,
} from "../../../playwright/components/index";
import {
  radiobutton,
  radiobuttonComponent,
  radiobuttonGroup,
  radiobuttonGroupIcon,
  radiobuttonGroupLegend,
  radiobuttonIcon,
  radiobuttonInlineFieldHelp,
  radiobuttonLabel,
  radiobuttonRole,
  radiobuttonSvg,
} from "../../../playwright/components/radio-button";
import {
  CHARACTERS,
  COLOR,
  SIZE,
  VALIDATION,
} from "../../../playwright/support/constants";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
  verifyRequiredAsteriskForLegend,
} from "../../../playwright/support/helper";
import { RadioButtonGroupProps } from "./radio-button-group/radio-button-group.component";
import RadioButton, {
  RadioButtonProps,
} from "../../../src/components/radio-button/radio-button.component";
import {
  RadioButtonComponent,
  RadioButtonGroupComponent,
  Default,
  DifferentLabelSpacing,
  DisableRadioButtons,
  EnableAdaptiveBehaviour,
  InlineRadioButtons,
  ReverseRadioButtons,
  WithCustomStyledLabels,
  WithFieldHelp,
  WithInlineLegend,
  WithLargeRadioButtons,
  WithLeftMargin,
  WithLegendAndLabels,
} from "./components.test-pw";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const radioContainerWidth = 400;
const radioInputWidth = 16;
const labelContainerWidth = 40;

test.describe("should render RadioButton component", () => {
  test("should render with data-component", async ({ mount, page }) => {
    await mount(<RadioButtonComponent data-component={CHARACTERS.STANDARD} />);
    const component = await getComponent(page, CHARACTERS.STANDARD);
    await expect(component).toHaveAttribute(
      "data-component",
      CHARACTERS.STANDARD,
    );
  });

  test("should render with data-element", async ({ mount, page }) => {
    await mount(<RadioButtonComponent data-element={CHARACTERS.STANDARD} />);
    const radiobuttonElement = await radiobuttonComponent(page);
    await expect(radiobuttonElement).toHaveAttribute(
      "data-element",
      CHARACTERS.STANDARD,
    );
  });

  test("should render with data-role", async ({ mount, page }) => {
    await mount(<RadioButtonComponent data-role={CHARACTERS.STANDARD} />);
    const radiobuttonElement = await radiobuttonComponent(page);
    await expect(radiobuttonElement).toHaveAttribute(
      "data-role",
      CHARACTERS.STANDARD,
    );
  });

  [true, false].forEach((booleanValue) => {
    test(`should render with checked state set to ${booleanValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<RadioButtonComponent checked={booleanValue} />);
      const radiobuttonElement = await radiobuttonRole(page);
      if (booleanValue) {
        await expect(radiobuttonElement).toBeChecked();
      } else {
        await expect(radiobuttonElement).not.toBeChecked();
      }
    });
  });

  testData.forEach((label) => {
    test(`should render with ${label} as a label`, async ({ mount, page }) => {
      await mount(<RadioButtonComponent label={label} />);
      const labelElement = await radiobuttonLabel(page);
      await expect(labelElement).toHaveText(label);
    });
  });

  testData.forEach((fieldHelp) => {
    test(`should render with ${fieldHelp} as fieldHelp`, async ({
      mount,
      page,
    }) => {
      await mount(<RadioButtonComponent fieldHelp={fieldHelp} />);
      const fieldHelpElement = await fieldHelpPreview(page);
      await expect(fieldHelpElement).toHaveText(fieldHelp);
    });
  });

  test("should render with inline fieldHelp", async ({ mount, page }) => {
    await mount(
      <RadioButtonComponent fieldHelp="Inline fieldhelp" fieldHelpInline />,
    );
    const fieldHelpElement = await radiobuttonInlineFieldHelp(page);
    await expect(fieldHelpElement).toHaveText("Inline fieldhelp");
  });

  [true, false].forEach((booleanValue) => {
    test(`should render with disabled prop set to ${booleanValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<RadioButtonComponent disabled={booleanValue} />);
      const radiobuttonElement = await radiobuttonRole(page);
      if (booleanValue) {
        await expect(radiobuttonElement).toBeDisabled();
      } else {
        await expect(radiobuttonElement).not.toBeDisabled();
      }
    });
  });

  test("should render with id", async ({ mount, page }) => {
    await mount(<RadioButtonComponent id={CHARACTERS.STANDARD} />);
    const radiobuttonElement = await radiobuttonRole(page);
    await expect(radiobuttonElement).toHaveAttribute("id", CHARACTERS.STANDARD);
  });

  test("should render with name", async ({ mount, page }) => {
    await mount(<RadioButtonComponent name="radiobutton name" />);
    const radiobuttonElement = await radiobuttonRole(page);
    await expect(radiobuttonElement).toHaveAttribute(
      "name",
      "radiobutton name",
    );
  });

  test("should render with value prop", async ({ mount, page }) => {
    await mount(<RadioButtonComponent value="radiobuttonvalue" />);
    const radiobuttonRoleElement = await radiobuttonRole(page);
    await expect(radiobuttonRoleElement).toHaveAttribute(
      "value",
      "radiobuttonvalue",
    );
  });

  (
    [
      [SIZE.SMALL, 16],
      [SIZE.LARGE, 24],
    ] as [RadioButtonProps["size"], number][]
  ).forEach(([size, heightAndWidth]) => {
    test(`should render with size set to ${size}`, async ({ mount, page }) => {
      await mount(<RadioButtonComponent size={size} />);
      const radiobuttonElement = await radiobuttonRole(page);
      await assertCssValueIsApproximately(
        radiobuttonElement,
        "height",
        heightAndWidth,
      );
      await assertCssValueIsApproximately(
        radiobuttonElement,
        "width",
        heightAndWidth,
      );
    });
  });

  (
    [
      [1, "8px"],
      [2, "16px"],
    ] as [RadioButtonProps["labelSpacing"], string][]
  ).forEach(([spacing, padding]) => {
    test(`should render with ${spacing} as labelSpacing`, async ({
      mount,
      page,
    }) => {
      await mount(<RadioButtonComponent labelSpacing={spacing} />);
      const radiobuttonLabelElement = await radiobuttonLabel(page);
      const cssPaddingLeft = await radiobuttonLabelElement.evaluate((el) =>
        window
          .getComputedStyle(el.parentElement as HTMLElement)
          .getPropertyValue("padding-left"),
      );
      await expect(cssPaddingLeft).toBe(padding);
    });
  });

  [100, 75, 50, 25, 10].forEach((labelWidth) => {
    test(`should render using ${labelWidth} as labelWidth with correct width`, async ({
      mount,
      page,
    }) => {
      await mount(
        <RadioButtonComponent
          labelWidth={labelWidth}
          reverse
          inputWidth={labelWidth === 100 ? undefined : 10}
        />,
      );

      // if labelWidth is 100% it will still need to allow for input width of 16px
      const parentWidth =
        labelWidth === 100
          ? radioContainerWidth - radioInputWidth
          : radioContainerWidth * (labelWidth / 100);
      const radiobuttonLabelElement = await radiobuttonLabel(page);
      const cssWidth = await radiobuttonLabelElement.evaluate((el) =>
        window
          .getComputedStyle(el.parentElement as HTMLElement)
          .getPropertyValue("width"),
      );
      await expect(cssWidth).toBe(`${parentWidth}px`);
    });
  });

  [100, 75, 50, 25, 10].forEach((inputWidth) => {
    test(`should render using ${inputWidth} as inputWidth and render it with correct width`, async ({
      mount,
      page,
    }) => {
      await mount(
        <RadioButtonComponent
          labelWidth={10}
          reverse
          inputWidth={inputWidth}
        />,
      );

      // if inputWidth is 100% it will still need to allow for label container width of 32px + 8px
      const parentWidth =
        inputWidth === 100
          ? radioContainerWidth - labelContainerWidth
          : radioContainerWidth * (inputWidth / 100);
      const radiobuttonElement = await radiobuttonRole(page);
      const cssWidth = await radiobuttonElement.evaluate((el) =>
        window
          .getComputedStyle(el.parentElement as HTMLElement)
          .getPropertyValue("width"),
      );
      await expect(cssWidth).toBe(`${parentWidth}px`);
    });
  });

  test("should render with autoFocus", async ({ mount, page }) => {
    await mount(<RadioButtonComponent autoFocus />);
    const radiobuttonElement = await radiobuttonRole(page);
    await expect(radiobuttonElement).toBeFocused();
  });

  test("should render with error", async ({ mount, page }) => {
    await mount(<RadioButtonComponent error />);
    const radiobuttonSvgElement = await radiobuttonSvg(page);
    await expect(radiobuttonSvgElement).toHaveCSS(
      "border-bottom-color",
      VALIDATION.ERROR,
    );
  });

  test("should render with warning", async ({ mount, page }) => {
    await mount(<RadioButtonComponent warning />);
    const radiobuttonSvgElement = await radiobuttonSvg(page);
    await expect(radiobuttonSvgElement).toHaveCSS(
      "border-bottom-color",
      VALIDATION.WARNING,
    );
  });

  test("should render with info", async ({ mount, page }) => {
    await mount(<RadioButtonComponent info />);
    const radiobuttonSvgElement = await radiobuttonSvg(page);
    await expect(radiobuttonSvgElement).toHaveCSS(
      "border-bottom-color",
      VALIDATION.INFO,
    );
  });

  test("should render with error message", async ({ mount, page }) => {
    await mount(<RadioButtonComponent error="Error has occurred" />);
    const radiobuttonErrorIcon = await radiobuttonIcon(page);
    await expect(radiobuttonErrorIcon).toHaveAttribute("data-element", "error");
  });

  test("should render with warning message", async ({ mount, page }) => {
    await mount(<RadioButtonComponent warning="Warning has occurred" />);
    const radiobuttonWarningIcon = await radiobuttonIcon(page);
    await expect(radiobuttonWarningIcon).toHaveAttribute(
      "data-element",
      "warning",
    );
  });

  test("should render with info message", async ({ mount, page }) => {
    await mount(<RadioButtonComponent info="Info has occurred" />);
    const radiobuttonInfoIcon = await radiobuttonIcon(page);
    await expect(radiobuttonInfoIcon).toHaveAttribute("data-element", "info");
  });

  (
    [
      [true, 0],
      [false, 1],
    ] as [boolean, number][]
  ).forEach(([reverseValue, position]) => {
    test(`should render with reverse prop set to ${reverseValue}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <RadioButtonComponent
          label="Radiobutton Label"
          reverse={reverseValue}
        />,
      );
      const expectedLabelChild = await radiobuttonComponent(page)
        .locator("div > div > div > div:not(input + div)")
        .nth(position);
      await expect(expectedLabelChild).toHaveText("Radiobutton Label");
    });
  });

  (["bottom", "left", "right", "top"] as const).forEach((position) => {
    test(`should render with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <RadioButtonComponent
          labelHelp="Tooltip info"
          tooltipPosition={position}
        />,
      );
      const radiobuttonIconElement = await radiobuttonIcon(page);
      await radiobuttonIconElement.hover();
      const tooltipElement = await tooltipPreview(page);
      await expect(tooltipElement).toHaveText("Tooltip info");
      await expect(tooltipElement).toHaveAttribute("data-placement", position);
    });
  });

  test("should render with fill color set to black by default", async ({
    mount,
    page,
  }) => {
    await mount(<RadioButtonComponent checked />);
    const radiobuttonElement = await radiobuttonRole(page);
    await expect(radiobuttonElement).toBeChecked();
    await expect(radiobuttonElement).toHaveCSS("color", COLOR.BLACK);
  });

  test("should have the expected border radius styling", async ({
    mount,
    page,
  }) => {
    await mount(<RadioButtonComponent />);
    const radiobuttonSvgElement = await radiobuttonSvg(page);
    await expect(radiobuttonSvgElement).toHaveCSS("border-radius", "50%");
  });
});

test.describe("should render RadioButton component and check events", () => {
  test("should call onBlur callback when a blur event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback: RadioButtonProps["onBlur"] = () => {
      callbackCount += 1;
    };
    await mount(<RadioButtonComponent onBlur={callback} />);
    const radiobuttonElement = await radiobuttonRole(page);
    await radiobuttonElement.focus();
    await radiobuttonElement.blur();
    await expect(callbackCount).toBe(1);
  });

  test("should call onChange callback when a check event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback: RadioButtonProps["onChange"] = () => {
      callbackCount += 1;
    };
    await mount(<RadioButtonComponent onChange={callback} />);
    const radiobuttonElement = await radiobuttonRole(page);
    await radiobuttonElement.click();
    await expect(callbackCount).toBe(1);
  });

  test("should call onFocus callback when a focus event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback: RadioButtonProps["onFocus"] = () => {
      callbackCount += 1;
    };
    await mount(<RadioButtonComponent onFocus={callback} />);
    const radiobuttonElement = await radiobuttonRole(page);
    await radiobuttonElement.focus();
    await expect(callbackCount).toBe(1);
  });

  test("should call onClick callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback: RadioButtonProps["onClick"] = () => {
      callbackCount += 1;
    };
    await mount(<RadioButtonComponent onClick={callback} />);
    const radiobuttonElement = await radiobuttonRole(page);
    await radiobuttonElement.click();
    await expect(callbackCount).toBe(1);
  });
});

test.describe("Testing RadioButtonGroup component", () => {
  testData.forEach((legendValue) => {
    test(`should render RadioButtonGroup component with ${legendValue} as legend`, async ({
      mount,
      page,
    }) => {
      await mount(<RadioButtonGroupComponent legend={legendValue} />);
      const radiobuttonGroupLegendElement = await radiobuttonGroupLegend(page);
      await expect(radiobuttonGroupLegendElement).toHaveText(legendValue);
    });
  });

  test("should render RadioButtonGroup component with error", async ({
    mount,
    page,
  }) => {
    await mount(<RadioButtonGroupComponent error />);
    const radiobuttonSvgElement = await radiobuttonSvg(page).first();
    await expect(radiobuttonSvgElement).toHaveCSS(
      "border-bottom-color",
      VALIDATION.ERROR,
    );
  });

  test("should render RadioButtonGroup component with warning", async ({
    mount,
    page,
  }) => {
    await mount(<RadioButtonGroupComponent warning />);
    const radiobuttonSvgElement = await radiobuttonSvg(page).first();
    await expect(radiobuttonSvgElement).toHaveCSS(
      "border-bottom-color",
      VALIDATION.WARNING,
    );
  });

  test("should render RadioButtonGroup component with info", async ({
    mount,
    page,
  }) => {
    await mount(<RadioButtonGroupComponent info />);
    const radiobuttonSvgElement = await radiobuttonSvg(page).first();
    await expect(radiobuttonSvgElement).toHaveCSS(
      "border-bottom-color",
      VALIDATION.INFO,
    );
  });

  test("should render RadioButtonGroup component with error message", async ({
    mount,
    page,
  }) => {
    await mount(<RadioButtonGroupComponent error="Error has occurred" />);
    const radiobuttonGroupErrorIcon = await radiobuttonGroupIcon(page);
    await expect(radiobuttonGroupErrorIcon).toHaveAttribute(
      "data-element",
      "error",
    );
  });

  test("should render RadioButtonGroup component with warning message", async ({
    mount,
    page,
  }) => {
    await mount(<RadioButtonGroupComponent warning="Warning has occurred" />);
    const radiobuttonGroupWarningIcon = await radiobuttonGroupIcon(page);
    await expect(radiobuttonGroupWarningIcon).toHaveAttribute(
      "data-element",
      "warning",
    );
  });

  test("should render RadioButtonGroup component with info message", async ({
    mount,
    page,
  }) => {
    await mount(<RadioButtonGroupComponent info="Info has occurred" />);
    const radiobuttonGroupInfoIcon = await radiobuttonGroupIcon(page);
    await expect(radiobuttonGroupInfoIcon).toHaveAttribute(
      "data-element",
      "info",
    );
  });

  (
    [
      ["left", "start"],
      ["right", "end"],
    ] as [RadioButtonGroupProps["legendAlign"], string][]
  ).forEach(([position, assertion]) => {
    test(`should render RadioButtonGroup component with inline legend aligned to ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <RadioButtonGroupComponent
          legendWidth={20}
          legendAlign={position}
          legendInline
        />,
      );
      const radiobuttonGroupLegendElement = await radiobuttonGroupLegend(page);
      await expect(radiobuttonGroupLegendElement).toHaveCSS(
        "justify-content",
        `flex-${assertion}`,
      );
    });
  });

  [20, 40].forEach((width) => {
    test(`should render RadioButtonGroup component with inline legend width set to ${width}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <RadioButtonGroupComponent legendWidth={width} legendInline />,
      );
      const radiobuttonGroupLegendElement = await radiobuttonGroupLegend(page);
      await expect(radiobuttonGroupLegendElement).toHaveAttribute(
        "width",
        String(width),
      );
    });
  });

  test("should render RadioButtonGroup component with children", async ({
    mount,
    page,
  }) => {
    await mount(
      <RadioButtonGroupComponent>
        <RadioButton id="radio-4" value="radio4" label="Don't Know" />
      </RadioButtonGroupComponent>,
    );
    const radiobuttonGroupElement = await radiobuttonGroup(page);
    await expect(radiobuttonGroupElement).toContainText("Don't Know");
  });

  (
    [
      [1, "8px"],
      [2, "16px"],
    ] as [RadioButtonGroupProps["legendSpacing"], string][]
  ).forEach(([spacing, padding]) => {
    test(`should render RadioButtonGroup component with legendSpacing set to ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <RadioButtonGroupComponent
          legendSpacing={spacing}
          legendWidth={10}
          legendInline
        />,
      );
      const radiobuttonGroupLegendElement = await radiobuttonGroupLegend(page);
      await expect(radiobuttonGroupLegendElement).toHaveCSS(
        "padding-right",
        padding,
      );
    });
  });

  (["top", "bottom", "left", "right"] as const).forEach((position) => {
    test(`should render RadioButtonGroup component with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <RadioButtonGroupComponent
          error="Something is wrong"
          tooltipPosition={position}
        />,
      );
      const radiobuttonGroupIconElement = await radiobuttonGroupIcon(page);
      await radiobuttonGroupIconElement.hover();
      const tooltipPreviewElement = await tooltipPreview(page);
      await expect(tooltipPreviewElement).toHaveText("Something is wrong");
      await expect(tooltipPreviewElement).toHaveAttribute(
        "data-placement",
        position,
      );
    });
  });

  test("should render RadioButtonGroup component as a required field", async ({
    mount,
    page,
  }) => {
    await mount(<RadioButtonGroupComponent required />);
    await verifyRequiredAsteriskForLegend(page);
  });

  test("should render RadioButtonGroup component with radiobuttons inline", async ({
    mount,
    page,
  }) => {
    await mount(<RadioButtonGroupComponent inline />);
    const firstRadiobuttonElement = await radiobutton(page, 0);
    await expect(firstRadiobuttonElement).toHaveCSS("margin-bottom", "12px");
    await expect(firstRadiobuttonElement).toHaveCSS("margin-left", "0px");

    const secondRadiobuttonElement = await radiobutton(page, 1);
    await expect(secondRadiobuttonElement).toHaveCSS("margin-bottom", "12px");
    await expect(secondRadiobuttonElement).toHaveCSS("margin-left", "32px");

    const thirdRadiobuttonElement = await radiobutton(page, 2);
    await expect(thirdRadiobuttonElement).toHaveCSS("margin-bottom", "0px");
    await expect(thirdRadiobuttonElement).toHaveCSS("margin-left", "32px");
  });

  (
    [
      [399, "left"],
      [400, "left"],
      [401, "none"],
    ] as const
  ).forEach(([breakpoint, float]) => {
    test(`should check RadioButtonGroup legend is ${breakpoint} with adaptiveLabelBreakpoint ${float} and viewport 400`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({ width: 400, height: 300 });
      await mount(
        <RadioButtonGroupComponent
          adaptiveLegendBreakpoint={breakpoint}
          adaptiveSpacingBreakpoint={breakpoint}
        />,
      );
      const radiobuttonGroupLegendElement = await radiobuttonGroupLegend(page);
      await expect(radiobuttonGroupLegendElement).toHaveCSS("float", float);
    });
  });
});

test.describe("Accessibility tests for RadioButton component", () => {
  test("should pass accessibility tests for RadioButton Default example", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for RadioButton WithLegendAndLabels example", async ({
    mount,
    page,
  }) => {
    await mount(<WithLegendAndLabels />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for RadioButton WithInlineLegend example", async ({
    mount,
    page,
  }) => {
    await mount(<WithInlineLegend />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for RadioButton WithLeftMargin example", async ({
    mount,
    page,
  }) => {
    await mount(<WithLeftMargin />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for RadioButton EnableAdaptiveBehaviour example", async ({
    mount,
    page,
  }) => {
    await mount(<EnableAdaptiveBehaviour />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for RadioButton DifferentLabelSpacing example", async ({
    mount,
    page,
  }) => {
    await mount(<DifferentLabelSpacing />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for RadioButton InlineRadioButtons example", async ({
    mount,
    page,
  }) => {
    await mount(<InlineRadioButtons />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for RadioButton ReverseRadioButtons example", async ({
    mount,
    page,
  }) => {
    await mount(<ReverseRadioButtons />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for RadioButton DisableRadioButtons example", async ({
    mount,
    page,
  }) => {
    await mount(<DisableRadioButtons />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for RadioButton WithFieldHelp example", async ({
    mount,
    page,
  }) => {
    await mount(<WithFieldHelp />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for RadioButton WithLargeRadioButtons example", async ({
    mount,
    page,
  }) => {
    await mount(<WithLargeRadioButtons />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests for RadioButton WithCustomStyledLabels example", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomStyledLabels />);
    await checkAccessibility(page);
  });
});

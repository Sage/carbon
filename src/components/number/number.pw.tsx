import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { NumberProps } from ".";

import {
  NumberInputComponent,
  Default,
  Sizes,
  Disabled,
  ReadOnly,
  AutoFocus,
  WithLabelInline,
  WithLabelAlign,
  WithCustomLabelWidthAndInputWidth,
  WithCustomMaxWidth,
  WithFieldHelp,
  WithInputHint,
  WithLabelHelp,
  WithPositionedChildren,
} from "./components.test-pw";

import {
  getDataElementByValue,
  getDataComponentByValue,
  getDataRoleByValue,
  getElement,
  fieldHelpPreview,
  tooltipPreview,
  commonDataElementInputPreview,
  commonInputPrefix,
  characterLimit,
} from "../../../playwright/components/index";

import number from "../../../playwright/components/number";
import Box from "../../../src/components/box";

import {
  getDesignTokensByCssProperty,
  assertCssValueIsApproximately,
  verifyRequiredAsteriskForLabel,
  checkAccessibility,
} from "../../../playwright/support/helper";

import {
  CHARACTERS,
  SIZE,
  VALIDATION,
} from "../../../playwright/support/constants";
import { ICON } from "../../../playwright/components/locators";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("check props for Number component", () => {
  testData.forEach((labelValue) => {
    test(`should render label with ${labelValue} as value`, async ({
      mount,
      page,
    }) => {
      await mount(<NumberInputComponent label={labelValue} />);

      const label = getDataElementByValue(page, "label");
      await expect(label).toHaveText(labelValue);
    });
  });

  testData.forEach((labelHelpValue) => {
    test(`should render labelHelp message renders with ${labelHelpValue} as value`, async ({
      mount,
      page,
    }) => {
      await mount(<NumberInputComponent labelHelp={labelHelpValue} />);

      const labelHelpIcon = getDataElementByValue(page, "question");
      await labelHelpIcon.hover();
      const tooltipPreviewElement = tooltipPreview(page);
      await expect(tooltipPreviewElement).toHaveText(labelHelpValue);
    });
  });

  testData.forEach((fieldHelpValue) => {
    test(`should render fieldHelp message with ${fieldHelpValue} as value`, async ({
      mount,
      page,
    }) => {
      await mount(<NumberInputComponent fieldHelp={fieldHelpValue} />);

      const fieldHelp = getDataElementByValue(page, "help");
      await fieldHelp.hover();
      const fieldHelpPreviewElement = fieldHelpPreview(page);
      await expect(fieldHelpPreviewElement).toHaveText(fieldHelpValue);
    });
  });

  (
    ["top", "bottom", "left", "right"] as NumberProps["tooltipPosition"][]
  ).forEach((position) => {
    test(`should render with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box m="250px">
          <NumberInputComponent
            error={CHARACTERS.STANDARD}
            tooltipPosition={position}
          />
        </Box>,
      );

      await getDataElementByValue(page, "error").hover();
      await expect(tooltipPreview(page)).toHaveText(CHARACTERS.STANDARD);
      await expect(tooltipPreview(page)).toHaveAttribute(
        "data-placement",
        position as string,
      );
    });
  });

  test("should render with helpAriaLabel prop", async ({ mount, page }) => {
    await mount(
      <NumberInputComponent
        labelHelp="fieldHelp"
        helpAriaLabel={CHARACTERS.STANDARD}
      />,
    );

    const ariaHelpLabel = getDataComponentByValue(page, "help");

    await expect(ariaHelpLabel).toHaveAttribute(
      "aria-label",
      CHARACTERS.STANDARD,
    );
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`should render with a ${type} validation icon on label`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NumberInputComponent
          labelInline
          labelAlign="right"
          validationOnLabel
          {...{ [type]: "Message" }}
        />,
      );

      const labelParent = getDataElementByValue(page, "label").locator("..");
      const validationIcon = labelParent.locator(`[data-element="${type}"]`);
      await expect(validationIcon).toBeVisible();
    });
  });

  (
    [
      [VALIDATION.ERROR, "error", true],
      [VALIDATION.WARNING, "warning", true],
      [VALIDATION.INFO, "info", true],
      ["rgb(102, 132, 148)", "error", false],
      ["rgb(102, 132, 148)", "warning", false],
      ["rgb(102, 132, 148)", "info", false],
    ] as [string, string, boolean][]
  ).forEach(([borderColor, type, bool]) => {
    test(`should render with ${borderColor} input border when validation type ${type} is ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NumberInputComponent
          labelInline
          labelAlign="right"
          {...{ [type]: bool }}
        />,
      );

      await expect(number(page)).toHaveCSS("border-bottom-color", borderColor);
    });
  });

  testData.forEach((prefixValue) => {
    test(`should render prefix message with ${prefixValue} as value`, async ({
      mount,
      page,
    }) => {
      await mount(<NumberInputComponent prefix={prefixValue} />);

      const inputPrefixValue = commonInputPrefix(page);
      await expect(inputPrefixValue).toHaveText(prefixValue);
    });
  });

  testData.forEach((placeholderValue) => {
    test(`should render placeholder with ${placeholderValue} as value`, async ({
      mount,
      page,
    }) => {
      await mount(<NumberInputComponent placeholder={placeholderValue} />);

      await expect(commonDataElementInputPreview(page)).toHaveAttribute(
        "placeholder",
        placeholderValue,
      );
    });
  });

  (
    [
      [1, "8px"],
      [2, "16px"],
    ] as [NumberProps["labelSpacing"], string][]
  ).forEach(([spacing, padding]) => {
    test(`should render with labelSpacing prop ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(<NumberInputComponent labelInline labelSpacing={spacing} />);

      const labelParent = getDataElementByValue(page, "label").locator("..");
      await expect(labelParent).toHaveCSS("padding-right", padding);
    });
  });

  [
    ["foo", "with"],
    ["", "without"],
  ].forEach(([hint, renderStatus]) => {
    test(`should render ${renderStatus} an input hint depending on the inputHint prop value`, async ({
      mount,
      page,
    }) => {
      await mount(<NumberInputComponent inputHint={hint} />);

      const inputHint = getDataElementByValue(page, "input-hint");
      if (renderStatus === "with") {
        await expect(inputHint).toHaveCount(1);
      } else {
        await expect(inputHint).toHaveCount(0);
      }
    });
  });

  (
    [
      [11, 11, "rgba(0, 0, 0, 0.55)"],
      [11, 10, "rgb(203, 55, 74)"],
    ] as [number, number, string][]
  ).forEach(([charactersUsed, limit, color]) => {
    test(`should input ${charactersUsed} characters and warn if over character limit of ${limit}`, async ({
      mount,
      page,
    }) => {
      await mount(<NumberInputComponent characterLimit={limit} />);

      const inputValue = "12345678901";
      const underCharacters =
        limit - charactersUsed === 1 ? "character" : "characters";
      const overCharacters =
        charactersUsed - limit === 1 ? "character" : "characters";

      const elementInput = commonDataElementInputPreview(page);
      await elementInput.fill(inputValue);
      await expect(characterLimit(page)).toHaveText(
        `${
          charactersUsed - limit
            ? `${charactersUsed - limit} ${overCharacters} too many`
            : `${charactersUsed - limit} ${underCharacters} left`
        }`,
      );
      await expect(characterLimit(page)).toHaveCSS("color", color);
    });
  });

  test("should render with data-element prop", async ({ mount, page }) => {
    await mount(<NumberInputComponent data-element={CHARACTERS.STANDARD} />);

    await expect(
      getDataElementByValue(page, CHARACTERS.STANDARD),
    ).toBeVisible();
  });

  test("should render with data-role prop", async ({ mount, page }) => {
    await mount(<NumberInputComponent data-role={CHARACTERS.STANDARD} />);

    await expect(getDataRoleByValue(page, CHARACTERS.STANDARD)).toBeVisible();
  });

  test("should render with the add icon inside the input", async ({
    mount,
    page,
  }) => {
    await mount(<NumberInputComponent inputIcon="add" />);

    const inputIcon = number(page).locator(ICON);
    await expect(inputIcon).toBeVisible();
  });

  test("should render as disabled", async ({ mount, page }) => {
    await mount(<NumberInputComponent disabled />);

    await expect(commonDataElementInputPreview(page)).toBeDisabled();
  });

  test("should render as read only", async ({ mount, page }) => {
    await mount(<NumberInputComponent readOnly />);

    await expect(commonDataElementInputPreview(page)).not.toBeEditable();
  });

  (
    [
      [SIZE.SMALL, "32px", "--sizing400"],
      [SIZE.MEDIUM, "40px", "--sizing500"],
      [SIZE.LARGE, "48px", "--sizing600"],
    ] as [NumberProps["size"], string, string][]
  ).forEach(([size, height, token]) => {
    test(`should render with ${size} size and ${height} height when size prop is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<NumberInputComponent size={size} />);

      await expect(number(page)).toHaveCSS("min-height", height);
      const tokenValues = await getDesignTokensByCssProperty(
        page,
        number(page),
        "min-height",
      );
      expect(tokenValues[0]).toBe(token);
    });
  });

  test("should render with name prop", async ({ mount, page }) => {
    await mount(<NumberInputComponent name={CHARACTERS.STANDARD} />);

    await expect(commonDataElementInputPreview(page)).toHaveAttribute(
      "name",
      CHARACTERS.STANDARD,
    );
  });

  test("should render with positionedChildren prop", async ({
    mount,
    page,
  }) => {
    await mount(<WithPositionedChildren />);

    const labelParent = number(page).locator("..");
    await expect(labelParent.locator("button")).toBeVisible();
  });

  (
    [
      ["flex", 399],
      ["flex", 400],
      ["block", 401],
    ] as [string, NumberProps["adaptiveLabelBreakpoint"]][]
  ).forEach(([displayValue, breakpoint]) => {
    test(`should render with ${displayValue} label alignment when adaptiveLabelBreakpoint prop is ${breakpoint} with set viewport of 400`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({ width: 400, height: 300 });
      await mount(
        <NumberInputComponent adaptiveLabelBreakpoint={breakpoint} />,
      );

      const labelParentParent = getDataElementByValue(page, "label")
        .locator("..")
        .locator("..");
      await expect(labelParentParent).toHaveCSS("display", displayValue);
    });
  });

  test("should render as required", async ({ mount, page }) => {
    await mount(<NumberInputComponent required />);

    await verifyRequiredAsteriskForLabel(page);
  });

  test("should render with autofocus prop", async ({ mount, page }) => {
    await mount(<NumberInputComponent autoFocus />);

    await expect(commonDataElementInputPreview(page)).toBeFocused();
  });

  test("should render with label inline", async ({ mount, page }) => {
    await mount(<NumberInputComponent labelInline />);

    const labelParent = getDataElementByValue(page, "label").locator("..");
    await expect(labelParent).toHaveCSS("-webkit-box-pack", "end");
  });

  (
    [
      ["left", "start"],
      ["right", "end"],
    ] as [NumberProps["labelAlign"], string][]
  ).forEach(([alignment, cssProp]) => {
    test(`should render with ${alignment} labelAlign prop and flex-${cssProp} css properties`, async ({
      mount,
      page,
    }) => {
      await mount(<NumberInputComponent labelInline labelAlign={alignment} />);

      const labelParent = getDataElementByValue(page, "label").locator("..");
      await expect(labelParent).toHaveCSS("-webkit-box-pack", cssProp);
      await expect(labelParent).toHaveCSS("justify-content", `flex-${cssProp}`);
    });
  });

  (
    [
      [10, 90, 135, 1229],
      [30, 70, 409, 956],
      [80, 20, 1092, 273],
    ] as [
      NumberProps["labelWidth"],
      NumberProps["inputWidth"],
      number,
      number,
    ][]
  ).forEach(([label, input, labelRatio, inputRatio]) => {
    test(`should render with correct ratios when labelWidth prop is ${label} and inputWidth prop is ${input}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NumberInputComponent
          labelInline
          labelWidth={label}
          inputWidth={input}
        />,
      );

      const labelParent = getDataElementByValue(page, "label").locator("..");
      const inputParent = getDataElementByValue(page, "input").locator("..");
      await assertCssValueIsApproximately(labelParent, "width", labelRatio);
      await assertCssValueIsApproximately(inputParent, "width", inputRatio);
    });
  });

  ["10%", "30%", "50%", "80%", "100%"].forEach((maxWidth) => {
    test(`should render with ${maxWidth} max-width`, async ({
      mount,
      page,
    }) => {
      await mount(<NumberInputComponent maxWidth={maxWidth} />);

      const numberParent = number(page).locator("..");
      await expect(numberParent).toHaveCSS("max-width", maxWidth);
    });
  });

  test("should render with max-width of 100% when maxWidth prop has no value", async ({
    mount,
    page,
  }) => {
    await mount(<NumberInputComponent />);

    const numberParent = number(page).locator("..");
    await expect(numberParent).toHaveCSS("max-width", "100%");
  });
});

test.describe("check events", () => {
  test("should call onChange callback when a type event is triggered", async ({
    mount,
    page,
  }) => {
    const inputValue = "1";
    let callbackCount = 0;
    await mount(
      <NumberInputComponent
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    await commonDataElementInputPreview(page).type(inputValue);
    expect(callbackCount).toBe(1);
  });

  ["ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp"].forEach((key) => {
    test(`should call onKeyDown callback when ${key} key is triggered`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <NumberInputComponent
          onKeyDown={() => {
            callbackCount += 1;
          }}
        />,
      );

      const elementInput = commonDataElementInputPreview(page);
      await elementInput.focus();
      await elementInput.press(key);

      expect(callbackCount).toEqual(1);
    });
  });

  test("should call onBlur callback when a blur event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <NumberInputComponent
        onBlur={() => {
          callbackCount += 1;
        }}
      />,
    );

    const elementInput = commonDataElementInputPreview(page);
    await elementInput.click();
    await elementInput.blur();

    expect(callbackCount).toBe(1);
  });

  test("should call onMouseDown callback when a mousedown event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <NumberInputComponent
        onMouseDown={() => {
          callbackCount += 1;
        }}
      />,
    );

    const elementInput = commonDataElementInputPreview(page);
    await elementInput.dispatchEvent("mousedown");
    expect(callbackCount).toBe(1);
  });
});

test.describe("check accessibility", () => {
  test("should pass accessibility tests for default component", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for sizes example", async ({
    mount,
    page,
  }) => {
    await mount(<Sizes />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for disabled example", async ({
    mount,
    page,
  }) => {
    await mount(<Disabled />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for read only example", async ({
    mount,
    page,
  }) => {
    await mount(<ReadOnly />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for autofocus example", async ({
    mount,
    page,
  }) => {
    await mount(<AutoFocus />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for with label inline example", async ({
    mount,
    page,
  }) => {
    await mount(<WithLabelInline />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for with label align example", async ({
    mount,
    page,
  }) => {
    await mount(<WithLabelAlign />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for with custom label width and input width example", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomLabelWidthAndInputWidth />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for with custom max width example", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomMaxWidth />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for with field help example", async ({
    mount,
    page,
  }) => {
    await mount(<WithFieldHelp />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for with label help example", async ({
    mount,
    page,
  }) => {
    await mount(<WithLabelHelp />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for with input hint example", async ({
    mount,
    page,
  }) => {
    await mount(<WithInputHint />);

    await checkAccessibility(page);
  });
});

test("should have the expected border radius styling", async ({
  mount,
  page,
}) => {
  await mount(<NumberInputComponent />);

  const elementInput = getElement(page, "input");
  await expect(elementInput).toHaveCSS("border-radius", "4px");
});

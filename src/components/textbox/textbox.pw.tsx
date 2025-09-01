import { TextboxProps } from "components/textbox";
import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  getDesignTokensByCssProperty,
  checkAccessibility,
  verifyRequiredAsteriskForLabel,
  assertCssValueIsApproximately,
} from "../../../playwright/support/helper";
import {
  fieldHelpPreview,
  getDataElementByValue,
  getDataComponentByValue,
  getDataRoleByValue,
  tooltipPreview,
  characterLimit,
  visuallyHiddenCharacterCount,
} from "../../../playwright/components";
import {
  TextboxComponent,
  TextboxComponentRef,
  TextboxComponentWithLeftChildren,
  TextboxComponentWithPositionedChildren,
  TextboxValidationsAsAStringWithTooltipDefault,
  TextboxValidationsAsABoolean,
  TextboxValidationsAsAString,
  TextboxValidationsAsAStringWithTooltipCustom,
  TextboxValidationsAsAStringDisplayedOnLabel,
  TextboxNewDesignsValidation,
  TextboxComponentWithCharacterLimit,
} from "./components.test-pw";
import {
  textbox,
  textboxInput,
  textboxPrefix,
} from "../../../playwright/components/textbox";

import {
  CHARACTERS,
  SIZE,
  VALIDATION,
} from "../../../playwright/support/constants";

import { BUTTON, ICON } from "../../../playwright/components/locators";
import Box from "../../../src/components/box";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const keysToTrigger = ["Enter", "Space"] as const;

test.describe("Prop checks for Textbox component", () => {
  (
    [
      [SIZE.SMALL, "32px", "--sizing400"],
      [SIZE.MEDIUM, "40px", "--sizing500"],
      [SIZE.LARGE, "48px", "--sizing600"],
    ] as [TextboxProps["size"], string, string][]
  ).forEach(([size, height, token]) => {
    test(`should render with ${size} size and ${height} height when size prop is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent size={size} />);

      await expect(textbox(page)).toHaveCSS("min-height", height);

      const tokenValues = await getDesignTokensByCssProperty(
        page,
        textbox(page),
        "min-height",
      );
      expect(tokenValues[0]).toBe(token);
    });
  });

  [
    ["background", "--colorsUtilityYang100"],
    ["border", "--colorsUtilityMajor300"],
  ].forEach(([cssProp, token]) => {
    test(`should render with correct ${cssProp} token`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent />);

      const tokenValues = await getDesignTokensByCssProperty(
        page,
        textbox(page),
        cssProp,
      );
      expect(tokenValues[0]).toBe(token);
    });
  });

  test("should render with data-element prop", async ({ mount, page }) => {
    await mount(<TextboxComponent data-element={CHARACTERS.STANDARD} />);

    await expect(
      getDataElementByValue(page, CHARACTERS.STANDARD),
    ).toBeVisible();
  });

  test("should render with data-role prop", async ({ mount, page }) => {
    await mount(<TextboxComponent data-role={CHARACTERS.STANDARD} />);

    await expect(getDataRoleByValue(page, CHARACTERS.STANDARD)).toBeVisible();
  });

  test("should render with id prop", async ({ mount, page }) => {
    await mount(<TextboxComponent id={CHARACTERS.STANDARD} />);

    await expect(textboxInput(page)).toHaveId(CHARACTERS.STANDARD);
  });

  testData.forEach((labelVals) => {
    test(`should render with label prop ${labelVals}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent label={labelVals} />);

      const label = getDataElementByValue(page, "label");

      await expect(label).toHaveText(labelVals);
    });
  });

  test("should render with labelInline prop", async ({ mount, page }) => {
    await mount(<TextboxComponent labelInline />);

    const labelParent = getDataElementByValue(page, "label").locator("..");
    await expect(labelParent).toHaveCSS("justify-content", "flex-end");
  });

  (
    [
      ["left", "start"],
      ["right", "end"],
    ] as [TextboxProps["labelAlign"], string][]
  ).forEach(([labelAlign, cssValue]) => {
    test(`should render with ${labelAlign} labelAlign prop`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent labelInline labelAlign={labelAlign} />);

      const labelParent = getDataElementByValue(page, "label").locator("..");
      await expect(labelParent).toHaveCSS(
        "justify-content",
        `flex-${cssValue}`,
      );
    });
  });

  testData.forEach((labelHelp) => {
    test(`should render with labelHelp prop ${labelHelp}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent labelInline labelHelp={labelHelp} />);

      const question = getDataElementByValue(page, "question");
      await question.click();

      await expect(tooltipPreview(page)).toHaveText(labelHelp);
    });
  });

  (
    [
      [1, "8px"],
      [2, "16px"],
    ] as [TextboxProps["labelSpacing"], string][]
  ).forEach(([spacing, padding]) => {
    test(`should render with labelSpacing prop ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent labelInline labelSpacing={spacing} />);

      const labelParent = getDataElementByValue(page, "label").locator("..");
      await expect(labelParent).toHaveCSS("padding-right", padding);
    });
  });

  (
    [
      [10, 90, 135, 1229],
      [30, 70, 409, 956],
      [80, 20, 1092, 273],
    ] as [
      TextboxProps["labelWidth"],
      TextboxProps["inputWidth"],
      number,
      number,
    ][]
  ).forEach(([labelVal, inputVal, labelRatio, inputRatio]) => {
    test(`should render with correct ratios when inputWidth prop is ${inputVal} and labelWidth prop is ${labelVal}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TextboxComponent
          labelInline
          labelWidth={labelVal}
          inputWidth={inputVal}
        />,
      );

      const labelParent = getDataElementByValue(page, "label").locator("..");
      const inputParent = getDataElementByValue(page, "input").locator("..");

      await assertCssValueIsApproximately(labelParent, "width", labelRatio);
      await assertCssValueIsApproximately(inputParent, "width", inputRatio);
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
      await mount(<TextboxComponent inputHint={hint} />);

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
      [4, "with", "is"],
      ["", "without", "is not"],
    ] as [TextboxProps["characterLimit"], string, string][]
  ).forEach(([characterLimitVal, renderStatus, characterLimitStatus]) => {
    test(`should render ${renderStatus} a character count when the characterLimit prop ${characterLimitStatus} passed`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent characterLimit={characterLimitVal} />);

      const characterCount = getDataElementByValue(page, "character-count");

      if (renderStatus === "with") {
        await expect(characterCount).toHaveCount(1);
      } else {
        await expect(characterCount).toHaveCount(0);
      }
    });
  });

  (
    [
      [4, "with", "is"],
      ["", "without", "is not"],
    ] as [TextboxProps["characterLimit"], string, string][]
  ).forEach(([characterLimitVal, renderStatus, characterLimitStatus]) => {
    test(`should render ${renderStatus} a visually hidden character count when the characterLimit prop ${characterLimitStatus} passed`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent characterLimit={characterLimitVal} />);

      if (renderStatus === "with") {
        await expect(visuallyHiddenCharacterCount(page)).toHaveCount(1);
      } else {
        await expect(visuallyHiddenCharacterCount(page)).toHaveCount(0);
      }
    });
  });

  (
    [
      [4, "with", "is"],
      ["", "without", "is not"],
    ] as [TextboxProps["characterLimit"], string, string][]
  ).forEach(([characterLimitVal, renderStatus, characterLimitStatus]) => {
    test(`should render ${renderStatus} a visually hidden character count hint when the characterLimit prop ${characterLimitStatus} passed`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent characterLimit={characterLimitVal} />);

      const visuallyHiddenCharacterCountHint = getDataElementByValue(
        page,
        "visually-hidden-hint",
      );

      if (renderStatus === "with") {
        await expect(visuallyHiddenCharacterCountHint).toHaveCount(1);
      } else {
        await expect(visuallyHiddenCharacterCountHint).toHaveCount(0);
      }
    });
  });

  ["10%", "30%", "50%", "80%", "100%"].forEach((maxWidth) => {
    test(`should render with ${maxWidth} max-width`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent maxWidth={maxWidth} />);

      const textboxParent = textbox(page).locator("..");
      await expect(textboxParent).toHaveCSS("max-width", maxWidth);
    });
  });

  test("should render with max-width of 100%, when maxWidth prop is not passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent />);

    const textboxParent = textbox(page).locator("..");
    await expect(textboxParent).toHaveCSS("max-width", "100%");
  });

  test("should render with required prop", async ({ mount, page }) => {
    await mount(<TextboxComponent required />);

    await verifyRequiredAsteriskForLabel(page);
  });

  [5, 10, 11, 15, 20].forEach((limit) => {
    test(`should render and warn if the number of characters typed exceeds the set characterLimit of ${limit} and the enforceCharacterLimit prop is false`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent characterLimit={limit} />);

      const inputValue = "12345678901";
      const underCharacters =
        limit - inputValue.length === 1 ? "character" : "characters";
      const overCharacters =
        inputValue.length - limit === 1 ? "character" : "characters";

      await textboxInput(page).fill(inputValue);

      if (inputValue.length > limit) {
        await expect(characterLimit(page)).toHaveText(
          `${inputValue.length - limit} ${overCharacters} too many`,
        );
        await expect(characterLimit(page)).toHaveCSS(
          "color",
          "rgb(203, 55, 74)",
        );
      } else {
        await expect(characterLimit(page)).toHaveText(
          `${limit - inputValue.length} ${underCharacters} left`,
        );
        await expect(characterLimit(page)).toHaveCSS(
          "color",
          "rgba(0, 0, 0, 0.55)",
        );
      }
    });
  });

  test("should render with name prop", async ({ mount, page }) => {
    await mount(<TextboxComponent name={CHARACTERS.STANDARD} />);

    await expect(textboxInput(page)).toHaveAttribute(
      "name",
      CHARACTERS.STANDARD,
    );
  });

  test("should render with disabled prop", async ({ mount, page }) => {
    await mount(<TextboxComponent disabled />);

    await expect(textboxInput(page)).toBeDisabled();
  });

  test("should render with an icon and the disabled prop", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent disabled inputIcon="bin" />);

    const inputIcon = textbox(page).locator(ICON);

    await expect(inputIcon).toBeVisible();
    await expect(inputIcon).toHaveCSS("color", "rgba(0, 0, 0, 0.3)");
  });

  testData.forEach((placeholder) => {
    test(`should render with placeholder prop ${placeholder}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent placeholder={placeholder} />);

      await expect(textboxInput(page)).toHaveAttribute(
        "placeholder",
        placeholder,
      );
    });
  });

  test("should render with autoFocus prop and correct focus styling", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent autoFocus />);

    await expect(textboxInput(page)).toBeFocused();
    await expect(textbox(page)).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(textbox(page)).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
  });

  test("should render with readOnly prop", async ({ mount, page }) => {
    await mount(<TextboxComponent readOnly />);

    await expect(textboxInput(page)).not.toBeEditable();
  });

  test("should render with an icon and the readOnly prop", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent disabled inputIcon="bin" />);

    const inputIcon = textbox(page).locator(ICON);

    await expect(inputIcon).toBeVisible();
    await expect(inputIcon).toHaveCSS("color", "rgba(0, 0, 0, 0.3)");
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`should render with a ${type} validation icon on input`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TextboxComponent
          labelInline
          labelAlign="right"
          {...{ [type]: "Message" }}
        />,
      );

      await expect(textbox(page).locator(ICON)).toHaveAttribute(
        "data-element",
        type,
      );
    });
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`should render with a ${type} validation icon on label`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TextboxComponent
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
        <TextboxComponent
          labelInline
          labelAlign="right"
          {...{ [type]: bool }}
        />,
      );

      await expect(textbox(page)).toHaveCSS("border-bottom-color", borderColor);
    });
  });

  test("should render with leftChildren prop", async ({ mount, page }) => {
    await mount(<TextboxComponentWithLeftChildren />);

    await expect(textbox(page).locator(BUTTON)).toBeVisible();
  });

  testData.forEach((prefix) => {
    test(`should render with prefix prop ${prefix}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent prefix={prefix} />);

      await expect(textboxPrefix(page)).toHaveText(prefix);
      await expect(textboxPrefix(page)).toHaveCSS("font-size", "14px");
      await expect(textboxPrefix(page)).toHaveCSS("font-weight", "700");
      await expect(textboxPrefix(page)).toHaveCSS("margin-left", "12px");
    });
  });

  [
    ["", "without", "row-reverse"],
    ["foo", "with", "row"],
  ].forEach(([prefix, prefixStatus, flexDirection]) => {
    test(`should render ${prefixStatus} prefix prop when the align prop is also set to 'right'`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent prefix={prefix} align="right" />);

      await expect(textbox(page)).toHaveCSS("flex-direction", flexDirection);
    });
  });

  test("should render with positionedChildren prop", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponentWithPositionedChildren />);

    const textboxParent = textbox(page).locator("..");
    await expect(textboxParent.locator("button")).toBeVisible();
  });

  (
    [
      ["flex", 399],
      ["flex", 400],
      ["block", 401],
    ] as [string, TextboxProps["adaptiveLabelBreakpoint"]][]
  ).forEach(([displayValue, breakpoint]) => {
    test(`should render with ${displayValue} label alignment when the adaptiveLabelBreakpoint prop is ${breakpoint} with a set viewport of 400`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({ width: 400, height: 300 });
      await mount(<TextboxComponent adaptiveLabelBreakpoint={breakpoint} />);

      const labelParentParent = getDataElementByValue(page, "label")
        .locator("..")
        .locator("..");
      await expect(labelParentParent).toHaveCSS("display", displayValue);
    });
  });

  test("should render with labelId prop", async ({ mount, page }) => {
    await mount(<TextboxComponent id={CHARACTERS.STANDARD} />);

    const label = getDataElementByValue(page, "label");

    await expect(label).toHaveAttribute("id", `${CHARACTERS.STANDARD}-label`);
    await expect(label).toHaveAttribute("for", CHARACTERS.STANDARD);
  });

  testData.forEach((fieldHelp) => {
    test(`should render with fieldHelp prop ${fieldHelp}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent fieldHelp={fieldHelp} />);

      await expect(fieldHelpPreview(page)).toHaveText(fieldHelp);
    });
  });

  test("should render with formattedValue prop", async ({ mount, page }) => {
    await mount(<TextboxComponent formattedValue={CHARACTERS.STANDARD} />);

    await expect(textboxInput(page)).toHaveAttribute(
      "value",
      CHARACTERS.STANDARD,
    );
  });

  (["add", "filter", "play"] as TextboxProps["inputIcon"][]).forEach((icon) => {
    test(`should render with ${icon} input icon`, async ({ mount, page }) => {
      await mount(<TextboxComponent inputIcon={icon} />);

      const inputIcon = getDataElementByValue(page, "input-icon-toggle");
      await expect(textbox(page).locator(inputIcon)).toBeVisible();
    });
  });

  (
    ["top", "bottom", "left", "right"] as TextboxProps["tooltipPosition"][]
  ).forEach((position) => {
    test(`should render with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box m="250px">
          <TextboxComponent
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
      <TextboxComponent
        labelHelp="fieldHelp"
        helpAriaLabel={CHARACTERS.STANDARD}
      />,
    );

    const help = getDataComponentByValue(page, "help");

    await expect(help).toHaveAttribute("aria-label", CHARACTERS.STANDARD);
  });

  (["left", "right"] as TextboxProps["align"][]).forEach((align) => {
    test(`should render with align prop set to ${align}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent align={align} />);

      await expect(textboxInput(page)).toHaveCSS("text-align", align as string);
    });
  });

  test("should render with ref prop and focus on input via click on ref", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponentRef />);

    await getDataComponentByValue(page, "button").click();

    await expect(textboxInput(page)).toBeFocused();
  });

  testData.forEach((value) => {
    test(`should render and input ${value} as value`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent />);

      await textboxInput(page).fill(value);

      await expect(textboxInput(page)).toHaveValue(value);
    });
  });
});

test.describe("Event checks", () => {
  test("should call onChange callback when a type event is triggered", async ({
    mount,
    page,
  }) => {
    const inputValue = "1";
    let callbackCount = 0;
    await mount(
      <TextboxComponent
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    await textboxInput(page).type(inputValue);

    expect(callbackCount).toBe(1);
  });

  test("should call onBlur callback when a blur event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextboxComponent
        onBlur={() => {
          callbackCount += 1;
        }}
      />,
    );

    await textboxInput(page).click();
    await textboxInput(page).blur();

    expect(callbackCount).toBe(1);
  });

  ["disabled", "readOnly"].forEach((propName) => {
    test(`should not call onClick callback when a click event is triggered and input is ${propName}`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <TextboxComponent
          onClick={() => {
            callbackCount += 1;
          }}
          disabled={propName === "disabled"}
          readOnly={propName === "readOnly"}
        />,
      );

      await textboxInput(page).dispatchEvent("click");

      expect(callbackCount).toBe(0);
    });

    test(`should not call onMouseDown callback when a click event is triggered and input is ${propName}`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <TextboxComponent
          onMouseDown={() => {
            callbackCount += 1;
          }}
          disabled={propName === "disabled"}
          readOnly={propName === "readOnly"}
        />,
      );

      await textboxInput(page).dispatchEvent("mousedown");

      expect(callbackCount).toBe(0);
    });

    test(`should not call iconOnMouseDown callback when a click event is triggered and input is ${propName}`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <TextboxComponent
          iconOnMouseDown={() => {
            callbackCount += 1;
          }}
          inputIcon="add"
          disabled={propName === "disabled"}
          readOnly={propName === "readOnly"}
        />,
      );

      await getDataComponentByValue(page, "icon").click({ button: "left" });

      expect(callbackCount).toBe(0);
    });

    test(`should not call iconOnClick callback when a click event is triggered and input is ${propName}`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <TextboxComponent
          iconOnClick={() => {
            callbackCount += 1;
          }}
          inputIcon="add"
          disabled={propName === "disabled"}
          readOnly={propName === "readOnly"}
        />,
      );

      await getDataComponentByValue(page, "icon").click();

      expect(callbackCount).toBe(0);
    });
  });

  test("should call onClick callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextboxComponent
        onClick={() => {
          callbackCount += 1;
        }}
      />,
    );

    await textboxInput(page).click();

    expect(callbackCount).toBe(1);
  });

  test("should call onFocus callback when a focus event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextboxComponent
        onFocus={() => {
          callbackCount += 1;
        }}
      />,
    );

    await textboxInput(page).focus();

    expect(callbackCount).toBe(1);
  });

  test("should call onMouseDown callback when a mousedown event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextboxComponent
        onMouseDown={() => {
          callbackCount += 1;
        }}
      />,
    );

    await textboxInput(page).dispatchEvent("mousedown");

    expect(callbackCount).toBe(1);
  });

  test("should call iconOnMouseDown callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextboxComponent
        iconOnMouseDown={() => {
          callbackCount += 1;
        }}
        inputIcon="add"
      />,
    );

    await getDataComponentByValue(page, "icon").click({ button: "left" });

    expect(callbackCount).toBe(1);
  });

  test("should call iconOnClick callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextboxComponent
        iconOnClick={() => {
          callbackCount += 1;
        }}
        inputIcon="add"
      />,
    );

    await getDataComponentByValue(page, "icon").click();

    expect(callbackCount).toBe(1);
  });

  [keysToTrigger[0], keysToTrigger[1]].forEach((key) => {
    test(`should call iconOnClick callback when ${key} key is triggered`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <TextboxComponent
          inputIcon="home"
          iconOnClick={() => {
            callbackCount += 1;
          }}
          iconTabIndex={0}
        />,
      );

      await getDataElementByValue(page, "input-icon-toggle").press(key);

      expect(callbackCount).toEqual(1);
    });
  });

  [keysToTrigger[0], keysToTrigger[1]].forEach((key) => {
    test(`should call onKeyDown callback when ${key} key is triggered`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <TextboxComponent
          onKeyDown={() => {
            callbackCount += 1;
          }}
        />,
      );

      await textboxInput(page).press(key);

      expect(callbackCount).toEqual(1);
    });
  });
});

test("Component should have the expected border radius styling", async ({
  mount,
  page,
}) => {
  await mount(<TextboxComponent />);
  await expect(textboxInput(page)).toHaveCSS("border-radius", "4px");
});

test.describe("Accessibility tests for Textbox component", () => {
  test("should pass accessibility tests for default component with a set value and label", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when autoFocus prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent autoFocus />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when characterLimit prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent characterLimit={5} />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when disabled prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent disabled />);

    await checkAccessibility(page);
  });

  (["left", "right"] as TextboxProps["align"][]).forEach((align) => {
    test(`should pass accessibility tests when LabelAlign prop is ${align}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent labelAlign={align} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests when margin prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent m={4} />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when prefix prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent prefix="foo" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when readOnly prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent readOnly />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when required prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent required />);

    await checkAccessibility(page);
  });

  (["small", "medium", "large"] as TextboxProps["size"][]).forEach((align) => {
    test(`should pass accessibility tests when sizes prop is ${align}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextboxComponent size={align} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests when opted into new validation designs", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxNewDesignsValidation />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when boolean validations are passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxValidationsAsABoolean />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when string validations are passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxValidationsAsAString />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when string validations are passed and displayed on label", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxValidationsAsAStringDisplayedOnLabel />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when custom string validations are passed and displayed on tooltip", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxValidationsAsAStringWithTooltipCustom />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when string validations are displayed on tooltip", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxValidationsAsAStringWithTooltipDefault />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when inputWidth and labelWidth props are passed and labelInline is true", async ({
    mount,
    page,
  }) => {
    await mount(
      <TextboxComponent labelInline labelWidth={73} inputWidth={27} />,
    );

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when maxWidth prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent maxWidth="73" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when fieldHelp prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent fieldHelp="Help" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when labelHelp and helpAriaLabel props are passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent labelHelp="Help" helpAriaLabel="help" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests when labelInline prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextboxComponent labelInline />);

    await checkAccessibility(page);
  });
});

test("should set aria-live attribute on Character Count to `polite` when component is focused and then change back to `off` when component is blurred", async ({
  mount,
  page,
}) => {
  await mount(<TextboxComponentWithCharacterLimit />);

  const CharacterCountElement = visuallyHiddenCharacterCount(page);
  const textboxElement = textboxInput(page);
  const buttonElement = page.getByRole("button");

  await expect(CharacterCountElement).toHaveAttribute("aria-live", "off");

  await textboxElement.focus();
  await textboxElement.fill("Foo");

  await expect(CharacterCountElement).toHaveAttribute("aria-live", "polite");

  await buttonElement.click();

  await expect(CharacterCountElement).toHaveAttribute("aria-live", "off");
});

import { expect, test } from "@playwright/experimental-ct-react";
import { TextareaProps } from "components/textarea";
import React from "react";

import {
  characterCount,
  fieldHelpPreview,
  getComponent,
  getDataElementByValue,
  getDataRoleByValue,
  getElement,
  tooltipPreview,
  visuallyHiddenCharacterCount,
  visuallyHiddenHint,
} from "../../../playwright/components";
import { ICON } from "../../../playwright/components/locators";
import {
  textarea,
  textareaChildren,
} from "../../../playwright/components/textarea";
import { CHARACTERS, VALIDATION } from "../../../playwright/support/constants";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
  verifyRequiredAsteriskForLabel,
  waitForAnimationEnd,
} from "../../../playwright/support/helper";
import Box from "../box";
import {
  AutoFocusExample,
  CharacterLimitExample,
  CharacterLimitExampleWithButton,
  CustomWidthExample,
  Default,
  DisabledExample,
  ExpandableExample,
  FieldHelpExample,
  InScrollableContainer,
  LabelAlignExample,
  LabelHelpExample,
  LabelInlineExample,
  MaxWidthExample,
  NewDesignValidationExample,
  ReadOnlyExample,
  RequiredExample,
  TextareaComponent,
  ValidationBooleanExample,
  ValidationLabelExample,
  ValidationLabelPositionExample,
  ValidationStringExample,
  ValidationStringPositionExample,
} from "./components.test-pw";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("Props tests for Textarea component", () => {
  test("should render with data-element prop", async ({ mount, page }) => {
    await mount(<TextareaComponent data-element={CHARACTERS.STANDARD} />);

    await expect(
      getDataElementByValue(page, CHARACTERS.STANDARD),
    ).toHaveAttribute("data-element", CHARACTERS.STANDARD);
  });

  test("should render with data-role prop", async ({ mount, page }) => {
    await mount(<TextareaComponent data-role={CHARACTERS.STANDARD} />);

    await expect(getDataRoleByValue(page, CHARACTERS.STANDARD)).toHaveAttribute(
      "data-role",
      CHARACTERS.STANDARD,
    );
  });

  test("should render with id prop", async ({ mount, page }) => {
    await mount(<TextareaComponent id={CHARACTERS.STANDARD} />);

    const textareaChildrenElement = textareaChildren(page);

    await expect(textareaChildrenElement).toHaveId(CHARACTERS.STANDARD);
  });

  testData.forEach((label) => {
    test(`should render with label prop set to ${label}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextareaComponent label={label} />);

      const labelElement = getDataElementByValue(page, "label");

      await expect(labelElement).toHaveText(label);
    });
  });

  test("should render with labelInline prop", async ({ mount, page }) => {
    await mount(<TextareaComponent labelInline />);

    const labelElementParent = getDataElementByValue(page, "label").locator(
      "..",
    );

    await expect(labelElementParent).toHaveCSS("justify-content", "flex-end");
  });

  (
    [
      ["left", "flex-start"],
      ["right", "flex-end"],
    ] as [TextareaProps["labelAlign"], string][]
  ).forEach(([labelAlign, cssValue]) => {
    test(`should render with labelAlign prop set to ${labelAlign}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextareaComponent labelInline labelAlign={labelAlign} />);

      const labelElementParent = getDataElementByValue(page, "label").locator(
        "..",
      );

      await expect(labelElementParent).toHaveCSS("justify-content", cssValue);
    });
  });

  testData.forEach((labelHelp) => {
    test(`should render with labelHelp prop set to ${labelHelp}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextareaComponent labelInline labelHelp={labelHelp} />);
      const questionIconElement = getDataElementByValue(page, "question");
      await questionIconElement.hover();

      const tooltipPreviewElement = tooltipPreview(page);

      await expect(tooltipPreviewElement).toHaveText(labelHelp);
    });
  });

  (
    [
      [1, "8px"],
      [2, "16px"],
    ] as [TextareaProps["labelSpacing"], string][]
  ).forEach(([spacing, padding]) => {
    test(`should render with labelSpacing prop set to ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextareaComponent labelInline labelSpacing={spacing} />);

      const labelElementParent = getDataElementByValue(page, "label").locator(
        "..",
      );

      await expect(labelElementParent).toHaveCSS("padding-right", padding);
    });
  });

  (
    [
      [10, 90, 135, 1229],
      [30, 70, 409, 956],
      [80, 20, 1092, 273],
    ] as [
      TextareaProps["labelWidth"],
      TextareaProps["inputWidth"],
      number,
      number,
    ][]
  ).forEach(([label, input, labelRatio, inputRatio]) => {
    test(`should use ${label} as labelWidth, ${input} as inputWidth and render it with correct label and input width ratios`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TextareaComponent labelInline labelWidth={label} inputWidth={input} />,
      );

      const labelElementParent = getDataElementByValue(page, "label").locator(
        "..",
      );

      await assertCssValueIsApproximately(
        labelElementParent,
        "width",
        labelRatio,
      );

      const inputElementParent = getDataElementByValue(page, "input").locator(
        "..",
      );

      await assertCssValueIsApproximately(
        inputElementParent,
        "width",
        inputRatio,
      );
    });
  });

  test("should render with required prop", async ({ mount, page }) => {
    await mount(<TextareaComponent required />);

    await verifyRequiredAsteriskForLabel(page);
  });

  (
    [
      [11, 11, "rgba(0, 0, 0, 0.55)"],
      [11, 10, "rgb(203, 55, 74)"],
    ] as const
  ).forEach(([charactersUsed, limit, color]) => {
    test(`should input ${charactersUsed} characters and warn if over character limit of ${limit} in Textarea`, async ({
      mount,
      page,
    }) => {
      const inputValue = "12345678901";
      const underCharacters =
        limit - charactersUsed === 1 ? "character" : "characters";
      const overCharacters =
        charactersUsed - limit === 1 ? "character" : "characters";
      await mount(<TextareaComponent characterLimit={limit} />);

      await textareaChildren(page).fill(inputValue);

      await expect(characterCount(page)).toHaveText(
        `${
          charactersUsed - limit
            ? `${charactersUsed - limit} ${overCharacters} too many`
            : `${charactersUsed - limit} ${underCharacters} left`
        }`,
      );

      await expect(characterCount(page)).toHaveCSS("color", color);

      await expect(visuallyHiddenCharacterCount(page)).toHaveText(
        `${
          charactersUsed - limit
            ? `${charactersUsed - limit} ${overCharacters} too many`
            : `${charactersUsed - limit} ${underCharacters} left`
        }`,
      );
    });
  });

  test("input hint should be rendered if a value is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextareaComponent inputHint="foo" />);

    await expect(getDataElementByValue(page, "input-hint")).toBeInViewport();
  });

  test("input hint should not be rendered if no value is passed", async ({
    mount,
    page,
  }) => {
    await mount(<TextareaComponent inputHint="" />);

    await expect(
      getDataElementByValue(page, "input-hint"),
    ).not.toBeInViewport();
  });

  test("character counter of 5 should be rendered", async ({ mount, page }) => {
    await mount(<TextareaComponent characterLimit={5} />);

    await expect(characterCount(page)).toBeInViewport();
  });

  test("character counter of undefined should not be rendered", async ({
    mount,
    page,
  }) => {
    await mount(<TextareaComponent characterLimit={undefined} />);

    await expect(characterCount(page)).not.toBeInViewport();
  });

  test("visually hidden character count of 5 should be rendered", async ({
    mount,
    page,
  }) => {
    await mount(<TextareaComponent characterLimit={5} />);

    const visuallyHiddenCharacterCountElement =
      visuallyHiddenCharacterCount(page);

    await expect(visuallyHiddenCharacterCountElement).toBeVisible();
  });

  test("visually hidden character count of undefined should not be rendered", async ({
    mount,
    page,
  }) => {
    await mount(<TextareaComponent characterLimit={undefined} />);

    const visuallyHiddenCharacterCountElement =
      visuallyHiddenCharacterCount(page);

    await expect(visuallyHiddenCharacterCountElement).not.toBeVisible();
  });

  test("visually hidden hint of 5 should be rendered", async ({
    mount,
    page,
  }) => {
    await mount(<TextareaComponent characterLimit={5} />);

    const visuallyHiddenHintElement = visuallyHiddenHint(page);

    await expect(visuallyHiddenHintElement).toBeVisible();
  });

  test("visually hidden hint of undefined should not be rendered", async ({
    mount,
    page,
  }) => {
    await mount(<TextareaComponent characterLimit={undefined} />);

    const visuallyHiddenHintElement = visuallyHiddenHint(page);

    await expect(visuallyHiddenHintElement).not.toBeVisible();
  });

  ["10%", "30%", "50%", "80%", "100%"].forEach((maxWidth) => {
    test(`should check maxWidth as ${maxWidth} for TextArea component`, async ({
      mount,
      page,
    }) => {
      await mount(<TextareaComponent maxWidth={maxWidth} />);

      const inputElementParentParent = getDataElementByValue(page, "input")
        .locator("..")
        .locator("..");

      await expect(inputElementParentParent).toHaveCSS("max-width", maxWidth);
    });
  });

  test("when maxWidth has no value it should render as 100%", async ({
    mount,
    page,
  }) => {
    await mount(<TextareaComponent maxWidth="" />);

    const inputElementParentParent = getDataElementByValue(page, "input")
      .locator("..")
      .locator("..");

    await expect(inputElementParentParent).toHaveCSS("max-width", "100%");
  });

  test("should render with name prop", async ({ mount, page }) => {
    await mount(<TextareaComponent name={CHARACTERS.STANDARD} />);

    await expect(textareaChildren(page)).toHaveAttribute(
      "name",
      CHARACTERS.STANDARD,
    );
  });

  test("should render with disabled prop", async ({ mount, page }) => {
    await mount(<TextareaComponent disabled />);

    const textareaChildrenElement = textareaChildren(page);

    await expect(textareaChildrenElement).toBeDisabled();
  });

  test("should render icon with disabled style", async ({ mount, page }) => {
    await mount(<TextareaComponent disabled inputIcon="bin" />);

    const textareaIcon = textarea(page).locator(ICON);

    await expect(textareaIcon).toBeVisible();
    await expect(textareaIcon).toHaveCSS("color", "rgba(0, 0, 0, 0.3)");
  });

  testData.forEach((placeholder) => {
    test(`should render with placeholder prop set to ${placeholder}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextareaComponent placeholder={placeholder} />);

      await expect(textareaChildren(page)).toHaveAttribute(
        "placeholder",
        placeholder,
      );
    });
  });

  test("should render with autoFocus prop and correct styling", async ({
    mount,
    page,
  }) => {
    await mount(<TextareaComponent autoFocus />);

    const textareaChildrenElement = textareaChildren(page);
    await expect(textareaChildrenElement).toBeFocused();

    await expect(textarea(page)).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
  });

  test("should render with readOnly prop", async ({ mount, page }) => {
    await mount(<TextareaComponent readOnly />);

    await expect(textareaChildren(page)).not.toBeEditable();
  });

  test("should render icon with readOnly style", async ({ mount, page }) => {
    await mount(<TextareaComponent readOnly inputIcon="bin" />);

    const textareaIcon = textarea(page).locator(ICON);
    await expect(textareaIcon).toBeVisible();
    await expect(textareaIcon).toHaveCSS("color", "rgba(0, 0, 0, 0.3)");
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`should verify component is displayed with ${type} validation icon on input`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TextareaComponent
          labelInline
          labelAlign="right"
          {...{
            [type]: "Message",
          }}
        />,
      );

      const textareaIcon = textarea(page).locator(ICON);

      await expect(textareaIcon).toHaveAttribute("data-element", type);
    });
  });

  ["error", "warning", "info"].forEach((type) => {
    test(`should verify component is displayed with ${type} validation icon on label`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TextareaComponent
          labelInline
          labelAlign="right"
          validationOnLabel
          {...{
            [type]: "Message",
          }}
        />,
      );

      const labelParentIcon = getDataElementByValue(page, "label")
        .locator("..")
        .locator(ICON);

      await expect(labelParentIcon).toHaveAttribute("data-element", type);
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
    ] as const
  ).forEach(([borderColor, type, bool]) => {
    test(`should verify component input border colour is ${borderColor} when validation is ${type} and boolean prop is ${bool}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <TextareaComponent
          labelInline
          labelAlign="right"
          {...{
            [type]: bool,
          }}
        />,
      );

      await expect(textarea(page)).toHaveCSS(
        "border-bottom-color",
        borderColor,
      );
    });
  });

  (
    [
      ["flex", 399],
      ["flex", 400],
      ["block", 401],
    ] as const
  ).forEach(([displayValue, breakpoint]) => {
    test(`should check label alignment is ${displayValue} with adaptiveLabelBreakpoint ${breakpoint} and viewport 400`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({
        width: 400,
        height: 300,
      });
      await mount(<TextareaComponent adaptiveLabelBreakpoint={breakpoint} />);

      const labelParentParentElement = getDataElementByValue(page, "label")
        .locator("..")
        .locator("..");

      await expect(labelParentParentElement).toHaveCSS("display", displayValue);
    });
  });

  testData.forEach((fieldHelp) => {
    test(`should render with fieldHelp prop set to ${fieldHelp}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextareaComponent fieldHelp={fieldHelp} />);

      await expect(fieldHelpPreview(page)).toHaveText(fieldHelp);
    });
  });

  (["add", "filter", "play"] as const).forEach((icon) => {
    test(`should render with inputIcon prop set to ${icon}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextareaComponent inputIcon={icon} />);

      const iconElement = getElement(page, icon);

      await expect(iconElement).toBeInViewport();
    });
  });

  (["top", "bottom", "left", "right"] as const).forEach((position) => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip(`should render component with tooltip positioned to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box m="250px">
          <TextareaComponent
            error={CHARACTERS.STANDARD}
            tooltipPosition={position}
          />
        </Box>,
      );

      const errorIcon = getDataElementByValue(page, "error");
      await errorIcon.hover();
      const tooltipPreviewElement = tooltipPreview(page);
      await waitForAnimationEnd(tooltipPreviewElement);

      await expect(tooltipPreviewElement).toHaveText(CHARACTERS.STANDARD);
      await expect(tooltipPreviewElement).toHaveAttribute(
        "data-placement",
        position,
      );
    });
  });

  test("should render with helpAriaLabel prop", async ({ mount, page }) => {
    await mount(
      <TextareaComponent
        labelHelp="field help"
        helpAriaLabel={CHARACTERS.STANDARD}
      />,
    );

    await expect(getComponent(page, "help")).toHaveAttribute(
      "aria-label",
      CHARACTERS.STANDARD,
    );
  });

  (["left", "right"] as const).forEach((align) => {
    test(`should render with align prop set to ${align}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextareaComponent align={align} />);

      await expect(textareaChildren(page)).toHaveCSS("text-align", align);
    });
  });

  testData.forEach((input) => {
    test(`should update value correctly when user types ${input}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextareaComponent />);

      const textareaChildrenElement = textareaChildren(page);
      await textareaChildrenElement.fill(input);

      await expect(textareaChildrenElement).toHaveText(input);
    });
  });

  testData.forEach((value) => {
    test(`should render with value prop set to ${value}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextareaComponent value={value} />);

      await expect(textareaChildren(page)).toHaveText(value);
    });
  });

  [5, 25, 100].forEach((rows) => {
    test(`should render with rows prop set to ${rows}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextareaComponent rows={rows} />);

      await expect(textareaChildren(page)).toHaveAttribute(
        "rows",
        String(rows),
      );
    });
  });

  (
    [
      [true, 92],
      [false, 64],
    ] as const
  ).forEach(([expandableValue, height]) => {
    test(`should verify is displayed with expandable set to ${expandableValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<TextareaComponent expandable={expandableValue} />);

      const textareaChildrenElement = textareaChildren(page);
      await textareaChildrenElement.press("t");
      await textareaChildrenElement.press("Enter");
      await textareaChildrenElement.press("e");
      await textareaChildrenElement.press("Enter");
      await textareaChildrenElement.press("s");
      await textareaChildrenElement.press("Enter");
      await textareaChildrenElement.press("t");

      await expect(textareaChildrenElement).toHaveCSS("height", `${height}px`);
    });
  });
});

test(`should verify expandable Textarea shrinks back to original height when lines are removed`, async ({
  mount,
  page,
}) => {
  await mount(<TextareaComponent expandable />);

  const textareaChildrenElement = textareaChildren(page);
  await textareaChildrenElement.press("t");
  await textareaChildrenElement.press("Enter");
  await textareaChildrenElement.press("e");
  await textareaChildrenElement.press("Enter");
  await textareaChildrenElement.press("s");
  await textareaChildrenElement.press("Enter");
  await textareaChildrenElement.press("t");

  await expect(textareaChildrenElement).toHaveCSS("height", "92px");

  await textareaChildrenElement.press("Backspace");
  await textareaChildrenElement.press("Backspace");

  await expect(textareaChildrenElement).toHaveCSS("height", "75px");

  await textareaChildrenElement.press("Backspace");
  await textareaChildrenElement.press("Backspace");

  await expect(textareaChildrenElement).toHaveCSS("height", "64px");
});

test.describe("Event tests for Textarea component", () => {
  const inputValue = "1";
  test("should call onChange callback when a type event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextareaComponent
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    const textareaChildrenElement = textareaChildren(page);
    await textareaChildrenElement.fill(inputValue);

    expect(callbackCount).toEqual(1);
  });

  test("should call onBlur callback when a blur event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextareaComponent
        onBlur={() => {
          callbackCount += 1;
        }}
      />,
    );

    const textareaChildrenElement = textareaChildren(page);
    await textareaChildrenElement.click();
    await textareaChildrenElement.blur();

    expect(callbackCount).toEqual(1);
  });

  test("should call onClick callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextareaComponent
        onClick={() => {
          callbackCount += 1;
        }}
      />,
    );

    const textareaChildrenElement = textareaChildren(page);
    await textareaChildrenElement.click();

    expect(callbackCount).toEqual(1);
  });

  test("should call onFocus callback when a focus event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextareaComponent
        onFocus={() => {
          callbackCount += 1;
        }}
      />,
    );

    const textareaChildrenElement = textareaChildren(page);
    await textareaChildrenElement.focus();

    expect(callbackCount).toEqual(1);
  });

  test("should call onMouseDown callback when a mousedown event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <TextareaComponent
        onMouseDown={() => {
          callbackCount += 1;
        }}
      />,
    );

    const textareaChildrenElement = textareaChildren(page);
    await textareaChildrenElement.dispatchEvent("mousedown");

    expect(callbackCount).toEqual(1);
  });

  const keysToTrigger = ["Enter", "Space"];

  keysToTrigger.forEach((key) => {
    test(`should call onKeyDown callback when ${key} key is triggered`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <TextareaComponent
          onKeyDown={() => {
            callbackCount += 1;
          }}
        />,
      );

      const textareaChildrenElement = textareaChildren(page);
      await textareaChildrenElement.focus();
      await textareaChildrenElement.press(key);

      expect(callbackCount).toEqual(1);
    });
  });
});

test.describe("Accessibility tests for Textarea component", () => {
  test("should pass accessibility tests for Textarea default Example", async ({
    mount,
    page,
  }) => {
    await mount(<Default label="accessibility label" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea AutoFocusExample", async ({
    mount,
    page,
  }) => {
    await mount(<AutoFocusExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea CharacterLimitExample", async ({
    mount,
    page,
  }) => {
    await mount(<CharacterLimitExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea CustomWidthExample", async ({
    mount,
    page,
  }) => {
    await mount(<CustomWidthExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea DisabledExample", async ({
    mount,
    page,
  }) => {
    await mount(<DisabledExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea ExpandableExample", async ({
    mount,
    page,
  }) => {
    await mount(<ExpandableExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea FieldHelpExample", async ({
    mount,
    page,
  }) => {
    await mount(<FieldHelpExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea LabelAlignExample", async ({
    mount,
    page,
  }) => {
    await mount(<LabelAlignExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea LabelHelpExample", async ({
    mount,
    page,
  }) => {
    await mount(<LabelHelpExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea LabelInlineExample", async ({
    mount,
    page,
  }) => {
    await mount(<LabelInlineExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea MaxWidthExample", async ({
    mount,
    page,
  }) => {
    await mount(<MaxWidthExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea NewDesignValidationExample", async ({
    mount,
    page,
  }) => {
    await mount(<NewDesignValidationExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea ReadOnlyExample", async ({
    mount,
    page,
  }) => {
    await mount(<ReadOnlyExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea RequiredExample", async ({
    mount,
    page,
  }) => {
    await mount(<RequiredExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea ValidationBooleanExample", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationBooleanExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea ValidationLabelPositionExample", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationLabelPositionExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea ValidationLabelExample", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationLabelExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea ValidationStringPositionExample", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationStringPositionExample />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Textarea ValidationStringExample", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationStringExample />);

    await checkAccessibility(page);
  });
});

test("should have the expected default border radius styling", async ({
  mount,
  page,
}) => {
  await mount(<TextareaComponent />);

  const inputElementParent = getElement(page, "input").locator("..");

  await expect(inputElementParent).toHaveCSS("border-radius", "4px");
});

test("should have the expected custom border radius styling", async ({
  mount,
  page,
}) => {
  await mount(<TextareaComponent borderRadius="borderRadius400" />);

  const inputElementParent = getElement(page, "input").locator("..");

  await expect(inputElementParent).toHaveCSS("border-radius", "32px");
});

test("should have the expected custom border radius styling when an array is passed", async ({
  mount,
  page,
}) => {
  await mount(
    <TextareaComponent borderRadius={["borderRadius400", "borderRadius010"]} />,
  );

  const inputElementParent = getElement(page, "input").locator("..");

  await expect(inputElementParent).toHaveCSS("border-radius", "32px 1px");
});

test("should not have borders when hideBorders prop is passed", async ({
  mount,
  page,
}) => {
  await mount(<TextareaComponent hideBorders />);

  const inputElementParent = getElement(page, "input").locator("..");

  await expect(inputElementParent).toHaveCSS(
    "border",
    "1px solid rgba(0, 0, 0, 0)",
  );
});

test("typing in the textarea should not change scroll position of the parent container", async ({
  mount,
  page,
}) => {
  await mount(<InScrollableContainer />);

  const textareaElement = page.getByRole("textbox");
  const scrollableBox = page.getByTestId("scrollable-box");

  // Select all textarea text, then move cursor to the end, to ensure that the box is scrolled to the bottom
  await textareaElement.selectText();
  await textareaElement.press("ArrowRight");

  const initialScrollPosition = await scrollableBox.evaluate(
    (element) => element.scrollTop,
  );

  await textareaElement.press("a");

  const finalScrollPosition = await scrollableBox.evaluate(
    (element) => element.scrollTop,
  );
  expect(finalScrollPosition).toBeCloseTo(initialScrollPosition);
});

test("should set aria-live attribute on Character Count to `polite` when component is focused and then change back to `off` when component is blurred", async ({
  mount,
  page,
}) => {
  await mount(<CharacterLimitExampleWithButton />);

  const CharacterCountElement = visuallyHiddenCharacterCount(page);
  const textareaElement = textareaChildren(page);
  const buttonElement = page.getByRole("button");

  await expect(CharacterCountElement).toHaveAttribute("aria-live", "off");

  await textareaElement.focus();
  await textareaElement.fill("Foo");

  await expect(CharacterCountElement).toHaveAttribute("aria-live", "polite");

  await buttonElement.click();

  await expect(CharacterCountElement).toHaveAttribute("aria-live", "off");
});

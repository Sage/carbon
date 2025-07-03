import React from "react";
import { Locator } from "@playwright/test";
import { test, expect } from "../../../playwright/helpers/base-test";

import {
  commonDataElementInputPreview,
  fieldHelpPreview,
  getDataElementByValue,
  getElement,
  tooltipPreview,
} from "../../../playwright/components/index";
import { textboxPrefix, textbox } from "../../../playwright/components/textbox";

import { CHARACTERS } from "../../../playwright/support/constants";
import {
  checkAccessibility,
  getStyle,
} from "../../../playwright/support/helper";

import Decimal, { DecimalProps } from "../../../src/components/decimal";
import {
  DefaultStory,
  WithCustomPrecision,
  WithCustomLabelWidthAndInputWidth,
  WithCustomMaxWidth,
  WithFieldHelp,
  WithLabelHelp,
  Required,
  LeftAligned,
  Validations,
  ValidationsRedesign,
  ValidationsTooltip,
  ValidationsTooltipLabel,
} from "./components.test-pw";

test.describe("check props for Decimal component", () => {
  (
    [
      [0, "1", "1"],
      [0, "134^", "134^"],
      [0, "1234567789", "1,234,567,789"],
      [0, ",,,,,", ",,,,,"],
      [0, ".....", "....."],
      [0, "abc,.123,.!@.00", "abc,.123,.!@.00"],
      [0, "1,234$", "1,234$"],
      [1, "1", "1.0"],
      [1, "1.2", "1.2"],
      [1, "1.23", "1.23"],
      [2, "2", "2.00"],
      [2, "2.1", "2.10"],
      [2, "2.12", "2.12"],
      [2, "2.123", "2.123"],
      [3, "2.1", "2.100"],
      [3, "2.12", "2.120"],
      [3, "2.123", "2.123"],
      [3, "2.1234", "2.1234"],
      [4, "1.1234", "1.1234"],
      [4, "2", "2.0000"],
      [4, "234556654", "234,556,654.0000"],
      [4, "%^%^%<<,,,", "%^%^%<<,,,"],
      [5, "1", "1.00000"],
      [5, "1.12345", "1.12345"],
      [5, "1a.23", "1a.23"],
      [6, "2.123456", "2.123456"],
      [6, "2.1", "2.100000"],
      [6, "2a.12", "2a.12"],
      [6, "1,232.123", "1,232.123000"],
      [7, "1", "1.0000000"],
      [7, "2344.1234567", "2,344.1234567"],
      [7, "88652344.1234567", "88,652,344.1234567"],
      [8, "1", "1.00000000"],
      [8, "1.2", "1.20000000"],
      [8, "1.23", "1.23000000"],
      [9, "2", "2.000000000"],
      [9, "2.1", "2.100000000"],
      [9, "1222.12", "1,222.120000000"],
      [9, "2.123000000", "2.123000000"],
      [10, "2.1", "2.1000000000"],
      [10, "2.12", "2.1200000000"],
      [10, "1222.123", "1,222.1230000000"],
      [10, "2.12345", "2.1234500000"],
      [11, "1", "1.00000000000"],
      [11, "2345", "2,345.00000000000"],
      [11, "17899536472345", "17,899,536,472,345.00000000000"],
      [12, "1", "1.000000000000"],
      [12, "1.12345", "1.123450000000"],
      [12, "1a.23", "1a.23"],
      [13, "2", "2.0000000000000"],
      [13, "2.1", "2.1000000000000"],
      [13, "2a.12", "2a.12"],
      [13, "1232.123", "1,232.1230000000000"],
      [14, "2.1", "2.10000000000000"],
      [14, "2.12", "2.12000000000000"],
      [14, "2.123", "2.12300000000000"],
      [14, "1222.1234", "1,222.12340000000000"],
      [15, "1", "1.000000000000000"],
      [15, "2332.78", "2,332.780000000000000"],
      [15, "1a3.55", "1a3.55"],
      [15, "1.12345", "1.123450000000000"],
      [15, "1a.23", "1a.23"],
    ] as const
  ).forEach(([precision, inputValue, outputValue]) => {
    test(`should use ${precision} as precision and ${inputValue} as input value to produce ${outputValue} output value`, async ({
      mount,
      page,
    }) => {
      await mount(<Decimal precision={precision} />);

      const commonDataElementInputPreviewElement =
        commonDataElementInputPreview(page);
      await commonDataElementInputPreviewElement.fill(inputValue);
      await commonDataElementInputPreviewElement.blur();
      await expect(commonDataElementInputPreviewElement).toHaveAttribute(
        "value",
        outputValue,
      );
    });
  });

  (
    [
      ["en", "1,1,1,1,1.1", "11,111.100"],
      ["en", "1,1,1222,12,1.1", "111,222,121.100"],
      ["en", "1,,1,,1", "1,,1,,1"],
      ["es-ES", "1.1.1.1.1.1,1", "111.111,100"],
      ["es-ES", "2.123", "2123,000"],
      ["es-ES", "21.21.111.1,013", "21.211.111,013"],
      ["es-ES", "2.,12.,1", "2.,12.,1"],
      ["fr", "11111,25", "11 111,250"],
      ["fr", "1  1  1  1  1,25", "1  1  1  1  1,25"],
      ["pt-PT", "1111,2", "1111,200"],
      ["pt-PT", "111 11,25", "11 111,250"],
      ["no-NO", "1 1 11,21", "1 111,210"],
      ["no-No", "111 1 1,25", "11 111,250"],
      ["no-NO", "1  1  1  1  1,25", "1  1  1  1  1,25"],
    ] as const
  ).forEach(([locale, inputValue, outputValue]) => {
    test(`should use ${locale} locale and ${inputValue} input value to produce ${outputValue} output value`, async ({
      mount,
      page,
    }) => {
      await mount(<Decimal locale={locale} precision={3} />);

      const commonDataElementInputPreviewElement =
        commonDataElementInputPreview(page);
      await commonDataElementInputPreviewElement.fill(inputValue);
      await commonDataElementInputPreviewElement.blur();
      const value = await commonDataElementInputPreviewElement.evaluate(
        (element) =>
          (element as HTMLInputElement).value.replace(
            /(\s)|(&nbsp;)|(\u00a0)/g,
            " ",
          ),
      );
      expect(value).toBe(outputValue);
    });
  });

  test("should render Decimal with readOnly prop", async ({ mount, page }) => {
    await mount(<Decimal readOnly />);

    const inputValue = "test";
    const commonDataElementInputPreviewElement =
      commonDataElementInputPreview(page);
    await commonDataElementInputPreviewElement.type(inputValue);
    await commonDataElementInputPreviewElement.blur();
    await expect(commonDataElementInputPreviewElement).not.toHaveAttribute(
      "value",
      inputValue,
    );
    await expect(commonDataElementInputPreviewElement).not.toBeEditable();
  });

  (["10%", "30%", "50%", "80%", "100%"] as const).forEach((maxWidth) => {
    test(`should check maxWidth as ${maxWidth} for Decimal component`, async ({
      mount,
      page,
    }) => {
      await mount(<Decimal maxWidth={maxWidth} />);

      const textboxParent = await textbox(page).evaluateHandle(
        (element: Element) => {
          return element.parentElement;
        },
      );
      const maxWidthValue = await getStyle(
        textboxParent as unknown as Locator,
        "max-width",
      );
      expect(maxWidthValue).toContain(maxWidth);
    });
  });

  test("when maxWidth has no value it should render as 100%", async ({
    mount,
    page,
  }) => {
    await mount(<Decimal maxWidth="" />);

    const textboxParent = await textbox(page).evaluateHandle(
      (element: Element) => {
        return element.parentElement;
      },
    );
    const maxWidthValue = await getStyle(
      textboxParent as unknown as Locator,
      "max-width",
    );
    expect(maxWidthValue).toContain("100%");
  });
});

test.describe("check Decimal input", () => {
  const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
  testData.forEach((specificValue) => {
    test(`check label renders properly with ${specificValue} as specific value`, async ({
      mount,
      page,
    }) => {
      await mount(<Decimal fieldHelp={specificValue} />);

      const fieldHelpPreviewElement = fieldHelpPreview(page);
      await expect(fieldHelpPreviewElement).toHaveText(specificValue);
    });
  });

  testData.forEach((specificValue) => {
    test(`check fieldHelp renders properly with ${specificValue} specific value`, async ({
      mount,
      page,
    }) => {
      await mount(<Decimal label={specificValue} />);

      const getDataElementByValueElementLabel = getDataElementByValue(
        page,
        "label",
      );
      await expect(getDataElementByValueElementLabel).toHaveText(specificValue);
    });
  });

  testData.forEach((specificValue) => {
    test(`check tooltip renders properly with ${specificValue} specific values`, async ({
      mount,
      page,
    }) => {
      await mount(<Decimal label="Label" labelHelp={specificValue} />);

      const getDataElementByValueElementQuestion = getDataElementByValue(
        page,
        "question",
      );
      await getDataElementByValueElementQuestion.hover();
      const tooltipPreviewElement = tooltipPreview(page);
      await expect(tooltipPreviewElement).toHaveText(specificValue);
    });
  });

  testData.forEach((prefix) => {
    test(`should render Decimal with prefix prop set to ${prefix}`, async ({
      mount,
      page,
    }) => {
      await mount(<Decimal prefix={prefix} />);

      const textboxPrefixElement = textboxPrefix(page);
      await expect(textboxPrefixElement).toHaveText(prefix);
      await expect(textboxPrefixElement).toHaveCSS("font-size", "14px");
      await expect(textboxPrefixElement).toHaveCSS("font-weight", "700");
      await expect(textboxPrefixElement).toHaveCSS("margin-left", "12px");
    });
  });

  test("when prefix prop is set, 'flex-direction' should be 'row'", async ({
    mount,
    page,
  }) => {
    await mount(<Decimal prefix="foo" />);

    const textboxInput = textbox(page);
    await expect(textboxInput).toHaveCSS("flex-direction", "row");
  });

  testData.forEach((specificValue) => {
    test(`check Decimal component accepts ${specificValue} as specific value`, async ({
      mount,
      page,
    }) => {
      await mount(<Decimal />);

      const commonDataElementInputPreviewElement =
        commonDataElementInputPreview(page);
      await commonDataElementInputPreviewElement.fill(specificValue);
      await commonDataElementInputPreviewElement.blur();
      const value = await commonDataElementInputPreviewElement.evaluate(
        (element) =>
          (element as HTMLInputElement).value.replace(
            /(\s)|(&nbsp;)|(\u00a0)/g,
            " ",
          ),
      );
      expect(value).toBe(specificValue);
    });
  });

  test("check Decimal component accepts white spaces", async ({
    mount,
    page,
  }) => {
    await mount(<Decimal />);

    const commonDataElementInputPreviewElement =
      commonDataElementInputPreview(page);
    await commonDataElementInputPreviewElement.fill("   ");
    await commonDataElementInputPreviewElement.blur();
    await expect(commonDataElementInputPreviewElement).toHaveAttribute(
      "value",
      "   ",
    );
  });
});

test.describe("allowEmptyValue", () => {
  (
    [
      [0, "en", "0"],
      [1, "en", "0.0"],
      [2, "en", "0.00"],
      [0, "es-ES", "0"],
      [1, "es-ES", "0,0"],
      [2, "es-ES", "0,00"],
      [0, "fr", "0"],
      [1, "fr", "0,0"],
      [2, "fr", "0,00"],
      [0, "pt-PT", "0"],
      [1, "pt-PT", "0,0"],
      [2, "pt-PT", "0,00"],
    ] as [DecimalProps["precision"], string, string][]
  ).forEach(([precisionValue, localeValue, expectedValue]) => {
    test(`should format an empty value correctly when precision is ${precisionValue}, locale is ${localeValue} and allowEmptyValue is false`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Decimal
          precision={precisionValue}
          locale={localeValue}
          allowEmptyValue={false}
        />,
      );

      const commonDataElementInputPreviewElement =
        commonDataElementInputPreview(page);
      await commonDataElementInputPreviewElement.fill("100");
      await commonDataElementInputPreviewElement.clear();
      await commonDataElementInputPreviewElement.blur();
      await expect(commonDataElementInputPreviewElement).toHaveAttribute(
        "value",
        expectedValue,
      );
    });
  });

  (
    [
      [0, "en"],
      [1, "en"],
      [2, "en"],
      [0, "es-ES"],
      [1, "es-ES"],
      [2, "es-ES"],
      [0, "fr"],
      [1, "fr"],
      [2, "fr"],
      [0, "pt-PT"],
      [1, "pt-PT"],
      [2, "pt-PT"],
    ] as [DecimalProps["precision"], string][]
  ).forEach(([precisionValue, localeValue]) => {
    test(`should format an empty value correctly when precision is ${precisionValue}, locale is ${localeValue} and allowEmptyValue is true`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Decimal
          precision={precisionValue}
          locale={localeValue}
          allowEmptyValue
        />,
      );

      const commonDataElementInputPreviewElement =
        commonDataElementInputPreview(page);
      await commonDataElementInputPreviewElement.fill("100");
      await commonDataElementInputPreviewElement.clear();
      await commonDataElementInputPreviewElement.blur();

      await expect(commonDataElementInputPreviewElement).toHaveAttribute(
        "value",
        "",
      );
    });
  });
});

test.describe("check events for Decimal component", () => {
  (
    [
      ["1", "1.00"],
      ["12", "12.00"],
      ["123", "123.00"],
    ] as [string, string][]
  ).forEach(([rawValueTest, formattedValueTest]) => {
    test(`should call onChange callback when a type event is triggered with ${rawValueTest} value`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      const callback: DecimalProps["onChange"] = () => {
        callbackCount += 1;
      };
      await mount(<Decimal precision={2} onChange={callback} />);

      const commonDataElementInputPreviewElement =
        commonDataElementInputPreview(page);
      await commonDataElementInputPreviewElement.fill(rawValueTest);
      expect(callbackCount).toBe(1);
      await commonDataElementInputPreviewElement.blur();
      await expect(commonDataElementInputPreviewElement).toHaveAttribute(
        "value",
        formattedValueTest,
      );
    });
  });

  test("should call onBlur callback when a blur event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    const callback: DecimalProps["onBlur"] = () => {
      callbackCount += 1;
    };
    await mount(<Decimal onBlur={callback} />);

    const inputValue = "123";
    const commonDataElementInputPreviewElement =
      commonDataElementInputPreview(page);
    await commonDataElementInputPreviewElement.fill(inputValue);
    await commonDataElementInputPreviewElement.blur();
    expect(callbackCount).toBe(1);
  });
});

test.describe("Accessibility tests for Decimal component", () => {
  (["small", "medium", "large"] as DecimalProps["size"][]).forEach((size) => {
    test(`should pass accessibility tests for Decimal with ${size} input size`, async ({
      mount,
      page,
    }) => {
      await mount(<DefaultStory size={size} />);

      await checkAccessibility(page);
    });
  });

  (["left", "right"] as DecimalProps["labelAlign"][]).forEach((labelAlign) => {
    test(`should pass accessibility tests for Decimal with label aligned ${labelAlign}`, async ({
      mount,
      page,
    }) => {
      await mount(<DefaultStory labelAlign={labelAlign} />);

      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests for Decimal with custom precision", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomPrecision />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal with custom label width and input width", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomLabelWidthAndInputWidth />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal with custom max width", async ({
    mount,
    page,
  }) => {
    await mount(<WithCustomMaxWidth />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal with field help", async ({
    mount,
    page,
  }) => {
    await mount(<WithFieldHelp fieldHelp="Help" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal with label help", async ({
    mount,
    page,
  }) => {
    await mount(<WithLabelHelp labelHelp="Help" />);

    const getDataElementByValueElementQuestion = getDataElementByValue(
      page,
      "question",
    );
    await getDataElementByValueElementQuestion.hover();
    await checkAccessibility(page, tooltipPreview(page));
  });

  test("should pass accessibility tests for Decimal required", async ({
    mount,
    page,
  }) => {
    await mount(<Required />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal left aligned", async ({
    mount,
    page,
  }) => {
    await mount(<LeftAligned />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal with validation", async ({
    mount,
    page,
  }) => {
    await mount(<Validations />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal validations redesigned", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationsRedesign />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal default", async ({
    mount,
    page,
  }) => {
    await mount(<Decimal label="Decimal" onChange={() => {}} value="0.01" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal with readOnly prop", async ({
    mount,
    page,
  }) => {
    await mount(
      <Decimal label="Decimal" onChange={() => {}} value="0.01" readOnly />,
    );

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal with tooltip", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationsTooltip />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Decimal with tooltip label", async ({
    mount,
    page,
  }) => {
    await mount(<ValidationsTooltipLabel />);

    await checkAccessibility(page);
  });
});

test("should have the expected border radius styling", async ({
  mount,
  page,
}) => {
  await mount(<Decimal />);

  const getElementElementInput = getElement(page, "input");
  await expect(getElementElementInput).toHaveCSS("border-radius", "4px");
});

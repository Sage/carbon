import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { GroupedCharacterProps } from "./grouped-character.component";
import {
  GroupedCharacterComponent,
  Validations,
  ValidationsStringComponent,
  ValidationsStringLabel,
  ValidationsBoolean,
  ValidationsRedesign,
} from "./components.test-pw";
import {
  getDataElementByValue,
  tooltipPreview,
  getElement,
} from "../../../playwright/components/index";
import { textbox } from "../../../playwright/components/textbox/index";
import {
  checkAccessibility,
  verifyRequiredAsteriskForLabel,
} from "../../../playwright/support/helper";
import { SIZE, CHARACTERS } from "../../../playwright/support/constants";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("Prop tests for GroupedCharacter", () => {
  (
    [
      [SIZE.SMALL, "32px"],
      [SIZE.MEDIUM, "40px"],
      [SIZE.LARGE, "48px"],
    ] as [GroupedCharacterProps["size"], string][]
  ).forEach(([size, height]) => {
    test(`should render with ${size} as size and ${height} as height`, async ({
      mount,
      page,
    }) => {
      await mount(<GroupedCharacterComponent size={size} />);

      await expect(textbox(page)).toHaveCSS("min-height", height);
    });
  });

  (
    [
      [[1, 2, 3], "1234567", "1-23-456"],
      [[5, 3, 1], "987654321", "98765-432-1"],
      [[2, 4, 2], "123456789", "12-3456-78"],
    ] as [GroupedCharacterProps["groups"], string, string][]
  ).forEach(([group, inputValue, outputValue]) => {
    test(`should render with ${group} as a group and use input value ${inputValue} to produce output value ${outputValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<GroupedCharacterComponent groups={group} />);

      const input = getDataElementByValue(page, "input");
      await input.fill(inputValue);
      await input.blur();

      await input.waitFor();
      await expect(input).toHaveValue(outputValue);
    });
  });

  (
    [
      ["-", "123456", "12-34-56"],
      ["?", "sage", "sa?ge"],
      ["#", "tests", "te#st#s"],
      ["@", "abcdef", "ab@cd@ef"],
      ["$", "987654321", "98$76$543"],
      ["%", "123456789", "12%34%567"],
      ["^", "123456", "12^34^56"],
      ["!", "987654321", "98!76!543"],
      ["*", "12ab34cd", "12*ab*34c"],
    ] as [GroupedCharacterProps["separator"], string, string][]
  ).forEach(([separator, inputValue, outputValue]) => {
    test(`should render with separator ${separator} and use input value ${inputValue} to produce output value ${outputValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<GroupedCharacterComponent separator={separator} />);

      const input = getDataElementByValue(page, "input");
      await input.fill(inputValue);
      await input.blur();

      await input.waitFor();
      await expect(input).toHaveValue(outputValue);
    });
  });
});

test.describe("Input tests for GroupedCharacter", () => {
  specialCharacters.forEach((specificValue) => {
    test(`should render with label ${specificValue}`, async ({
      mount,
      page,
    }) => {
      await mount(<GroupedCharacterComponent label={specificValue} />);

      await expect(getDataElementByValue(page, "label")).toHaveText(
        specificValue,
      );
    });
  });

  specialCharacters.forEach((specificValue) => {
    test(`should render with ${specificValue} fieldHelp`, async ({
      mount,
      page,
    }) => {
      await mount(<GroupedCharacterComponent fieldHelp={specificValue} />);

      await expect(getDataElementByValue(page, "help")).toHaveText(
        specificValue,
      );
    });
  });

  specialCharacters.forEach((specificValue) => {
    test(`should render with ${specificValue} tooltip`, async ({
      mount,
      page,
    }) => {
      await mount(<GroupedCharacterComponent labelHelp={specificValue} />);

      const question = getDataElementByValue(page, "question");
      await question.hover();
      await expect(tooltipPreview(page)).toHaveText(specificValue);
    });
  });

  test(`should render with add icon inside the component`, async ({
    mount,
    page,
  }) => {
    await mount(<GroupedCharacterComponent inputIcon="add" />);

    await expect(getDataElementByValue(page, "add")).toBeVisible();
  });

  test(`should render with component disabled`, async ({ mount, page }) => {
    await mount(<GroupedCharacterComponent disabled />);

    await expect(getDataElementByValue(page, "input")).toBeDisabled();
  });

  test(`should render with component required`, async ({ mount, page }) => {
    await mount(<GroupedCharacterComponent required />);

    await verifyRequiredAsteriskForLabel(page);
  });

  test(`should render component with autofocus`, async ({ mount, page }) => {
    await mount(<GroupedCharacterComponent autoFocus />);

    await expect(getDataElementByValue(page, "input")).toBeFocused();
  });

  (
    [
      ["right", "end"],
      ["left", "start"],
    ] as [GroupedCharacterProps["labelAlign"], string][]
  ).forEach(([alignment, cssProp]) => {
    test(`should render with labelAlignment ${alignment} and justify-content flex-${cssProp}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <GroupedCharacterComponent labelInline labelAlign={alignment} />,
      );

      const labelParent = getDataElementByValue(page, "label").locator("..");
      await expect(labelParent).toHaveCSS("-webkit-box-pack", cssProp);
      await expect(labelParent).toHaveCSS("justify-content", `flex-${cssProp}`);
    });
  });
});

test.describe("Event & Styling tests for GroupedCharacter", () => {
  ["10%", "30%", "50%", "80%", "100%"].forEach((maxWidth) => {
    test(`should render with maximum width of ${maxWidth}`, async ({
      mount,
      page,
    }) => {
      await mount(<GroupedCharacterComponent maxWidth={maxWidth} />);

      const inputParent = textbox(page).locator("..");
      await expect(inputParent).toHaveCSS("max-width", maxWidth);
    });
  });

  test(`should render with max-width of 100%, when maxWidth prop is passed with no value`, async ({
    mount,
    page,
  }) => {
    await mount(<GroupedCharacterComponent maxWidth="" />);

    const inputParent = textbox(page).locator("..");
    await expect(inputParent).toHaveCSS("max-width", "100%");
  });

  (
    [
      [[1, 1, 4], "123", "123", "1-2-3"],
      [[3, 2, 1], "sage123", "sage12", "sag-e1-2"],
      [[3, 3, 3], "123testtest", "123testte", "123-tes-tte"],
      [[4, 1, 2], "1234567", "1234567", "1234-5-67"],
      [[5, 2, 2], "9876543211", "987654321", "98765-43-21"],
      [[1, 1, 3], "123456789", "12345", "1-2-345"],
    ] as [GroupedCharacterProps["groups"], string, string, string][]
  ).forEach(([groups, inputValue, rawValue, formattedValue]) => {
    test(`should call onChange callback when a type event is triggered using ${groups} as groups and ${inputValue} as inputValue, and return ${rawValue} as formattedValue`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <GroupedCharacterComponent
          onChange={() => {
            callbackCount += 1;
          }}
          groups={groups}
        />,
      );

      const input = getDataElementByValue(page, "input");
      await input.fill(inputValue);
      await input.blur();
      expect(callbackCount).toBe(1);
      await expect(input).toHaveAttribute("value", formattedValue);
    });
  });

  test(`should call onBlur callback when a blur event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <GroupedCharacterComponent
        onBlur={() => {
          callbackCount += 1;
        }}
      />,
    );

    const input = getDataElementByValue(page, "input");
    await input.fill("1");
    await input.blur();
    expect(callbackCount).toBe(1);
  });

  test(`should render with the expected border radius styling`, async ({
    mount,
    page,
  }) => {
    await mount(<GroupedCharacterComponent />);

    await expect(getElement(page, "input")).toHaveCSS("border-radius", "4px");
  });
});

test.describe("Accessibility tests for GroupedCharacter", () => {
  test(`should pass tests for Default example`, async ({ mount, page }) => {
    await mount(<GroupedCharacterComponent />);

    await checkAccessibility(page);
  });

  (
    [SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE] as GroupedCharacterProps["size"][]
  ).forEach((size) => {
    test(`should pass tests with size ${size}`, async ({ mount, page }) => {
      await mount(<GroupedCharacterComponent size={size} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass tests with autoFocus prop passed`, async ({
    mount,
    page,
  }) => {
    await mount(<GroupedCharacterComponent autoFocus />);

    await checkAccessibility(page);
  });

  test(`should pass tests with disabled prop passed`, async ({
    mount,
    page,
  }) => {
    await mount(<GroupedCharacterComponent disabled />);

    await checkAccessibility(page);
  });

  test(`should pass tests with labelInline prop passed`, async ({
    mount,
    page,
  }) => {
    await mount(<GroupedCharacterComponent labelInline />);

    await checkAccessibility(page);
  });

  test(`should pass tests for FieldHelp example`, async ({ mount, page }) => {
    await mount(<GroupedCharacterComponent fieldHelp="Help" />);

    await checkAccessibility(page);
  });

  test(`should pass tests for LabelHelp example`, async ({ mount, page }) => {
    await mount(
      <GroupedCharacterComponent labelHelp="Help" helpAriaLabel="Help" />,
    );

    await checkAccessibility(page);
  });

  test(`should pass tests for Required example`, async ({ mount, page }) => {
    await mount(<GroupedCharacterComponent required />);

    await checkAccessibility(page);
  });

  (["right", "left"] as GroupedCharacterProps["labelAlign"][]).forEach(
    (labelAlign) => {
      test(`should pass tests with label aligned ${labelAlign}`, async ({
        mount,
        page,
      }) => {
        await mount(<GroupedCharacterComponent labelAlign={labelAlign} />);

        await checkAccessibility(page);
      });
    },
  );

  [".", ",", " ", "-", "/", "|"].forEach((separator) => {
    test(`should pass tests with separator ${separator}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <GroupedCharacterComponent separator={separator} value="123456" />,
      );

      await checkAccessibility(page);
    });
  });

  (
    [[[1, 2, 3]], [[5, 3, 1]], [[2, 4, 2]]] as [
      GroupedCharacterProps["groups"],
    ][]
  ).forEach(([groups]) => {
    test(`should pass tests for with ${groups} as group`, async ({
      mount,
      page,
    }) => {
      await mount(<GroupedCharacterComponent groups={groups} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass tests for Validations example`, async ({ mount, page }) => {
    await mount(<Validations />);

    await checkAccessibility(page);
  });

  test(`should pass tests for ValidationsStringComponent example`, async ({
    mount,
    page,
  }) => {
    await mount(<ValidationsStringComponent />);

    await checkAccessibility(page);
  });

  test(`should pass tests for ValidationsStringLabel example`, async ({
    mount,
    page,
  }) => {
    await mount(<ValidationsStringLabel />);

    await checkAccessibility(page);
  });

  test(`should pass tests for ValidationsBoolean example`, async ({
    mount,
    page,
  }) => {
    await mount(<ValidationsBoolean />);

    await checkAccessibility(page);
  });

  test(`should pass tests for ValidationsRedesign example`, async ({
    mount,
    page,
  }) => {
    await mount(<ValidationsRedesign />);

    await checkAccessibility(page);
  });

  ["error", "warning", "info"].forEach((validationType) => {
    test(`should pass tests for with ${validationType} validation type`, async ({
      mount,
      page,
    }) => {
      await mount(
        <GroupedCharacterComponent {...{ [validationType]: "Message" }} />,
      );

      await checkAccessibility(page);
    });
  });

  ["error", "warning", "info"].forEach((validationType) => {
    test(`should pass tests for with ${validationType} validation type on label`, async ({
      mount,
      page,
    }) => {
      await mount(
        <GroupedCharacterComponent
          {...{ [validationType]: "Message" }}
          validationOnLabel
        />,
      );

      await checkAccessibility(page);
    });
  });
});

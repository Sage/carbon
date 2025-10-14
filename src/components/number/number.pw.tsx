import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import {
  NumberInputComponent,
  Default,
  Disabled,
  ReadOnly,
  WithInputHint,
  WithPositionedChildren,
} from "./components.test-pw";

import {
  getDataElementByValue,
  getDataRoleByValue,
  fieldHelpPreview,
  commonDataElementInputPreview,
  commonInputPrefix,
  characterLimit,
} from "../../../playwright/components/index";

import number from "../../../playwright/components/number";

import {
  verifyRequiredAsteriskForLabel,
  checkAccessibility,
} from "../../../playwright/support/helper";

import { CHARACTERS } from "../../../playwright/support/constants";
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

  test("should display 0 characters left when input length matches the character limit", async ({
    mount,
    page,
  }) => {
    await mount(<NumberInputComponent characterLimit={11} />);

    const elementInput = commonDataElementInputPreview(page);
    await elementInput.fill("12345678901");
    await expect(characterLimit(page)).toHaveText("0 characters left");
    await expect(characterLimit(page)).toHaveCSS(
      "color",
      "rgba(0, 0, 0, 0.55)",
    );
  });

  test("should display 1 character left when input length matches the character limit", async ({
    mount,
    page,
  }) => {
    await mount(<NumberInputComponent characterLimit={11} />);

    const elementInput = commonDataElementInputPreview(page);
    await elementInput.fill("1234567890");
    await expect(characterLimit(page)).toHaveText("1 character left");
    await expect(characterLimit(page)).toHaveCSS(
      "color",
      "rgba(0, 0, 0, 0.55)",
    );
  });

  test("should display 3 characters left when input length matches the character limit", async ({
    mount,
    page,
  }) => {
    await mount(<NumberInputComponent characterLimit={13} />);

    const elementInput = commonDataElementInputPreview(page);
    await elementInput.fill("1234567890");
    await expect(characterLimit(page)).toHaveText("3 characters left");
    await expect(characterLimit(page)).toHaveCSS(
      "color",
      "rgba(0, 0, 0, 0.55)",
    );
  });

  test("should display 1 character too many when input exceeds the character limit by 1", async ({
    mount,
    page,
  }) => {
    await mount(<NumberInputComponent characterLimit={10} />);

    const elementInput = commonDataElementInputPreview(page);
    await elementInput.fill("12345678901");
    await expect(characterLimit(page)).toHaveText("1 character too many");
    await expect(characterLimit(page)).toHaveCSS("color", "rgb(203, 55, 74)");
  });

  test("should display 3 characters too many when input exceeds the character limit by 3", async ({
    mount,
    page,
  }) => {
    await mount(<NumberInputComponent characterLimit={8} />);

    const elementInput = commonDataElementInputPreview(page);
    await elementInput.fill("12345678901");
    await expect(characterLimit(page)).toHaveText("3 characters too many");
    await expect(characterLimit(page)).toHaveCSS("color", "rgb(203, 55, 74)");
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

  test("should render as required", async ({ mount, page }) => {
    await mount(<NumberInputComponent required />);

    await verifyRequiredAsteriskForLabel(page);
  });

  test("should render with autofocus prop", async ({ mount, page }) => {
    await mount(<NumberInputComponent autoFocus />);

    await expect(commonDataElementInputPreview(page)).toBeFocused();
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

  test("should pass accessibility tests for with input hint example", async ({
    mount,
    page,
  }) => {
    await mount(<WithInputHint />);

    await checkAccessibility(page);
  });
});

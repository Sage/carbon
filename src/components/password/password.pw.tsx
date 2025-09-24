import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { TextboxProps } from "../textbox";
import {
  textbox as password,
  textboxInput as passwordInput,
} from "../../../playwright/components/textbox";
import {
  PasswordComponent,
  PasswordValidationsAsAStringWithTooltipDefault,
  PasswordValidationsAsABoolean,
  PasswordValidationsAsAString,
  PasswordValidationsAsAStringWithTooltipCustom,
  PasswordValidationsAsAStringDisplayedOnLabel,
  PasswordNewDesignsValidation,
} from "../../../src/components/password/components.test-pw";
import { buttonMinorComponent } from "../../../playwright/components/button";
import {
  fieldHelpPreview,
  getDataElementByValue,
  icon,
  tooltipPreview,
} from "../../../playwright/components/index";
import { CHARACTERS, SIZE } from "../../../playwright/support/constants";
import {
  checkAccessibility,
  getDesignTokensByCssProperty,
  verifyRequiredAsteriskForLabel,
} from "../../../playwright/support/helper";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const transparent = "rgba(0, 0, 0, 0)";
const colorsActionMinor500 = "rgb(51, 91, 112)";
const colorsUtilityMajor300 = "rgb(102, 132, 148)";

test.describe("Prop checks for Password component", () => {
  test("should render with correct input type of password", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);

    await expect(passwordInput(page)).toHaveAttribute("type", "password");
  });

  test("should render with 'forceObscurity' prop", async ({ mount, page }) => {
    await mount(<PasswordComponent forceObscurity onChange={() => {}} />);

    await expect(passwordInput(page)).toHaveAttribute("type", "password");
  });

  test("should change input type from password to text on click", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);

    await buttonMinorComponent(page).click();
    await expect(passwordInput(page)).toHaveAttribute("type", "text");
  });

  test("should render with autoComplete 'off'", async ({ mount, page }) => {
    await mount(<PasswordComponent onChange={() => {}} />);

    await expect(passwordInput(page)).toHaveAttribute("autoComplete", "off");
  });
});

test.describe("Disabled checks", () => {
  test("should disable the input when rendered with disabled prop", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent disabled onChange={() => {}} />);

    await expect(passwordInput(page)).toBeDisabled();
  });

  test("should disable the button when rendered with disabled prop", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent disabled onChange={() => {}} />);

    await expect(buttonMinorComponent(page)).toBeDisabled();
  });

  test("should disable the button when rendered with 'forceObscurity' prop", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent forceObscurity onChange={() => {}} />);

    await expect(buttonMinorComponent(page)).toBeDisabled();
  });
});

test.describe("Prop checks for ButtonMinor component", () => {
  test("should render with correct aria-controls attribute", async ({
    mount,
    page,
  }) => {
    const id = "foo";
    await mount(<PasswordComponent id={id} onChange={() => {}} />);

    await expect(buttonMinorComponent(page)).toHaveAttribute(
      "aria-controls",
      id,
    );
  });

  test("should render with correct default icon type of 'view'", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);

    await expect(icon(page)).toHaveAttribute("type", "view");
  });

  test("should change the icon type from 'view' to 'hide' on click", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);

    await icon(page).click();
    await expect(icon(page)).toHaveAttribute("type", "hide");
  });

  test("should render with default icon position of 'before'", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);

    await expect(icon(page)).toHaveCSS("margin-right", "8px");
  });

  test("should render with default size of 'small'", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);

    await expect(buttonMinorComponent(page)).toHaveCSS("min-height", "32px");
  });

  test("should render with default label of 'Show'", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);

    await expect(buttonMinorComponent(page)).toHaveText("Show");
  });

  test("label should change from 'Show' to 'Hide' on click", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);

    await buttonMinorComponent(page).click();
    await expect(buttonMinorComponent(page)).toHaveText("Hide");
  });

  test("should render with with a default aria-label of 'Show password'", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);

    await expect(buttonMinorComponent(page)).toHaveAttribute(
      "aria-label",
      "Show password",
    );
  });

  test("aria-label should change from 'Show password' to 'Hide password' on click", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);

    await buttonMinorComponent(page).click();

    await expect(buttonMinorComponent(page)).toHaveAttribute(
      "aria-label",
      "Hide password",
    );
  });

  test("should render with a default button type of 'tertiary' and tertiary styling", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);

    await expect(buttonMinorComponent(page)).toBeVisible();
    await expect(buttonMinorComponent(page)).toHaveCSS(
      "background-color",
      transparent,
    );

    await expect(buttonMinorComponent(page)).toHaveCSS(
      "color",
      colorsActionMinor500,
    );

    const colorToken = (
      await getDesignTokensByCssProperty(
        page,
        buttonMinorComponent(page),
        "color",
      )
    ).pop();

    expect(colorToken).toBe("--colorsActionMinor500");
  });

  test("default button type of 'tertiary' and tertiary styling should be the same on hover", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);
    await buttonMinorComponent(page).hover();

    await expect(buttonMinorComponent(page)).toBeVisible();
    await expect(buttonMinorComponent(page)).toHaveCSS(
      "background-color",
      transparent,
    );

    await expect(buttonMinorComponent(page)).toHaveCSS(
      "color",
      colorsActionMinor500,
    );

    const colorToken = (
      await getDesignTokensByCssProperty(
        page,
        buttonMinorComponent(page),
        "color",
      )
    ).pop();

    expect(colorToken).toBe("--colorsActionMinor500");
  });

  test("should render with a default icon color of 'colorsUtilityMajor300'", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);

    await expect(icon(page)).toBeVisible();
    await expect(icon(page)).toHaveCSS("color", colorsUtilityMajor300);

    const colorToken = (
      await getDesignTokensByCssProperty(page, icon(page), "color")
    ).pop();

    expect(colorToken).toBe("--colorsUtilityMajor300");
  });

  test("icon color is 'colorsUtilityMajor300' on hover'", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);
    await buttonMinorComponent(page).hover();

    await expect(icon(page)).toBeVisible();
    await expect(icon(page)).toHaveCSS("color", colorsUtilityMajor300);

    const colorToken = (
      await getDesignTokensByCssProperty(page, icon(page), "color")
    ).pop();

    expect(colorToken).toBe("--colorsUtilityMajor300");
  });
});

test.describe("aria-live region checks", () => {
  test("when rendered, aria-live region should contain the correct hidden text", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);

    const hiddenStatus = page.getByRole("status");
    await expect(hiddenStatus).toHaveText("Your password is currently hidden.");
  });

  test("when user clicks to show password, aria-live region should contain the correct shown text", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);
    await buttonMinorComponent(page).click();

    const hiddenStatus = page.getByRole("status");
    await expect(hiddenStatus).toHaveText(
      "Your password has been shown. Focus on the password input to have it read to you, if it is safe to do so.",
    );
  });

  test("should render with an aria-live region visually hidden", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);
    const hiddenStatus = page.getByRole("status");

    await expect(hiddenStatus).toBeVisible();
    await expect(hiddenStatus).toHaveCSS("clip-path", "inset(50%)");
    await expect(hiddenStatus).toHaveCSS("height", "1px");
    await expect(hiddenStatus).toHaveCSS("overflow", "hidden");
    await expect(hiddenStatus).toHaveCSS("white-space", "nowrap");
    await expect(hiddenStatus).toHaveCSS("width", "1px");
  });
});

test.describe("Prop checks for rendered Textbox", () => {
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
      await mount(<PasswordComponent size={size} onChange={() => {}} />);

      await expect(password(page)).toHaveCSS("min-height", height);

      const tokenValues = await getDesignTokensByCssProperty(
        page,
        password(page),
        "min-height",
      );

      expect(tokenValues[0]).toBe(token);
    });
  });

  specialCharacters.forEach((specificValue) => {
    test(`should render with label prop as ${specificValue}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PasswordComponent label={specificValue} onChange={() => {}} />,
      );

      const label = getDataElementByValue(page, "label");
      await expect(label).toHaveText(specificValue);
    });
  });

  specialCharacters.forEach((specificValue) => {
    test(`should render with fieldHelp prop as ${specificValue}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PasswordComponent fieldHelp={specificValue} onChange={() => {}} />,
      );

      await expect(fieldHelpPreview(page)).toHaveText(specificValue);
    });
  });

  specialCharacters.forEach((specificValue) => {
    test(`should render with labelHelp prop as ${specificValue}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PasswordComponent labelHelp={specificValue} onChange={() => {}} />,
      );

      await getDataElementByValue(page, "question").hover();
      await expect(tooltipPreview(page)).toHaveText(specificValue);
    });
  });

  test("should render with an input icon", async ({ mount, page }) => {
    await mount(<PasswordComponent inputIcon="add" onChange={() => {}} />);

    await expect(getDataElementByValue(page, "add")).toBeVisible();
  });

  test("should render with required prop", async ({ mount, page }) => {
    await mount(<PasswordComponent required onChange={() => {}} />);

    await verifyRequiredAsteriskForLabel(page);
  });

  test("should render with autofocus prop", async ({ mount, page }) => {
    await mount(<PasswordComponent autoFocus onChange={() => {}} />);

    await expect(passwordInput(page)).toBeFocused();
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
      await mount(
        <PasswordComponent
          labelInline
          labelAlign={labelAlign}
          onChange={() => {}}
        />,
      );

      const labelParent = getDataElementByValue(page, "label").locator("..");
      await expect(labelParent).toHaveCSS("-webkit-box-pack", cssValue);
    });
  });

  ["10%", "30%", "50%", "80%", "100%"].forEach((maxWidth) => {
    test(`should render with ${maxWidth} max-width`, async ({
      mount,
      page,
    }) => {
      await mount(
        <PasswordComponent maxWidth={maxWidth} onChange={() => {}} />,
      );

      const passwordParent = password(page).locator("..");
      await expect(passwordParent).toHaveCSS("max-width", maxWidth);
    });
  });

  test("should render with max-width of 100%, when maxWidth prop is not passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);

    const passwordParent = password(page).locator("..");
    await expect(passwordParent).toHaveCSS("max-width", "100%");
  });
});

test.describe("Accessibility tests for Password component", () => {
  test("should pass accessibility tests for default component with a set value and label", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when AutoFocus prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent autoFocus onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when characterLimit prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent characterLimit={5} onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when disabled prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent disabled onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when forceObscurity prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent forceObscurity onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when inputHint prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent inputHint="foo" onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility when margin prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent m={4} onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when opted into new validation designs", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordNewDesignsValidation />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when boolean validations are passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordValidationsAsABoolean />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when string validations are passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordValidationsAsAString />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when string validations are passed and displayed on label", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordValidationsAsAStringDisplayedOnLabel />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when custom string validations are passed and displayed on tooltip", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordValidationsAsAStringWithTooltipCustom />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when string validations are displayed on tooltip", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordValidationsAsAStringWithTooltipDefault />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when prefix prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent prefix="foo" onChange={() => {}} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when readOnly prop is passed", async ({
    mount,
    page,
  }) => {
    await mount(<PasswordComponent readOnly onChange={() => {}} />);
    await checkAccessibility(page);
  });
});

test("should have the expected border radius styling", async ({
  mount,
  page,
}) => {
  await mount(<PasswordComponent onChange={() => {}} />);
  await expect(passwordInput(page)).toHaveCSS("border-radius", "4px");
});

import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import { ButtonToggle, ButtonToggleGroupProps, ButtonToggleProps } from ".";
import {
  ButtonToggleComponent,
  ButtonToggleGroupComponent,
  ButtonToggleGroupNotInBox,
  WithOutsideButtons,
} from "./components.test-pw";
import {
  buttonTogglePreview,
  buttonToggleButton,
} from "../../../playwright/components/button-toggle";
import {
  buttonToggleGroup,
  buttonToggleGroupHelp,
  buttonToggleGroupHelpIcon,
} from "../../../playwright/components/button-toggle-group";
import {
  icon,
  getDataElementByValue,
} from "../../../playwright/components/index";
import { SIZE, CHARACTERS } from "../../../playwright/support/constants";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
} from "../../../playwright/support/helper";

const characters = [
  CHARACTERS.STANDARD,
  CHARACTERS.DIACRITICS,
  CHARACTERS.SPECIALCHARACTERS,
];

const helpAlignment: [string, boolean][] = [
  ["inline", true],
  ["outline", false],
];

const testPropValue = CHARACTERS.STANDARD;

test.describe("Styling tests", () => {
  test("should render with the expected focus styling", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent />);

    const toggleButton1 = buttonToggleButton(page).nth(0);
    const toggleButton2 = buttonToggleButton(page).nth(1);
    const toggleButton3 = buttonToggleButton(page).nth(2);

    await toggleButton1.focus();
    await expect(toggleButton1).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(toggleButton1).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
    await toggleButton2.focus();
    await expect(toggleButton2).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(toggleButton2).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
    await toggleButton3.focus();
    await expect(toggleButton3).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(toggleButton3).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
  });

  test("has render with the expected border-radius styling on a single toggle button", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggle>Foo</ButtonToggle>);

    await expect(buttonToggleButton(page)).toHaveCSS("border-radius", "4px");
  });
});

test.describe("Prop tests", () => {
  test("should render with aria-label prop", async ({ mount, page }) => {
    await mount(<ButtonToggleComponent aria-label="playwright-aria" />);

    await expect(buttonToggleButton(page).first()).toHaveAttribute(
      "aria-label",
      "playwright-aria",
    );
  });

  test("should render with aria-labelledby prop", async ({ mount, page }) => {
    await mount(
      <ButtonToggleComponent aria-labelledby={CHARACTERS.STANDARD} />,
    );

    await expect(buttonToggleButton(page).first()).toHaveAttribute(
      "aria-labelledby",
      CHARACTERS.STANDARD,
    );
  });

  (
    [
      [true, "true"],
      [false, "false"],
    ] as [ButtonToggleProps["pressed"], string][]
  ).forEach(([state, ariaPressed]) => {
    test(`should render with aria-pressed attribute ${ariaPressed} when pressed prop is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonToggleComponent pressed={state} />);

      await expect(buttonToggleButton(page).first()).toHaveAttribute(
        "aria-pressed",
        ariaPressed,
      );
    });
  });

  test("should render with data-component prop set to playwright_data", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent data-component={CHARACTERS.STANDARD} />);

    await expect(
      buttonToggleButton(page).first().locator(".."),
    ).toHaveAttribute("data-component", CHARACTERS.STANDARD);
  });

  test("should render with data-element prop set to playwright_data", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent data-element={CHARACTERS.STANDARD} />);

    await expect(
      buttonToggleButton(page).first().locator(".."),
    ).toHaveAttribute("data-element", CHARACTERS.STANDARD);
  });

  test("should render with data-role prop set to playwright_data", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent data-role={CHARACTERS.STANDARD} />);

    await expect(
      buttonToggleButton(page).first().locator(".."),
    ).toHaveAttribute("data-role", CHARACTERS.STANDARD);
  });

  (
    [
      [SIZE.SMALL, 24, 8],
      [SIZE.MEDIUM, 32, 8],
      [SIZE.LARGE, 40, 12],
    ] as [ButtonToggleProps["size"], number, number][]
  ).forEach(([size, height, padding]) => {
    test(`should render button with height ${height} and padding ${padding} when size is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonToggleComponent size={size}>{size}</ButtonToggleComponent>,
      );

      const firstButton = buttonToggleButton(page).nth(0);
      await expect(firstButton).toHaveCSS("min-height", `${height}px`);
      await expect(firstButton).toHaveCSS("padding", `0px ${padding}px`);
    });
  });

  (["add", "share", "tick"] as const).forEach((type) => {
    test(`should render with ${type} icon`, async ({ mount, page }) => {
      await mount(
        <ButtonToggleComponent buttonIcon={type} buttonIconSize="large">
          {" "}
          {type}
        </ButtonToggleComponent>,
      );

      await expect(icon(page).nth(0)).toHaveAttribute("type", type);
    });
  });

  (
    [
      [SIZE.SMALL, 72, "8px"],
      [SIZE.MEDIUM, 88, "8px 12px 0px"],
      [SIZE.LARGE, 120, "8px 24px"],
    ] as [ButtonToggleProps["size"], number, string][]
  ).forEach(([size, height, padding]) => {
    test(`should render button with height ${height} and padding ${padding} when size is ${size} and buttonIconSize is large`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonToggleComponent
          buttonIcon="tick"
          buttonIconSize="large"
          size={size}
        >
          {size}
        </ButtonToggleComponent>,
      );

      const firstButton = buttonToggleButton(page).nth(0);
      await expect(firstButton).toHaveCSS("min-height", `${height}px`);
      await expect(firstButton).toHaveCSS("padding", `${padding}`);
    });
  });

  (
    [
      [SIZE.SMALL, 20],
      [SIZE.LARGE, 32],
    ] as [ButtonToggleProps["buttonIconSize"], number][]
  ).forEach(([buttonIconSize, value]) => {
    test(`should render icon with height and width ${value} when buttonIconSize is ${buttonIconSize}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonToggleComponent
          buttonIcon="tick"
          buttonIconSize={buttonIconSize}
        >
          {buttonIconSize}
        </ButtonToggleComponent>,
      );

      const firstIcon = icon(page).nth(0);
      await expect(firstIcon).toHaveCSS("height", `${value}px`);
      await expect(firstIcon).toHaveCSS("width", `${value}px`);
    });
  });

  [...characters].forEach(([labelText]) => {
    test(`should render with text as ${labelText} when Children prop is ${labelText}`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonToggle>{labelText}</ButtonToggle>);

      await expect(buttonToggleButton(page)).toHaveText(labelText);
    });
  });

  test("should render with Value prop set to playwright_data", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent value={CHARACTERS.STANDARD} />);

    await expect(buttonToggleButton(page).nth(0)).toHaveAttribute(
      "value",
      CHARACTERS.STANDARD,
    );
  });
});

test.describe("Event tests", () => {
  test("should not call Onclick callback when disabled prop is passed and click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <ButtonToggleComponent
        disabled
        onClick={() => {
          callbackCount += 1;
        }}
      />,
    );

    await expect(buttonToggleButton(page).nth(0)).toBeDisabled();
    await buttonTogglePreview(page).nth(0).click();
    expect(callbackCount).toBe(0);
  });

  test("should call onclick callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <ButtonToggleComponent
        onClick={() => {
          callbackCount += 1;
        }}
      />,
    );

    await buttonTogglePreview(page).nth(0).click();
    expect(callbackCount).toBe(1);
  });

  test("should call onFocus callback when a focus event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <ButtonToggleComponent
        onFocus={() => {
          callbackCount += 1;
        }}
      />,
    );

    const toggleButton = buttonToggleButton(page).nth(0);
    await toggleButton.focus();
    expect(callbackCount).toBe(1);
  });

  test("should call onBlur callback when a blur event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <ButtonToggleComponent
        onBlur={() => {
          callbackCount += 1;
        }}
      />,
    );

    const toggleButton = buttonToggleButton(page).nth(0);
    await toggleButton.focus();
    await toggleButton.blur();
    expect(callbackCount).toBe(1);
  });
});

test.describe("Accessibility tests", () => {
  test("should pass accessibility tests for default example", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests for Button-Toggle disabled", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent disabled />);

    await checkAccessibility(page);
  });

  (
    [
      [SIZE.SMALL, 24],
      [SIZE.MEDIUM, 32],
      [SIZE.LARGE, 40],
    ] as [ButtonToggleProps["size"], number][]
  ).forEach(([size]) => {
    test(`should pass accessibility tests for Button-Toggle ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonToggleComponent size={size}> {size}</ButtonToggleComponent>,
      );

      await checkAccessibility(page);
    });
  });

  (["add", "share", "tick"] as ButtonToggleProps["buttonIcon"][]).forEach(
    (type) => {
      test(`should pass accessibility tests for Button-Toggle with ${type} icon`, async ({
        mount,
        page,
      }) => {
        await mount(
          <ButtonToggleComponent buttonIcon={type} buttonIconSize="large">
            {" "}
            {type}
          </ButtonToggleComponent>,
        );

        await checkAccessibility(page);
      });
    },
  );
});

test.describe("Prop tests for group component", () => {
  test("should render with data-component prop set to playwright_data", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent data-component={testPropValue} />);

    await expect(page.getByRole("group")).toHaveAttribute(
      "data-component",
      testPropValue,
    );
  });

  test("should render with data-element prop set to playwright_data", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent data-element={testPropValue} />);

    await expect(buttonToggleGroup(page).nth(0)).toHaveAttribute(
      "data-element",
      testPropValue,
    );
  });

  test("should render with data-role prop set to playwright_data", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent data-role={testPropValue} />);

    await expect(buttonToggleGroup(page).nth(0)).toHaveAttribute(
      "data-role",
      testPropValue,
    );
  });

  [...characters].forEach(([labelText]) => {
    test(`should render with ${labelText} as label`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonToggleGroupComponent label={labelText} />);

      await expect(getDataElementByValue(page, "label")).toHaveText(labelText);
    });
  });

  test("should render with tooltip set to playwright_data", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent labelHelp={testPropValue} />);

    const helpIcon = getDataElementByValue(page, "question");
    await helpIcon.hover();
    await expect(getDataElementByValue(page, "tooltip")).toBeVisible();
    await expect(getDataElementByValue(page, "tooltip")).toHaveText(
      testPropValue,
    );
  });

  [...characters].forEach((inputHintText) => {
    test(`should render with ${inputHintText} as input hint text`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonToggleGroupComponent inputHint={inputHintText} />);

      const hintText = buttonToggleGroup(page)
        .locator("div")
        .locator("div")
        .nth(3);
      await expect(hintText).toBeVisible();
      await expect(hintText).toHaveText(inputHintText);
    });
  });

  [...characters].forEach(([fieldHelpText]) => {
    test(`should render with ${fieldHelpText} as field help text`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonToggleGroupComponent fieldHelp={fieldHelpText} />);

      await expect(buttonToggleGroupHelp(page)).toHaveText(fieldHelpText);
    });
  });

  [...helpAlignment].forEach(([alignment, state]) => {
    test(`should render with field help ${alignment} if fieldHelpInline is %${state}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonToggleGroupComponent
          fieldHelp="fieldHelpText"
          fieldHelpInline={state}
        />,
      );

      if (state) {
        await expect(
          getDataElementByValue(page, "help").locator("..").locator(".."),
        ).toHaveAttribute("data-component", "button-toggle-group");
      } else {
        await expect(
          getDataElementByValue(page, "help").locator(".."),
        ).toHaveAttribute("data-component", "button-toggle-group");
      }
    });
  });

  [...helpAlignment].forEach(([alignment, state]) => {
    test(`should render with label ${alignment} if labelInline is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonToggleGroupComponent labelInline={state} />);

      const labelParent = buttonToggleGroup(page)
        .locator("div")
        .locator("div")
        .nth(0);
      if (state) {
        await expect(labelParent).toHaveCSS("box-sizing", "border-box");
        await expect(labelParent).toHaveCSS("margin-bottom", "0px");
      } else {
        await expect(labelParent).not.toHaveCSS("box-sizing", "border-box");
        await expect(labelParent).toHaveCSS("margin-bottom", "8px");
      }
    });
  });

  test("should render with second button toggle pressed", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleComponent pressed />);

    await expect(buttonToggleButton(page).nth(1)).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  (
    [
      [25, 341],
      [50, 683],
      [100, 1366],
    ] as [ButtonToggleGroupProps["inputWidth"], number][]
  ).forEach(([labelWidth, width]) => {
    test(`should render with labelWidth prop of ${labelWidth} and width of ${width}`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonToggleGroupNotInBox inputWidth={labelWidth} />);

      const buttonParent = buttonToggleButton(page).locator("..").locator("..");
      await assertCssValueIsApproximately(buttonParent, "width", width);
    });
  });

  test("should render with helpAriaLabel set to playwright_data", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent helpAriaLabel={testPropValue} />);

    await expect(buttonToggleGroupHelpIcon(page)).toHaveAttribute(
      "aria-label",
      testPropValue,
    );
  });

  (
    [
      ["8px", 1],
      ["16px", 2],
    ] as const
  ).forEach(([padding, spacing]) => {
    test(`should render with padding of ${padding} if labelSpacing prop is ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonToggleGroupComponent labelInline labelSpacing={spacing} />,
      );

      await expect(
        getDataElementByValue(page, "label").locator(".."),
      ).toHaveCSS("padding-right", padding);
    });
  });

  test("container div should auto flex", async ({ mount, page }) => {
    await mount(<ButtonToggleGroupComponent fullWidth />);

    await expect(buttonTogglePreview(page).nth(0)).toHaveCSS(
      "flex",
      "1 1 auto",
    );
  });

  test("should render with width of label as 100% / 453px", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupNotInBox fullWidth />);

    await assertCssValueIsApproximately(
      buttonToggleButton(page).nth(0),
      "width",
      453,
    );
  });
});

test.describe("Event tests for group component", () => {
  test("should call onChange callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <ButtonToggleGroupComponent
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    await buttonTogglePreview(page).nth(0).click();
    expect(callbackCount).toBe(1);
  });

  test("should not call onChange callback when disabled prop is passed", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <ButtonToggleGroupComponent
        disabled
        onChange={() => {
          callbackCount += 1;
        }}
      />,
    );

    await buttonTogglePreview(page).nth(0).click();
    expect(callbackCount).toBe(0);
  });

  test("calls onChange callback with an undefined value, when the currently-selected button is clicked and the allowDeselect prop is true", async ({
    mount,
    page,
  }) => {
    let onChangeValue: unknown;
    await mount(
      <ButtonToggleGroupComponent
        value="foo"
        allowDeselect
        onChange={(event, value) => {
          onChangeValue = value;
        }}
      />,
    );

    await page.getByRole("button", { name: "foo" }).click();

    expect(onChangeValue).toBeUndefined();
  });
});

test.describe("Navigation tests", () => {
  test("should only allow the first button to be tabbed to when no buttons are selected", async ({
    mount,
    page,
  }) => {
    await mount(<WithOutsideButtons />);

    const buttonBefore = page
      .getByRole("button")
      .filter({ hasText: "button before" });
    const buttonAfter = page
      .getByRole("button")
      .filter({ hasText: "button after" });

    await buttonBefore.focus();
    await page.keyboard.press("Tab");
    await expect(buttonToggleButton(page).nth(0)).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(buttonAfter).toBeFocused();
  });

  test("should only allow the first button to be shift-tabbed to when no buttons are selected", async ({
    mount,
    page,
  }) => {
    await mount(<WithOutsideButtons />);

    const buttonBefore = page
      .getByRole("button")
      .filter({ hasText: "button before" });
    const buttonAfter = page
      .getByRole("button")
      .filter({ hasText: "button after" });

    await buttonAfter.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(buttonToggleButton(page).nth(0)).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(buttonBefore).toBeFocused();
  });

  test("should only allow the selected button to be tabbed to when it is selected", async ({
    mount,
    page,
  }) => {
    await mount(<WithOutsideButtons />);

    const buttonBefore = page
      .getByRole("button")
      .filter({ hasText: "button before" });
    const buttonAfter = page
      .getByRole("button")
      .filter({ hasText: "button after" });

    await buttonTogglePreview(page).nth(1).click();
    await buttonBefore.focus();
    await page.keyboard.press("Tab");
    await expect(buttonToggleButton(page).nth(1)).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(buttonAfter).toBeFocused();
  });

  test("should only allow the selected button to be shift-tabbed to when one is selected", async ({
    mount,
    page,
  }) => {
    await mount(<WithOutsideButtons />);

    const buttonBefore = page
      .getByRole("button")
      .filter({ hasText: "button before" });
    const buttonAfter = page
      .getByRole("button")
      .filter({ hasText: "button after" });

    await buttonTogglePreview(page).nth(1).click();
    await buttonAfter.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(buttonToggleButton(page).nth(1)).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(buttonBefore).toBeFocused();
  });

  test("should cycle through the buttons in the group when using the right arrow key", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent />);

    await buttonToggleButton(page).nth(0).click();
    await page.keyboard.press("ArrowRight");
    await expect(buttonToggleButton(page).nth(1)).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(buttonToggleButton(page).nth(2)).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(buttonToggleButton(page).nth(0)).toBeFocused();
  });

  test("should cycle through the buttons in the group, selecting each one, when using the left arrow key", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent />);

    await buttonToggleButton(page).nth(0).click();
    await page.keyboard.press("ArrowLeft");
    await expect(buttonToggleButton(page).nth(2)).toBeFocused();
    await page.keyboard.press("ArrowLeft");
    await expect(buttonToggleButton(page).nth(1)).toBeFocused();
    await page.keyboard.press("ArrowLeft");
    await expect(buttonToggleButton(page).nth(0)).toBeFocused();
  });
});

test.describe("Accessibility tests for group component", () => {
  test("should pass accessibility tests for default grouped example", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with second button toggle checked", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonToggleGroupComponent />);

    await buttonTogglePreview(page).nth(1).click();
    await checkAccessibility(page);
  });

  [...helpAlignment].forEach(([alignment, state]) => {
    test(`should pass accessibility tests with label ${alignment} if labelInline is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonToggleGroupComponent labelInline={state} />);

      await checkAccessibility(page);
    });
  });

  ([1, 2] as const).forEach((spacing) => {
    test(`should pass accessibility tests with labelSpacing prop set to ${spacing}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonToggleGroupComponent labelInline labelSpacing={spacing} />,
      );

      await checkAccessibility(page);
    });
  });
});

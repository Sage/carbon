import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import { ButtonMinorProps } from "./button-minor.component";
import {
  Default as ButtonMinor,
  ButtonMinorCustom,
  ButtonMinorDifferentTypes,
  PrimaryButton,
  PrimaryDestructiveButton,
  PrimaryDisabledButton,
  PrimaryIconButton,
  PrimaryFullWidthButton,
  PrimaryNoWrapButton,
  SecondaryButton,
  SecondaryDestructiveButton,
  SecondaryDisabledButton,
  SecondaryIconButton,
  SecondaryFullWidthButton,
  SecondaryNoWrapButton,
  TertiaryButton,
  TertiaryDestructiveButton,
  TertiaryDisabledButton,
  TertiaryIconButton,
  TertiaryFullWidthButton,
  TertiaryNoWrapButton,
  IconOnlyButton,
  IconOnlyWithTooltipButton,
} from "./components.test-pw";
import { buttonMinorComponent } from "../../../playwright/components/button/index";
import { BUTTON_ICON_POSITIONS } from "../button/button.config";
import { ICON } from "../../../playwright/components/locators";
import {
  dlsRoot,
  icon,
  tooltipPreview,
} from "../../../playwright/components/index";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
} from "../../../playwright/support/helper";
import { HooksConfig } from "../../../playwright";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const buttonPositions = [
  ["1st", 0],
  ["2nd", 1],
  ["3rd", 2],
] as const;

const keysToPress = [
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Enter",
] as const;

const destructive = "rgb(162, 44, 59)";
const transparent = "rgba(0, 0, 0, 0)";

test.describe("check Focus Outline & Border Radius for Button Minor Component", () => {
  test("should have the expected styling when the focusRedesignOptOut is false", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonMinorCustom />);

    const outlined = buttonMinorComponent(page, 0).nth(0);
    await outlined.focus();
    await expect(outlined).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(outlined).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");
  });

  test("should have the expected styling when the focusRedesignOptOut is true", async ({
    mount,
    page,
  }) => {
    await mount<HooksConfig>(<ButtonMinorCustom />, {
      hooksConfig: {
        focusRedesignOptOut: true,
      },
    });

    const outlined = buttonMinorComponent(page, 0).nth(0);
    await outlined.focus();
    await expect(outlined).toHaveCSS("outline", "rgb(255, 188, 25) solid 3px");
  });

  test("should have the expected styling when roundedCornersOptOut is false", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonMinor>Foo</ButtonMinor>);

    await expect(buttonMinorComponent(page)).toHaveCSS("border-radius", "4px");
  });

  test("should have the expected styling when roundedCornersOptOut is true", async ({
    mount,
    page,
  }) => {
    await mount<HooksConfig>(<ButtonMinor>Foo</ButtonMinor>, {
      hooksConfig: { roundedCornersOptOut: true },
    });

    await expect(buttonMinorComponent(page)).toHaveCSS(`border-radius`, "0px");
  });
});

test.describe("Check props for Button Minor component", () => {
  test("should render Button Minor with aria-label prop", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonMinorCustom aria-label="playwright-aria" />);

    await expect(buttonMinorComponent(page, 0)).toHaveAttribute(
      "aria-label",
      "playwright-aria",
    );
  });

  testData.forEach((label) => {
    test(`should render Button Minor label using ${label} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonMinor>{label}</ButtonMinor>);

      await expect(buttonMinorComponent(page, 0)).toHaveText(label);
    });
  });

  testData.forEach((subtext) => {
    test(`should render Button Minor subtext with ${subtext} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonMinor size="large" subtext={subtext}>
          Title
        </ButtonMinor>,
      );

      await expect(
        buttonMinorComponent(page, 0).locator("span").locator("span").nth(1),
      ).toHaveText(subtext);
    });
  });

  testData.forEach((name) => {
    test(`should render Button Minor name using ${name} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonMinorCustom name={name} />);

      await expect(buttonMinorComponent(page, 0)).toHaveAttribute("name", name);
    });
  });

  testData.forEach((id) => {
    test(`should render Button Minor id using ${id} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonMinorCustom id={id} />);

      await expect(buttonMinorComponent(page, 0)).toHaveAttribute("id", id);
    });
  });

  testData.forEach((tooltipMessage) => {
    test(`should render tooltip message as ${tooltipMessage}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonMinor
          iconType="bin"
          iconTooltipMessage={tooltipMessage}
          m="100px"
        />,
      );
      await page.getByRole("button").locator(ICON).hover({ force: true });
      await expect(tooltipPreview(page)).toHaveText(tooltipMessage);
      await dlsRoot(page).hover({ position: { x: 0, y: 0 } });
    });
  });

  test("when icon only, icon's position is absolute", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonMinor iconType="bin" />);

    await expect(icon(page)).toHaveCSS("position", "absolute");
  });

  (
    [
      ["small", 32],
      ["medium", 40],
      ["large", 48],
    ] as [ButtonMinorProps["size"], number][]
  ).forEach(([size, minHeight]) => {
    test(`should render Button Minor in ${size} size`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonMinor size={size}>{size}</ButtonMinor>);

      await expect(buttonMinorComponent(page, 0)).toHaveCSS(
        "min-height",
        `${minHeight}px`,
      );
    });
  });

  (
    [
      [BUTTON_ICON_POSITIONS[0], "right"],
      [BUTTON_ICON_POSITIONS[1], "left"],
    ] as [ButtonMinorProps["iconPosition"], string][]
  ).forEach(([iconPosition, margin]) => {
    test(`should set position to ${iconPosition} for icon in a button`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ButtonMinorCustom iconType="add" iconPosition={iconPosition} />,
      );

      await expect(icon(page)).toHaveCSS(`margin-${margin}`, "8px");
    });
  });

  test("should render Button Minor with full width", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonMinorCustom fullWidth />);

    await assertCssValueIsApproximately(
      buttonMinorComponent(page, 0),
      "width",
      1365,
    );
  });

  test("should render Button Minor with href", async ({ mount, page }) => {
    await mount(<ButtonMinorCustom href="https://carbon.sage.com/" />);

    await expect(buttonMinorComponent(page, 0)).toHaveAttribute(
      "href",
      "https://carbon.sage.com/",
    );
  });

  (
    [
      [true, "white-space"],
      [false, "flex-wrap"],
    ] as [ButtonMinorProps["noWrap"], string][]
  ).forEach(([booleanState, cssValue]) => {
    test(`should render the Button Minor text with noWrap prop set to ${booleanState}`, async ({
      mount,
      page,
    }) => {
      const assertion = booleanState ? "nowrap" : "wrap";
      await mount(
        <ButtonMinor noWrap={Boolean(booleanState)}>
          {" "}
          Long long long long long text{" "}
        </ButtonMinor>,
      );

      await expect(buttonMinorComponent(page, 0)).toHaveCSS(
        cssValue,
        assertion,
      );
    });
  });

  ([...buttonPositions] as [string, number][]).forEach(([position, index]) => {
    test(`should check Button Minor is disabled for the ${position} button`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonMinorDifferentTypes disabled />);

      await expect(buttonMinorComponent(page, index)).toBeDisabled();
    });
  });

  ([...buttonPositions] as [string, number][]).forEach(([position, index]) => {
    test(`should check Button Minor is enabled for the ${position} button`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonMinorDifferentTypes />);

      await expect(buttonMinorComponent(page, index)).toBeEnabled();
    });
  });

  (
    [
      ["1st", "primary", 0],
      ["2nd", "secondary", 1],
      ["3rd", "tertiary", 2],
    ] as [string, ButtonMinorProps["buttonType"], number][]
  ).forEach(([position, type, index]) => {
    test(`should check Button Minor is destructive for the ${position} button when buttonType is ${type}`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonMinorDifferentTypes buttonType={type} destructive />);

      await buttonMinorComponent(page, index).hover({ force: true });

      await expect(buttonMinorComponent(page, index)).toHaveCSS(
        "background",
        `${destructive} none repeat scroll 0% 0% / auto padding-box border-box`,
      );
      await expect(buttonMinorComponent(page, index)).toHaveCSS(
        "border-color",
        transparent,
      );
      await expect(buttonMinorComponent(page, index)).toHaveCSS(
        "color",
        "rgb(255, 255, 255)",
      );
    });
  });

  ["_blank", "_self", "_parent", "_top"].forEach((target) => {
    test(`should render Button Minor with target prop set to ${target}`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonMinorCustom target={target} />);

      await expect(buttonMinorComponent(page, 0)).toHaveAttribute(
        "target",
        target,
      );
    });
  });

  ["add", "share", "tick"].forEach((type) => {
    test(`should render Button Minor with type prop set to ${type}`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonMinorCustom type={type} />);

      await expect(buttonMinorComponent(page, 0)).toHaveAttribute("type", type);
    });
  });

  ["noopener", "noreferrer", "opener"].forEach((rel) => {
    test(`should render Button Minor with rel prop set to ${rel}`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonMinorCustom rel={rel} />);

      await expect(buttonMinorComponent(page, 0)).toHaveAttribute("rel", rel);
    });
  });

  test("should render Button Minor with Children as button text", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonMinor>Children</ButtonMinor>);

    await expect(buttonMinorComponent(page)).toHaveText("Children");
  });
});

test.describe("check events for Button Minor component", () => {
  test("should call onClick callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <ButtonMinorCustom
        onClick={() => {
          callbackCount += 1;
        }}
      />,
    );

    const button = buttonMinorComponent(page, 0);
    await button.click();
    expect(callbackCount).toBe(1);
  });

  test("should call onBlur callback when a blur event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <ButtonMinorCustom
        onBlur={() => {
          callbackCount += 1;
        }}
      />,
    );

    const elementToFocus = buttonMinorComponent(page, 0);
    await elementToFocus.focus();
    const elementToBlur = buttonMinorComponent(page, 0);
    await elementToBlur.blur();
    expect(callbackCount).toBe(1);
  });

  [...keysToPress].forEach((key) => {
    test(`should call onKeyDown callback when a keydown ${key} event is triggered`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <ButtonMinorCustom
          onKeyDown={() => {
            callbackCount += 1;
          }}
        />,
      );
      const elementToFocus = buttonMinorComponent(page, 0);
      await elementToFocus.focus();
      await elementToFocus.press(key);
      expect(callbackCount).toBe(1);
    });
  });

  test("should call onFocus callback when a focus event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <ButtonMinorCustom
        onFocus={() => {
          callbackCount += 1;
        }}
      />,
    );

    const elementToFocus = buttonMinorComponent(page, 0);
    await elementToFocus.focus();
    expect(callbackCount).toBe(1);
  });
});

test.describe("accessibility tests", () => {
  test("should check accessibility for primary Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<PrimaryButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for primary destructive Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<PrimaryDestructiveButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for primary disabled Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<PrimaryDisabledButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for primary icon before and after Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<PrimaryIconButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for primary full width Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<PrimaryFullWidthButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for primary no wrap Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<PrimaryNoWrapButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for secondary Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for secondary destructive Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryDestructiveButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for secondary disabled Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryDisabledButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for secondary icon before and after Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryIconButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for secondary full width Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryFullWidthButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for secondary no wrap Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryNoWrapButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for tertiary Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<TertiaryButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for tertiary destructive Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<TertiaryDestructiveButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for tertiary disabled Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<TertiaryDisabledButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for tertiary icon before and after Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<TertiaryIconButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for tertiary full width Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<TertiaryFullWidthButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for tertiary no wrap Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<TertiaryNoWrapButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for icon only Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<IconOnlyButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for icon only with tooltip Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<IconOnlyWithTooltipButton />);

    await checkAccessibility(page);
  });
});

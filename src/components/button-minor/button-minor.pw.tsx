import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import { ButtonMinorProps } from ".";
import {
  Default as ButtonMinor,
  ButtonMinorCustom,
  ButtonMinorDifferentTypes,
} from "./button-minor-test.stories";
import * as Stories from "./button-minor.stories";
import {
  buttonSubtextPreview,
  buttonMinorComponent,
} from "../../../playwright/components/button/index";
import { BUTTON_SIZES, BUTTON_ICON_POSITIONS } from "../button/button.config";
import { ICON } from "../../../playwright/components/locators";
import {
  dlsRoot,
  icon,
  tooltipPreview,
} from "../../../playwright/components/index";
import { CHARACTERS } from "../../../cypress/support/component-helper/constants";
import { assertCssValueIsApproximately } from "../../../cypress/support/component-helper/common-steps";
import { keyCode } from "../../../cypress/support/helper";
import { checkAccessibility } from "../../../playwright/support/helper";
import { HooksConfig } from "../../../playwright";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const buttonTypesAndBackgrounds = [
  ["1st", "primary", 0],
  ["2nd", "secondary", 1],
  ["3rd", "tertiary", 2],
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

test.describe("when focused", () => {
  test("should have the expected styling when the focusRedesignOptOut is false", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonMinorCustom />);

    const outlined = buttonMinorComponent(page, 0).nth(0);
    await outlined.focus();
    await expect(outlined).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px"
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
});

test.describe("Check props for Button Minor component", () => {
  test("should render Button Minor with aria-label prop", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonMinorCustom aria-label="cypress-aria" />);

    await expect(buttonMinorComponent(page, 0)).toHaveAttribute(
      "aria-label",
      "cypress-aria"
    );
    // buttonMinorComponent().should("have.attr", "aria-label", "cypress-aria");
  });

  testData.forEach((label) => {
    test(`should render Button Minor label using ${label} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonMinor>{label}</ButtonMinor>);

      await expect(buttonMinorComponent(page, 0)).toHaveText(label);
      // buttonMinorComponent().should("have.text", label);
    });
  });

  testData.forEach((subtext) => {
    test(`should render Button Minor subtext with ${subtext} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonMinorCustom size="large" subtext={subtext} />);

      await expect(buttonMinorComponent(page, 0)).toHaveText(subtext);
      // buttonSubtextPreview().should("have.text", subtext);
    });
  });

  testData.forEach((name) => {
    test(`should render Button Minor name using ${name} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonMinorCustom name={name} />);

      await expect(buttonMinorComponent(page, 0)).toHaveAttribute("name", name);
      // buttonMinorComponent().should("have.attr", "name", name);
    });
  });

  testData.forEach((id) => {
    test(`should render Button Minor id using ${id} special characters`, async ({
      mount,
      page,
    }) => {
      await mount(<ButtonMinorCustom id={id} />);

      await expect(buttonMinorComponent(page, 0)).toHaveAttribute("id", id);
      // buttonMinorComponent().should("have.attr", "id", id);
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
        />
      );
      await page.getByRole("button").locator(ICON).hover({ force: true });
      await expect(tooltipPreview(page)).toHaveText(tooltipMessage);
      await dlsRoot(page).hover({ position: { x: 0, y: 0 } });

      // buttonMinorComponent().children().last().realHover();
      // tooltipPreview().should("have.text", tooltipMessage);
      // cyRoot().realHover({ position: "topLeft" });
    });
  });

  test("when icon only, icon's position is absolute", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonMinor iconType="bin" />);

    await expect(icon(page)).toHaveCSS("position", "absolute");
    // icon().should("have.css", "position", "absolute");
  });

  // ([
  //   ["small", 32],
  //   ["medium", 40],
  //   ["large", 48],
  // ] as [ButtonMinorProps["size"], number][]).forEach((size, minHeight) => {
  //   test("should render Button Minor in %s size", ({ mount, page }) => {
  //     await mount(
  //       <ButtonMinor size={size}>{size}</ButtonMinor>
  //     );

  //     buttonMinorComponent().should(
  //       "have.css",
  //       "min-height",
  //       `${minHeight}px`
  //     );
  //   });
  // });

  // ([
  //   [BUTTON_ICON_POSITIONS[0], "right"],
  //   [BUTTON_ICON_POSITIONS[1], "left"],
  // ] as [ButtonMinorProps["iconPosition"], string][]).forEach((iconPosition, margin) => {
  //   test("should set position to %s for icon in a button", async ( { mount, page }) => {
  //     await mount(
  //       <ButtonMinorCustom iconType="add" iconPosition={iconPosition} />
  //     );

  //     await expect(icon(page)).toHaveCSS(`margin-${margin}`, "8px");
  //     // icon().should("have.css", `margin-${margin}`, "8px");
  //   });
  // });

  test("should render Button Minor with full width", async ({
    mount,
    page,
  }) => {
    await mount(<ButtonMinorCustom fullWidth />);

    await assertCssValueIsApproximately(
      buttonMinorComponent(page, 0),
      "width",
      1365
    );
    // buttonMinorComponent().then(($el) => {
    //   assertCssValueIsApproximately($el, "width", 1365);
    // });
  });

  test("should render Button Minor with href", async ({ mount, page }) => {
    await mount(<ButtonMinorCustom href="https://carbon.sage.com/" />);

    await expect(buttonMinorComponent(page, 0)).toHaveAttribute(
      "href",
      "https://carbon.sage.com/"
    );
    // buttonMinorComponent().should(
    //   "have.attr",
    //   "href",
    //   "https://carbon.sage.com/"
    // );
  });

  // ([
  //   [true, "white-space"],
  //   [false, "flex-wrap"],
  // ] as [ButtonMinorProps["noWrap"], string][]).forEach((booleanState, cssValue) => {
  //   test("should render the Button Minor text with noWrap prop set to %s", ({ mount, page }) => {
  //     const assertion = booleanState ? "nowrap" : "wrap";

  //     await mount(
  //       <ButtonMinor noWrap={booleanState}>
  //         {" "}
  //         Long long long long long text{" "}
  //       </ButtonMinor>
  //     );

  //     buttonMinorComponent().should("have.css", cssValue, assertion);
  //   });
  // });

  // it.each([...buttonTypesAndBackgrounds] as [
  //   string,
  //   ButtonMinorProps["buttonType"],
  //   number
  // ][])(
  //   "should check Button Minor is disabled for the %s button",
  //   (position, type, index) => {
  //     await mount(<ButtonMinorDifferentTypes disabled />);

  //     buttonMinorComponent(index)
  //       .should("be.disabled")
  //       .and("have.attr", "disabled");
  //   }
  // );

  // it.each([...buttonTypesAndBackgrounds] as [
  //   string,
  //   ButtonMinorProps["buttonType"],
  //   number
  // ][])(
  //   "should check Button Minor is enabled for the %s button",
  //   (position, type, index) => {
  //     await mount(<ButtonMinorDifferentTypes />);

  //     buttonMinorComponent(index).should("be.enabled");
  //   }
  // );

  // it.each([...buttonTypesAndBackgrounds] as [
  //   string,
  //   ButtonMinorProps["buttonType"],
  //   number
  // ][])(
  //   "should check Button Minor is destructive for the %s button when buttonType is %s",
  //   (_, type, index) => {
  //     await mount(
  //       <ButtonMinorDifferentTypes buttonType={type} destructive />
  //     );

  //     buttonMinorComponent(index).realHover();

  //     buttonMinorComponent(index)
  //       .should(
  //         "have.css",
  //         "background",
  //         `${destructive} none repeat scroll 0% 0% / auto padding-box border-box`
  //       )
  //       .and("have.css", "border-color", transparent)
  //       .and("have.css", "color", "rgb(255, 255, 255)");
  //   }
  // );

  // it.each(["_blank", "_self", "_parent", "_top"])(
  //   "should render Button Minor with target prop set to %s",
  //   (target) => {
  //     await mount(<ButtonMinorCustom target={target} />);

  //     buttonMinorComponent().should("have.attr", "target", target);
  //   }
  // );

  // it.each(["add", "share", "tick"])(
  //   "should render Button Minor with type prop set to %s",
  //   (type) => {
  //     await mount(<ButtonMinorCustom type={type} />);

  //     buttonMinorComponent().should("have.attr", "type", type);
  //   }
  // );
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
      />
    );

    const button = buttonMinorComponent(page, 0);
    await button.click();
    expect(callbackCount).toBe(1);
    // buttonMinorComponent().click();
    // cy.get("@onClick").should("be.calledOnce");
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
      />
    );

    const elementToFocus = buttonMinorComponent(page, 0);
    await elementToFocus.focus();
    const elementToBlur = buttonMinorComponent(page, 0);
    await elementToBlur.blur();
    expect(callbackCount).toBe(1);
    // buttonMinorComponent().focus().blur();
    // cy.get("@onBlur").should("be.calledOnce");
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
        />
      );
      const elementToFocus = buttonMinorComponent(page, 0);
      await elementToFocus.focus();
      await elementToFocus.press(key);
      expect(callbackCount).toBe(1);
      // buttonMinorComponent().focus().trigger("keydown", keyCode(key));
      // cy.get("@onKeyDown").should("be.calledOnce");
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
      />
    );

    const elementToFocus = buttonMinorComponent(page, 0);
    await elementToFocus.focus();
    expect(callbackCount).toBe(1);
    // buttonMinorComponent().focus();
    // cy.get("@onFocus").should("be.calledOnce");
  });
});

test.describe("accessibility tests", () => {
  test("should check accessibility for primary Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.PrimaryButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for primary destructive Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.PrimaryDestructiveButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for primary disabled Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.PrimaryDisabledButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for primary icon before and after Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.PrimaryIconButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for primary full width Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.PrimaryFullWidthButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for primary no wrap Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.PrimaryNoWrapButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for secondary Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.SecondaryButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for secondary destrictive Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.SecondaryDestructiveButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for secondary disabled Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.SecondaryDisabledButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for secondary icon before and after Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.SecondaryIconButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for secondary full width Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.SecondaryFullWidthButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for secondary no wrap Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.SecondaryNoWrapButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for tertiary Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.TertiaryButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for tertiary destructive Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.TertiaryDestructiveButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for tertiary disabled Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.TertiaryDisabledButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for tertiary icon before and after Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.TertiaryIconButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for tertiary full width Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.TertiaryFullWidthButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for tertiary no wrap Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.TertiaryNoWrapButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for icon only Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.IconOnlyButton />);

    await checkAccessibility(page);
  });

  test("should check accessibility for icon only with tooltip Button Minor", async ({
    mount,
    page,
  }) => {
    await mount(<Stories.IconOnlyWithTooltipButton />);

    await checkAccessibility(page);
  });
});

test("should have the expected border radius", async ({ mount, page }) => {
  await mount(<ButtonMinor>Foo</ButtonMinor>);

  await expect(buttonMinorComponent(page)).toHaveCSS("border-radius", "4px");
  // buttonMinorComponent().should("have.css", `border-radius`, "4px");
});

import React from "react";
import { expect, test } from "@playwright/experimental-ct-react17";
import {
  SplitButtonList,
  SplitButtonNestedInDialog,
  WithWrapper,
  TwoSplitButtons,
  TwoButtonsWithWrapper,
} from "./components.test-pw";
import { Accordion } from "../accordion";
import SplitButton, { SplitButtonProps } from ".";
import Button from "../button";
import Box from "../box";
import { buttonSubtextPreview } from "../../../playwright/components/button";
import {
  getStyle,
  assertCssValueIsApproximately,
  checkAccessibility,
} from "../../../playwright/support/helper";
import { icon, getDataElementByValue } from "../../../playwright/components";
import {
  splitToggleButton,
  additionalButton,
  additionalButtonsContainer,
  splitMainButtonDataComponent,
  mainButton,
  splitMainButton,
} from "../../../playwright/components/split-button";
import { accordionDefaultTitle } from "../../../playwright/components/accordion";
import { alertDialogPreview } from "../../../playwright/components/dialog";
import { CHARACTERS } from "../../../playwright/support/constants";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const keyToTrigger = ["Enter", "Space", "ArrowDown", "ArrowUp"] as const;

test.describe("Styling tests", () => {
  test(`should render with the expected styling`, async ({ mount, page }) => {
    await mount(<SplitButtonList />);

    await mainButton(page).focus();
    await expect(mainButton(page)).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(mainButton(page)).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
    await splitToggleButton(page).focus();
    await expect(splitToggleButton(page)).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(splitToggleButton(page)).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
  });

  (
    [
      ["primary", "rgb(0, 126, 69)", "rgb(255, 255, 255)", "rgba(0, 0, 0, 0)"],
      ["secondary", "rgba(0, 0, 0, 0)", "rgb(0, 126, 69)", "rgb(0, 126, 69)"],
    ] as [SplitButtonProps["buttonType"], string, string, string][]
  ).forEach(([buttonType, backgroundColor, color, borderColor]) => {
    test(`should render ${buttonType} SplitButton with ${backgroundColor} background color, ${color} color and ${borderColor} border color`, async ({
      mount,
      page,
    }) => {
      await mount(<SplitButtonList buttonType={buttonType} />);

      await expect(mainButton(page)).toHaveCSS(
        "background-color",
        backgroundColor,
      );
      await expect(mainButton(page)).toHaveCSS("color", color);
      await expect(mainButton(page)).toHaveCSS("border-color", borderColor);
    });
  });

  test(`should render with the expected border radius on main and toggle buttons`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonList />);

    await expect(mainButton(page)).toHaveCSS(
      "border-radius",
      "32px 0px 0px 32px",
    );
    await expect(splitToggleButton(page)).toHaveCSS(
      "border-radius",
      "0px 32px 32px 0px",
    );
  });

  test(`should render with the expected border radius on children container and buttons`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonList />);

    await splitToggleButton(page).nth(0).click();
    await expect(additionalButtonsContainer(page)).toHaveCSS(
      "border-radius",
      "8px",
    );
    await expect(additionalButton(page, 0)).toHaveCSS(
      "border-radius",
      "8px 8px 0px 0px",
    );
    await expect(additionalButton(page, 1)).toHaveCSS("border-radius", "0px");
    await expect(additionalButton(page, 2)).toHaveCSS(
      "border-radius",
      "0px 0px 8px 8px",
    );
  });

  test(`should render with the expected border radius when some children buttons have href prop`, async ({
    mount,
    page,
  }) => {
    await mount(
      <SplitButton text="default text">
        <Button href="#">Button 1</Button>
        <Button>Button 2</Button>
        <Button href="#">Button 3</Button>
      </SplitButton>,
    );

    await splitToggleButton(page).nth(0).click();
    await expect(additionalButtonsContainer(page)).toHaveCSS(
      "border-radius",
      "8px",
    );
    await expect(
      additionalButtonsContainer(page).locator("a").nth(0),
    ).toHaveCSS("border-radius", "8px 8px 0px 0px");
    await expect(
      additionalButtonsContainer(page).locator("button").nth(0),
    ).toHaveCSS("border-radius", "0px");
    await expect(
      additionalButtonsContainer(page).locator("a").nth(1),
    ).toHaveCSS("border-radius", "0px 0px 8px 8px");
  });

  test("should render with additional buttons min-width computed based on the component's width", async ({
    mount,
    page,
  }) => {
    await mount(
      <SplitButtonList size="large">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </SplitButtonList>,
    );

    await splitToggleButton(page).nth(0).click();

    const transformValue = await getStyle(
      additionalButtonsContainer(page),
      "min-width",
    );
    const transformValueAsNumber = +transformValue.replace("px", "");

    expect(transformValueAsNumber).toBeLessThan(156);
    expect(transformValueAsNumber).toBeGreaterThan(154);
  });

  test(`should render with the expected border radius when there is only on one child button`, async ({
    mount,
    page,
  }) => {
    await mount(
      <SplitButton text="default text">
        <Button>Button 1</Button>
      </SplitButton>,
    );

    await splitToggleButton(page).nth(0).click();
    await expect(additionalButton(page, 0)).toHaveCSS("border-radius", "8px");
  });
});

test.describe("Prop tests", () => {
  testData.forEach((text) => {
    test(`should render with ${text} as text`, async ({ mount, page }) => {
      await mount(<SplitButtonList text={text} />);

      await expect(getDataElementByValue(page, "main-text")).toHaveText(text);
    });
  });

  testData.forEach((subtext) => {
    test(`should render with ${subtext} as subtext`, async ({
      mount,
      page,
    }) => {
      await mount(<SplitButtonList size="large" subtext={subtext} />);

      await expect(buttonSubtextPreview(page)).toHaveText(subtext);
    });
  });

  test(`should render with data-element prop`, async ({ mount, page }) => {
    await mount(
      <SplitButtonList data-element="split-button-playwright-element" />,
    );

    await expect(splitMainButton(page)).toHaveAttribute(
      "data-element",
      "split-button-playwright-element",
    );
  });

  test(`should render with data-role prop`, async ({ mount, page }) => {
    await mount(<SplitButtonList data-role="split-button-playwright-role" />);

    await expect(splitMainButton(page)).toHaveAttribute(
      "data-role",
      "split-button-playwright-role",
    );
  });

  (["left", "right"] as SplitButtonProps["align"][]).forEach((alignment) => {
    test(`should render with alignment to the ${alignment}`, async ({
      mount,
      page,
    }) => {
      await mount(<SplitButtonList align={alignment} />);

      await getDataElementByValue(page, "dropdown").click();
      await expect(additionalButton(page, 1)).toHaveCSS(
        "justify-content",
        alignment as string,
      );
    });
  });

  (
    [
      ["left", 198],
      ["right", 242],
    ] as [SplitButtonProps["position"], number][]
  ).forEach(([position, value]) => {
    test(`should render with menu position to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(<SplitButtonList ml="200px" position={position} />);

      await getDataElementByValue(page, "dropdown").click();
      const listContainer = additionalButtonsContainer(page);
      await expect(listContainer).toHaveCSS("position", "fixed");
      await assertCssValueIsApproximately(listContainer, "top", 46);
      await assertCssValueIsApproximately(listContainer, "left", value);
    });
  });

  test(`should render with component disabled`, async ({ mount, page }) => {
    await mount(<SplitButtonList disabled />);

    await mainButton(page).hover();
    await expect(splitMainButton(page).locator("button").nth(0)).toBeDisabled();
    await expect(splitMainButton(page).locator("button").nth(1)).toBeDisabled();
  });

  (
    [
      ["after", "left"],
      ["before", "right"],
    ] as [SplitButtonProps["iconPosition"], string][]
  ).forEach(([iconPosition, margin]) => {
    test(`should render with icon position ${iconPosition}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <SplitButtonList iconType="add" iconPosition={iconPosition}>
          IconPosition
        </SplitButtonList>,
      );

      await expect(icon(page).first()).toHaveCSS(`margin-${margin}`, "8px");
    });
  });
});

test.describe("Events tests", () => {
  test(`should click a main element of SplitButton component`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <SplitButtonList
        onClick={() => {
          callbackCount += 1;
        }}
      />,
    );

    await splitMainButtonDataComponent(page, 0).click();
    expect(callbackCount).toBe(1);
  });
});

test.describe("Functional tests", () => {
  test(`should render component in a hidden container and expand by clicking`, async ({
    mount,
    page,
  }) => {
    await mount(
      <Accordion title="Heading">
        <SplitButtonList />
      </Accordion>,
    );

    await accordionDefaultTitle(page).click();
    await getDataElementByValue(page, "dropdown").click();
    await expect(additionalButton(page, 0)).toBeVisible();
    await expect(additionalButton(page, 1)).toBeVisible();
    await expect(additionalButton(page, 2)).toBeVisible();
    await expect(splitToggleButton(page)).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  test(`should render component in a hidden container and expand by pressing Enter key and clicking`, async ({
    mount,
    page,
  }) => {
    await mount(
      <Accordion title="Heading">
        <SplitButtonList />
      </Accordion>,
    );

    await accordionDefaultTitle(page).press("Enter");
    await getDataElementByValue(page, "dropdown").click();
    await expect(additionalButton(page, 0)).toBeVisible();
    await expect(additionalButton(page, 1)).toBeVisible();
    await expect(additionalButton(page, 2)).toBeVisible();
    await expect(splitToggleButton(page)).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  test(`should render component and expand by clicking toggle button`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonList />);

    await splitToggleButton(page).nth(0).click();
    await expect(additionalButton(page, 0)).toBeVisible();
    await expect(additionalButton(page, 1)).toBeVisible();
    await expect(additionalButton(page, 2)).toBeVisible();
  });

  test(`should close additional buttons when clicking on the main button`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonList />);

    await splitToggleButton(page).nth(0).click();
    await expect(additionalButtonsContainer(page)).toBeVisible();

    await splitMainButton(page).click();
    await expect(additionalButtonsContainer(page)).not.toBeVisible();
  });

  test(`should verify pressing Tab moves focus to next child button, then closes the list and focuses the next element on the page`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoSplitButtons />);

    await splitToggleButton(page).nth(0).click();
    await expect(additionalButton(page, 0)).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(additionalButton(page, 1)).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(additionalButton(page, 2)).toBeFocused();
    await page.keyboard.press("Tab");

    await expect(additionalButton(page, 0)).not.toBeVisible();
    await expect(mainButton(page).nth(1)).toBeFocused();
  });

  test(`should verify pressing ArrowDown moves focus to next child button and does not loop when last child is focused`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoSplitButtons />);

    await splitToggleButton(page).nth(0).click();
    await page.keyboard.press("ArrowDown");
    await expect(additionalButton(page, 1)).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(additionalButton(page, 2)).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(additionalButton(page, 2)).toBeFocused();
  });

  test(`should verify pressing Shift+Tab moves focus to previous child button, then closes the list and focuses the toggle button`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoSplitButtons />);

    await splitToggleButton(page).nth(0).click();
    await additionalButton(page, 1).focus();
    await page.keyboard.press("Shift+Tab");
    await expect(additionalButton(page, 0)).toBeFocused();
    await page.keyboard.press("Shift+Tab");

    await expect(additionalButton(page, 0)).not.toBeVisible();
    await expect(splitToggleButton(page).first()).toBeFocused();
  });

  test(`should verify pressing ArrowUp moves focus to previous child button and does not loop when first child is focused`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoSplitButtons />);

    await splitToggleButton(page).nth(0).click();
    await additionalButton(page, 2).focus();
    await page.keyboard.press("ArrowUp");
    await expect(additionalButton(page, 1)).toBeFocused();
    await page.keyboard.press("ArrowUp");
    await expect(additionalButton(page, 0)).toBeFocused();
    await page.keyboard.press("ArrowUp");
    await expect(additionalButton(page, 0)).toBeFocused();
  });

  test(`should verify pressing metaKey + ArrowUp moves focus to first child button`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoSplitButtons />);

    await splitToggleButton(page).nth(0).click();
    await additionalButton(page, 2).focus();
    await page.keyboard.down("Meta");
    await page.keyboard.press("ArrowUp");
    await expect(additionalButton(page, 0)).toBeFocused();
  });

  test(`should verify pressing ctrlKey + ArrowUp moves focus to first child button`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoSplitButtons />);

    await splitToggleButton(page).nth(0).click();
    await additionalButton(page, 2).focus();
    await page.keyboard.down("Control");
    await page.keyboard.press("ArrowUp");
    await expect(additionalButton(page, 0)).toBeFocused();
  });

  test(`should verify pressing Home moves focus to first child button`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoSplitButtons />);

    await splitToggleButton(page).nth(0).click();
    await additionalButton(page, 2).focus();
    await page.keyboard.press("Home");
    await expect(additionalButton(page, 0)).toBeFocused();
  });

  test(`should verify pressing metaKey + ArrowDown moves focus to last child button`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoSplitButtons />);

    await splitToggleButton(page).nth(0).click();
    await page.keyboard.down("Meta");
    await page.keyboard.press("ArrowDown");
    await expect(additionalButton(page, 2)).toBeFocused();
  });

  test(`should verify pressing ctrlKey + ArrowDown moves focus to last child button`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoSplitButtons />);

    await splitToggleButton(page).nth(0).click();
    await page.keyboard.down("Control");
    await page.keyboard.press("ArrowDown");
    await expect(additionalButton(page, 2)).toBeFocused();
  });

  test(`should verify pressing End moves focus to last child button`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoSplitButtons />);

    await splitToggleButton(page).nth(0).click();
    await page.keyboard.press("End");
    await expect(additionalButton(page, 2)).toBeFocused();
  });

  test(`should verify clicking additional buttons closes SplitButton`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonList />);

    await splitToggleButton(page).nth(0).click();
    await additionalButton(page, 0).click();
    await expect(additionalButtonsContainer(page)).toHaveCount(0);
  });

  test(`should verify pressing Esc closes SplitButton`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonList />);

    await splitToggleButton(page).nth(0).click();
    await additionalButton(page, 1).focus();
    await page.keyboard.press("Escape");
    await expect(additionalButtonsContainer(page)).toHaveCount(0);
  });

  [...keyToTrigger].forEach((key) => {
    test(`should verify pressing ${key} on the main button opens list and focuses first button`, async ({
      mount,
      page,
    }) => {
      await mount(<SplitButtonList />);

      await splitToggleButton(page).nth(0).press(key);
      await expect(additionalButton(page, 0)).toBeFocused();
    });
  });
});

test.describe("Functional tests in a custom component", () => {
  test(`should verify clicking the toggle button opens the additional buttons`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWrapper />);

    await splitToggleButton(page).nth(0).click();
    const buttonList = page.getByRole("list");
    await buttonList.waitFor();
    await expect(additionalButton(page, 0)).toBeVisible();
    await expect(additionalButton(page, 1)).toBeVisible();
    await expect(additionalButton(page, 2)).toBeVisible();
  });

  test(`should verify pressing Tab moves focus to next child button, then closes the list and focuses the next element on the page`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoButtonsWithWrapper />);

    await splitToggleButton(page).nth(0).click();
    const buttonList = page.getByRole("list");
    await buttonList.waitFor();

    const firstButton = buttonList.getByRole("button").first();
    const secondButton = buttonList.getByRole("button").nth(1);
    const thirdButton = buttonList.getByRole("button").last();

    await expect(firstButton).toBeFocused();
    await firstButton.press("Tab");
    await expect(secondButton).toBeFocused();
    await secondButton.press("Tab");
    await expect(thirdButton).toBeFocused();
    await thirdButton.press("Tab");
    await expect(buttonList).toBeHidden();
    await expect(mainButton(page).nth(1)).toBeFocused();
  });

  test(`should verify pressing ArrowDown moves focus to next child button and should not loop when last child is focused`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoButtonsWithWrapper />);

    await splitToggleButton(page).nth(0).click();
    const buttonList = page.getByRole("list");
    await buttonList.waitFor();

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.waitForTimeout(1000);
    await expect(additionalButton(page, 2)).toBeFocused();
  });

  test(`should verify pressing Shift+Tab moves focus to previous child button, then closes the list and focuses the toggle button`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoButtonsWithWrapper />);

    await splitToggleButton(page).nth(0).click();
    const buttonList = page.getByRole("list");
    await buttonList.waitFor();

    await additionalButton(page, 1).focus();
    await page.keyboard.press("Shift+Tab", { delay: 1000 });
    await expect(additionalButton(page, 0)).toBeFocused();
    await page.keyboard.press("Shift+Tab", { delay: 1000 });

    await expect(additionalButton(page, 0)).not.toBeVisible();
    await expect(splitToggleButton(page).nth(0)).toBeFocused();
  });

  test(`should verify pressing ArrowUp moves focus to previous child button and does not loop when first child is focused`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoButtonsWithWrapper />);

    await splitToggleButton(page).nth(0).click();
    const buttonList = page.getByRole("list");
    await buttonList.waitFor();
    await additionalButton(page, 2).focus();

    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("ArrowUp");

    await expect(additionalButton(page, 0)).toBeFocused();
  });

  test(`should verify pressing metaKey + ArrowUp moves focus to first child button`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoButtonsWithWrapper />);

    await splitToggleButton(page).nth(0).click();
    const buttonList = page.getByRole("list");
    await buttonList.waitFor();
    await additionalButton(page, 2).focus();
    await page.keyboard.down("Meta");
    await page.keyboard.press("ArrowUp");
    await expect(additionalButton(page, 0)).toBeFocused();
  });

  test(`should verify pressing ctrlKey + ArrowUp moves focus to first child button`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoButtonsWithWrapper />);

    await splitToggleButton(page).nth(0).click();
    const buttonList = page.getByRole("list");
    await buttonList.waitFor();
    await additionalButton(page, 2).focus();
    await page.keyboard.down("Control");
    await page.keyboard.press("ArrowUp");
    await expect(additionalButton(page, 0)).toBeFocused();
  });

  test(`should verify pressing Home moves focus to first child button`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoButtonsWithWrapper />);

    await splitToggleButton(page).nth(0).click();
    await additionalButton(page, 2).focus();
    await page.keyboard.press("Home");
    await expect(additionalButton(page, 0)).toBeFocused();
  });

  test(`should verify pressing metaKey + ArrowDown moves focus to last child button`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoButtonsWithWrapper />);

    await splitToggleButton(page).nth(0).click();

    await page.keyboard.down("Meta");
    await page.keyboard.press("ArrowDown");
    await expect(additionalButton(page, 2)).toBeFocused();
  });

  test(`should verify pressing ctrlKey + ArrowDown moves focus to last child button`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoButtonsWithWrapper />);

    await splitToggleButton(page).nth(0).click();
    await page.keyboard.down("Control");
    await page.keyboard.press("ArrowDown");
    await expect(additionalButton(page, 2)).toBeFocused();
  });

  test(`should verify pressing End moves focus to last child button`, async ({
    mount,
    page,
  }) => {
    await mount(<TwoButtonsWithWrapper />);

    await splitToggleButton(page).nth(0).click();
    await page.keyboard.press("End");
    await expect(additionalButton(page, 2)).toBeFocused();
  });

  test(`should verify clicking additional buttons closes SplitButton`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWrapper />);

    await splitToggleButton(page).nth(0).click();

    await additionalButton(page, 0).click();
    await expect(additionalButtonsContainer(page)).toHaveCount(0);
  });

  test(`should verify pressing Esc closes SplitButton`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWrapper />);

    await splitToggleButton(page).nth(0).click();
    const buttonList = page.getByRole("list");
    await buttonList.waitFor();
    await additionalButton(page, 1).focus();
    await page.keyboard.press("Escape");
    await expect(additionalButtonsContainer(page)).toHaveCount(0);
  });
});

test.describe("when SplitButton is nested inside of a Dialog component", () => {
  test(`should not close the Dialog when SplitButton is closed by pressing an escape key`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonNestedInDialog />);

    await splitToggleButton(page).nth(0).click();
    await expect(additionalButtonsContainer(page)).toHaveCount(1);
    await additionalButton(page, 1).focus();
    await page.keyboard.press("Escape");
    await expect(additionalButtonsContainer(page)).toHaveCount(0);
    await expect(alertDialogPreview(page)).toHaveCount(1);
    await page.keyboard.press("Escape");
    await expect(alertDialogPreview(page)).toHaveCount(0);
  });
});

test.describe("Accessibility tests", () => {
  test(`should pass accessibility tests for default example`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonList />);

    await checkAccessibility(page);
  });

  // TODO: test passes even when it shouldn't, see FE-6267
  test.skip(`should pass accessibility tests when open`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonList />);

    await splitToggleButton(page).nth(0).press("ArrowDown");
    await checkAccessibility(page);
  });

  test(`should pass accessibility tests when the additional buttons are opened`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonList />);

    await splitToggleButton(page).nth(0).click();
    await checkAccessibility(page);
  });

  test(`should pass accessibility tests when disabled`, async ({
    mount,
    page,
  }) => {
    await mount(<SplitButtonList disabled />);

    await checkAccessibility(page);
  });

  (["primary", "secondary"] as SplitButtonProps["buttonType"][]).forEach(
    (buttonType) => {
      test(`should pass accessibility tests for ${buttonType} button`, async ({
        mount,
        page,
      }) => {
        await mount(<SplitButtonList buttonType={buttonType} />);

        await checkAccessibility(page);
      });
    },
  );

  (["primary", "secondary"] as SplitButtonProps["buttonType"][]).forEach(
    (buttonType) => {
      test(`should pass accessibility tests for ${buttonType} button type when open`, async ({
        mount,
        page,
      }) => {
        await mount(<SplitButtonList buttonType={buttonType} />);

        await splitToggleButton(page).nth(0).click();
        await checkAccessibility(page);
      });
    },
  );

  (["primary", "secondary"] as SplitButtonProps["buttonType"][]).forEach(
    (buttonType) => {
      test(`should pass accessibility tests when hovering on ${buttonType} button`, async ({
        mount,
        page,
      }) => {
        await mount(<SplitButtonList buttonType={buttonType} />);

        await splitMainButtonDataComponent(page, 0).click();

        await checkAccessibility(page);
      });
    },
  );

  (["primary", "secondary"] as SplitButtonProps["buttonType"][]).forEach(
    (buttonType) => {
      test(`should pass accessibility tests with ${buttonType} button type hovered`, async ({
        mount,
        page,
      }) => {
        await mount(<SplitButtonList buttonType={buttonType} />);

        await splitToggleButton(page).nth(0).hover();

        await checkAccessibility(page);
      });
    },
  );

  (["small", "medium", "large"] as SplitButtonProps["size"][]).forEach(
    (size) => {
      test(`should pass accessibility tests with Sizes prop set to ${size}`, async ({
        mount,
        page,
      }) => {
        await mount(<SplitButtonList size={size} />);

        await checkAccessibility(page);
      });
    },
  );

  (["left", "right"] as SplitButtonProps["align"][]).forEach((alignment) => {
    test(`should pass accessibility tests with Align prop set to ${alignment}`, async ({
      mount,
      page,
    }) => {
      await mount(<SplitButtonList align={alignment} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((subtext) => {
    test(`should pass accessibility tests with Subtext prop set to ${subtext}`, async ({
      mount,
      page,
    }) => {
      await mount(<SplitButtonList size="large" subtext={subtext} />);

      await checkAccessibility(page);
    });
  });

  (["after", "before"] as SplitButtonProps["iconPosition"][]).forEach(
    (iconPosition) => {
      test(`should pass accessibility tests with iconPosition prop set to ${iconPosition}`, async ({
        mount,
        page,
      }) => {
        await mount(
          <SplitButtonList iconType="add" iconPosition={iconPosition}>
            IconPosition
          </SplitButtonList>,
        );

        await checkAccessibility(page);
      });
    },
  );

  test(`should pass accessibility tests for component in hidden container`, async ({
    mount,
    page,
  }) => {
    await mount(
      <Accordion title="Heading">
        <Box p={4}>
          <SplitButton size="large" subtext="subtext" text="Split button">
            <Button size="large">Button 1</Button>
            <Button size="large">Button 2</Button>
            <Button size="large">Button 3</Button>
          </SplitButton>
        </Box>
      </Accordion>,
    );

    await accordionDefaultTitle(page).click();
    await splitToggleButton(page).nth(0).click();

    await checkAccessibility(page);
  });
});

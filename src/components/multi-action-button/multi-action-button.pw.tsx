import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";
import { MultiActionButtonProps } from "components/multi-action-button";
import {
  MultiActionButtonList,
  MultiActionButtonWithOneChild,
  MultiActionNestedInDialog,
  MultiActionWithHrefChildren,
  WithWrapper,
  MultiActionTwoButtons,
  WithWrapperTwoButtons,
  InOverflowHiddenContainer,
  ChildButtonTypes,
} from "./components.test-pw";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
} from "../../../playwright/support/helper";
import { SIZE, CHARACTERS } from "../../../playwright/support/constants";
import {
  getComponent,
  getDataElementByValue,
} from "../../../playwright/components";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS] as const;
const keysToTrigger = ["Enter", "Space", "ArrowDown"] as const;

test.describe("Prop tests", () => {
  testData.forEach((text) => {
    test(`should render with ${text} as button text`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiActionButtonList text={text} />);

      await expect(getDataElementByValue(page, "main-text")).toHaveText(text);
    });
  });

  test(`should render with data-element`, async ({ mount, page }) => {
    await mount(
      <MultiActionButtonList data-element="multi-action-button-playwright-element" />,
    );

    await expect(getComponent(page, "multi-action-button")).toHaveAttribute(
      "data-element",
      "multi-action-button-playwright-element",
    );
  });

  test(`should render with data-role`, async ({ mount, page }) => {
    await mount(
      <MultiActionButtonList data-role="multi-action-button-playwright-role" />,
    );

    await expect(getComponent(page, "multi-action-button")).toHaveAttribute(
      "data-role",
      "multi-action-button-playwright-role",
    );
  });

  testData.forEach((subtext) => {
    test(`should render with ${subtext} as subtext`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiActionButtonList size="large" subtext={subtext} />);

      await expect(getDataElementByValue(page, "subtext")).toHaveText(subtext);
    });
  });

  (
    [
      [SIZE.SMALL, 32],
      [SIZE.MEDIUM, 40],
      [SIZE.LARGE, 48],
    ] as [MultiActionButtonProps["size"], number][]
  ).forEach(([size, height]) => {
    test(`should render with ${size} size`, async ({ mount, page }) => {
      await mount(<MultiActionButtonList size={size} />);

      const actionButton = getComponent(page, "multi-action-button");
      await assertCssValueIsApproximately(actionButton, "height", height);
    });
  });

  (["left", "right"] as MultiActionButtonProps["align"][]).forEach(
    (alignment) => {
      test(`should render with button text aligned to the ${alignment}`, async ({
        mount,
        page,
      }) => {
        await mount(<MultiActionButtonList align={alignment} />);

        const actionButton = getComponent(page, "multi-action-button");
        await actionButton.click();
        await expect(
          getDataElementByValue(page, "additional-buttons")
            .getByRole("button")
            .first(),
        ).toHaveCSS("justify-content", alignment as string);
      });
    },
  );

  (
    [
      ["left", 198],
      ["right", 152],
    ] as [MultiActionButtonProps["position"], number][]
  ).forEach(([position, value]) => {
    test(`should render with menu position to the ${position}`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiActionButtonList ml="200px" position={position} />);

      const actionButton = getComponent(page, "multi-action-button");
      await actionButton.click();
      const listContainer = getDataElementByValue(page, "additional-buttons");
      await expect(listContainer).toHaveCSS("position", "fixed");
      await assertCssValueIsApproximately(listContainer, "top", 46);
      await assertCssValueIsApproximately(listContainer, "left", value);
    });
  });

  test(`should render with button disabled`, async ({ mount, page }) => {
    await mount(<MultiActionButtonList disabled />);

    await expect(page.getByRole("button").first()).toBeDisabled();
  });

  test(`should render with specific background colour when hovering`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    const actionButton = getComponent(page, "multi-action-button").locator(
      "button",
    );
    await actionButton.hover();
    await expect(actionButton).toHaveCSS("background-color", "rgb(0, 103, 56)");
  });

  test(`should render component with justify-content as 'space-between' when width prop is passed`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList width="70%" />);

    const actionButton = getComponent(page, "multi-action-button").locator(
      "button",
    );
    await actionButton.hover();
    await expect(actionButton).toHaveCSS("justify-content", "space-between");
  });

  test(`should render component with specified width when width prop is passed`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList width="70%" />);

    const actionButton = getComponent(page, "multi-action-button").locator(
      "button",
    );
    await actionButton.hover();
    await assertCssValueIsApproximately(actionButton, "width", 956);
  });

  (
    [
      ["primary", "rgb(0, 126, 69)", "rgb(255, 255, 255)", "rgba(0, 0, 0, 0)"],
      ["secondary", "rgba(0, 0, 0, 0)", "rgb(0, 126, 69)", "rgb(0, 126, 69)"],
      ["tertiary", "rgba(0, 0, 0, 0)", "rgb(0, 126, 69)", "rgba(0, 0, 0, 0)"],
    ] as [MultiActionButtonProps["buttonType"], string, string, string][]
  ).forEach(([buttonType, backgroundColor, color, borderColor]) => {
    test(`should render ${buttonType} component with ${backgroundColor} background color, ${color} color and ${borderColor} border color`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiActionButtonList buttonType={buttonType} />);

      const actionButton = page.getByRole("button");
      await expect(actionButton).toHaveCSS("background-color", backgroundColor);
      await expect(actionButton).toHaveCSS("color", color);
      await expect(actionButton).toHaveCSS("border-color", borderColor);
    });
  });
});

test.describe("Functional tests", () => {
  test(`should verify that clicking the main button opens the additional buttons and focuses the first button`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    await getComponent(page, "multi-action-button")
      .first()
      .locator("button")
      .click();
    const additionalButtons = getDataElementByValue(page, "additional-buttons");

    await expect(additionalButtons).toBeVisible();
    await expect(additionalButtons.getByRole("button").first()).toBeFocused();
  });

  [...keysToTrigger].forEach((key) => {
    test(`should verify pressing ${key} key on the main button opens MultiActionButton list and focuses first button`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiActionButtonList />);

      const actionButton = getComponent(page, "multi-action-button").locator(
        "button",
      );
      await actionButton.focus();
      await page.keyboard.press(key);
      const additionalButtons = getDataElementByValue(
        page,
        "additional-buttons",
      );

      await expect(additionalButtons).toBeVisible();
      await expect(additionalButtons.getByRole("button").first()).toBeFocused();
    });
  });

  test(`should verify dialog is not closed by pressing Esc key when nest inside of a Dialog`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionNestedInDialog />);

    const actionButton = getComponent(page, "multi-action-button").locator(
      "button",
    );
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .locator("span > span")
      .nth(0);
    await expect(listButton1).toHaveCount(1);
    await page.keyboard.press("Escape");
    await expect(listButton1).toHaveCount(0);
    const dialog = page.getByRole("dialog");
    await expect(dialog).toHaveCount(1);
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  });

  test(`should verify pressing ArrowUp key does not loop focus to bottom`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    const actionButton = getComponent(page, "multi-action-button")
      .first()
      .locator("button");
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    await page.keyboard.press("ArrowUp");
    await expect(listButton1).toBeFocused();
    await page.keyboard.press("ArrowUp");
    await expect(listButton1).toBeFocused();
    await page.keyboard.press("ArrowUp");
    await expect(listButton1).toBeFocused();
  });

  test(`should verify pressing Shift+Tab moves focus to previous child button, then the main button and closes the list`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    const actionButton = getComponent(page, "multi-action-button")
      .first()
      .locator("button");
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton2 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(1);

    await listButton2.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(listButton1).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(
      getComponent(page, "multi-action-button").locator("button"),
    ).toBeFocused();
    await expect(listButton1).not.toBeVisible();
    await expect(listButton2).not.toBeVisible();
  });

  test(`should verify pressing ArrowDown key does not loop focus to top`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    const actionButton = getComponent(page, "multi-action-button")
      .first()
      .locator("button");
    await actionButton.click();
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await listButton3.focus();
    await page.keyboard.press("ArrowDown");
    await expect(listButton3).toBeFocused();
  });

  test(`should verify pressing Tab moves focus to next child button, then closes the list and focuses the next element on the page`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionTwoButtons />);

    const actionButton = getComponent(page, "multi-action-button")
      .first()
      .locator("button");
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton2 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(1);
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await expect(listButton1).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(listButton2).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(listButton3).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(
      getComponent(page, "multi-action-button").nth(1).locator("button"),
    ).toBeFocused();
    await expect(listButton1).not.toBeVisible();
    await expect(listButton2).not.toBeVisible();
    await expect(listButton3).not.toBeVisible();
  });

  test(`should verify that pressing metaKey + ArrowUp moves focus to first child button`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    const actionButton = getComponent(page, "multi-action-button")
      .first()
      .locator("button");
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await listButton3.focus();
    await page.keyboard.down("Meta");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.up("Meta");
    await expect(listButton1).toBeFocused();
  });

  test(`should verify that pressing ctrlKey + ArrowUp moves focus to first child button`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    const actionButton = getComponent(page, "multi-action-button")
      .first()
      .locator("button");
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await listButton3.focus();
    await page.keyboard.down("Control");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.up("Control");
    await expect(listButton1).toBeFocused();
  });

  test(`should verify that pressing Home key moves focus to first child button`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    const actionButton = getComponent(page, "multi-action-button")
      .first()
      .locator("button");
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await listButton3.focus();
    await page.keyboard.press("Home");
    await expect(listButton1).toBeFocused();
  });

  test(`should verify that pressing metaKey + ArrowDown moves focus to last child button`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    const actionButton = getComponent(page, "multi-action-button")
      .first()
      .locator("button");
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await expect(listButton1).toBeFocused();
    await page.keyboard.down("Meta");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.up("Meta");
    await expect(listButton3).toBeFocused();
  });

  test(`should verify that pressing ctrlKey + ArrowDown moves focus to last child button`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    const actionButton = getComponent(page, "multi-action-button")
      .first()
      .locator("button");
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await expect(listButton1).toBeFocused();
    await page.keyboard.down("Control");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.up("Control");
    await expect(listButton3).toBeFocused();
  });

  test(`should verify that pressing End key moves focus to last child button`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    const actionButton = getComponent(page, "multi-action-button")
      .first()
      .locator("button");
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await expect(listButton1).toBeFocused();
    await page.keyboard.press("End");
    await expect(listButton3).toBeFocused();
  });

  test(`should verify that pressing Esc key closes MultiActionButton`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    const actionButton = getComponent(page, "multi-action-button")
      .first()
      .locator("button");
    await actionButton.click();
    await expect(getDataElementByValue(page, "additional-buttons")).toHaveCount(
      1,
    );
    await page.keyboard.press("Escape");
    await expect(getDataElementByValue(page, "additional-buttons")).toHaveCount(
      0,
    );
  });

  test(`should verify that clicking one of the child buttons closes MultiActionButton`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    await getComponent(page, "multi-action-button")
      .first()
      .locator("button")
      .click();
    await expect(getDataElementByValue(page, "additional-buttons")).toHaveCount(
      1,
    );
    await getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0)
      .click();
    await expect(getDataElementByValue(page, "additional-buttons")).toHaveCount(
      0,
    );
  });
});

test.describe("Functional tests with child buttons wrapped in a custom component", () => {
  test(`should verify pressing ArrowUp key does not loop focus to bottom`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWrapper />);

    const actionButton = getComponent(page, "multi-action-button")
      .locator("button")
      .first();
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);

    await page.keyboard.press("ArrowUp");
    await expect(listButton1).toBeFocused();
    await page.keyboard.press("ArrowUp");
    await expect(listButton1).toBeFocused();
    await page.keyboard.press("ArrowUp");
    await expect(listButton1).toBeFocused();
  });

  test(`should verify pressing Shift+Tab moves focus to previous child button, then the main button and closes the list`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWrapper />);

    const actionButton = getComponent(page, "multi-action-button")
      .first()
      .locator("button");
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton2 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(1);

    await listButton2.focus();
    await page.keyboard.press("Shift+Tab");
    await expect(listButton1).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(
      getComponent(page, "multi-action-button").locator("button"),
    ).toBeFocused();
    await expect(listButton1).not.toBeVisible();
    await expect(listButton2).not.toBeVisible();
  });

  test(`should verify pressing ArrowDown key does not loop focus to top`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWrapper />);

    const actionButton = getComponent(page, "multi-action-button")
      .locator("button")
      .first();
    await actionButton.click();
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await listButton3.focus();
    await page.keyboard.press("ArrowDown");
    await expect(listButton3).toBeFocused();
  });

  test(`should verify pressing Tab moves focus to next child button, then closes the list and focuses the next element on the page`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWrapperTwoButtons />);

    const actionButton = getComponent(page, "multi-action-button")
      .first()
      .locator("button");
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton2 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(1);
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await expect(listButton1).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(listButton2).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(listButton3).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(
      getComponent(page, "multi-action-button").nth(1).locator("button"),
    ).toBeFocused();
    await expect(listButton1).not.toBeVisible();
    await expect(listButton2).not.toBeVisible();
    await expect(listButton3).not.toBeVisible();
  });

  test(`should verify that pressing metaKey + ArrowUp moves focus to first child button`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWrapper />);

    const actionButton = getComponent(page, "multi-action-button")
      .locator("button")
      .first();
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await listButton3.focus();
    await page.keyboard.down("Meta");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.up("Meta");
    await expect(listButton1).toBeFocused();
  });

  test(`should verify that pressing ctrlKey + ArrowUp moves focus to first child button`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWrapper />);

    const actionButtonComp = getComponent(page, "multi-action-button")
      .locator("button")
      .first();
    await actionButtonComp.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await listButton3.focus();
    await page.keyboard.down("Control");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.up("Control");
    await expect(listButton1).toBeFocused();
  });

  test(`should verify that pressing Home key moves focus to first child button`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWrapper />);

    const actionButton = getComponent(page, "multi-action-button")
      .locator("button")
      .first();
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await listButton3.focus();
    await page.keyboard.press("Home");
    await expect(listButton1).toBeFocused();
  });

  test(`should verify that pressing metaKey + ArrowDown moves focus to last child button`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWrapper />);

    const actionButton = getComponent(page, "multi-action-button")
      .locator("button")
      .first();
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await expect(listButton1).toBeFocused();
    await page.keyboard.down("Meta");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.up("Meta");
    await expect(listButton3).toBeFocused();
  });

  test(`should verify that pressing ctrlKey + ArrowDown moves focus to last child button`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWrapper />);

    const actionButton = getComponent(page, "multi-action-button")
      .locator("button")
      .first();
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await expect(listButton1).toBeFocused();
    await page.keyboard.down("Control");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.up("Control");
    await expect(listButton3).toBeFocused();
  });

  test(`should verify that pressing End key moves focus to last child button`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWrapper />);

    const actionButton = getComponent(page, "multi-action-button")
      .locator("button")
      .first();
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);

    await expect(listButton1).toBeFocused();
    await page.keyboard.press("End");
    await expect(listButton3).toBeFocused();
  });

  test(`should verify that pressing Esc key closes MultiActionButton`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWrapper />);

    const actionButton = getComponent(page, "multi-action-button")
      .locator("button")
      .first();
    await actionButton.click();
    await expect(getDataElementByValue(page, "additional-buttons")).toHaveCount(
      1,
    );
    await page.keyboard.press("Escape");
    await expect(getDataElementByValue(page, "additional-buttons")).toHaveCount(
      0,
    );
  });

  test(`should verify that clicking one of the child buttons closes MultiActionButton`, async ({
    mount,
    page,
  }) => {
    await mount(<WithWrapper />);

    await getComponent(page, "multi-action-button")
      .locator("button")
      .first()
      .click();
    await expect(getDataElementByValue(page, "additional-buttons")).toHaveCount(
      1,
    );
    await getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0)
      .click();
    await expect(getDataElementByValue(page, "additional-buttons")).toHaveCount(
      0,
    );
  });
});

test.describe("Accessibility tests", () => {
  test(`should pass tests for default component`, async ({ mount, page }) => {
    await mount(<MultiActionButtonList />);

    await checkAccessibility(page);
  });

  // TODO: test passes even when it shouldn't, see FE-6267
  test(`should pass tests when open`, async ({ mount, page }) => {
    await mount(<MultiActionButtonList />);

    await page.getByRole("button").focus();
    await page.keyboard.press("Enter");

    await checkAccessibility(page);
  });

  test(`should pass tests with disabled prop set`, async ({ mount, page }) => {
    await mount(<MultiActionButtonList disabled />);

    await checkAccessibility(page);
  });

  (
    [SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE] as MultiActionButtonProps["size"][]
  ).forEach((size) => {
    test(`should pass tests with size prop set to ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiActionButtonList size={size} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass tests with width prop set`, async ({ mount, page }) => {
    await mount(<MultiActionButtonList width="70%" />);

    await checkAccessibility(page);
  });

  (
    [
      "primary",
      "secondary",
      "tertiary",
    ] as MultiActionButtonProps["buttonType"][]
  ).forEach((type) => {
    test(`should pass tests with buttonType prop set as ${type}`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiActionButtonList buttonType={type} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass tests for ChildButtonTypes example`, async ({
    mount,
    page,
  }) => {
    await mount(<ChildButtonTypes />);

    await page.getByRole("button").click();
    await checkAccessibility(page);
  });

  (["left", "right"] as MultiActionButtonProps["align"][]).forEach(
    (alignment) => {
      test(`should pass tests with align prop set to ${alignment}`, async ({
        mount,
        page,
      }) => {
        await mount(<MultiActionButtonList align={alignment} />);

        await page.getByRole("button").click();
        await checkAccessibility(page);
      });
    },
  );

  testData.forEach((subtext) => {
    test(`should pass tests with subtext prop set as ${subtext}`, async ({
      mount,
      page,
    }) => {
      await mount(<MultiActionButtonList size="large" subtext={subtext} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass tests with InOverflowHiddenContainer story`, async ({
    mount,
    page,
  }) => {
    await mount(<InOverflowHiddenContainer />);

    await getDataElementByValue(page, "accordion-title-container").click();
    await getComponent(page, "multi-action-button").locator("button").click();
    await checkAccessibility(page);
  });
});

test.describe("Focus outline and border radius tests for MultiActionButton", () => {
  test(`should render with the expected border radius on main button`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    const actionButton = page.getByRole("button");
    await expect(actionButton).toHaveCSS("border-radius", "32px");
  });

  test(`should render with the expected border radius on children container and buttons`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    const actionButton = page.getByRole("button");
    await actionButton.click();
    const listContainer = getDataElementByValue(page, "additional-buttons");
    await expect(listContainer).toHaveCSS("border-radius", "8px");
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    const listButton2 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(1);
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(2);
    await expect(listButton1).toHaveCSS("border-radius", "8px 8px 0px 0px");
    await expect(listButton2).toHaveCSS("border-radius", "0px");
    await expect(listButton3).toHaveCSS("border-radius", "0px 0px 8px 8px");
  });

  test(`should render with the expected border radius when some children buttons have href prop`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionWithHrefChildren />);

    const actionButton = page.getByRole("button");
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("listitem")
      .nth(0)
      .locator("> *")
      .first();
    const listButton2 = getDataElementByValue(page, "additional-buttons")
      .getByRole("listitem")
      .nth(1)
      .locator("> *")
      .first();
    const listButton3 = getDataElementByValue(page, "additional-buttons")
      .getByRole("listitem")
      .nth(2)
      .locator("> *")
      .first();
    await expect(listButton1).toHaveCSS("border-radius", "8px 8px 0px 0px");
    await expect(listButton2).toHaveCSS("border-radius", "0px");
    await expect(listButton3).toHaveCSS("border-radius", "0px 0px 8px 8px");
  });

  test(`should render with the expected border radius when there is only on one child button`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonWithOneChild />);

    const actionButton = page.getByRole("button");
    await actionButton.click();
    const listButton1 = getDataElementByValue(page, "additional-buttons")
      .getByRole("button")
      .nth(0);
    await expect(listButton1).toHaveCSS("border-radius", "8px");
  });

  test(`should render with the expected focus styling`, async ({
    mount,
    page,
  }) => {
    await mount(<MultiActionButtonList />);

    const actionButton = page.getByRole("button");
    await actionButton.focus();
    await expect(actionButton).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
  });
});

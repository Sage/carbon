import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  VerticalMenuDefaultComponent,
  VerticalMenuItemCustom,
  VerticalMenuTriggerCustom,
  VerticalMenuItemCustomHref,
  VerticalMenuFullScreenCustom,
  VerticalMenuFullScreenCustomWithDialog,
  VerticalMenuFullScreenBackgroundScrollTest,
  ClosedVerticalMenuFullScreenWithButtons,
  CustomComponent,
  Adornment,
  CustomItemPadding,
  CustomItemHeight,
} from "./components.test-pw";
import VerticalMenuTrigger from "./vertical-menu-trigger/vertical-menu-trigger.component";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
  waitForAnimationEnd,
} from "../../../playwright/support/helper";
import {
  verticalMenuComponent,
  verticalMenuItem,
  verticalMenuTrigger,
  verticalMenuFullScreen,
} from "../../../playwright/components/vertical-menu";
import { closeIconButton } from "../../../playwright/components/index";
import { CHARACTERS } from "../../../playwright/support/constants";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const testData = CHARACTERS.STANDARD;
const keysToTrigger = ["Space", "Enter"] as const;

test.describe("should render Vertical Menu component", () => {
  test(`should render with aria-label prop set to playwright-standard`, async ({
    mount,
    page,
  }) => {
    await mount(
      <VerticalMenuDefaultComponent aria-label={CHARACTERS.STANDARD} />,
    );

    await expect(verticalMenuComponent(page)).toHaveAttribute(
      "aria-label",
      CHARACTERS.STANDARD,
    );
  });

  test(`should render with aria-labelledby prop set to playwright-standard`, async ({
    mount,
    page,
  }) => {
    await mount(
      <VerticalMenuDefaultComponent aria-labelledby={CHARACTERS.STANDARD} />,
    );

    await expect(verticalMenuComponent(page)).toHaveAttribute(
      "aria-labelledby",
      CHARACTERS.STANDARD,
    );
  });

  [200, 350, 632].forEach((width) => {
    test(`should render with width of ${width}`, async ({ mount, page }) => {
      await mount(<VerticalMenuDefaultComponent width={`${width}px`} />);

      await assertCssValueIsApproximately(
        verticalMenuComponent(page),
        "width",
        width,
      );
    });
  });

  (
    [
      ["30%", 230],
      ["45%", 345],
      ["95%", 729],
    ] as const
  ).forEach(([height, heightInPx]) => {
    test(`should render with height if ${height}`, async ({ mount, page }) => {
      await mount(<VerticalMenuDefaultComponent height={height} />);

      await expect(verticalMenuComponent(page)).toHaveAttribute(
        "height",
        height,
      );
      await assertCssValueIsApproximately(
        verticalMenuComponent(page),
        "height",
        heightInPx,
      );
    });
  });

  specialCharacters.forEach((title) => {
    test(`should render with ${title} as title`, async ({ mount, page }) => {
      await mount(<VerticalMenuItemCustom title={title} />);

      await expect(verticalMenuItem(page).locator("h3").first()).toHaveText(
        title,
      );
    });
  });

  test(`should render with adornment prop`, async ({ mount, page }) => {
    await mount(<VerticalMenuItemCustom />);

    const pill1 = verticalMenuItem(page).nth(0).locator("div > span");
    await expect(pill1).toHaveAttribute("data-component", "pill");
    await expect(pill1).toBeVisible();

    await verticalMenuItem(page).first().click();

    const pill2 = verticalMenuItem(page).nth(1).locator("div > span");
    await expect(pill2).toHaveAttribute("data-component", "pill");
    await expect(pill2).toBeVisible();
    await expect(pill1).toHaveCount(0);

    await verticalMenuItem(page).first().click();
    await expect(pill1).toHaveAttribute("data-component", "pill");
    await expect(pill1).toBeVisible();
    await expect(pill2).toHaveCount(0);
  });

  test(`should render with iconType prop`, async ({ mount, page }) => {
    await mount(<VerticalMenuItemCustom iconType="filter" />);

    const filter = verticalMenuItem(page).first().locator("span").first();

    await expect(filter).toHaveAttribute("data-element", "filter");
    await expect(filter).toBeVisible();
  });

  test(`should render with active prop`, async ({ mount, page }) => {
    await mount(<VerticalMenuItemCustom />);

    const backgroundColor = await page.evaluate(() => {
      const menuItem = document.querySelector(
        `[data-component="vertical-menu-item"]`,
      );
      if (!menuItem) {
        return null;
      }
      const beforePseudoElement = window.getComputedStyle(menuItem, "::before");
      return beforePseudoElement ? beforePseudoElement.backgroundColor : null;
    });

    expect(backgroundColor).toBe("rgba(255, 255, 255, 0.3)");
  });

  ["27px", "59px", "77px"].forEach((height) => {
    test(`should render with height of ${height}`, async ({ mount, page }) => {
      await mount(<VerticalMenuItemCustom height={height} />);

      await expect(verticalMenuItem(page)).toHaveCSS("min-height", height);
    });
  });

  test(`should render active component with expected border radius styling`, async ({
    mount,
    page,
  }) => {
    await mount(<VerticalMenuItemCustom active />);

    const borderRadius = await page.evaluate(() => {
      const menuItem = document.querySelector(
        `[data-component="vertical-menu-item"]`,
      );
      if (!menuItem) {
        return null;
      }
      const beforePseudoElement = window.getComputedStyle(menuItem, "::before");
      return beforePseudoElement ? beforePseudoElement.borderRadius : null;
    });

    expect(borderRadius).toBe("8px");
  });

  test(`should render without href prop`, async ({ mount, page }) => {
    await mount(<VerticalMenuItemCustomHref />);

    await verticalMenuItem(page).click();

    await expect(
      verticalMenuItem(page).nth(1).locator("..").locator("div").first(),
    ).toBeVisible();
  });

  test(`should render with href prop`, async ({ mount, page }) => {
    await mount(<VerticalMenuItemCustomHref href={testData} />);

    await verticalMenuItem(page).click();

    await expect(
      verticalMenuItem(page).nth(1).locator("..").locator("a").first(),
    ).toBeVisible();
  });

  test(`should render Vertical Menu Item with href prop in Vertical Menu`, async ({
    mount,
    page,
  }) => {
    await mount(<CustomComponent />);

    const item = verticalMenuComponent(page).locator("li").locator("a");

    await expect(item).toHaveAttribute("href", "/item-1");
    await expect(item).toBeVisible();
  });

  [true, false].forEach((open) => {
    test(`should render defaultOpen prop set to ${open}`, async ({
      mount,
      page,
    }) => {
      await mount(<VerticalMenuItemCustom defaultOpen={open} />);

      const menuItem1 = verticalMenuItem(page)
        .locator("h3")
        .filter({ hasText: "ChildItem 1" });
      const menuItem2 = verticalMenuItem(page)
        .locator("h3")
        .filter({ hasText: "ChildItem 2" });

      if (open) {
        await expect(menuItem1).toBeVisible();
        await expect(menuItem2).toBeVisible();
      } else {
        await expect(menuItem1).toHaveCount(0);
        await expect(menuItem2).toHaveCount(0);
      }
    });
  });
});

test.describe("with beforeEach for VerticalMenuFullScreen", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 599,
    });
  });

  test(`should render with aria-label prop set to playwright-standard`, async ({
    mount,
    page,
  }) => {
    await mount(
      <VerticalMenuFullScreenCustom aria-label={CHARACTERS.STANDARD} />,
    );

    await verticalMenuTrigger(page).click();

    await expect(verticalMenuFullScreen(page)).toHaveAttribute(
      "aria-label",
      CHARACTERS.STANDARD,
    );
  });

  test(`should render with aria-labelledby prop set to playwright-standard`, async ({
    mount,
    page,
  }) => {
    await mount(
      <VerticalMenuFullScreenCustom aria-labelledby={CHARACTERS.STANDARD} />,
    );

    await verticalMenuTrigger(page).click();

    await expect(verticalMenuFullScreen(page)).toHaveAttribute(
      "aria-labelledby",
      CHARACTERS.STANDARD,
    );
  });

  test(`should close the Vertical Menu Full Screen when escape key is pressed`, async ({
    mount,
    page,
  }) => {
    await mount(<VerticalMenuFullScreenCustom />);

    await verticalMenuTrigger(page).click();
    const verticalMenu = verticalMenuFullScreen(page);
    await verticalMenu.waitFor();

    await page.keyboard.press("Escape");

    await expect(verticalMenu).not.toBeVisible();
  });

  test(`should render Vertical Menu Full Screen with isOpen prop`, async ({
    mount,
    page,
  }) => {
    await mount(<VerticalMenuFullScreenCustom isOpen />);

    await expect(verticalMenuItem(page).first()).toBeVisible();
  });

  test("when a Vertical Menu Fullscreen is opened and then closed, the call to action element should be focused", async ({
    mount,
    page,
  }) => {
    await mount(<VerticalMenuFullScreenCustom />);

    const item = page.getByRole("button").filter({ hasText: "Menu" });
    await item.click();
    await waitForAnimationEnd(verticalMenuFullScreen(page));
    const closeButton = page.getByLabel("Close");
    await closeButton.click();
    await expect(item).toBeFocused();
  });

  test("when Vertical Menu Fullscreen is open on render, then closed, opened and then closed again, the call to action element should be focused", async ({
    mount,
    page,
  }) => {
    await mount(<VerticalMenuFullScreenCustom isOpen />);

    await waitForAnimationEnd(verticalMenuFullScreen(page));
    await expect(verticalMenuFullScreen(page)).toBeVisible();
    const closeButton = page.getByLabel("Close");
    await closeButton.click();

    const item = page.getByRole("button").filter({ hasText: "Menu" });
    await expect(item).not.toBeFocused();
    await expect(verticalMenuFullScreen(page)).not.toBeVisible();

    await item.click();
    await waitForAnimationEnd(verticalMenuFullScreen(page));
    await expect(verticalMenuFullScreen(page)).toBeVisible();
    await closeButton.click();
    await expect(item).toBeFocused();
  });

  test(`should verify that Vertical Menu Fullscreen has no effect on the tab order when isOpen prop is false`, async ({
    mount,
    page,
  }) => {
    await mount(<ClosedVerticalMenuFullScreenWithButtons />);

    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("button").filter({ hasText: "Button 1" }),
    ).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("button").filter({ hasText: "Button 2" }),
    ).toBeFocused();
  });

  test(`should return focus to Vertical Menu Full Screen close button with tabbing`, async ({
    mount,
    page,
  }) => {
    await mount(<VerticalMenuFullScreenCustom isOpen />);

    await expect(verticalMenuItem(page).first()).toBeVisible();
    await verticalMenuFullScreen(page).locator("div").nth(0).click();
    await verticalMenuFullScreen(page).press("Tab");
    await expect(closeIconButton(page)).toBeFocused();
  });

  ["25px", "55px", "77px"].forEach((height) => {
    test(`should render component trigger with height prop set to ${height}`, async ({
      mount,
      page,
    }) => {
      await mount(<VerticalMenuTriggerCustom height={height} />);

      const trigger = verticalMenuTrigger(page);

      await expect(trigger).toHaveAttribute("height", height);
      await expect(trigger).toHaveCSS("min-height", height);
    });
  });

  test(`should render children prop set to playwright_test`, async ({
    mount,
    page,
  }) => {
    await mount(
      <VerticalMenuTrigger onClick={() => {}}>{testData}</VerticalMenuTrigger>,
    );

    await expect(verticalMenuTrigger(page)).toHaveText(testData);
  });

  test(`should navigate to the 3rd item using Tab key`, async ({
    mount,
    page,
  }) => {
    await mount(<VerticalMenuDefaultComponent />);

    await verticalMenuItem(page).first().focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    await expect(
      verticalMenuItem(page).filter({ hasText: "Item 3" }),
    ).toBeFocused();
  });

  test(`should navigate to the 5th item using Tab key`, async ({
    mount,
    page,
  }) => {
    await mount(<VerticalMenuDefaultComponent />);

    await verticalMenuItem(page).first().focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    await expect(
      verticalMenuItem(page).filter({ hasText: "Item 5" }),
    ).toBeFocused();
  });

  test(`should navigate to the 4th item using Shift Tab key`, async ({
    mount,
    page,
  }) => {
    await mount(<VerticalMenuDefaultComponent />);

    await verticalMenuItem(page).nth(5).focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Shift+Tab");

    await expect(
      verticalMenuItem(page).filter({ hasText: "Item 4" }),
    ).toBeFocused();
  });

  test(`should expand to item 3 using click`, async ({ mount, page }) => {
    await mount(<VerticalMenuDefaultComponent />);

    await verticalMenuItem(page).nth(2).click();

    await expect(
      verticalMenuItem(page).locator("h3").filter({ hasText: "Active Item" }),
    ).toBeVisible();
  });

  test(`should collapse to item 3 using click`, async ({ mount, page }) => {
    await mount(<VerticalMenuDefaultComponent />);

    await verticalMenuItem(page).nth(2).click();
    await verticalMenuItem(page).nth(2).click();

    await expect(
      verticalMenuItem(page).locator("h3").filter({ hasText: "Active Item" }),
    ).toBeHidden();
  });

  (
    [
      ["expand", keysToTrigger[0], 1],
      ["expand", keysToTrigger[1], 1],
      ["collapse", keysToTrigger[0], 2],
      ["collapse", keysToTrigger[1], 2],
    ] as [string, "Space" | "Enter", number][]
  ).forEach(([action, key, index]) => {
    test(`should ${action} Item 2 using ${key} key`, async ({
      mount,
      page,
    }) => {
      await mount(<VerticalMenuDefaultComponent />);

      for (let i = 0; i < index; i++) {
        await verticalMenuItem(page).nth(2).focus();
        await page.keyboard.press(key);
      }

      if (action === "expand") {
        await expect(
          verticalMenuItem(page)
            .locator("h3")
            .filter({ hasText: "Active Item" }),
        ).toBeVisible();
      }
      if (action === "collapse") {
        await expect(
          verticalMenuItem(page)
            .locator("h3")
            .filter({ hasText: "Active Item" }),
        ).toBeHidden();
      }
    });
  });

  test(`should navigate to the children element using Tab key`, async ({
    mount,
    page,
  }) => {
    await mount(<VerticalMenuDefaultComponent />);

    await verticalMenuItem(page).first().focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    await expect(
      verticalMenuItem(page).nth(4).filter({ hasText: "Active item" }),
    ).toBeFocused();
  });

  test(`should check the focus styling`, async ({ mount, page }) => {
    await mount(<VerticalMenuDefaultComponent />);

    await verticalMenuItem(page).first().focus();
    await page.keyboard.press("Tab");
    const menuItem2 = verticalMenuItem(page).nth(1);

    await expect(menuItem2).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset",
    );
    await expect(menuItem2).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");
  });
});

test.describe("VerticalMenuFullScreen test background scroll when tabbing", () => {
  test(`tabbing forward through the menu and back to the start should not make the background scroll to the bottom`, async ({
    mount,
    page,
  }) => {
    await mount(<VerticalMenuFullScreenBackgroundScrollTest />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    await expect(closeIconButton(page)).toBeFocused();

    const offscreenText = page.getByText("I should not be scrolled into view");
    await expect(offscreenText).not.toBeInViewport();
  });

  test(`tabbing backward through the menu and back to the start should not make the background scroll to the bottom`, async ({
    mount,
    page,
  }) => {
    await mount(<VerticalMenuFullScreenBackgroundScrollTest />);

    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Shift+Tab");

    await expect(closeIconButton(page)).toBeFocused();

    const offscreenText = page.getByText("I should not be scrolled into view");
    await expect(offscreenText).not.toBeInViewport();
  });
});

test.describe("Events test", () => {
  test(`should be available when a Dialog is opened in the background`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await page.setViewportSize({
      width: 320,
      height: 599,
    });
    await mount(
      <VerticalMenuFullScreenCustomWithDialog
        onClose={() => {
          callbackCount += 1;
        }}
      />,
    );

    await verticalMenuTrigger(page).click();

    await closeIconButton(page).click();

    expect(callbackCount).toBe(1);

    const dialogText = page.getByText("Do you want to leave before saving?");
    await expect(dialogText).toBeInViewport();
  });
});

test.describe("should check the accessibility tests", () => {
  test(`should pass accessibility tests for default component`, async ({
    mount,
    page,
  }) => {
    await mount(<VerticalMenuDefaultComponent />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests when open`, async ({ mount, page }) => {
    await mount(<VerticalMenuDefaultComponent />);

    await verticalMenuItem(page).first().focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests when active`, async ({
    mount,
    page,
  }) => {
    await mount(<VerticalMenuItemCustom active={(isOpen) => !isOpen} />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests with Adornment`, async ({
    mount,
    page,
  }) => {
    await mount(<Adornment />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests with CustomItemHeight`, async ({
    mount,
    page,
  }) => {
    await mount(<CustomItemHeight />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests with CustomItemPadding`, async ({
    mount,
    page,
  }) => {
    await mount(<CustomItemPadding />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests with FullScreen`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({
      width: 320,
      height: 599,
    });
    await mount(<VerticalMenuFullScreenCustom />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests with FullScreen open`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({
      width: 320,
      height: 599,
    });
    await mount(<VerticalMenuFullScreenCustom isOpen />);

    await checkAccessibility(page);
  });
});

test.describe("href redirect", () => {
  // this test must be last in the test suite as the navigation to a new page messes up any later tests
  test(`should navigate to the children href`, async ({ mount, page }) => {
    await mount(<VerticalMenuDefaultComponent />);

    await verticalMenuItem(page).nth(1).click();
  });
});

import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  VerticalMenuDefaultComponent,
  VerticalMenuFullScreenCustom,
  VerticalMenuFullScreenCustomWithDialog,
  VerticalMenuFullScreenBackgroundScrollTest,
} from "./components.test-pw";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
  waitForAnimationEnd,
} from "../../../playwright/support/helper";
import {
  verticalMenuItem,
  verticalMenuTrigger,
  verticalMenuFullScreen,
} from "../../../playwright/components/vertical-menu";
import { closeIconButton } from "../../../playwright/components/index";

test.describe("with beforeEach for VerticalMenuFullScreen", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({
      width: 320,
      height: 599,
    });
  });

  test(`should render the VerticalMenuTrigger with a default height of 40px`, async ({
    mount,
    page,
  }) => {
    await mount(<VerticalMenuFullScreenCustom />);

    await assertCssValueIsApproximately(
      verticalMenuTrigger(page),
      "height",
      40,
    );
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
    await expect(verticalMenuFullScreen(page)).toBeHidden();

    await item.click();
    await waitForAnimationEnd(verticalMenuFullScreen(page));
    await expect(verticalMenuFullScreen(page)).toBeVisible();
    await closeButton.click();
    await expect(item).toBeFocused();
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
      "rgb(255, 181, 0) 0px 0px 0px 2px inset, rgb(0, 0, 0) 0px 0px 0px 4px inset",
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

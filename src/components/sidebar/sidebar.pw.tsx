import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  closeIconButton,
  getComponent,
  getDataElementByValue,
} from "../../../playwright/components";
import { sidebarPreview } from "../../../playwright/components/sidebar";
import {
  assertCssValueIsApproximately,
  checkAccessibility,
  continuePressingSHIFTTAB,
  continuePressingTAB,
  waitForAnimationEnd,
} from "../../../playwright/support/helper";
import {
  Default,
  DefaultNested,
  SidebarBackgroundScrollTestComponent,
  SidebarBackgroundScrollWithOtherFocusableContainers,
  SidebarComponentFocusable,
} from "./components.test-pw";

test.describe("Focus management and interaction tests for Sidebar component", () => {
  test("should render component with focusableContainers", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarComponentFocusable />);

    const toastElement = getComponent(page, "toast");

    await expect(toastElement).toBeHidden();

    const openToastElement = getDataElementByValue(page, "open-toast");
    await openToastElement.click();

    await expect(toastElement).toBeVisible();

    const toastElementCloseButton = page
      .getByTestId("toast")
      .getByLabel("Close");
    await toastElementCloseButton.click();

    await expect(toastElement).toBeHidden();
  });

  test("should render component with first input and button as focusableSelectors", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarComponentFocusable />);

    const sidebarPreviewElement = sidebarPreview(page);
    await sidebarPreviewElement.press("Tab");
    const focusedElement = page.locator("*:focus");
    await focusedElement.press("Tab");
    const firstInputElement = getDataElementByValue(page, "input").nth(0);

    await expect(firstInputElement).toBeFocused();

    await focusedElement.press("Tab");
    const secondInputElement = getDataElementByValue(page, "input").nth(1);

    await expect(secondInputElement).not.toBeFocused();

    const openToastElement = getDataElementByValue(page, "open-toast");

    await expect(openToastElement).toBeFocused();
  });

  test("should return focus to the Toast within component after non-focusable content has been selected", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarComponentFocusable />);

    const toastElement = getComponent(page, "toast");

    await expect(toastElement).toBeHidden();

    const openToastElement = getDataElementByValue(page, "open-toast");
    await openToastElement.click();

    await expect(toastElement).toBeVisible();

    await page.keyboard.press("Tab");
    const closeIconButtonElement = closeIconButton(page).nth(1);

    await expect(closeIconButtonElement).toBeFocused();
  });

  test("when Sidebar is opened and then closed, the call to action element should be focused", async ({
    mount,
    page,
  }) => {
    await mount(<Default open={false} />);

    const button = page.getByRole("button").filter({ hasText: "Open sidebar" });
    const sidebar = sidebarPreview(page);
    await expect(button).not.toBeFocused();
    await expect(sidebar).toBeHidden();

    await button.click();
    await expect(sidebar).toBeVisible();
    const closeButton = page.getByLabel("Close");
    await closeButton.click();
    await expect(button).toBeFocused();
    await expect(sidebar).toBeHidden();
  });

  test("when Sidebar is open on render, then closed, opened and then closed again, the call to action element should be focused", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);

    const sidebar = sidebarPreview(page);
    await expect(sidebar).toBeVisible();
    const closeButton = page.getByLabel("Close");
    await closeButton.click();

    const button = page.getByRole("button").filter({ hasText: "Open sidebar" });
    await expect(button).not.toBeFocused();
    await expect(sidebar).toBeHidden();

    await button.click();
    await expect(sidebar).toBeVisible();
    await closeButton.click();
    await expect(button).toBeFocused();
  });

  test("when nested Sidebar's are opened/closed their respective call to action elements should be focused correctly", async ({
    mount,
    page,
  }) => {
    await mount(<DefaultNested />);

    const firstButton = page
      .getByRole("button")
      .filter({ hasText: "Open First Sidebar" });
    const firstSidebar = sidebarPreview(page).first();
    await expect(firstButton).not.toBeFocused();
    await expect(firstSidebar).toBeHidden();

    await firstButton.click();
    await expect(firstSidebar).toBeVisible();
    const secondButton = page
      .getByRole("button")
      .filter({ hasText: "Open Nested Sidebar" });
    await expect(secondButton).not.toBeFocused();
    await secondButton.click();
    const secondSidebar = sidebarPreview(page).last();
    await expect(secondSidebar).toBeVisible();

    const secondCloseButton = page.getByLabel("Close").last();
    await secondCloseButton.click();
    await expect(secondButton).toBeFocused();

    const firstCloseButton = page.getByLabel("Close").first();
    await firstCloseButton.click();
    await expect(firstButton).toBeFocused();
  });

  test("when Sidebar is opened and then closed, with the `restoreFocusOnClose` prop passed as `false`, the call to action element should not be focused", async ({
    mount,
    page,
  }) => {
    await mount(<Default open={false} restoreFocusOnClose={false} />);

    const button = page.getByRole("button").filter({ hasText: "Open sidebar" });
    const sidebar = sidebarPreview(page);
    await expect(button).not.toBeFocused();
    await expect(sidebar).toBeHidden();

    await button.click();
    await expect(sidebar).toBeVisible();
    const closeButton = page.getByLabel("Close");
    await closeButton.click();
    await expect(button).not.toBeFocused();
    await expect(sidebar).toBeHidden();
  });
});

test.describe("Browser-specific rendering", () => {
  test("check component has correctly styling when zoom is 400%", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);

    // 4.0 zoom is equal to 400%
    await page.evaluate("document.body.style.zoom=4.0");

    await assertCssValueIsApproximately(
      sidebarPreview(page),
      "max-width",
      1366,
    );
  });

  test.describe("Check background scroll when tabbing", () => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("tabbing forward through the sidebar and back to the start should not make the background scroll to the bottom", async ({
      mount,
      page,
    }) => {
      await mount(<SidebarBackgroundScrollTestComponent />);

      await continuePressingTAB(page, 3);
      const closeIconButtonElement = closeIconButton(page);

      await expect(closeIconButtonElement).toBeFocused();

      const boxElement = page.getByText("I should not be scrolled into view");
      await expect(boxElement).not.toBeInViewport();
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("tabbing backward through the sidebar and back to the start should not make the background scroll to the bottom", async ({
      mount,
      page,
    }) => {
      await mount(<SidebarBackgroundScrollTestComponent />);

      await continuePressingSHIFTTAB(page, 1);
      const closeIconButtonElement = closeIconButton(page);

      await expect(closeIconButtonElement).toBeFocused();

      const boxElement = page.getByText("I should not be scrolled into view");
      await expect(boxElement).not.toBeInViewport();
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("tabbing forward through the sidebar and other focusable containers back to the start should not make the background scroll to the bottom", async ({
      mount,
      page,
    }) => {
      await mount(<SidebarBackgroundScrollWithOtherFocusableContainers />);

      await continuePressingTAB(page, 6);
      await waitForAnimationEnd(sidebarPreview(page));
      const closeIconButtonElement = closeIconButton(page).nth(0);

      await expect(closeIconButtonElement).toBeFocused();

      const boxElement = page.getByText("I should not be scrolled into view");
      await expect(boxElement).not.toBeInViewport();
    });

    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("tabbing backward through the sidebar and other focusable containers back to the start should not make the background scroll to the bottom", async ({
      mount,
      page,
    }) => {
      await mount(<SidebarBackgroundScrollWithOtherFocusableContainers />);

      await continuePressingSHIFTTAB(page, 7);
      const closeIconButtonElement = closeIconButton(page).nth(0);

      await expect(closeIconButtonElement).toBeFocused();

      const boxElement = page.getByText("I should not be scrolled into view");
      await expect(boxElement).not.toBeInViewport();
    });
  });
});

test.describe("Accessibility tests for Sidebar component", () => {
  test("should pass accessibility tests for default Sidebar", async ({
    mount,
    page,
  }) => {
    await mount(<Default />);

    await checkAccessibility(page);
  });
});

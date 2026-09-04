import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import {
  closeIconButton,
  getComponent,
  getDataElementByValue,
} from "../../../playwright/components";
import { sidebarPreview } from "../../../playwright/components/sidebar";
import {
  checkAccessibility,
  continuePressingSHIFTTAB,
  continuePressingTAB,
  waitForAnimationEnd,
} from "../../../playwright/support/helper";
import {
  ControlledSidebar,
  NestedSidebars,
  SidebarWithBackgroundScrollTarget,
  SidebarWithBackgroundScrollTargetAndFocusableContainers,
  SidebarWithFocusableContainer,
  SidebarWithStickyForm,
  SidebarWithTallStickyFormFooter,
} from "./components.test-pw";

test.describe("Focus management and interaction tests for Sidebar component", () => {
  test("allows an additional focusable container to remain interactive", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarWithFocusableContainer />);

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

  test("uses focusableSelectors to skip excluded inputs during tab navigation", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarWithFocusableContainer />);

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

  test("includes the Toast close button in the tab order", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarWithFocusableContainer />);

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
    await mount(<ControlledSidebar open={false} />);

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
    await mount(<ControlledSidebar />);

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

  test("when nested Sidebars are opened and closed, focus returns to their respective call-to-action elements", async ({
    mount,
    page,
  }) => {
    await mount(<NestedSidebars />);

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
    await mount(<ControlledSidebar open={false} restoreFocusOnClose={false} />);

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
  test("uses the fluid right-positioned desktop presentation above 768px", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1000, height: 800 });
    await mount(<ControlledSidebar />);

    const sidebar = sidebarPreview(page);
    await expect(sidebar).toHaveCSS("width", "300px");
    await expect(sidebar).toHaveCSS("min-width", "288px");
    await expect(sidebar).toHaveCSS("right", "0px");
    await expect(sidebar).toHaveCSS("border-radius", "24px 0px 0px 24px");
    await expect(sidebar).toHaveCSS("overflow", "hidden");
    await expect(getDataElementByValue(page, "modal-background")).toBeVisible();
  });

  test("uses the 288px desktop minimum width immediately above 768px", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 769, height: 800 });
    await mount(<ControlledSidebar />);

    const sidebar = sidebarPreview(page);
    await expect(sidebar).toHaveCSS("width", "288px");
    await expect(sidebar).toHaveCSS("right", "0px");
    await expect(sidebar).toHaveCSS("border-radius", "24px 0px 0px 24px");
    await expect(getDataElementByValue(page, "modal-background")).toBeVisible();
  });

  test("caps an oversized legacy preset width to the viewport", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 769, height: 800 });
    await mount(<ControlledSidebar size="extra-large" />);

    await expect(sidebarPreview(page)).toHaveCSS("width", "769px");
  });

  test("caps an oversized custom width to the viewport", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 769, height: 800 });
    await mount(<ControlledSidebar width="1000px" />);

    await expect(sidebarPreview(page)).toHaveCSS("width", "769px");
  });

  test("uses the fullscreen presentation without a dimmer at 768px", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await mount(<ControlledSidebar width="400px" />);

    const sidebar = sidebarPreview(page);
    await expect(sidebar).toHaveCSS("width", "768px");
    await expect(sidebar).toHaveCSS("border-radius", "0px");
    await expect(sidebar).toHaveCSS("overflow-y", "auto");
    await expect(getDataElementByValue(page, "modal-background")).toBeHidden();
    await expect(sidebar).toHaveAttribute("aria-modal", "true");
  });

  test("makes a sticky footer part of the whole Sidebar scroll at 768px", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 769, height: 800 });
    await mount(<SidebarWithStickyForm />);

    const sidebar = sidebarPreview(page);
    const footer = page.getByTestId("form-footer");
    await expect(footer).toHaveCSS("position", "sticky");

    await page.setViewportSize({ width: 768, height: 800 });
    await expect(footer).toHaveCSS("position", "static");
    await expect(sidebar).toHaveCSS("overflow-y", "auto");
    await expect
      .poll(() =>
        sidebar.evaluate(
          (element) => element.scrollHeight > element.clientHeight,
        ),
      )
      .toBe(true);
  });

  test("does not constrain custom sticky footer height", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarWithTallStickyFormFooter />);

    const footer = page.getByTestId("form-footer");
    await expect
      .poll(() => footer.evaluate((element) => element.clientHeight))
      .toBeGreaterThanOrEqual(128);
  });

  test.describe("Check background scroll when tabbing", () => {
    // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
    test.skip("tabbing forward through the sidebar and back to the start should not make the background scroll to the bottom", async ({
      mount,
      page,
    }) => {
      await mount(<SidebarWithBackgroundScrollTarget />);

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
      await mount(<SidebarWithBackgroundScrollTarget />);

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
      await mount(<SidebarWithBackgroundScrollTargetAndFocusableContainers />);

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
      await mount(<SidebarWithBackgroundScrollTargetAndFocusableContainers />);

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
    await mount(<ControlledSidebar />);

    await checkAccessibility(page);
  });
});

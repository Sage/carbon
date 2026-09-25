import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import Box from "../box";
import {
  closeIconButton,
  getDataElementByValue,
  getDataRoleByValue,
} from "../../../playwright/components";
import { sidebarPreview } from "../../../playwright/components/sidebar";
import {
  checkAccessibility,
  continuePressingSHIFTTAB,
  continuePressingTAB,
  waitForAnimationEnd,
  waitForElementFocus,
} from "../../../playwright/support/helper";
import {
  ControlledSidebar,
  NestedSidebars,
  SidebarWithBackgroundScrollTarget,
  SidebarWithBackgroundScrollTargetAndFocusableContainers,
  SidebarWithFocusableContainer,
  SidebarWithShortStickyCustomFooter,
  SidebarWithStickyCustomFooter,
  SidebarWithTallStickyCustomFooter,
  SidebarWithStickyForm,
  SidebarWithTallStickyFormFooter,
} from "./components.test-pw";

test.describe("Focus management and interaction tests for Sidebar component", () => {
  test("includes custom footer actions in the tab order", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await mount(<SidebarWithStickyCustomFooter />);

    const sidebar = sidebarPreview(page);
    const closeButton = closeIconButton(page);
    const body = getDataElementByValue(page, "sidebar-body");
    const saveButton = page.getByRole("button", { name: "Save" });
    await sidebar.press("Tab");
    await expect(closeButton).toBeFocused();
    await closeButton.press("Tab");
    await expect(body).toBeFocused();
    await body.press("PageDown");
    await expect
      .poll(() => body.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(0);
    await body.press("Tab");
    await expect(saveButton).toBeFocused();
  });

  test("allows an additional focusable container to remain interactive", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarWithFocusableContainer />);

    const messageElement = getDataRoleByValue(page, "message");

    await expect(messageElement).toBeHidden();

    const openMessageElement = getDataElementByValue(page, "open-message");
    await openMessageElement.click();

    await expect(messageElement).toBeVisible();

    const messageElementCloseButton = messageElement.getByLabel("Close");
    await page.keyboard.press("Tab");
    await expect(messageElementCloseButton).toBeFocused();
    await messageElementCloseButton.press("Enter");

    await expect(messageElement).toBeHidden();
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

    const openMessageElement = getDataElementByValue(page, "open-message");

    await expect(openMessageElement).toBeFocused();
  });

  test("includes the Message close button in the tab order", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarWithFocusableContainer />);

    const messageElement = getDataRoleByValue(page, "message");

    await expect(messageElement).toBeHidden();

    const openMessageElement = getDataElementByValue(page, "open-message");
    await openMessageElement.click();

    await expect(messageElement).toBeVisible();

    const closeIconButtonElement = messageElement.getByLabel("Close");
    await page.keyboard.press("Tab");

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
    await expect(sidebar).toHaveCSS("overflow", "hidden");
    await expect(getDataElementByValue(page, "modal-background")).toBeHidden();
    await expect(sidebar).toHaveAttribute("aria-modal", "true");
  });

  test("scrolls the whole Sidebar at 768px when disableStickyOnSmallScreen is set", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await mount(<ControlledSidebar width="400px" disableStickyOnSmallScreen />);

    const sidebar = sidebarPreview(page);
    await expect(sidebar).toHaveCSS("width", "768px");
    await expect(sidebar).toHaveCSS("border-radius", "0px");
    await expect(sidebar).toHaveCSS("overflow-y", "auto");
    await expect(getDataElementByValue(page, "modal-background")).toBeHidden();
    await expect(sidebar).toHaveAttribute("aria-modal", "true");
  });

  test("keeps the header region and sticky Form footer visible at 768px by default", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await mount(<SidebarWithStickyForm />);

    const sidebar = sidebarPreview(page);
    const formContent = getDataElementByValue(page, "form-content");
    const footer = page.getByTestId("form-footer");
    const header = page.getByRole("heading", {
      name: "Sidebar with sticky footer",
    });
    await expect(footer).toHaveCSS("position", "sticky");
    await expect(sidebar).toHaveCSS("overflow", "hidden");
    await formContent.evaluate((element) => {
      element.scrollTop = 200;
    });
    await expect
      .poll(() => formContent.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(0);
    await expect(header).toBeInViewport();
  });

  test("makes sticky Form content keyboard-scrollable at 768px", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await mount(<SidebarWithStickyForm />);

    const sidebar = sidebarPreview(page);
    const closeButton = page.getByLabel("Close");
    const formContent = getDataElementByValue(page, "form-content");

    await sidebar.press("Tab");
    await expect(closeButton).toBeFocused();
    await closeButton.press("Tab");
    await expect(formContent).toBeFocused();
    await formContent.press("PageDown");
    await expect
      .poll(() => formContent.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(0);
  });

  test("makes the header region and sticky Form footer part of the whole Sidebar scroll at 768px when requested", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await mount(<SidebarWithStickyForm disableStickyOnSmallScreen />);

    const sidebar = sidebarPreview(page);
    const footer = page.getByTestId("form-footer");
    const header = page.getByRole("heading", {
      name: "Sidebar with sticky footer",
    });
    await expect(footer).toHaveCSS("position", "static");
    await expect(sidebar).toHaveCSS("overflow-y", "auto");
    await expect
      .poll(() =>
        sidebar.evaluate(
          (element) => element.scrollHeight > element.clientHeight,
        ),
      )
      .toBe(true);
    await sidebar.evaluate((element) => {
      element.scrollTop = 200;
    });
    await expect(header).not.toBeInViewport();
  });

  test("does not constrain sticky Form footer height", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarWithTallStickyFormFooter />);

    const footer = page.getByTestId("form-footer");
    await expect
      .poll(() => footer.evaluate((element) => element.clientHeight))
      .toBeGreaterThanOrEqual(128);
  });

  test("does not constrain custom sticky footer height", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarWithTallStickyCustomFooter />);

    const footer = getDataElementByValue(page, "sidebar-footer");
    await expect
      .poll(() => footer.evaluate((element) => element.clientHeight))
      .toBeGreaterThanOrEqual(128);
  });

  test("places a custom sticky footer at the bottom of a Sidebar with short content", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1000, height: 800 });
    await mount(<SidebarWithShortStickyCustomFooter />);

    const sidebar = sidebarPreview(page);
    const footer = getDataElementByValue(page, "sidebar-footer");
    await expect(footer).toHaveCSS("position", "sticky");
    await expect
      .poll(async () => {
        const [sidebarBottom, footerBottom] = await Promise.all([
          sidebar.evaluate((element) => element.getBoundingClientRect().bottom),
          footer.evaluate((element) => element.getBoundingClientRect().bottom),
        ]);

        return Math.round(sidebarBottom - footerBottom);
      })
      .toBe(0);
  });

  test("keeps a custom sticky footer visible at 768px by default", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await mount(<SidebarWithStickyCustomFooter />);

    const body = getDataElementByValue(page, "sidebar-body");
    const footer = getDataElementByValue(page, "sidebar-footer");
    await expect(footer).toHaveCSS("position", "sticky");
    await body.evaluate((element) => {
      element.scrollTop = 200;
    });
    await expect
      .poll(() => body.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(0);
    await expect(footer).toBeInViewport();
  });

  test("allows a non-sticky custom footer to scroll with Sidebar content", async ({
    mount,
    page,
  }) => {
    await mount(<SidebarWithStickyCustomFooter stickyFooter={false} />);

    const content = getDataElementByValue(page, "sidebar-content");
    const footer = getDataElementByValue(page, "sidebar-footer");
    await expect(footer).not.toBeInViewport();
    await content.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });
    await expect
      .poll(() => content.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(0);
    await expect(footer).toBeInViewport();
  });

  test("makes a custom sticky footer part of the Sidebar scroll when requested", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await mount(
      <SidebarWithStickyCustomFooter
        disableStickyOnSmallScreen
        footer={<Box height="128px">Footer content</Box>}
      />,
    );

    const sidebar = sidebarPreview(page);
    const footer = getDataElementByValue(page, "sidebar-footer");
    await expect(footer).toHaveCSS("position", "static");
    await expect
      .poll(() => footer.evaluate((element) => element.clientHeight))
      .toBeGreaterThanOrEqual(128);
    await expect(footer).not.toBeInViewport();
    await sidebar.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });
    await expect
      .poll(() => sidebar.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(0);
    await expect(footer).toBeInViewport();
  });

  test.describe("Check background scroll when tabbing", () => {
    test("tabbing forward through the sidebar and back to the start should not scroll the background", async ({
      mount,
      page,
    }) => {
      await mount(<SidebarWithBackgroundScrollTarget />);

      await waitForElementFocus(page, sidebarPreview(page));
      await continuePressingTAB(page, 3);
      const closeIconButtonElement = closeIconButton(page);

      await expect(closeIconButtonElement).toBeFocused();
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    });

    test("tabbing backward through the sidebar and back to the start should not scroll the background", async ({
      mount,
      page,
    }) => {
      await mount(<SidebarWithBackgroundScrollTarget />);

      await waitForElementFocus(page, sidebarPreview(page));
      await continuePressingSHIFTTAB(page, 2);
      const closeIconButtonElement = closeIconButton(page);

      await expect(closeIconButtonElement).toBeFocused();
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    });

    test("tabbing forward through the sidebar and other focusable containers back to the start should not scroll the background", async ({
      mount,
      page,
    }) => {
      await mount(<SidebarWithBackgroundScrollTargetAndFocusableContainers />);

      await waitForElementFocus(page, sidebarPreview(page));
      await continuePressingTAB(page, 5);
      await waitForAnimationEnd(sidebarPreview(page));
      const closeIconButtonElement = sidebarPreview(page).getByLabel("Close");

      await expect(closeIconButtonElement).toBeFocused();
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
    });

    test("tabbing backward through the sidebar and other focusable containers back to the start should not scroll the background", async ({
      mount,
      page,
    }) => {
      await mount(<SidebarWithBackgroundScrollTargetAndFocusableContainers />);

      await waitForElementFocus(page, sidebarPreview(page));
      await continuePressingSHIFTTAB(page, 4);
      await waitForAnimationEnd(sidebarPreview(page));
      const closeIconButtonElement = sidebarPreview(page).getByLabel("Close");

      await expect(closeIconButtonElement).toBeFocused();
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
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

  test("should pass accessibility tests at 768px with the default sticky header and footer", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await mount(<SidebarWithStickyForm />);

    await expect(getDataElementByValue(page, "form-content")).toHaveAttribute(
      "tabindex",
      "0",
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests at 768px when disableStickyOnSmallScreen is set", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await mount(<SidebarWithStickyForm disableStickyOnSmallScreen />);

    await checkAccessibility(page);
  });

  test("should pass accessibility tests with a custom sticky footer", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await mount(<SidebarWithStickyCustomFooter />);

    await expect(getDataElementByValue(page, "sidebar-body")).toHaveAttribute(
      "tabindex",
      "0",
    );
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with a custom footer that scrolls on small screens", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await mount(<SidebarWithStickyCustomFooter disableStickyOnSmallScreen />);

    await checkAccessibility(page);
  });
});

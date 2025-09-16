import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";

import {
  DefaultAdaptiveSidebar,
  DefaultWithCustomCloseButton,
  DefaultWithCustomHeight,
} from "./components.test-pw";
import { checkAccessibility } from "../../../playwright/support/helper";

test.describe("Component properties", () => {
  test("renders the adaptive sidebar with default settings", async ({
    mount,
    page,
  }) => {
    await mount(<DefaultAdaptiveSidebar />);
    const button = page.getByTestId("adaptive-sidebar-control-button");
    await expect(button).toHaveText("Open");
    await button.click();
    await expect(button).toHaveText("Close");
    const sidebar = page.getByTestId("adaptive-sidebar");
    expect(sidebar).not.toBeNull();
    await expect(sidebar).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(sidebar).toHaveCSS("min-width", "320px");
    await button.click();
    await expect(button).toHaveText("Open");
  });

  [
    { color: "app", rgb: "242, 245, 246" },
    { color: "black", rgb: "0, 0, 0" },
    { color: "white", rgb: "255, 255, 255" },
  ].forEach(({ color, rgb }) => {
    test(`renders with the correct background color if the value passed is ${color}`, async ({
      mount,
      page,
    }) => {
      await mount(<DefaultAdaptiveSidebar backgroundColor={color} />);
      const button = page.getByTestId("adaptive-sidebar-control-button");
      await button.click();
      const sidebar = page.getByTestId("adaptive-sidebar");
      await expect(sidebar).toHaveCSS("background-color", `rgb(${rgb})`);
    });
  });

  test(`renders with a custom close button`, async ({ mount, page }) => {
    await mount(<DefaultWithCustomCloseButton />);
    const button = page.getByTestId("adaptive-sidebar-control-button");
    await button.click();
    const sidebar = page.getByTestId("adaptive-sidebar");
    const pillButton = sidebar.getByTestId(
      "adaptive-sidebar-custom-close-button",
    );
    await expect(pillButton).toHaveText("Click to close");
    await pillButton.click();
    await expect(button).toHaveText("Open");
  });

  [
    { height: "100px", value: "100px" },
    { height: "50%", value: "50%" },
    { height: "10vh", value: "76.8px" },
  ].forEach(({ height, value }) => {
    test(`renders with the correct custom height when the height property is passed with the value "${height}"`, async ({
      mount,
      page,
    }) => {
      await mount(<DefaultWithCustomHeight height={height} />);
      const button = page.getByTestId("adaptive-sidebar-control-button");
      await button.click();
      const sidebar = page.getByTestId("adaptive-sidebar");
      await expect(sidebar).toHaveCSS("max-height", value);
    });
  });

  [true, false].forEach((renderAsModal) => {
    test(`renders as a ${renderAsModal ? "modal" : "sidebar"} when the renderAsModal property is set to ${renderAsModal}`, async ({
      mount,
      page,
    }) => {
      await mount(<DefaultAdaptiveSidebar renderAsModal={renderAsModal} />);
      const button = page.getByTestId("adaptive-sidebar-control-button");
      await button.click();
      const sidebar = page.getByTestId(
        renderAsModal ? "sidebar" : "adaptive-sidebar",
      );
      expect(sidebar).not.toBeNull();
    });
  });

  test("when rendered as a modal, with the `restoreFocusOnClose` prop passed as `false`, the call to action element should not be focused", async ({
    mount,
    page,
  }) => {
    await mount(
      <DefaultAdaptiveSidebar renderAsModal restoreFocusOnClose={false} />,
    );

    const openButton = page.getByRole("button").filter({ hasText: "Open" });
    const sidebar = page.getByRole("dialog");
    await expect(openButton).not.toBeFocused();
    await expect(sidebar).not.toBeVisible();

    await openButton.click();
    await expect(sidebar).toBeVisible();
    const closeButton = page.getByRole("button").filter({ hasText: "Close" });
    await closeButton.click();
    await expect(openButton).not.toBeFocused();
    await expect(sidebar).not.toBeVisible();
  });

  test("should render the AdaptiveSidebar component as a modal when at mobile resolution", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 600, height: 600 });
    await mount(<DefaultAdaptiveSidebar renderAsModal />);
    const button = page.getByTestId("adaptive-sidebar-control-button");
    await button.click();
    const sidebar = page.getByTestId("sidebar");
    expect(sidebar).not.toBeNull();
  });

  test.describe("Accessibility tests for Adaptive Sidebar", () => {
    ["app", "black", "white"].forEach((color) => {
      test(`should pass accessibility tests for Adaptive Sidebar with a ${color} background`, async ({
        mount,
        page,
      }) => {
        await mount(<DefaultAdaptiveSidebar backgroundColor={color} open />);

        await checkAccessibility(page);
      });
    });
  });
});

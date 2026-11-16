import React from "react";

import { test, expect } from "../../../../playwright/helpers/base-test";
import { TabsComponent, TabsWithValidation } from "./components.test-pw";
import { checkAccessibility } from "../../../../playwright/support/helper";

test("shows scroll buttons when the viewport is resized so the tabs overflow, and scrolls the tabs when they are clicked", async ({
  mount,
  page,
}) => {
  await mount(<TabsComponent numberOfTabs={20} />);
  // resizing after mount checks the scroll buttons respond to size changes
  await page.setViewportSize({ width: 350, height: 250 });

  const scrollLeftButton = page.getByTitle("Scroll Tabs Left");
  const scrollRightButton = page.getByTitle("Scroll Tabs Right");

  await expect(scrollLeftButton).toBeHidden();
  await expect(scrollRightButton).toBeVisible();

  await scrollRightButton.click();
  await expect(scrollLeftButton).toBeVisible();

  await scrollLeftButton.click();
  await expect(scrollLeftButton).toBeHidden();

  await expect(async () => {
    await scrollRightButton.click();
    await expect(scrollRightButton).toBeHidden({ timeout: 500 });
  }).toPass();
  await expect(page.getByRole("tab", { name: "Tab 20" })).toBeInViewport();
});

test("scrolls the focused tab into view when navigating via Home and End keys", async ({
  mount,
  page,
}) => {
  await page.setViewportSize({ width: 350, height: 250 });
  await mount(<TabsComponent numberOfTabs={20} />);

  const firstTab = page.getByRole("tab", { name: "Tab 1", exact: true });
  const lastTab = page.getByRole("tab", { name: "Tab 20" });

  await expect(lastTab).not.toBeInViewport();

  await page.keyboard.press("Tab");
  await page.keyboard.press("End");
  await expect(lastTab).toBeFocused();
  await expect(lastTab).toBeInViewport();
  await expect(firstTab).not.toBeInViewport();

  await page.keyboard.press("Home");
  await expect(firstTab).toBeFocused();
  await expect(firstTab).toBeInViewport();
});

test.describe("Accessibility tests for Tabs component", () => {
  test("should pass accessibility checks with default setup", async ({
    mount,
    page,
  }) => {
    await mount(<TabsComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility checks with vertical setup", async ({
    mount,
    page,
  }) => {
    await mount(<TabsComponent orientation="vertical" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility checks with error and warning validation icons", async ({
    mount,
    page,
  }) => {
    await mount(<TabsWithValidation />);

    await checkAccessibility(page);
  });

  test("should pass accessibility checks when scroll buttons are shown", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 350, height: 250 });
    await mount(<TabsComponent numberOfTabs={20} />);

    const scrollLeftButton = page.getByTitle("Scroll Tabs Left");
    const scrollRightButton = page.getByTitle("Scroll Tabs Right");

    await scrollRightButton.click();

    await expect(scrollRightButton).toBeVisible();
    await expect(scrollLeftButton).toBeVisible();

    await checkAccessibility(page);
  });
});

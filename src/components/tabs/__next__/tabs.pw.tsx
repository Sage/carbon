import React from "react";

import { test, expect } from "../../../../playwright/helpers/base-test";
import DefaultTabsComponent from "./components.test-pw";
import { checkAccessibility } from "../../../../playwright/support/helper";

test("should render with scroll buttons on smaller screens if there are large numbers of tabs", async ({
  mount,
  page,
}) => {
  // Set up enough tabs that reducing the window causes the scroll buttons to appear
  await mount(<DefaultTabsComponent numberOfTabs={20} />);

  // Resize the window to a smaller size to cause the scroll buttons to actually appear
  await page.setViewportSize({ width: 350, height: 250 });

  const scrollButtonRight = page.locator("#tab-navigation-button-right");

  await expect(scrollButtonRight).toBeVisible();

  await scrollButtonRight.click();

  const scrollButtonLeft = page.locator("#tab-navigation-button-left");

  await expect(scrollButtonLeft).toBeVisible();

  await scrollButtonLeft.click();

  await expect(scrollButtonLeft).toBeHidden();

  // Clicking six times takes the view to the end of the tab list
  await scrollButtonRight.click();
  await scrollButtonRight.click();
  await scrollButtonRight.click();
  await scrollButtonRight.click();
  await scrollButtonRight.click();
  await scrollButtonRight.click();

  await expect(scrollButtonRight).toBeHidden();
});

test("should render without scroll buttons on smaller screens if there are large numbers of tabs but orientation is set to vertical", async ({
  mount,
  page,
}) => {
  await mount(
    <DefaultTabsComponent numberOfTabs={20} orientation="vertical" />,
  );

  await page.setViewportSize({ width: 350, height: 250 });

  const scrollButtonLeft = page.locator("#tab-navigation-button-left");
  const scrollButtonRight = page.locator("#tab-navigation-button-right");

  await expect(scrollButtonLeft).toHaveCount(0);
  await expect(scrollButtonRight).toHaveCount(0);
});

test.describe("Accessibility tests for Tabs component", () => {
  test("should pass accessibility checks with default setup", async ({
    mount,
    page,
  }) => {
    await mount(<DefaultTabsComponent />);

    await checkAccessibility(page);
  });

  test("should pass accessibility checks with vertical setup", async ({
    mount,
    page,
  }) => {
    await mount(<DefaultTabsComponent orientation="vertical" />);

    await checkAccessibility(page);
  });

  test("should pass accessibility checks with large tab sizes", async ({
    mount,
    page,
  }) => {
    await mount(<DefaultTabsComponent size="large" />);

    await checkAccessibility(page);
  });
});

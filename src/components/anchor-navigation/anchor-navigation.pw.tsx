import React from "react";
import { expect, test } from "../../../playwright/helpers/base-test";

import {
  AnchorNavigationComponent,
  InFullScreenDialog,
} from "../anchor-navigation/components.test-pw";

import { checkAccessibility } from "../../../playwright/support/helper";
import { DIALOG_FULL_SCREEN } from "../../../playwright/components/dialog/locators";

test.describe("Accessibility tests for Anchor Navigation component", () => {
  test("should pass accessibility tests for AnchorNavigationComponent example", async ({
    mount,
    page,
  }) => {
    await mount(<AnchorNavigationComponent />);

    await checkAccessibility(page);
  });

  test("should pass when rendered in full screen dialog", async ({
    mount,
    page,
  }) => {
    await mount(<InFullScreenDialog />);
    await page.getByText("open AnchorNavigation").click();

    await checkAccessibility(page, page.locator(DIALOG_FULL_SCREEN));
  });
});

test("active indicator matches single- and multiline label heights", async ({
  mount,
  page,
}) => {
  await mount(<AnchorNavigationComponent />);

  const firstLink = page.getByRole("link", { name: "First" });
  const firstLabel = firstLink.locator(
    '[data-element="anchor-navigation-item-label"]',
  );
  const firstIndicator = firstLink.locator(
    '[data-element="anchor-navigation-item-indicator"]',
  );

  const firstLabelHeight = await firstLabel.evaluate(
    (element) => element.getBoundingClientRect().height,
  );
  const firstIndicatorHeight = await firstIndicator.evaluate(
    (element) => element.getBoundingClientRect().height,
  );
  const firstLinkHeight = await firstLink.evaluate(
    (element) => element.getBoundingClientRect().height,
  );

  // Link must be at least as tall as its label (min-height token); avoid hardcoding the resolved px value.
  expect(firstLinkHeight).toBeGreaterThanOrEqual(firstLabelHeight);
  expect(firstIndicatorHeight).toBe(firstLabelHeight);

  const multilineLink = page.getByRole("link", {
    name: "Navigation item with very long label",
  });
  await multilineLink.click();

  const multilineLabelHeight = await multilineLink
    .locator('[data-element="anchor-navigation-item-label"]')
    .evaluate((element) => element.getBoundingClientRect().height);
  const multilineIndicatorHeight = await multilineLink
    .locator('[data-element="anchor-navigation-item-indicator"]')
    .evaluate((element) => element.getBoundingClientRect().height);

  expect(multilineLabelHeight).toBeGreaterThan(firstLabelHeight);
  expect(multilineIndicatorHeight).toBe(multilineLabelHeight);
});

test("uses the responsive sticky offset", async ({ mount, page }) => {
  await page.setViewportSize({ width: 599, height: 768 });
  await mount(<AnchorNavigationComponent />);

  const navigation = page.getByRole("navigation");
  const getTop = () =>
    navigation.evaluate((element) => parseFloat(getComputedStyle(element).top));

  // Capture the narrow-viewport offset first, then assert the wide-viewport
  // offset is larger — avoiding hardcoded resolved token values.
  const narrowTop = await getTop();

  await page.setViewportSize({ width: 600, height: 768 });

  await expect.poll(getTop).toBeGreaterThan(narrowTop);
});

import React from "react";
import { test, expect } from "@playwright/experimental-ct-react17";

import {
  AnchorNavigationComponent,
  InFullScreenDialog,
} from "../anchor-navigation/components.test-pw";

import {
  anchorNavigationStickyNavigation,
  anchorNavigationStickyMainPage,
  anchorNavigationItem,
} from "../../../playwright/components/anchor-navigation/index";
import { HooksConfig } from "../../../playwright";
import { checkAccessibility } from "../../../playwright/support/helper";
import { DIALOG_FULL_SCREEN } from "../../../playwright/components/dialog/locators";

test.describe("Should render AnchorNavigation component", () => {
  [
    ["First", "First section"],
    ["Second", "Second section"],
    ["Third", "Third section"],
    ["Navigation item with very long label", "Fourth section"],
    ["Fifth", "Fifth section"],
  ].forEach(([sectionIndex, sectionName]) => {
    test(`should scrolldown to the ${sectionIndex} AnchorNavigation section after pressing Tab on the ${sectionName}`, async ({
      mount,
      page,
    }) => {
      await mount(<AnchorNavigationComponent />);

      await anchorNavigationStickyNavigation(page, sectionIndex).click();
      await expect(
        anchorNavigationStickyMainPage(page, sectionName),
      ).toBeVisible();
    });
  });

  [
    ["First", "First section"],
    ["Fifth", "Fifth section"],
  ].forEach(([sectionIndex, sectionName]) => {
    test(`should scroll to the ${sectionIndex} and verify that proper ${sectionName} AnchorNavigation row is visible`, async ({
      mount,
      page,
    }) => {
      await mount(<AnchorNavigationComponent />);

      await anchorNavigationStickyNavigation(page, sectionIndex).click();
      await anchorNavigationStickyMainPage(page, sectionName).focus();
      await expect(
        anchorNavigationStickyMainPage(page, sectionName),
      ).toBeVisible();
    });
  });
});

test.describe("When focused", () => {
  test("has the expected styling when the focusRedesignOptOut flag is true", async ({
    mount,
    page,
  }) => {
    await mount<HooksConfig>(<AnchorNavigationComponent />, {
      hooksConfig: { focusRedesignOptOut: true },
    });

    await anchorNavigationItem(page, 0).focus();

    await expect(anchorNavigationItem(page, 0)).toHaveCSS(
      "outline",
      "rgb(255, 188, 25) solid 3px",
    );
  });

  test("has the expected styling when the focusRedesignOptOut flag is false", async ({
    mount,
    page,
  }) => {
    await mount(<AnchorNavigationComponent />);

    const anchorNavItem = anchorNavigationItem(page, 0);

    await anchorNavItem.focus();
    await expect(anchorNavItem).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );

    await expect(anchorNavItem).toHaveCSS(
      "outline",
      "rgba(0, 0, 0, 0) solid 3px",
    );
  });
});

test.describe("Rounded corners", () => {
  test("should have the expected border radius styling", async ({
    mount,
    page,
  }) => {
    await mount(<AnchorNavigationComponent />);

    await expect(anchorNavigationItem(page, 0)).toHaveCSS(
      "border-radius",
      "0px 8px 8px 0px",
    );
    await expect(anchorNavigationItem(page, 1)).toHaveCSS(
      "border-radius",
      "0px 8px 8px 0px",
    );
    await expect(anchorNavigationItem(page, 2)).toHaveCSS(
      "border-radius",
      "0px 8px 8px 0px",
    );
    await expect(anchorNavigationItem(page, 3)).toHaveCSS(
      "border-radius",
      "0px 8px 8px 0px",
    );
    await expect(anchorNavigationItem(page, 4)).toHaveCSS(
      "border-radius",
      "0px 8px 8px 0px",
    );
  });
});

test.describe("Accessibility tests for Anchor Navigation component", () => {
  test("should pass accessibility tests for AnchorNavigationComponent example", async ({
    mount,
    page,
  }) => {
    await mount(<AnchorNavigationComponent />);

    await checkAccessibility(page);
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip("should pass when rendered in full screen dialog", async ({
    mount,
    page,
  }) => {
    await mount(<InFullScreenDialog />);
    await page.getByText("open AnchorNavigation").click();
    await page.locator(DIALOG_FULL_SCREEN).waitFor();

    // color-contrast ignored until we can investigate and fix FE-6245
    await checkAccessibility(page, undefined, "color-contrast");
  });
});

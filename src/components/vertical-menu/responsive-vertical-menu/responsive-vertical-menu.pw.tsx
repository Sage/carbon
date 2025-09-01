/* eslint-disable no-await-in-loop */
import React from "react";
import { test, expect } from "../../../../playwright/helpers/base-test";

import {
  ResponsiveVerticalMenuDefaultComponent,
  ResponsiveVerticalMenuIconMixture,
  WithDifferentDepthsAsLastItem,
} from "./components.test-pw";

import {
  assertCssValueIsApproximately,
  checkAccessibility,
} from "../../../../playwright/support/helper";
import {
  responsiveVerticalMenuLauncher,
  responsiveVerticalMenuWrapper,
  responsiveVerticalMenuPrimary,
  responsiveVerticalMenuNthPrimaryItem,
  responsiveVerticalMenuNthSecondaryItem,
  responsiveVerticalMenuSecondary,
} from "../../../../playwright/components/vertical-menu/responsive-vertical-menu";

test.describe("functional tests", () => {
  [
    [200, 200],
    [350, 350],
    [632, 375],
  ].forEach(([requestedWidth, actualWidth]) => {
    test(`should render with width of ${actualWidth}px when ${requestedWidth}px is requested`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ResponsiveVerticalMenuDefaultComponent
          width={`${requestedWidth}px`}
        />,
      );
      await expect(responsiveVerticalMenuLauncher(page)).toBeVisible();
      await responsiveVerticalMenuLauncher(page).click();
      await expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
      await expect(responsiveVerticalMenuPrimary(page)).toBeDefined();

      await assertCssValueIsApproximately(
        responsiveVerticalMenuPrimary(page),
        "width",
        actualWidth,
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
    test(`should render with height of ${height}`, async ({ mount, page }) => {
      await mount(<ResponsiveVerticalMenuDefaultComponent height={height} />);

      await expect(responsiveVerticalMenuLauncher(page)).toBeVisible();
      await responsiveVerticalMenuLauncher(page).click();
      await expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
      await expect(responsiveVerticalMenuPrimary(page)).toBeDefined();

      await expect(responsiveVerticalMenuPrimary(page)).toHaveAttribute(
        "height",
        height,
      );
      await assertCssValueIsApproximately(
        responsiveVerticalMenuPrimary(page),
        "height",
        heightInPx,
      );
    });
  });

  test(`menu text is aligned regardless of icon presence`, async ({
    mount,
    page,
  }) => {
    await mount(<ResponsiveVerticalMenuIconMixture />);

    await expect(responsiveVerticalMenuLauncher(page)).toBeVisible();
    await responsiveVerticalMenuLauncher(page).click();
    await expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
    await expect(responsiveVerticalMenuPrimary(page)).toBeDefined();

    const iconMenuItem = await page.getByText("Primary Icon");
    const iconlessMenuItem = await page.getByText("Primary No Icon");
    const customIconMenuItem = await page.getByText("Primary Custom Icon");

    const clientOffsetIconMenuItem = await iconMenuItem.evaluate((el) => {
      return el.getBoundingClientRect().x;
    });
    const clientOffsetIconlessMenuItem = await iconlessMenuItem.evaluate(
      (el) => {
        return el.getBoundingClientRect().x;
      },
    );
    const clientOffsetCustomIconMenuItem = await customIconMenuItem.evaluate(
      (el) => {
        return el.getBoundingClientRect().x;
      },
    );

    // In these checks (and the ones further down), we need to allow
    // for a marginal difference in the x position of the menu items,
    // as the icon may be slightly different in size/position
    // depending on the browser, icon used, etc..
    await expect(clientOffsetIconMenuItem).toBeGreaterThanOrEqual(29);
    await expect(clientOffsetIconMenuItem).toBeLessThanOrEqual(33);
    // expect extra 40px offset for icon
    await expect(clientOffsetIconlessMenuItem).toBeGreaterThanOrEqual(29);
    await expect(clientOffsetIconlessMenuItem).toBeLessThanOrEqual(33);

    await expect(clientOffsetCustomIconMenuItem).toBeGreaterThanOrEqual(29);
    await expect(clientOffsetCustomIconMenuItem).toBeLessThanOrEqual(33);

    await page.locator("[id='secondary-menu-toggle']").click();
    await expect(responsiveVerticalMenuSecondary(page)).toBeDefined();

    const secondaryIconMenuItem = await page.getByText("Secondary Icon");
    const secondaryIconlessMenuItem = await page.getByText("Secondary No Icon");
    const secondaryCustomIconMenuItem = await page.getByText(
      "Secondary Custom Icon",
    );

    const clientOffsetSecondaryIconMenuItem =
      await secondaryIconMenuItem.evaluate((el) => {
        return el.getBoundingClientRect().x;
      });
    const clientOffsetSecondaryIconlessMenuItem =
      await secondaryIconlessMenuItem.evaluate((el) => {
        return el.getBoundingClientRect().x;
      });
    const clientOffsetSecondaryCustomIconMenuItem =
      await secondaryCustomIconMenuItem.evaluate((el) => {
        return el.getBoundingClientRect().x;
      });

    await expect(clientOffsetSecondaryIconMenuItem).toBeGreaterThanOrEqual(404);
    await expect(clientOffsetSecondaryIconMenuItem).toBeLessThanOrEqual(408);

    await expect(clientOffsetSecondaryIconlessMenuItem).toBeGreaterThanOrEqual(
      404,
    );
    await expect(clientOffsetSecondaryIconlessMenuItem).toBeLessThanOrEqual(
      408,
    );
    await expect(
      clientOffsetSecondaryCustomIconMenuItem,
    ).toBeGreaterThanOrEqual(404);
    await expect(clientOffsetSecondaryCustomIconMenuItem).toBeLessThanOrEqual(
      408,
    );

    await page.locator("[id='tertiary-menu-toggle']").click();
    await expect(responsiveVerticalMenuNthSecondaryItem(page, 0)).toBeVisible();

    const tertiaryIconMenuItem = await page.getByText("Tertiary Icon");
    const tertiaryIconlessMenuItem = await page.getByText("Tertiary No Icon");
    const tertiaryCustomIconMenuItem = await page.getByText(
      "Tertiary Custom Icon",
    );

    const clientOffsetTertiaryIconMenuItem =
      await tertiaryIconMenuItem.evaluate((el) => {
        return el.getBoundingClientRect().x;
      });
    const clientOffsetTertiaryIconlessMenuItem =
      await tertiaryIconlessMenuItem.evaluate((el) => {
        return el.getBoundingClientRect().x;
      });
    const clientOffsetTertiaryCustomIconMenuItem =
      await tertiaryCustomIconMenuItem.evaluate((el) => {
        return el.getBoundingClientRect().x;
      });

    await expect(clientOffsetTertiaryIconMenuItem).toBeGreaterThanOrEqual(437);
    await expect(clientOffsetTertiaryIconMenuItem).toBeLessThanOrEqual(441);

    await expect(clientOffsetTertiaryIconlessMenuItem).toBeGreaterThanOrEqual(
      437,
    );
    await expect(clientOffsetTertiaryIconlessMenuItem).toBeLessThanOrEqual(441);

    await expect(clientOffsetTertiaryCustomIconMenuItem).toBeGreaterThanOrEqual(
      437,
    );
    await expect(clientOffsetTertiaryCustomIconMenuItem).toBeLessThanOrEqual(
      441,
    );
  });
});

test.describe("keyboard navigation tests", () => {
  test("should loop back to primary menu item when Tab is pressed on last secondary menu item", async ({
    mount,
    page,
  }) => {
    await mount(<WithDifferentDepthsAsLastItem />);

    await responsiveVerticalMenuLauncher(page).click();

    const primaryMenuItem = page.getByRole("button", { name: "With Level 2" });
    await page.keyboard.press("Tab");
    await expect(primaryMenuItem).toBeFocused();
    await page.keyboard.press("Enter");

    const secondaryMenuItem = page.getByRole("link", {
      name: "Level 2 As Last Item",
    });
    await expect(secondaryMenuItem).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(secondaryMenuItem).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(primaryMenuItem).toBeFocused();
  });

  test("should loop back to primary menu item when Tab is pressed on last tertiary menu item", async ({
    mount,
    page,
  }) => {
    await mount(<WithDifferentDepthsAsLastItem />);

    await responsiveVerticalMenuLauncher(page).click();

    const primaryMenuItem = page.getByRole("button", { name: "With Level 3" });
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(primaryMenuItem).toBeFocused();
    await page.keyboard.press("Enter");

    await page.keyboard.press("Tab"); // go to secondary menu
    await page.keyboard.press("Enter"); // open secondary menu

    const tertiaryMenuItem = page.getByRole("link", {
      name: "Level 3 As Last Item",
    });
    await expect(tertiaryMenuItem).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(tertiaryMenuItem).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(primaryMenuItem).toBeFocused();
  });

  test("should loop back to primary menu item when Tab is pressed on last level 4 item", async ({
    mount,
    page,
  }) => {
    await mount(<WithDifferentDepthsAsLastItem />);

    await responsiveVerticalMenuLauncher(page).click();

    const primaryMenuItem = page.getByRole("button", { name: "With Level 4" });
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(primaryMenuItem).toBeFocused();
    await page.keyboard.press("Enter");

    await page.keyboard.press("Tab"); // go to secondary menu
    await page.keyboard.press("Enter"); // open secondary menu
    await page.keyboard.press("Tab"); // go to tertiary menu

    const quaternaryMenuItem = page.getByRole("link", {
      name: "Level 4 As Last Item",
    });
    await expect(quaternaryMenuItem).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(quaternaryMenuItem).toBeFocused();
    await page.keyboard.press("Tab");

    // TODO: FE-7448
    // await expect(primaryMenuItem).toBeFocused();
  });

  test("should go to last secondary menu item when Shift+Tab is pressed on the primary menu", async ({
    mount,
    page,
  }) => {
    await mount(<WithDifferentDepthsAsLastItem />);

    await responsiveVerticalMenuLauncher(page).click();

    const primaryMenuItem = page.getByRole("button", { name: "With Level 2" });
    await page.keyboard.press("Tab");
    await expect(primaryMenuItem).toBeFocused();
    await page.keyboard.press("Enter");

    const secondaryMenuItem = page.getByRole("link", {
      name: "Level 2 As Last Item",
    });
    await expect(secondaryMenuItem).toBeVisible();
    await page.keyboard.press("Shift+Tab");
    await expect(secondaryMenuItem).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(primaryMenuItem).toBeFocused();
  });

  test("should go to last tertiary menu item when Shift+Tab is pressed on the secondary menu", async ({
    mount,
    page,
  }) => {
    await mount(<WithDifferentDepthsAsLastItem />);

    await responsiveVerticalMenuLauncher(page).click();

    const primaryMenuItem = page.getByRole("button", { name: "With Level 3" });
    await primaryMenuItem.click(); // open primary menu
    const secondaryMenuItem = page.getByRole("button", {
      name: "Level 2 Parent",
    });
    await secondaryMenuItem.click(); // open secondary menu
    const tertiaryMenuItem = page.getByRole("link", {
      name: "Level 3 As Last Item",
    });
    await expect(tertiaryMenuItem).toBeVisible();

    await primaryMenuItem.focus();

    await page.keyboard.press("Shift+Tab");
    await expect(tertiaryMenuItem).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(secondaryMenuItem).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(primaryMenuItem).toBeFocused();
  });

  // TODO: FE-7448
  test.skip("should go to last level 4 item when Shift+Tab is pressed on the tertiary menu", async ({
    mount,
    page,
  }) => {
    await mount(<WithDifferentDepthsAsLastItem />);

    await responsiveVerticalMenuLauncher(page).click();

    const primaryMenuItem = page.getByRole("button", { name: "With Level 4" });
    await primaryMenuItem.click(); // open primary menu
    const secondaryMenuItem = page.getByRole("button", {
      name: "Level 2 Parent",
    });
    await secondaryMenuItem.click(); // open secondary menu
    const tertiaryMenuItem = page.getByRole("button", {
      name: "Level 3 Parent",
    });
    const quaternaryMenuItem = page.getByRole("link", {
      name: "Level 4 As Last Item",
    });
    await expect(quaternaryMenuItem).toBeVisible();

    await primaryMenuItem.focus();

    await page.keyboard.press("Shift+Tab");
    await expect(quaternaryMenuItem).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(tertiaryMenuItem).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(secondaryMenuItem).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(primaryMenuItem).toBeFocused();
  });
});

test.describe("accessibility tests", () => {
  test(`default menu with only primary menu active`, async ({
    mount,
    page,
  }) => {
    await mount(<ResponsiveVerticalMenuDefaultComponent />);

    await expect(responsiveVerticalMenuLauncher(page)).toBeVisible();
    await responsiveVerticalMenuLauncher(page).click();
    await expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
    await expect(responsiveVerticalMenuPrimary(page)).toBeDefined();

    await checkAccessibility(page);
  });

  test(`default menu with primary and secondary menus active`, async ({
    mount,
    page,
  }) => {
    await mount(<ResponsiveVerticalMenuDefaultComponent />);

    await expect(responsiveVerticalMenuLauncher(page)).toBeVisible();
    await responsiveVerticalMenuLauncher(page).click();
    await expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
    await expect(responsiveVerticalMenuPrimary(page)).toBeDefined();
    await expect(responsiveVerticalMenuNthPrimaryItem(page, 0)).toBeVisible();

    await page.locator("[id='primary-menu']").click();
    await expect(responsiveVerticalMenuNthSecondaryItem(page, 0)).toBeVisible();

    await checkAccessibility(page);
  });

  test(`default menu with primary, secondary and tertiary menus active`, async ({
    mount,
    page,
  }) => {
    await mount(<ResponsiveVerticalMenuDefaultComponent />);

    await expect(responsiveVerticalMenuLauncher(page)).toBeVisible();
    await responsiveVerticalMenuLauncher(page).click();
    await expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
    await expect(responsiveVerticalMenuPrimary(page)).toBeDefined();
    await expect(responsiveVerticalMenuNthPrimaryItem(page, 0)).toBeVisible();

    await page.locator("[id='primary-menu']").click();
    await expect(responsiveVerticalMenuNthSecondaryItem(page, 0)).toBeVisible();
    await page.locator("[id='secondary-menu']").click();
    await expect(page.locator("[id='tertiary-menu']")).toBeVisible();

    await checkAccessibility(page);
  });

  test(`responsive menu`, async ({ mount, page }) => {
    await mount(
      <ResponsiveVerticalMenuDefaultComponent responsiveBreakpoint={3200} />,
    );

    await expect(responsiveVerticalMenuLauncher(page)).toBeVisible();
    await responsiveVerticalMenuLauncher(page).click();
    await expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
    await expect(responsiveVerticalMenuPrimary(page)).toBeDefined();

    await page.locator("[id='primary-menu']").click();
    await page.locator("[id='secondary-menu']").click();
    await expect(page.locator("[id='tertiary-menu']")).toBeVisible();

    await checkAccessibility(page);
  });
});

/* eslint-disable no-await-in-loop */
import React from "react";
import { test, expect } from "../../../../playwright/helpers/base-test";

import {
  ResponsiveVerticalMenuDefaultComponent,
  ResponsiveVerticalMenuDisabledIconSpacing,
  ResponsiveVerticalMenuIconMixture,
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
  // responsiveVerticalMenuSecondary,
} from "../../../../playwright/components/vertical-menu/responsive-vertical-menu";

test.describe("functional tests", () => {
  [200, 350, 632].forEach((width) => {
    test(`should render with width of ${width}`, async ({ mount, page }) => {
      await mount(
        <ResponsiveVerticalMenuDefaultComponent width={`${width}px`} />,
      );
      await expect(responsiveVerticalMenuLauncher(page)).toBeVisible();
      await responsiveVerticalMenuLauncher(page).click();
      await expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
      await expect(responsiveVerticalMenuPrimary(page)).toBeDefined();

      await assertCssValueIsApproximately(
        responsiveVerticalMenuPrimary(page),
        "width",
        width,
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
    await expect(clientOffsetIconlessMenuItem).toBeGreaterThanOrEqual(69);
    await expect(clientOffsetIconlessMenuItem).toBeLessThanOrEqual(73);

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

    await expect(clientOffsetSecondaryIconMenuItem).toBeGreaterThanOrEqual(438);
    await expect(clientOffsetSecondaryIconMenuItem).toBeLessThanOrEqual(442);
    // expect extra 40px offset for icon
    await expect(clientOffsetSecondaryIconlessMenuItem).toBeGreaterThanOrEqual(
      478,
    );
    await expect(clientOffsetSecondaryIconlessMenuItem).toBeLessThanOrEqual(
      482,
    );
    await expect(
      clientOffsetSecondaryCustomIconMenuItem,
    ).toBeGreaterThanOrEqual(438);
    await expect(clientOffsetSecondaryCustomIconMenuItem).toBeLessThanOrEqual(
      442,
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

    await expect(clientOffsetTertiaryIconMenuItem).toBeGreaterThanOrEqual(458);
    await expect(clientOffsetTertiaryIconMenuItem).toBeLessThanOrEqual(462);
    // expect extra 40px offset for icon
    await expect(clientOffsetTertiaryIconlessMenuItem).toBeGreaterThanOrEqual(
      498,
    );
    await expect(clientOffsetTertiaryIconlessMenuItem).toBeLessThanOrEqual(502);

    await expect(clientOffsetTertiaryCustomIconMenuItem).toBeGreaterThanOrEqual(
      458,
    );
    await expect(clientOffsetTertiaryCustomIconMenuItem).toBeLessThanOrEqual(
      462,
    );
  });

  (
    [
      [true, 33],
      [false, 69],
    ] as const
  ).forEach(([value, expectedX]) => {
    test(`should render with correct icon spacing when disableIconSpacing is ${value}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <ResponsiveVerticalMenuDisabledIconSpacing
          disableIconSpacing={value}
        />,
      );

      await expect(responsiveVerticalMenuLauncher(page)).toBeVisible();
      await responsiveVerticalMenuLauncher(page).click();
      await expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
      await expect(responsiveVerticalMenuPrimary(page)).toBeDefined();

      const primaryMenuItem = await page.getByText("Primary Menu Item 1");
      const clientOffsetPrimaryMenuItem = await primaryMenuItem.evaluate(
        (el) => {
          return el.getBoundingClientRect().x;
        },
      );

      await expect(clientOffsetPrimaryMenuItem).toBeGreaterThanOrEqual(
        expectedX - 2,
      );
      await expect(clientOffsetPrimaryMenuItem).toBeLessThanOrEqual(
        expectedX + 2,
      );
    });
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

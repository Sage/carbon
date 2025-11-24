import React from "react";
import { test, expect } from "../../../../playwright/helpers/base-test";

import {
  ResponsiveVerticalMenuDefaultComponent,
  ResponsiveVerticalMenuIconMixture,
  WithDifferentDepthsAsLastItem,
  WithLongList,
  WithButtonAndLinkActionItems,
  WithSiblingControl,
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
      expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
      expect(responsiveVerticalMenuPrimary(page)).toBeDefined();

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
      expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
      expect(responsiveVerticalMenuPrimary(page)).toBeDefined();

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
    expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
    expect(responsiveVerticalMenuPrimary(page)).toBeDefined();

    const iconMenuItem = page.getByText("Primary Icon");
    const iconlessMenuItem = page.getByText("Primary No Icon");
    const customIconMenuItem = page.getByText("Primary Custom Icon");

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
    expect(clientOffsetIconMenuItem).toBeGreaterThanOrEqual(29);
    expect(clientOffsetIconMenuItem).toBeLessThanOrEqual(33);
    // expect extra 40px offset for icon
    expect(clientOffsetIconlessMenuItem).toBeGreaterThanOrEqual(29);
    expect(clientOffsetIconlessMenuItem).toBeLessThanOrEqual(33);

    expect(clientOffsetCustomIconMenuItem).toBeGreaterThanOrEqual(29);
    expect(clientOffsetCustomIconMenuItem).toBeLessThanOrEqual(33);

    await page.locator("[id='secondary-menu-toggle']").click();
    expect(responsiveVerticalMenuSecondary(page)).toBeDefined();

    const secondaryIconMenuItem = page.getByText("Secondary Icon");
    const secondaryIconlessMenuItem = page.getByText("Secondary No Icon");
    const secondaryCustomIconMenuItem = page.getByText("Secondary Custom Icon");

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

    expect(clientOffsetSecondaryIconMenuItem).toBeGreaterThanOrEqual(404);
    expect(clientOffsetSecondaryIconMenuItem).toBeLessThanOrEqual(408);

    expect(clientOffsetSecondaryIconlessMenuItem).toBeGreaterThanOrEqual(404);
    expect(clientOffsetSecondaryIconlessMenuItem).toBeLessThanOrEqual(408);
    expect(clientOffsetSecondaryCustomIconMenuItem).toBeGreaterThanOrEqual(404);
    expect(clientOffsetSecondaryCustomIconMenuItem).toBeLessThanOrEqual(408);

    await page.locator("[id='tertiary-menu-toggle']").click();
    await expect(responsiveVerticalMenuNthSecondaryItem(page, 0)).toBeVisible();

    const tertiaryIconMenuItem = page.getByText("Tertiary Icon");
    const tertiaryIconlessMenuItem = page.getByText("Tertiary No Icon");
    const tertiaryCustomIconMenuItem = page.getByText("Tertiary Custom Icon");

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

    expect(clientOffsetTertiaryIconMenuItem).toBeGreaterThanOrEqual(437);
    expect(clientOffsetTertiaryIconMenuItem).toBeLessThanOrEqual(441);

    expect(clientOffsetTertiaryIconlessMenuItem).toBeGreaterThanOrEqual(437);
    expect(clientOffsetTertiaryIconlessMenuItem).toBeLessThanOrEqual(441);

    expect(clientOffsetTertiaryCustomIconMenuItem).toBeGreaterThanOrEqual(437);
    expect(clientOffsetTertiaryCustomIconMenuItem).toBeLessThanOrEqual(441);
  });
});

test.describe("when responsive vertical menu item renders as an anchor", () => {
  test("should close menu when click is pressed", async ({ mount, page }) => {
    await mount(<WithButtonAndLinkActionItems />);

    await responsiveVerticalMenuLauncher(page).click();
    await expect(responsiveVerticalMenuPrimary(page)).toBeVisible();

    const linkItem = page.getByRole("link", { name: "Item one" });
    await linkItem.click();

    await expect(responsiveVerticalMenuPrimary(page)).toBeHidden();
  });

  test("should close menu when enter key is pressed", async ({
    mount,
    page,
  }) => {
    await mount(<WithButtonAndLinkActionItems />);

    await responsiveVerticalMenuLauncher(page).click();
    await expect(responsiveVerticalMenuPrimary(page)).toBeVisible();

    const linkItem = page.getByRole("link", { name: "Item one" });
    await linkItem.focus();
    await page.keyboard.press("Enter");

    await expect(responsiveVerticalMenuPrimary(page)).toBeHidden();
  });

  test("should keep menu open when space key is pressed", async ({
    mount,
    page,
  }) => {
    await mount(<WithButtonAndLinkActionItems />);

    await responsiveVerticalMenuLauncher(page).click();
    await expect(responsiveVerticalMenuPrimary(page)).toBeVisible();

    const linkItem = page.getByRole("link", { name: "Item one" });
    await linkItem.focus();
    await page.keyboard.press("Space");

    await expect(responsiveVerticalMenuPrimary(page)).toBeVisible();
  });

  test("background controls cannot be interacted with while menu is open", async ({
    mount,
    page,
  }) => {
    await mount(<WithSiblingControl />);

    const launcherButton = page.getByRole("button", {
      name: /Product menu launcher/,
    });
    await launcherButton.click();

    const menuItem = page.getByRole("button", {
      name: /Primary Menu With Children/,
    });
    await menuItem.waitFor();

    const outsideCheckbox = page.getByRole("checkbox");

    const { x, y } = (await outsideCheckbox.boundingBox()) as {
      x: number;
      y: number;
    };
    await page.mouse.click(x, y);

    await expect(outsideCheckbox).not.toBeChecked();
  });
});

test.describe("when responsive vertical menu item renders as a button", () => {
  test("should close menu when click is pressed", async ({ mount, page }) => {
    await mount(<WithButtonAndLinkActionItems />);

    await responsiveVerticalMenuLauncher(page).click();
    await expect(responsiveVerticalMenuPrimary(page)).toBeVisible();

    const buttonItem = page.getByRole("button", { name: "Item two" });
    await buttonItem.click();

    await expect(responsiveVerticalMenuPrimary(page)).toBeHidden();
  });

  test("should close menu when enter key is pressed", async ({
    mount,
    page,
  }) => {
    await mount(<WithButtonAndLinkActionItems />);

    await responsiveVerticalMenuLauncher(page).click();
    await expect(responsiveVerticalMenuPrimary(page)).toBeVisible();

    const buttonItem = page.getByRole("button", { name: "Item two" });
    await buttonItem.focus();
    await page.keyboard.press("Enter");

    await expect(responsiveVerticalMenuPrimary(page)).toBeHidden();
  });

  test("should close menu when space key is pressed", async ({
    mount,
    page,
  }) => {
    await mount(<WithButtonAndLinkActionItems />);

    await responsiveVerticalMenuLauncher(page).click();
    await expect(responsiveVerticalMenuPrimary(page)).toBeVisible();

    const buttonItem = page.getByRole("button", { name: "Item two" });
    await buttonItem.focus();
    await page.keyboard.press("Space");

    await expect(responsiveVerticalMenuPrimary(page)).toBeHidden();
  });
});

test.describe("keyboard navigation tests", () => {
  test("should prevent any scroll when Space is pressed on a menu item rendered as a link", async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({
      width: 700,
      height: 300,
    });
    await mount(<WithLongList />);

    await responsiveVerticalMenuLauncher(page).click();

    await page.keyboard.press("Tab");

    const firstMenuItem = page.getByRole("link", { name: "Item One" });
    await expect(firstMenuItem).toBeFocused();

    await page.keyboard.press("Space");

    // we have to use a slight delay here as the assertion fires just before the scroll occurs
    // without it, it asserts it is in the viewport before any scrolling can occur making the test redundant
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(1000);
    await expect(firstMenuItem).toBeInViewport();
  });

  test("should navigate to the next parent item when last menu item is depth 2", async ({
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

    const nextPrimaryMenuItem = page.getByRole("button", {
      name: "With Level 3",
    });
    await expect(nextPrimaryMenuItem).toBeFocused();
  });

  test("should navigate to the next parent item when last menu item is depth 3", async ({
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

    const nextPrimaryMenuItem = page.getByRole("button", {
      name: "With Level 4",
    });
    await expect(nextPrimaryMenuItem).toBeFocused();
  });

  test("should navigate to the next parent item when last menu item is depth 4", async ({
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

    const nextPrimaryMenuItem = page.getByRole("button", {
      name: "Last Primary Menu Item",
    });
    await expect(nextPrimaryMenuItem).toBeFocused();
  });

  test("should close the menu and focus the next element in the tab order when tabbing out of the menu", async ({
    mount,
    page,
  }) => {
    await mount(<WithSiblingControl />);

    await responsiveVerticalMenuLauncher(page).click();

    const lastItem = page.getByRole("button", { name: "Primary Menu Item" });
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(lastItem).toBeFocused();

    // press tab to move focus out of the menu
    await page.keyboard.press("Tab");
    const externalInput = page.getByRole("checkbox");
    await expect(externalInput).toBeFocused();
  });

  test("should go to last secondary menu item when Shift+Tab is pressed on the next parent item", async ({
    mount,
    page,
  }) => {
    await mount(<WithDifferentDepthsAsLastItem />);

    await responsiveVerticalMenuLauncher(page).click();

    const primaryMenuItem = page.getByRole("button", { name: "With Level 2" });
    const nextPrimaryMenuItem = page.getByRole("button", {
      name: "With Level 3",
    });

    await primaryMenuItem.click(); // open primary menu
    const secondaryMenuItem = page.getByRole("link", {
      name: "Level 2 As Last Item",
    });
    await expect(secondaryMenuItem).toBeVisible();

    await nextPrimaryMenuItem.focus();

    await page.keyboard.press("Shift+Tab");
    await expect(secondaryMenuItem).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(primaryMenuItem).toBeFocused();
  });

  test("should go to last tertiary menu item when Shift+Tab is pressed on the next parent item", async ({
    mount,
    page,
  }) => {
    await mount(<WithDifferentDepthsAsLastItem />);

    await responsiveVerticalMenuLauncher(page).click();

    const primaryMenuItem = page.getByRole("button", { name: "With Level 3" });
    const nextPrimaryMenuItem = page.getByRole("button", {
      name: "With Level 4",
    });

    await primaryMenuItem.click(); // open primary menu
    const secondaryMenuItem = page.getByRole("button", {
      name: "Level 2 Parent",
    });
    await secondaryMenuItem.click(); // open secondary menu
    const tertiaryMenuItem = page.getByRole("link", {
      name: "Level 3 As Last Item",
    });
    await expect(tertiaryMenuItem).toBeVisible();

    await nextPrimaryMenuItem.focus();

    await page.keyboard.press("Shift+Tab");
    await expect(tertiaryMenuItem).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(secondaryMenuItem).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(primaryMenuItem).toBeFocused();
  });

  test("should go to last level 4 item when Shift+Tab is pressed on the next parent item", async ({
    mount,
    page,
  }) => {
    await mount(<WithDifferentDepthsAsLastItem />);

    await responsiveVerticalMenuLauncher(page).click();

    const primaryMenuItem = page.getByRole("button", { name: "With Level 4" });
    const nextPrimaryMenuItem = page.getByRole("button", {
      name: "Last Primary Menu Item",
    });

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

    await nextPrimaryMenuItem.focus();

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
  test("default menu closed", async ({ mount, page }) => {
    await mount(<ResponsiveVerticalMenuDefaultComponent />);

    await expect(responsiveVerticalMenuLauncher(page)).toBeVisible();
    await checkAccessibility(page);
  });

  test(`default menu with only primary menu active`, async ({
    mount,
    page,
  }) => {
    await mount(<ResponsiveVerticalMenuDefaultComponent />);

    await expect(responsiveVerticalMenuLauncher(page)).toBeVisible();
    await responsiveVerticalMenuLauncher(page).click();
    expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
    expect(responsiveVerticalMenuPrimary(page)).toBeDefined();

    await checkAccessibility(page);
  });

  test(`default menu with primary and secondary menus active`, async ({
    mount,
    page,
  }) => {
    await mount(<ResponsiveVerticalMenuDefaultComponent />);

    await expect(responsiveVerticalMenuLauncher(page)).toBeVisible();
    await responsiveVerticalMenuLauncher(page).click();
    expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
    expect(responsiveVerticalMenuPrimary(page)).toBeDefined();
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
    expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
    expect(responsiveVerticalMenuPrimary(page)).toBeDefined();
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
    expect(responsiveVerticalMenuWrapper(page)).toBeDefined();
    expect(responsiveVerticalMenuPrimary(page)).toBeDefined();

    await page.locator("[id='primary-menu']").click();
    await page.locator("[id='secondary-menu']").click();
    await expect(page.locator("[id='tertiary-menu']")).toBeVisible();

    // Wait for fade in animation to complete before scanning
    // to ensure colours aren't slightly transparent
    const modal = page.getByTestId("modal");
    await expect(modal).toHaveAttribute("data-state", "open");

    await checkAccessibility(page);
  });

  test("responsive menu closed", async ({ mount, page }) => {
    await mount(
      <ResponsiveVerticalMenuDefaultComponent responsiveBreakpoint={3200} />,
    );

    await expect(responsiveVerticalMenuLauncher(page)).toBeVisible();
    await checkAccessibility(page);
  });
});

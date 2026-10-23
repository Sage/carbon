import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { MenuDividerProps } from ".";
import {
  submenuBlock,
  submenu,
  menuItem,
} from "../../../playwright/components/menu/index";
import {
  searchDefaultInput,
  searchButton,
} from "../../../playwright/components/search/index";
import {
  getComponent,
  closeIconButton,
} from "../../../playwright/components/index";
import {
  continuePressingSHIFTTAB,
  checkAccessibility,
  waitForAnimationEnd,
} from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  MenuComponent,
  MenuComponentWithSubmenuNodes,
  MenuComponentScrollable,
  MenuComponentSearch,
  MenuWithChildrenUpdating,
  MenuComponentFullScreen,
  MenuFullScreenBackgroundScrollTest,
  MenuComponentItems,
  MenuFullScreenWithSearchButton,
  MenuComponentScrollableParent,
  MenuComponentWithIcon,
  ClosedMenuFullScreenWithButtons,
  MenuDividerComponent,
  MenuSegmentTitleComponentWithAdditionalMenuItem,
  MenuWithSegmentTitle,
} from "./component.test-pw";

test.describe("Prop tests for Menu component", () => {
  test("should verify the Search component is focusable by pressing the 'ArrowDown' and 'ArrowUp' keys", async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentSearch />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    const search = page.getByRole("searchbox");
    await expect(search).toBeVisible();

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await expect(search).toBeFocused();

    await page.keyboard.press("ArrowDown");
    await expect(
      page.getByRole("link", { name: "Item Submenu Two" }),
    ).toBeFocused();

    await page.keyboard.press("ArrowUp");
    await expect(search).toBeFocused();
  });

  test(`should verify submenu is not closed when Enter key is pressed on search component`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentSearch />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await page.keyboard.press("ArrowDown");
    await searchDefaultInput(page).fill("FooBar");
    await page.keyboard.press("Enter");
    const subMenuBlock = submenuBlock(page).first().locator("li").first();
    await expect(subMenuBlock).toBeVisible();
  });

  test(`should render with Item target ${CHARACTERS.STANDARD}`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentItems href="#" target={CHARACTERS.STANDARD} />);

    const link = page.getByRole("link").first();
    await expect(link).toHaveAttribute("target", CHARACTERS.STANDARD);
  });

  test(`should render with Menu Item ariaLabel set to ${CHARACTERS.STANDARD}`, async ({
    mount,
    page,
  }) => {
    await mount(
      <MenuComponentItems href="#" ariaLabel={CHARACTERS.STANDARD} />,
    );

    const link = page.getByRole("link").first();
    await expect(link).toHaveAttribute("aria-label", CHARACTERS.STANDARD);
  });

  test("when a Menu Fullscreen is opened and then closed, the call to action element should be focused", async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentFullScreen open={false} />);

    const item = page.getByRole("button", { name: "Menu" });
    await item.click();
    const fullscreen = getComponent(page, "menu-fullscreen");
    await waitForAnimationEnd(fullscreen);
    const closeButton = page.getByLabel("Close");
    await closeButton.click();
    await expect(item).toBeFocused();
  });

  test("when Menu Fullscreen is open on render, then closed, opened and then closed again, the call to action element should be focused", async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentFullScreen />);

    const fullscreen = getComponent(page, "menu-fullscreen");
    await waitForAnimationEnd(fullscreen);
    await expect(fullscreen).toBeVisible();
    const closeButton = page.getByLabel("Close");
    await closeButton.click();

    const item = page.getByRole("button").filter({ hasText: "Menu" });
    await expect(item).not.toBeFocused();
    await expect(fullscreen).toBeHidden();

    await item.click();
    await waitForAnimationEnd(fullscreen);
    await expect(fullscreen).toBeVisible();
    await closeButton.click();
    await expect(item).toBeFocused();
  });

  test(`should render Scrollable Block with parent`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentScrollableParent />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    const scrollBlockParent = getComponent(page, "scrollable-block-parent");
    await expect(scrollBlockParent).toHaveCount(1);
  });

  test(`should verify that Menu Fullscreen has no effect on the tab order when isOpen prop is false`, async ({
    mount,
    page,
  }) => {
    await mount(<ClosedMenuFullScreenWithButtons />);

    await page.keyboard.press("Tab");
    const button1 = page.getByRole("button").nth(0);
    await expect(button1).toBeFocused();
    await page.keyboard.press("Tab");
    const button2 = page.getByRole("button").nth(1);
    await expect(button2).toBeFocused();
  });

  test(`should focus the next menu item on tab press when the current item has a Search input with searchButton but no value`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount(<MenuFullScreenWithSearchButton searchValue="" />);

    const item1 = menuItem(page).first().locator("a");
    await item1.focus();
    await page.keyboard.press("Tab");
    const searchInput = searchDefaultInput(page);
    await expect(searchInput).toBeFocused();
    await page.keyboard.press("Tab");
    const button = searchButton(page);
    await expect(button).toBeFocused();
    await page.keyboard.press("Tab");
    const item2 = menuItem(page).last().locator("a");
    await expect(item2).toBeFocused();
  });

  test(`should focus the search button on tab press when the current item has a Search input with searchButton and has a value`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount(<MenuFullScreenWithSearchButton searchValue="foo" />);

    const item1 = menuItem(page).first().locator("a");
    await item1.focus();
    await page.keyboard.press("Tab");
    const searchInput = searchDefaultInput(page);
    await expect(searchInput).toBeFocused();
    await page.keyboard.press("Tab");
    const button = searchButton(page);
    await expect(button).toBeFocused();
    await expect(button).toHaveCSS(
      "box-shadow",
      "rgb(0, 0, 0) 0px 0px 0px 2px, rgb(255, 181, 0) 0px 0px 0px 4px",
    );
    await page.keyboard.press("Tab");
    const item2 = menuItem(page).last().locator("a");
    await expect(item2).toBeFocused();
  });
});

test.describe("Event tests for Menu component", () => {
  test(`should have correct keyboard navigation order when children of submenu update`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuWithChildrenUpdating />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    const subMenuBlock = submenuBlock(page).locator("li");
    await expect(subMenuBlock).toHaveCount(4);
    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowDown");
    const focusedElement1 = page.locator("*:focus");
    await expect(focusedElement1).toHaveText("Apple");
    await page.keyboard.press("ArrowDown");
    const focusedElement2 = page.locator("*:focus");
    await expect(focusedElement2).toHaveText("Banana");
    await page.keyboard.press("ArrowDown");
    const focusedElement3 = page.locator("*:focus");
    await expect(focusedElement3).toHaveText("Carrot");
    await page.keyboard.press("ArrowDown");
    const focusedElement4 = page.locator("*:focus");
    await expect(focusedElement4).toHaveText("Broccoli");
    await page.keyboard.press("ArrowUp");
    const focusedElement5 = page.locator("*:focus");
    await expect(focusedElement5).toHaveText("Carrot");
    await page.keyboard.press("ArrowUp");
    const focusedElement6 = page.locator("*:focus");
    await expect(focusedElement6).toHaveText("Banana");
    await page.keyboard.press("ArrowUp");
    const focusedElement7 = page.locator("*:focus");
    await expect(focusedElement7).toHaveText("Apple");
  });

  test(`should render with the expected border radius styling on the last MenuItem in a segment block when it is not the last menu item in the whole submenu`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuSegmentTitleComponentWithAdditionalMenuItem />);

    const subMenu = submenu(page).nth(1);
    await subMenu.hover();
    const lastMenuItemInLastSegment = page.getByRole("link", {
      name: "Last Segment Child",
    });
    await lastMenuItemInLastSegment.focus();
    await expect(lastMenuItemInLastSegment).toHaveCSS("border-radius", "0px");

    const lastMenuItem = submenu(page).locator("a").last();
    await lastMenuItem.focus();
    await expect(lastMenuItem).toHaveCSS("border-radius", "0px 0px 8px 8px");
  });

  test(`should verify that tabbing forward through the menu and back to the start should not make the background scroll to the bottom`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuFullScreenBackgroundScrollTest />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const closeIcon = closeIconButton(page);
    await expect(closeIcon).toBeFocused();

    const offscreenText = page.getByText("I should not be scrolled into view");
    await expect(offscreenText).not.toBeInViewport();
  });

  test(`should verify that tabbing backward through the menu and back to the start should not make the background scroll to the bottom`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuFullScreenBackgroundScrollTest />);

    await continuePressingSHIFTTAB(page, 3);

    const closeIcon = closeIconButton(page);
    await expect(closeIcon).toBeFocused();

    const offscreenText = page.getByText("I should not be scrolled into view");
    await expect(offscreenText).not.toBeInViewport();
  });

  test("submenu items in a scrollable block scroll into view when focused", async ({
    page,
    mount,
  }) => {
    await mount(<MenuComponentScrollable />);

    const menuItemThree = page.getByRole("button", { name: "Menu Item Three" });
    await menuItemThree.press("ArrowDown");

    const submenuItem = page.getByRole("link", { name: "Item Submenu One" });
    await submenuItem.waitFor();

    const lastSubmenuItem = page.getByRole("link", {
      name: "Item Submenu Twelve",
    });
    await lastSubmenuItem.focus();

    await expect(lastSubmenuItem).toBeInViewport();
  });
});

test.describe("Accessibility tests for Menu component", () => {
  test(`should pass accessibility tests for default Menu`, async ({
    mount,
    page,
  }) => {
    await mount(
      <>
        <MenuComponent />
        <MenuComponent variant="black" />
      </>,
    );

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests when submenu is a node`, async ({
    mount,
    page,
  }) => {
    await mount(
      <>
        <MenuComponentWithSubmenuNodes />
        <MenuComponentWithSubmenuNodes variant="black" />
      </>,
    );

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests when submenu is expanded`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponent />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    await checkAccessibility(page);
  });

  test(`should pass accessibility tests when submenu is expanded and variant is 'black'`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponent variant="black" />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    await checkAccessibility(page);
  });

  test(`should pass accessibility tests when search component is focused`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentSearch />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    await expect(page.getByRole("searchbox")).toBeFocused();
    await checkAccessibility(page);
  });

  test(`should pass accessibility tests when search component is focused and variant is 'black'`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentSearch variant="black" />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    await expect(page.getByRole("searchbox")).toBeFocused();
    await checkAccessibility(page);
  });

  (["default", "large"] as MenuDividerProps["size"][]).forEach((size) => {
    test(`should pass accessibility tests when divider is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuDividerComponent size={size} />);

      const subMenu = submenu(page).first();
      await subMenu.hover();
      await checkAccessibility(page);
    });
  });

  [
    CHARACTERS.STANDARD,
    CHARACTERS.DIACRITICS,
    CHARACTERS.SPECIALCHARACTERS,
  ].forEach((text) => {
    test(`should pass accessibility tests when submenu item text is ${text}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponentItems submenu={text} />);

      await checkAccessibility(page);
    });
  });

  test(`should pass accessibility tests for Menu with parent item`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentScrollableParent />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for Menu with icon`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentWithIcon />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for submenu with Segment Title`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuWithSegmentTitle />);

    await page.getByRole("button", { name: "Submenu" }).hover();
    await checkAccessibility(page);
  });

  test(`should pass accessibility tests for black menu variant submenu with Segment Title`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuWithSegmentTitle variant="black" />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    await checkAccessibility(page);
  });
});

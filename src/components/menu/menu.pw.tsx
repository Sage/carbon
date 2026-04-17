import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import { Menu, MenuItem, MenuWithChildren, MenuDividerProps } from ".";
import Box from "../box";
import {
  submenuBlock,
  innerMenu,
  submenu,
  scrollBlock,
  lastSubmenuElement,
  fullscreenMenu,
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
  continuePressingTAB,
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
  MenuComponentFullScreenSimple,
  MenuFullScreenBackgroundScrollTest,
  MenuComponentItems,
  MenuFullScreenWithSearchButton,
  MenuComponentScrollableParent,
  MenuComponentWithIcon,
  MenuComponentButtonIcon,
  ClosedMenuFullScreenWithButtons,
  MenuDividerComponent,
  MenuComponentScrollableWithSearch,
  MenuSegmentTitleComponentWithAdditionalMenuItem,
  MenuComponentFullScreenWithLongSubmenuText,
  MenuItemWithPopoverContainerChild,
  SubmenuMaxWidth,
} from "./component.test-pw";

const span = "span";
const div = "div";

test.describe("Prop tests for Menu component", () => {
  test(`should verify number and type of elements in submenu`, async ({
    mount,
    page,
  }) => {
    const position = [1, 2, 4, 5] as const;
    await mount(<MenuComponent />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    const subMenuBlock = submenuBlock(page).first().locator("li");
    await expect(subMenuBlock).toHaveCount(5);
    for (let i = 0; i < position.length; i++) {
      await expect(innerMenu(page, position[i], span).first()).toHaveAttribute(
        "data-component",
        "link",
      );
    }
    const menuItemDivider = innerMenu(page, 3, div).first();
    await expect(menuItemDivider).toHaveAttribute(
      "data-component",
      "menu-divider",
    );
  });

  (
    [
      ["ArrowDown", 1],
      ["ArrowUp", 3],
    ] as [string, number][]
  ).forEach(([key, tabs]) => {
    test(`should verify the Search component is focusable by pressing the ${key} key`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponentSearch />);

      await page.keyboard.press("Tab");
      await page.keyboard.press("Enter");
      await continuePressingTAB(page, tabs);
      await page.keyboard.press(key);
      await expect(searchDefaultInput(page)).toBeFocused();
    });
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

  (
    [
      ["selected", true, "rgb(230, 235, 237)"],
      ["not selected", false, "rgb(255, 255, 255)"],
    ] as [string, MenuWithChildren["selected"], string][]
  ).forEach(([state, boolVal, color]) => {
    test(`should render with first Menu Item ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponentItems selected={boolVal} />);

      const subMenu = submenu(page).first().locator("span").first();
      await expect(subMenu).toHaveCSS("background-color", color);
    });
  });

  test(`should render with Item target ${CHARACTERS.STANDARD}`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentItems target={CHARACTERS.STANDARD} />);

    const item = menuItem(page).first().locator("button");
    await expect(item).toHaveAttribute("target", CHARACTERS.STANDARD);
  });

  (
    [
      [true, 32],
      [false, 16],
    ] as [MenuWithChildren["showDropdownArrow"], number][]
  ).forEach(([boolVal, padding]) => {
    test(`should render with padding of ${padding}px on menu item when showDropdownArrow prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponentItems showDropdownArrow={boolVal} />);

      const subMenu = submenu(page).first().locator("button");
      await expect(subMenu).toHaveCSS("padding-right", `${padding}px`);
    });
  });

  test(`should render with Menu Item ariaLabel set to ${CHARACTERS.STANDARD}`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentItems ariaLabel={CHARACTERS.STANDARD} />);

    const subMenu = submenu(page).first().locator("button");
    await expect(subMenu).toHaveAttribute("aria-label", CHARACTERS.STANDARD);
  });

  test("when a Menu Fullscreen is opened and then closed, the call to action element should be focused", async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentFullScreenSimple open={false} />);

    await page.setViewportSize({ width: 1200, height: 800 });
    const item = page.getByRole("button").filter({ hasText: "Menu" });
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
    await mount(<MenuComponentFullScreenSimple />);

    await page.setViewportSize({ width: 1200, height: 800 });
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

  test(`when the menu item contains a very long text, the text is wrapped`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 300, height: 800 });
    await mount(<MenuComponentFullScreenWithLongSubmenuText />);

    const item = menuItem(page).first();
    await item.click();
    const fullscreen = getComponent(page, "menu-fullscreen").first();
    await waitForAnimationEnd(fullscreen);

    const fullSubmenuItem = fullscreenMenu(page, 3)
      .locator("li")
      .locator("a")
      .first();

    const fullSubmenuItemTextWrap = await fullSubmenuItem.evaluate(
      (element) => {
        const style = window.getComputedStyle(element);
        return style.getPropertyValue("text-wrap");
      },
    );

    const fullSubmenuItemHeight = await fullSubmenuItem.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return style.getPropertyValue("height");
    });

    expect(fullSubmenuItemTextWrap).toEqual("wrap");
    expect(fullSubmenuItemHeight).not.toEqual("40px");

    const fullMenuItemWrapper = fullscreenMenu(page, 3).first();

    const fullMenuItemWrapperTextWrap = await fullMenuItemWrapper.evaluate(
      (element) => {
        const style = window.getComputedStyle(element);
        return style.getPropertyValue("text-wrap");
      },
    );

    const fullMenuItemWrapperHeight = await fullMenuItemWrapper.evaluate(
      (element) => {
        const style = window.getComputedStyle(element);
        return style.getPropertyValue("height");
      },
    );

    expect(fullMenuItemWrapperTextWrap).toEqual("wrap");
    expect(fullMenuItemWrapperHeight).not.toEqual("40px");

    const fullMenuItem = fullscreenMenu(page, 3)
      .locator("span")
      .locator("button")
      .first();

    const fullMenuItemTextWrap = await fullMenuItem.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return style.getPropertyValue("text-wrap");
    });

    const fullMenuItemHeight = await fullMenuItem.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return style.getPropertyValue("height");
    });

    expect(fullMenuItemTextWrap).toEqual("wrap");
    expect(fullMenuItemHeight).not.toEqual("40px");
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
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
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

  test(`renders last MenuItem in a scrollable block without rounded corner, if there is no overflow in the block`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentScrollableWithSearch />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    const searchInput = searchDefaultInput(page);
    await searchInput.fill("app");
    const scrollableBlock = scrollBlock(page);

    await expect(scrollableBlock).toHaveCSS("border-radius", "0px 0px 0px 8px");

    const scrollableItem = scrollBlock(page).locator("a").last();

    await expect(scrollableItem).toHaveCSS("border-radius", "0px");
  });

  test(`renders last MenuItem in a scrollable block with rounded corner, if there is overflow within the block`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentScrollableWithSearch />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    const searchInput = searchDefaultInput(page);
    await searchInput.fill("r");
    const scrollableBlock = scrollBlock(page);

    await expect(scrollableBlock).toHaveCSS("border-radius", "0px 0px 0px 8px");

    const scrollableItem = scrollBlock(page).locator("a").last();

    await expect(scrollableItem).toHaveCSS("border-radius", "0px 0px 0px 8px");
  });

  test(`should verify that tabbing forward through the menu and back to the start should not make the background scroll to the bottom`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuFullScreenBackgroundScrollTest />);

    await continuePressingTAB(page, 4);

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
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount(<MenuComponentScrollable />);

    const menuItemThree = page
      .getByRole("listitem")
      .filter({ hasText: "Menu Item Three" })
      .first();
    await menuItemThree.getByRole("button").press("ArrowDown");

    const submenuList = menuItemThree.getByRole("list");
    await submenuList.waitFor();

    const lastSubmenuItem = menuItemThree.getByRole("listitem").last();
    await lastSubmenuItem.getByRole("link").focus();

    await expect(lastSubmenuItem).toBeInViewport();
  });

  test("should render the menu with the expected styling when menu item has a PopoverContainer child with renderOpenComponent passed", async ({
    mount,
    page,
  }) => {
    await mount(<MenuItemWithPopoverContainerChild />);

    const menuItemAnchor = menuItem(page).first().locator("a");
    const buttonChild = menuItemAnchor.locator("button");

    await expect(menuItemAnchor).toHaveCSS("height", "40px");
    await expect(buttonChild).toHaveCSS("height", "40px");
  });

  test("should render the menu with the expected hover styling when menu item has a PopoverContainer child with renderOpenComponent passed", async ({
    mount,
    page,
  }) => {
    await mount(<MenuItemWithPopoverContainerChild />);

    const popoverContainerButton = page.getByRole("button", {
      name: "notification",
    });
    await popoverContainerButton.hover();

    await expect(popoverContainerButton).toHaveCSS("border-radius", "0px");
    await expect(popoverContainerButton).toHaveCSS(
      "background-color",
      "rgba(0, 0, 0, 0)",
    );
  });

  test(`should verify that submenu item text wraps when it would overflow the container and submenuMaxWidth is set`, async ({
    mount,
    page,
  }) => {
    await mount(<SubmenuMaxWidth />);

    const submenuElement = submenu(page).first();
    await submenuElement.hover();
    const lastItem = lastSubmenuElement(page, "li");
    const submenuBlockElement = submenuBlock(page).first();

    const cssItemHeight = await lastItem.evaluate((el) =>
      window.getComputedStyle(el).getPropertyValue("height"),
    );

    await expect(submenuBlockElement).toHaveCSS("max-width", "300px");
    expect(parseInt(cssItemHeight)).toBeGreaterThan(40);
  });
});

test.describe("Accessibility tests for Menu component", () => {
  test(`should pass accessibility tests for default Menu`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponent />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests when submenu's are passed as a node`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentWithSubmenuNodes />);

    await checkAccessibility(page);
  });

  test(`should pass accessibility tests when expanded`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponent />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    await checkAccessibility(page);
  });

  // We can allow the accessibility checks with exception to the heading-order violation.
  test(`should pass accessibility tests when variant is light and search component is focused`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentSearch menuType="light" />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    const subMenu = getComponent(page, "submenu").first();
    await waitForAnimationEnd(subMenu);
    await checkAccessibility(page, undefined, "heading-order");
  });

  test(`should pass accessibility tests when variant is black and search component is focused`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentSearch menuType="black" />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    const subMenu = getComponent(page, "submenu").first();
    await waitForAnimationEnd(subMenu);
    await checkAccessibility(page, undefined, "heading-order");
  });

  test(`should pass accessibility tests when a submenu has a long label`, async ({
    mount,
    page,
  }) => {
    await mount(
      <Box mb={150}>
        <Menu menuType="white">
          <MenuItem submenu="Menu Item One">
            <MenuItem href="#">
              Item Submenu One Is A Very Long Submenu Item Indeed
            </MenuItem>
            <MenuItem variant="alternate" href="#">
              Item Submenu Two
            </MenuItem>
          </MenuItem>
        </Menu>
      </Box>,
    );

    const subMenu = submenu(page).first();
    await subMenu.hover();
    await checkAccessibility(page);
  });

  test(`should pass accessibility tests when a menu item has a long label`, async ({
    mount,
    page,
  }) => {
    await mount(
      <Box mb={150}>
        <Menu menuType="white">
          <MenuItem submenu="Menu Item One Has A Very Long Menu Title For No Reason Whatsoever">
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem variant="alternate" href="#">
              Item Submenu Two
            </MenuItem>
          </MenuItem>
        </Menu>
      </Box>,
    );

    const subMenu = submenu(page).first();
    await subMenu.hover();
    await checkAccessibility(page);
  });

  (["default", "large"] as MenuDividerProps["size"][]).forEach((size) => {
    test(`should pass accessibility tests when size is ${size}px`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuDividerComponent size={size} />);

      await checkAccessibility(page);
    });
  });

  [
    CHARACTERS.STANDARD,
    CHARACTERS.DIACRITICS,
    CHARACTERS.SPECIALCHARACTERS,
  ].forEach((text) => {
    test(`should pass accessibility tests when item text is ${text}`, async ({
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

  test(`should pass accessibility tests for Menu with button icon`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentButtonIcon />);

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
});

test.describe("Accessibility tests for Menu Fullscreen component", () => {
  test(`should pass accessibility tests for Menu Fullscreen`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount(<MenuComponentFullScreen />);

    const item = menuItem(page).first();
    await item.click();
    const fullscreen = getComponent(page, "menu-fullscreen").first();
    await waitForAnimationEnd(fullscreen);
    await checkAccessibility(page);
  });
});

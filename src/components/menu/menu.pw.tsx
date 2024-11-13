/* eslint-disable no-await-in-loop */
import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import {
  Menu,
  MenuProps,
  MenuItem,
  MenuWithChildren,
  MenuDivider,
  MenuDividerProps,
  MenuSegmentTitle,
  MenuFullscreenProps,
  ScrollableBlockProps,
} from ".";
import Box from "../box";
import {
  submenuBlock,
  innerMenu,
  submenu,
  scrollBlock,
  lastSubmenuElement,
  menuDivider,
  segmentTitle,
  menuComponent,
  submenuItem,
  fullscreenMenu,
  menu,
  menuItem,
} from "../../../playwright/components/menu/index";
import {
  searchDefaultInput,
  searchCrossIcon,
  searchButton,
} from "../../../playwright/components/search/index";
import {
  getComponent,
  closeIconButton,
  icon,
} from "../../../playwright/components/index";
import {
  continuePressingTAB,
  continuePressingSHIFTTAB,
  checkGoldenOutline,
  assertCssValueIsApproximately,
  checkAccessibility,
  waitForAnimationEnd,
} from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  MenuComponent,
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
  MenuSegmentTitleComponent,
  MenuItems,
  ClosedMenuFullScreenWithButtons,
  MenuDividerComponent,
  InGlobalHeaderStory,
  SubMenuWithVeryLongLabel,
  MenuComponentScrollableWithSearch,
  MenuSegmentTitleComponentWithAdditionalMenuItem,
  MenuComponentFullScreenWithLongSubmenuText,
  MenuItemWithPopoverContainerChild,
  SubmenuMaxWidth,
} from "./component.test-pw";
import { NavigationBarWithSubmenuAndChangingHeight } from "../navigation-bar/navigation-bar-test.stories";
import { HooksConfig } from "../../../playwright";

const span = "span";
const div = "div";

test.describe("Prop tests for Menu component", () => {
  test(`should verify scroll block within a submenu is scrollable`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentScrollable />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    const lastElement = lastSubmenuElement(page, "li");
    await lastElement.scrollIntoViewIfNeeded();
    await expect(lastElement).toBeInViewport();
  });

  test(`should verify a submenu can be navigated using keyboard tabbing after an item was clicked`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponent />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    const menuItemThree = innerMenu(page, 4, span)
      .filter({ hasText: "Item Submenu Three" })
      .first();
    await menuItemThree.click();
    await expect(menuItemThree).toHaveText("Item Submenu Three");
    await expect(menuItemThree).toHaveCSS("box-shadow", "none");
    await page.keyboard.press("Tab");
    const menuItemFour = innerMenu(page, 5, span)
      .filter({ hasText: "Item Submenu Four" })
      .first();
    await expect(menuItemFour).toHaveText("Item Submenu Four");
    await expect(menuItemFour).toHaveCSS("box-shadow", "none");
  });

  test(`should verify a submenu can be navigated using keyboard down arrow after an item was clicked`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponent />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    const menuItemThree = innerMenu(page, 2, span).first();
    await menuItemThree.click();
    await page.keyboard.press("ArrowDown");
    const focusedElement1 = page.locator("*:focus");
    await expect(focusedElement1).toContainText("Item Submenu Three");
    await page.keyboard.press("ArrowDown");
    const focusedElement2 = page.locator("*:focus");
    await expect(focusedElement2).toContainText("Item Submenu Four");
  });

  test(`should verify a submenu can be navigated using keyboard shift + tabbing after an item was clicked`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponent />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    const menuItemThree = innerMenu(page, 4, span).first();
    await menuItemThree.click();
    await page.keyboard.press("Shift+Tab");
    const focusedElement1 = page.locator("*:focus");
    await expect(focusedElement1).toContainText("Item Submenu Two");
    await page.keyboard.press("Shift+Tab");
    const focusedElement2 = page.locator("*:focus");
    await expect(focusedElement2).toContainText("Item Submenu One");
  });

  test(`should verify a submenu can be navigated using keyboard up arrow after an item was clicked`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponent />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    const menuItemThree = innerMenu(page, 4, span).first();
    await menuItemThree.click();
    await page.keyboard.press("ArrowUp");
    const focusedElement1 = page.locator("*:focus");
    await expect(focusedElement1).toContainText("Item Submenu Two");
    await page.keyboard.press("ArrowUp");
    const focusedElement2 = page.locator("*:focus");
    await expect(focusedElement2).toContainText("Item Submenu One");
  });

  test(`should verify the first submenu item is focused using keyboard tabbing after the parent item was clicked`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponent />);

    const subMenu = submenu(page).first();
    await subMenu.click();
    await page.keyboard.press("Tab");
    const focusedElement = page.locator("*:focus");
    await expect(focusedElement).toContainText("Item Submenu One");
  });

  test(`should verify the first submenu item is focused using keyboard down arrow after the parent item was clicked`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponent />);

    const subMenu = submenu(page).first();
    await subMenu.click();
    await page.keyboard.press("ArrowDown");
    const focusedElement = page.locator("*:focus");
    await expect(focusedElement).toContainText("Item Submenu One");
  });

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
      ["white", "rgb(230, 235, 237)", 0],
      ["light", "rgb(255, 255, 255)", 2],
      ["dark", "rgb(0, 25, 38)", 4],
      ["black", "rgb(38, 38, 38)", 6],
    ] as [string, string, number][]
  ).forEach(([colorName, color, menuNumber]) => {
    test(`should verify the ${menuNumber}th submenu background color is ${colorName}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent />);

      const subMenu = submenu(page).nth(menuNumber);
      await subMenu.hover();
      const menuItemThree = innerMenu(page, 2, span).first();
      await expect(menuItemThree).toHaveCSS("background-color", color);
    });
  });

  (
    [
      ["white", "rgb(255, 255, 255)", 0],
      ["light", "rgb(230, 235, 237)", 4],
      ["dark", "rgb(0, 50, 76)", 8],
      ["black", "rgb(0, 0, 0)", 12],
    ] as [string, string, number][]
  ).forEach(([colorName, color, menuNumber]) => {
    test(`should verify the ${menuNumber}th menu background color is ${colorName}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent />);

      const item = menuItem(page).nth(menuNumber).locator("span").first();
      await expect(item).toHaveCSS("background-color", color);
    });
  });

  (
    [
      ["white", "rgba(0, 0, 0, 0.9)"],
      ["light", "rgba(0, 0, 0, 0.9)"],
      ["dark", "rgb(255, 255, 255)"],
      ["black", "rgb(255, 255, 255)"],
    ] as [MenuProps["menuType"], string][]
  ).forEach(([menuType, color]) => {
    test(`should verify icon color is ${color} when menuType prop is ${menuType}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Menu menuType={menuType}>
          <MenuItem onClick={() => {}} icon="home">
            Foo
          </MenuItem>
        </Menu>,
      );

      await page.keyboard.press("Tab");
      await expect(icon(page)).toHaveCSS("color", color);
    });
  });

  (
    [
      ["default", 1],
      ["large", 4],
    ] as [MenuDividerProps["size"], number][]
  ).forEach(([size, height]) => {
    test(`should verify Menu Divider has the proper height when the size is ${size}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuDividerComponent size={size} />);

      const subMenu = submenu(page).first();
      await subMenu.hover();
      const divider = menuDivider(page).first();
      await assertCssValueIsApproximately(divider, "height", height);
    });
  });

  test(`should verify a segment title is visible within a submenu`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponent />);

    const subMenu = submenu(page).nth(1);
    await subMenu.hover();
    const menuSegmentTitle = segmentTitle(page).first();
    await expect(menuSegmentTitle).toHaveText("segment title");
    await expect(menuSegmentTitle).toBeVisible();
    await expect(menuSegmentTitle).toHaveCSS("color", "rgba(0, 0, 0, 0.65)");
  });

  test(`should verify menu does not open on hover when clickToOpen prop is true`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentItems clickToOpen />);

    const fourthMenu = menuComponent(page, 3);
    await fourthMenu.hover();
    const subItem = submenuItem(page, 3);
    await expect(subItem).toHaveCount(0);
  });

  test(`should verify menu opens on click when clickToOpen prop is true`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuItems clickToOpen />);

    const sixthMenu = menuComponent(page, 5);
    await sixthMenu.click();
    const subMenuBlock = submenuBlock(page).first().locator("li");
    await expect(subMenuBlock).toHaveCount(2);
    await expect(innerMenu(page, 1, span).first()).toHaveAttribute(
      "data-component",
      "link",
    );
    await expect(innerMenu(page, 2, span).first()).toHaveAttribute(
      "data-component",
      "link",
    );
  });

  ["Enter", "Space", "ArrowDown", "ArrowUp"].forEach((key) => {
    test(`should verify menu opens using ${key} key when clickToOpen prop is true`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuItems clickToOpen />);

      const sixthMenu = menuComponent(page, 5);
      await sixthMenu.click();
      await page.keyboard.press("Escape");
      await page.keyboard.press(key);
      const subMenuBlock = submenuBlock(page).first().locator("li");
      await expect(subMenuBlock).toHaveCount(2);
      await expect(innerMenu(page, 1, span).first()).toHaveAttribute(
        "data-component",
        "link",
      );
      await expect(innerMenu(page, 2, span).first()).toHaveAttribute(
        "data-component",
        "link",
      );
    });
  });

  (
    [
      ["ArrowDown", 0],
      ["ArrowUp", 2],
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

  test(`should verify the Search component close icon is focusable when using keyboard to navigate down the list of items`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentSearch />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await page.keyboard.press("ArrowDown");
    await searchDefaultInput(page).fill("FooBar");
    await page.keyboard.press("Tab");
    const cross = searchCrossIcon(page).locator("..");
    await expect(cross).toBeFocused();
  });

  test(`should verify the Search component close icon is centred when focused`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentSearch />);
    const bottomLess = 220;
    const topLess = 184;
    const leftLess = 108;
    // additionVal is to compensate for the outline.
    const additionVal = 5;

    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await page.keyboard.press("ArrowDown");
    await searchDefaultInput(page).fill("FooBar");
    await page.keyboard.press("Tab");
    const cross = searchCrossIcon(page).locator("..");
    await expect(cross).toBeFocused();

    const boundBottom = await cross.evaluate((element) => {
      return element.getBoundingClientRect().bottom;
    });
    expect(boundBottom).toBeLessThanOrEqual(bottomLess + additionVal);
    expect(boundBottom).toBeGreaterThan(bottomLess);

    const boundTop = await cross.evaluate((element) => {
      return element.getBoundingClientRect().top;
    });
    expect(boundTop).toBeLessThanOrEqual(topLess + additionVal);
    expect(boundTop).toBeGreaterThan(topLess);

    const boundLeft = await cross.evaluate((element) => {
      return element.getBoundingClientRect().left;
    });
    expect(boundLeft).toBeLessThanOrEqual(leftLess + additionVal);
    expect(boundLeft).toBeGreaterThan(leftLess);
  });

  test(`should verify the Search component close icon is focusable when using keyboard to navigate up the list of items`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentSearch />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await page.keyboard.press("ArrowDown");
    await searchDefaultInput(page).fill("FooBar");
    await page.keyboard.press("End");
    await continuePressingSHIFTTAB(page, 2);
    await page.waitForTimeout(2000);
    const cross = searchCrossIcon(page).locator("..");
    await expect(cross).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(searchDefaultInput(page)).toBeFocused();
  });

  test(`should verify that the Search component is focusable by using the downarrow key when rendered as the parent of a scrollable submenu`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentSearch />);

    await continuePressingSHIFTTAB(page, 3);
    await page.keyboard.press("Enter");
    await page.keyboard.press("ArrowDown");
    await expect(searchDefaultInput(page)).toBeFocused();
  });

  test(`should verify scroll Menu search has an alternate background color`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentSearch />);

    const subMenu = submenu(page).nth(2);
    await subMenu.hover();
    const item = menuItem(page).nth(4).locator("span").first();
    await expect(item).toHaveCSS("background-color", "rgb(0, 50, 76)");
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
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    const subMenuBlock = submenuBlock(page).first().locator("li").first();
    await expect(subMenuBlock).toBeVisible();
  });

  test(`should render with a menu item that has a very long label and verify the width of the whole submenu is determined by this item`, async ({
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
    const subMenuBlock = innerMenu(page, 2, span).first();
    const cssWidth = await subMenuBlock.evaluate((el) =>
      window.getComputedStyle(el).getPropertyValue("width"),
    );
    expect(parseInt(cssWidth)).toBeLessThanOrEqual(395);
    expect(parseInt(cssWidth)).toBeGreaterThanOrEqual(385);
  });

  test(`should render with a submenu that has a very long label and verify the width of the whole submenu is determined by this item`, async ({
    mount,
    page,
  }) => {
    await mount(<SubMenuWithVeryLongLabel />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    const subMenuBlock = innerMenu(page, 2, span).first();
    const cssWidth = await subMenuBlock.evaluate((el) =>
      window.getComputedStyle(el).getPropertyValue("width"),
    );
    expect(parseInt(cssWidth)).toBeLessThanOrEqual(500);
    expect(parseInt(cssWidth)).toBeGreaterThanOrEqual(490);
  });

  (
    [
      ["float", 0.3, 409],
      ["float", 0.6, 819],
      ["float", 1.0, 1366],
      ["number", 350, 350],
      ["number", 900, 900],
      ["number", 1350, 1350],
      ["string", "450px", 450],
      ["string", "675px", 675],
      ["string", "1200px", 1200],
    ] as [string, number | string, number][]
  ).forEach(([type, width, pixels]) => {
    test(`should render with width set to ${pixels}px when prop is passed as a ${type}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent width={width} />);

      const thisMenu = menu(page).first();
      await assertCssValueIsApproximately(thisMenu, "width", pixels);
    });
  });

  (
    [
      ["number", 810, 350, 810],
      ["number", 810, 1350, 1350],
      ["string", "700px", "300px", 700],
      ["string", "700px", "1200px", 1200],
    ] as [string, string | number, string | number, number][]
  ).forEach(([type, minWidth, width, pixels]) => {
    test(`should render with minimum width of ${pixels}px when minWidth prop is passed as a ${type}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent minWidth={minWidth} width={width} />);

      const thisMenu = menu(page).first();
      await assertCssValueIsApproximately(thisMenu, "width", pixels);
    });
  });

  (
    [
      ["number", 810, 350, 350],
      ["number", 810, 1350, 810],
      ["string", "700px", "300px", 300],
      ["string", "700px", "1200px", 700],
    ] as [string, string | number, string | number, number][]
  ).forEach(([type, maxWidth, width, pixels]) => {
    test(`should render with maximum width of ${pixels}px when maxWidth prop is passed as a ${type}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent maxWidth={maxWidth} width={width} />);

      const thisMenu = menu(page).first();
      await assertCssValueIsApproximately(thisMenu, "width", pixels);
    });
  });

  [
    "baseline",
    "bottom",
    "middle",
    "sub",
    "super",
    "text-bottom",
    "text-top",
    "top",
  ].forEach((alignment) => {
    test(`should render with verticalAlign as ${alignment}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent verticalAlign={alignment} />);

      const thisMenu = menu(page).first();
      await expect(thisMenu).toHaveCSS("vertical-align", alignment);
    });
  });

  ["auto", "clip", "hidden", "scroll", "visible"].forEach((overflow) => {
    test(`should render with overflow as ${overflow}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent overflow={overflow} />);

      const thisMenu = menu(page).first();
      await expect(thisMenu).toHaveAttribute("overflow", overflow);
      await expect(thisMenu).toHaveCSS("overflow", overflow);
    });
  });

  (
    ["auto", "clip", "hidden", "scroll", "visible"] as MenuProps["overflowX"][]
  ).forEach((overflow) => {
    test(`should render with overflowX as ${overflow}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent overflowX={overflow} />);

      const thisMenu = menu(page).first();
      await expect(thisMenu).toHaveCSS("overflow-x", overflow as string);
    });
  });

  ["normal", "stretch", "baseline", "center", "flex-start", "flex-end"].forEach(
    (alignment) => {
      test(`should render with alignItems as ${alignment}`, async ({
        mount,
        page,
      }) => {
        await mount(<MenuComponent alignItems={alignment} />);

        const thisMenu = menu(page).first();
        await expect(thisMenu).toHaveCSS("align-items", alignment);
      });
    },
  );

  [
    "normal",
    "baseline",
    "center",
    "flex-start",
    "flex-end",
    "space-between",
    "space-around",
    "stretch",
  ].forEach((alignment) => {
    test(`should render with alignContent as ${alignment}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent alignContent={alignment} />);

      const thisMenu = menu(page).first();
      await expect(thisMenu).toHaveCSS("align-content", alignment);
    });
  });

  [
    "left",
    "center",
    "right",
    "flex-start",
    "flex-end",
    "normal",
    "stretch",
  ].forEach((justified) => {
    test(`should render with justifyItems as ${justified}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent justifyItems={justified} />);

      const thisMenu = menu(page).first();
      await expect(thisMenu).toHaveCSS("justify-items", justified);
    });
  });

  [
    "left",
    "center",
    "right",
    "flex-start",
    "flex-end",
    "normal",
    "space-between",
    "space-around",
    "stretch",
  ].forEach((justified) => {
    test(`should render with justifyContent as ${justified}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent justifyContent={justified} />);

      const thisMenu = menu(page).first();
      await expect(thisMenu).toHaveCSS("justify-content", justified);
    });
  });

  (["nowrap", "wrap", "wrap-reverse"] as MenuProps["flexWrap"][]).forEach(
    (wrap) => {
      test(`should render with flexWrap as ${wrap}`, async ({
        mount,
        page,
      }) => {
        await mount(<MenuComponent flexWrap={wrap} />);

        const thisMenu = menu(page).first();
        await expect(thisMenu).toHaveCSS("flex-wrap", wrap as string);
      });
    },
  );

  (
    [
      "column",
      "column-reverse",
      "row",
      "row-reverse",
    ] as MenuProps["flexDirection"][]
  ).forEach((direction) => {
    test(`should render with flexDirection as ${direction}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent flexDirection={direction} />);

      const thisMenu = menu(page).first();
      await expect(thisMenu).toHaveCSS("flex-direction", direction as string);
    });
  });

  ["auto", "content", "fit-content", "max-content", "min-content"].forEach(
    (flex) => {
      test(`should render with flex as ${flex}`, async ({ mount, page }) => {
        await mount(<MenuComponent flex={flex} />);

        const thisMenu = menu(page).first();
        await expect(thisMenu).toHaveCSS("flex-basis", flex);
      });
    },
  );

  (
    [
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ] as [MenuProps["flexGrow"], string][]
  ).forEach(([value, growText]) => {
    test(`should render with flexGrow as ${value}`, async ({ mount, page }) => {
      await mount(<MenuComponent flex="auto" flexGrow={value} />);

      const thisMenu = menu(page).first();
      await expect(thisMenu).toHaveCSS("flex-grow", growText);
    });
  });

  (
    [
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ] as [MenuProps["flexShrink"], string][]
  ).forEach(([value, shrinkText]) => {
    test(`should render with flexShrink as ${value}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent flex="auto" flexShrink={value} />);

      const thisMenu = menu(page).first();
      await expect(thisMenu).toHaveCSS("flex-shrink", shrinkText);
    });
  });

  ["auto", "content", "fit-content", "max-content", "min-content"].forEach(
    (basis) => {
      test(`should render with flexBasis as ${basis}`, async ({
        mount,
        page,
      }) => {
        await mount(<MenuComponent flexBasis={basis} />);

        const thisMenu = menu(page).first();
        await expect(thisMenu).toHaveCSS("flex-basis", basis);
      });
    },
  );

  [
    "auto",
    "baseline",
    "left",
    "normal",
    "right",
    "stretch",
    "center",
    "flex-start",
    "flex-end",
  ].forEach((justify) => {
    test(`should render with justifySelf as ${justify}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent justifySelf={justify} />);

      const thisMenu = menu(page).first();
      await expect(thisMenu).toHaveCSS("justify-self", justify);
    });
  });

  [
    "auto",
    "baseline",
    "normal",
    "stretch",
    "center",
    "flex-start",
    "flex-end",
  ].forEach((align) => {
    test(`should render with alignSelf as ${align}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent alignSelf={align} />);

      const thisMenu = menu(page).first();
      await expect(thisMenu).toHaveCSS("align-self", align);
    });
  });

  (
    [
      [10, "10"],
      [50, "50"],
      [100, "100"],
    ] as [MenuProps["order"], string][]
  ).forEach(([value, orderText]) => {
    test(`should render with order as ${value}`, async ({ mount, page }) => {
      await mount(<MenuComponent order={value} />);

      const thisMenu = menu(page).first();
      await expect(thisMenu).toHaveCSS("order", orderText);
    });
  });

  test(`should render with className as ${CHARACTERS.STANDARD}`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentItems className={CHARACTERS.STANDARD} />);

    const item = menuItem(page).nth(0);
    const itemClass = await item.evaluate((element) =>
      element.getAttribute("class"),
    );
    expect(itemClass).toContain(CHARACTERS.STANDARD);
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

  [
    CHARACTERS.STANDARD,
    CHARACTERS.DIACRITICS,
    CHARACTERS.SPECIALCHARACTERS,
  ].forEach((text) => {
    test(`should render with submenu text set to ${text}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponentItems submenu={text} />);

      const item = menuItem(page).first();
      await expect(item).toHaveText(text);
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

  (
    [
      ["default", "rgb(255, 255, 255)"],
      ["alternate", "rgb(217, 224, 228)"],
    ] as [MenuWithChildren["variant"], string][]
  ).forEach(([variant, color]) => {
    test(`should render with ${variant} Menu Item variant`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponentItems variant={variant} />);

      const subMenu = submenu(page).first().locator("span").first();
      await expect(subMenu).toHaveCSS("background-color", color);
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

  (
    [
      ["default", 1, 16, 121],
      ["large", 4, 0, 153],
    ] as [MenuDividerProps["size"], number, number, number][]
  ).forEach(([size, height, margin, width]) => {
    test(`should render with Menu size ${size}`, async ({ mount, page }) => {
      await mount(
        <Box mb={150}>
          <Menu menuType="white">
            <MenuItem submenu="Menu">
              <MenuItem href="#">Submenu Item One</MenuItem>
              <MenuDivider size={size} />
              <MenuItem href="#">Submenu Item Two</MenuItem>
            </MenuItem>
          </Menu>
        </Box>,
      );

      const subMenu = submenu(page).first();
      await subMenu.hover();
      const divider = menuDivider(page);
      await assertCssValueIsApproximately(divider, "height", height);
      await assertCssValueIsApproximately(divider, "margin-left", margin);
      await assertCssValueIsApproximately(divider, "width", width);
    });
  });

  (
    [
      [100, 100],
      [200, 200],
      ["150px", 150],
      ["250px", 250],
    ] as [ScrollableBlockProps["height"], number][]
  ).forEach(([height, pixels]) => {
    test(`should render with scroll block height of ${pixels}px when height prop is passed as a number or string`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponentScrollable height={height} />);

      const subMenu = submenu(page).first();
      await subMenu.hover();
      const block = scrollBlock(page);
      await assertCssValueIsApproximately(block, "height", pixels);
    });
  });

  (
    [
      ["default", "rgb(230, 235, 237)"],
      ["alternate", "rgb(217, 224, 228)"],
    ] as [ScrollableBlockProps["variant"], string][]
  ).forEach(([variant, color]) => {
    test(`should render Menu scroll block with ${variant} background color using variant prop`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponentScrollable variant={variant} />);

      const subMenu = submenu(page).first();
      await subMenu.hover();
      const block = scrollBlock(page).locator("span").first();
      await expect(block).toHaveCSS("background-color", color);
    });
  });

  (
    [
      ["default", "rgba(0, 0, 0, 0)"],
      ["alternate", "rgb(217, 224, 228)"],
    ] as [ScrollableBlockProps["variant"], string][]
  ).forEach(([variant, color]) => {
    test(`should render segment title with ${variant} variant background color`, async ({
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
              <MenuSegmentTitle variant={variant} text="Segment Title" />
            </MenuItem>
          </Menu>
        </Box>,
      );

      const subMenu = submenu(page).first();
      await subMenu.hover();
      const title = segmentTitle(page);
      await expect(title).toHaveCSS("background-color", color);
    });
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
    await expect(fullscreen).not.toBeVisible();

    await item.click();
    await waitForAnimationEnd(fullscreen);
    await expect(fullscreen).toBeVisible();
    await closeButton.click();
    await expect(item).toBeFocused();
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip(`should verify that inner Menu without link is NOT available with tabbing in Fullscreen Menu`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentFullScreen />);

    await page.setViewportSize({ width: 1200, height: 800 });
    const item = menuItem(page).first();
    await item.click();
    const fullscreen = getComponent(page, "menu-fullscreen").first();
    await waitForAnimationEnd(fullscreen);
    await continuePressingTAB(page, 8);
    await expect(item).not.toBeFocused();
  });

  test(`should render Menu Item with href prop set to ${CHARACTERS.STANDARD}`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentItems href={CHARACTERS.STANDARD} />);

    const subMenu = submenu(page).first().locator("a");
    await expect(subMenu).toHaveAttribute("href", CHARACTERS.STANDARD);
  });

  (
    [["noopener"], ["noreferrer"], ["opener"]] as [MenuWithChildren["rel"]][]
  ).forEach(([rel]) => {
    test(`should render Menu Item with rel prop set to ${rel}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponentItems rel={rel} />);

      const subMenu = submenu(page).first().locator("button");
      await expect(subMenu).toHaveAttribute("rel", rel as string);
    });
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

  (
    [
      ["default", "rgb(255, 255, 255)"],
      ["alternate", "rgb(230, 235, 237)"],
    ] as [ScrollableBlockProps["parentVariant"], string][]
  ).forEach(([variant, color]) => {
    test(`should render scrollable block with ${variant} variant background color`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponentScrollableParent parentVariant={variant} />);

      const subMenu = submenu(page).first();
      await subMenu.hover();
      const parentBackground = getComponent(page, "scrollable-block-parent")
        .locator("span")
        .nth(0);
      await expect(parentBackground).toHaveAttribute("data-component", "link");
      await expect(parentBackground).toHaveCSS("background-color", color);
    });
  });
});

test.describe("Prop tests for Menu Fullscreen component", () => {
  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip(`should render Menu Fullscreen`, async ({ mount, page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount(<MenuComponentFullScreen />);

    const item = menuItem(page).first();
    await item.click();
    const fullscreen = getComponent(page, "menu-fullscreen").first();
    await waitForAnimationEnd(fullscreen);
    const fullScreenMenu1 = fullscreenMenu(page, 0).locator("span");
    await expect(fullScreenMenu1).toHaveAttribute("data-element", "close");
    await expect(fullScreenMenu1).toBeVisible();
    const fullScreenMenu2 = fullscreenMenu(page, 1).locator("ul").first();
    await expect(fullScreenMenu2).toHaveAttribute("data-component", "menu");
    await expect(fullScreenMenu2).toBeVisible();
    const fullScreenMenu3 = fullscreenMenu(page, 1).locator("li");
    await expect(fullScreenMenu3).toHaveCount(15);
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip(`should verify that the Menu Fullscreen is closed when close icon is clicked`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount(<MenuComponentFullScreen />);

    const item = menuItem(page).first();
    await item.click();
    const fullscreen = getComponent(page, "menu-fullscreen").first();
    await waitForAnimationEnd(fullscreen);
    const closeIcon = closeIconButton(page).first();
    await closeIcon.click();
    const fullScreenMenu1 = fullscreenMenu(page, 0).locator("span");
    await expect(fullScreenMenu1).not.toBeVisible();
    const fullScreenMenu2 = fullscreenMenu(page, 1).locator("ul").first();
    await expect(fullScreenMenu2).not.toBeVisible();
    const thisMenu = menu(page).first();
    await expect(thisMenu).toBeVisible();
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip(`close icon has correct focus styling when focused and focusRedesignOptOut flag is false`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount(<MenuComponentFullScreen />);

    const openMenuButton = page.getByRole("button", { name: "Menu" }).first();
    await openMenuButton.click();
    const dialog = page.getByRole("dialog");
    await waitForAnimationEnd(dialog);

    await page.keyboard.press("Tab");

    const closeIcon = page.getByRole("button", { name: "Close" });
    await expect(closeIcon).toBeFocused();
    await expect(closeIcon).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px, rgba(0, 0, 0, 0.9) 0px 0px 0px 6px",
    );
    await expect(closeIcon).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip(`close icon has correct focus styling when focused and focusRedesignOptOut flag is true`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount<HooksConfig>(<MenuComponentFullScreen />, {
      hooksConfig: { focusRedesignOptOut: true },
    });

    const openMenuButton = page.getByRole("button", { name: "Menu" }).first();
    await openMenuButton.click();
    const dialog = page.getByRole("dialog");
    await waitForAnimationEnd(dialog);

    await page.keyboard.press("Tab");

    const closeIcon = page.getByRole("button", { name: "Close" });
    await expect(closeIcon).toBeFocused();
    await checkGoldenOutline(closeIcon);
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip(`should verify that inner Menu is available with tabbing and styles are correct`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount(<MenuComponentFullScreen />);

    const item = menuItem(page).first();
    await item.click();
    const fullscreen = getComponent(page, "menu-fullscreen").first();
    await waitForAnimationEnd(fullscreen);
    await continuePressingTAB(page, 4);
    const fullMenuItem = fullscreenMenu(page, 3)
      .locator("li")
      .locator("a")
      .first();

    const fullMenuItemBoxShadow = await fullMenuItem.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return style.getPropertyValue("box-shadow");
    });
    expect(fullMenuItemBoxShadow).toContain("rgb(255, 188, 25)");

    const fullMenuItemBackgroundColor = await fullMenuItem.evaluate(
      (element) => {
        const style = window.getComputedStyle(element);
        return style.getPropertyValue("background-color");
      },
    );
    expect(fullMenuItemBackgroundColor).toContain("rgb(0, 126, 69)");

    const fullMenuItemColor = await fullMenuItem.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return style.getPropertyValue("color");
    });
    expect(fullMenuItemColor).toContain("rgb(255, 255, 255)");
    await expect(fullMenuItem).toBeFocused();
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip(`should verify that inner Menu is available with shift-tabbing and styles are correct`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount(<MenuComponentFullScreen />);

    const item = menuItem(page).first();
    await item.click();
    const fullscreen = getComponent(page, "menu-fullscreen").first();
    await waitForAnimationEnd(fullscreen);
    await continuePressingTAB(page, 5);
    await page.keyboard.press("Shift+Tab");
    const fullMenuItem = fullscreenMenu(page, 3)
      .locator("li")
      .locator("a")
      .first();

    const fullMenuItemBoxShadow = await fullMenuItem.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return style.getPropertyValue("box-shadow");
    });
    expect(fullMenuItemBoxShadow).toContain("rgb(255, 188, 25)");

    const fullMenuItemBackgroundColor = await fullMenuItem.evaluate(
      (element) => {
        const style = window.getComputedStyle(element);
        return style.getPropertyValue("background-color");
      },
    );
    expect(fullMenuItemBackgroundColor).toContain("rgb(0, 126, 69)");

    const fullMenuItemColor = await fullMenuItem.evaluate((element) => {
      const style = window.getComputedStyle(element);
      return style.getPropertyValue("color");
    });
    expect(fullMenuItemColor).toContain("rgb(255, 255, 255)");

    await expect(fullMenuItem).toBeFocused();
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

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip(`should verify that inner Menu without link is NOT available when tabbing in Fullscreen Menu`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount(<MenuComponentFullScreen />);

    const item = menuItem(page).first();
    await item.click();
    const fullscreen = getComponent(page, "menu-fullscreen").first();
    await waitForAnimationEnd(fullscreen);
    await continuePressingTAB(page, 5);
    await expect(item).not.toBeFocused();
  });

  (
    [
      ["open", true],
      ["closed", false],
    ] as [string, MenuFullscreenProps["isOpen"]][]
  ).forEach(([value, boolVal]) => {
    test(`should render with Menu Fullscreen ${value} when isOpen prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await page.setViewportSize({ width: 1200, height: 800 });
      await mount(<MenuComponentFullScreen isOpen={boolVal} />);

      const fullScreenMenu = getComponent(page, "menu-fullscreen").nth(3);
      if (boolVal) {
        await expect(fullScreenMenu).toBeVisible();
      } else {
        await expect(fullScreenMenu).not.toBeVisible();
      }
    });
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

  test(`should focus the search icon and button on tab press when the current item has a Search input with searchButton and has a value, focusRedesignOptOut flag not set`, async ({
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
    const crossIcon = searchCrossIcon(page).locator("..");
    await expect(crossIcon).toBeFocused();
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

  test(`should focus the search icon and button on tab press when the current item has a Search input with searchButton and has a value, focusRedesignOptOut flag set`, async ({
    mount,
    page,
  }) => {
    await mount<HooksConfig>(
      <MenuFullScreenWithSearchButton searchValue="foo" />,
      {
        hooksConfig: { focusRedesignOptOut: true },
      },
    );

    const item = menuItem(page).first().locator("a");
    await item.focus();
    await page.keyboard.press("Tab");
    const searchInput = searchDefaultInput(page);
    await expect(searchInput).toBeFocused();
    await page.keyboard.press("Tab");
    const crossIcon = searchCrossIcon(page).locator("..");
    await expect(crossIcon).toBeFocused();
    await page.keyboard.press("Tab");
    const button = searchButton(page);
    await expect(button).toBeFocused();
    await checkGoldenOutline(button);
    await page.keyboard.press("Tab");
    const item2 = menuItem(page).last().locator("a");
    await expect(item2).toBeFocused();
  });

  test(`should apply the expected hover styling to the search button`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuFullScreenWithSearchButton searchValue="foo" />);

    const button = searchButton(page);
    await button.hover();

    await expect(button).toHaveCSS("background-color", "rgb(0, 103, 56)");
  });
});

test.describe("Event tests for Menu component", () => {
  test(`should call onClick callback when a click event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <MenuComponentItems
        onClick={() => {
          callbackCount += 1;
        }}
      />,
    );

    const menuComp = menuComponent(page, 1);
    await menuComp.click();
    expect(callbackCount).toBe(1);
  });

  test(`should call onSubmenuOpen callback when mouseover event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <MenuComponentItems
        onSubmenuOpen={() => {
          callbackCount += 1;
        }}
        submenu="Menu Item One"
      />,
    );

    const subMenu = submenu(page).first();
    await subMenu.hover();
    expect(callbackCount).toBe(1);
  });

  test(`should call onSubmenuOpen callback when a click event is triggered`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <MenuComponentItems
        clickToOpen
        onSubmenuOpen={() => {
          callbackCount += 1;
        }}
        submenu="Menu Item One"
      />,
    );

    const menuComp = menuComponent(page, 1);
    await menuComp.click();
    expect(callbackCount).toBe(1);
  });

  ["Space", "Enter", "ArrowDown", "ArrowUp"].forEach((key) => {
    test(`should call onSubmenuOpen callback when a ${key} keyboard event is triggered`, async ({
      mount,
      page,
    }) => {
      let callbackCount = 0;
      await mount(
        <MenuComponentItems
          clickToOpen
          onSubmenuOpen={() => {
            callbackCount += 1;
          }}
          submenu="Menu Item One"
        />,
      );

      await page.keyboard.press("Tab");
      await page.keyboard.press(key);
      expect(callbackCount).toBe(1);
    });
  });

  test(`should call onSubmenuClose callback when menu is closed`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <MenuComponentItems
        onSubmenuClose={() => {
          callbackCount += 1;
        }}
        submenu="Menu Item Three"
      />,
    );

    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowDown");
    expect(callbackCount).toBe(1);
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip(`should call onClose callback when Menu Fullscreen is closed`, async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount(
      <MenuComponentFullScreen
        onClose={() => {
          callbackCount += 1;
        }}
      />,
    );

    const item = menuItem(page).first();
    await item.click();
    const fullscreen = getComponent(page, "menu-fullscreen").first();
    await waitForAnimationEnd(fullscreen);
    const closeIcon = closeIconButton(page).first();
    await closeIcon.click();
    expect(callbackCount).toBe(1);
  });

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
});

test.describe("Accessibility tests for Menu component", () => {
  test(`should pass accessibility tests for default Menu`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponent />);

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

  (["default", "large"] as MenuDividerProps["size"][]).forEach((divider) => {
    test(`should pass accessibility tests when divider size is ${divider}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent size={divider} />);

      const subMenu = submenu(page).first();
      await subMenu.hover();
      await checkAccessibility(page);
    });
  });

  test.skip(`should pass accessibility tests when search component is focused`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentSearch />);

    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    const subMenu = getComponent(page, "submenu").first();
    await waitForAnimationEnd(subMenu);
    await checkAccessibility(page);
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

  ["450px", "675px", "1200px"].forEach((width) => {
    test(`should pass accessibility tests when width is ${width}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent width={width} />);

      await checkAccessibility(page);
    });
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
    "baseline",
    "bottom",
    "middle",
    "sub",
    "super",
    "text-bottom",
    "text-top",
    "top",
  ].forEach((alignment) => {
    test(`should pass accessibility tests when alignItems is ${alignment}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent verticalAlign={alignment} />);

      await checkAccessibility(page);
    });
  });

  ["auto", "clip", "hidden", "scroll", "visible"].forEach((overflow) => {
    test(`should pass accessibility tests when overflow is ${overflow}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent overflow={overflow} />);

      await checkAccessibility(page);
    });
  });

  (
    ["auto", "clip", "hidden", "scroll", "visible"] as MenuProps["overflowX"][]
  ).forEach((overflow) => {
    test(`should pass accessibility tests when overflowX is ${overflow}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent overflowX={overflow} />);

      await checkAccessibility(page);
    });
  });

  ["normal", "stretch", "baseline", "center", "flex-start", "flex-end"].forEach(
    (alignment) => {
      test(`should pass accessibility tests for when alignItems is ${alignment}`, async ({
        mount,
        page,
      }) => {
        await mount(<MenuComponent alignItems={alignment} />);

        await checkAccessibility(page);
      });
    },
  );

  [
    "normal",
    "baseline",
    "center",
    "flex-start",
    "flex-end",
    "space-between",
    "space-around",
    "stretch",
  ].forEach((alignment) => {
    test(`should pass accessibility tests when alignContent is ${alignment}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent alignContent={alignment} />);

      await checkAccessibility(page);
    });
  });

  [
    "left",
    "center",
    "right",
    "flex-start",
    "flex-end",
    "normal",
    "stretch",
  ].forEach((justified) => {
    test(`should pass accessibility tests when justifyItems is ${justified}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent justifyItems={justified} />);

      await checkAccessibility(page);
    });
  });

  [
    "left",
    "center",
    "right",
    "flex-start",
    "flex-end",
    "normal",
    "space-between",
    "space-around",
    "stretch",
  ].forEach((justified) => {
    test(`should pass accessibility tests when justifyContent is ${justified}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent justifyContent={justified} />);

      await checkAccessibility(page);
    });
  });

  (["nowrap", "wrap", "wrap-reverse"] as MenuProps["flexWrap"][]).forEach(
    (wrap) => {
      test(`should pass accessibility tests when flexWrap is ${wrap}`, async ({
        mount,
        page,
      }) => {
        await mount(<MenuComponent flexWrap={wrap} />);

        await checkAccessibility(page);
      });
    },
  );

  (
    [
      "column",
      "column-reverse",
      "row",
      "row-reverse",
    ] as MenuProps["flexDirection"][]
  ).forEach((direction) => {
    test(`should pass accessibility tests when flexDirection is ${direction}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent flexDirection={direction} />);

      await checkAccessibility(page);
    });
  });

  ["auto", "content", "fit-content", "max-content", "min-content"].forEach(
    (flex) => {
      test(`should pass accessibility tests when flex is ${flex}`, async ({
        mount,
        page,
      }) => {
        await mount(<MenuComponent flex={flex} />);

        await checkAccessibility(page);
      });
    },
  );

  [10, 50, 100].forEach((value) => {
    test(`should pass accessibility tests when flexGrow is ${value}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent flex="auto" flexGrow={value} />);

      await checkAccessibility(page);
    });
  });

  [10, 50, 100].forEach((value) => {
    test(`should pass accessibility tests when flexShrink is ${value}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent flex="auto" flexShrink={value} />);

      await checkAccessibility(page);
    });
  });

  ["auto", "content", "fit-content", "max-content", "min-content"].forEach(
    (basis) => {
      test(`should pass accessibility tests when flexBasis is ${basis}`, async ({
        mount,
        page,
      }) => {
        await mount(<MenuComponent flexBasis={basis} />);

        await checkAccessibility(page);
      });
    },
  );

  [
    "auto",
    "baseline",
    "left",
    "normal",
    "right",
    "stretch",
    "center",
    "flex-start",
    "flex-end",
  ].forEach((justify) => {
    test(`should pass accessibility tests when justifySelf is ${justify}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent justifySelf={justify} />);

      await checkAccessibility(page);
    });
  });

  [
    "auto",
    "baseline",
    "normal",
    "stretch",
    "center",
    "flex-start",
    "flex-end",
  ].forEach((align) => {
    test(`should pass accessibility tests when alignSelf is ${align}`, async ({
      mount,
      page,
    }) => {
      await mount(<MenuComponent alignSelf={align} />);

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

  (["default", "alternate"] as ScrollableBlockProps["variant"][]).forEach(
    (variant) => {
      test(`should pass accessibility tests when scroll block has ${variant} variant background color`, async ({
        mount,
        page,
      }) => {
        await mount(<MenuComponentScrollable variant={variant} />);

        const subMenu = submenu(page).first();
        await subMenu.hover();

        await checkAccessibility(page);
      });
    },
  );

  (["default", "alternate"] as ScrollableBlockProps["variant"][]).forEach(
    (variant) => {
      test(`should pass accessibility tests when Segment Title has a ${variant} variant background color`, async ({
        mount,
        page,
      }) => {
        await mount(<MenuSegmentTitleComponent variant={variant} />);

        const subMenu = submenu(page).first();
        await subMenu.hover();

        await checkAccessibility(page);
      });
    },
  );

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

  // Test skipped because of issue FE-5731
  test.skip(`should pass accessibility tests for Menu with icon`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentWithIcon />);

    await checkAccessibility(page);
  });
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

test.describe("Accessibility tests for Menu Fullscreen component", () => {
  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip(`should pass accessibility tests for Menu Fullscreen`, async ({
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

  test(`should pass accessibility tests when close icon is clicked`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount(<MenuComponentFullScreen />);

    const item = menuItem(page).first();
    await item.click();
    await expect(
      getComponent(page, "menu-fullscreen")
        .first()
        .locator("a")
        .first()
        .locator("span"),
    ).toHaveText("Menu Item One");
    const closeIcon = closeIconButton(page).first();
    await closeIcon.click();
    await checkAccessibility(page);
  });

  // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
  test.skip(`should pass accessibility tests when menu item is highlighted`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount(<MenuComponentFullScreen />);

    const item = menuItem(page).first();
    await item.click();
    const fullscreen = getComponent(page, "menu-fullscreen").first();
    await waitForAnimationEnd(fullscreen);
    await continuePressingTAB(page, 5);
    await checkAccessibility(page);
  });

  (["left", "right"] as MenuFullscreenProps["startPosition"][]).forEach(
    (side) => {
      // TODO: Skipped due to flaky focus behaviour. To review in FE-6428
      test.skip(`should pass accessibility tests when start position is ${side}`, async ({
        mount,
        page,
      }) => {
        await page.setViewportSize({ width: 1200, height: 800 });
        await mount(<MenuComponentFullScreen startPosition={side} />);

        const item = menuItem(page).first();
        await item.click();
        const fullscreen = getComponent(page, "menu-fullscreen").first();
        await waitForAnimationEnd(fullscreen);
        await checkAccessibility(page);
      });
    },
  );
});

test.describe("Styling, Scrolling & Navigation Bar Tests for Menu Component", () => {
  test(`should render menu items with the expected focus styling when focusRedesignOptOut is true`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount<HooksConfig>(<MenuComponent />, {
      hooksConfig: { focusRedesignOptOut: true },
    });

    const item1 = menuItem(page).first().locator("a");
    await item1.focus();
    await expect(item1).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px inset",
    );

    const item2 = menuItem(page).last().locator("button");
    await item2.focus();
    await expect(item2).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px inset",
    );
    await item2.click();

    const subMenu1 = submenu(page).last().locator("button").first();
    await subMenu1.focus();
    await expect(subMenu1).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px inset",
    );

    const subMenu2 = submenu(page).last().locator("a").first();
    await subMenu2.focus();
    await expect(subMenu2).toHaveCSS(
      "box-shadow",
      "rgb(255, 188, 25) 0px 0px 0px 3px inset",
    );
  });

  test(`should render menu items with the expected focus styling when focusRedesignOptOut is false`, async ({
    mount,
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await mount(<MenuComponent />);

    const item1 = menuItem(page).first().locator("a");
    await item1.focus();
    await expect(item1).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset",
    );
    await expect(item1).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");

    const item2 = menuItem(page).last().locator("button");
    await item2.focus();
    await expect(item2).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset",
    );
    await expect(item2).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");
    await item2.click();

    const subMenu1 = submenu(page).last().locator("button").first();
    await subMenu1.focus();
    await expect(subMenu1).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset",
    );
    await expect(subMenu1).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");

    const subMenu2 = submenu(page).last().locator("a").first();
    await subMenu2.focus();
    await expect(subMenu2).toHaveCSS(
      "box-shadow",
      "rgba(0, 0, 0, 0.9) 0px 0px 0px 3px inset, rgb(255, 188, 25) 0px 0px 0px 6px inset",
    );
    await expect(subMenu2).toHaveCSS("outline", "rgba(0, 0, 0, 0) solid 3px");
  });

  test(`should render with the expected border radius styling on the Submenu`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponent />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    const subMenuBlock = submenuBlock(page).first();
    await expect(subMenuBlock).toHaveCSS("border-radius", "0px 0px 8px 8px");
    const subMenu2 = submenu(page).locator("a").last();
    await expect(subMenu2).toHaveCSS("border-radius", "0px 0px 8px 8px");
  });

  test(`should render with the expected border radius styling on the last MenuItem in a segment block`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuSegmentTitleComponent />);

    const subMenu = submenu(page).nth(1);
    await subMenu.hover();
    const lastMenuItem = submenu(page).locator("a").last();
    await lastMenuItem.focus();
    await expect(lastMenuItem).toHaveCSS("border-radius", "0px 0px 8px 8px");
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

  test(`should render with the expected border radius styling on the Submenu Scrollable Block`, async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentScrollable />);

    const subMenu = submenu(page).first();
    await subMenu.hover();
    const scrollableBlock = scrollBlock(page).first();
    await expect(scrollableBlock).toHaveCSS("border-radius", "0px 0px 0px 8px");
    const scrollableItem = scrollBlock(page).locator("a").last();
    await expect(scrollableItem).toHaveCSS("border-radius", "0px 0px 0px 8px");
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

  test("should apply the expected styling to the scrollbar when menuType is white", async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentScrollable />);
    const subMenu = submenu(page).first();
    await subMenu.hover();
    const scrollableBlock = scrollBlock(page).first();

    await expect(scrollableBlock).toHaveCSS(
      "scrollbar-color",
      "rgb(89, 122, 139) rgb(242, 245, 246)",
    );
  });

  test("should apply the expected styling to the scrollbar when menuType is light", async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentScrollable />);
    const subMenu = submenu(page).nth(2);
    await subMenu.hover();
    const scrollableBlock = scrollBlock(page).first();

    await expect(scrollableBlock).toHaveCSS(
      "scrollbar-color",
      "rgb(89, 122, 139) rgb(242, 245, 246)",
    );
  });

  test("should apply the expected styling to the scrollbar when menuType is dark", async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentScrollable />);
    const subMenu = submenu(page).nth(5);
    await subMenu.hover();
    const scrollableBlock = scrollBlock(page).first();

    await expect(scrollableBlock).toHaveCSS(
      "scrollbar-color",
      "rgb(89, 122, 139) rgb(242, 245, 246)",
    );
  });

  test("should apply the expected styling to the scrollbar when menuType is black", async ({
    mount,
    page,
  }) => {
    await mount(<MenuComponentScrollable />);
    const subMenu = submenu(page).nth(6);
    await subMenu.hover();
    const scrollableBlock = scrollBlock(page).first();

    await expect(scrollableBlock).toHaveCSS(
      "scrollbar-color",
      "rgb(204, 204, 204) rgb(128, 128, 128)",
    );
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

  test(`should render with all the content of a long submenu accessible with the keyboard while remaining visible`, async ({
    mount,
    page,
  }) => {
    await mount(<InGlobalHeaderStory />);

    await page.setViewportSize({ width: 1000, height: 500 });
    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowDown");
    const subMenuItem = submenuItem(page, 1);
    await expect(subMenuItem).toHaveCount(20);
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("ArrowDown");
    }
    const focusedElement = page.locator("*:focus");
    await expect(focusedElement).toHaveText("Foo 20");
    const subMenu = page.locator(
      '[data-component="submenu-wrapper"] ul > li:nth-child(20)',
    );
    await expect(subMenu).toBeInViewport();
  });

  test(`should render with all the content of a long submenu accessible with the keyboard while remaining visible if the navbar height changes`, async ({
    mount,
    page,
  }) => {
    await mount(<NavigationBarWithSubmenuAndChangingHeight />);

    await page.setViewportSize({ width: 1000, height: 500 });
    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowDown");
    const subMenuItem = submenuItem(page, 1);
    await expect(subMenuItem).toHaveCount(21);
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press("ArrowDown");
    }
    await page.keyboard.press("Enter");

    await page.waitForTimeout(100);
    await page.keyboard.press("Tab");
    await page.keyboard.press("ArrowDown");
    for (let i = 0; i < 21; i++) {
      await page.keyboard.press("ArrowDown");
    }
    const subMenu = page.locator(
      '[data-component="submenu-wrapper"] ul > li:nth-child(21)',
    );
    await expect(subMenu).toBeInViewport();
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
});

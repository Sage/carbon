import React from "react";
import { mount, ReactWrapper } from "enzyme";

import { act } from "react-dom/test-utils";
import ScrollableBlock, { ScrollableBlockProps } from ".";
import MenuItem from "../menu-item";
import MenuContext, { MenuType } from "../menu.context";
import menuConfigVariants from "../menu.config";
import SubmenuContext from "../__internal__/submenu/submenu.context";
import StyledMenuItemWrapper from "../menu-item/menu-item.style";
import MenuDivider from "../menu-divider/menu-divider.component";
import Search from "../../search";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import StyledScrollableBlock from "./scrollable-block.style";
import StyledBox from "../../box/box.style";
import { StyledMenuItem } from "../menu.style";
import { StyledLink } from "../../link/link.style";
import Logger from "../../../__internal__/utils/logger";
import openSubmenu from "../__internal__/spec-helper";
import Menu from "../menu.component";

// mock Logger.deprecate so that Typography (used for the alert dialog's heading) doesn't trigger a warning while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

const handleKeyDownFn = jest.fn();

const submenuContextValues = (blockIndex?: number, focusIndex?: number) => ({
  handleKeyDown: handleKeyDownFn,
  blockIndex,
  focusIndex,
});

describe("ScrollableBlock", () => {
  let container: HTMLDivElement | null;
  let wrapper: ReactWrapper;

  const render = (
    menuType: MenuType,
    props: Partial<ScrollableBlockProps> = {},
    blockIndex?: number,
    focusIndex?: number
  ) => {
    return mount(
      <MenuContext.Provider
        value={{
          menuType,
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <SubmenuContext.Provider
          value={submenuContextValues(blockIndex, focusIndex)}
        >
          <ScrollableBlock {...props}>
            <MenuItem href="#">Apple</MenuItem>
            <MenuItem href="#">Banana</MenuItem>
            <MenuDivider />
            <MenuItem href="#">Carrot</MenuItem>
            <MenuItem href="#">Broccoli</MenuItem>
          </ScrollableBlock>
        </SubmenuContext.Provider>
      </MenuContext.Provider>,
      { attachTo: container }
    );
  };

  const renderWithCompleteMenu = (children: React.ReactNode) => {
    return mount(
      <Menu menuType="black">
        <MenuItem onClick={() => {}}>Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="Menu Item Three">
          <ScrollableBlock height="200px">
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
            <MenuItem href="#">Item Submenu Three</MenuItem>
            <MenuItem href="#">Item Submenu Four</MenuItem>
            <MenuItem href="#">Item Submenu Five</MenuItem>
            <MenuItem href="#">Item Submenu Six</MenuItem>
            <MenuItem href="#">Item Submenu Seven</MenuItem>
            <MenuItem href="#">Item Submenu Eight</MenuItem>
            <MenuItem href="#">Item Submenu Nine</MenuItem>
            <MenuItem href="#">Item Submenu Ten</MenuItem>
            <MenuItem href="#">Item Submenu Eleven</MenuItem>
            <MenuItem href="#">Item Submenu Twelve</MenuItem>
          </ScrollableBlock>
        </MenuItem>
        <MenuItem submenu="Menu Item Four">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <ScrollableBlock variant="alternate" height="200px">
            {children}
          </ScrollableBlock>
        </MenuItem>
      </Menu>,
      { attachTo: container }
    );
  };

  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
  });

  afterAll(() => {
    loggerSpy.mockRestore();
  });

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "enzymeContainer";
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });

  describe.each<MenuType>(["white", "light", "dark", "black"])(
    "when MenuType is %s",
    (menuType) => {
      it("should add the correct styles", () => {
        wrapper = render(menuType, { variant: "default" });

        assertStyleMatch(
          {
            backgroundColor: menuConfigVariants[menuType].submenuItemBackground,
          },
          wrapper,
          { modifier: `&& ${StyledMenuItemWrapper}` }
        );
      });

      describe("when variant prop set to alternate", () => {
        it("should add the correct styles", () => {
          wrapper = render(menuType, { variant: "alternate" });

          assertStyleMatch(
            {
              backgroundColor: menuConfigVariants[menuType].alternate,
            },
            wrapper,
            { modifier: `&& ${StyledMenuItemWrapper}` }
          );
        });
      });

      it("should apply the expected border-radius styling on the list container element", () => {
        assertStyleMatch(
          {
            borderRadius: "var(--borderRadius000)",
          },
          render(menuType, { variant: "default" }),
          { modifier: `${StyledBox}` }
        );
      });

      it.each([
        ["StyledLink", `${StyledLink}`],
        ["a", "a"],
        ["button", "button"],
      ])(
        "should apply the expected border-radius styling on the %s element of the last menu item",
        (_, modifier) => {
          assertStyleMatch(
            {
              borderBottomLeftRadius: "var(--borderRadius100)",
              borderBottomRightRadius: "var(--borderRadius000)",
            },
            (wrapper = render(menuType, { variant: "default" })),
            {
              modifier: `${StyledBox} ${StyledMenuItem}:last-child ${modifier}`,
            }
          );
        }
      );
    }
  );

  describe("parent prop", () => {
    it("should render the parent item, wrapped in a MenuItem", () => {
      wrapper = render("light", {
        parent: <Search value="" onChange={() => {}} />,
      });

      const firstMenuItem = wrapper.find(StyledMenuItemWrapper).at(0);

      expect(firstMenuItem.exists(Search)).toBe(true);
    });

    it.each([
      ["default", "alternate", "alternate"],
      ["alternate", "default", "submenuItemBackground"],
    ] as const)(
      "should render parent with the correct variant: with scrollable variant %s and parent variant %s",
      (blockVariant, parentVariant, expectedColor) => {
        wrapper = render("light", {
          variant: blockVariant,
          parent: <Search value="" onChange={() => {}} />,
          parentVariant,
        });

        const parentMenuItem = wrapper.find(StyledMenuItemWrapper).at(0);

        assertStyleMatch(
          {
            backgroundColor: menuConfigVariants.light[expectedColor],
          },
          parentMenuItem,
          { modifier: "&&&&" }
        );
      }
    );
  });

  describe("tags on component", () => {
    it("includes correct component, element and role data tags", () => {
      wrapper = mount(
        <ul>
          <ScrollableBlock data-element="bar" data-role="baz">
            <MenuItem href="#">Apple</MenuItem>
            <MenuItem href="#">Banana</MenuItem>
            <MenuDivider />
            <MenuItem href="#">Carrot</MenuItem>
            <MenuItem href="#">Broccoli</MenuItem>
          </ScrollableBlock>
        </ul>
      );

      expect(
        wrapper
          .find(StyledScrollableBlock)
          .getDOMNode()
          .getAttribute("data-component")
      ).toEqual("submenu-scrollable-block");

      expect(
        wrapper
          .find(StyledScrollableBlock)
          .getDOMNode()
          .getAttribute("data-element")
      ).toEqual("bar");

      expect(
        wrapper
          .find(StyledScrollableBlock)
          .getDOMNode()
          .getAttribute("data-role")
      ).toEqual("baz");
    });
  });

  describe("border-radius styling", () => {
    const childrenOne = [
      <MenuItem>Item Submenu Three</MenuItem>,
      <MenuItem>Item Submenu Four</MenuItem>,
      <MenuItem>Item Submenu Five</MenuItem>,
      <MenuItem>Item Submenu Six</MenuItem>,
      <MenuItem>Item Submenu Seven</MenuItem>,
      <MenuItem>Item Submenu Eight</MenuItem>,
      <MenuItem>Item Submenu Nine</MenuItem>,
      <MenuItem>Item Submenu Ten</MenuItem>,
      <MenuItem>Item Submenu Eleven</MenuItem>,
      <MenuItem>Item Submenu Twelve</MenuItem>,
    ];

    beforeEach(() => {
      wrapper = renderWithCompleteMenu(childrenOne);
    });

    afterEach(() => {
      if (wrapper) {
        wrapper.unmount();
      }
    });

    it("should apply the correct border-radius styling when last menu item is not visible because it exceeds the bottom of the submenu", () => {
      openSubmenu(wrapper, 1);

      const submenuElement = document.querySelector(
        '[data-component="submenu"]'
      );

      const scrollableBlockElement = document.querySelector(
        '[data-component="submenu-scrollable-block"]'
      );

      const menuItemElement = scrollableBlockElement?.querySelectorAll(
        '[data-component="menu-item"]'
      );

      const lastMenuItemElement = menuItemElement?.[menuItemElement.length - 1];

      Object.defineProperty(submenuElement, "getBoundingClientRect", {
        value: () => ({
          bottom: 328,
          height: 288,
          left: 255.953125,
          right: 412.0625,
          top: 40,
          width: 156.109375,
          x: 255.953125,
          y: 40,
          toJSON: () => {},
        }),
      });

      Object.defineProperty(lastMenuItemElement, "getBoundingClientRect", {
        value: () => ({
          bottom: 448,
          height: 40,
          left: 255.953125,
          right: 412.0625,
          top: 408,
          width: 156.109375,
          x: 255.953125,
          y: 408,
          toJSON: () => {},
        }),
      });

      wrapper.update();

      assertStyleMatch(
        {
          borderBottomLeftRadius: "var(--borderRadius100)",
          borderBottomRightRadius: "var(--borderRadius000)",
        },
        wrapper.find(StyledScrollableBlock),
        { modifier: `${StyledBox} ${StyledMenuItem}:last-child a` }
      );
    });

    it("should apply the expected border-radius styling when the children change and the last menu item no longer exceeds the bottom of the submenu", () => {
      const childrenTwo = [
        <MenuItem>Item Submenu Three</MenuItem>,
        <MenuItem>Item Submenu Four</MenuItem>,
        <MenuItem>Item Submenu Five</MenuItem>,
        <MenuItem>Item Submenu Six</MenuItem>,
        <MenuItem>Item Submenu Seven</MenuItem>,
        <MenuItem>Item Submenu Eight</MenuItem>,
        <MenuItem>Item Submenu Nine</MenuItem>,
      ];

      openSubmenu(wrapper, 1);

      const submenuElement = document.querySelector(
        '[data-component="submenu"]'
      );

      const scrollableBlockElement = document.querySelector(
        '[data-component="submenu-scrollable-block"]'
      );

      const menuItemElement = scrollableBlockElement?.querySelectorAll(
        '[data-component="menu-item"] li'
      );

      const lastMenuItemElement = menuItemElement?.[menuItemElement.length - 1];

      if (!lastMenuItemElement) return;
      jest
        .spyOn(lastMenuItemElement, "getBoundingClientRect")
        .mockImplementation(
          () =>
            ({
              bottom: 130,
              height: 40,
              left: 255.953125,
              right: 412.0625,
              top: 128,
              width: 156.109375,
              x: 255.953125,
              y: 128,
              toJSON: () => {},
            } as DOMRect)
        );

      if (!submenuElement) return;
      jest.spyOn(submenuElement, "getBoundingClientRect").mockImplementation(
        () =>
          ({
            bottom: 168,
            height: 40,
            left: 255.953125,
            right: 412.0625,
            top: 128,
            width: 156.109375,
            x: 255.953125,
            y: 128,
            toJSON: () => {},
          } as DOMRect)
      );

      act(() => {
        wrapper.setProps({ children: childrenTwo });
      });

      wrapper.update();

      assertStyleMatch(
        {
          borderBottomLeftRadius: "var(--borderRadius000)",
          borderBottomRightRadius: "var(--borderRadius000)",
        },
        wrapper.find(StyledScrollableBlock),
        { modifier: `${StyledBox} ${StyledMenuItem}:last-child a` }
      );
    });
  });
});

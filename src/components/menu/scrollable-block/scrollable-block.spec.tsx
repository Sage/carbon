import React from "react";
import { mount, ReactWrapper } from "enzyme";

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
});

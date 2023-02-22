import React from "react";
import { mount } from "enzyme";

import ScrollableBlock from ".";
import MenuItem from "../menu-item";
import MenuContext from "../menu.context";
import menuConfigVariants from "../menu.config";
import SubmenuContext from "../__internal__/submenu/submenu.context";
import StyledMenuItemWrapper from "../menu-item/menu-item.style";
import MenuDivider from "../menu-divider/menu-divider.component";
import Search from "../../search";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";

const handleKeyDownFn = jest.fn();

const submenuContextValues = (blockIndex, focusIndex) => ({
  handleKeyDown: handleKeyDownFn,
  blockIndex,
  focusIndex,
});

describe("ScrollableBlock", () => {
  let container;
  let wrapper;

  const render = (menuType, props, blockIndex, focusIndex) => {
    return mount(
      <MenuContext.Provider value={{ menuType }}>
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

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "enzymeContainer";
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  describe.each(["white", "light", "dark", "black"])(
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
    ])(
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
});

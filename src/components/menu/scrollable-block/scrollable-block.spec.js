import React from "react";
import { mount } from "enzyme";

import ScrollableBlock from ".";
import MenuItem from "../menu-item";
import MenuContext from "../menu.context";
import SubmenuContext from "../__internal__/submenu/submenu.context";

import StyledMenuItemWrapper from "../menu-item/menu-item.style";
import MenuDivider from "../menu-divider/menu-divider.component";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import { baseTheme } from "../../../style/themes";

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
            <MenuItem>Apple</MenuItem>
            <MenuItem>Banana</MenuItem>
            <MenuDivider />
            <MenuItem>Carrot</MenuItem>
            <MenuItem>Broccoli</MenuItem>
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
            backgroundColor: baseTheme.menu[menuType].submenuBackground,
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
              backgroundColor: baseTheme.menu[menuType].background,
            },
            wrapper,
            { modifier: `&& ${StyledMenuItemWrapper}` }
          );
        });
      });
    }
  );

  describe("when a block child focused by submenu context", () => {
    it("should focus the underlying MenuItem", () => {
      wrapper = render("dark", {}, 1, 2);

      expect(wrapper.find(StyledMenuItemWrapper).at(1).find("a")).toBeFocused();
    });
  });
});

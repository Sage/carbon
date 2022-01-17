import React from "react";
import { shallow, mount } from "enzyme";

import { MenuItem, SubmenuBlock } from "..";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import { baseTheme } from "../../../style/themes";
import MenuContext from "../menu.context";
import StyledSubmenuBlock from "./submenu-block.style";
import StyledMenuItemWrapper from "../menu-item/menu-item.style";

const menuContextValues = (menuType) => ({
  menuType,
  openSubmenu: true,
});

describe("SubmenuBlock", () => {
  let wrapper;

  const render = (menuType, variant = "default") => {
    return mount(
      <MenuContext.Provider value={menuContextValues(menuType)}>
        <SubmenuBlock variant={variant}>
          <MenuItem>Item Submenu One</MenuItem>
        </SubmenuBlock>
      </MenuContext.Provider>
    );
  };

  beforeEach(() => {
    wrapper = shallow(
      <SubmenuBlock>
        <MenuItem>Item Submenu One</MenuItem>
      </SubmenuBlock>
    );
  });

  it("should render children correctly", () => {
    expect(wrapper.find(MenuItem).exists()).toBe(true);
  });

  it("should have `data-component` to be `submenu-block`", () => {
    expect(wrapper.prop("data-component")).toBe("submenu-block");
  });

  it.each(["light", "white", "dark", "black"])(
    'should render correct styles for `menuType="%s"`',
    (menuType) => {
      wrapper = render(menuType);

      assertStyleMatch(
        {
          backgroundColor: baseTheme.menu[menuType].submenuBackground,
        },
        wrapper.find(StyledSubmenuBlock)
      );
    }
  );

  it.each(["light", "white", "dark", "black"])(
    'should render correct styles if `variant="alternate"` for `menuType="%s"`',
    (menuType) => {
      wrapper = render(menuType, "alternate");

      assertStyleMatch(
        {
          backgroundColor: baseTheme.menu[menuType].alternate,
        },
        wrapper.find(StyledSubmenuBlock),
        {
          modifier: `${StyledMenuItemWrapper}`,
        }
      );
    }
  );
});

import React from "react";
import { shallow, mount } from "enzyme";

import { MenuItem, SubmenuBlock } from "..";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import { baseTheme } from "../../../style/themes";
import { StyledSubmenu } from "../__internal__/submenu/submenu.style";
import { MenuContext } from "../menu.component";
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

  it('should render correct styles if `menuType="dark"`', () => {
    wrapper = render("dark");

    assertStyleMatch(
      {
        backgroundColor: baseTheme.menu.dark.submenuBackground,
      },
      wrapper.find(StyledSubmenuBlock)
    );
  });

  it('should render correct styles if `variant="alternate"`', () => {
    wrapper = render("dark", "alternate");

    assertStyleMatch(
      {
        backgroundColor: "#003349",
      },
      wrapper.find(StyledMenuItemWrapper)
    );
  });

  it('should render correct styles if `submenuDirection="left"`', () => {
    wrapper = mount(
      <StyledSubmenu submenuDirection="left">
        <MenuItem>Item Submenu One</MenuItem>
      </StyledSubmenu>
    );

    assertStyleMatch(
      {
        right: "0",
      },
      wrapper
    );
  });
});

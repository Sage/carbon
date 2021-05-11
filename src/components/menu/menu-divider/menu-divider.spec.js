import React from "react";
import { shallow, mount } from "enzyme";

import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import MenuDivider from "./menu-divider.component";
import { MenuContext } from "../menu.component";
import { MenuItem } from "..";
import { baseTheme } from "../../../style/themes";
import StyledDivider from "./menu-divider.style";
import openSubmenu from "../__internal__/spec-helper";

const menuContextValues = (menuType) => ({
  menuType,
  handleKeyDown: () => null,
});

describe("MenuDivider", () => {
  let wrapper;

  const render = (menuType) => {
    return mount(
      <MenuContext.Provider value={menuContextValues(menuType)}>
        <MenuItem submenu="Item One">
          <MenuDivider />
        </MenuItem>
      </MenuContext.Provider>
    );
  };

  it('should render data-component to be "menu-divider"', () => {
    wrapper = shallow(<MenuDivider />);
    expect(wrapper.find(StyledDivider).prop("data-component")).toBe(
      "menu-divider"
    );
  });

  it("should get menuType from menu context", () => {
    wrapper = render("light");
    openSubmenu(wrapper);

    expect(wrapper.find(StyledDivider).props().menuType).toBe("light");
  });

  it('should have correct styles if menuType="light"', () => {
    wrapper = render("light");
    openSubmenu(wrapper);

    assertStyleMatch(
      {
        background: baseTheme.menu.light.divider,
        cursor: "default",
      },
      wrapper.find(StyledDivider)
    );
  });

  it('should have correct styles if menuType="dark"', () => {
    wrapper = render("dark");
    openSubmenu(wrapper);

    assertStyleMatch(
      {
        background: baseTheme.menu.dark.divider,
      },
      wrapper.find(StyledDivider)
    );
  });

  it('should have correct styles for "default" size', () => {
    wrapper = mount(<MenuDivider />);

    assertStyleMatch(
      {
        margin: "0px 16px",
        height: "1px",
      },
      wrapper.find(StyledDivider)
    );
  });

  it('should have correct styles for "large" size', () => {
    wrapper = mount(<MenuDivider size="large" />);

    assertStyleMatch(
      {
        height: "4px",
        margin: "0px",
      },
      wrapper.find(StyledDivider)
    );
  });
});

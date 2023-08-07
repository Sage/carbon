import React from "react";
import { shallow, mount } from "enzyme";

import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import MenuDivider from "./menu-divider.component";
import MenuContext, { MenuType } from "../menu.context";
import { MenuItem } from "..";
import StyledDivider from "./menu-divider.style";
import openSubmenu from "../__internal__/spec-helper";
import menuConfigVariants from "../menu.config";

const menuContextValues = (menuType: MenuType) => ({
  menuType,
  handleKeyDown: () => null,
  setOpenSubmenuId: () => null,
  openSubmenuId: null,
  inMenu: true,
});

describe("MenuDivider", () => {
  let wrapper;

  const render = (menuType: MenuType) => {
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

  it.each<MenuType>(["light", "white", "dark", "black"])(
    "should have correct styles for %s menuType",
    (menuType) => {
      wrapper = render(menuType);
      openSubmenu(wrapper);

      assertStyleMatch(
        {
          backgroundColor: menuConfigVariants[menuType].divider,
          cursor: "default",
        },
        wrapper.find(StyledDivider)
      );
    }
  );

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

  describe("tags on component", () => {
    it("includes correct component, element and role data tags", () => {
      wrapper = mount(<MenuDivider data-element="bar" data-role="baz" />).find(
        StyledDivider
      );

      expect(wrapper.getDOMNode().getAttribute("data-component")).toEqual(
        "menu-divider"
      );

      expect(wrapper.getDOMNode().getAttribute("data-element")).toEqual("bar");

      expect(wrapper.getDOMNode().getAttribute("data-role")).toEqual("baz");
    });
  });
});

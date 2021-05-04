import React from "react";
import { shallow, mount } from "enzyme";

import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import MenuSegmentTitle from "./menu-segment-title.component";
import { MenuContext } from "../menu.component";
import { MenuItem } from "..";
import StyledTitle from "./menu-segment-title.style";
import { baseTheme } from "../../../style/themes";
import openSubmenu from "../__internal__/spec-helper";

const menuContextValues = (menuType) => ({
  menuType,
  handleKeyDown: () => null,
});

describe("Title", () => {
  let wrapper;

  const render = (menuType, variant) => {
    return mount(
      <MenuContext.Provider value={menuContextValues(menuType)}>
        <MenuItem submenu="Item One">
          <MenuSegmentTitle variant={variant}>foo</MenuSegmentTitle>
        </MenuItem>
      </MenuContext.Provider>
    );
  };

  it('should render data-component to be "menu-segment-title"', () => {
    wrapper = shallow(<MenuSegmentTitle>foo</MenuSegmentTitle>);
    expect(wrapper.find(StyledTitle).prop("data-component")).toBe(
      "menu-segment-title"
    );
  });

  it("should get menuType from menu context", () => {
    wrapper = render("light");
    openSubmenu(wrapper);

    expect(wrapper.find(StyledTitle).prop("menuType")).toBe("light");
  });

  it("should have correct styles as default", () => {
    wrapper = render("light");
    openSubmenu(wrapper);

    assertStyleMatch(
      {
        padding: "16px 16px 8px",
        fontSize: "12px",
        fontWeight: "700",
        textTransform: "uppercase",
        lineHeight: "12px",
        cursor: "default",
      },
      wrapper.find(StyledTitle)
    );
  });

  it('should have correct styles if menuType="light" and "alternate" variant', () => {
    wrapper = render("light", "alternate");
    openSubmenu(wrapper);

    assertStyleMatch(
      {
        color: baseTheme.menu.light.title,
        background: baseTheme.menu.light.background,
      },
      wrapper.find(StyledTitle)
    );
  });

  it('should have correct styles if menuType="dark"', () => {
    wrapper = render("dark");
    openSubmenu(wrapper);

    assertStyleMatch(
      {
        color: baseTheme.menu.dark.title,
      },
      wrapper.find(StyledTitle)
    );
  });

  it('should have correct styles if menuType="dark"  and "alternate" variant', () => {
    wrapper = render("dark", "alternate");
    openSubmenu(wrapper);

    assertStyleMatch(
      {
        color: baseTheme.menu.dark.title,
        background: baseTheme.colors.slate,
      },
      wrapper.find(StyledTitle)
    );
  });
});

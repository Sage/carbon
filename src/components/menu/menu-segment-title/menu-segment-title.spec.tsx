import React from "react";
import { mount } from "enzyme";

import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import MenuSegmentTitle, {
  MenuTitleProps,
} from "./menu-segment-title.component";
import MenuContext, { MenuContextProps, MenuType } from "../menu.context";
import { MenuItem } from "..";
import { StyledSegmentChildren, StyledTitle } from "./menu-segment-title.style";
import openSubmenu from "../__internal__/spec-helper";
import menuConfigVariants from "../menu.config";
import { VariantType } from "../menu-item";

const AS_VALUES = ["h2", "h3", "h4", "h5", "h6", undefined] as const;

const menuContextValues = (menuType: MenuType): MenuContextProps => ({
  menuType,
  setOpenSubmenuId: () => null,
  openSubmenuId: null,
  inMenu: true,
});

describe("Title", () => {
  let wrapper;

  const render = (
    menuType: MenuType,
    variant?: VariantType,
    as?: MenuTitleProps["as"]
  ) => {
    return mount(
      <MenuContext.Provider value={menuContextValues(menuType)}>
        <ul>
          <MenuItem submenu="Item One">
            <MenuSegmentTitle text="foo" variant={variant} as={as}>
              <li>bar</li>
            </MenuSegmentTitle>
          </MenuItem>
        </ul>
      </MenuContext.Provider>
    );
  };

  it("should get menuType from menu context", () => {
    wrapper = render("light");
    openSubmenu(wrapper);

    expect(wrapper.find(StyledTitle).prop("menuType")).toBe("light");
  });

  it.each(AS_VALUES)(
    "should render title as a heading element and render list items as children of the ul",
    (tag) => {
      wrapper = render("light", undefined, tag);
      openSubmenu(wrapper);
      const title = wrapper.find(StyledTitle);
      const segmentList = wrapper.find(StyledSegmentChildren);

      let tagName = tag;

      if (!tag) {
        tagName = "h2";
      }

      expect(title.getDOMNode().tagName).toBe(tagName?.toUpperCase());
      expect(segmentList.getDOMNode().tagName).toBe("UL");
      expect(segmentList.find("li").text()).toBe("bar");
    }
  );

  describe.each<MenuType>(["light", "white", "dark", "black"])(
    "when menuType is %s",
    (menuType) => {
      it("should have correct styles as default", () => {
        wrapper = render(menuType);
        openSubmenu(wrapper);

        assertStyleMatch(
          {
            padding: "16px 16px 8px",
            fontSize: "12px",
            fontWeight: "700",
            textTransform: "uppercase",
            lineHeight: "12px",
            cursor: "default",
            color: menuConfigVariants[menuType].title,
          },
          wrapper.find(StyledTitle)
        );
      });

      it('should have correct styles in an "alternate" variant', () => {
        wrapper = render(menuType, "alternate");
        openSubmenu(wrapper);

        assertStyleMatch(
          {
            backgroundColor: menuConfigVariants[menuType].alternate,
          },
          wrapper.find(StyledTitle)
        );
      });
    }
  );

  describe("tags on component", () => {
    it("includes correct component, element and role data tags", () => {
      wrapper = mount(
        <MenuSegmentTitle text="foo" data-element="bar" data-role="baz">
          <li>bar</li>
        </MenuSegmentTitle>
      ).find(StyledTitle);

      expect(wrapper.getDOMNode().getAttribute("data-component")).toEqual(
        "menu-segment-title"
      );

      expect(wrapper.getDOMNode().getAttribute("data-element")).toEqual("bar");

      expect(wrapper.getDOMNode().getAttribute("data-role")).toEqual("baz");
    });
  });
});

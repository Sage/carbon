import React from "react";
import { shallow, mount } from "enzyme";
import { MenuItem } from "..";
import Link from "../../link";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import { baseTheme } from "../../../style/themes";
import StyledMenuItemWrapper from "./menu-item.style";
import {
  StyledSubmenuTitle,
  StyledSubmenu,
} from "../submenu-block/submenu.style";

describe("MenuItem", () => {
  let wrapper;

  it("should render children correctly", () => {
    wrapper = shallow(<MenuItem>Item One</MenuItem>);

    expect(wrapper.text()).toContain("Item One");
  });

  it("should render additional `carbon-menu-item--has-link` if specify props exsists", () => {
    wrapper = shallow(<MenuItem href="#">Item One</MenuItem>);

    expect(wrapper.props().className).toBe("carbon-menu-item--has-link");
  });

  it("should provide prop `routerLink` correctly", () => {
    const CustomRouterLink = () => <a href="/test">custom link</a>;

    wrapper = mount(
      <MenuItem routerLink={<CustomRouterLink />}>Item</MenuItem>
    );

    expect(
      wrapper.find(StyledMenuItemWrapper).first().props().routerLink
    ).toEqual(<CustomRouterLink />);
  });

  describe("props.submenu", () => {
    it("should render `div` if prop submenu exists", () => {
      wrapper = mount(
        <MenuItem submenu="Item submenu title">
          <MenuItem>Submenu Item One</MenuItem>
        </MenuItem>
      );

      expect(wrapper.find('[as="div"]').first().exists()).toBe(true);
    });

    it("should render `Link` component if props submenu does not exist", () => {
      wrapper = mount(<MenuItem>Item One</MenuItem>);

      expect(wrapper.find(Link).exists()).toBe(true);
    });

    it("should not provide prop `routerLink` if prop `submenu` exists", () => {
      const CustomRouterLink = () => <a href="/test">custom link</a>;

      wrapper = mount(
        <MenuItem submenu="submenu" routerLink={<CustomRouterLink />}>
          <MenuItem>Submenu Item</MenuItem>
        </MenuItem>
      );

      expect(
        wrapper.find(StyledMenuItemWrapper).first().props().routerLink
      ).toBe(undefined);
    });

    it('should render nested `<MenuItem />` with `submenuDirection="right"` as default if prop submenu exists', () => {
      wrapper = shallow(
        <MenuItem submenu="submenu">
          <MenuItem>Item one</MenuItem>
        </MenuItem>
      );

      expect(wrapper.find(StyledSubmenu).props().submenuDirection).toBe(
        "right"
      );
    });

    describe('`menuType="light"`', () => {
      it("should render correct styles", () => {
        wrapper = mount(<MenuItem menuType="light">Item one</MenuItem>);

        assertStyleMatch(
          {
            backgroundColor: baseTheme.menu.light.background,
          },
          wrapper
        );
      });

      it("should render correct styles if is `selected` in a `light` scheme", () => {
        wrapper = mount(
          <MenuItem menuType="light" selected>
            Item one
          </MenuItem>
        );

        assertStyleMatch(
          {
            backgroundColor: baseTheme.menu.light.selected,
          },
          wrapper
        );
      });

      it("should render correct styles if is `selected` in a `light` scheme", () => {
        wrapper = mount(
          <MenuItem menuType="dark" selected>
            Item one
          </MenuItem>
        );

        assertStyleMatch(
          {
            backgroundColor: baseTheme.menu.dark.selected,
          },
          wrapper
        );
      });

      it("should render correct styles if `hasSubmenu`", () => {
        wrapper = mount(
          <MenuItem menuType="light" submenu="submenu">
            <MenuItem>Item one</MenuItem>
          </MenuItem>
        );

        assertStyleMatch(
          {
            width: "0",
            height: "0",
            borderTop: `5px solid ${baseTheme.colors.slate}`,
            borderRight: "4px solid transparent",
            borderBottom: "4px solid transparent",
            borderLeft: "4px solid transparent",
          },
          wrapper,
          { modifier: `${StyledSubmenuTitle} ${StyledMenuItemWrapper}::before` }
        );
      });

      it("should render correct styles if `isOpen` is true", () => {
        wrapper = mount(
          <StyledMenuItemWrapper menuType="light" isOpen hasSubmenu>
            test
          </StyledMenuItemWrapper>
        );

        assertStyleMatch(
          {
            backgroundColor: `${baseTheme.colors.white}`,
            color: `${baseTheme.colors.black}`,
          },
          wrapper,
          { modifier: `& ${StyledMenuItemWrapper}` }
        );
      });
    });

    describe('`menuType="dark"`', () => {
      it("should render correct styles", () => {
        wrapper = mount(<MenuItem menuType="dark">Item one</MenuItem>);

        assertStyleMatch(
          {
            backgroundColor: baseTheme.colors.slate,
          },
          wrapper
        );
      });

      it("should render correct styles if `hasSubmenu`", () => {
        wrapper = mount(
          <MenuItem menuType="dark" submenu="submenu">
            <MenuItem>Item one</MenuItem>
          </MenuItem>
        );

        assertStyleMatch(
          {
            width: "0",
            height: "0",
            borderTop: `5px solid ${baseTheme.colors.white}`,
            borderRight: "4px solid transparent",
            borderBottom: "4px solid transparent",
            borderLeft: "4px solid transparent",
          },
          wrapper,
          { modifier: `${StyledSubmenuTitle} ${StyledMenuItemWrapper}::before` }
        );
      });

      it("should render correct styles if `isOpen` is true", () => {
        wrapper = mount(
          <StyledMenuItemWrapper menuType="dark" isOpen hasSubmenu>
            test
          </StyledMenuItemWrapper>
        );

        assertStyleMatch(
          {
            backgroundColor: `${baseTheme.menu.dark.submenuBackground}`,
            color: `${baseTheme.colors.white}`,
          },
          wrapper,
          { modifier: `& ${StyledMenuItemWrapper}` }
        );
      });
    });
  });
});

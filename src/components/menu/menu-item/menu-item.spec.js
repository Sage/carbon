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

  it("should render additional `carbon-menu-item--has-link` if specified prop exists", () => {
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

  describe("submenu", () => {
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

      it("should render correct styles for alternate variant", () => {
        wrapper = mount(<MenuItem variant="alternate">Item one</MenuItem>);

        assertStyleMatch(
          {
            backgroundColor: `${baseTheme.menu.light.background}`,
          },
          wrapper
        );
      });

      it("should render correct styles if an onClick is provided", () => {
        wrapper = mount(
          <MenuItem menuType="dark" onClick={() => {}}>
            Item one
          </MenuItem>
        );

        assertStyleMatch(
          {
            padding: "0 16px",
            height: "40px",
            lineHeight: "40px",
            margin: "0px",
          },
          wrapper,
          { modifier: "button" }
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

      it("should render correct styles for alternate variant", () => {
        wrapper = mount(
          <MenuItem menuType="dark" variant="alternate">
            Item one
          </MenuItem>
        );

        assertStyleMatch(
          {
            backgroundColor: `${baseTheme.colors.slate}`,
            color: `${baseTheme.colors.white}`,
          },
          wrapper
        );
      });
    });

    describe("showDropdownArrow", () => {
      it("shows the arrow by default when there is a submenu", () => {
        wrapper = mount(
          <MenuItem submenu="submenu">
            <MenuItem>Item one</MenuItem>
          </MenuItem>
        );

        assertStyleMatch(
          {
            paddingRight: "32px",
          },
          wrapper,
          { modifier: `${StyledSubmenuTitle} ${StyledMenuItemWrapper}` }
        );

        assertStyleMatch(
          {
            display: "block",
            marginTop: "-2px",
            pointerEvents: "none",
            position: "absolute",
            right: "16px",
            top: "50%",
            zIndex: "2",
            content: `""`,
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

      it("does not show the arrow when prop is false and there is a submenu", () => {
        wrapper = mount(
          <MenuItem submenu="submenu" showDropdownArrow={false}>
            <MenuItem>Item one</MenuItem>
          </MenuItem>
        );

        expect(wrapper).not.toHaveStyleRule("padding-right", "32px", {
          modifier: `${StyledSubmenuTitle} ${StyledMenuItemWrapper}`,
        });
        expect(wrapper).not.toHaveStyleRule(
          "border-top",
          `5px solid ${baseTheme.colors.slate}`,
          { modifier: `${StyledSubmenuTitle} ${StyledMenuItemWrapper}::before` }
        );
        expect(wrapper).not.toHaveStyleRule(
          "border-right",
          "4px solid transparent",
          { modifier: `${StyledSubmenuTitle} ${StyledMenuItemWrapper}::before` }
        );
        expect(wrapper).not.toHaveStyleRule(
          "border-bottom",
          "4px solid transparent",
          { modifier: `${StyledSubmenuTitle} ${StyledMenuItemWrapper}::before` }
        );
        expect(wrapper).not.toHaveStyleRule(
          "border-left",
          "4px solid transparent",
          { modifier: `${StyledSubmenuTitle} ${StyledMenuItemWrapper}::before` }
        );
      });
    });
  });
});

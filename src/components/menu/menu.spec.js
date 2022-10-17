import React from "react";
import { shallow, mount } from "enzyme";
import { css } from "styled-components";
import { act } from "react-dom/test-utils";

import { Menu, MenuItem } from ".";
import { StyledMenuWrapper } from "./menu.style";
import VerticalDivider from "../vertical-divider";
import {
  StyledVerticalWrapper,
  StyledDivider,
} from "../vertical-divider/vertical-divider.style";
import {
  testStyledSystemLayout,
  testStyledSystemFlexBox,
  assertStyleMatch,
} from "../../__spec_helper__/test-utils";
import openSubmenu from "./__internal__/spec-helper";
import { StyledSubmenu } from "./__internal__/submenu/submenu.style";
import StyledMenuItemWrapper from "./menu-item/menu-item.style";
import menuConfigVariants from "./menu.config";

const events = {
  end: {
    key: "End",
    preventDefault: jest.fn(),
  },
};

describe("Menu", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Menu>
        <MenuItem href="#">test element</MenuItem>
      </Menu>
    );
  });

  testStyledSystemLayout((props) => <Menu {...props}>Foo</Menu>);
  testStyledSystemFlexBox((props) => <Menu {...props}>Foo</Menu>);

  it("should render with correct `data-component`", () => {
    expect(wrapper.prop("data-component")).toEqual("menu");
  });

  it("should have light theme as primary", () => {
    expect(wrapper.props().menuType).toBe("light");
  });

  it("should render children correctly", () => {
    expect(wrapper.find(MenuItem).exists()).toBe(true);
  });

  describe("VerticalDivider in Menu", () => {
    it.each(["light", "white", "dark", "black"])(
      "applies the expected styling for %s menuType",
      (menuType) => {
        wrapper = mount(
          <Menu menuType={menuType}>
            <VerticalDivider />
          </Menu>
        );

        assertStyleMatch(
          {
            backgroundColor: menuConfigVariants[menuType].background,
          },
          wrapper.find(StyledMenuWrapper),
          { modifier: `${StyledVerticalWrapper}` }
        );
      }
    );

    it('applies the expected styling when menuType is "dark"', () => {
      wrapper = mount(
        <Menu menuType="dark">
          <VerticalDivider />
        </Menu>
      );

      assertStyleMatch(
        {
          backgroundColor: "var(--colorsComponentsMenuAutumnStandard500)",
          color: "var(--colorsComponentsMenuYang100)",
          display: "inline-block",
          verticalAlign: "bottom",
        },
        wrapper.find(StyledMenuWrapper),
        { modifier: `${StyledVerticalWrapper}` }
      );

      assertStyleMatch(
        {
          position: "relative",
          top: "-1px",
        },
        wrapper.find(StyledMenuWrapper),
        {
          modifier: css`
            ${StyledVerticalWrapper} ${StyledDivider}
          `,
        }
      );
    });
  });

  describe("user interaction", () => {
    let container;
    let menuWrapper;

    const render = (props) => {
      return mount(
        <Menu {...props}>
          <MenuItem href="#">test one</MenuItem>
          <MenuItem submenu="one">
            <MenuItem href="#">test element one</MenuItem>
            <MenuItem href="#">test element two</MenuItem>
          </MenuItem>
          <MenuItem submenu="two">
            <MenuItem href="#">test element one</MenuItem>
            <MenuItem href="#">test element two</MenuItem>
          </MenuItem>
        </Menu>,
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
      if (menuWrapper) {
        menuWrapper.unmount();
        menuWrapper = null;
      }
    });

    describe("when a user presses end key", () => {
      it("should focus the last item", () => {
        menuWrapper = render();
        menuWrapper
          .find(StyledMenuItemWrapper)
          .at(0)
          .find("a")
          .getDOMNode()
          .focus();

        expect(
          menuWrapper.find(StyledMenuItemWrapper).at(0).find("a")
        ).toBeFocused();

        act(() => {
          menuWrapper
            .find(StyledMenuItemWrapper)
            .at(0)
            .props()
            .onKeyDown(events.end);
        });

        menuWrapper.update();

        expect(
          menuWrapper.find(StyledMenuItemWrapper).at(2).find("button")
        ).toBeFocused();
        wrapper.unmount();
      });
    });

    describe("when user clicks inside of the menu", () => {
      const setState = jest.fn();
      const useStateSpy = jest.spyOn(React, "useState");
      useStateSpy.mockImplementation((init) => [init, setState]);

      afterEach(() => {
        jest.clearAllMocks();
      });

      it("should not reset the menu state", () => {
        menuWrapper = render();
        jest.clearAllMocks();

        act(() => {
          menuWrapper.find(MenuItem).first().simulate("click");
          document.dispatchEvent(
            new CustomEvent("click", {
              detail: {
                enzymeTestingTarget: menuWrapper
                  .find(StyledMenuWrapper)
                  .getDOMNode(),
              },
            })
          );
        });

        act(() => {
          menuWrapper.update();
        });

        expect(setState).not.toHaveBeenCalled();
      });
    });
  });

  describe("with conditionally rendered children", () => {
    it("should not error when a child is null", () => {
      wrapper = mount(
        <Menu menuType="dark">
          {true && <MenuItem>One</MenuItem>}
          {false && <MenuItem>Two</MenuItem>}
        </Menu>
      );

      expect(wrapper.find(MenuItem).length).toEqual(1);
    });
  });

  describe("with multiple submenus", () => {
    it("when a sumenu is opened, any previously open submenu is closed", () => {
      wrapper = mount(
        <Menu>
          <MenuItem href="#">menu item</MenuItem>
          <MenuItem submenu="submenu 1">
            <MenuItem href="#">submenu 1 item 1</MenuItem>
            <MenuItem href="#">submenu 1 item 2</MenuItem>
          </MenuItem>
          <MenuItem submenu="submenu 2">
            <MenuItem href="#">submenu 2 item 1</MenuItem>
            <MenuItem href="#">submenu 2 item 2</MenuItem>
          </MenuItem>
        </Menu>
      );

      openSubmenu(wrapper, 0);
      let openSubmenus = wrapper.find(StyledSubmenu);
      expect(openSubmenus.length).toEqual(1);
      expect(openSubmenus.at(0).html()).toContain("submenu 1");
      openSubmenu(wrapper, 1);
      openSubmenus = wrapper.find(StyledSubmenu);
      expect(openSubmenus.length).toEqual(1);
      expect(openSubmenus.at(0).html()).toContain("submenu 2");
    });
  });
});

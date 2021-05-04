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
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import baseTheme from "../../style/themes/base";
import StyledMenuItemWrapper from "./menu-item/menu-item.style";

const events = {
  end: {
    key: "End",
    which: 35,
    preventDefault: jest.fn(),
  },
};

describe("Menu", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Menu>
        <MenuItem>test element</MenuItem>
      </Menu>
    );
  });

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
    it("applies the expected styling by default", () => {
      wrapper = mount(
        <Menu>
          <VerticalDivider />
        </Menu>
      );

      assertStyleMatch(
        {
          backgroundColor: baseTheme.menu.light.background,
        },
        wrapper.find(StyledMenuWrapper),
        { modifier: `${StyledVerticalWrapper}` }
      );
    });

    it('applies the expected styling when menuType is "dark"', () => {
      wrapper = mount(
        <Menu menuType="dark">
          <VerticalDivider />
        </Menu>
      );

      assertStyleMatch(
        {
          backgroundColor: baseTheme.colors.slate,
          color: baseTheme.colors.white,
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
          <MenuItem>test one</MenuItem>
          <MenuItem submenu="one">
            <MenuItem>test element one</MenuItem>
            <MenuItem>test element two</MenuItem>
          </MenuItem>
          <MenuItem submenu="two">
            <MenuItem>test element one</MenuItem>
            <MenuItem>test element two</MenuItem>
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
          menuWrapper.find(StyledMenuItemWrapper).at(2).find("a")
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
});

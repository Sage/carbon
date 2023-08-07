import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";

import { Menu, MenuItem, MenuProps } from ".";
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
import {
  StyledSubmenu,
  StyledSubmenuWrapper,
} from "./__internal__/submenu/submenu.style";
import StyledMenuItemWrapper from "./menu-item/menu-item.style";
import menuConfigVariants from "./menu.config";
import { MenuType } from "./menu.context";

const events = {
  end: {
    key: "End",
    preventDefault: jest.fn(),
  },
  tab: {
    key: "Tab",
    preventDefault: jest.fn(),
  },
  arrowDown: {
    key: "ArrowDown",
    preventDefault: jest.fn(),
  },
};

describe("Menu", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Menu>
        <MenuItem href="#">test element</MenuItem>
      </Menu>
    );
  });

  testStyledSystemLayout((props) => <Menu {...props}>Foo</Menu>);
  testStyledSystemFlexBox((props) => <Menu {...props}>Foo</Menu>);

  it("should render with correct `data-component`", () => {
    expect(wrapper.getDOMNode().getAttribute("data-component")).toEqual("menu");
  });

  it("should have light theme as primary", () => {
    assertStyleMatch(
      {
        backgroundColor: menuConfigVariants.light.background,
      },
      wrapper.find(StyledMenuWrapper),
      { modifier: `${StyledVerticalWrapper}` }
    );
  });

  it("should render children correctly", () => {
    expect(wrapper.find(MenuItem).exists()).toBe(true);
  });

  describe("VerticalDivider in Menu", () => {
    it.each<MenuType>(["light", "white", "dark", "black"])(
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
        { modifier: `${StyledVerticalWrapper} ${StyledDivider}` }
      );
    });
  });

  describe("user interaction", () => {
    let container: HTMLDivElement | null;
    let menuWrapper: ReactWrapper;

    const render = (props: Partial<MenuProps> = {}) => {
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
      if (container) {
        document.body.removeChild(container);
        container = null;
      }
      if (menuWrapper) {
        menuWrapper.unmount();
      }
    });

    describe("when a user presses end key", () => {
      it("should focus the last item", () => {
        menuWrapper = render();
        menuWrapper
          .find(StyledMenuItemWrapper)
          .at(0)
          .find("a")
          .getDOMNode<HTMLAnchorElement>()
          .focus();

        expect(
          menuWrapper.find(StyledMenuItemWrapper).at(0).find("a")
        ).toBeFocused();

        act(() => {
          menuWrapper.find(StyledMenuWrapper).props().onKeyDown(events.end);
        });

        menuWrapper.update();

        expect(
          menuWrapper.find(StyledMenuItemWrapper).at(2).find("button")
        ).toBeFocused();
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

  describe("when clicking a submenu parent item", () => {
    it.each(["tab", "arrowDown"] as const)(
      "should move focus to the first item in the submenu when %s key pressed",
      (key) => {
        const element = document.createElement("div");
        const htmlElement = document.body.appendChild(element);

        wrapper = mount(
          <Menu>
            <MenuItem submenu="submenu 1">
              <MenuItem href="#">submenu 1 item 1</MenuItem>
              <MenuItem href="#">submenu 1 item 2</MenuItem>
            </MenuItem>
          </Menu>,
          { attachTo: htmlElement }
        );

        const menuItem = wrapper
          .find(StyledSubmenuWrapper)
          .first()
          .find(StyledMenuItemWrapper);

        openSubmenu(wrapper, 0);

        expect(menuItem.exists()).toBe(true);

        act(() => {
          menuItem.props().onClick();
        });

        wrapper.update();

        act(() => {
          menuItem.props().onKeyDown(events[key]);
        });

        wrapper.update();

        expect(
          wrapper.find(StyledMenuItemWrapper).at(1).find("a")
        ).toBeFocused();
      }
    );
  });

  describe("when a MenuItem unmounts", () => {
    const MockMenu = () => {
      const [show, setShow] = React.useState(true);

      return (
        <Menu>
          {show && (
            <MenuItem onClick={() => setShow(false)}>test element 1</MenuItem>
          )}
          <MenuItem href="#">test element 2</MenuItem>
        </Menu>
      );
    };

    // this is to hit test coverage that the item unregisters its ID on unmount
    it("unregisters itself to the parent Menu", () => {
      wrapper = mount(<MockMenu />);

      expect(wrapper.find(MenuItem).length).toBe(2);

      act(() => {
        wrapper.find(StyledMenuItemWrapper).first().props().onClick();
      });

      wrapper.update();

      expect(wrapper.find(MenuItem).length).toBe(1);
    });
  });

  describe("tags on component", () => {
    it("includes correct component, element and role data tags", () => {
      wrapper = mount(
        <Menu data-element="bar" data-role="baz">
          <MenuItem>Foo</MenuItem>
        </Menu>
      ).find(StyledMenuWrapper);

      expect(wrapper.getDOMNode().getAttribute("data-component")).toEqual(
        "menu"
      );

      expect(wrapper.getDOMNode().getAttribute("data-element")).toEqual("bar");

      expect(wrapper.getDOMNode().getAttribute("data-role")).toEqual("baz");
    });
  });
});

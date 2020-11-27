import React from "react";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";

import { MenuItem } from "..";
import Link from "../../link";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import { baseTheme } from "../../../style/themes";
import StyledMenuItemWrapper from "./menu-item.style";
import Submenu, {
  SubmenuContext,
} from "../__internal__/submenu/submenu.component";
import { MenuContext } from "../menu.component";
import SubmenuBlock from "../submenu-block";

const events = {
  enter: {
    key: "Enter",
    which: 13,
    preventDefault: jest.fn(),
  },
  space: {
    key: "Space",
    which: 32,
    preventDefault: jest.fn(),
    defaultPrevented: true,
  },
  escape: {
    key: "Escape",
    which: 27,
    preventDefault: jest.fn(),
  },
};

const mockMenuhandleKeyDown = jest.fn();
const mockSubmenuhandleKeyDown = jest.fn();

const menuContextValues = (isFirstElement, isFocused) => ({
  handleKeyDown: mockMenuhandleKeyDown,
  isFirstElement,
  menuType: "light",
  isFocused,
});

const submenuContextValues = (isFocused) => ({
  handleKeyDown: mockSubmenuhandleKeyDown,
  isFocused,
});

describe("MenuItem", () => {
  let container;
  let wrapper;

  const renderMenuContext = (isFirstElement, isFocused, props) => {
    return mount(
      <MenuContext.Provider
        value={menuContextValues(isFirstElement, isFocused)}
      >
        <MenuItem {...props}>Item One</MenuItem>
      </MenuContext.Provider>,
      { attachTo: container }
    );
  };

  const renderSubmenuContext = (props) => {
    return mount(
      <MenuContext.Provider value={menuContextValues(false)}>
        <SubmenuContext.Provider value={submenuContextValues(false)}>
          <MenuItem {...props}>Item One</MenuItem>
        </SubmenuContext.Provider>
      </MenuContext.Provider>
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
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  it("should render children correctly", () => {
    wrapper = shallow(<MenuItem>Item One</MenuItem>);

    expect(wrapper.find(StyledMenuItemWrapper).text()).toContain("Item One");
  });

  it("should render additional `carbon-menu-item--has-link` if specified prop exists", () => {
    wrapper = shallow(<MenuItem href="#">Item One</MenuItem>);

    expect(wrapper.find(StyledMenuItemWrapper).props().className).toBe(
      "carbon-menu-item--has-link"
    );
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
    it("should render Submenu if prop submenu is set", () => {
      wrapper = mount(
        <MenuItem submenu="Item submenu title">
          <MenuItem>Submenu Item One</MenuItem>
        </MenuItem>
      );

      expect(wrapper.find(Submenu).exists()).toBe(true);
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

      expect(wrapper.find(Submenu).props().submenuDirection).toBe("right");
    });

    describe('`menuType="light"`', () => {
      it("should render correct styles", () => {
        wrapper = mount(
          <MenuContext.Provider value={{ menuType: "light" }}>
            <MenuItem>Item one</MenuItem>
          </MenuContext.Provider>
        );

        assertStyleMatch(
          {
            backgroundColor: baseTheme.menu.light.background,
          },
          wrapper.find(StyledMenuItemWrapper)
        );
      });

      it("should render correct styles if is `selected` in a `light` scheme", () => {
        wrapper = mount(
          <MenuContext.Provider value={{ menuType: "light" }}>
            <MenuItem selected>Item one</MenuItem>
          </MenuContext.Provider>
        );

        assertStyleMatch(
          {
            backgroundColor: baseTheme.menu.light.selected,
          },
          wrapper.find(StyledMenuItemWrapper)
        );
      });

      it("should render correct styles if is `selected` in a `dark` scheme", () => {
        wrapper = mount(
          <MenuContext.Provider value={{ menuType: "dark" }}>
            <MenuItem selected>Item one</MenuItem>
          </MenuContext.Provider>
        );

        assertStyleMatch(
          {
            backgroundColor: baseTheme.menu.dark.selected,
          },
          wrapper.find(StyledMenuItemWrapper)
        );
      });

      it("should render correct styles for alternate variant", () => {
        wrapper = mount(<MenuItem variant="alternate">Item one</MenuItem>);

        assertStyleMatch(
          {
            backgroundColor: `${baseTheme.menu.light.background}`,
          },
          wrapper.find(StyledMenuItemWrapper)
        );
      });

      it("should render correct styles if an onClick is provided", () => {
        wrapper = mount(
          <MenuContext.Provider value={{ menuType: "dark" }}>
            <MenuItem onClick={() => {}}>Item one</MenuItem>
          </MenuContext.Provider>
        );

        assertStyleMatch(
          {
            padding: "0 16px",
            height: "40px",
            lineHeight: "40px",
            margin: "0px",
          },
          wrapper.find(StyledMenuItemWrapper),
          { modifier: "button" }
        );
      });
    });

    describe('`menuType="dark"`', () => {
      it("should render correct styles", () => {
        wrapper = mount(
          <MenuContext.Provider value={{ menuType: "dark" }}>
            <MenuItem>Item one</MenuItem>
          </MenuContext.Provider>
        );

        assertStyleMatch(
          {
            backgroundColor: baseTheme.colors.slate,
          },
          wrapper.find(StyledMenuItemWrapper)
        );
      });

      it("should render correct styles for alternate variant", () => {
        wrapper = mount(
          <MenuContext.Provider value={{ menuType: "dark" }}>
            <MenuItem variant="alternate">Item one</MenuItem>
          </MenuContext.Provider>
        );

        assertStyleMatch(
          {
            backgroundColor: `${baseTheme.colors.slate}`,
            color: `${baseTheme.colors.white}`,
          },
          wrapper.find(StyledMenuItemWrapper)
        );
      });
    });

    describe("showDropdownArrow", () => {
      describe("when true (default)", () => {
        it("should pass the showDropdownArrow prop to Submenu", () => {
          wrapper = mount(
            <MenuContext.Provider value={{ menuType: "light" }}>
              <MenuItem submenu="submenu">
                <MenuItem>Item one</MenuItem>
              </MenuItem>
            </MenuContext.Provider>
          );

          expect(wrapper.find(Submenu).props().showDropdownArrow).toEqual(true);
        });
      });

      describe("when false", () => {
        it("should pass the showDropdownArrow prop to Submenu", () => {
          wrapper = mount(
            <MenuContext.Provider value={{ menuType: "light" }}>
              <MenuItem submenu="submenu" showDropdownArrow={false}>
                <MenuItem>Item one</MenuItem>
              </MenuItem>
            </MenuContext.Provider>
          );

          expect(wrapper.find(Submenu).props().showDropdownArrow).toEqual(
            false
          );
        });
      });
    });
  });

  describe("when focused from menu context", () => {
    let menuItem;

    it("should be focused", () => {
      wrapper = renderMenuContext(false, true);
      menuItem = wrapper.find(MenuItem).find("a");

      expect(menuItem).toBeFocused();
    });
  });

  describe("handleKeyDown", () => {
    describe("when onKeyDown prop passed in", () => {
      it("should call onKeyDown", () => {
        const onKeyDownFn = jest.fn();
        wrapper = renderMenuContext(false, false, { onKeyDown: onKeyDownFn });

        act(() => {
          wrapper
            .find(StyledMenuItemWrapper)
            .at(0)
            .props()
            .onKeyDown(events.enter);
        });

        wrapper.update();

        expect(onKeyDownFn).toHaveBeenCalled();
      });
    });

    describe("when escape key pressed", () => {
      it("should focus the current menu item", () => {
        wrapper = renderMenuContext(false, false);

        act(() => {
          wrapper
            .find(StyledMenuItemWrapper)
            .at(0)
            .props()
            .onKeyDown(events.escape);
        });

        wrapper.update();
        const menuItem = wrapper.find(MenuItem).find("a");

        expect(menuItem).toBeFocused();
      });
    });

    describe("when space key pressed", () => {
      it("should call onClick", () => {
        const onClickFn = jest.fn();

        wrapper = renderMenuContext(false, false, { onClick: onClickFn });

        act(() => {
          wrapper
            .find(StyledMenuItemWrapper)
            .at(0)
            .props()
            .onKeyDown(events.space);
        });

        wrapper.update();

        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe("when submenuContext.handleKeyDown exists", () => {
      it("should call submenuContext.handleKeyDown", () => {
        wrapper = renderSubmenuContext(false);

        act(() => {
          wrapper
            .find(StyledMenuItemWrapper)
            .at(0)
            .props()
            .onKeyDown(events.enter);
        });

        wrapper.update();
        expect(mockSubmenuhandleKeyDown).toHaveBeenCalled();
      });
    });
  });

  describe("when child is a SubmenuBlock", () => {
    describe("for a single submenu item", () => {
      it("should render the children correctly", () => {
        wrapper = mount(
          <MenuContext.Provider value={{ menuType: "light" }}>
            <MenuItem submenu="test">
              <SubmenuBlock>
                <MenuItem>Item one</MenuItem>
              </SubmenuBlock>
            </MenuItem>
          </MenuContext.Provider>
        );

        expect(wrapper.find(Submenu).props().children.length).toEqual(1);
      });
    });

    describe("for multiple submenu items", () => {
      it("should render the children correctly", () => {
        wrapper = mount(
          <MenuContext.Provider value={{ menuType: "light" }}>
            <MenuItem submenu="test">
              <SubmenuBlock>
                <MenuItem>Item one</MenuItem>
                <MenuItem>Item two</MenuItem>
              </SubmenuBlock>
            </MenuItem>
          </MenuContext.Provider>
        );

        expect(wrapper.find(Submenu).props().children.length).toEqual(2);
      });
    });
  });
});

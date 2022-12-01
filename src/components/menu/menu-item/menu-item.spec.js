import React from "react";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";

import { MenuItem } from "..";
import Link from "../../link";
import {
  testStyledSystemLayout,
  testStyledSystemFlexBox,
  assertStyleMatch,
} from "../../../__spec_helper__/test-utils";
import StyledMenuItemWrapper from "./menu-item.style";
import Submenu from "../__internal__/submenu/submenu.component";
import SubmenuContext from "../__internal__/submenu/submenu.context";

import MenuContext from "../menu.context";
import StyledIcon from "../../icon/icon.style";
import Icon from "../../icon/icon.component";
import { StyledMenuItem } from "../menu.style";
import menuConfigVariants from "../menu.config";
import IconButton from "../../icon-button";
import StyledIconButton from "../../icon-button/icon-button.style";

const events = {
  enter: {
    key: "Enter",
    preventDefault: jest.fn(),
  },
  escape: {
    key: "Escape",
    preventDefault: jest.fn(),
  },
};

const mockMenuhandleKeyDown = jest.fn();
const mockSubmenuhandleKeyDown = jest.fn();

const menuContextValues = {
  handleKeyDown: mockMenuhandleKeyDown,
  menuType: "light",
};

const submenuContextValues = (isFocused) => ({
  handleKeyDown: mockSubmenuhandleKeyDown,
  isFocused,
});

describe("MenuItem", () => {
  let container;
  let wrapper;

  const renderMenuContext = (isFocused, props) => {
    return mount(
      <MenuContext.Provider value={menuContextValues}>
        <MenuItem href="#" isFocused={isFocused} {...props}>
          Item One
        </MenuItem>
      </MenuContext.Provider>,
      { attachTo: container }
    );
  };

  const renderSubmenuContext = (props) => {
    return mount(
      <MenuContext.Provider value={menuContextValues}>
        <SubmenuContext.Provider value={submenuContextValues(false)}>
          <MenuItem href="#" {...props}>
            Item One
          </MenuItem>
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

  testStyledSystemLayout((props) => <MenuItem {...props}>Item One</MenuItem>);
  testStyledSystemFlexBox((props) => <MenuItem {...props}>Item One</MenuItem>);

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

  describe("with maxWidth prop set", () => {
    beforeEach(() => {
      wrapper = mount(<MenuItem maxWidth="100px">Item One</MenuItem>);
    });

    it("should add a title attribute with the full title", () => {
      expect(wrapper.find(StyledMenuItem).props().title).toEqual("Item One");
    });

    it("should add the correct styles", () => {
      assertStyleMatch(
        {
          maxWidth: "inherit",
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
          verticalAlign: "bottom",
        },
        wrapper.find(StyledMenuItemWrapper),
        { modifier: "&& button" }
      );
    });
  });

  describe.each(["light", "white", "dark", "black"])(
    '`menuType="%s"`',
    (menuType) => {
      it("should render correct styles", () => {
        wrapper = mount(
          <MenuContext.Provider value={{ menuType }}>
            <MenuItem>Item one</MenuItem>
          </MenuContext.Provider>
        );

        assertStyleMatch(
          {
            backgroundColor: menuConfigVariants[menuType].background,
          },
          wrapper.find(StyledMenuItemWrapper)
        );
      });

      it.each([
        ["button", "onClick"],
        ["a", "href"],
      ])(
        "should not set padding on the %s element if no %s passed",
        (element) => {
          wrapper = mount(
            <MenuContext.Provider value={{ menuType }}>
              <MenuItem>Item one</MenuItem>
            </MenuContext.Provider>
          );

          expect(
            wrapper.find(StyledMenuItemWrapper)
          ).not.toHaveStyleRule("padding", "0 16px", { modifier: element });
        }
      );

      it("applies the expected styling overrides when an IconButton is rendered as a child", () => {
        wrapper = mount(
          <MenuContext.Provider value={{ menuType }}>
            <MenuItem>
              <IconButton>
                <Icon type="home" />
              </IconButton>
            </MenuItem>
          </MenuContext.Provider>
        );

        assertStyleMatch(
          {
            display: "inline-flex",
            marginRight: "0",
          },
          wrapper.find(StyledMenuItemWrapper),
          { modifier: `${StyledIconButton} > span` }
        );

        assertStyleMatch(
          {
            outline: "none",
          },
          wrapper.find(StyledMenuItemWrapper),
          { modifier: `${StyledIconButton}:focus` }
        );

        assertStyleMatch(
          {
            color: menuConfigVariants[menuType].color,
          },
          wrapper.find(StyledMenuItemWrapper),
          { modifier: `${StyledIconButton}:focus [data-component="icon"]` }
        );
      });

      describe.each([
        ["button", "focus"],
        ["a", "focus"],
      ])("applies the expected styling for %p on %s", (element, pseudo) => {
        wrapper = mount(
          <MenuContext.Provider value={{ menuType }}>
            <MenuItem>Item one</MenuItem>
          </MenuContext.Provider>
        );

        assertStyleMatch(
          {
            boxShadow:
              "inset 0 0 0 var(--borderWidth300) var(--colorsSemanticFocus500)",
            backgroundColor: menuConfigVariants[menuType].background,
            color: menuConfigVariants[menuType].color,
          },
          wrapper.find(StyledMenuItemWrapper),
          { modifier: `&& ${element}:${pseudo}` }
        );
      });

      describe.each([
        ["button", "hover"],
        ["a", "hover"],
      ])("applies the expected styling for %p on %s and", (element, pseudo) => {
        beforeEach(() => {
          wrapper = mount(
            <MenuContext.Provider value={{ menuType }}>
              <MenuItem>Item one</MenuItem>
            </MenuContext.Provider>
          );
        });

        it("renders correct background and color", () => {
          assertStyleMatch(
            {
              backgroundColor: "var(--colorsComponentsMenuAutumnStandard600)",
              color: "var(--colorsComponentsMenuYang100)",
            },
            wrapper.find(StyledMenuItemWrapper),
            { modifier: `&& ${element}:${pseudo}` }
          );
        });

        it("renders correct icon color", () => {
          assertStyleMatch(
            {
              color: "var(--colorsComponentsMenuYang100)",
            },
            wrapper.find(StyledMenuItemWrapper),
            {
              modifier: `&& ${element}:${pseudo} [data-component="icon"]`,
            }
          );
        });
      });

      describe("with selected props set", () => {
        beforeEach(() => {
          wrapper = mount(
            <MenuContext.Provider value={{ menuType }}>
              <MenuItem selected>Item one</MenuItem>
            </MenuContext.Provider>
          );
        });

        it("should render correct background color", () => {
          assertStyleMatch(
            {
              backgroundColor: menuConfigVariants[menuType].selected,
            },
            wrapper.find(StyledMenuItemWrapper)
          );
        });

        it.each([
          ["button", "hover"],
          ["a", "hover"],
        ])("applies the expected styling for %p on %s", (element, pseudo) => {
          assertStyleMatch(
            {
              backgroundColor: "var(--colorsComponentsMenuAutumnStandard600)",
              color: "var(--colorsComponentsMenuYang100)",
            },
            wrapper.find(StyledMenuItemWrapper),
            { modifier: `&& ${element}:${pseudo}` }
          );
        });

        it.each([
          ["button", "focus"],
          ["a", "focus"],
        ])("applies the expected styling for %p on %s", (element, pseudo) => {
          assertStyleMatch(
            {
              backgroundColor: menuConfigVariants[menuType].selected,
            },
            wrapper.find(StyledMenuItemWrapper),
            { modifier: `${element}:${pseudo}` }
          );
        });
      });
    }
  );

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

    it('should render nested `<MenuItem />` with `submenuDirection="right"` as default if prop submenu exists', () => {
      wrapper = shallow(
        <MenuItem submenu="submenu">
          <MenuItem>Item one</MenuItem>
        </MenuItem>
      );

      expect(wrapper.find(Submenu).props().submenuDirection).toBe("right");
    });

    describe.each(["light", "white", "dark", "black"])(
      '`menuType="%s"`',
      (menuType) => {
        it("should render correct background color", () => {
          wrapper = mount(
            <MenuContext.Provider value={{ menuType }}>
              <MenuItem submenu="submenu">
                <MenuItem>Item one</MenuItem>
              </MenuItem>
            </MenuContext.Provider>
          );
          assertStyleMatch(
            {
              backgroundColor: menuConfigVariants[menuType].submenuBackground,
            },
            wrapper.find(StyledMenuItemWrapper)
          );
        });

        describe.each([
          ["button", "hover"],
          ["a", "hover"],
          ["button", "focus"],
          ["a", "focus"],
        ])("applies the expected styling for %p on %s", (element, pseudo) => {
          beforeEach(() => {
            wrapper = mount(
              <MenuContext.Provider value={{ menuType }}>
                <MenuItem submenu="submenu">
                  <MenuItem>Item one</MenuItem>
                </MenuItem>
              </MenuContext.Provider>
            );
          });
          const styles = {
            focusBg: menuConfigVariants[menuType].submenuBackground,
            focusColor: menuConfigVariants[menuType].color,
            hoverBg: menuConfigVariants[menuType].submenuItemBackground,
            hoverColor: menuConfigVariants[menuType].color,
          };

          it("renders correct background and color", () => {
            assertStyleMatch(
              {
                backgroundColor: styles[`${pseudo}Bg`],
                color: styles[`${pseudo}Color`],
              },
              wrapper.find(StyledMenuItemWrapper),
              { modifier: `${element}:${pseudo}` }
            );
          });

          it("renders correct icon color", () => {
            assertStyleMatch(
              {
                color: styles[`${pseudo}Color`],
              },
              wrapper.find(StyledMenuItemWrapper),
              { modifier: `${element}:${pseudo} [data-component="icon"]` }
            );
          });
        });

        describe("with selected props set", () => {
          beforeEach(() => {
            wrapper = mount(
              <MenuContext.Provider value={{ menuType }}>
                <MenuItem submenu="submenu" selected>
                  <MenuItem>Item one</MenuItem>
                </MenuItem>
              </MenuContext.Provider>
            );
          });

          it("should render correct background color", () => {
            assertStyleMatch(
              {
                backgroundColor: menuConfigVariants[menuType].submenuSelected,
              },
              wrapper.find(StyledMenuItemWrapper)
            );
          });

          it.each([
            ["button", "hover"],
            ["a", "hover"],
            ["button", "focus"],
            ["a", "focus"],
          ])("applies the expected styling for %p on %s", (element, pseudo) => {
            const background = {
              focus: menuConfigVariants[menuType].submenuSelected,
              hover: "var(--colorsComponentsMenuAutumnStandard600)",
            };

            assertStyleMatch(
              {
                backgroundColor: background[pseudo],
              },
              wrapper.find(StyledMenuItemWrapper),
              { modifier: `${element}:${pseudo}` }
            );
          });
        });

        it("should render correct styles for alternate variant", () => {
          wrapper = mount(
            <MenuContext.Provider value={{ menuType }}>
              <MenuItem variant="alternate">Item one</MenuItem>
            </MenuContext.Provider>
          );

          assertStyleMatch(
            {
              backgroundColor: menuConfigVariants[menuType].alternate,
            },
            wrapper.find(StyledMenuItemWrapper),
            { modifier: `&&&` }
          );
        });

        it.each([
          ["button", "hover"],
          ["a", "hover"],
          ["button", "focus"],
          ["a", "focus"],
        ])(
          "applies the expected styling for alternate variant for %p on %s",
          (element, pseudo) => {
            wrapper = mount(
              <MenuContext.Provider value={{ menuType }}>
                <MenuItem variant="alternate">Item one</MenuItem>
              </MenuContext.Provider>
            );
            const background = {
              focus: menuConfigVariants[menuType].alternate,
              hover: menuConfigVariants[menuType].alternateHover,
            };

            assertStyleMatch(
              {
                backgroundColor: background[pseudo],
              },
              wrapper.find(StyledMenuItemWrapper),
              { modifier: `&&& ${element}:${pseudo}` }
            );
          }
        );

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
      }
    );

    describe("with onSubmenuOpen prop set", () => {
      it("should pass the onSubmenuOpen prop to Submenu", () => {
        const mockCallback = jest.fn();

        wrapper = mount(
          <MenuContext.Provider value={{ menuType: "light" }}>
            <MenuItem submenu="submenu" onSubmenuOpen={mockCallback}>
              <MenuItem>Item one</MenuItem>
            </MenuItem>
          </MenuContext.Provider>
        );

        expect(wrapper.find(Submenu).props().onSubmenuOpen).toEqual(
          mockCallback
        );
      });
    });

    describe("with onSubmenuClose prop set", () => {
      it("should pass the onSubmenuClose prop to Submenu", () => {
        const mockCallback = jest.fn();

        wrapper = mount(
          <MenuContext.Provider value={{ menuType: "light" }}>
            <MenuItem submenu="submenu" onSubmenuClose={mockCallback}>
              <MenuItem>Item one</MenuItem>
            </MenuItem>
          </MenuContext.Provider>
        );

        expect(wrapper.find(Submenu).props().onSubmenuClose).toEqual(
          mockCallback
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

    describe("with maxWidth prop set", () => {
      beforeEach(() => {
        wrapper = mount(
          <MenuContext.Provider value={{ menuType: "light" }}>
            <MenuItem maxWidth="100px" submenu="submenu title">
              <MenuItem>Item one</MenuItem>
            </MenuItem>
          </MenuContext.Provider>
        );
      });

      it("should add a title attribute with the full title", () => {
        expect(wrapper.find(StyledMenuItem).at(0).props().title).toEqual(
          "submenu title"
        );
      });

      it("should add the correct styles", () => {
        assertStyleMatch(
          {
            maxWidth: "inherit",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            verticalAlign: "bottom",
          },
          wrapper.find(StyledMenuItemWrapper),
          { modifier: "&& button" }
        );
      });

      it("does not pass the value when inFullscreenView is true", () => {
        const items = mount(
          <MenuContext.Provider
            value={{ menuType: "light", inFullscreenView: true }}
          >
            <MenuItem maxWidth="100px" submenu="submenu title">
              <MenuItem maxWidth="100px">Item one</MenuItem>
            </MenuItem>
          </MenuContext.Provider>
        ).find(StyledMenuItem);

        items.forEach((item) => {
          expect(item.prop("maxWidth")).toBeUndefined();
        });
      });
    });
  });

  describe("when focused from menu context", () => {
    let menuItem;

    it("should be focused", () => {
      wrapper = renderMenuContext(true);
      menuItem = wrapper.find(MenuItem).find("a");

      expect(menuItem).toBeFocused();
    });
  });

  describe("handleKeyDown", () => {
    describe("when onKeyDown prop passed in", () => {
      it("should call onKeyDown", () => {
        const onKeyDownFn = jest.fn();
        wrapper = renderMenuContext(false, { onKeyDown: onKeyDownFn });

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
        wrapper = renderMenuContext(false);

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

  describe("with conditionally rendered children", () => {
    it("should not error when a child is null", () => {
      wrapper = mount(
        <MenuContext.Provider value={{ menuType: "light" }}>
          <MenuItem submenu="test">
            {true && <MenuItem>One</MenuItem>}
            {false && <MenuItem>Two</MenuItem>}
          </MenuItem>
        </MenuContext.Provider>
      );

      expect(wrapper.find(MenuItem).find(MenuItem).length).toEqual(1);
    });
  });

  describe("icon only menus and submenus", () => {
    it("should render an icon into the menu item", () => {
      wrapper = mount(<MenuItem icon="settings" ariaLabel="Settings" />);

      expect(wrapper.find(StyledIcon).first().exists()).toBe(true);
    });

    it("should render an icon into the submenu item", () => {
      wrapper = mount(
        <MenuItem icon="settings" submenu ariaLabel="Settings">
          <MenuItem icon="home" ariaLabel="Home" />
        </MenuItem>
      );

      expect(wrapper.find(StyledIcon).exists()).toBe(true);
    });

    it("should render an icon into the submenu item with text", () => {
      wrapper = mount(
        <MenuItem icon="settings" submenu="Settings" ariaLabel="Settings">
          <MenuItem icon="home" ariaLabel="Home" />
        </MenuItem>
      );

      expect(wrapper.find(StyledIcon).exists()).toBe(true);
    });

    it("add aria-label when it is set", () => {
      wrapper = mount(<MenuItem icon="settings" ariaLabel="Settings" />);

      expect(wrapper.find(Icon).props().ariaLabel).toBe("Settings");
    });

    it("give error when `aria-label` is not set and menu item has no child text", () => {
      const consoleSpy = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => {});
      wrapper = mount(<MenuItem icon="settings" />);
      // eslint-disable-next-line no-console
      expect(console.error.mock.calls[0][2]).toBe(
        "If no text is provided an ariaLabel should be given to facilitate accessibility."
      );
      consoleSpy.mockRestore();
    });

    it("give error when no children or icon is given", () => {
      const consoleSpy = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => {});
      wrapper = mount(<MenuItem ariaLabel="a" />);
      // eslint-disable-next-line no-console
      expect(console.error.mock.calls[0][2]).toBe(
        "Either prop `icon` must be defined or this node must have children."
      );
      consoleSpy.mockRestore();
    });
  });

  it.each([
    ["href", "https://carbon.sage.com"],
    ["target", "_blank"],
    ["rel", "noopener"],
  ])(
    "the %s prop should be passed as an attribute to the underlying HTML anchor element",
    (prop, value) => {
      wrapper = mount(<MenuItem {...{ [prop]: value }} />);
      const anchor = wrapper.find("a").getDOMNode();
      expect(anchor.getAttribute(prop)).toBe(value);
    }
  );
});

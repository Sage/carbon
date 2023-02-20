import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { css, ThemeProvider } from "styled-components";

import { MenuItem } from "../..";
import MenuContext from "../../menu.context";
import StyledMenuItemWrapper from "../../menu-item/menu-item.style";
import { StyledSubmenu } from "./submenu.style";
import { StyledMenuItem } from "../../menu.style";
import MenuDivider from "../../menu-divider/menu-divider.component";
import Submenu from "./submenu.component";
import ScrollableBlock from "../../scrollable-block";
import { assertStyleMatch } from "../../../../__spec_helper__/test-utils";
import { mintTheme } from "../../../../style/themes";
import Search from "../../../search";
import StyledSearch from "../../../search/search.style";
import openSubmenu from "../spec-helper";
import menuConfigVariants from "../../menu.config";

const events = {
  arrowDown: {
    key: "ArrowDown",
    preventDefault: jest.fn(),
  },
  arrowUp: {
    key: "ArrowUp",
    preventDefault: jest.fn(),
    defaultPrevented: true,
  },
  arrowLeft: {
    key: "ArrowLeft",
    preventDefault: jest.fn(),
  },
  arrowRight: {
    key: "ArrowRight",
    preventDefault: jest.fn(),
  },
  enter: {
    key: "Enter",
    preventDefault: jest.fn(),
    bubbles: true,
  },
  space: {
    key: " ",
    preventDefault: jest.fn(),
  },
  semicolon: {
    key: ";",
    preventDefault: jest.fn(),
  },
  home: {
    key: "Home",
    preventDefault: jest.fn(),
  },
  end: {
    key: "End",
    preventDefault: jest.fn(),
  },
  escape: {
    key: "Escape",
    preventDefault: jest.fn(),
  },
  b: {
    key: "b",
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  },
  c: {
    key: "c",
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  },
  r: {
    key: "r",
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  },
  tab: {
    key: "Tab",
    preventDefault: jest.fn(),
  },
  shiftTab: {
    key: "Tab",
    shiftKey: true,
  },
};

const mockMenuReset = jest.fn();
const mockhandleKeyDown = jest.fn();

const menuContextValues = (menuType) => ({
  handleKeyDown: mockhandleKeyDown,
  reset: mockMenuReset,
  menuType,
  setOpenSubmenuId: () => {},
});

describe("Submenu component", () => {
  const element = document.createElement("div");
  const htmlElement = document.body.appendChild(element);
  const tabKey = new KeyboardEvent("keydown", events.tab);
  let wrapper;

  const render = (menuType, props) => {
    return mount(
      <MenuContext.Provider value={menuContextValues(menuType)}>
        <Submenu title="title" tabIndex={-1} {...props}>
          <MenuItem href="#">Apple</MenuItem>
          <MenuItem href="#">Banana</MenuItem>
          <MenuDivider />
          <MenuItem href="#">Carrot</MenuItem>
          <MenuItem href="#">Broccoli</MenuItem>
        </Submenu>
      </MenuContext.Provider>,
      { attachTo: htmlElement }
    );
  };

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  it("should render the top-level menu item as a button, not a link", () => {
    wrapper = render("light");
    expect(wrapper.find("a").exists()).toEqual(false);
    expect(wrapper.find("button").exists()).toEqual(true);
  });

  describe("when closed", () => {
    it("should not render the submenu", () => {
      wrapper = render("light");
      expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);
    });

    describe("on mouse over", () => {
      it("should open the submenu but not focus the first item", () => {
        wrapper = render("light");
        expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);

        act(() => {
          wrapper
            .find('[data-component="submenu-wrapper"]')
            .at(0)
            .props()
            .onMouseOver();
        });
        wrapper.update();

        expect(wrapper.find(StyledSubmenu).exists()).toEqual(true);
        expect(
          wrapper
            .find(StyledSubmenu)
            .find(StyledMenuItemWrapper)
            .at(0)
            .find("a")
        ).not.toBeFocused();
      });
    });

    describe("on mouse out", () => {
      it("should close the submenu", () => {
        wrapper = render("light");
        openSubmenu(wrapper);
        expect(wrapper.find(StyledSubmenu).exists()).toEqual(true);

        act(() => {
          wrapper
            .find('[data-component="submenu-wrapper"]')
            .at(0)
            .props()
            .onMouseLeave();
        });

        wrapper.update();

        expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);
      });
    });

    describe("when clicked", () => {
      it("should open the submenu", () => {
        wrapper = render("light");
        wrapper.find("button").getDOMNode().click();
        wrapper.update();

        expect(wrapper.find(StyledSubmenu).exists()).toEqual(true);
      });

      it("should execute the onClick callback", () => {
        const mockCallback = jest.fn();
        wrapper = render("light", { onClick: mockCallback });
        wrapper.find("button").getDOMNode().click();
        wrapper.update();

        expect(mockCallback).toHaveBeenCalledTimes(1);
      });
    });

    describe("when clickToOpen prop set", () => {
      let mockCallback;

      beforeEach(() => {
        mockCallback = jest.fn();
        wrapper = render("light", { clickToOpen: true, onClick: mockCallback });
      });

      afterEach(() => {
        jest.resetAllMocks();
      });

      describe("on mouse over", () => {
        it("should not set the onMouseOver function", () => {
          expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);

          expect(
            wrapper.find('[data-component="submenu-wrapper"]').at(0).props()
              .onMouseOver
          ).toEqual(undefined);
        });
      });

      describe("when clicked", () => {
        it("should open the submenu", () => {
          wrapper.find("button").getDOMNode().click();
          wrapper.update();

          expect(wrapper.find(StyledSubmenu).exists()).toEqual(true);
        });

        it("should execute the onClick callback", () => {
          wrapper.find("button").getDOMNode().click();
          wrapper.update();

          expect(mockCallback).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("when onSubmenuOpen prop set", () => {
      let mockCallback;

      beforeEach(() => {
        mockCallback = jest.fn();

        wrapper = render("light", { onSubmenuOpen: mockCallback });
      });

      afterEach(() => {
        jest.resetAllMocks();
      });

      describe("when submenu opens", () => {
        it("should trigger the callback", () => {
          openSubmenu(wrapper);

          expect(mockCallback).toHaveBeenCalledWith();
        });
      });
    });

    describe("when onSubmenuClose prop set", () => {
      let mockCallback;

      beforeEach(() => {
        mockCallback = jest.fn();

        wrapper = render("light", { onSubmenuClose: mockCallback });
      });

      afterEach(() => {
        jest.resetAllMocks();
      });

      describe("when submenu closes", () => {
        it("should trigger the callback", () => {
          openSubmenu(wrapper);

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.shiftTab);
          });

          wrapper.update();

          expect(mockCallback).toHaveBeenCalledWith();
        });
      });
    });

    describe("when href prop set", () => {
      beforeEach(() => {
        wrapper = render("light", { href: "/path" });
      });

      it("should render the top-level menu item as a link instead of a button", () => {
        expect(wrapper.find("button").exists()).toEqual(false);
        expect(wrapper.find("a").exists()).toEqual(true);
      });

      it("should not open submenu when key other than Enter, Space ArrowDown or ArrowUp pressed", () => {
        act(() => {
          wrapper.find(StyledMenuItemWrapper).at(0).props().onKeyDown(events.b);
        });

        expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);
      });

      describe("when opening submenu with keyboard", () => {
        it("should leave the focus on the menu item", () => {
          openSubmenu(wrapper);

          expect(
            wrapper.find('[data-component="submenu-wrapper"]').find("a").at(0)
          ).toBeFocused();
        });

        it.each(["arrowDown", "arrowUp", "tab"])(
          "should focus the first item when %s key is pressed",
          (key) => {
            openSubmenu(wrapper);

            act(() => {
              wrapper
                .find(StyledMenuItemWrapper)
                .at(0)
                .props()
                .onKeyDown(events[key]);
            });

            wrapper.update();

            expect(
              wrapper.find(StyledMenuItemWrapper).at(1).find("a")
            ).toBeFocused();
          }
        );

        it("should close the submenu when enter is pressed", () => {
          openSubmenu(wrapper);

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.enter);
          });

          wrapper.update();

          expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);
        });

        it("should close the submenu when shift-tab is pressed", () => {
          openSubmenu(wrapper);
          wrapper.update();

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.shiftTab);
          });

          wrapper.update();

          expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);
        });

        it("should focus the first menu item when tab is pressed", () => {
          openSubmenu(wrapper);
          document.dispatchEvent(tabKey);
          wrapper.update();

          expect(wrapper.find(StyledSubmenu).exists()).toEqual(true);

          expect(document.activeElement).toMatchObject(
            wrapper
              .find('[data-component="submenu-wrapper"]')
              .find("button")
              .at(1)
          );
        });

        it("should do nothing when character key pressed", () => {
          openSubmenu(wrapper);

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.b);
          });

          wrapper.update();

          expect(wrapper.find(StyledSubmenu).exists()).toEqual(true);
        });
      });
    });
  });

  describe("when open", () => {
    let submenuItem;
    beforeEach(() => {
      wrapper = render("light");

      submenuItem = wrapper
        .find('[data-component="submenu-wrapper"]')
        .find("button");

      submenuItem.getDOMNode().focus();
      expect(submenuItem).toBeFocused();

      act(() => {
        wrapper
          .find(StyledMenuItemWrapper)
          .at(0)
          .props()
          .onKeyDown(events.space);
      });

      wrapper.update();
    });

    it("should render the submenu", () => {
      expect(wrapper.find(StyledSubmenu).exists()).toEqual(true);
    });

    describe("when clicked", () => {
      it("should leave the submenu open", () => {
        const submenuElement = wrapper.find(StyledSubmenu);

        act(() => {
          submenuElement
            .getDOMNode()
            .dispatchEvent(new CustomEvent("click", { bubbles: true }));
        });

        act(() => {
          wrapper.update();
        });

        expect(submenuElement.exists()).toEqual(true);
      });
    });

    describe("on click outside of the submenu", () => {
      it("should close the submenu", () => {
        expect(wrapper.find(StyledSubmenu).exists()).toEqual(true);

        act(() => {
          document.dispatchEvent(
            new CustomEvent("click", {
              detail: {
                enzymeTestingTarget: document.body,
              },
            })
          );
        });

        wrapper.update();

        expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);
      });
    });

    it('should render correct styles if `submenuDirection="left"`', () => {
      const tempWrapper = mount(
        <MenuContext.Provider value={menuContextValues("light")}>
          <StyledSubmenu submenuDirection="left" menuType="light">
            <MenuItem>Apple</MenuItem>
            <MenuItem>Banana</MenuItem>
            <MenuDivider />
            <MenuItem>Carrot</MenuItem>
            <MenuItem>Broccoli</MenuItem>
          </StyledSubmenu>
        </MenuContext.Provider>
      );

      assertStyleMatch(
        {
          right: "0",
        },
        tempWrapper.find(StyledSubmenu)
      );
    });
  });

  describe("keyboard navigation", () => {
    describe("when closed", () => {
      let submenuItem;

      beforeEach(() => {
        wrapper = render("light");
        submenuItem = wrapper
          .find('[data-component="submenu-wrapper"]')
          .find("button");
      });

      describe("when enter key pressed", () => {
        it("should open the submenu and focus first item", () => {
          submenuItem.getDOMNode().focus();
          expect(submenuItem).toBeFocused();

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.enter);
          });

          wrapper.update();
          expect(wrapper.find(StyledSubmenu).exists()).toEqual(true);
          expect(
            wrapper
              .find(StyledSubmenu)
              .find(StyledMenuItemWrapper)
              .at(0)
              .find("a")
          ).toBeFocused();
        });
      });

      describe("when space key pressed", () => {
        it("should open the submenu and focus first item", () => {
          submenuItem.getDOMNode().focus();
          expect(submenuItem).toBeFocused();

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.space);
          });

          wrapper.update();
          expect(wrapper.find(StyledSubmenu).exists()).toEqual(true);
          expect(
            wrapper
              .find(StyledSubmenu)
              .find(StyledMenuItemWrapper)
              .at(0)
              .find("a")
          ).toBeFocused();
        });
      });

      describe("when down key pressed", () => {
        it("should open the submenu and focus first item", () => {
          submenuItem.getDOMNode().focus();
          expect(submenuItem).toBeFocused();

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.arrowDown);
          });

          wrapper.update();
          expect(wrapper.find(StyledSubmenu).exists()).toEqual(true);
          expect(
            wrapper
              .find(StyledSubmenu)
              .find(StyledMenuItemWrapper)
              .at(0)
              .find("a")
          ).toBeFocused();
        });
      });

      describe("when up key pressed", () => {
        it("should open the submenu and focus first item", () => {
          submenuItem.getDOMNode().focus();
          expect(submenuItem).toBeFocused();

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.arrowUp);
          });

          wrapper.update();
          expect(wrapper.find(StyledSubmenu).exists()).toEqual(true);
          expect(
            wrapper
              .find(StyledSubmenu)
              .find(StyledMenuItemWrapper)
              .at(0)
              .find("a")
          ).toBeFocused();
        });
      });

      describe("when multiple character keys pressed quickly", () => {
        it("should build a search string and focus the correct item", () => {
          submenuItem.getDOMNode().focus();
          expect(submenuItem).toBeFocused();

          openSubmenu(wrapper);

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.b);
          });

          wrapper.update();

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.r);
          });

          wrapper.update();

          expect(
            wrapper
              .find(StyledSubmenu)
              .find(StyledMenuItemWrapper)
              .at(3)
              .find("a")
          ).toBeFocused();
        });
      });

      describe("when multiple character keys pressed slowly", () => {
        it("should reset the search string and focus the correct item", () => {
          jest.useFakeTimers();

          openSubmenu(wrapper);

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.b);
          });

          wrapper.update();

          act(() => {
            jest.runAllTimers();
          });

          wrapper.update();

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.c);
          });

          wrapper.update();

          expect(
            wrapper
              .find(StyledSubmenu)
              .find(StyledMenuItemWrapper)
              .at(2)
              .find("a")
          ).toBeFocused();
        });
      });
    });

    describe("when open", () => {
      let submenuItem;
      const onKeyDownFn = jest.fn();

      beforeEach(() => {
        wrapper = render("light", { onKeyDown: onKeyDownFn });
        submenuItem = wrapper
          .find('[data-component="submenu-wrapper"]')
          .find("button");
        submenuItem.getDOMNode().focus();

        act(() => {
          wrapper
            .find(StyledMenuItemWrapper)
            .at(0)
            .props()
            .onKeyDown(events.enter);
        });

        wrapper.update();
      });

      describe("clicking a submenu item", () => {
        it.each(["tab", "arrowDown"])(
          "should move focus and any subsequent presses of the %s key should update focus as expected",
          (key) => {
            act(() => {
              wrapper
                .find(StyledSubmenu)
                .find(StyledMenuItem)
                .at(1)
                .props()
                .onClick();
            });

            wrapper.update();

            act(() => {
              wrapper
                .find(StyledMenuItemWrapper)
                .at(1)
                .props()
                .onKeyDown(events[key]);
            });

            wrapper.update();

            expect(
              wrapper.find(StyledMenuItemWrapper).at(3).find("a")
            ).toBeFocused();
          }
        );

        it.each(["shiftTab", "arrowUp"])(
          "should focus the item and any subsequent presses of the %s key should update focus as expected",
          (key) => {
            act(() => {
              wrapper
                .find(StyledSubmenu)
                .find(StyledMenuItem)
                .at(1)
                .props()
                .onClick();
            });

            wrapper.update();

            act(() => {
              wrapper
                .find(StyledMenuItemWrapper)
                .at(1)
                .props()
                .onKeyDown(events[key]);
            });

            wrapper.update();

            expect(
              wrapper
                .find(StyledSubmenu)
                .find(StyledMenuItemWrapper)
                .at(0)
                .find("a")
            ).toBeFocused();
          }
        );
      });

      describe("when down key pressed", () => {
        describe("when not on last submenu item", () => {
          it("should set focus on the next submenu item", () => {
            expect(
              wrapper
                .find(StyledSubmenu)
                .find(StyledMenuItemWrapper)
                .at(0)
                .find("a")
            ).toBeFocused();

            act(() => {
              wrapper
                .find(StyledSubmenu)
                .find(StyledMenuItemWrapper)
                .at(0)
                .find(StyledMenuItemWrapper)
                .props()
                .onKeyDown(events.arrowDown);
            });

            wrapper.update();
            expect(
              wrapper
                .find(StyledSubmenu)
                .find(StyledMenuItemWrapper)
                .at(1)
                .find("a")
            ).toBeFocused();
          });
        });

        describe("when on last submenu item", () => {
          it("should keep focus on current item", () => {
            act(() => {
              wrapper
                .find(StyledMenuItemWrapper)
                .at(0)
                .props()
                .onKeyDown(events.end);
            });

            wrapper.update();

            act(() => {
              wrapper
                .find(StyledMenuItemWrapper)
                .at(0)
                .props()
                .onKeyDown(events.arrowDown);
            });

            wrapper.update();
            expect(
              wrapper
                .find(StyledSubmenu)
                .find(StyledMenuItemWrapper)
                .at(3)
                .find("a")
            ).toBeFocused();
          });
        });

        describe("when next submenu item does not contain a menu item", () => {
          it.each(["arrowDown", "tab"])(
            "should set focus on the next submenu item containing a menu item",
            (key) => {
              act(() => {
                wrapper
                  .find(StyledMenuItemWrapper)
                  .at(0)
                  .props()
                  .onKeyDown(events[key]);
              });

              wrapper.update();

              expect(
                wrapper
                  .find(StyledSubmenu)
                  .find(StyledMenuItemWrapper)
                  .at(1)
                  .find("a")
              ).toBeFocused();

              act(() => {
                wrapper
                  .find(StyledMenuItemWrapper)
                  .at(0)
                  .props()
                  .onKeyDown(events[key]);
              });

              wrapper.update();
              expect(
                wrapper
                  .find(StyledSubmenu)
                  .find(StyledMenuItemWrapper)
                  .at(2)
                  .find("a")
              ).toBeFocused();
            }
          );
        });
      });

      describe("when up key pressed", () => {
        describe("when on first submenu item", () => {
          it("should keep focus on first menu item", () => {
            expect(
              wrapper
                .find(StyledSubmenu)
                .find(StyledMenuItemWrapper)
                .at(0)
                .find("a")
            ).toBeFocused();

            act(() => {
              wrapper
                .find(StyledMenuItemWrapper)
                .at(0)
                .props()
                .onKeyDown(events.arrowUp);
            });

            wrapper.update();
            expect(
              wrapper
                .find(StyledSubmenu)
                .find(StyledMenuItemWrapper)
                .at(0)
                .find("a")
            ).toBeFocused();
          });
        });

        describe("when not on first submenu item", () => {
          it("should set focus on the next submenu item", () => {
            act(() => {
              wrapper
                .find(StyledMenuItemWrapper)
                .at(0)
                .props()
                .onKeyDown(events.end);
            });

            wrapper.update();

            act(() => {
              wrapper
                .find(StyledMenuItemWrapper)
                .at(0)
                .props()
                .onKeyDown(events.arrowUp);
            });

            wrapper.update();
            expect(
              wrapper
                .find(StyledSubmenu)
                .find(StyledMenuItemWrapper)
                .at(2)
                .find("a")
            ).toBeFocused();
          });
        });
      });

      describe("when home key pressed", () => {
        it("should focus the first submenu item", () => {
          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.end);
          });

          wrapper.update();

          expect(
            wrapper
              .find(StyledSubmenu)
              .find(StyledMenuItemWrapper)
              .at(3)
              .find("a")
          ).toBeFocused();

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.home);
          });

          wrapper.update();

          expect(
            wrapper
              .find(StyledSubmenu)
              .find(StyledMenuItemWrapper)
              .at(0)
              .find("a")
          ).toBeFocused();
        });
      });

      describe("when end key pressed", () => {
        it("should focus the last submenu item", () => {
          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.end);
          });

          wrapper.update();

          expect(
            wrapper
              .find(StyledSubmenu)
              .find(StyledMenuItemWrapper)
              .at(3)
              .find("a")
          ).toBeFocused();
        });
      });

      describe("when escape key pressed", () => {
        it("should close the submenu and call onKeyDown prop", () => {
          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.escape);
          });

          wrapper.update();

          expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);
          expect(onKeyDownFn).toHaveBeenCalled();
        });
      });

      describe("when tab key pressed", () => {
        it("should focus the next item", () => {
          document.dispatchEvent(tabKey);
          wrapper.update();

          expect(document.activeElement).toMatchObject(
            wrapper
              .find(StyledSubmenu)
              .find(StyledMenuItemWrapper)
              .at(1)
              .find("a")
          );
        });

        describe("when focus on last menu item", () => {
          it("should close the submenu", () => {
            act(() => {
              wrapper
                .find(StyledMenuItemWrapper)
                .at(0)
                .props()
                .onKeyDown(events.end);
            });

            wrapper.update();

            act(() => {
              wrapper
                .find(StyledMenuItemWrapper)
                .at(0)
                .props()
                .onKeyDown(events.tab);
            });

            wrapper.update();

            expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);
          });
        });
      });

      describe("when shift + tab key pressed", () => {
        it("should focus the previous item", () => {
          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.end);
          });

          wrapper.update();

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .last()
              .props()
              .onKeyDown(events.shiftTab);
          });

          wrapper.update();

          expect(document.activeElement).toMatchObject(
            wrapper
              .find(StyledSubmenu)
              .find(StyledMenuItemWrapper)
              .at(2)
              .find("a")
          );
        });

        describe("when focus on first menu item", () => {
          it("should close the submenu", () => {
            act(() => {
              wrapper
                .find(StyledMenuItemWrapper)
                .at(0)
                .props()
                .onKeyDown(events.shiftTab);
            });

            wrapper.update();

            expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);
          });
        });
      });

      describe("when alphabet key pressed", () => {
        it("should focus the next item starting with that letter", () => {
          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.c);
          });

          wrapper.update();

          expect(
            wrapper
              .find(StyledSubmenu)
              .find(StyledMenuItemWrapper)
              .at(2)
              .find("a")
          ).toBeFocused();
        });

        it("should not update the focused item when the first letter of any do not match the key pressed", () => {
          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.c);
          });

          wrapper.update();

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.r);
          });

          wrapper.update();

          expect(
            wrapper
              .find(StyledSubmenu)
              .find(StyledMenuItemWrapper)
              .at(2)
              .find("a")
          ).toBeFocused();
        });
      });

      describe("when enter key pressed", () => {
        it("it should navigate to href and close submenu", () => {
          jest.useFakeTimers();
          document.dispatchEvent(tabKey);
          wrapper.update();

          expect(document.activeElement).toMatchObject(
            wrapper
              .find(StyledSubmenu)
              .find(StyledMenuItemWrapper)
              .at(1)
              .find("a")
          );

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(1)
              .props()
              .onKeyDown(events.enter);
          });

          wrapper.update();

          act(() => {
            jest.runAllTimers();
          });

          wrapper.update();

          expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);
        });
      });
    });
  });

  describe.each(["light", "white", "dark", "black"])(
    "when menuType=%s",
    (menuType) => {
      let submenuItem;

      const renderWrapper = (variant) => {
        wrapper = render(menuType, { variant });
        submenuItem = wrapper
          .find('[data-component="submenu-wrapper"]')
          .find("button");
        submenuItem.getDOMNode().focus();

        act(() => {
          wrapper
            .find(StyledMenuItemWrapper)
            .at(0)
            .props()
            .onKeyDown(events.enter);
        });

        wrapper.update();
      };

      it("should set the correct background color by default", () => {
        renderWrapper("default");
        assertStyleMatch(
          {
            backgroundColor: menuConfigVariants[menuType].submenuItemBackground,
          },
          wrapper.find(StyledSubmenu)
        );
      });

      it("should set the correct background colour for alternate variant", () => {
        renderWrapper("alternate");
        assertStyleMatch(
          {
            backgroundColor: menuConfigVariants[menuType].background,
          },
          wrapper.find(StyledSubmenu)
        );
      });

      it.each([
        ["button", "focus"],
        ["a", "focus"],
      ])("applies the expected styling for %p on %s", (el, pseudo) => {
        renderWrapper("default");
        assertStyleMatch(
          {
            backgroundColor: menuConfigVariants[menuType].submenuItemBackground,
          },
          wrapper.find(StyledSubmenu),
          { modifier: `${StyledMenuItemWrapper} ${el}:${pseudo}` }
        );
      });

      describe.each([
        ["button", "hover"],
        ["a", "hover"],
      ])("applies the expected styling for %p on %s", (el, pseudo) => {
        it("renders correct background and color", () => {
          renderWrapper("default");
          assertStyleMatch(
            {
              backgroundColor:
                menuConfigVariants[menuType].submenuItemBackgroundHover,
              color: "var(--colorsComponentsMenuYang100)",
            },
            wrapper.find(StyledSubmenu),
            { modifier: `${StyledMenuItemWrapper} ${el}:${pseudo}` }
          );
        });

        it("renders correct icon color", () => {
          renderWrapper("default");
          assertStyleMatch(
            {
              color: "var(--colorsComponentsMenuYang100)",
            },
            wrapper.find(StyledSubmenu),
            {
              modifier: `${StyledMenuItemWrapper} ${el}:${pseudo} [data-component="icon"]`,
            }
          );
        });
      });
    }
  );

  describe("when it has a ScrollableBlock as a child", () => {
    const renderScrollableBlock = (menuType, props, parent) => {
      return mount(
        <MenuContext.Provider value={menuContextValues(menuType)}>
          <Submenu title="title" tabIndex={-1} {...props}>
            <MenuItem>Apple</MenuItem>
            <MenuItem>Banana</MenuItem>
            <ScrollableBlock parent={parent}>
              <MenuItem>Carrot</MenuItem>
              <MenuItem>Broccoli</MenuItem>
            </ScrollableBlock>
          </Submenu>
        </MenuContext.Provider>,
        { attachTo: htmlElement }
      );
    };

    it("should render all of the underlying menu items", () => {
      wrapper = renderScrollableBlock("light");
      openSubmenu(wrapper);

      expect(wrapper.find(MenuItem).length).toEqual(4);
    });

    describe("when the scrollable block has a parent item", () => {
      it("should render all of the underlying menu items", () => {
        wrapper = renderScrollableBlock(
          "light",
          {},
          <Search value="" onChange={() => {}} />
        );
        openSubmenu(wrapper);

        expect(wrapper.find(MenuItem).length).toEqual(5);
      });

      describe("when shift + tab key pressed", () => {
        it("should focus the previous item", () => {
          wrapper = renderScrollableBlock(
            "light",
            {},
            <Search value="" onChange={() => {}} />
          );
          openSubmenu(wrapper);

          const submenuItems = wrapper
            .find(StyledSubmenu)
            .find(StyledMenuItemWrapper);

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.end);
          });

          wrapper.update();

          submenuItems.forEach((item) => {
            act(() => {
              item.props().onKeyDown(events.shiftTab);
            });
            wrapper.update();
            expect(document.activeElement).toMatchObject(item.find("a"));
          });
        });
      });
    });

    describe("when the scrollable block wraps the entire submenu", () => {
      it("the outer submenu should have role presentation", () => {
        wrapper = mount(
          <MenuContext.Provider value={menuContextValues("light")}>
            <Submenu title="title">
              <ScrollableBlock>
                <MenuItem>Apple</MenuItem>
                <MenuItem>Banana</MenuItem>
                <MenuItem>Carrot</MenuItem>
                <MenuItem>Broccoli</MenuItem>
              </ScrollableBlock>
            </Submenu>
          </MenuContext.Provider>
        );

        openSubmenu(wrapper);
        const outerSubmenu = wrapper.find(StyledSubmenu);

        expect(outerSubmenu.getDOMNode().getAttribute("role")).toBe(
          "presentation"
        );
      });
    });
  });

  describe("when it has Search as a child", () => {
    const renderWithSearch = (menuType, props) => {
      return mount(
        <ThemeProvider theme={mintTheme}>
          <MenuContext.Provider value={menuContextValues(menuType)}>
            <Submenu title="title" tabIndex={-1} {...props}>
              <MenuItem href="#">Apple</MenuItem>
              <MenuItem href="#" variant="alternate">
                <Search
                  defaultValue=""
                  placeholder="Dark variant"
                  variant="dark"
                  onChange={() => {}}
                />
              </MenuItem>
              <MenuItem href="#">Banana</MenuItem>
            </Submenu>
          </MenuContext.Provider>
        </ThemeProvider>,
        { attachTo: htmlElement }
      );
    };

    const mockSubmenuhandleKeyDown = jest.fn();

    const renderWithSearchDefaultValue = (menuType, props) => {
      return mount(
        <ThemeProvider theme={mintTheme}>
          <MenuContext.Provider value={menuContextValues(menuType)}>
            <Submenu title="title" tabIndex={-1} {...props} href="/path">
              <MenuItem>Apple</MenuItem>
              <MenuItem variant="alternate">
                <Search
                  defaultValue="FooBar"
                  placeholder="Dark variant"
                  variant="dark"
                  onChange={() => {}}
                />
              </MenuItem>
              <MenuItem>Banana</MenuItem>
            </Submenu>
          </MenuContext.Provider>
        </ThemeProvider>,
        { attachTo: htmlElement }
      );
    };

    it("should not lose focus when enter key pressed", () => {
      wrapper = renderWithSearch("dark");
      openSubmenu(wrapper);

      const searchInput = wrapper.find(StyledSearch).find("input");
      searchInput.getDOMNode().focus();

      expect(searchInput).toBeFocused();

      act(() => {
        searchInput
          .getDOMNode()
          .dispatchEvent(new KeyboardEvent("keydown", events.enter));
      });
      wrapper.update();

      expect(searchInput).toBeFocused();
    });

    it.each(["dark", "black", "light", "white"])(
      "should render with correct styles for search icon for menuType=%s",
      (menuType) => {
        wrapper = renderWithSearch(menuType);
        openSubmenu(wrapper);

        assertStyleMatch(
          {
            borderBottomColor: "var(--colorsUtilityMajor150)",
          },
          wrapper.find(StyledSubmenu),
          {
            modifier: css`
              ${StyledMenuItemWrapper} ${StyledSearch}:hover
            `,
          }
        );
        assertStyleMatch(
          {
            color: "var(--colorsUtilityMajor200)",
          },
          wrapper.find(StyledSubmenu),
          {
            modifier: css`
              ${StyledMenuItemWrapper} ${StyledSearch} span > [data-component="icon"]
            `,
          }
        );
        assertStyleMatch(
          {
            color: "var(--colorsUtilityMajor150)",
          },
          wrapper.find(StyledSubmenu),
          {
            modifier: css`
              ${StyledMenuItemWrapper} ${StyledSearch} span > [data-component="icon"]:hover
            `,
          }
        );
      }
    );

    it("should be focusable by using down arrow key", () => {
      wrapper = renderWithSearch("dark");
      openSubmenu(wrapper);
      const searchInput = wrapper.find(StyledSearch).find("input");

      act(() => {
        wrapper
          .find(StyledMenuItemWrapper)
          .at(0)
          .props()
          .onKeyDown(events.arrowDown);
      });
      wrapper.update();

      expect(searchInput).toBeFocused();
    });

    it("should update when Search is clicked so the expected item is focused when arrow down pressed", () => {
      wrapper = renderWithSearch("dark");
      openSubmenu(wrapper);
      const searchInput = wrapper.find(StyledSearch).find("input");

      act(() => {
        searchInput.simulate("click");
      });
      wrapper.update();

      act(() => {
        wrapper
          .find(StyledMenuItemWrapper)
          .at(1)
          .props()
          .onKeyDown(events.arrowDown);
      });

      expect(
        wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(2).find("a")
      ).toBeFocused();
    });

    it("should update when Search is clicked so the expected item is focused when up arrow pressed", () => {
      wrapper = renderWithSearch("dark");
      openSubmenu(wrapper);
      const searchInput = wrapper.find(StyledSearch).find("input");

      act(() => {
        searchInput.simulate("click");
      });
      wrapper.update();

      act(() => {
        wrapper
          .find(StyledMenuItemWrapper)
          .at(1)
          .props()
          .onKeyDown(events.arrowUp);
      });

      expect(
        wrapper.find(StyledSubmenu).find(StyledMenuItemWrapper).at(0).find("a")
      ).toBeFocused();
    });

    /* This test is purely to achieve coverage for the else of the `handleKeyDown` 
    callback function in the menu-item component. */
    it("should not call SubmenuContext.handleKeyDown if Search has a value and is currently focused", () => {
      wrapper = renderWithSearchDefaultValue("dark", { clickToOpen: true });
      openSubmenu(wrapper);

      act(() => {
        wrapper.find(StyledMenuItemWrapper).at(0).props().onKeyDown(events.tab);
      });

      wrapper.update();

      act(() => {
        wrapper
          .find(StyledMenuItemWrapper)
          .at(1)
          .props()
          .onKeyDown(events.arrowDown);
      });

      wrapper.update();

      act(() => {
        wrapper.find(StyledMenuItemWrapper).at(2).props().onKeyDown(events.tab);
      });

      wrapper.update();

      expect(mockSubmenuhandleKeyDown).not.toHaveBeenCalled();
    });
  });
});

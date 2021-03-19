import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { css, ThemeProvider } from "styled-components";

import { MenuItem } from "../..";
import { MenuContext } from "../../menu.component";
import StyledMenuItemWrapper from "../../menu-item/menu-item.style";
import { StyledSubmenu } from "./submenu.style";
import MenuDivider from "../../menu-divider/menu-divider.component";
import Submenu from "./submenu.component";
import ScrollableBlock from "../../scrollable-block";
import { assertStyleMatch } from "../../../../__spec_helper__/test-utils";
import { baseTheme, mintTheme } from "../../../../style/themes";
import Search from "../../../../__experimental__/components/search";
import StyledSearch from "../../../../__experimental__/components/search/search.style";
import openSubmenu from "../spec-helper";

const events = {
  arrowDown: {
    key: "ArrowDown",
    which: 40,
    preventDefault: jest.fn(),
  },
  arrowUp: {
    key: "ArrowUp",
    which: 38,
    preventDefault: jest.fn(),
    defaultPrevented: true,
  },
  arrowLeft: {
    key: "ArrowLeft",
    which: 37,
    preventDefault: jest.fn(),
  },
  arrowRight: {
    key: "ArrowRight",
    which: 39,
    preventDefault: jest.fn(),
  },
  enter: {
    key: "Enter",
    which: 13,
    preventDefault: jest.fn(),
    bubbles: true,
  },
  space: {
    key: "Space",
    which: 32,
    preventDefault: jest.fn(),
  },
  semicolon: {
    key: ";",
    which: 186,
    preventDefault: jest.fn(),
  },
  home: {
    key: "Home",
    which: 36,
    preventDefault: jest.fn(),
  },
  end: {
    key: "End",
    which: 35,
    preventDefault: jest.fn(),
  },
  escape: {
    key: "Escape",
    which: 27,
    preventDefault: jest.fn(),
  },
  b: {
    key: "b",
    which: 66,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  },
  c: {
    key: "c",
    which: 67,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  },
  r: {
    key: "r",
    which: 82,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  },
  tab: {
    key: "Tab",
    which: 9,
  },
  shiftTab: {
    key: "Tab",
    which: 9,
    shiftKey: true,
  },
};

const mockMenuReset = jest.fn();
const mockhandleKeyDown = jest.fn();

const menuContextValues = (menuType) => ({
  handleKeyDown: mockhandleKeyDown,
  reset: mockMenuReset,
  menuType,
});

describe("Submenu component", () => {
  let container;
  let wrapper;

  const render = (menuType, props) => {
    return mount(
      <MenuContext.Provider value={menuContextValues(menuType)}>
        <Submenu title="title" tabIndex={-1} {...props}>
          <MenuItem>Apple</MenuItem>
          <MenuItem>Banana</MenuItem>
          <MenuDivider />
          <MenuItem>Carrot</MenuItem>
          <MenuItem>Broccoli</MenuItem>
        </Submenu>
      </MenuContext.Provider>,
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
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  describe("when closed", () => {
    beforeEach(() => {
      wrapper = render("light");
    });

    it("should not render the submenu", () => {
      expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);
    });

    describe("when clicked", () => {
      it("should open the submenu", () => {
        wrapper.find("a").getDOMNode().click();
        wrapper.update();

        expect(wrapper.find(StyledSubmenu).exists()).toEqual(true);
      });
    });
  });

  describe("when open", () => {
    let submenuItem;
    beforeEach(() => {
      wrapper = render("light");

      submenuItem = wrapper
        .find('[data-component="submenu-wrapper"]')
        .find("a");

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
        const submenuElement = document.querySelector(
          '[data-component="link"]'
        );

        act(() => {
          document.dispatchEvent(
            new CustomEvent("click", {
              detail: {
                enzymeTestingTarget: submenuElement,
              },
            })
          );
        });

        act(() => {
          wrapper.update();
        });

        expect(wrapper.find(StyledSubmenu).exists()).toEqual(true);
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
  });

  describe("keybord navigation", () => {
    describe("when closed", () => {
      let submenuItem;

      beforeEach(() => {
        wrapper = render("light");
        submenuItem = wrapper
          .find('[data-component="submenu-wrapper"]')
          .find("a");
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

      describe("when unhandled key pressed", () => {
        it("should call menuContext.handleKeyDown and maintain focus", () => {
          submenuItem.getDOMNode().focus();
          expect(submenuItem).toBeFocused();

          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.semicolon);
          });

          wrapper.update();
          expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);
          expect(mockhandleKeyDown).toHaveBeenCalled();
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
          .find("a");
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
          it("should set focus on the next submenu item containing a menu item", () => {
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
                .at(1)
                .find("a")
            ).toBeFocused();

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
                .at(2)
                .find("a")
            ).toBeFocused();
          });
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
          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.tab);
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

      describe("when shift/tab key pressed", () => {
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
              .at(0)
              .props()
              .onKeyDown(events.shiftTab);
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
      });
    });
  });

  describe("when variant prop is set to alternate", () => {
    let submenuItem;

    beforeEach(() => {
      wrapper = render("dark", { variant: "alternate" });
      submenuItem = wrapper
        .find('[data-component="submenu-wrapper"]')
        .find("a");
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

    it("should set the correct background colour", () => {
      assertStyleMatch(
        {
          background: baseTheme.colors.slate,
        },
        wrapper.find(StyledSubmenu)
      );
    });
  });

  describe("when it has a ScrollableBlock as a child", () => {
    const renderScrollableBlock = (menuType, props) => {
      return mount(
        <MenuContext.Provider value={menuContextValues(menuType)}>
          <Submenu title="title" tabIndex={-1} {...props}>
            <MenuItem>Apple</MenuItem>
            <MenuItem>Banana</MenuItem>
            <ScrollableBlock>
              <MenuItem>Carrot</MenuItem>
              <MenuItem>Broccoli</MenuItem>
            </ScrollableBlock>
          </Submenu>
        </MenuContext.Provider>,
        { attachTo: container }
      );
    };

    it("should render all of the underlying menu items", () => {
      wrapper = renderScrollableBlock("light");
      openSubmenu(wrapper);

      expect(wrapper.find(MenuItem).length).toEqual(4);
    });
  });
  describe("when it has Search as a child", () => {
    const renderWithSearch = (menuType, props) => {
      return mount(
        <ThemeProvider theme={mintTheme}>
          <MenuContext.Provider value={menuContextValues(menuType)}>
            <Submenu title="title" tabIndex={-1} {...props}>
              <MenuItem>Apple</MenuItem>
              <MenuItem>Banana</MenuItem>
              <MenuItem variant="alternate">
                <Search
                  defaultValue=""
                  placeholder="Dark variant"
                  variant="dark"
                  onChange={() => {}}
                />
              </MenuItem>
            </Submenu>
          </MenuContext.Provider>
        </ThemeProvider>,
        { attachTo: container }
      );
    };

    it("should not lose focus when enter key pressed", () => {
      wrapper = renderWithSearch(true, "dark");

      const searchInput = wrapper.find(StyledSearch).find("input");

      searchInput.getDOMNode().focus();

      expect(searchInput).toBeFocused();

      act(() => {
        wrapper.find(StyledSearch).at(0).props().onKeyDown(events.arrowUp);
        searchInput
          .getDOMNode()
          .dispatchEvent(new KeyboardEvent("keydown", events.enter));
      });
      wrapper.update();

      expect(searchInput).toBeFocused();
    });

    it("should render with correct styles for search icon", () => {
      wrapper = renderWithSearch("dark");
      openSubmenu(wrapper);

      assertStyleMatch(
        {
          color: baseTheme.menu.dark.searchIcon,
        },
        wrapper.find(StyledSubmenu),
        {
          modifier: css`
            ${StyledMenuItemWrapper} ${StyledSearch} [data-component="icon"]
          `,
        }
      );
      assertStyleMatch(
        {
          color: baseTheme.menu.dark.searchIconHover,
        },
        wrapper.find(StyledSubmenu),
        {
          modifier: css`
            ${StyledMenuItemWrapper} ${StyledSearch} [data-component="icon"]:hover
          `,
        }
      );
    });
  });
});

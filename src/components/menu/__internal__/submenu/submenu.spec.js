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
  c: {
    key: "c",
    which: 67,
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  },
  tab: {
    key: "Tab",
    which: 9,
  },
};

const mockMenuReset = jest.fn();
const mockhandleKeyDown = jest.fn();

const menuContextValues = (openSubmenu, menuType) => ({
  handleKeyDown: mockhandleKeyDown,
  reset: mockMenuReset,
  openSubmenu,
  menuType,
});

describe("Submenu component", () => {
  let container;
  let wrapper;

  const render = (openSubmenu, menuType, props) => {
    return mount(
      <MenuContext.Provider value={menuContextValues(openSubmenu, menuType)}>
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
      wrapper = render(false, "light");
    });

    it("should not render the submenu", () => {
      expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);
    });

    describe("on mouse over", () => {
      it("should open the submenu", () => {
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
      });
    });
  });

  describe("when open", () => {
    let submenuItem;
    beforeEach(() => {
      wrapper = render(false, "light");

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

    describe("on mouse out", () => {
      it("should close the submenu", () => {
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
  });

  describe("when set open by menu context", () => {
    beforeEach(() => {
      wrapper = render(true, "light");
    });

    it("should be open", () => {
      expect(wrapper.find(StyledSubmenu).exists()).toEqual(true);
    });
  });

  describe("keybord navigation", () => {
    describe("when closed", () => {
      let submenuItem;

      beforeEach(() => {
        wrapper = render(false, "light");
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
        it("should open the submenu and focus last item", () => {
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
              .at(3)
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
    });

    describe("when open", () => {
      let submenuItem;
      const onKeyDownFn = jest.fn();

      beforeEach(() => {
        wrapper = render(false, "light", { onKeyDown: onKeyDownFn });
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
          it("should set focus on the first submenu item", () => {
            act(() => {
              wrapper
                .find(StyledMenuItemWrapper)
                .at(0)
                .props()
                .onKeyDown(events.arrowUp);
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
                .at(0)
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
          it("should set focus on the last submenu item", () => {
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
                .at(3)
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
                .onKeyDown(events.arrowUp);
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

      describe("when left key pressed", () => {
        it("should close the submenu", () => {
          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.arrowLeft);
          });

          wrapper.update();

          expect(mockhandleKeyDown).toHaveBeenCalled();
          expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);
        });
      });

      describe("when right key pressed", () => {
        it("should close the submenu", () => {
          act(() => {
            wrapper
              .find(StyledMenuItemWrapper)
              .at(0)
              .props()
              .onKeyDown(events.arrowRight);
          });

          wrapper.update();

          expect(mockhandleKeyDown).toHaveBeenCalled();
          expect(wrapper.find(StyledSubmenu).exists()).toEqual(false);
        });
      });

      describe("when home key pressed", () => {
        it("should focus the first submenu item", () => {
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
        it("should close the submenu", () => {
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
      wrapper = render(false, "dark", { variant: "alternate" });
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
    const renderScrollableBlock = (openSubmenu, menuType, props) => {
      return mount(
        <MenuContext.Provider value={menuContextValues(openSubmenu, menuType)}>
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
      wrapper = renderScrollableBlock(true, "light");

      expect(wrapper.find(MenuItem).length).toEqual(4);
    });
  });
  describe("when it has Search as a child", () => {
    const renderWithSearch = (openSubmenu, menuType, props) => {
      return mount(
        <ThemeProvider theme={mintTheme}>
          <MenuContext.Provider
            value={menuContextValues(openSubmenu, menuType)}
          >
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
      wrapper = renderWithSearch(true, "dark");
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

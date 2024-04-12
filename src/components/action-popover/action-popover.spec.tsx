import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { ThemeProvider } from "styled-components";
import { mount as enzymeMount, ReactWrapper } from "enzyme";
import {
  simulate,
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import sageTheme from "../../style/themes/sage";
import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  ActionPopoverItemProps,
  ActionPopoverMenu,
  ActionPopoverMenuButton,
} from "./index";
import ActionPopoverContext from "./action-popover-context";
import {
  MenuButton,
  Menu,
  MenuItemIcon,
  SubMenuItemIcon,
  StyledMenuItem,
  StyledMenuItemInnerText,
  StyledButtonIcon,
  StyledMenuItemWrapper,
} from "./action-popover.style";
import Popover from "../../__internal__/popover";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import Icon from "../icon";
import StyledButton from "../button/button.style";
import guid from "../../__internal__/utils/helpers/guid";

jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(
  () => "guid-12345"
);
jest.useFakeTimers();

describe("ActionPopover", () => {
  let container: HTMLElement | null;
  let wrapper: ReactWrapper;

  const mount = (jsx: React.ReactElement) => {
    wrapper = enzymeMount(jsx, { attachTo: container });
  };

  const DOM = (jsx: React.ReactElement) => {
    ReactDOM.render(jsx, container);
  };

  const onClick = jest.fn();
  const onOpen = jest.fn();
  const onClose = jest.fn();
  const onClickWrapper = (arg: string) => () => onClick(arg);

  function render(props = {}, renderer = mount) {
    const defaultProps = {
      children: [
        <ActionPopoverItem
          href="#"
          download
          key="item-1"
          icon="pdf"
          {...{ onClick: onClickWrapper("pdf") }}
          disabled
        >
          Download PDF
        </ActionPopoverItem>,
        <ActionPopoverItem
          key="item-2"
          icon="email"
          {...{ onClick: onClickWrapper("email") }}
        >
          Email Invoice
        </ActionPopoverItem>,
        <ActionPopoverItem
          key="item-3"
          icon="print"
          {...{ onClick: onClickWrapper("print") }}
        >
          Print Invoice
        </ActionPopoverItem>,
        <ActionPopoverDivider key="divider" />,
        <ActionPopoverItem
          key="item-4"
          icon="csv"
          {...{ onClick: onClickWrapper("csv") }}
        >
          Download CSV
        </ActionPopoverItem>,
        null,
        undefined,
      ],
      onOpen,
      onClose,
      ...props,
    };

    renderer(
      <>
        <input id="before" />
        <ActionPopover {...defaultProps} {...props} />
        <input id="after" />
      </>
    );
  }

  function renderWithSubmenu(props = {}, renderer = mount) {
    const submenu = (
      <ActionPopoverMenu>
        <ActionPopoverItem
          key="0"
          icon="bin"
          {...{ onClick: onClickWrapper("sub menu 1") }}
        >
          Sub Menu 1
        </ActionPopoverItem>
        <ActionPopoverItem
          key="1"
          {...{ onClick: onClickWrapper("sub menu 2") }}
          disabled
        >
          Sub Menu 2
        </ActionPopoverItem>
      </ActionPopoverMenu>
    );

    const defaultProps = {
      children: [
        <ActionPopoverItem
          key="item-1"
          disabled
          icon="pdf"
          {...{ onClick: onClickWrapper("pdf") }}
        >
          Download PDF
        </ActionPopoverItem>,
        <ActionPopoverItem
          key="item-2"
          icon="email"
          submenu={submenu}
          {...{ onClick: onClickWrapper("email") }}
        >
          Email Invoice
        </ActionPopoverItem>,
        <ActionPopoverItem
          key="item-3"
          icon="print"
          {...{ onClick: onClickWrapper("print") }}
        >
          Print Invoice
        </ActionPopoverItem>,
        <ActionPopoverDivider key="divider" />,
        <ActionPopoverItem
          key="item-4"
          icon="csv"
          {...{ onClick: onClickWrapper("csv") }}
        >
          Download CSV
        </ActionPopoverItem>,
        null,
        undefined,
      ],
      ...props,
    };

    renderer(
      <>
        <input id="before" />
        <ActionPopover {...defaultProps} {...props} />
        <input id="after" />
      </>
    );
  }

  function renderActionPopoverWithNoIconsOrSubmenus(
    props = {},
    renderer = mount
  ) {
    const defaultProps = {
      children: [
        <ActionPopoverItem key="item-1" onClick={() => {}}>
          Business
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-2" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-3" onClick={() => {}}>
          Print Invoice
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-4" onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-5" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>,
        <ActionPopoverDivider key="item-6" />,
        <ActionPopoverItem key="item-7" onClick={() => {}}>
          Delete
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-8" onClick={() => {}}>
          Return Home
        </ActionPopoverItem>,
        null,
        undefined,
      ],
      ...props,
    };

    renderer(
      <>
        <input id="before" />
        <ActionPopover {...defaultProps} {...props} />
        <input id="after" />
      </>
    );
  }

  function renderActionPopoverWithSomeSubmenusAndNoIcons(
    props = {},
    renderer = mount
  ) {
    const submenu = (
      <ActionPopoverMenu>
        <ActionPopoverItem icon="bin" onClick={() => {}}>
          Sub Menu 1
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}}>Sub Menu 3</ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}}>Sub Menu 4</ActionPopoverItem>
      </ActionPopoverMenu>
    );

    const defaultProps = {
      children: [
        <ActionPopoverItem key="item-1" onClick={() => {}}>
          Business
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-2" onClick={() => {}} submenu={submenu}>
          Email Invoice
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-3" onClick={() => {}}>
          Print Invoice
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-4" onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-5" onClick={() => {}} submenu={submenu}>
          Download CSV
        </ActionPopoverItem>,
        <ActionPopoverDivider key="item-6" />,
        <ActionPopoverItem key="item-7" onClick={() => {}} submenu={submenu}>
          Delete
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-8" onClick={() => {}} submenu={submenu}>
          Return Home
        </ActionPopoverItem>,
        null,
        undefined,
      ],
      ...props,
    };

    renderer(
      <>
        <input id="before" />
        <ActionPopover {...defaultProps} {...props} />
        <input id="after" />
      </>
    );
  }

  function renderActionPopoverWithSubmenusAndSomeIcons(
    props = {},
    renderer = mount
  ) {
    const submenu = (
      <ActionPopoverMenu>
        <ActionPopoverItem icon="bin" onClick={() => {}}>
          Sub Menu 1
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}}>Sub Menu 3</ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}}>Sub Menu 4</ActionPopoverItem>
      </ActionPopoverMenu>
    );

    const defaultProps = {
      children: [
        <ActionPopoverItem key="item-1" onClick={() => {}} submenu={submenu}>
          Business
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-2" onClick={() => {}} submenu={submenu}>
          Email Invoice
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-3" onClick={() => {}} submenu={submenu}>
          Print Invoice
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-4" onClick={() => {}} submenu={submenu}>
          Download PDF
        </ActionPopoverItem>,
        <ActionPopoverItem
          key="item-5"
          icon="csv"
          onClick={() => {}}
          submenu={submenu}
        >
          Download CSV
        </ActionPopoverItem>,
        <ActionPopoverDivider key="item-6" />,
        <ActionPopoverItem
          key="item-7"
          icon="delete"
          onClick={() => {}}
          submenu={submenu}
        >
          Delete
        </ActionPopoverItem>,
        <ActionPopoverItem
          key="item-8"
          icon="home"
          onClick={() => {}}
          submenu={submenu}
        >
          Return Home
        </ActionPopoverItem>,
        null,
        undefined,
      ],
      ...props,
    };

    renderer(
      <>
        <input id="before" />
        <ActionPopover {...defaultProps} {...props} />
        <input id="after" />
      </>
    );
  }

  function renderWithVariableChildren(props = {}, renderer = mount) {
    const submenu = (
      <ActionPopoverMenu>
        <ActionPopoverItem icon="bin" onClick={() => {}}>
          Sub Menu 1
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}}>Sub Menu 2</ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}}>Sub Menu 3</ActionPopoverItem>
        <ActionPopoverItem onClick={() => {}}>Sub Menu 4</ActionPopoverItem>
      </ActionPopoverMenu>
    );

    const defaultProps = {
      children: [
        <ActionPopoverItem key="item-1" onClick={() => {}}>
          Business
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-2" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-3" onClick={() => {}}>
          Print Invoice
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-4" onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>,
        <ActionPopoverItem
          key="item-5"
          icon="csv"
          onClick={() => {}}
          submenu={submenu}
        >
          Download CSV
        </ActionPopoverItem>,
        <ActionPopoverDivider key="item-6" />,
        <ActionPopoverItem
          key="item-7"
          icon="delete"
          onClick={() => {}}
          submenu={submenu}
        >
          Delete
        </ActionPopoverItem>,
        <ActionPopoverItem
          key="item-8"
          icon="home"
          onClick={() => {}}
          submenu={submenu}
        >
          Return Home
        </ActionPopoverItem>,
        null,
        undefined,
      ],
      ...props,
    };

    renderer(
      <>
        <input id="before" />
        <ActionPopover {...defaultProps} {...props} />
        <input id="after" />
      </>
    );
  }

  function renderActionPopoverWithMultipleDisabledItems(
    props = {},
    renderer = mount
  ) {
    const defaultProps = {
      children: [
        <ActionPopoverItem key="item-1" onClick={() => {}}>
          Business
        </ActionPopoverItem>,
        <ActionPopoverItem disabled key="item-2" onClick={() => {}}>
          Email Invoice
        </ActionPopoverItem>,
        <ActionPopoverItem disabled key="item-3" onClick={() => {}}>
          Print Invoice
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-4" onClick={() => {}}>
          Download PDF
        </ActionPopoverItem>,
        <ActionPopoverItem key="item-5" onClick={() => {}}>
          Download CSV
        </ActionPopoverItem>,
        <ActionPopoverDivider key="item-6" />,
        <ActionPopoverItem key="item-7" onClick={() => {}}>
          Delete
        </ActionPopoverItem>,
        <ActionPopoverItem disabled key="item-8" onClick={() => {}}>
          Return Home
        </ActionPopoverItem>,
        null,
        undefined,
      ],
      ...props,
    };

    renderer(
      <>
        <input id="before" />
        <ActionPopover {...defaultProps} {...props} />
        <input id="after" />
      </>
    );
  }

  function getElements() {
    return {
      items: wrapper.find(ActionPopoverItem),
      menubutton: wrapper.find(MenuButton),
      buttonIcon: wrapper.find(StyledButtonIcon),
      menu: wrapper.find(Menu),
      divider: wrapper.find(ActionPopoverDivider),
    };
  }

  function openMenu() {
    act(() => {
      wrapper.find(MenuButton).simulate("click");
      jest.runAllTimers();
      wrapper.update();
    });
  }

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "enzymeContainer";
    document.body.appendChild(container);
    onClick.mockReset();
    onOpen.mockReset();
    onClose.mockReset();
  });

  afterEach(() => {
    if (container) {
      if (wrapper && container.hasChildNodes()) {
        wrapper.detach();
      }
      document.body.removeChild(container);
      container = null;
    }
  });

  testStyledSystemMargin((props) => (
    <ThemeProvider theme={sageTheme}>
      <ActionPopover {...props}>
        <ActionPopoverItem key="1" href="#" download>
          test download
        </ActionPopoverItem>
      </ActionPopover>
    </ThemeProvider>
  ));

  it("renders in ReactDOM", () => {
    render(undefined, DOM);
  });

  describe("if download prop and href prop are provided", () => {
    it("should render as a link component", () => {
      wrapper = enzymeMount(
        <ActionPopover>
          <ActionPopoverItem key="1" onClick={jest.fn()} href="#" download>
            test download
          </ActionPopoverItem>
        </ActionPopover>
      );

      openMenu();

      expect(wrapper.find(StyledMenuItem).getDOMNode().tagName).toBe("A");
    });

    it("should trigger click function if enter pressed", () => {
      wrapper = enzymeMount(
        <ActionPopover>
          <ActionPopoverItem key="1" href="#" download>
            test download
          </ActionPopoverItem>
        </ActionPopover>
      );

      act(() => {
        wrapper
          .find(MenuButton)
          .props()
          .onClick({ stopPropagation: () => {}, preventDefault: () => {} });
      });

      act(() => {
        wrapper.update();
      });

      act(() => {
        wrapper
          .find(StyledMenuItemWrapper)
          .find('[role="presentation"]')
          .props()
          .onKeyDown?.({
            key: "Enter",
            stopPropagation: () => {},
            preventDefault: () => {},
          } as React.KeyboardEvent<HTMLDivElement>);
      });

      act(() => {
        wrapper.update();
      });

      expect(wrapper.find(MenuButton).props().isOpen).toBe(false);
    });
  });

  it("displays the horizontal ellipsis icon as the menu button", () => {
    render();
    const { menubutton } = getElements();
    const icon = menubutton.find(Icon).first();
    expect(icon.prop("type")).toBe("ellipsis_vertical");
  });

  it("has expected border radius", () => {
    assertStyleMatch(
      {
        borderRadius: "var(--borderRadius050)",
      },
      wrapper.find(StyledButtonIcon)
    );
  });

  it("has proper data attributes applied to elements", () => {
    render();
    openMenu();
    const { menu, divider, menubutton } = getElements();
    rootTagTest(menubutton, "action-popover-wrapper");
    rootTagTest(menu, "action-popover");
    expect(divider.getDOMNode().getAttribute("data-element")).toBe(
      "action-popover-divider"
    );
  });

  it("has a default aria-label", () => {
    render();
    const { buttonIcon } = getElements();
    expect(buttonIcon.prop("aria-label")).toBe("actions");
  });

  it("uses the aria-label prop if provided", () => {
    render({ "aria-label": "test aria label" });
    const { buttonIcon } = getElements();
    expect(buttonIcon.prop("aria-label")).toBe("test aria label");
  });

  it("renders with the menu closed by default", () => {
    render();
    const { menu } = getElements();
    expect(menu.exists()).toBe(false);
  });

  it("renders when there is no onOpen, onClose provided", () => {
    expect(() => {
      render({ onOpen: undefined, onClose: undefined });
      const { menubutton } = getElements();
      menubutton.simulate("click");
      menubutton.simulate("click");
    }).not.toThrow();
  });

  describe("Popover -", () => {
    it.each<["top" | "bottom", boolean, string]>([
      ["top", false, "top-end"],
      ["top", true, "top-start"],
      ["bottom", false, "bottom-end"],
      ["bottom", true, "bottom-start"],
    ])(
      "applies proper placement prop to Popover component",
      (placement, rightAlignMenu, result) => {
        const myWrapper = enzymeMount(
          <ActionPopover
            placement={placement}
            rightAlignMenu={rightAlignMenu}
          />
        );

        myWrapper.find(MenuButton).simulate("click");
        expect(myWrapper.find(Popover).props().placement).toBe(result);
      }
    );
  });

  describe.each([
    [
      "Click handlers",
      "Clicking",
      (item: ReactWrapper<ActionPopoverItemProps>) =>
        item.find(StyledMenuItem).simulate("click"),
    ],
    [
      "Keypress handlers",
      "Pressing Enter",
      (item: ReactWrapper<ActionPopoverItemProps>) =>
        item.find(StyledMenuItem).simulate("keydown", { key: "Enter" }),
    ],
  ])("%s", (group, prefix, mutator) => {
    beforeEach(() => {
      render();
      openMenu();
    });

    describe("MenuItem", () => {
      beforeEach(() => {
        const { items } = getElements();
        mutator(items.at(2));
      });

      it(`${prefix} calls the onClick handler`, () => {
        expect(onClick).toHaveBeenCalledWith("print");
      });

      it(`${prefix} closes the menu`, () => {
        const { menu } = getElements();
        expect(menu.exists()).toBe(false);
        expect(onClose).toHaveBeenCalledTimes(1);
      });

      it(`${prefix} focuses the Menubutton`, () => {
        const { buttonIcon } = getElements();

        expect(buttonIcon).toBeFocused();
      });
    });

    describe("MenuItem (disabled)", () => {
      beforeEach(() => {
        const { items } = getElements();

        mutator(items.at(0));
      });
      it(`${prefix} does not call the onClick handler`, () => {
        expect(onClick).not.toHaveBeenCalled();
      });

      it(`${prefix} does not close the menu`, () => {
        const { menu } = getElements();

        assertStyleMatch(
          {
            display: "block",
          },
          menu
        );
        expect(onClose).not.toHaveBeenCalled();
      });

      it(`${prefix} does not focus the Menubutton`, () => {
        const { menubutton } = getElements();

        expect(menubutton).not.toBeFocused();
      });
    });
  });

  describe("Click handlers", () => {
    describe("MenuButton", () => {
      let stopPropagation: jest.Mock;
      beforeEach(() => {
        render();
        const { menubutton } = getElements();
        stopPropagation = jest.fn();
        menubutton.simulate("click", { stopPropagation });
        jest.runAllTimers();
      });

      it("Clicking opens the menu", () => {
        const { menu } = getElements();
        assertStyleMatch(
          {
            display: "block",
          },
          menu
        );
        expect(onOpen).toHaveBeenCalledTimes(1);
      });

      it("Clicking on menu button does not allow for further event propagation", () => {
        expect(stopPropagation).toHaveBeenCalled();
      });

      it("Clicking focuses the first focusable element", () => {
        const { items } = getElements();

        expect(items.at(1).find(StyledMenuItem)).toBeFocused();
      });

      it("Clicking closes the menu", () => {
        const { menubutton } = getElements();
        act(() => {
          menubutton.simulate("click");
        });

        act(() => {
          wrapper.update();
        });
        const { menu } = getElements();
        expect(menu.exists()).toBe(false);
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });

    describe("document", () => {
      it("Clicking on the component does not close the menu using the document listener", () => {
        // This test doesn't really replicate the functionality but it is useful to check that the document listener
        // is filtering based on what element is clicked
        // In a normal situation the React SyntheticEvent will bubble and trigger a handler which will close the menu
        // This triggers a DOMEvent bypassing the SyntheticEvent listeners
        renderWithSubmenu();
        openMenu();

        const { items, menu } = getElements();

        expect(menu.exists()).toBe(true);

        act(() => {
          document.dispatchEvent(
            new CustomEvent("click", {
              detail: {
                enzymeTestingTarget: items.at(1).getDOMNode(),
              },
            })
          );
        });

        expect(menu.exists()).toBe(true);
      });

      it("Clicking elsewhere on the document closes the menu", () => {
        render();
        openMenu();

        expect(getElements().menu.exists()).toBe(true);

        act(() => {
          document.dispatchEvent(
            new CustomEvent("click", {
              detail: {
                enzymeTestingTarget: document.body,
              },
            })
          );
        });

        act(() => {
          wrapper.update();
        });

        expect(getElements().menu.exists()).toBe(false);
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("Keypress handlers", () => {
    describe("MenuButton", () => {
      it.each(["ArrowDown", "Space", "Enter", "ArrowUp"] as const)(
        "Pressing %s key opens the menu",
        (key) => {
          render();
          const { menubutton } = getElements();

          simulate.keydown[`press${key}`](menubutton);

          const { menu } = getElements();
          expect(menu.exists()).toBe(true);
          expect(onOpen).toHaveBeenCalledTimes(1);
        }
      );

      it.each(["ArrowDown", "Space", "Enter"] as const)(
        "Pressing %s key selects the first focusable item",
        (key) => {
          render();
          const { menubutton } = getElements();
          simulate.keydown[`press${key}`](menubutton);
          jest.runAllTimers();

          const { items } = getElements();
          expect(items.at(1).find(StyledMenuItem)).toBeFocused();
        }
      );

      it("Pressing UpArrow selects the last focusable item", () => {
        render();
        openMenu();
        const { items } = getElements();
        simulate.keydown.pressArrowUp(items.at(1).find(StyledMenuItem).at(0));
        jest.runAllTimers();

        expect(items.last().find(StyledMenuItem)).toBeFocused();
      });
    });

    describe("MenuItem", () => {
      it.each([
        [
          "Tab",
          (item: ReactWrapper<ActionPopoverItemProps>) =>
            simulate.keydown.pressTab(item.find(StyledMenuItem).at(0)),
        ],
        [
          "Shift+Tab",
          (item: ReactWrapper<ActionPopoverItemProps>) => {
            simulate.keydown.pressTab(item.find(StyledMenuItem).at(0), {
              shiftKey: true,
            });

            act(() => {
              jest.runAllTimers();
            });

            act(() => {
              wrapper.update();
            });
          },
        ],
      ])("Pressing %s key closes the menu", (key, mutator) => {
        render();
        const { menubutton } = getElements();
        simulate.keydown.pressArrowDown(menubutton);
        const { items } = getElements();

        mutator(items.first());

        const { menu } = getElements();

        expect(menu.exists()).toBe(false);
        expect(onClose).toHaveBeenCalledTimes(1);
        jest.runAllTimers();
        // FIXME: Test pressing Tab moves focus to the next element
        // FIXME: Test pressing Shift+Tab moves focus to the previous element
        // Create test for this using RTL: FE-6424
      });

      it("Pressing Escape focuses the MenuButton and closes the Menu", () => {
        render();
        const escapeKeyUpEvent = new KeyboardEvent("keyup", {
          key: "Escape",
          bubbles: true,
        });

        const { menubutton } = getElements();
        simulate.keydown.pressArrowDown(menubutton);

        act(() => {
          container?.dispatchEvent(escapeKeyUpEvent);
        });
        wrapper.update();

        const { menu, buttonIcon } = getElements();
        expect(buttonIcon).toBeFocused();
        expect(menu.exists()).toBe(false);
      });

      it.each([
        [
          "Down",
          "next",
          "",
          (items: ReactWrapper<ActionPopoverItemProps>) => {
            jest.runAllTimers();
            expect(items.at(1).find(StyledMenuItem)).toBeFocused();

            simulate.keydown.pressArrowDown(
              items.at(1).find(StyledMenuItem).at(0)
            );
            jest.runAllTimers();
            expect(items.at(2).find(StyledMenuItem)).toBeFocused();
            jest.runAllTimers();

            simulate.keydown.pressArrowDown(
              items.at(2).find(StyledMenuItem).at(0)
            );
            jest.runAllTimers();
            expect(items.at(3).find(StyledMenuItem)).toBeFocused();

            simulate.keydown.pressArrowDown(
              items.at(3).find(StyledMenuItem).at(0)
            );
            jest.runAllTimers();
            // we're checking that we cannot focus the first disabled item
            expect(items.at(0).find(StyledMenuItem)).not.toBeFocused();
            expect(items.at(0).prop("disabled")).toBe(true);
            expect(
              items
                .at(0)
                .find(StyledMenuItem)
                .getDOMNode()
                .getAttribute("aria-disabled")
            ).toBe("true");
          },
        ],
        [
          "Down",
          "first",
          "if the focus on the last focusable item",
          (items: ReactWrapper<ActionPopoverItemProps>) => {
            simulate.keydown.pressEnd(items.at(1).find(StyledMenuItem).at(0));
            jest.runAllTimers();
            expect(items.last().find(StyledMenuItem)).toBeFocused();

            simulate.keydown.pressArrowDown(
              items.last().find(StyledMenuItem).at(0)
            );
            jest.runAllTimers();
            expect(items.at(1).find(StyledMenuItem)).toBeFocused();
          },
        ],
        [
          "Up",
          "previous",
          "",
          (items: ReactWrapper<ActionPopoverItemProps>) => {
            simulate.keydown.pressArrowDown(
              items.at(1).find(StyledMenuItem).at(0)
            );
            simulate.keydown.pressArrowDown(
              items.at(2).find(StyledMenuItem).at(0)
            );

            simulate.keydown.pressArrowUp(
              items.at(3).find(StyledMenuItem).at(0)
            );
            jest.runAllTimers();

            expect(items.at(2).find(StyledMenuItem)).toBeFocused();

            simulate.keydown.pressArrowUp(
              items.at(2).find(StyledMenuItem).at(0)
            );
            jest.runAllTimers();

            expect(items.at(1).find(StyledMenuItem)).toBeFocused();

            simulate.keydown.pressArrowUp(
              items.at(1).find(StyledMenuItem).at(0)
            );
            jest.runAllTimers();
            expect(items.at(3).find(StyledMenuItem)).toBeFocused();
            expect(items.first().find(StyledMenuItem)).not.toBeFocused();
          },
        ],
        [
          "Up",
          "last",
          "if the focus is on the first focusable item",
          (items: ReactWrapper<ActionPopoverItemProps>) => {
            simulate.keydown.pressArrowUp(
              items.at(1).find(StyledMenuItem).at(0)
            );
            jest.runAllTimers();
            expect(items.last().find(StyledMenuItem)).toBeFocused();
          },
        ],
        [
          "Home",
          "first",
          "",
          (items: ReactWrapper<ActionPopoverItemProps>) => {
            simulate.keydown.pressHome(items.at(1));

            expect(items.at(1).find(StyledMenuItem)).toBeFocused();
          },
        ],
        [
          "End",
          "first",
          "",
          (items) => {
            simulate.keydown.pressEnd(items.first());
            jest.runAllTimers();
            expect(items.last().find(StyledMenuItem)).toBeFocused();
          },
        ],
      ])(
        "Pressing %s focuses the %s item %s",
        (key, direction, condition, mutator) => {
          render();
          openMenu();
          const { items } = getElements();

          mutator(items);
        }
      );

      it("Pressing Space does nothing", () => {
        render();
        openMenu();
        const { items } = getElements();

        simulate.keydown.pressSpace(items.at(1).find(StyledMenuItem));

        const { menu } = getElements();
        expect(items.at(1).find(StyledMenuItem)).toBeFocused();
        expect(menu.exists()).toBe(true);
      });

      it("Pressing a-z selects the next item in the list starting with the letter that was pressed", () => {
        render();
        openMenu();

        const { items } = getElements();

        // moves to first element starting with P
        simulate.keydown.pressP(items.at(1).find(StyledMenuItem).at(0));
        jest.runAllTimers();
        expect(items.at(2).find(StyledMenuItem)).toBeFocused();

        // moves to first element starting with D
        simulate.keydown.pressD(items.at(2).find(StyledMenuItem).at(0));
        jest.runAllTimers();
        expect(items.at(3).find(StyledMenuItem)).toBeFocused();

        // moves to next element starting with D, it loops to the start
        simulate.keydown.pressD(items.at(3).find(StyledMenuItem).at(0));
        jest.runAllTimers();
        expect(items.at(3).find(StyledMenuItem)).toBeFocused();
        // we're checking that we cannot focus the disabled item.
        expect(items.at(0).find(StyledMenuItem)).not.toBeFocused();
        expect(items.at(0).prop("disabled")).toBe(true);
        expect(
          items
            .at(0)
            .find(StyledMenuItem)
            .getDOMNode()
            .getAttribute("aria-disabled")
        ).toBe("true");

        // does nothing when there are no matches
        simulate.keydown.pressZ(items.at(3).find(StyledMenuItem).at(0));
        jest.runAllTimers();
        expect(items.at(3).find(StyledMenuItem)).toBeFocused();
      });

      it("does nothing when a non printable character key is pressed", () => {
        render();
        openMenu();

        const { items } = getElements();

        items.at(1).simulate("keydown", { key: "F1" });
        jest.runAllTimers();
        expect(items.at(1).find(StyledMenuItem)).toBeFocused();
      });
    });
  });

  it("validates the children prop", () => {
    const globalConsoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});

    expect(() => {
      enzymeMount(
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}}>Item</ActionPopoverItem>
          Invalid children
          <p>invalid children</p>
        </ActionPopover>
      );
    }).toThrow(
      "ActionPopover only accepts children of type `ActionPopoverItem`" +
        " and `ActionPopoverDivider`."
    );

    globalConsoleSpy.mockRestore();
  });

  describe("submenu", () => {
    describe("left aligned", () => {
      beforeEach(() => renderWithSubmenu());

      it("renders an icon to indicate when a item has a submenu and is left aligned", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);
        const submenuIcon = item.find(SubMenuItemIcon);
        assertStyleMatch(
          {
            left: "-5px",
          },
          submenuIcon
        );
        expect(submenuIcon.props().type).toEqual("chevron_left_thick");
      });

      it("opens the submenu on mouseenter", () => {
        openMenu();
        const { items } = getElements();

        act(() => {
          items.at(1).find(StyledMenuItemWrapper).at(0).simulate("mouseenter");
          jest.runAllTimers();
          wrapper.update();
        });

        const item = wrapper.find(ActionPopoverItem).at(1);
        expect(item.find(ActionPopoverMenu).props().isOpen).toBe(true);
      });

      it("clears timeout when mouseenter happens twice in the set interval", () => {
        openMenu();
        const { items } = getElements();

        const clearTimeoutSpy = jest.spyOn(window, "clearTimeout");

        act(() => {
          items.at(1).find(StyledMenuItemWrapper).at(0).simulate("mouseenter");
          items.at(1).find(StyledMenuItemWrapper).at(0).simulate("mouseenter");
          jest.runAllTimers();
          wrapper.update();
        });

        expect(clearTimeoutSpy).toHaveBeenCalled();
        clearTimeoutSpy.mockRestore();
      });

      it("closes the submenu on mouseleave event", () => {
        openMenu();
        const { items } = getElements();

        act(() => {
          items.at(1).find(StyledMenuItemWrapper).at(0).simulate("mouseenter");
          jest.runAllTimers();
          wrapper.update();
        });

        const item = wrapper.find(ActionPopoverItem).at(1);
        expect(item.find(ActionPopoverMenu).props().isOpen).toBe(true);

        act(() => {
          items.at(1).find(StyledMenuItemWrapper).at(0).simulate("mouseleave");
          jest.runAllTimers();
          wrapper.update();
        });

        const newItem = wrapper.find(ActionPopoverItem).at(1);
        expect(newItem.find(ActionPopoverMenu).props().isOpen).toBe(false);
      });

      it("clears timeout when mouseleave happens twice in the set interval", () => {
        openMenu();
        const { items } = getElements();

        const clearTimeoutSpy = jest.spyOn(window, "clearTimeout");

        act(() => {
          items.at(1).find(StyledMenuItemWrapper).at(0).simulate("mouseleave");
          items.at(1).find(StyledMenuItemWrapper).at(0).simulate("mouseleave");
          jest.runAllTimers();
          wrapper.update();
        });

        expect(clearTimeoutSpy).toHaveBeenCalled();
        clearTimeoutSpy.mockRestore();
      });

      it("opens the submenu and focuses first item when left key is pressed", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);
        act(() => {
          simulate.keydown.pressArrowLeft(item.find(StyledMenuItem).at(0));
        });
        jest.runAllTimers();
        act(() => {
          expect(
            item
              .find(ActionPopoverMenu)
              .find(ActionPopoverItem)
              .at(0)
              .find(StyledMenuItem)
              .at(0)
              .getDOMNode()
          ).toBeFocused();
        });
      });

      it("closes the submenu and returns focus to parent item when right key is pressed", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);
        act(() => {
          simulate.keydown.pressArrowLeft(item.find(StyledMenuItem).at(0));
        });
        jest.runAllTimers();
        act(() => {
          simulate.keydown.pressArrowRight(item.find(StyledMenuItem).at(0));
        });
        jest.runAllTimers();
        act(() => {
          expect(
            item
              .find(ActionPopoverMenu)
              .find(ActionPopoverItem)
              .at(0)
              .find(StyledMenuItem)
              .at(0)
              .getDOMNode()
          ).not.toBeFocused();
          expect(item.find(StyledMenuItem).at(0).getDOMNode()).toBeFocused();
        });
      });

      it("does not close the submenu unless right or esc key is pressed", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);
        act(() => {
          simulate.keydown.pressArrowLeft(item.find(StyledMenuItem).at(0));
          jest.runAllTimers();
        });
        act(() => {
          simulate.keydown.pressZ(item.find(StyledMenuItem).at(0));
          jest.runAllTimers();
        });

        act(() => {
          expect(
            item
              .find(ActionPopoverMenu)
              .find(ActionPopoverItem)
              .at(0)
              .find(StyledMenuItem)
              .at(0)
              .getDOMNode()
          ).toBeFocused();
        });
      });

      it("opens the submenu when the enter key is pressed", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1).find(StyledMenuItem).at(0);
        act(() => {
          simulate.keydown.pressEnter(item);
        });
        expect(onClick).not.toHaveBeenCalled();
      });

      it("opens the submenu when the item is clicked", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1).find(StyledMenuItem).at(0);
        act(() => {
          item.simulate("click");
        });
        expect(onClick).not.toHaveBeenCalled();
      });

      it("closes the submenu when a submenu item is clicked", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);
        const submenu = item.find(ActionPopoverMenu);
        act(() => {
          submenu.simulate("click");
        });
        assertStyleMatch(
          {
            visibility: "hidden",
          },
          submenu
        );
        expect(submenu.props().isOpen).toEqual(false);
      });

      it("closes the submenu when the escape key is pressed", () => {
        const { menubutton } = getElements();
        menubutton.simulate("click");
        jest.runAllTimers();
        const { items } = getElements();
        const item = items.at(1);
        const submenu = item.find(ActionPopoverMenu);
        const submenuItem = submenu.find(ActionPopoverItem).at(0);
        act(() => {
          simulate.keydown.pressArrowLeft(item.find(StyledMenuItem).at(0));
        });
        act(() => {
          simulate.keydown.pressEscape(submenuItem.find(StyledMenuItem).at(0));
        });
        assertStyleMatch(
          {
            visibility: "hidden",
          },
          submenu
        );
        expect(submenu.props().isOpen).toEqual(false);
      });

      it("does not open a submenu if an item is disabled", () => {
        const tempWrapper = enzymeMount(
          <ActionPopover>
            <ActionPopoverItem
              icon="email"
              disabled
              submenu={<ActionPopoverMenu />}
              {...{ onClick: onClickWrapper("email") }}
            >
              Foo
            </ActionPopoverItem>
          </ActionPopover>
        );

        tempWrapper.find(MenuButton).simulate("click");
        jest.runAllTimers();

        const wrapperElement = tempWrapper.find(StyledMenuItemWrapper);
        const item = tempWrapper.find(ActionPopoverItem);
        expect(item.props().submenu).toBeTruthy();
        expect(wrapperElement.props().onMouseEnter).toEqual(undefined);
        expect(wrapperElement.props().onMouseLeave).toEqual(undefined);
        expect(item.find("button").at(0).props()["aria-haspopup"]).toEqual(
          "true"
        );
        expect(item.find("button").at(0).props()["aria-controls"]).not.toEqual(
          undefined
        );
        expect(item.find("button").at(0).props()["aria-expanded"]).toEqual(
          false
        );
      });

      it("updates the focus when an item with a submenu is clicked and does not close the menu", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1).find(StyledMenuItem).at(0).getDOMNode();

        act(() => {
          item.dispatchEvent(new MouseEvent("click", { bubbles: true }));
          expect(item).toBeFocused();
        });

        expect(onClose).toHaveBeenCalledTimes(0);
      });

      it("removes focus from an item when clicked if it has no submenu", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(2);

        act(() => {
          item
            .getDOMNode()
            .dispatchEvent(new MouseEvent("click", { bubbles: true }));
          expect(item.find(StyledMenuItem).at(0)).not.toBeFocused();
        });
      });

      it("returns focus back to menu button when submenu item clicked", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);
        const submenu = item.find(ActionPopoverMenu);
        const submenuItem = submenu.find(ActionPopoverItem).at(0);

        act(() => {
          item
            .find(StyledMenuItem)
            .at(0)
            .getDOMNode()
            .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        act(() => {
          simulate.keydown.pressArrowLeft(item);
          jest.runAllTimers();
          expect(item).not.toBeFocused();
        });

        act(() => {
          submenuItem
            .getDOMNode()
            .dispatchEvent(new MouseEvent("click", { bubbles: true }));
          const { buttonIcon } = getElements();
          expect(buttonIcon).toBeFocused();
          jest.runAllTimers(); // needed to trigger coverage
        });
      });

      it("focus is maintained on disabled submenu item when clicked", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);
        const submenu = item.find(ActionPopoverMenu);
        const disabledSubmenuItem = submenu
          .find(ActionPopoverItem)
          .at(1)
          .find(StyledMenuItem)
          .at(0);

        act(() => {
          item
            .find(StyledMenuItem)
            .at(0)
            .getDOMNode()
            .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

        act(() => {
          simulate.keydown.pressArrowLeft(item.find(StyledMenuItem).at(0));
        });

        act(() => {
          disabledSubmenuItem
            .getDOMNode()
            .dispatchEvent(new MouseEvent("click", { bubbles: true }));
          expect(disabledSubmenuItem).toBeFocused();
        });
      });
    });

    describe('when the "focusIndex" prop is -1', () => {
      it("does not focus the first of the items", () => {
        const item = enzymeMount(
          <ActionPopoverContext.Provider
            value={{
              setOpenPopover: jest.fn(),
              focusButton: jest.fn(),
              isOpenPopover: false,
              submenuPosition: "left",
            }}
          >
            <ActionPopoverMenu
              setOpen={jest.fn()}
              setFocusIndex={jest.fn()}
              focusIndex={-1}
            >
              <ActionPopoverItem
                key="0"
                {...{ onClick: onClickWrapper("sub menu 1") }}
              >
                Sub Menu 1
              </ActionPopoverItem>
            </ActionPopoverMenu>
          </ActionPopoverContext.Provider>
        ).find(ActionPopoverItem);

        expect(item).not.toBeFocused();
        assertStyleMatch(
          {
            outline: undefined,
          },
          item
        );
      });
    });

    describe("submenu aligns right when parent container is too small and submenuPosition is 'left'", () => {
      let getBoundingClientRectSpy: jest.SpyInstance;
      beforeEach(() => {
        // Mock the parent boundingRect
        getBoundingClientRectSpy = jest.spyOn(
          Element.prototype,
          "getBoundingClientRect"
        );
        Element.prototype.getBoundingClientRect = jest
          .fn()
          .mockImplementation(() => ({
            left: "-100",
            right: "auto",
            top: "100",
          }));
        renderWithSubmenu({
          submenuPosition: "left",
        });
      });

      afterEach(() => {
        // Clear Mock from parent boundingRect
        getBoundingClientRectSpy.mockRestore();
      });

      it("renders an icon to indicate when a item has a submenu and is right aligned", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);
        const submenuIcon = item.find(SubMenuItemIcon);
        assertStyleMatch(
          {
            right: "-5px",
          },
          submenuIcon
        );
        expect(submenuIcon.props().type).toEqual("chevron_right_thick");
      });

      it("opens the submenu and focuses the first item when right key is pressed", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);

        act(() => {
          simulate.keydown.pressArrowRight(item.find(StyledMenuItem).at(0));
        });
        jest.runAllTimers();

        act(() => {
          expect(
            item
              .find(ActionPopoverMenu)
              .find(ActionPopoverItem)
              .at(0)
              .find(StyledMenuItem)
              .at(0)
              .getDOMNode()
          ).toBeFocused();
        });
      });

      it("closes the submenu and returns focus to parent item when left key is pressed", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);
        act(() => {
          simulate.keydown.pressArrowRight(item.find(StyledMenuItem).at(0));
        });
        act(() => {
          simulate.keydown.pressArrowLeft(item.find(StyledMenuItem).at(0));
        });
        act(() => {
          expect(
            item
              .find(ActionPopoverMenu)
              .find(ActionPopoverItem)
              .at(0)
              .find(StyledMenuItem)
              .at(0)
              .getDOMNode()
          ).not.toBeFocused();
          expect(item.find(StyledMenuItem).at(0).getDOMNode()).toBeFocused();
        });
      });
    });

    describe("submenu aligns right when submenuPosition is 'right'", () => {
      beforeEach(() => {
        renderWithSubmenu({ submenuPosition: "right" });
      });

      it("renders an icon to indicate when a item has a submenu and is right aligned", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);
        const submenuIcon = item.find(SubMenuItemIcon);
        assertStyleMatch(
          {
            right: "-5px",
          },
          submenuIcon
        );
        expect(submenuIcon.props().type).toEqual("chevron_right_thick");
      });

      it("opens the submenu and focuses the first item when right key is pressed", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);

        act(() => {
          simulate.keydown.pressArrowRight(item.find(StyledMenuItem).at(0));
        });
        jest.runAllTimers();

        act(() => {
          expect(
            item
              .find(ActionPopoverMenu)
              .find(ActionPopoverItem)
              .at(0)
              .find(StyledMenuItem)
              .at(0)
              .getDOMNode()
          ).toBeFocused();
        });
      });

      it("closes the submenu and returns focus to parent item when left key is pressed", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);
        act(() => {
          simulate.keydown.pressArrowRight(item.find(StyledMenuItem).at(0));
        });
        act(() => {
          simulate.keydown.pressArrowLeft(item.find(StyledMenuItem).at(0));
        });
        act(() => {
          expect(
            item
              .find(ActionPopoverMenu)
              .find(ActionPopoverItem)
              .at(0)
              .find(StyledMenuItem)
              .at(0)
              .getDOMNode()
          ).not.toBeFocused();
          expect(item.find(StyledMenuItem).at(0).getDOMNode()).toBeFocused();
        });
      });
    });

    describe("submenu aligns left when parent container is too small and submenuPosition is 'right'", () => {
      let getBoundingClientRectSpy: jest.SpyInstance;
      beforeEach(() => {
        // Mock the parent boundingRect
        getBoundingClientRectSpy = jest.spyOn(
          Element.prototype,
          "getBoundingClientRect"
        );
        Element.prototype.getBoundingClientRect = jest
          .fn()
          .mockImplementation(() => ({
            left: "auto",
            right: "100",
            top: "100",
          }));
        renderWithSubmenu({
          submenuPosition: "right",
          rightAlignMenu: true,
        });
      });

      afterEach(() => {
        // Clear Mock from parent boundingRect
        getBoundingClientRectSpy.mockRestore();
      });

      it("renders an icon to indicate when a item has a submenu and is left aligned", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);
        const submenuIcon = item.find(SubMenuItemIcon);
        assertStyleMatch(
          {
            left: "-5px",
          },
          submenuIcon
        );
        expect(submenuIcon.props().type).toEqual("chevron_left_thick");
      });

      it("opens the submenu and focuses the first item when right key is pressed", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);

        act(() => {
          simulate.keydown.pressArrowLeft(item.find(StyledMenuItem).at(0));
        });
        jest.runAllTimers();

        act(() => {
          expect(
            item
              .find(ActionPopoverMenu)
              .find(ActionPopoverItem)
              .at(0)
              .find(StyledMenuItem)
              .at(0)
              .getDOMNode()
          ).toBeFocused();
        });
      });

      it("closes the submenu and returns focus to parent item when left key is pressed", () => {
        openMenu();
        const { items } = getElements();
        const item = items.at(1);
        act(() => {
          simulate.keydown.pressArrowLeft(item.find(StyledMenuItem).at(0));
        });
        act(() => {
          simulate.keydown.pressArrowRight(item.find(StyledMenuItem).at(0));
        });
        act(() => {
          expect(
            item
              .find(ActionPopoverMenu)
              .find(ActionPopoverItem)
              .at(0)
              .find(StyledMenuItem)
              .at(0)
              .getDOMNode()
          ).not.toBeFocused();
          expect(item.find(StyledMenuItem).at(0).getDOMNode()).toBeFocused();
        });
      });
    });

    it("validates the submenu prop", () => {
      const globalConsoleSpy = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => {});

      expect(() => {
        const tempWrapper = enzymeMount(
          <ActionPopover>
            <ActionPopoverItem
              submenu={<p>foo</p>}
              icon="pdf"
              onClick={jest.fn()}
            >
              item
            </ActionPopoverItem>
          </ActionPopover>
        );

        tempWrapper.find(MenuButton).simulate("click");
        jest.runAllTimers();
      }).toThrow(
        "ActionPopoverItem only accepts submenu of type `ActionPopoverMenu`"
      );

      globalConsoleSpy.mockRestore();
    });

    it("validates the ActionPopoverMenu children", () => {
      const globalConsoleSpy = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => {});

      expect(() => {
        enzymeMount(
          <ActionPopoverContext.Provider
            value={{
              setOpenPopover: jest.fn(),
              focusButton: jest.fn(),
              isOpenPopover: true,
              submenuPosition: "left",
            }}
          >
            <ActionPopoverMenu
              setOpen={jest.fn()}
              setFocusIndex={jest.fn()}
              focusIndex={-1}
            >
              Invalid
              <p>Invalid</p>
            </ActionPopoverMenu>
          </ActionPopoverContext.Provider>
        );
      }).toThrow(
        "ActionPopoverMenu only accepts children of type `ActionPopoverItem`" +
          " and `ActionPopoverDivider`."
      );

      globalConsoleSpy.mockRestore();
    });
  });

  describe("placement prop set to 'top'", () => {
    let getBoundingClientRectSpy: jest.SpyInstance;
    beforeEach(() => {
      // Mock the parent boundingRect
      getBoundingClientRectSpy = jest.spyOn(
        Element.prototype,
        "getBoundingClientRect"
      );
      Element.prototype.getBoundingClientRect = jest
        .fn()
        .mockImplementation(() => ({
          left: "10",
          right: "10",
          bottom: "124",
          top: "100",
        }));

      wrapper = enzymeMount(
        <ActionPopover placement="top">
          <ActionPopoverItem
            onClick={onClick}
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem
                  key="0"
                  {...{ onClick: onClickWrapper("sub menu 1") }}
                >
                  Sub Menu 1
                </ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            foo
          </ActionPopoverItem>
        </ActionPopover>
      );
    });

    afterEach(() => {
      // Clear Mock from parent boundingRect
      getBoundingClientRectSpy.mockRestore();
    });

    it("positions the submenu container's bottom inline with the the parent item", () => {
      openMenu();
      const item = wrapper.find(ActionPopoverItem).at(0);

      expect(item.find(ActionPopoverMenu).props().style?.bottom).toEqual(
        "calc(-1 * var(--spacing100))"
      );
    });
  });

  describe("Custom Menu Button", () => {
    it("supports being passed an override component to act as the menu button", () => {
      const popover = enzymeMount(
        <ActionPopover
          renderButton={(props) => (
            <ActionPopoverMenuButton
              buttonType="tertiary"
              iconType="dropdown"
              iconPosition="after"
              size="small"
              {...props}
            >
              Foo
            </ActionPopoverMenuButton>
          )}
        >
          <ActionPopoverItem onClick={jest.fn()}>foo</ActionPopoverItem>
        </ActionPopover>
      ).find(ActionPopover);

      const menuButton = popover.find(ActionPopoverMenuButton);
      expect(menuButton.exists()).toBeTruthy();
      expect(menuButton.props().tabIndex).toEqual(0);
      expect(menuButton.props()["data-element"]).toEqual(
        "action-popover-button"
      );

      assertStyleMatch(
        {
          padding: "0px var(--sizing100)",
          width: "100%",
        },
        menuButton,
        { modifier: `${StyledButton}` }
      );
    });

    it("sets the tabIndex correctly when opened", () => {
      wrapper = enzymeMount(
        <ActionPopover
          renderButton={(props) => (
            <ActionPopoverMenuButton
              buttonType="tertiary"
              iconType="dropdown"
              iconPosition="after"
              size="small"
              {...props}
            >
              Foo
            </ActionPopoverMenuButton>
          )}
        >
          <ActionPopoverItem onClick={jest.fn()}>foo</ActionPopoverItem>
        </ActionPopover>
      );

      openMenu();

      const menuButton = wrapper.find(ActionPopoverMenuButton);
      expect(menuButton.exists()).toBeTruthy();
      expect(menuButton.props().tabIndex).toEqual(-1);
    });
  });

  describe("padding checks on 'StyledMenuItemInnerText'", () => {
    it.each([
      ["left", "left"],
      ["left", "right"],
      ["right", "left"],
      ["right", "right"],
    ])(
      "when horizontalAlignment is %s and submenuPosition is %, then left and right padding is: var(--spacing100)",
      (alignment, position) => {
        renderActionPopoverWithNoIconsOrSubmenus({
          submenuPosition: position,
          horizontalAlignment: alignment,
        });
        openMenu();
        assertStyleMatch(
          {
            paddingLeft: "var(--spacing100)",
            paddingRight: "var(--spacing100)",
          },
          wrapper.find(StyledMenuItemInnerText).at(0)
        );
      }
    );

    it.each([
      ["left", "left", "var(--spacing400)", "var(--spacing100)"],
      ["right", "right", "var(--spacing100)", "var(--spacing400)"],
    ])(
      "when horizontalAlignment is %s, submenuPosition is %s and Menu Item children have some submenus and no icons, then padding-left is %s and padding-right is %s",
      (alignment, position, paddingLeft, paddingRight) => {
        renderActionPopoverWithSomeSubmenusAndNoIcons({
          submenuPosition: position,
          horizontalAlignment: alignment,
        });
        openMenu();
        assertStyleMatch(
          {
            paddingLeft,
            paddingRight,
          },
          wrapper.find(StyledMenuItemInnerText).at(0)
        );
      }
    );

    it.each([
      ["left", "left", "var(--spacing600)", "var(--spacing100)"],
      ["right", "right", "var(--spacing100)", "var(--spacing600)"],
    ])(
      "when horizontalAlignment is %s submenuPosition is %s and Menu Item children have submenus and some icons, then padding-left is %s and padding-right is %s",
      (alignment, position, paddingLeft, paddingRight) => {
        renderActionPopoverWithSubmenusAndSomeIcons({
          submenuPosition: position,
          horizontalAlignment: alignment,
        });
        openMenu();
        assertStyleMatch(
          {
            paddingLeft,
            paddingRight,
          },
          wrapper.find(StyledMenuItemInnerText).at(0)
        );
      }
    );

    it.each([
      ["left", "left", "var(--spacing900)", "var(--spacing100)"],
      ["right", "right", "var(--spacing100)", "var(--spacing900)"],
    ])(
      "when horizontalAlignment is %s submenuPosition is %s and Menu Item children are variable, then padding-left is %s and padding-right is %s",
      (alignment, position, paddingLeft, paddingRight) => {
        renderWithVariableChildren({
          submenuPosition: position,
          horizontalAlignment: alignment,
        });
        openMenu();
        assertStyleMatch(
          {
            paddingLeft,
            paddingRight,
          },
          wrapper.find(StyledMenuItemInnerText).at(0)
        );
      }
    );

    it.each([
      ["left", "left"],
      ["left", "right"],
      ["right", "left"],
      ["right", "right"],
    ])(
      "when horizontalAlignment is %s, submenuPosition is %s and child is a submenu, left and right padding is var(--spacing000)",
      (alignment, position) => {
        renderActionPopoverWithSubmenusAndSomeIcons({
          submenuPosition: position,
          horizontalAlignment: alignment,
        });
        openMenu();
        const { items } = getElements();
        const item = items.at(0);
        const submenu = item.find(ActionPopoverMenu);
        const disabledSubmenuItem = submenu
          .find(ActionPopoverItem)
          .at(1)
          .find(StyledMenuItem)
          .at(0);

        assertStyleMatch(
          {
            paddingLeft: "var(--spacing000)",
            paddingRight: "var(--spacing000)",
          },
          disabledSubmenuItem.find(StyledMenuItemInnerText)
        );
      }
    );
  });

  describe("justify-content checks on 'StyledMenuItem'", () => {
    it.each([
      ["left", "flex-start"],
      ["right", "flex-end"],
    ])(
      "when horizontalAlignment is %s, then content should be justified %s",
      (alignment, itemAlignment) => {
        render({ horizontalAlignment: alignment });
        openMenu();
        assertStyleMatch(
          {
            justifyContent: itemAlignment,
          },
          wrapper.find(StyledMenuItem)
        );
      }
    );

    it.each([
      ["left", "right", "space-between", 0],
      ["right", "left", "flex-end", 1],
    ])(
      "when horizontalAlignment is %s, submenuPosition is %s and Menu Item Children have no submenus, then content should be justified flex-end",
      (alignment, position, itemAlignment, index) => {
        render({ horizontalAlignment: alignment, submenuPosition: position });

        openMenu();
        assertStyleMatch(
          {
            justifyContent: itemAlignment,
          },
          wrapper.find(StyledMenuItem).at(index)
        );
      }
    );

    it.each([
      ["left", "right", 0],
      ["right", "left", 1],
    ])(
      "when horizontalAlignment is %s, submenuPosition is %s and Menu Item children have submenus, then content should be justified space-between",
      (alignment, position, index) => {
        renderWithSubmenu({
          horizontalAlignment: alignment,
          submenuPosition: position,
        });

        openMenu();
        assertStyleMatch(
          {
            justifyContent: "space-between",
          },
          wrapper.find(StyledMenuItem).at(index)
        );
      }
    );
  });

  describe("padding checks on 'MenuItemIcon'", () => {
    it("padding is var(--spacing100)", () => {
      renderWithSubmenu();
      openMenu();
      assertStyleMatch(
        {
          padding:
            "var(--spacing100) var(--spacing100) var(--spacing100) var(--spacing100)",
        },
        wrapper.find(MenuItemIcon).at(1)
      );
    });

    it.each([
      [
        "left",
        "left",
        "var(--spacing100) var(--spacing100) var(--spacing100) var(--spacing400)",
      ],
      [
        "left",
        "right",
        "var(--spacing100) var(--spacing100) var(--spacing100) var(--spacing100)",
      ],
      [
        "right",
        "left",
        "var(--spacing100) var(--spacing100) var(--spacing100) var(--spacing100)",
      ],
      [
        "right",
        "right",
        "var(--spacing100) var(--spacing400) var(--spacing100) var(--spacing100)",
      ],
    ])(
      "when horizontalAlignment is %s, submenuPosition is %s and Menu Item children have icons and some submenus, then padding is %s",
      (alignment, position, padding) => {
        renderWithSubmenu({
          submenuPosition: position,
          horizontalAlignment: alignment,
        });
        openMenu();
        assertStyleMatch(
          {
            padding,
          },
          wrapper.find(MenuItemIcon)
        );
      }
    );
  });

  describe("When ActionPopoverMenu contains multiple disabled items", () => {
    it("should focus the next focusable item when down arrow is pressed", () => {
      renderActionPopoverWithMultipleDisabledItems();
      openMenu();
      const { items } = getElements();

      simulate.keydown.pressArrowDown(items.at(0).find(StyledMenuItem).at(0));
      jest.runAllTimers();

      expect(items.at(3).find(StyledMenuItem)).toBeFocused();
    });

    it("should focus the next focusable item when up arrow is pressed", () => {
      renderActionPopoverWithMultipleDisabledItems();
      openMenu();
      const { items } = getElements();

      simulate.keydown.pressArrowDown(items.at(0).find(StyledMenuItem).at(0));
      jest.runAllTimers();

      expect(items.at(3).find(StyledMenuItem)).toBeFocused();

      simulate.keydown.pressArrowUp(items.at(3).find(StyledMenuItem).at(0));
      jest.runAllTimers();

      expect(items.at(0).find(StyledMenuItem)).toBeFocused();
    });

    it("should focus the first focusable item when Home is pressed", () => {
      renderActionPopoverWithMultipleDisabledItems();
      openMenu();
      const { items } = getElements();

      simulate.keydown.pressHome(items.at(5).find(StyledMenuItem).at(0));
      jest.runAllTimers();

      expect(items.at(0).find(StyledMenuItem)).toBeFocused();
    });

    it("should focus the last focusable item when End is pressed", () => {
      renderActionPopoverWithMultipleDisabledItems();
      openMenu();
      const { items } = getElements();

      simulate.keydown.pressEnd(items.at(0).find(StyledMenuItem).at(0));
      jest.runAllTimers();

      expect(items.at(5).find(StyledMenuItem)).toBeFocused();
    });
  });
});

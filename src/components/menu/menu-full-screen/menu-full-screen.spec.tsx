import React, { useState, useEffect } from "react";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";

import { MenuItem } from "..";
import MenuFullscreen, { MenuFullscreenProps } from ".";
import MenuDivider from "../menu-divider/menu-divider.component";
import MenuContext, { MenuType } from "../menu.context";
import StyledIcon from "../../icon/icon.style";
import IconButton from "../../icon-button";
import {
  StyledMenuFullscreen,
  StyledMenuFullscreenHeader,
} from "./menu-full-screen.style";
import StyledIconButton from "../../icon-button/icon-button.style";
import Search from "../../search";
import StyledSearch from "../../search/search.style";
import StyledSearchButton from "../../search/search-button.style";
import {
  assertStyleMatch,
  simulate,
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";
import { baseTheme } from "../../../style/themes";
import { StyledMenuItem } from "../menu.style";
import menuConfigVariants from "../menu.config";
import Logger from "../../../__internal__/utils/logger";

// mock Logger.deprecate so that Typography (used for the alert dialog's heading) doesn't trigger a warning while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

const onClose = jest.fn();
const onClick = jest.fn();

const TestMenu = ({
  startPosition,
  isOpen,
}: Pick<MenuFullscreenProps, "startPosition" | "isOpen">) => (
  <MenuFullscreen
    startPosition={startPosition}
    isOpen={isOpen}
    onClose={onClose}
    data-element="bar"
    data-role="baz"
  >
    <MenuItem maxWidth="200px" href="#">
      Menu Item One
    </MenuItem>
    <MenuItem maxWidth="200px" onClick={onClick} submenu="Menu Item Two">
      <MenuItem maxWidth="200px" href="#">
        Submenu Item One
      </MenuItem>
      <MenuItem maxWidth="200px" href="#">
        Submenu Item Two
      </MenuItem>
    </MenuItem>
    <MenuItem maxWidth="200px" href="#">
      Menu Item Three
    </MenuItem>
    <MenuItem maxWidth="200px" href="#">
      Menu Item Four
    </MenuItem>
    <MenuItem maxWidth="200px" submenu="Menu Item Five">
      <MenuItem maxWidth="200px" href="#">
        Submenu Item One
      </MenuItem>
      <MenuItem maxWidth="200px" href="#">
        Submenu Item Two
      </MenuItem>
    </MenuItem>
    <MenuItem maxWidth="200px" href="#">
      Menu Item Six
    </MenuItem>
  </MenuFullscreen>
);

const render = ({
  menuType = "light",
  ...props
}: { menuType?: MenuType } & Partial<MenuFullscreenProps>) => {
  return mount(
    <MenuContext.Provider
      value={{
        menuType,
        openSubmenuId: null,
        inMenu: true,
        setOpenSubmenuId: () => {},
      }}
    >
      <TestMenu {...props} />
    </MenuContext.Provider>
  );
};

const MockMenuWithSearch = ({
  isOpen,
  focusInput,
}: {
  isOpen?: boolean;
  focusInput?: boolean;
}) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (focusInput && ref.current) {
      (ref.current as HTMLInputElement).focus();
    }
  }, [focusInput]);

  return (
    <MenuFullscreen isOpen={isOpen} onClose={() => {}}>
      <MenuItem maxWidth="200px">
        <Search value="" ref={ref} defaultValue="" searchButton />
      </MenuItem>
      <MenuItem maxWidth="200px" href="#">
        Menu Item One
      </MenuItem>
    </MenuFullscreen>
  );
};

const MockMenuWithFalsyValues = ({ isOpen }: { isOpen?: boolean }) => {
  const showMenuItem = false;
  return mount(
    <MenuFullscreen isOpen={isOpen} onClose={() => {}}>
      <MenuItem maxWidth="200px">Submenu Item One</MenuItem>
      {false && <MenuItem href="#">Product Item One</MenuItem>}
      {showMenuItem ? <MenuItem href="#">Product Item Two</MenuItem> : null}
    </MenuFullscreen>
  );
};

const UpdatingSubmenu = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev >= 2 ? prev : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <MenuItem submenu={`submenu 2 - count ${counter}`}>
      <MenuItem>Item One </MenuItem>
      <MenuItem>Item Two </MenuItem>
    </MenuItem>
  );
};

const MockFullScreenMenuWithUpdatingItems = () => {
  const [extraItem, setExtraItem] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setExtraItem(true);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <MenuFullscreen onClose={() => {}} isOpen>
      {extraItem ? (
        <MenuItem submenu="extra submenu">
          <MenuItem>Item One </MenuItem>
          <MenuItem>Item Two </MenuItem>
        </MenuItem>
      ) : null}
      <MenuItem submenu="submenu 1">
        <MenuItem>Item One </MenuItem>
        <MenuItem>Item Two </MenuItem>
      </MenuItem>
      <UpdatingSubmenu />
    </MenuFullscreen>
  );
};

describe("MenuFullscreen", () => {
  let wrapper: ReactWrapper;

  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
  });

  afterAll(() => {
    loggerSpy.mockRestore();
  });

  beforeEach(() => {
    wrapper = render({});
  });

  describe("tags on component", () => {
    it("includes correct component, element and role data tags", () => {
      expect(
        wrapper
          .find(StyledMenuFullscreen)
          .getDOMNode()
          .getAttribute("data-component")
      ).toEqual("menu-fullscreen");

      expect(
        wrapper
          .find(StyledMenuFullscreen)
          .getDOMNode()
          .getAttribute("data-element")
      ).toEqual("bar");

      expect(
        wrapper
          .find(StyledMenuFullscreen)
          .getDOMNode()
          .getAttribute("data-role")
      ).toEqual("baz");
    });
  });

  it("should render children correctly", () => {
    expect(wrapper.find(MenuItem).length).toEqual(10);
    expect(wrapper.find(MenuDivider).length).toEqual(5);
  });

  it("should set any maxWidth values passed to items to undefined", () => {
    const items = wrapper.find(StyledMenuItem);
    items.forEach((item) => {
      assertStyleMatch(
        {
          maxWidth: undefined,
        },
        item
      );
    });
  });

  describe("styling", () => {
    it.each<MenuType>(["light", "white", "dark", "black"])(
      "matches the expected as default",
      (menuType) => {
        wrapper = render({ menuType });
        assertStyleMatch(
          {
            position: "fixed",
            top: "0",
            bottom: "0",
            backgroundColor: menuConfigVariants[menuType].background,
            zIndex: `${baseTheme.zIndex.fullScreenModal}`,
            visibility: "hidden",
            left: "-100%",
            transition: "all 0.3s ease",
          },
          wrapper.find(StyledMenuFullscreen)
        );

        ["a", "button", "div"].forEach((el) => {
          assertStyleMatch(
            {
              fontSize: "16px",
            },
            wrapper.find(StyledMenuFullscreen),
            { modifier: el }
          );
        });

        assertStyleMatch(
          {
            position: "absolute",
            zIndex: "1",
            right: "16px",
            top: "8px",
          },
          wrapper.find(StyledMenuFullscreenHeader),
          { modifier: `${StyledIconButton}` }
        );

        assertStyleMatch(
          {
            paddingTop: "var(--spacing200)",
            paddingBottom: "var(--spacing200)",
          },
          wrapper.find(StyledMenuItem)
        );
      }
    );

    describe.each<MenuType>(["light", "white", "dark", "black"])(
      "applies the expected styling when `menuType` is %s",
      (menuType) => {
        beforeEach(() => {
          wrapper = render({ menuType });
        });

        it("renders a correct item background", () => {
          assertStyleMatch(
            {
              backgroundColor:
                menuConfigVariants[menuType].submenuItemBackground,
            },
            wrapper.find(StyledMenuFullscreenHeader)
          );
        });

        it("renders a correct icon color", () => {
          const iconColors = {
            light: "var(--colorsYin090)",
            dark: "var(--colorsYang100)",
            white: "var(--colorsYin090)",
            black: "var(--colorsYang100)",
          };

          assertStyleMatch(
            {
              color: iconColors[menuType],
            },
            wrapper.find(StyledIcon)
          );
        });
      }
    );

    it("applies the expected styling when `isOpen` is true", () => {
      wrapper = render({ isOpen: true });
      assertStyleMatch(
        {
          visibility: "visible",
          left: "0",
          transition: "all 0.3s ease",
        },
        wrapper.find(StyledMenuFullscreen)
      );
    });

    it("applies the expected styling when `startPosition` is 'right'", () => {
      wrapper = render({ isOpen: true, startPosition: "right" });
      assertStyleMatch(
        {
          visibility: "visible",
          right: "0",
          transition: "all 0.3s ease",
        },
        wrapper.find(StyledMenuFullscreen)
      );
    });

    testStyledSystemPadding(
      (props) => (
        <MenuContext.Provider
          value={{
            menuType: "light",
            openSubmenuId: null,
            inFullscreenView: true,
            inMenu: true,
            setOpenSubmenuId: () => {},
          }}
        >
          <MenuItem {...props}>Foo</MenuItem>
        </MenuContext.Provider>
      ),
      { pt: "10px", pb: "10px" },
      (component) => component.find(StyledMenuItem)
    );
  });

  describe("onClose", () => {
    it("calls the onClose callback when close icon button is clicked", () => {
      render({ isOpen: true }).find(IconButton).simulate("click");
      expect(onClose).toHaveBeenCalled();
    });

    it("calls the onClose callback when escape key pressed", () => {
      simulate.keydown.pressEscape(
        render({ isOpen: true }).find(StyledMenuFullscreen)
      );
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe("onClick", () => {
    it("calls the onClick callback when menu item is clicked", () => {
      const menuItem = render({ isOpen: true })
        .find(MenuItem)
        .at(1)
        .find("button");
      menuItem.simulate("click");
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe("focus behaviour", () => {
    it("focuses the menu wrapper on open of menu", () => {
      wrapper = mount(<TestMenu />);
      wrapper.setProps({ isOpen: true });
      const element = wrapper.find(StyledMenuFullscreen).getDOMNode();
      const startEvent = new Event("transitionstart", {
        bubbles: true,
        cancelable: true,
      });
      const endEvent = new Event("transitionend", {
        bubbles: true,
        cancelable: true,
      });
      element.dispatchEvent(startEvent);
      element.dispatchEvent(endEvent);

      expect(wrapper.find(StyledMenuFullscreen)).toBeFocused();
    });

    describe("when pressing tab key without shift", () => {
      it("does not prevent the browser default behaviour when no Search input with searchButton and no value is rendered", () => {
        const container = document.createElement("div");
        container.id = "enzymeContainer";
        document.body.appendChild(container);
        const preventDefault = jest.fn();
        wrapper = mount(<TestMenu />, {
          attachTo: document.getElementById("enzymeContainer"),
        });
        wrapper.setProps({ isOpen: true });

        const element = wrapper.find(StyledMenuFullscreen).getDOMNode();
        const startEvent = new Event("transitionstart", {
          bubbles: true,
          cancelable: true,
        });
        const endEvent = new Event("transitionend", {
          bubbles: true,
          cancelable: true,
        });
        element.dispatchEvent(startEvent);
        element.dispatchEvent(endEvent);

        wrapper.find(StyledMenuFullscreen).prop("onKeyDown")({
          key: "Tab",
          preventDefault,
        });
        wrapper.find(StyledMenuFullscreen).prop("onKeyDown")({
          key: "Tab",
          preventDefault,
        });
        expect(preventDefault).not.toHaveBeenCalled();
        wrapper.find(StyledMenuFullscreen).prop("onKeyDown")({
          key: "Tab",
          preventDefault,
        });
        expect(preventDefault).not.toHaveBeenCalled();
        wrapper.unmount();
      });

      it("prevents the browser default behaviour when Search input with searchButton and no value rendered", () => {
        const container = document.createElement("div");
        container.id = "enzymeContainer";
        document.body.appendChild(container);
        const preventDefault = jest.fn();
        wrapper = mount(<MockMenuWithSearch />, {
          attachTo: document.getElementById("enzymeContainer"),
        });
        wrapper.setProps({ isOpen: true });
        const element = wrapper.find(StyledMenuFullscreen).getDOMNode();
        const startEvent = new Event("transitionstart", {
          bubbles: true,
          cancelable: true,
        });
        const endEvent = new Event("transitionend", {
          bubbles: true,
          cancelable: true,
        });
        element.dispatchEvent(startEvent);
        element.dispatchEvent(endEvent);
        wrapper.setProps({ focusInput: true });

        expect(wrapper.find(StyledSearch).find("input")).toBeFocused();
        expect(wrapper.find(StyledSearchButton).exists()).toBe(true);
        wrapper.find(StyledMenuFullscreen).prop("onKeyDown")({
          key: "Tab",
          preventDefault,
        });
        expect(preventDefault).toHaveBeenCalled();
        expect(wrapper.find(StyledMenuItem).last().find("a")).toBeFocused();
        wrapper.unmount();
      });
    });
  });

  describe("when clicking outside a submenu", () => {
    it("the app does not crash", () => {
      wrapper = mount(<TestMenu isOpen />);

      const clickOutsideSubmenu = () =>
        act(() => {
          wrapper
            .find(StyledMenuItem)
            .at(0)
            .getDOMNode()
            .dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });

      expect(clickOutsideSubmenu).not.toThrow();
    });
  });

  describe("Menu Divider", () => {
    it("should not render a divider when menu contains a falsy values", () => {
      wrapper = MockMenuWithFalsyValues({ isOpen: true });
      expect(wrapper.find(MenuDivider).exists()).toBe(false);
    });
  });

  describe("keys of children", () => {
    it("should maintain the state of any child items if items are added or removed", () => {
      jest.useFakeTimers();
      wrapper = mount(<MockFullScreenMenuWithUpdatingItems />);
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      wrapper.update();
      expect(wrapper.find(MenuItem).at(6).getDOMNode().textContent).toContain(
        "count 2"
      );
      jest.useRealTimers();
    });
  });
});

import React, { useState, useEffect } from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import MenuFullscreen from ".";
import { MenuItem } from "..";
import MenuDivider from "../menu-divider/menu-divider.component";
import MenuContext, { MenuContextProps } from "../menu.context";

import StyledIcon from "../../icon/icon.style";
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
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";
import CarbonProvider from "../../carbon-provider";
import { sageTheme } from "../../../style/themes";
import { StyledMenuItem } from "../menu.style";
import menuConfigVariants from "../menu.config";
import Logger from "../../../__internal__/utils/logger";

// mock Logger.deprecate so that Typography (used for the alert dialog's heading) doesn't trigger a warning while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

function customMount(
  ui: React.ReactElement,
  {
    menuType = "light",
    openSubmenuId = null,
    inMenu = true,
    setOpenSubmenuId = () => {},
  }: Partial<MenuContextProps> = {}
) {
  return mount(ui, {
    wrappingComponent: ({ children }: { children: React.ReactNode }) => (
      <CarbonProvider validationRedesignOptIn theme={sageTheme}>
        <MenuContext.Provider
          value={{
            menuType,
            openSubmenuId,
            inMenu,
            setOpenSubmenuId,
          }}
        >
          {children}
        </MenuContext.Provider>
      </CarbonProvider>
    ),
  });
}

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
      {extraItem && (
        <MenuItem submenu="extra submenu">
          <MenuItem>Item One </MenuItem>
          <MenuItem>Item Two </MenuItem>
        </MenuItem>
      )}
      <MenuItem submenu="submenu 1">
        <MenuItem>Item One </MenuItem>
        <MenuItem>Item Two </MenuItem>
      </MenuItem>
      <UpdatingSubmenu />
    </MenuFullscreen>
  );
};

describe("MenuFullscreen", () => {
  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    // clean up DOM due to used React portals
    window.document.body.innerHTML = "";
  });

  afterAll(() => {
    loggerSpy.mockRestore();
  });

  it("by default, menu's root container should not exist", () => {
    const wrapper = customMount(
      <MenuFullscreen data-element="bar" data-role="baz" onClose={() => {}}>
        <MenuItem href="#">Item one</MenuItem>
      </MenuFullscreen>
    );
    expect(wrapper.find(StyledMenuFullscreen).exists()).toBeFalsy();
  });

  it("when isOpen prop is true, rendered root container has correct component, element and role data tags", () => {
    const wrapper = customMount(
      <MenuFullscreen
        data-element="bar"
        data-role="baz"
        isOpen
        onClose={() => {}}
      >
        <MenuItem href="#">Item one</MenuItem>
      </MenuFullscreen>
    );

    const menu = wrapper.find(StyledMenuFullscreen).getDOMNode();

    expect(menu.getAttribute("data-component")).toEqual("menu-fullscreen");
    expect(menu.getAttribute("data-element")).toEqual("bar");
    expect(menu.getAttribute("data-role")).toEqual("baz");
  });

  it("when isOpen prop is true, root container has the correct ARIA properties required for dialogs", () => {
    const wrapper = customMount(
      <MenuFullscreen isOpen aria-label="My menu" onClose={() => {}}>
        <MenuItem href="#">Item one</MenuItem>
      </MenuFullscreen>
    );

    const menu = wrapper.find(StyledMenuFullscreen).getDOMNode();

    expect(menu.getAttribute("aria-label")).toEqual("My menu");
    expect(menu.getAttribute("role")).toEqual("dialog");
    expect(menu.getAttribute("aria-modal")).toEqual("true");
  });

  it("should render children correctly", () => {
    const wrapper = customMount(
      <MenuFullscreen isOpen onClose={() => {}}>
        <MenuItem href="#">Item one</MenuItem>
        <MenuItem href="#">Item two</MenuItem>
      </MenuFullscreen>
    );

    expect(wrapper.find(MenuItem).length).toEqual(2);
    expect(wrapper.find(MenuDivider).length).toEqual(1);
  });

  it("if a child item has maxWidth prop set, component overrides it and sets it to undefined", () => {
    const wrapper = customMount(
      <MenuFullscreen isOpen onClose={() => {}}>
        <MenuItem href="#" maxWidth="200px">
          Item one
        </MenuItem>
      </MenuFullscreen>
    );

    assertStyleMatch(
      {
        maxWidth: undefined,
      },
      wrapper.find(StyledMenuItem)
    );
  });

  it("renders with correct style rules", () => {
    const wrapper = customMount(
      <MenuFullscreen isOpen onClose={() => {}}>
        <MenuItem href="#">Item one</MenuItem>
      </MenuFullscreen>
    );

    assertStyleMatch(
      {
        position: "fixed",
        top: "0",
        bottom: "0",
        zIndex: "5000",
      },
      wrapper.find(StyledMenuFullscreen)
    );

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
  });

  it.each(["light", "white", "dark", "black"] as const)(
    "renders %s MenuFullscreen with correct background colour",
    (menuType) => {
      const wrapper = customMount(
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem href="#">Item one</MenuItem>
        </MenuFullscreen>,
        { menuType }
      );

      assertStyleMatch(
        {
          backgroundColor: menuConfigVariants[menuType].background,
        },
        wrapper.find(StyledMenuFullscreen)
      );
    }
  );

  it.each([
    ["light", "var(--colorsYin090)"],
    ["dark", "var(--colorsYang100)"],
    ["white", "var(--colorsYin090)"],
    ["black", "var(--colorsYang100)"],
  ] as const)(
    "renders close button icon with correct color within a %s menu",
    (menuType, color) => {
      const wrapper = customMount(
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem href="#">Item one</MenuItem>
        </MenuFullscreen>,
        { menuType }
      );
      assertStyleMatch({ color }, wrapper.find(StyledIcon));
    }
  );

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

  describe("onClose", () => {
    it("calls the onClose callback when close icon button is clicked", () => {
      const onClose = jest.fn();
      const wrapper = customMount(
        <MenuFullscreen isOpen onClose={onClose}>
          <MenuItem href="#">Item one</MenuItem>
        </MenuFullscreen>
      );
      wrapper.find("button[aria-label='Close']").simulate("click");
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls the onClose callback when Escape key pressed", () => {
      const onClose = jest.fn();
      customMount(
        <MenuFullscreen isOpen onClose={onClose}>
          <MenuItem href="#">Item one</MenuItem>
        </MenuFullscreen>
      );
      act(() => {
        document.dispatchEvent(
          new KeyboardEvent("keyup", {
            key: "Escape",
            bubbles: true,
          })
        );
      });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose callback if any non-Escape key is pressed", () => {
      const onClose = jest.fn();
      customMount(
        <MenuFullscreen isOpen onClose={onClose}>
          <MenuItem href="#">Item one</MenuItem>
        </MenuFullscreen>
      );
      act(() => {
        document.dispatchEvent(
          new KeyboardEvent("keyup", {
            key: "a",
            bubbles: true,
          })
        );
      });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("focus behaviour", () => {
    it("when menu is opened, its root container is focused", () => {
      jest.useFakeTimers();

      const wrapper = customMount(
        <MenuFullscreen isOpen={false} onClose={() => {}}>
          <MenuItem href="#">Item one</MenuItem>
        </MenuFullscreen>
      );

      wrapper.setProps({ isOpen: true });
      wrapper.update();
      act(() => {
        jest.runAllTimers();
      });

      expect(wrapper.find(StyledMenuFullscreen)).toBeFocused();
      jest.useRealTimers();
    });

    describe("when pressing tab key without shift", () => {
      it("does not prevent the browser default behaviour when no Search input with searchButton and no value is rendered", () => {
        const preventDefault = jest.fn();

        const wrapper = customMount(
          <MenuFullscreen isOpen onClose={() => {}}>
            <MenuItem href="#">Item one</MenuItem>
          </MenuFullscreen>
        );

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
      });

      it("prevents the browser default behaviour when Search input with searchButton and no value rendered", () => {
        const preventDefault = jest.fn();

        const wrapper = customMount(<MockMenuWithSearch isOpen focusInput />);

        expect(wrapper.find(StyledSearch).find("input")).toBeFocused();
        expect(wrapper.find(StyledSearchButton).exists()).toBe(true);
        wrapper.find(StyledMenuFullscreen).prop("onKeyDown")({
          key: "Tab",
          preventDefault,
        });
        expect(preventDefault).toHaveBeenCalled();
        expect(wrapper.find(StyledMenuItem).last().find("a")).toBeFocused();
      });
    });
  });

  it("when clicking outside a submenu, the app does not crash", () => {
    const wrapper = customMount(
      <MenuFullscreen isOpen onClose={() => {}}>
        <MenuItem onClick={() => {}} submenu="My submenu">
          <MenuItem href="#">Item One</MenuItem>
          <MenuItem href="#">Item Two</MenuItem>
        </MenuItem>
      </MenuFullscreen>
    );

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

  it("when clicking on a submenu with an onClick prop, the passed onClick callback is called", () => {
    const onClick = jest.fn();
    const wrapper = customMount(
      <MenuFullscreen isOpen onClose={() => {}}>
        <MenuItem onClick={onClick} submenu="My submenu">
          <MenuItem href="#">Item One</MenuItem>
          <MenuItem href="#">Item Two</MenuItem>
        </MenuItem>
      </MenuFullscreen>
    );
    const submenu = wrapper.find(MenuItem).at(0).find("button");

    submenu.simulate("click");

    expect(onClick).toBeCalledTimes(1);
  });

  it("should not render a divider when menu contains a falsy values", () => {
    const wrapper = customMount(
      <MenuFullscreen isOpen onClose={() => {}}>
        <MenuItem href="#">Product Item One</MenuItem>
        {false && <MenuItem href="#">Product Item Two</MenuItem>}
      </MenuFullscreen>
    );
    expect(wrapper.find(MenuDivider).exists()).toBeFalsy();
  });

  describe("keys of children", () => {
    it("should maintain the state of any child items if items are added or removed", () => {
      jest.useFakeTimers();

      const wrapper = customMount(<MockFullScreenMenuWithUpdatingItems />);

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

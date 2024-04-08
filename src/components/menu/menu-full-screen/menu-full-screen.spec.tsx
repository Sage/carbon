import React, { useState, useEffect } from "react";
import { mount as enzymeMount } from "enzyme";
import { act } from "react-dom/test-utils";
import { render as rtlRender, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MenuItem } from "..";
import MenuFullscreen, { MenuFullscreenProps } from ".";
import MenuDivider from "../menu-divider/menu-divider.component";
import MenuContext, { MenuContextProps, MenuType } from "../menu.context";
import StyledIcon from "../../icon/icon.style";
import {
  StyledMenuFullscreen,
  StyledMenuFullscreenHeader,
  StyledMenuModal,
} from "./menu-full-screen.style";
import StyledIconButton from "../../icon-button/icon-button.style";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";
import CarbonProvider from "../../carbon-provider";
import { baseTheme, sageTheme } from "../../../style/themes";
import { StyledMenuItem } from "../menu.style";
import menuConfigVariants from "../menu.config";
import { StyledSubmenu } from "../__internal__/submenu/submenu.style";
import StyledMenuItemWrapper from "../menu-item/menu-item.style";
import { StyledLink } from "../../link/link.style";

const AllTheProviders = ({
  children,
  menuType = "light",
}: {
  children: React.ReactNode;
  menuType?: MenuContextProps["menuType"];
}) => (
  <CarbonProvider validationRedesignOptIn theme={sageTheme}>
    <MenuContext.Provider
      value={{
        menuType,
        openSubmenuId: null,
        inMenu: true,
        setOpenSubmenuId: () => {},
      }}
    >
      {children}
    </MenuContext.Provider>
  </CarbonProvider>
);

const mount = (ui: React.ReactElement, menuType?: MenuType) => {
  return enzymeMount(
    <AllTheProviders menuType={menuType}>{ui}</AllTheProviders>
  );
};

const render = (ui: React.ReactElement, menuType?: MenuType) => {
  return rtlRender(<AllTheProviders menuType={menuType}>{ui}</AllTheProviders>);
};

const TestMenu = ({ isOpen }: Pick<MenuFullscreenProps, "isOpen">) => (
  <MenuFullscreen
    isOpen={isOpen}
    onClose={() => {}}
    data-element="bar"
    data-role="baz"
  >
    <MenuItem maxWidth="200px" href="#">
      Menu Item One
    </MenuItem>
    <MenuItem maxWidth="200px" onClick={() => {}} submenu="Menu Item Two">
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

const MockMenuWithFalsyValues = ({ isOpen }: { isOpen?: boolean }) => (
  <MenuFullscreen isOpen={isOpen} onClose={() => {}}>
    <MenuItem maxWidth="200px">Submenu Item One</MenuItem>
    {false && <MenuItem href="#">Product Item One</MenuItem>}
  </MenuFullscreen>
);

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
  afterEach(() => {
    // manually clean up DOM due to use of React portals
    window.document.body.innerHTML = "";
  });

  it("by default, menu's root container should not exist", () => {
    render(
      <MenuFullscreen onClose={() => {}}>
        <MenuItem href="#">Item one</MenuItem>
      </MenuFullscreen>
    );
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("has correct component, element and role data tags on root container when menu is open", () => {
    render(<TestMenu isOpen />);
    const menu = screen.getByRole("dialog");

    expect(menu).toHaveAttribute("data-component", "menu-fullscreen");
    expect(menu).toHaveAttribute("data-element", "bar");
    expect(menu).toHaveAttribute("data-role", "baz");
  });

  it("has correct ARIA properties on root container when menu is open", () => {
    render(<MenuFullscreen isOpen onClose={() => {}} aria-label="My menu" />);
    const menu = screen.getByRole("dialog");

    expect(menu).toHaveAttribute("role", "dialog");
    expect(menu).toHaveAttribute("aria-modal", "true");
  });

  it("should render children correctly", () => {
    const wrapper = mount(<TestMenu isOpen />);
    expect(wrapper.find(MenuItem).length).toEqual(10);
    expect(wrapper.find(MenuDivider).length).toEqual(5);
  });

  it("should set any maxWidth values passed to items to undefined", () => {
    const wrapper = mount(<TestMenu isOpen />);
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
        const wrapper = mount(<TestMenu isOpen />, menuType);
        assertStyleMatch(
          {
            position: "fixed",
            top: "0",
            bottom: "0",
            zIndex: `${baseTheme.zIndex.fullScreenModal}`,
          },
          wrapper.find(StyledMenuFullscreen)
        );

        [
          `&& ${StyledLink} > a`,
          `&& ${StyledLink} > button`,
          "&& > div",
        ].forEach((el) => {
          assertStyleMatch(
            {
              fontSize: "var(--fontSizes200)",
            },
            wrapper.find(StyledMenuModal),
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
        it("renders a correct item background", () => {
          const wrapper = mount(<TestMenu isOpen />, menuType);
          assertStyleMatch(
            {
              backgroundColor:
                menuConfigVariants[menuType].submenuItemBackground,
            },
            wrapper.find(StyledMenuFullscreenHeader)
          );
        });

        it("renders a correct icon color", () => {
          const wrapper = mount(<TestMenu isOpen />, menuType);
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

    describe("menu item padding", () => {
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
        (component) => component.find(StyledMenuItem),
        { modifier: `${StyledMenuItemWrapper}` }
      );
    });

    describe("submenu item padding", () => {
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
            <MenuItem submenu="foo">
              <MenuItem {...props} href="#">
                bar
              </MenuItem>
            </MenuItem>
          </MenuContext.Provider>
        ),
        undefined,
        (component) => component.find(StyledSubmenu).find(StyledMenuItem),
        { modifier: `${StyledMenuItemWrapper}` }
      );
    });
  });

  describe("onClose", () => {
    it("calls the onClose callback when close icon button is clicked", async () => {
      const onClose = jest.fn();
      const wrapper = mount(
        <MenuFullscreen isOpen onClose={onClose}>
          <MenuItem href="#">Item 1</MenuItem>
        </MenuFullscreen>
      );

      wrapper.find("button[aria-label='Close']").simulate("click");
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls the onClose callback when escape key pressed", async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(
        <MenuFullscreen isOpen onClose={onClose}>
          <MenuItem href="#">Item 1</MenuItem>
        </MenuFullscreen>
      );
      await user.keyboard("[Escape]");

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("does not call onClose callback when any other non-escape key is pressed", async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(
        <MenuFullscreen isOpen onClose={onClose}>
          <MenuItem href="#">Item 1</MenuItem>
        </MenuFullscreen>
      );
      await user.keyboard("[Enter]");

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("onClick", () => {
    it("calls the onClick callback when menu item is clicked", () => {
      const onClick = jest.fn();
      const wrapper = mount(
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem onClick={onClick}>Menu Item One</MenuItem>
        </MenuFullscreen>
      );
      const menuItem = wrapper.find(MenuItem).find("button");
      menuItem.simulate("click");
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe("focus behaviour", () => {
    it("focuses the root container, when menu is opened", () => {
      render(<TestMenu isOpen />);
      expect(screen.getByRole("dialog")).toBeFocused();
    });
  });

  describe("when clicking outside a submenu", () => {
    it("the app does not crash", () => {
      const wrapper = mount(<TestMenu isOpen />);

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
      const wrapper = mount(<MockMenuWithFalsyValues isOpen />);
      expect(wrapper.find(MenuDivider).exists()).toBe(false);
    });
  });

  describe("keys of children", () => {
    it("should maintain the state of any child items if items are added or removed", () => {
      jest.useFakeTimers();
      const wrapper = mount(<MockFullScreenMenuWithUpdatingItems />);

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

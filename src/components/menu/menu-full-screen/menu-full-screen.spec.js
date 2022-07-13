import React from "react";
import { mount } from "enzyme";

import { MenuItem } from "..";
import MenuFullscreen from ".";
import MenuDivider from "../menu-divider/menu-divider.component";
import MenuContext from "../menu.context";
import Icon from "../../icon";
import IconButton from "../../icon-button";
import {
  StyledMenuFullscreen,
  StyledMenuFullscreenHeader,
} from "./menu-full-screen.style";
import StyledIconButton from "../../icon-button/icon-button.style";
import {
  assertStyleMatch,
  simulate,
} from "../../../__spec_helper__/test-utils";
import { baseTheme } from "../../../style/themes";
import { StyledMenuItem } from "../menu.style";
import menuConfigVariants from "../menu.config";
import Submenu from "../__internal__/submenu/submenu.component";

const onClose = jest.fn();

// eslint-disable-next-line react/prop-types
const TestMenu = ({ startPosition, isOpen }) => (
  <MenuFullscreen
    startPosition={startPosition}
    isOpen={isOpen}
    onClose={onClose}
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

const render = ({ menuType = "light", ...props }) => {
  return mount(
    <MenuContext.Provider value={{ menuType }}>
      <TestMenu {...props} />
    </MenuContext.Provider>
  );
};

describe("MenuFullscreen", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render({});
  });

  it("should render with correct `data-component`", () => {
    expect(wrapper.find(StyledMenuFullscreen).prop("data-component")).toEqual(
      "menu-fullscreen"
    );
  });

  it("should render children correctly", () => {
    expect(wrapper.find(MenuItem).length).toEqual(10);
    expect(wrapper.find(MenuDivider).length).toEqual(5);
  });

  it("should set any maxWidth values passed to items to undefined", () => {
    const items = wrapper.find(StyledMenuItem);
    items.forEach((item) => {
      expect(item.prop("maxWidth")).toBeUndefined();
    });
  });

  describe("styling", () => {
    it.each(["light", "white", "dark", "black"])(
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
            paddingTop: "16px",
            paddingBottom: "16px",
          },
          wrapper.find(StyledMenuItem)
        );
      }
    );

    describe.each(["light", "white", "dark", "black"])(
      "applies the expected styling when `menuType` is %s",
      (menuType) => {
        beforeEach(() => {
          wrapper = render({ menuType });
        });

        it("it renders a correct item background", () => {
          assertStyleMatch(
            {
              backgroundColor:
                menuConfigVariants[menuType].submenuItemBackground,
            },
            wrapper.find(StyledMenuFullscreenHeader)
          );
        });

        it("it renders a correct icon color", () => {
          const iconColors = {
            light: undefined,
            dark: "#FFFFFF",
            white: undefined,
            black: "#FFFFFF",
          };

          expect(wrapper.find(Icon).prop("color")).toEqual(
            iconColors[menuType]
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

  describe("focus behaviour", () => {
    it("focuses the menu wrapper on open of menu", () => {
      wrapper = mount(<TestMenu />);
      wrapper.setProps({ isOpen: true });

      const element = wrapper.find(StyledMenuFullscreen).getDOMNode();
      const startEvent = new Event("transitionstart", {
        bubbles: true,
        cancellable: true,
      });
      const endEvent = new Event("transitionend", {
        bubbles: true,
        cancellable: true,
      });
      element.dispatchEvent(startEvent);
      element.dispatchEvent(endEvent);

      expect(wrapper.find(StyledMenuFullscreen)).toBeFocused();
    });
  });

  describe("when there is a scrollable submenu", () => {
    it("should render all of the underlying menu items", () => {
      wrapper = mount(
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem submenu="submenu" scrollable>
            <MenuItem>Apple</MenuItem>
            <MenuItem>Banana</MenuItem>
            <MenuItem>Carrot</MenuItem>
            <MenuItem>Broccoli</MenuItem>
          </MenuItem>
        </MenuFullscreen>
      );

      expect(wrapper.find(Submenu).find(MenuItem).length).toEqual(4);

      wrapper.unmount();
    });
  });
});

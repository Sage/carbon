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
import { StyledMenuItem, StyledMenuWrapper } from "../menu.style";

const onClose = jest.fn();

const render = ({ startPosition, isOpen, menuType = "light" }) => {
  return mount(
    <MenuContext.Provider value={{ menuType }}>
      <MenuFullscreen
        startPosition={startPosition}
        isOpen={isOpen}
        onClose={onClose}
      >
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem onClick={() => {}} submenu="Menu Item Two">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
        </MenuItem>
        <MenuItem href="#">Menu Item Three</MenuItem>
        <MenuItem href="#">Menu Item Four</MenuItem>
        <MenuItem submenu="Menu Item Five">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
        </MenuItem>
        <MenuItem href="#">Menu Item Six</MenuItem>
      </MenuFullscreen>
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

  describe("styling", () => {
    it("matches the expected as default", () => {
      assertStyleMatch(
        {
          position: "fixed",
          top: "0",
          bottom: "0",
          backgroundColor: baseTheme.menu.light.background,
          zIndex: `${baseTheme.zIndex.fullScreenModal}`,
          visibility: "hidden",
          left: "-100vw",
          transition: "all 0.3s ease",
        },
        wrapper
      );

      ["a", "button", "div"].forEach((el) => {
        assertStyleMatch(
          {
            fontSize: "16px",
          },
          wrapper,
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
    });

    it("applies the expected styling when `menuType` is 'dark'", () => {
      wrapper = render({ menuType: "dark" });
      assertStyleMatch(
        {
          backgroundColor: baseTheme.colors.slate,
        },
        wrapper
      );

      assertStyleMatch(
        {
          backgroundColor: baseTheme.menu.dark.submenuBackground,
        },
        wrapper.find(StyledMenuFullscreenHeader)
      );

      expect(wrapper.find(Icon).prop("color")).toEqual("#FFFFFF");
    });

    it("applies the expected styling when `isOpen` is true", () => {
      wrapper = render({ isOpen: true });
      assertStyleMatch(
        {
          visibility: "visible",
          left: "0",
          transition: "all 0.3s ease",
        },
        wrapper
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
        wrapper
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
    it("focuses the content container on open of menu", () => {
      wrapper = render({ isOpen: true });

      const element = wrapper.find(StyledMenuFullscreen).getDOMNode();
      const event = new Event("transitionend", {
        bubbles: true,
        cancellable: true,
      });
      element.dispatchEvent(event);

      expect(wrapper.find(StyledMenuWrapper)).toBeFocused();
    });
  });
});

import React, { useState, useEffect } from "react";
import { render, screen, within, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MenuItem } from "..";
import MenuFullscreen from ".";
import MenuContext from "../__internal__/menu.context";

import CarbonProvider from "../../carbon-provider";
import { sageTheme } from "../../../style/themes";

test("should not render the menu when `isOpen` is falsy", () => {
  render(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType: "light",
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <MenuFullscreen onClose={() => {}}>
          <MenuItem href="#">Item one</MenuItem>
        </MenuFullscreen>
      </MenuContext.Provider>
    </CarbonProvider>,
  );

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("should have the expected `data-` tags when menu is open", () => {
  render(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType: "light",
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <MenuFullscreen
          data-element="bar"
          data-role="baz"
          isOpen
          onClose={() => {}}
        />
      </MenuContext.Provider>
    </CarbonProvider>,
  );
  const menu = screen.getByRole("dialog");

  expect(menu).toHaveAttribute("data-component", "menu-fullscreen");
  expect(menu).toHaveAttribute("data-element", "bar");
  expect(menu).toHaveAttribute("data-role", "baz");
});

test("should have the expected ARIA properties when menu is open", () => {
  render(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType: "light",
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <MenuFullscreen isOpen onClose={() => {}} aria-label="My menu" />
      </MenuContext.Provider>
    </CarbonProvider>,
  );
  const menu = screen.getByRole("dialog");

  expect(menu).toHaveAttribute("aria-modal", "true");
});

test("should render the children with the expected divider elements added", () => {
  render(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType: "light",
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem maxWidth="200px" href="#">
            Menu Item One
          </MenuItem>
          <MenuItem
            maxWidth="200px"
            onClick={() => {}}
            submenu="Menu Item Two"
            href="#"
          >
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
          <MenuItem maxWidth="200px" submenu="Menu Item Five" href="#">
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
      </MenuContext.Provider>
    </CarbonProvider>,
  );

  expect(screen.getAllByRole("link")).toHaveLength(10);
  expect(screen.getAllByTestId("divider")).toHaveLength(5);
});

test("should set any `maxWidth` values passed to items to undefined", () => {
  render(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType: "light",
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem maxWidth="200px" href="#">
            Menu Item One
          </MenuItem>
          <MenuItem
            maxWidth="200px"
            onClick={() => {}}
            submenu="Menu Item Two"
            href="#"
          >
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
          <MenuItem maxWidth="200px" submenu="Menu Item Five" href="#">
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
      </MenuContext.Provider>
    </CarbonProvider>,
  );
  const items = screen.getAllByRole("listitem");

  items.forEach((item) => {
    expect(item).toHaveStyle({ maxWidth: "" });
  });
});

test("should apply the expected color to the close icon when `menuType` is 'light'", () => {
  render(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType: "light",
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem href="#">Item one</MenuItem>
        </MenuFullscreen>
      </MenuContext.Provider>
    </CarbonProvider>,
  );
  const closeButton = screen.getByRole("button", { name: "Close" });
  const closeButtonIcon = within(closeButton).getByTestId("icon");

  expect(closeButtonIcon).toHaveStyleRule("color", "var(--colorsYin090)");
});

test("should apply the expected color to the close icon when `menuType` is 'dark'", () => {
  render(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType: "dark",
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem href="#">Item one</MenuItem>
        </MenuFullscreen>
      </MenuContext.Provider>
    </CarbonProvider>,
  );
  const closeButton = screen.getByRole("button", { name: "Close" });
  const closeButtonIcon = within(closeButton).getByTestId("icon");

  expect(closeButtonIcon).toHaveStyleRule("color", "var(--colorsYang100)");
});

test("should apply the expected color to the close icon when `menuType` is 'white'", () => {
  render(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType: "white",
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem href="#">Item one</MenuItem>
        </MenuFullscreen>
      </MenuContext.Provider>
    </CarbonProvider>,
  );
  const closeButton = screen.getByRole("button", { name: "Close" });
  const closeButtonIcon = within(closeButton).getByTestId("icon");

  expect(closeButtonIcon).toHaveStyleRule("color", "var(--colorsYin090)");
});

test("should apply the expected color to the close icon when `menuType` is 'black'", () => {
  render(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType: "black",
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem href="#">Item one</MenuItem>
        </MenuFullscreen>
      </MenuContext.Provider>
    </CarbonProvider>,
  );
  const closeButton = screen.getByRole("button", { name: "Close" });
  const closeButtonIcon = within(closeButton).getByTestId("icon");

  expect(closeButtonIcon).toHaveStyleRule("color", "var(--colorsYang100)");
});

test("should call the passed `onClose` callback when the close button is clicked", async () => {
  const onClose = jest.fn();
  const user = userEvent.setup();
  render(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType: "light",
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <MenuFullscreen isOpen onClose={onClose}>
          <MenuItem href="#">Item 1</MenuItem>
        </MenuFullscreen>
      </MenuContext.Provider>
    </CarbonProvider>,
  );
  await user.click(screen.getByRole("button", { name: "Close" }));

  expect(onClose).toHaveBeenCalled();
});

test("should call the passed `onClose` callback when the 'Escape' key is pressed", async () => {
  const onClose = jest.fn();
  const user = userEvent.setup();
  render(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType: "black",
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <MenuFullscreen isOpen onClose={onClose}>
          <MenuItem href="#">Item 1</MenuItem>
        </MenuFullscreen>
      </MenuContext.Provider>
    </CarbonProvider>,
  );
  await user.keyboard("{Escape}");

  expect(onClose).toHaveBeenCalled();
});

test("should call the passed `onClick` callback when the menu item is clicked", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();
  render(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType: "black",
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem onClick={onClick} href="#">
            Item 1
          </MenuItem>
        </MenuFullscreen>
      </MenuContext.Provider>
    </CarbonProvider>,
  );
  await user.click(screen.getByRole("link"));

  expect(onClick).toHaveBeenCalled();
});

test("should call the passed `onClick` callback when the submenu item is clicked", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();
  render(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType: "black",
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem submenu="Submenu" onClick={onClick} href="#">
            <MenuItem href="#">Item 1</MenuItem>
          </MenuItem>
        </MenuFullscreen>
      </MenuContext.Provider>
    </CarbonProvider>,
  );
  await user.click(screen.getByRole("link", { name: "Submenu" }));

  expect(onClick).toHaveBeenCalled();
});

test("should focus the root container, when menu is opened", () => {
  render(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType: "black",
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem submenu="Submenu">
            <MenuItem href="#">Item 1</MenuItem>
          </MenuItem>
        </MenuFullscreen>
      </MenuContext.Provider>
    </CarbonProvider>,
  );

  expect(screen.getByRole("dialog")).toHaveFocus();
});

test("should not render a divider when menu contains a falsy values", () => {
  render(
    <CarbonProvider validationRedesignOptIn theme={sageTheme}>
      <MenuContext.Provider
        value={{
          menuType: "black",
          openSubmenuId: null,
          inMenu: true,
          setOpenSubmenuId: () => {},
        }}
      >
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem maxWidth="200px">Submenu Item One</MenuItem>
          {false && <MenuItem href="#">Product Item One</MenuItem>}
        </MenuFullscreen>
      </MenuContext.Provider>
    </CarbonProvider>,
  );

  expect(screen.queryByTestId("divider")).not.toBeInTheDocument();
});

test("should maintain the state of any child items if items are added or removed", () => {
  jest.useFakeTimers();
  const MockFullScreenMenuWithUpdatingItems = () => {
    const [extraItem, setExtraItem] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setExtraItem(true);
      }, 5000);
      return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        setCounter((prev) => (prev >= 2 ? prev : prev + 1));
      }, 2000);
      return () => clearInterval(interval);
    }, []);

    return (
      <CarbonProvider validationRedesignOptIn theme={sageTheme}>
        <MenuContext.Provider
          value={{
            menuType: "light",
            openSubmenuId: null,
            inMenu: true,
            setOpenSubmenuId: () => {},
          }}
        >
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
            <MenuItem submenu={`submenu 2 - count ${counter}`} href="#">
              <MenuItem>Item One </MenuItem>
              <MenuItem>Item Two </MenuItem>
            </MenuItem>
          </MenuFullscreen>
        </MenuContext.Provider>
      </CarbonProvider>
    );
  };

  render(<MockFullScreenMenuWithUpdatingItems />);

  act(() => {
    jest.advanceTimersByTime(5000);
  });
  const itemLink = screen.getByRole("link");

  expect(itemLink).toHaveTextContent("count 2");

  jest.useRealTimers();
});

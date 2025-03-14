import React from "react";
import { screen, within } from "@testing-library/react";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import ScrollableBlock from ".";
import MenuItem from "../menu-item";
import MenuContext from "../__internal__/menu.context";
import menuConfigVariants from "../menu.config";
import SubmenuContext from "../__internal__/submenu/submenu.context";
import Search from "../../search";

test("should have the correct styling when `menuType` is 'light' passed by MenuContext", () => {
  render(
    <MenuContext.Provider
      value={{
        menuType: "light",
        openSubmenuId: null,
        inMenu: true,
        setOpenSubmenuId: () => {},
      }}
    >
      <SubmenuContext.Provider
        value={{
          handleKeyDown: jest.fn(),
        }}
      >
        <ScrollableBlock data-role="scrollable-block" variant="default">
          <MenuItem href="#">Apple</MenuItem>
        </ScrollableBlock>
      </SubmenuContext.Provider>
    </MenuContext.Provider>,
  );

  expect(screen.getByTestId("scrollable-block")).toHaveStyle({
    backgroundColor: menuConfigVariants.light.submenuItemBackground,
  });
});

test("should have the correct styling when `menuType` is 'dark' passed by MenuContext", () => {
  render(
    <MenuContext.Provider
      value={{
        menuType: "dark",
        openSubmenuId: null,
        inMenu: true,
        setOpenSubmenuId: () => {},
      }}
    >
      <SubmenuContext.Provider
        value={{
          handleKeyDown: jest.fn(),
        }}
      >
        <ScrollableBlock data-role="scrollable-block" variant="default">
          <MenuItem href="#">Apple</MenuItem>
        </ScrollableBlock>
      </SubmenuContext.Provider>
    </MenuContext.Provider>,
  );

  expect(screen.getByTestId("scrollable-block")).toHaveStyle({
    backgroundColor: menuConfigVariants.dark.submenuItemBackground,
  });
});

test("should have the correct styling when `menuType` is 'white' passed by MenuContext", () => {
  render(
    <MenuContext.Provider
      value={{
        menuType: "white",
        openSubmenuId: null,
        inMenu: true,
        setOpenSubmenuId: () => {},
      }}
    >
      <SubmenuContext.Provider
        value={{
          handleKeyDown: jest.fn(),
        }}
      >
        <ScrollableBlock data-role="scrollable-block" variant="default">
          <MenuItem href="#">Apple</MenuItem>
          <MenuItem href="#">Broccoli</MenuItem>
        </ScrollableBlock>
      </SubmenuContext.Provider>
    </MenuContext.Provider>,
  );

  expect(screen.getByTestId("scrollable-block")).toHaveStyle({
    backgroundColor: menuConfigVariants.white.submenuItemBackground,
  });
});

test("should have the correct styling when `menuType` is 'black' passed by MenuContext", () => {
  render(
    <MenuContext.Provider
      value={{
        menuType: "black",
        openSubmenuId: null,
        inMenu: true,
        setOpenSubmenuId: () => {},
      }}
    >
      <SubmenuContext.Provider
        value={{
          handleKeyDown: jest.fn(),
        }}
      >
        <ScrollableBlock data-role="scrollable-block" variant="default">
          <MenuItem href="#">Apple</MenuItem>
        </ScrollableBlock>
      </SubmenuContext.Provider>
    </MenuContext.Provider>,
  );

  expect(screen.getByTestId("scrollable-block")).toHaveStyle({
    backgroundColor: menuConfigVariants.black.submenuItemBackground,
  });
});

test("should apply the expected styling on the last menu item when they have `href` set", () => {
  render(
    <MenuContext.Provider
      value={{
        menuType: "light",
        openSubmenuId: null,
        inMenu: true,
        setOpenSubmenuId: () => {},
      }}
    >
      <SubmenuContext.Provider
        value={{
          handleKeyDown: jest.fn(),
        }}
      >
        <ScrollableBlock data-role="scrollable-block" variant="default">
          <MenuItem href="#">Apple</MenuItem>
          <MenuItem href="#">Pear</MenuItem>
        </ScrollableBlock>
      </SubmenuContext.Provider>
    </MenuContext.Provider>,
  );
  const links = screen.getAllByRole("link");
  const firstLink = links.shift();
  const lastLink = links.pop();

  expect(firstLink).not.toHaveStyle({
    borderBottomLeftRadius: "var(--borderRadius100)",
    borderBottomRightRadius: "var(--borderRadius000)",
  });
  expect(lastLink).toHaveStyle({
    borderBottomLeftRadius: "var(--borderRadius100)",
    borderBottomRightRadius: "var(--borderRadius000)",
  });
});

test("should apply the expected styling on the last menu item when they have `onClick` set", () => {
  render(
    <MenuContext.Provider
      value={{
        menuType: "light",
        openSubmenuId: null,
        inMenu: true,
        setOpenSubmenuId: () => {},
      }}
    >
      <SubmenuContext.Provider
        value={{
          handleKeyDown: jest.fn(),
        }}
      >
        <ScrollableBlock data-role="scrollable-block" variant="default">
          <MenuItem onClick={() => {}}>Apple</MenuItem>
          <MenuItem onClick={() => {}}>Pear</MenuItem>
        </ScrollableBlock>
      </SubmenuContext.Provider>
    </MenuContext.Provider>,
  );
  const buttons = screen.getAllByRole("button");
  const firstButton = buttons.shift();
  const lastButton = buttons.pop();

  expect(firstButton).not.toHaveStyle({
    borderBottomLeftRadius: "var(--borderRadius100)",
    borderBottomRightRadius: "var(--borderRadius000)",
  });
  expect(lastButton).toHaveStyle({
    borderBottomLeftRadius: "var(--borderRadius100)",
    borderBottomRightRadius: "var(--borderRadius000)",
  });
});

test("should apply the expected styling on the last menu item when it has `href` and others have `onClick`", () => {
  render(
    <MenuContext.Provider
      value={{
        menuType: "light",
        openSubmenuId: null,
        inMenu: true,
        setOpenSubmenuId: () => {},
      }}
    >
      <SubmenuContext.Provider
        value={{
          handleKeyDown: jest.fn(),
        }}
      >
        <ScrollableBlock data-role="scrollable-block" variant="default">
          <MenuItem onClick={() => {}}>Apple</MenuItem>
          <MenuItem href="#">Pear</MenuItem>
        </ScrollableBlock>
      </SubmenuContext.Provider>
    </MenuContext.Provider>,
  );
  const button = screen.getByRole("button");
  const link = screen.getByRole("link");

  expect(button).not.toHaveStyle({
    borderBottomLeftRadius: "var(--borderRadius100)",
    borderBottomRightRadius: "var(--borderRadius000)",
  });
  expect(link).toHaveStyle({
    borderBottomLeftRadius: "var(--borderRadius100)",
    borderBottomRightRadius: "var(--borderRadius000)",
  });
});

test("should apply the expected styling on the last menu item when it has `onClick` and others have `href`", () => {
  render(
    <MenuContext.Provider
      value={{
        menuType: "light",
        openSubmenuId: null,
        inMenu: true,
        setOpenSubmenuId: () => {},
      }}
    >
      <SubmenuContext.Provider
        value={{
          handleKeyDown: jest.fn(),
        }}
      >
        <ScrollableBlock data-role="scrollable-block" variant="default">
          <MenuItem href="#">Apple</MenuItem>
          <MenuItem onClick={() => {}}>Pear</MenuItem>
        </ScrollableBlock>
      </SubmenuContext.Provider>
    </MenuContext.Provider>,
  );
  const link = screen.getByRole("link");
  const button = screen.getByRole("button");

  expect(link).not.toHaveStyle({
    borderBottomLeftRadius: "var(--borderRadius100)",
    borderBottomRightRadius: "var(--borderRadius000)",
  });
  expect(button).toHaveStyle({
    borderBottomLeftRadius: "var(--borderRadius100)",
    borderBottomRightRadius: "var(--borderRadius000)",
  });
});

test("should render the `parent` item, wrapped in a MenuItem", () => {
  render(
    <MenuContext.Provider
      value={{
        menuType: "light",
        openSubmenuId: null,
        inMenu: true,
        setOpenSubmenuId: () => {},
      }}
    >
      <SubmenuContext.Provider
        value={{
          handleKeyDown: jest.fn(),
        }}
      >
        <ScrollableBlock
          data-role="scrollable-block"
          variant="default"
          parent={<Search value="search" onChange={() => {}} />}
        >
          <MenuItem href="#">Apple</MenuItem>
          <MenuItem onClick={() => {}}>Pear</MenuItem>
        </ScrollableBlock>
      </SubmenuContext.Provider>
    </MenuContext.Provider>,
  );
  const firstMenuItem = screen.getByTestId("scrollable-block-parent-menu-item");

  expect(within(firstMenuItem).getByDisplayValue("search")).toBeVisible();
});

test("should render the parent menu-item with the correct styling when `variant` is not defined", () => {
  render(
    <MenuContext.Provider
      value={{
        menuType: "light",
        openSubmenuId: null,
        inMenu: true,
        setOpenSubmenuId: () => {},
      }}
    >
      <SubmenuContext.Provider
        value={{
          handleKeyDown: jest.fn(),
        }}
      >
        <ScrollableBlock
          data-role="scrollable-block"
          parent={<Search value="search" onChange={() => {}} />}
        >
          <MenuItem href="#">Apple</MenuItem>
          <MenuItem onClick={() => {}}>Pear</MenuItem>
        </ScrollableBlock>
      </SubmenuContext.Provider>
    </MenuContext.Provider>,
  );
  const parentMenuItem = screen.getByTestId(
    "scrollable-block-parent-menu-item",
  );

  expect(parentMenuItem).toHaveStyle({
    backgroundColor: menuConfigVariants.light.submenuItemBackground,
  });
});

test("should render the parent menu-item with the correct styling when `variant` is 'default'", () => {
  render(
    <MenuContext.Provider
      value={{
        menuType: "light",
        openSubmenuId: null,
        inMenu: true,
        setOpenSubmenuId: () => {},
      }}
    >
      <SubmenuContext.Provider
        value={{
          handleKeyDown: jest.fn(),
        }}
      >
        <ScrollableBlock
          data-role="scrollable-block"
          variant="default"
          parent={<Search value="search" onChange={() => {}} />}
        >
          <MenuItem href="#">Apple</MenuItem>
          <MenuItem onClick={() => {}}>Pear</MenuItem>
        </ScrollableBlock>
      </SubmenuContext.Provider>
    </MenuContext.Provider>,
  );
  const parentMenuItem = screen.getByTestId(
    "scrollable-block-parent-menu-item",
  );

  expect(parentMenuItem).toHaveStyle({
    backgroundColor: menuConfigVariants.light.submenuItemBackground,
  });
});

test("should render the parent menu-item with the correct styling when `variant` is 'alternate'", () => {
  render(
    <MenuContext.Provider
      value={{
        menuType: "light",
        openSubmenuId: null,
        inMenu: true,
        setOpenSubmenuId: () => {},
      }}
    >
      <SubmenuContext.Provider
        value={{
          handleKeyDown: jest.fn(),
        }}
      >
        <ScrollableBlock
          data-role="scrollable-block"
          variant="alternate"
          parent={<Search value="search" onChange={() => {}} />}
        >
          <MenuItem href="#">Apple</MenuItem>
          <MenuItem onClick={() => {}}>Pear</MenuItem>
        </ScrollableBlock>
      </SubmenuContext.Provider>
    </MenuContext.Provider>,
  );
  const parentMenuItem = screen.getByTestId(
    "scrollable-block-parent-menu-item",
  );

  expect(parentMenuItem).toHaveStyle({
    backgroundColor: menuConfigVariants.light.alternate,
  });
});

test("should apply the `data-` tag props as attributes on the expected element", () => {
  render(
    <MenuContext.Provider
      value={{
        menuType: "light",
        openSubmenuId: null,
        inMenu: true,
        setOpenSubmenuId: () => {},
      }}
    >
      <SubmenuContext.Provider
        value={{
          handleKeyDown: jest.fn(),
        }}
      >
        <ScrollableBlock
          data-role="scrollable-block"
          variant="default"
          data-element="foo"
        >
          <MenuItem href="#">Apple</MenuItem>
          <MenuItem href="#">Pear</MenuItem>
        </ScrollableBlock>
      </SubmenuContext.Provider>
    </MenuContext.Provider>,
  );
  const scrollableBlock = screen.getByTestId("scrollable-block");

  expect(scrollableBlock).toHaveAttribute(
    "data-component",
    "submenu-scrollable-block",
  );
  expect(scrollableBlock).toHaveAttribute("data-element", "foo");
  expect(scrollableBlock).toHaveAttribute("data-role", "scrollable-block");
});

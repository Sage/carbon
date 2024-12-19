import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FixedNavigationBarContext from "components/navigation-bar/__internal__/fixed-navigation-bar.context";
import { Menu, MenuItem, MenuSegmentTitle } from "../..";
import MenuContext, { MenuContextProps } from "../menu.context";
import Submenu from "./submenu.component";
import ScrollableBlock from "../../scrollable-block";

const menuContextValues: MenuContextProps = {
  menuType: "light",
  setOpenSubmenuId: () => {},
  openSubmenuId: null,
  inMenu: true,
};

test("should render the last menu item with the correct styles", async () => {
  const user = userEvent.setup();
  render(
    <Menu menuType="black">
      <MenuItem submenu="Menu Item" clickToOpen>
        <MenuItem href="#" minWidth="200px">
          Submenu
        </MenuItem>
        <MenuSegmentTitle text="segment title 1" variant="alternate">
          <MenuItem href="#" variant="alternate">
            Menu Item 1
          </MenuItem>
        </MenuSegmentTitle>
        <MenuSegmentTitle text="segment title 2" variant="alternate">
          <MenuItem href="#" variant="alternate">
            Menu Item 2
          </MenuItem>
          <MenuItem href="#" variant="alternate">
            Menu Item 3
          </MenuItem>
        </MenuSegmentTitle>
        <MenuItem href="#">Menu Item 4</MenuItem>
      </MenuItem>
    </Menu>,
  );

  const menuItem = screen.getByRole("button", { name: "Menu Item" });
  await user.click(menuItem);
  const menuItemFour = screen.getByRole("link", { name: "Menu Item 4" });
  await user.click(menuItemFour);

  expect(menuItemFour).toHaveStyle({
    borderBottomRightRadius: "var(--borderRadius100)",
    borderBottomLeftRadius: "var(--borderRadius100)",
  });
});

test("should render the scrollable block with the correct styles on its last menu item", async () => {
  const user = userEvent.setup();
  render(
    <Menu menuType="black">
      <MenuItem onClick={() => {}}>Menu Item One</MenuItem>
      <MenuItem href="#">Menu Item Two</MenuItem>
      <MenuItem submenu="Menu Item Three">
        <ScrollableBlock height="200px">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuItem href="#">Item Submenu Three</MenuItem>
          <MenuItem href="#">Item Submenu Four</MenuItem>
          <MenuItem href="#">Item Submenu Five</MenuItem>
          <MenuItem href="#">Item Submenu Six</MenuItem>
          <MenuItem href="#">Item Submenu Seven</MenuItem>
          <MenuItem href="#">Item Submenu Eight</MenuItem>
          <MenuItem href="#">Item Submenu Nine</MenuItem>
          <MenuItem href="#">Item Submenu Ten</MenuItem>
          <MenuItem href="#">Item Submenu Eleven</MenuItem>
          <MenuItem href="#">Item Submenu Twelve</MenuItem>
        </ScrollableBlock>
      </MenuItem>
    </Menu>,
  );

  const menuItem = screen.getByRole("button", { name: "Menu Item Three" });
  await user.click(menuItem);
  const itemSubmenuTwelve = screen.getByRole("link", {
    name: "Item Submenu Twelve",
  });
  await user.click(itemSubmenuTwelve);

  expect(itemSubmenuTwelve).toHaveStyle({
    borderBottomRightRadius: "var(--borderRadius000)",
    borderBottomLeftRadius: "var(--borderRadius100)",
  });
});

test("should render the scrollable block with the correct styles on the last menu item outside the block", async () => {
  const user = userEvent.setup();
  render(
    <Menu menuType="black">
      <MenuItem onClick={() => {}}>Menu Item One</MenuItem>
      <MenuItem href="#">Menu Item Two</MenuItem>
      <MenuItem submenu="Menu Item Three">
        <ScrollableBlock height="200px">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuItem href="#">Item Submenu Three</MenuItem>
          <MenuItem href="#">Item Submenu Four</MenuItem>
          <MenuItem href="#">Item Submenu Five</MenuItem>
          <MenuItem href="#">Item Submenu Six</MenuItem>
          <MenuItem href="#">Item Submenu Seven</MenuItem>
          <MenuItem href="#">Item Submenu Eight</MenuItem>
          <MenuItem href="#">Item Submenu Nine</MenuItem>
          <MenuItem href="#">Item Submenu Ten</MenuItem>
          <MenuItem href="#">Item Submenu Eleven</MenuItem>
          <MenuItem href="#">Item Submenu Twelve</MenuItem>
        </ScrollableBlock>
        <MenuItem href="#">Menu Item Last</MenuItem>
      </MenuItem>
    </Menu>,
  );

  const menuItem = screen.getByRole("button", { name: "Menu Item Three" });
  await user.click(menuItem);
  const itemSubmenuTwelve = screen.getByRole("link", {
    name: "Item Submenu Twelve",
  });
  const menuItemLast = screen.getByRole("link", { name: "Menu Item Last" });
  await user.click(itemSubmenuTwelve);

  expect(itemSubmenuTwelve).toHaveStyle({
    borderBottomRightRadius: "var(--borderRadius000)",
    borderBottomLeftRadius: "var(--borderRadius000)",
  });
  await user.click(menuItemLast);
  expect(menuItemLast).toHaveStyle({
    borderBottomRightRadius: "var(--borderRadius100)",
    borderBottomLeftRadius: "var(--borderRadius100)",
  });
});

test("should not render submenu when closed", () => {
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem>Apple</MenuItem>
        <MenuItem>Banana</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );

  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
});

test("should render submenu when user hovers over on parent menu item", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title" variant="alternate">
        <MenuItem>Apple</MenuItem>
        <MenuItem>Banana</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.hover(menuItem);
  const submenu = screen.getByRole("list");

  expect(submenu).toBeVisible();
});

test("should remove submenu element from the document when it's closed by the user moving the mouse away", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem>Apple</MenuItem>
        <MenuItem>Banana</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.hover(menuItem);
  const submenu = screen.getByRole("list");
  await user.unhover(submenu);

  expect(submenu).not.toBeInTheDocument();
});

test("should render submenu when parent item is clicked", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem>Apple</MenuItem>
        <MenuItem>Banana</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);
  const submenu = screen.getByRole("list");

  expect(submenu).toBeVisible();
});

test("should not display submenu when user hovers over parent menu item and `clickToOpen` is set", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title" clickToOpen>
        <MenuItem>Apple</MenuItem>
        <MenuItem>Banana</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.hover(menuItem);
  const submenu = screen.queryByRole("list");

  expect(submenu).not.toBeInTheDocument();
});

test("should call the `onSubmenuOpen` callback when the submenu opens and prop has a value", async () => {
  const user = userEvent.setup();
  const mockCallback = jest.fn();
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title" onSubmenuOpen={mockCallback}>
        <MenuItem>Apple</MenuItem>
        <MenuItem>Banana</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);

  expect(mockCallback).toHaveBeenCalled();
});

test("should call the `onSubmenuClose` callback when the submenu closes and prop has a value", async () => {
  const user = userEvent.setup();
  const mockCallback = jest.fn();
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title" onSubmenuClose={mockCallback}>
        <MenuItem>Apple</MenuItem>
        <MenuItem>Banana</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);
  await user.click(document.body);

  expect(mockCallback).toHaveBeenCalled();
});

test("should render submenu with the correct styles when `submenuDirection` is set to `left`", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title" submenuDirection="left">
        <MenuItem>Apple</MenuItem>
        <MenuItem>Banana</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);
  const submenu = screen.getByRole("list");

  expect(submenu).toHaveStyle({
    right: "0px",
  });
});

test("should render submenu with the correct styles when `submenuDirection` is set to `right`", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title" submenuDirection="right">
        <MenuItem>Apple</MenuItem>
        <MenuItem>Banana</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);
  const submenu = screen.getByRole("list");

  expect(submenu).not.toHaveStyle({
    right: "0px",
  });
});

test("should close submenu when the user clicks outside of the component boundary", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem>Apple</MenuItem>
        <MenuItem>Banana</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);
  const submenu = screen.getByRole("list");
  await user.click(document.body);

  expect(submenu).not.toBeInTheDocument();
});

test("should support focusing elements via the user typing a search string", async () => {
  jest.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
        <MenuItem href="#">Cherry</MenuItem>
        <MenuItem href="#">Orange</MenuItem>
        <MenuItem href="#">Strawberry</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);
  await user.keyboard("ch");

  act(() => {
    jest.runAllTimers();
  });

  expect(screen.getByRole("link", { name: "Cherry" })).toHaveFocus();

  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("resets search string after 1.5s and focuses the correct item on next character key press", async () => {
  jest.useFakeTimers();

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
        <MenuItem href="#">Cherry</MenuItem>
        <MenuItem href="#">Orange</MenuItem>
        <MenuItem href="#">Strawberry</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);
  await user.keyboard("b");

  act(() => {
    jest.advanceTimersByTime(1500);
  });

  await user.keyboard("o");

  act(() => {
    jest.runAllTimers();
  });

  expect(screen.getByRole("link", { name: "Orange" })).toHaveFocus();

  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("should focus the first item that matches when the search string matches multiple items", async () => {
  jest.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Mango</MenuItem>
        <MenuItem href="#">Cherry</MenuItem>
        <MenuItem href="#">Melon</MenuItem>
        <MenuItem href="#">Strawberry</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);
  await user.keyboard("m");
  const focusedItem = screen.getByRole("link", { name: "Mango" });

  act(() => {
    jest.runAllTimers();
  });

  expect(focusedItem).toHaveFocus();
  await user.keyboard("m");

  act(() => {
    jest.runAllTimers();
  });

  expect(focusedItem).toHaveFocus();

  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("should not focus a menu item when the search string does not match any items", async () => {
  jest.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
        <MenuItem href="#">Cherry</MenuItem>
        <MenuItem href="#">Orange</MenuItem>
        <MenuItem href="#">Strawberry</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);
  const items = screen.getAllByRole("link");
  await user.keyboard("x");

  act(() => {
    jest.runAllTimers();
  });

  items.forEach((item) => expect(item).not.toHaveFocus());

  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("should render submenu with role list when a ScrollableBlock with a `parent` is passed with `children`", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
        <ScrollableBlock parent={<>Parent</>}>
          <MenuItem href="#">Carrot</MenuItem>
          <MenuItem href="#">Broccoli</MenuItem>
        </ScrollableBlock>
        <MenuItem href="#">Mango</MenuItem>
        <MenuItem href="#">Melon</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);
  // there are two lists in the document as scrollable block adds one as well
  const submenu = screen.getAllByRole("list")[0];

  expect(submenu).toBeVisible();
});

// tested in playwright but we need to test here for coverage
test("should render the menu with a max-height set when the `maxHeight` prop is passed a valid CSS string", async () => {
  const user = userEvent.setup();
  render(
    <FixedNavigationBarContext.Provider value={{ submenuMaxHeight: "80px" }}>
      <MenuContext.Provider value={menuContextValues}>
        <Submenu title="title">
          <MenuItem href="#">Item 1</MenuItem>
          <MenuItem href="#">Item 2</MenuItem>
          <MenuItem href="#">Item 3</MenuItem>
          <MenuItem href="#">Item 4</MenuItem>
          <MenuItem href="#">Item 5</MenuItem>
          <MenuItem href="#">Item 6</MenuItem>
          <MenuItem href="#">Item 7</MenuItem>
          <MenuItem href="#">Item 8</MenuItem>
          <MenuItem href="#">Item 9</MenuItem>
          <MenuItem href="#">Item 10</MenuItem>
        </Submenu>
      </MenuContext.Provider>
    </FixedNavigationBarContext.Provider>,
  );
  const parentMenuItem = screen.getByRole("button", { name: "title" });
  await user.click(parentMenuItem);
  const submenu = screen.getByRole("list");

  expect(submenu).toHaveStyle({
    maxHeight: "80px",
  });
});

test("should override submenu children's `maxWidth` if `submenuMaxWidth` is set", async () => {
  const user = userEvent.setup();
  render(
    <MenuContext.Provider value={menuContextValues}>
      <Submenu title="title" submenuMaxWidth="300px">
        <MenuItem maxWidth="400px">Apple</MenuItem>
        <MenuItem minWidth="400px">Banana</MenuItem>
      </Submenu>
    </MenuContext.Provider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.hover(menuItem);
  const submenu = screen.getByRole("list");
  const submenuChildren = screen.getAllByRole("listitem");

  expect(submenu).toHaveStyle({ maxWidth: "300px" });
  expect(submenuChildren[0]).toHaveStyle({ maxWidth: "300px" });
  expect(submenuChildren[1]).toHaveStyle({ maxWidth: "300px" });
});

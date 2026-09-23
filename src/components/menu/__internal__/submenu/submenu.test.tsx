import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FixedNavigationBarContext from "../../../navigation-bar/__internal__/fixed-navigation-bar.context";
import { Menu, MenuItem, MenuSegmentTitle } from "../..";
import {
  StrictMenuContextType,
  StrictMenuProvider,
} from "../strict-menu.context";
import Submenu from "./submenu.component";
import ScrollableBlock from "../../scrollable-block";

const menuContextValues: StrictMenuContextType = {
  variant: "white",
  setOpenSubmenuId: () => {},
  openSubmenuId: null,
};

test("should render trigger item as link when `href` is passed", () => {
  render(
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title" href="#">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
  );

  expect(screen.getByRole("link", { name: "title" })).toBeVisible();
});

test("should render trigger item as button when `href` is not passed", () => {
  render(
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
  );

  expect(screen.getByRole("button", { name: "title" })).toBeVisible();
});

test("should render trigger item as button when `onClick` is passed", () => {
  render(
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
  );

  expect(screen.getByRole("button", { name: "title" })).toBeVisible();
});

test("should render trigger item as button when `onClick` is passed and is in fullScreen menu", () => {
  render(
    <StrictMenuProvider
      value={{ ...menuContextValues, inFullscreenView: true }}
    >
      <Submenu title="title" onClick={() => {}}>
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
  );

  expect(screen.getByRole("button", { name: "title" })).toBeVisible();
});

test("should not render submenu when closed", () => {
  render(
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
  );

  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
});

test("should render submenu when user hovers over on parent menu item", async () => {
  const user = userEvent.setup();
  render(
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title" variant="alternate">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.hover(menuItem);
  const submenu = screen.getByRole("list");

  expect(submenu).toBeVisible();
});

test("should remove submenu element from the document when it's closed by the user moving the mouse away", async () => {
  const user = userEvent.setup();
  render(
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
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
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);
  const submenu = screen.getByRole("list");

  expect(submenu).toBeVisible();
});

test("should not display submenu when user hovers over parent menu item and `clickToOpen` is set", async () => {
  const user = userEvent.setup();
  render(
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title" clickToOpen>
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
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
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title" onSubmenuOpen={mockCallback}>
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);

  expect(mockCallback).toHaveBeenCalled();
});

test("should call the `onSubmenuClose` callback when the submenu closes and prop has a value", async () => {
  const user = userEvent.setup();
  const mockCallback = jest.fn();
  render(
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title" onSubmenuClose={mockCallback}>
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);
  await user.click(document.body);

  expect(mockCallback).toHaveBeenCalled();
});

test("should render submenu with the correct styles when `submenuDirection` is set to `left`", async () => {
  const user = userEvent.setup();
  render(
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title" submenuDirection="left">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
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
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title" submenuDirection="right">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
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
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
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
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
        <MenuItem href="#">Cherry</MenuItem>
        <MenuItem href="#">Orange</MenuItem>
        <MenuItem href="#">Strawberry</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
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
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
        <MenuItem href="#">Cherry</MenuItem>
        <MenuItem href="#">Orange</MenuItem>
        <MenuItem href="#">Strawberry</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
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
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Mango</MenuItem>
        <MenuItem href="#">Cherry</MenuItem>
        <MenuItem href="#">Melon</MenuItem>
        <MenuItem href="#">Strawberry</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
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
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
        <MenuItem href="#">Cherry</MenuItem>
        <MenuItem href="#">Orange</MenuItem>
        <MenuItem href="#">Strawberry</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
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

test("should render submenu with role presentation when a ScrollableBlock is the only child in a submenu", async () => {
  const user = userEvent.setup();
  render(
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title">
        <ScrollableBlock>
          <MenuItem href="#">Carrot</MenuItem>
          <MenuItem href="#">Broccoli</MenuItem>
        </ScrollableBlock>
      </Submenu>
    </StrictMenuProvider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);
  const submenu = screen.getByTestId("submenu");

  expect(submenu).toHaveRole("presentation");
});

test("should render submenu with role list when a ScrollableBlock and other children items are passed", async () => {
  const user = userEvent.setup();
  render(
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
        <ScrollableBlock>
          <MenuItem href="#">Carrot</MenuItem>
          <MenuItem href="#">Broccoli</MenuItem>
        </ScrollableBlock>
        <MenuItem href="#">Mango</MenuItem>
        <MenuItem href="#">Melon</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);
  const submenu = screen.getByTestId("submenu");

  expect(submenu).toHaveRole("list");
});

test("should render submenu with role list when a ScrollableBlock with a `parent` is passed with `children`", async () => {
  const user = userEvent.setup();
  render(
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title">
        <ScrollableBlock parent={<>Parent</>}>
          <MenuItem href="#">Carrot</MenuItem>
          <MenuItem href="#">Broccoli</MenuItem>
        </ScrollableBlock>
      </Submenu>
    </StrictMenuProvider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.click(menuItem);
  const submenu = screen.getByTestId("submenu");

  expect(submenu).toHaveRole("list");
});

// tested in playwright but we need to test here for coverage
test("should render the menu with a max-height set when the `maxHeight` prop is passed a valid CSS string", async () => {
  const user = userEvent.setup();
  render(
    <FixedNavigationBarContext.Provider value={{ submenuMaxHeight: "80px" }}>
      <StrictMenuProvider value={menuContextValues}>
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
      </StrictMenuProvider>
    </FixedNavigationBarContext.Provider>,
  );
  const parentMenuItem = screen.getByRole("button", { name: "title" });
  await user.click(parentMenuItem);
  const submenu = screen.getByRole("list");

  expect(submenu).toHaveStyle({
    maxHeight: "80px",
  });
});

test("sets max width for submenu when `submenuMaxWidth` is set", async () => {
  const user = userEvent.setup();
  render(
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="title" submenuMaxWidth="300px">
        <MenuItem maxWidth="400px" href="#">
          Apple
        </MenuItem>
        <MenuItem minWidth="400px" href="#">
          Banana
        </MenuItem>
      </Submenu>
    </StrictMenuProvider>,
  );
  const menuItem = screen.getByRole("button", { name: "title" });
  await user.hover(menuItem);
  const submenu = screen.getByRole("list");

  expect(submenu).toHaveStyle({ maxWidth: "300px" });
});

test("sets minimum width for submenu when `submenuMinWidth` is set", async () => {
  const user = userEvent.setup();
  render(
    <StrictMenuProvider value={menuContextValues}>
      <Submenu title="Fruits" submenuMinWidth="300px">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Banana</MenuItem>
      </Submenu>
    </StrictMenuProvider>,
  );
  const menuItem = screen.getByRole("button", { name: "Fruits" });
  await user.hover(menuItem);
  const submenu = screen.getByRole("list");

  expect(submenu).toHaveStyle({ minWidth: "300px" });
});

test("allows MenuSegmentTitle to wrap when `submenuMaxWidth` is set", async () => {
  const user = userEvent.setup();
  render(
    <Menu>
      <MenuItem submenu="Submenu" submenuMaxWidth="200px">
        <MenuSegmentTitle text="Segment Title">
          <MenuItem href="#">Menu Item</MenuItem>
        </MenuSegmentTitle>
      </MenuItem>
    </Menu>,
  );
  const menuItem = screen.getByRole("button", { name: "Submenu" });
  await user.hover(menuItem);

  expect(
    screen.getByRole("heading", { level: 2, name: "Segment Title" }),
  ).toHaveStyle({ whiteSpace: "normal" });
});

import React from "react";
import { render, screen, within } from "@testing-library/react";

import ScrollableBlock from ".";

import Logger from "../../../__internal__/utils/logger";
import Menu from "../menu.component";
import MenuItem from "../menu-item";
import menuConfigVariants from "../menu.config";
import Search from "../../search";

test("logs error if not used within Menu", () => {
  const loggerErrorSpy = jest
    .spyOn(Logger, "error")
    .mockImplementation(() => {});

  render(
    <ScrollableBlock data-role="scrollable-block" variant="default">
      <MenuItem href="#">Apple</MenuItem>
    </ScrollableBlock>,
  );

  expect(loggerErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining(
      "Carbon Menu: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
    ),
  );

  loggerErrorSpy.mockRestore();
});

test("should have the correct styling when `menuType` is 'light' passed by MenuContext", () => {
  render(
    <Menu menuType="light">
      <ScrollableBlock data-role="scrollable-block" variant="default">
        <MenuItem href="#">Apple</MenuItem>
      </ScrollableBlock>
    </Menu>,
  );

  expect(screen.getByTestId("scrollable-block")).toHaveStyle({
    backgroundColor: menuConfigVariants.light.submenuItemBackground,
  });
});

test("should have the correct styling when `menuType` is 'dark' passed by MenuContext", () => {
  render(
    <Menu menuType="dark">
      <ScrollableBlock data-role="scrollable-block" variant="default">
        <MenuItem href="#">Apple</MenuItem>
      </ScrollableBlock>
    </Menu>,
  );

  expect(screen.getByTestId("scrollable-block")).toHaveStyle({
    backgroundColor: menuConfigVariants.dark.submenuItemBackground,
  });
});

test("should have the correct styling when `menuType` is 'white' passed by MenuContext", () => {
  render(
    <Menu menuType="white">
      <ScrollableBlock data-role="scrollable-block" variant="default">
        <MenuItem href="#">Apple</MenuItem>
      </ScrollableBlock>
    </Menu>,
  );

  expect(screen.getByTestId("scrollable-block")).toHaveStyle({
    backgroundColor: menuConfigVariants.white.submenuItemBackground,
  });
});

test("should have the correct styling when `menuType` is 'black' passed by MenuContext", () => {
  render(
    <Menu menuType="black">
      <ScrollableBlock data-role="scrollable-block" variant="default">
        <MenuItem href="#">Apple</MenuItem>
      </ScrollableBlock>
    </Menu>,
  );

  expect(screen.getByTestId("scrollable-block")).toHaveStyle({
    backgroundColor: menuConfigVariants.black.submenuItemBackground,
  });
});

test("should apply the expected styling on the last menu item when they have `href` set", () => {
  render(
    <Menu menuType="light">
      <ScrollableBlock data-role="scrollable-block" variant="default">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Pear</MenuItem>
      </ScrollableBlock>
    </Menu>,
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
    <Menu menuType="light">
      <ScrollableBlock data-role="scrollable-block" variant="default">
        <MenuItem onClick={() => {}}>Apple</MenuItem>
        <MenuItem onClick={() => {}}>Pear</MenuItem>
      </ScrollableBlock>
    </Menu>,
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
    <Menu menuType="light">
      <ScrollableBlock data-role="scrollable-block" variant="default">
        <MenuItem onClick={() => {}}>Apple</MenuItem>
        <MenuItem href="#">Pear</MenuItem>
      </ScrollableBlock>
    </Menu>,
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
    <Menu menuType="light">
      <ScrollableBlock data-role="scrollable-block" variant="default">
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem onClick={() => {}}>Pear</MenuItem>
      </ScrollableBlock>
    </Menu>,
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
    <Menu menuType="light">
      <ScrollableBlock
        data-role="scrollable-block"
        variant="default"
        parent={<Search value="search" onChange={() => {}} />}
      >
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem onClick={() => {}}>Pear</MenuItem>
      </ScrollableBlock>
    </Menu>,
  );
  const firstMenuItem = screen.getByTestId("scrollable-block-parent-menu-item");

  expect(within(firstMenuItem).getByDisplayValue("search")).toBeVisible();
});

test("should render the parent menu-item with the correct styling when `variant` is not defined", () => {
  render(
    <Menu menuType="light">
      <ScrollableBlock
        data-role="scrollable-block"
        parent={<Search value="search" onChange={() => {}} />}
      >
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem onClick={() => {}}>Pear</MenuItem>
      </ScrollableBlock>
    </Menu>,
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
    <Menu menuType="light">
      <ScrollableBlock
        data-role="scrollable-block"
        variant="default"
        parent={<Search value="search" onChange={() => {}} />}
      >
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem onClick={() => {}}>Pear</MenuItem>
      </ScrollableBlock>
    </Menu>,
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
    <Menu menuType="light">
      <ScrollableBlock
        data-role="scrollable-block"
        variant="alternate"
        parent={<Search value="search" onChange={() => {}} />}
      >
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem onClick={() => {}}>Pear</MenuItem>
      </ScrollableBlock>
    </Menu>,
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
    <Menu menuType="light">
      <ScrollableBlock
        data-role="scrollable-block"
        variant="default"
        data-element="foo"
      >
        <MenuItem href="#">Apple</MenuItem>
        <MenuItem href="#">Pear</MenuItem>
      </ScrollableBlock>
    </Menu>,
  );
  const scrollableBlock = screen.getByTestId("scrollable-block");

  expect(scrollableBlock).toHaveAttribute(
    "data-component",
    "submenu-scrollable-block",
  );
  expect(scrollableBlock).toHaveAttribute("data-element", "foo");
  expect(scrollableBlock).toHaveAttribute("data-role", "scrollable-block");
});

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MenuDivider from "./menu-divider.component";

import MenuItem from "../menu-item/menu-item.component";
import menuConfigVariants from "../menu.config";
import Menu from "../menu.component";

test("throws an error if not used within Menu", () => {
  const consoleErrorSpy = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  expect(() => render(<MenuDivider data-role="divider" />)).toThrow(
    "Carbon Menu: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
  );

  consoleErrorSpy.mockRestore();
});

test("should apply the 'light' background-color passed as `menuType` via context", async () => {
  const user = userEvent.setup();
  const { divider: backgroundColor } = menuConfigVariants.light;
  render(
    <Menu menuType="light">
      <MenuItem submenu="Item One">
        <MenuDivider data-role="divider" />
      </MenuItem>
    </Menu>,
  );

  await user.click(screen.getByText("Item One"));

  expect(screen.getByTestId("divider")).toHaveStyle({
    backgroundColor,
  });
});

test("should apply the 'dark' background-color passed as `menuType` via context", async () => {
  const user = userEvent.setup();
  const { divider: backgroundColor } = menuConfigVariants.dark;
  render(
    <Menu menuType="dark">
      <MenuItem submenu="Item One">
        <MenuDivider data-role="divider" />
      </MenuItem>
    </Menu>,
  );

  await user.click(screen.getByText("Item One"));

  expect(screen.getByTestId("divider")).toHaveStyle({
    backgroundColor,
  });
});

test("should apply the 'white' background-color passed as `menuType` via context", async () => {
  const user = userEvent.setup();
  const { divider: backgroundColor } = menuConfigVariants.white;
  render(
    <Menu menuType="white">
      <MenuItem submenu="Item One">
        <MenuDivider data-role="divider" />
      </MenuItem>
    </Menu>,
  );

  await user.click(screen.getByText("Item One"));

  expect(screen.getByTestId("divider")).toHaveStyle({
    backgroundColor,
  });
});

test("should apply the 'black' background-color passed as `menuType` via context", async () => {
  const user = userEvent.setup();
  const { divider: backgroundColor } = menuConfigVariants.black;
  render(
    <Menu menuType="black">
      <MenuItem submenu="Item One">
        <MenuDivider data-role="divider" />
      </MenuItem>
    </Menu>,
  );

  await user.click(screen.getByText("Item One"));

  expect(screen.getByTestId("divider")).toHaveStyle({
    backgroundColor,
  });
});

test('should have correct styles for "default" size', () => {
  render(
    <Menu>
      <MenuDivider data-role="divider" />
    </Menu>,
  );

  expect(screen.getByTestId("divider")).toHaveStyle({
    margin: "0px 16px",
    height: "1px",
  });
});

test('should have correct styles for "large" size', () => {
  render(
    <Menu>
      <MenuDivider size="large" data-role="divider" />
    </Menu>,
  );

  expect(screen.getByTestId("divider")).toHaveStyle({
    height: "4px",
    margin: "0px",
  });
});

test("should have the expected 'data-' attributes", () => {
  render(
    <Menu>
      <MenuDivider data-role="divider" data-element="foo" />
    </Menu>,
  );

  expect(screen.getByTestId("divider")).toHaveAttribute(
    "data-component",
    "menu-divider",
  );
  expect(screen.getByTestId("divider")).toHaveAttribute("data-element", "foo");
  expect(screen.getByTestId("divider")).toHaveAttribute("data-role", "divider");
});

test("should have aria-hidden='true' on the list item", () => {
  render(
    <Menu>
      <MenuDivider data-role="divider" />
    </Menu>,
  );

  expect(screen.getByTestId("divider-container")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
});

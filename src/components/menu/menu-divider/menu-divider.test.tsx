import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import MenuDivider from "./menu-divider.component";
import MenuItem from "../menu-item/menu-item.component";
import MenuContext, { MenuType } from "../__internal__/menu.context";
import menuConfigVariants from "../menu.config";

const menuContextValues = (menuType: MenuType) => ({
  menuType,
  setOpenSubmenuId: () => null,
  openSubmenuId: null,
  inMenu: true,
});

test("should apply the 'light' background-color passed as `menuType` via context", async () => {
  const user = userEvent.setup();
  const { divider: backgroundColor } = menuConfigVariants.light;
  render(
    <MenuContext.Provider value={menuContextValues("light")}>
      <MenuItem submenu="Item One">
        <MenuDivider data-role="divider" />
      </MenuItem>
    </MenuContext.Provider>,
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
    <MenuContext.Provider value={menuContextValues("dark")}>
      <MenuItem submenu="Item One">
        <MenuDivider data-role="divider" />
      </MenuItem>
    </MenuContext.Provider>,
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
    <MenuContext.Provider value={menuContextValues("dark")}>
      <MenuItem submenu="Item One">
        <MenuDivider data-role="divider" />
      </MenuItem>
    </MenuContext.Provider>,
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
    <MenuContext.Provider value={menuContextValues("black")}>
      <MenuItem submenu="Item One">
        <MenuDivider data-role="divider" />
      </MenuItem>
    </MenuContext.Provider>,
  );

  await user.click(screen.getByText("Item One"));

  expect(screen.getByTestId("divider")).toHaveStyle({
    backgroundColor,
  });
});

test('should have correct styles for "default" size', () => {
  render(<MenuDivider data-role="divider" />);

  expect(screen.getByTestId("divider")).toHaveStyle({
    margin: "0px 16px",
    height: "1px",
  });
});

test('should have correct styles for "large" size', () => {
  render(<MenuDivider size="large" data-role="divider" />);

  expect(screen.getByTestId("divider")).toHaveStyle({
    height: "4px",
    margin: "0px",
  });
});

test("should have the expected 'data-' attributes", () => {
  render(<MenuDivider data-role="divider" data-element="foo" />);

  expect(screen.getByTestId("divider")).toHaveAttribute(
    "data-component",
    "menu-divider",
  );
  expect(screen.getByTestId("divider")).toHaveAttribute("data-element", "foo");
  expect(screen.getByTestId("divider")).toHaveAttribute("data-role", "divider");
});

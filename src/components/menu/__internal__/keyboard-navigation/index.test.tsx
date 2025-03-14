import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../../../__spec_helper__/__internal__/test-utils";

import { characterNavigation, menuKeyboardNavigation } from ".";
import MenuItem from "../../menu-item";
import Box from "../../../box";
import Logger from "../../../../__internal__/utils/logger";

// mock Logger.deprecate so that Typography (used for the alert dialog's heading) doesn't trigger a warning while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

const getMockEvent = (key: string, which?: number) => {
  return {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    key,
    which,
  } as unknown as React.KeyboardEvent;
};

const MockMenu = () => (
  <ul>
    <MenuItem href="#">Apple</MenuItem>
    <MenuItem data-role="banana" href="#">
      Banana
    </MenuItem>
    <li data-component="not-item">Not a menu item</li>
    <MenuItem href="#">Carrot</MenuItem>
    <MenuItem href="#">Broccoli</MenuItem>
    <MenuItem data-role="submenu" submenu="submenu">
      <MenuItem href="#">Sub item</MenuItem>
    </MenuItem>
    <MenuItem href="#">Parsnip</MenuItem>
    <MenuItem data-role="rhubarb-and-ginger" href="#">
      <span>Rhubarb</span> <Box>and</Box> Ginger
    </MenuItem>
    <li>Not a menu item</li>
  </ul>
);

beforeAll(() => loggerSpy.mockImplementation(() => {}));

afterAll(() => loggerSpy.mockRestore());

test("should not match any item and return undefined when user enters no search string (empty string is passed in)", () => {
  render(<MockMenu />);
  const focusableItems = screen.getAllByRole("listitem");
  const result = characterNavigation("", focusableItems);
  expect(result).toBeUndefined();
});

// E.g. none of the items start with this letter
test("should not match any item and return undefined when user enters a non-matching character", () => {
  render(<MockMenu />);
  const focusableItems = screen.getAllByRole("listitem");
  const result = characterNavigation("h", focusableItems);
  expect(result).toBeUndefined();
});

test("should return correct element when when user enters a matching character key", () => {
  render(<MockMenu />);
  const focusableItems = screen.getAllByRole("listitem");
  const result = characterNavigation("b", focusableItems);
  expect(result).toEqual(screen.getByTestId("banana"));
});

test("should return correct element when menu contains other nodes and user enters a matching key", () => {
  render(<MockMenu />);
  const focusableItems = screen.getAllByRole("listitem");
  const result = characterNavigation("r", focusableItems);
  expect(result).toEqual(screen.getByTestId("rhubarb-and-ginger"));
});

test("should return first matching element when there are multiple items starting with the same letter and user enters a mtching key", () => {
  render(<MockMenu />);
  const focusableItems = screen.getAllByRole("listitem");
  const result = characterNavigation("b", focusableItems);
  expect(result).toEqual(screen.getByTestId("banana"));
});

test("should return the correct submenu parent item when user enters a matching key", () => {
  render(<MockMenu />);
  const focusableItems = screen.getAllByRole("listitem");
  const result = characterNavigation("s", focusableItems);
  expect(result).toEqual(screen.getByTestId("submenu"));
});

test("should not match any item and return undefined when user enters an invalid navigation key", () => {
  render(<MockMenu />);
  const focusableItems = screen.getAllByRole("listitem");
  const result = menuKeyboardNavigation(getMockEvent("shift"), focusableItems);
  expect(result).toBeUndefined();
});

test("should return the index of the first item when user presses Home key", () => {
  render(<MockMenu />);
  const focusableItems = screen.getAllByRole("listitem");
  const result = menuKeyboardNavigation(
    getMockEvent("Home", 36),
    focusableItems,
  );
  expect(result).toEqual(0);
});

test("should return indexx for the last item when user presses End key", () => {
  render(<MockMenu />);
  const focusableItems = screen.getAllByRole("listitem");
  const result = menuKeyboardNavigation(
    getMockEvent("End", 35),
    focusableItems,
  );
  expect(result).toEqual(8);
});

test("should not match any item and return undefined when user enters a non-navigation key", () => {
  render(<MockMenu />);
  const focusableItems = screen.getAllByRole("listitem");
  const result = menuKeyboardNavigation(getMockEvent("c", 67), focusableItems);
  expect(result).toBeUndefined();
});

test("should not match any item and return undefined when user presses Tab key", () => {
  render(<MockMenu />);
  const focusableItems = screen.getAllByRole("listitem");
  const result = menuKeyboardNavigation(getMockEvent("Tab", 9), focusableItems);
  expect(result).toBeUndefined();
});

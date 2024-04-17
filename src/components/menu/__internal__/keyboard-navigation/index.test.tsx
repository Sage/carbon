import React from "react";
import { render, screen } from "@testing-library/react";

import { characterNavigation, menuKeyboardNavigation } from ".";
import MenuItem from "../../menu-item";
import Box from "../../../box";
import Logger from "../../../../__internal__/utils/logger";

// mock Logger.deprecate so that Typography (used for the alert dialog's heading) doesn't trigger a warning while running the tests
const loggerSpy = jest.spyOn(Logger, "deprecate");

const getMockEvent = (key: string, which?: number) => {
  return ({
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    key,
    which,
  } as unknown) as React.KeyboardEvent;
};

const MockMenu = () => (
  <ul>
    <MenuItem>Apple</MenuItem>
    <MenuItem data-role="banana">Banana</MenuItem>
    <li data-component="not-item">Not a menu item</li>
    <MenuItem>Carrot</MenuItem>
    <MenuItem>Broccoli</MenuItem>
    <MenuItem data-role="submenu" submenu="submenu">
      <MenuItem>Sub item</MenuItem>
    </MenuItem>
    <MenuItem>Parsnip</MenuItem>
    <MenuItem data-role="rhubarb-and-ginger">
      <span>Rhubarb</span> <Box>and</Box> Ginger
    </MenuItem>
    <li>Not a menu item</li>
  </ul>
);

describe("Menu keyboard navigation", () => {
  beforeAll(() => loggerSpy.mockImplementation(() => {}));

  afterAll(() => loggerSpy.mockRestore());

  describe("via character keys", () => {
    it("returns undefined when an empty string is passed in", () => {
      render(<MockMenu />);
      const focusableItems = screen.getAllByRole("listitem");
      const result = characterNavigation("", focusableItems);
      expect(result).toBeUndefined();
    });

    // E.g. none of the items start with this letter
    it("returns undefined when an irreleveant character is passed in", () => {
      render(<MockMenu />);
      const focusableItems = screen.getAllByRole("listitem");
      const result = characterNavigation("h", focusableItems);
      expect(result).toBeUndefined();
    });

    it("returns correct element when a character key is passed in", () => {
      render(<MockMenu />);
      const focusableItems = screen.getAllByRole("listitem");
      const result = characterNavigation("b", focusableItems);
      expect(result).toEqual(screen.getByTestId("banana"));
    });

    it("returns correct element when menu contains other nodes", () => {
      render(<MockMenu />);
      const focusableItems = screen.getAllByRole("listitem");
      const result = characterNavigation("r", focusableItems);
      expect(result).toEqual(screen.getByTestId("rhubarb-and-ginger"));
    });

    it("returns first matching element when there are multiple items starting with the same letter", () => {
      render(<MockMenu />);
      const focusableItems = screen.getAllByRole("listitem");
      const result = characterNavigation("b", focusableItems);
      expect(result).toEqual(screen.getByTestId("banana"));
    });

    it("returns the correct element when the starting letter of a submenu is passed in", () => {
      render(<MockMenu />);
      const focusableItems = screen.getAllByRole("listitem");
      const result = characterNavigation("s", focusableItems);
      expect(result).toEqual(screen.getByTestId("submenu"));
    });
  });

  describe("via navigation keys", () => {
    it("returns undefined when an invalid key event is passed in", () => {
      render(<MockMenu />);
      const focusableItems = screen.getAllByRole("listitem");
      const result = menuKeyboardNavigation(
        getMockEvent("shift"),
        focusableItems
      );
      expect(result).toBeUndefined();
    });

    it("returns first index when Home key event is passed in", () => {
      render(<MockMenu />);
      const focusableItems = screen.getAllByRole("listitem");
      const result = menuKeyboardNavigation(
        getMockEvent("Home", 36),
        focusableItems
      );
      expect(result).toEqual(0);
    });

    it("returns last index when the End key event is passed in", () => {
      render(<MockMenu />);
      const focusableItems = screen.getAllByRole("listitem");
      const result = menuKeyboardNavigation(
        getMockEvent("End", 35),
        focusableItems
      );
      expect(result).toEqual(8);
    });

    it("returns undefined when an alphabetic key event is passed in", () => {
      render(<MockMenu />);
      const focusableItems = screen.getAllByRole("listitem");
      const result = menuKeyboardNavigation(
        getMockEvent("c", 67),
        focusableItems
      );
      expect(result).toBeUndefined();
    });

    it("returns undefined when Tab key event is passed in", () => {
      render(<MockMenu />);
      const focusableItems = screen.getAllByRole("listitem");
      const result = menuKeyboardNavigation(
        getMockEvent("Tab", 9),
        focusableItems
      );
      expect(result).toBeUndefined();
    });
  });
});

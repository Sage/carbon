import React from "react";
import { characterNavigation, menuKeyboardNavigation } from ".";
import MenuItem from "../../menu-item";
import Box from "../../../box";

const getMockEvent = (key, which) => {
  return {
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
    key,
    which,
  };
};

describe("Menu keyboard navigation", () => {
  const focusableItems = [
    <MenuItem>Apple</MenuItem>,
    <MenuItem>Banana</MenuItem>,
    <div>Not a menu item</div>,
    <MenuItem>Carrot</MenuItem>,
    <MenuItem>Broccoli</MenuItem>,
    <MenuItem submenu="submenu">Sub item</MenuItem>,
    <MenuItem>Parsnip</MenuItem>,
    <MenuItem>
      <span>Rhubarb</span> <Box>and</Box> Ginger
    </MenuItem>,
  ];

  describe("characterNavigation", () => {
    describe("when an empty string passed in", () => {
      it("should return the current index", () => {
        const result = characterNavigation("", focusableItems, 0);
        expect(result).toEqual(0);
      });
    });

    describe("when an irrelevant character passed in ", () => {
      // E.g. none of the items start with this letter
      it("should return the current index", () => {
        const result = characterNavigation("h", focusableItems, 0);
        expect(result).toEqual(0);
      });
    });

    describe("when a character key event passed in", () => {
      it("should return the correct index", () => {
        const result = characterNavigation("b", focusableItems, 0);
        expect(result).toEqual(1);
      });
    });

    describe("when a character key event passed in", () => {
      it("should return the correct index when menu contains other nodes", () => {
        const result = characterNavigation("r", focusableItems, 0);
        expect(result).toEqual(7);
      });
    });

    describe("when there are multiple menu items starting with the same letter", () => {
      it("should return the index of the next item starting with that letter", () => {
        const result = characterNavigation("b", focusableItems, 0);
        expect(result).toEqual(1);
      });
    });

    describe("when the starting letter of a submenu passed in", () => {
      it("should return the correct index", () => {
        const result = characterNavigation("s", focusableItems, 0);
        expect(result).toEqual(5);
      });
    });
  });

  describe("menuKeyboardNavigation", () => {
    describe("when an invalid key event passed in", () => {
      it("should return undefined", () => {
        const result = menuKeyboardNavigation(
          getMockEvent("shift"),
          focusableItems,
          1
        );
        expect(result).toEqual(undefined);
      });
    });

    describe("when the Home key event passed in", () => {
      it("should return the first index", () => {
        const result = menuKeyboardNavigation(
          getMockEvent("Home", 36),
          focusableItems,
          3
        );
        expect(result).toEqual(0);
      });
    });

    describe("when the End key event passed in", () => {
      it("should return the first index", () => {
        const result = menuKeyboardNavigation(
          getMockEvent("End", 35),
          focusableItems,
          1
        );
        expect(result).toEqual(7);
      });
    });

    describe("when an alphabet key event passed in", () => {
      it("should return undefined", () => {
        const result = menuKeyboardNavigation(
          getMockEvent("c", 67),
          focusableItems,
          0
        );
        expect(result).toEqual(undefined);
      });
    });

    // Tab key
    describe("when the Tab key event passed in", () => {
      it("should return undefined", () => {
        const result = menuKeyboardNavigation(
          getMockEvent("Tab", 9),
          focusableItems,
          1
        );
        expect(result).toEqual(undefined);
      });
    });
  });
});

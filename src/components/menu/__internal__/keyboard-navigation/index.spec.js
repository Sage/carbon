import React from "react";
import { characterNavigation, menuKeyboardNavigation } from ".";
import MenuItem from "../../menu-item";

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
  ];

  describe("characterNavigation", () => {
    describe("when a non character key event passed in", () => {
      it("should return the current index", () => {
        const result = characterNavigation(
          getMockEvent("ArrowRight"),
          focusableItems,
          0
        );
        expect(result).toEqual(0);
      });
    });

    describe("when a character key event passed in", () => {
      it("should return the correct index", () => {
        const result = characterNavigation(
          getMockEvent("b"),
          focusableItems,
          0
        );
        expect(result).toEqual(1);
      });
    });

    describe("when there are multiple menu items starting with the same letter", () => {
      it("should return the index of the next item starting with that letter", () => {
        let result = characterNavigation(getMockEvent("b"), focusableItems, 0);
        expect(result).toEqual(1);

        result = characterNavigation(getMockEvent("b"), focusableItems, 1);
        expect(result).toEqual(4);

        result = characterNavigation(getMockEvent("b"), focusableItems, 4);
        expect(result).toEqual(1);
      });
    });

    describe("when the starting letter of a submenu passed in", () => {
      it("should return the correct index", () => {
        const result = characterNavigation(
          getMockEvent("s"),
          focusableItems,
          0
        );
        expect(result).toEqual(5);
      });
    });
  });

  describe("menuKeyboardNavigation", () => {
    describe("when in invalid key event passed in", () => {
      it("should return the current focused index", () => {
        const result = menuKeyboardNavigation(
          getMockEvent("shift"),
          focusableItems,
          1
        );
        expect(result).toEqual(1);
      });
    });

    describe("when the ArrowRight key event passed in", () => {
      describe("when current index is not the last", () => {
        it("should return the next index", () => {
          const result = menuKeyboardNavigation(
            getMockEvent("ArrowRight", 39),
            focusableItems,
            0
          );
          expect(result).toEqual(1);
        });
      });

      describe("when current index is the last", () => {
        it("should return the first index", () => {
          const result = menuKeyboardNavigation(
            getMockEvent("ArrowRight", 39),
            focusableItems,
            5
          );
          expect(result).toEqual(0);
        });
      });
    });

    describe("when the ArrowLeft key event passed in", () => {
      describe("when current index is not the first", () => {
        it("should return the next index", () => {
          const result = menuKeyboardNavigation(
            getMockEvent("ArrowLeft", 37),
            focusableItems,
            2
          );
          expect(result).toEqual(1);
        });
      });

      describe("when current index is the first", () => {
        it("should return the last index", () => {
          const result = menuKeyboardNavigation(
            getMockEvent("ArrowLeft", 37),
            focusableItems,
            0
          );
          expect(result).toEqual(5);
        });
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
        expect(result).toEqual(5);
      });
    });

    describe("when an alphabet key event passed in", () => {
      it("should return the correct index", () => {
        const result = menuKeyboardNavigation(
          getMockEvent("c", 67),
          focusableItems,
          0
        );
        expect(result).toEqual(3);
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

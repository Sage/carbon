import React from "react";
import { render } from "@testing-library/react";

import { characterNavigation, menuKeyboardNavigation } from ".";
import MenuItem from "../../menu-item";
import Box from "../../../box";
import { MENU_ITEM } from "../locators";
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

describe("Menu keyboard navigation", () => {
  beforeAll(() => {
    loggerSpy.mockImplementation(() => {});
  });

  afterAll(() => {
    loggerSpy.mockRestore();
  });

  beforeEach(() => {
    render(
      <ul>
        <MenuItem>Apple</MenuItem>
        <MenuItem>Banana</MenuItem>
        <li data-component="not-item">Not a menu item</li>
        <MenuItem>Carrot</MenuItem>
        <MenuItem>Broccoli</MenuItem>
        <MenuItem submenu="submenu">
          <MenuItem>Sub item</MenuItem>
        </MenuItem>
        <MenuItem>Parsnip</MenuItem>
        <MenuItem>
          <span>Rhubarb</span> <Box>and</Box> Ginger
        </MenuItem>
        <li data-element="not-item">Not a menu item</li>
      </ul>
    );
  });
  const focusableItems = () =>
    Array.from(
      document.querySelectorAll(
        `[data-component='not-item'], [data-component='${MENU_ITEM}'], [data-element='not-item']`
      )
    );

  const getItem = (index: number) =>
    Array.from(document.querySelectorAll(`[data-component='${MENU_ITEM}']`))[
      index
    ];

  describe("characterNavigation", () => {
    describe("when an empty string passed in", () => {
      it("should return undefined", () => {
        const result = characterNavigation("", focusableItems());
        expect(result).toEqual(undefined);
      });
    });

    describe("when an irrelevant character passed in", () => {
      // E.g. none of the items start with this letter
      it("should return undefined", () => {
        const result = characterNavigation("h", focusableItems());
        expect(result).toEqual(undefined);
      });
    });

    describe("when a character key passed in", () => {
      it("should return the correct element", () => {
        const result = characterNavigation("b", focusableItems());
        expect(result).toEqual(getItem(1));
      });

      it("should return the correct element when menu contains other nodes", () => {
        const result = characterNavigation("r", focusableItems());
        expect(result).toEqual(getItem(6));
      });
    });

    describe("when there are multiple menu items starting with the same letter", () => {
      it("should return the first element starting with that letter", () => {
        const result = characterNavigation("b", focusableItems());
        expect(result).toEqual(getItem(1));
      });
    });

    describe("when the starting letter of a submenu passed in", () => {
      it("should return the correct element", () => {
        const result = characterNavigation("s", focusableItems());
        expect(result).toEqual(getItem(4));
      });
    });
  });

  describe("menuKeyboardNavigation", () => {
    describe("when an invalid key event passed in", () => {
      it("should return undefined", () => {
        const result = menuKeyboardNavigation(
          getMockEvent("shift"),
          focusableItems()
        );
        expect(result).toEqual(undefined);
      });
    });

    describe("when the Home key event passed in", () => {
      it("should return the first index", () => {
        const result = menuKeyboardNavigation(
          getMockEvent("Home", 36),
          focusableItems()
        );
        expect(result).toEqual(0);
      });
    });

    describe("when the End key event passed in", () => {
      it("should return the last index", () => {
        const result = menuKeyboardNavigation(
          getMockEvent("End", 35),
          focusableItems()
        );
        expect(result).toEqual(8);
      });
    });

    describe("when an alphabet key event passed in", () => {
      it("should return undefined", () => {
        const result = menuKeyboardNavigation(
          getMockEvent("c", 67),
          focusableItems()
        );
        expect(result).toEqual(undefined);
      });
    });

    // Tab key
    describe("when the Tab key event passed in", () => {
      it("should return undefined", () => {
        const result = menuKeyboardNavigation(
          getMockEvent("Tab", 9),
          focusableItems()
        );
        expect(result).toEqual(undefined);
      });
    });
  });
});

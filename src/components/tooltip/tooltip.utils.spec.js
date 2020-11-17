import {
  hasTheSameOrientation,
  isVertical,
  isHorizontal,
  getOppositeDirection,
} from "./tooltip.utils";

describe("Tooltip Utils", () => {
  describe("isVertical", () => {
    describe.each([
      ["top", true],
      ["bottom", true],
      ["left", false],
      ["right", false],
    ])("when the argument is %s", (direction, expectedResult) => {
      it(`should return ${expectedResult}`, () => {
        expect(isVertical(direction)).toBe(expectedResult);
      });
    });
  });

  describe("isHorizontal", () => {
    describe.each([
      ["top", false],
      ["bottom", false],
      ["left", true],
      ["right", true],
    ])("when the argument is %s", (direction, expectedResult) => {
      it(`should return ${expectedResult}`, () => {
        expect(isHorizontal(direction)).toBe(expectedResult);
      });
    });
  });

  describe("hasTheSameOrientation", () => {
    describe.each([
      [["top", "bottom"], true],
      [["left", "right"], true],
      [["left", "bottom"], false],
      [["right", "top"], false],
    ])("when the arguments are: %s", (directions, expectedResult) => {
      it(`should return ${expectedResult}`, () => {
        expect(hasTheSameOrientation(directions[0], directions[1])).toBe(
          expectedResult
        );
      });
    });
  });

  describe("getOppositeDirection", () => {
    describe.each([
      ["top", "bottom"],
      ["bottom", "top"],
      ["left", "right"],
      ["right", "left"],
    ])("when the argument is %s", (direction, expectedResult) => {
      it(`should return ${expectedResult}`, () => {
        expect(getOppositeDirection(direction)).toBe(expectedResult);
      });
    });
  });
});

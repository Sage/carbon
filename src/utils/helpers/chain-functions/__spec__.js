import ChainFunction from "./chain-functions";

describe("ChainFunctions", () => {
  let originalFunction, newFunction;

  beforeEach(() => {
    originalFunction = jasmine.createSpy("original");
    newFunction = jasmine.createSpy("new");
  });

  describe("when passing an original function", () => {
    beforeEach(() => {
      let result = ChainFunction(newFunction, originalFunction);
      result(1, 1);
    });

    it("calls the original function with the given params", () => {
      expect(originalFunction).toHaveBeenCalledWith(1, 1);
    });

    it("calls the new function with the same params as the original function", () => {
      expect(newFunction).toHaveBeenCalledWith(1, 1);
    });
  });

  describe("when not passing an original function", () => {
    beforeEach(() => {
      let result = ChainFunction(newFunction);
      result(1, 1);
    });

    it("calls the new function with the given params", () => {
      expect(newFunction).toHaveBeenCalledWith(1, 1);
    });

    it("does not call the new function", () => {
      expect(originalFunction).not.toHaveBeenCalled();
    });
  });
});

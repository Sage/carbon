import toArray from "./to-array";

describe("toArray", () => {
  describe("string with word at start", () => {
    it("converts to the appropriate array", () => {
      expect(toArray("foo[bar][baz]")).toEqual(["foo", "bar", "baz"]);
    });
  });

  describe("string with bracket at start", () => {
    it("converts to the appropriate array", () => {
      expect(toArray("[bar][baz]")).toEqual(["bar", "baz"]);
    });
  });

  describe("string with no brackets", () => {
    it("converts to the appropriate array", () => {
      expect(toArray("foo")).toEqual(["foo"]);
    });
  });
});

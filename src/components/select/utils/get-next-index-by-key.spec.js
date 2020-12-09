import getNextIndexByKey from "./get-next-index-by-key";

describe("getNextIndexByKey", () => {
  const homeKey = "Home";
  const endKey = "End";
  const upKey = "ArrowUp";
  const downKey = "ArrowDown";
  const aKey = "a";
  const list = ["a", "b", "c", "d", "e", "f"];

  describe("when the homeKey is passed as the first attribute", () => {
    it("then the first index should be returned", () => {
      expect(getNextIndexByKey(homeKey, 2, list.length)).toBe(0);
    });
  });

  describe("when the endKey is passed as the first attribute", () => {
    it("then the last index should be returned", () => {
      expect(getNextIndexByKey(endKey, 0, list.length)).toBe(list.length);
    });
  });

  describe("when the upKey is passed as the first attribute", () => {
    it("then the last index should be returned", () => {
      expect(getNextIndexByKey(upKey, 0, list.length)).toBe(list.length);
    });
  });

  describe("when the upKey is passed as the first attribute", () => {
    it("then the preceding index should be returned", () => {
      expect(getNextIndexByKey(upKey, 2, list.length)).toBe(1);
    });
  });

  describe("when the downKey is passed as the first attribute", () => {
    it("then the following index should be returned", () => {
      expect(getNextIndexByKey(downKey, 0, list.length)).toBe(1);
    });
  });

  describe("when the downKey is passed as the first attribute with the last index as the second", () => {
    it("then the first index should be returned", () => {
      expect(getNextIndexByKey(downKey, list.length, list.length)).toBe(0);
    });

    describe("and the last argument is set to true", () => {
      it("then the last index should be returned", () => {
        expect(getNextIndexByKey(downKey, list.length, list.length, true)).toBe(
          list.length
        );
      });
    });
  });

  describe("when a non valid key is passed as the first attribute", () => {
    it("then the index passed in the second attribute should be returned", () => {
      expect(getNextIndexByKey(aKey, 1, list.length)).toBe(1);
    });
  });
});

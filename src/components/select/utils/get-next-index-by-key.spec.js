import getNextIndexByKey from "./get-next-index-by-key";

describe("getNextIndexByKey", () => {
  const homeKey = "Home";
  const endKey = "End";
  const upKey = "ArrowUp";
  const downKey = "ArrowDown";
  const aKey = "a";
  const list = ["a", "b", "c", "d", "e", "f"];
  const lastIndex = list.length - 1;

  describe("when the homeKey is passed as the first attribute", () => {
    it("then the first index should be returned", () => {
      expect(getNextIndexByKey(homeKey, 2, lastIndex)).toBe(0);
    });
  });

  describe("when the endKey is passed as the first attribute", () => {
    it("then the last index should be returned", () => {
      expect(getNextIndexByKey(endKey, 0, lastIndex)).toBe(lastIndex);
    });
  });

  describe("when the upKey is passed as the first attribute", () => {
    it("then the last index should be returned", () => {
      expect(getNextIndexByKey(upKey, 0, lastIndex)).toBe(lastIndex);
    });
  });

  describe("when the upKey is passed as the first attribute", () => {
    it("then the preceding index should be returned", () => {
      expect(getNextIndexByKey(upKey, 2, lastIndex)).toBe(1);
    });
  });

  describe("when the downKey is passed as the first attribute", () => {
    it("then the following index should be returned", () => {
      expect(getNextIndexByKey(downKey, 0, lastIndex)).toBe(1);
    });
  });

  describe("when the downKey is passed as the first attribute with the last index as the second", () => {
    it("then the first index should be returned", () => {
      expect(getNextIndexByKey(downKey, lastIndex, lastIndex)).toBe(0);
    });

    describe("and the last argument is set to true", () => {
      it("then the last index should be returned", () => {
        expect(getNextIndexByKey(downKey, lastIndex, lastIndex, true)).toBe(
          lastIndex
        );
      });
    });
  });

  describe("when a non valid key is passed as the first attribute", () => {
    it("then the index passed in the second attribute should be returned", () => {
      expect(getNextIndexByKey(aKey, 1, lastIndex)).toBe(1);
    });
  });
});

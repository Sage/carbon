import getNextIndexByKey, { PAGE_SIZE } from "./get-next-index-by-key";

describe("getNextIndexByKey", () => {
  const homeKey = "Home";
  const endKey = "End";
  const upKey = "ArrowUp";
  const downKey = "ArrowDown";
  const pageUpKey = "PageUp";
  const pageDownKey = "PageDown";
  const aKey = "a";
  const list = ["a", "b", "c", "d", "e", "f", "g", "h"];
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
    it("then the preceding index should be returned", () => {
      expect(getNextIndexByKey(upKey, 2, lastIndex)).toBe(1);
    });
  });

  describe("when the upKey is passed as the first attribute with the first index as the second", () => {
    it("then the last index should be returned", () => {
      expect(getNextIndexByKey(upKey, 0, lastIndex)).toBe(lastIndex);
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

  describe("when the pageUpKey is passed as the first attribute", () => {
    it("then the index should be decreased by the page size", () => {
      expect(getNextIndexByKey(pageUpKey, 6, lastIndex)).toBe(6 - PAGE_SIZE);
    });

    describe("when the current index is within page size of the start", () => {
      it("then the first index should be returned", () => {
        expect(getNextIndexByKey(pageUpKey, 2, lastIndex)).toBe(0);
      });
    });

    describe("when no index is currently selected", () => {
      it("then the index should be returned that is 1 page before the end", () => {
        expect(getNextIndexByKey(pageUpKey, -1, lastIndex)).toBe(
          lastIndex + 1 - PAGE_SIZE
        );
      });
    });
  });

  describe("when the pageDownKey is passed as the first attribute", () => {
    it("then the index should be increased by the page size", () => {
      expect(getNextIndexByKey(pageDownKey, 0, lastIndex)).toBe(PAGE_SIZE);
    });

    describe("when the current index is within page size of the end", () => {
      it("then the last index should be returned", () => {
        expect(getNextIndexByKey(pageDownKey, lastIndex - 2, lastIndex)).toBe(
          lastIndex
        );
      });
    });

    describe("when no index is currently selected", () => {
      it("then the index should be returned that is 1 page from the start", () => {
        expect(getNextIndexByKey(pageDownKey, -1, lastIndex)).toBe(
          PAGE_SIZE - 1
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

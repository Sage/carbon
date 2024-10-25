import { mergeDeep } from "./merge-deep";

describe("mergeDeep", () => {
  let base: Record<string, unknown>;

  beforeEach(() => {
    base = {
      a: 1,
      b: { nestedB: 1 },
    };
  });

  const toMerge = {
    a: 1,
    b: { nestedA: 1 },
  };

  const objectToMergeWithSameKey = {
    a: 2,
  };

  const objectWithArray = {
    c: ["inArray"],
  };

  it("merges objects with nested keys", () => {
    expect(mergeDeep(base, toMerge)).toEqual({
      a: 1,
      b: { nestedA: 1, nestedB: 1 },
    });
  });

  it("merges the objects and creates a new key", () => {
    const newKeyObj = { a: 1, b: { nestedB: 1 }, c: "test" };
    expect(mergeDeep(base, newKeyObj)).toEqual({
      a: 1,
      b: { nestedB: 1 },
      c: "test",
    });
  });

  it("merges objects and overwrites keys if they exist", () => {
    expect(mergeDeep(base, objectToMergeWithSameKey)).toEqual({
      a: 2,
      b: { nestedB: 1 },
    });
  });

  it("handles the merging of objects which contain arrays", () => {
    expect(mergeDeep(base, objectWithArray)).toEqual({
      a: 1,
      b: { nestedB: 1 },
      c: ["inArray"],
    });
  });

  it("merges the objects but does not create a new key when passed a nested empty object", () => {
    expect(mergeDeep(base, { foo: {} })).toEqual(base);
  });

  it("is not mutative", () => {
    const baseCopy = JSON.parse(JSON.stringify(base));
    mergeDeep(base, toMerge);
    expect(base).toEqual(baseCopy);
  });
});

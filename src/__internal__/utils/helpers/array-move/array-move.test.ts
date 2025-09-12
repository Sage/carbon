import arrayMove from ".";

test("moves array element from startIndex to endIndex", () => {
  const result = arrayMove({
    array: ["a", "b", "c", "d"],
    startIndex: 1,
    endIndex: 3,
  });
  expect(result).toEqual(["a", "c", "d", "b"]);
});

test("does not mutate the original array", () => {
  const array = ["a", "b", "c", "d"];
  arrayMove({ array, startIndex: 1, endIndex: 3 });
  expect(array).toEqual(["a", "b", "c", "d"]);
});

test("returns the original array if startIndex and endIndex are the same", () => {
  const array = ["a", "b", "c", "d"];
  const result = arrayMove({ array, startIndex: 1, endIndex: 1 });
  expect(result).toBe(array);
});

test("returns the original array if startIndex is out of bounds", () => {
  const array = ["a", "b", "c", "d"];
  const result = arrayMove({ array, startIndex: -1, endIndex: 2 });
  expect(result).toBe(array);
});

test("returns the original array if endIndex is out of bounds", () => {
  const array = ["a", "b", "c", "d"];
  const result = arrayMove({ array, startIndex: 1, endIndex: 4 });
  expect(result).toBe(array);
});

import areObjectsEqual from "./are-objects-equal";

const value1 = { id: "Amber", value: 1, text: "Amber" };
const value2 = { id: "Amber", value: 1, text: "Amber" };
const value3 = { id: "Black", value: 2, text: "Black" };
const value4 = { id: "Black", value: 2 };
const value5 = { ids: "Amber", values: 1, text: "Amber" };
const invalidParam = "notAnObject" as unknown as Record<string, unknown>;

test("returns true when the objects have the same keys and values", () => {
  expect(areObjectsEqual(value1, value2)).toBe(true);
});

test("returns false when the objects have the same keys but not the same values", () => {
  expect(areObjectsEqual(value1, value3)).toBe(false);
});

test("returns false when the objects do not have the same keys length", () => {
  expect(areObjectsEqual(value1, value4)).toBe(false);
});

test("returns false when the objects have the same keys length but different key names", () => {
  expect(areObjectsEqual(value1, value5)).toBe(false);
});

test("throws error if both parameters are not objects", () => {
  expect(areObjectsEqual(value1, invalidParam)).toBe(false);
  expect(areObjectsEqual(invalidParam, value1)).toBe(false);
});

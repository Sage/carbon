import getNextIndexByKey from "./get-next-index-by-key";

test("returns first index when 'Home' key is pressed", () => {
  expect(getNextIndexByKey("Home", 2, 8)).toEqual(0);
});

test("returns last index when 'End' key is pressed", () => {
  expect(getNextIndexByKey("End", 0, 8)).toEqual(8);
});

test("returns decremented index when 'ArrowUp' key is pressed", () => {
  expect(getNextIndexByKey("ArrowUp", 2, 8)).toEqual(1);
});

test("wraps around to last index when 'ArrowUp' key is pressed at the first index", () => {
  expect(getNextIndexByKey("ArrowUp", 0, 8)).toEqual(8);
});

test("returns incremented index when 'ArrowDown' key is pressed", () => {
  expect(getNextIndexByKey("ArrowDown", 0, 8)).toEqual(1);
});

test("wraps around to first index when 'ArrowDown' key is pressed at the last index", () => {
  expect(getNextIndexByKey("ArrowDown", 8, 8)).toEqual(0);
});

test("returns last index when 'ArrowDown' key is pressed at the last index and loading is true", () => {
  expect(getNextIndexByKey("ArrowDown", 8, 8, true)).toEqual(8);
});

test("returns first index when 'PageUp' key is pressed", () => {
  expect(getNextIndexByKey("PageUp", 6, 8)).toEqual(0);
  expect(getNextIndexByKey("PageUp", 2, 8)).toEqual(0);
});

test("returns first index when 'PageUp' key is pressed with no selected index", () => {
  expect(getNextIndexByKey("PageUp", -1, 8)).toEqual(0);
});

test("returns last index when 'PageDown' key is pressed", () => {
  expect(getNextIndexByKey("PageDown", 0, 8)).toEqual(8);
  expect(getNextIndexByKey("PageDown", 6, 8)).toEqual(8);
});

test("returns last index when 'PageDown' key is pressed with no selected index", () => {
  expect(getNextIndexByKey("PageDown", -1, 8)).toEqual(8);
});

test("returns current index when an invalid key is pressed", () => {
  expect(getNextIndexByKey("a", 1, 8)).toEqual(1);
});

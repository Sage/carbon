import getNextIndexByKey, { PAGE_SIZE } from "./get-next-index-by-key";

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

test("returns index decreased by page size when 'PageUp' key is pressed", () => {
  expect(getNextIndexByKey("PageUp", 6, 8)).toEqual(6 - PAGE_SIZE);
});

test("returns first index when 'PageUp' key is pressed and index is within page size", () => {
  expect(getNextIndexByKey("PageUp", 2, 8)).toEqual(0);
});

test("returns page size from the end when 'PageUp' key is pressed with no selected index", () => {
  expect(getNextIndexByKey("PageUp", -1, 8)).toEqual(8 + 1 - PAGE_SIZE);
});

test("returns index increased by page size when 'PageDown' key is pressed", () => {
  expect(getNextIndexByKey("PageDown", 0, 8)).toEqual(PAGE_SIZE);
});

test("returns last index when 'PageDown' key is pressed and index is within page size of the last index", () => {
  expect(getNextIndexByKey("PageDown", 6, 8)).toEqual(8);
});

test("returns page size from the start when 'PageDown' key is pressed with no selected index", () => {
  expect(getNextIndexByKey("PageDown", -1, 8)).toEqual(PAGE_SIZE - 1);
});

test("returns current index when an invalid key is pressed", () => {
  expect(getNextIndexByKey("a", 1, 8)).toEqual(1);
});

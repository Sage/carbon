import isNavigationKey from "./is-navigation-key";

it.each(["ArrowDown", "ArrowUp", "Home", "End", "PageUp", "PageDown"])(
  "returns true for '%s' key",
  (key) => {
    expect(isNavigationKey(key)).toBe(true);
  },
);

it.each([
  "a",
  "q",
  "z",
  "1",
  "0",
  " ",
  "Enter",
  "Tab",
  "Delete",
  "ArrowLeft",
  "ArrowRight",
])("returns false for '%s' key", (key) => {
  expect(isNavigationKey(key)).toBe(false);
});

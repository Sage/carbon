import isNavigationKey from "./is-navigation-key";

describe("isNavigationKey", () => {
  describe("correct navigation keys", () => {
    it.each(["ArrowDown", "ArrowUp", "Home", "End", "PageUp", "PageDown"])(
      "%s is counted as a navigation key",
      (key) => {
        expect(isNavigationKey(key)).toBe(true);
      }
    );
  });

  describe("non-navigation keys", () => {
    it.each(["a", "q", "z", "1", "0", " ", "Enter", "Tab", "Delete"])(
      "%s is not counted as a navigation key",
      (key) => {
        expect(isNavigationKey(key)).toBe(false);
      }
    );
  });

  describe("left/right arrow keys", () => {
    it.each(["ArrowLeft", "ArrowRight"])(
      "%s is not counted as a navigation key",
      (key) => {
        expect(isNavigationKey(key)).toBe(false);
      }
    );
  });
});

import { ICON_COLOR_TYPES } from "./icon.style";
import { isLegacyWhiteColor, resolveSemanticColor } from "./icon.utils";

test.each([
  "white",
  "#fff",
  "#ffffff",
  "rgb(255,255,255)",
  "rgb(255, 255, 255)",
  "rgba(255,255,255,1)",
  "rgba(255, 255, 255, 1)",
])("identifies %s as a legacy white color", (color) => {
  expect(isLegacyWhiteColor(color)).toBe(true);
});

test("does not identify other values as legacy white colors", () => {
  expect(isLegacyWhiteColor("red")).toBe(false);
});

test.each(ICON_COLOR_TYPES)("resolves the %s semantic color", (color) => {
  expect(resolveSemanticColor(color)).toBe(color);
});

test.each([undefined, "", "red"])(
  "does not resolve the non-semantic color %s",
  (color) => {
    expect(resolveSemanticColor(color)).toBeUndefined();
  },
);

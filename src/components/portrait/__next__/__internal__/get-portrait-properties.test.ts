import {
  getPortraitColors,
  getPortraitBorderRadius,
  getPortraitDimensions,
  getPortraitFontSize,
  getPortraitIconFontSize,
} from "./get-portrait-properties";

describe("getPortraitProperties", () => {
  test("getPortraitColors returns correct colors for each variant", () => {
    expect(getPortraitColors("black")).toEqual({
      backgroundColor: "var(--profile-bg-def)",
      color: "var(--profile-label-default)",
    });
    expect(getPortraitColors("blue")).toEqual({
      backgroundColor: "var(--profile-swatches-blue-bg-default)",
      color: "var(--profile-swatches-blue-label-default)",
    });
    expect(getPortraitColors("teal")).toEqual({
      backgroundColor: "var(--profile-swatches-teal-bg-default)",
      color: "var(--profile-swatches-teal-label-default)",
    });
    expect(getPortraitColors("green")).toEqual({
      backgroundColor: "var(--profile-swatches-green-bg-default)",
      color: "var(--profile-swatches-green-label-default)",
    });
    expect(getPortraitColors("lime")).toEqual({
      backgroundColor: "var(--profile-swatches-lime-bg-default)",
      color: "var(--profile-swatches-lime-label-default)",
    });
    expect(getPortraitColors("orange")).toEqual({
      backgroundColor: "var(--profile-swatches-orange-bg-default)",
      color: "var(--profile-swatches-orange-label-default)",
    });
    expect(getPortraitColors("red")).toEqual({
      backgroundColor: "var(--profile-swatches-red-bg-default)",
      color: "var(--profile-swatches-red-label-default)",
    });
    expect(getPortraitColors("pink")).toEqual({
      backgroundColor: "var(--profile-swatches-pink-bg-default)",
      color: "var(--profile-swatches-pink-label-default)",
    });
    expect(getPortraitColors("purple")).toEqual({
      backgroundColor: "var(--profile-swatches-purple-bg-default)",
      color: "var(--profile-swatches-purple-label-default)",
    });
    expect(getPortraitColors("slate")).toEqual({
      backgroundColor: "var(--profile-swatches-slate-bg-default)",
      color: "var(--profile-swatches-slate-label-default)",
    });
    expect(getPortraitColors("grey")).toEqual({
      backgroundColor: "var(--profile-swatches-grey-bg-default)",
      color: "var(--profile-swatches-grey-label-default)",
    });
  });

  test('getPortraitBorderRadius returns correct border radius for "square" shape', () => {
    expect(getPortraitBorderRadius("square")).toBe(
      "var(--global-radius-container-m)",
    );
  });

  test('getPortraitBorderRadius returns correct border radius for "circle" shape', () => {
    expect(getPortraitBorderRadius("circle")).toBe(
      "var(--global-radius-container-circle)",
    );
  });

  test("getPortraitDimensions returns correct dimensions for each size", () => {
    expect(getPortraitDimensions("XS")).toEqual({
      height: "var(--profile-size-outside-xs)",
      width: "var(--profile-size-outside-xs)",
    });
    expect(getPortraitDimensions("S")).toEqual({
      height: "var(--profile-size-outside-s)",
      width: "var(--profile-size-outside-s)",
    });
    expect(getPortraitDimensions("M")).toEqual({
      height: "var(--profile-size-outside-m)",
      width: "var(--profile-size-outside-m)",
    });
    expect(getPortraitDimensions("L")).toEqual({
      height: "var(--profile-size-outside-l)",
      width: "var(--profile-size-outside-l)",
    });
    expect(getPortraitDimensions("XL")).toEqual({
      height: "var(--profile-size-outside-xl)",
      width: "var(--profile-size-outside-xl)",
    });
    expect(getPortraitDimensions("XXL")).toEqual({
      height: "var(--profile-size-outside-xxl)",
      width: "var(--profile-size-outside-xxl)",
    });
  });

  test("getPortraitFontSize returns correct font size for each size", () => {
    expect(getPortraitFontSize("XS")).toBe("var(--profile-font-initials-xs)");
    expect(getPortraitFontSize("S")).toBe("var(--profile-font-initials-s)");
    expect(getPortraitFontSize("M")).toBe("var(--profile-font-initials-m)");
    expect(getPortraitFontSize("L")).toBe("var(--profile-font-initials-l)");
    expect(getPortraitFontSize("XL")).toBe("var(--profile-font-initials-xl)");
    expect(getPortraitFontSize("XXL")).toBe("var(--profile-font-initials-xxl)");
  });

  test("getPortraitIconFontSize returns correct font size for each size", () => {
    expect(getPortraitIconFontSize("XS")).toBe("var(--sizing200)");
    expect(getPortraitIconFontSize("S")).toBe("var(--sizing250)");
    expect(getPortraitIconFontSize("M")).toBe("var(--sizing300)");
    expect(getPortraitIconFontSize("L")).toBe("var(--sizing500)");
    expect(getPortraitIconFontSize("XL")).toBe("var(--sizing700)");
    expect(getPortraitIconFontSize("ML")).toBe("var(--sizing400)");
    expect(getPortraitIconFontSize("XL")).toBe("var(--sizing700)");
    expect(getPortraitIconFontSize("XXL")).toBe("var(--sizing800)");
  });
});

import getColoursForPortrait, {
  getPortraitColors,
  getPortraitBorderRadius,
  getPortraitDimensions,
  getPortraitFontSize,
  getPortraitIconFontSize,
} from "./get-properties";

test("returns the default string if no arguments are passed", () => {
  const result = getColoursForPortrait(undefined);
  expect(result).toBe(
    `background-color: var(--colorsUtilityReadOnly400); color: var(--colorsUtilityYin090);`,
  );
});

test("returns a fixed string if only the `backgroundColor` argument is set to true", () => {
  const result = getColoursForPortrait("#FF0000");
  expect(result).toBe(
    "background-color: #FF0000; color: var(--colorsUtilityYin090);",
  );
});

test("returns a fixed string if the `darkBackground` argument is set to true", () => {
  const result = getColoursForPortrait(undefined, true);
  expect(result).toBe(
    "background-color: var(--colorsUtilityYin090); color: var(--colorsUtilityReadOnly600);",
  );
});

test("returns a fixed string if neither `darkBackground` nor `backgroundColor` argument are defined", () => {
  const result = getColoursForPortrait(undefined, false);
  expect(result).toBe(
    `background-color: var(--colorsUtilityReadOnly400); color: var(--colorsUtilityYin090);`,
  );
});

test("returns a string with the custom background color if the `backgroundColor` argument is defined", () => {
  const result = getColoursForPortrait("#FF0000", false);
  expect(result).toBe(
    "background-color: #FF0000; color: var(--colorsUtilityYin090);",
  );
});

test("returns a string with the custom background color if only the `backgroundColor` argument is defined and all others are false", () => {
  const result = getColoursForPortrait("#FF0000", false, false, false);
  expect(result).toBe(
    "background-color: #FF0000; color: var(--colorsUtilityYin090);",
  );
});

test("returns a string with the custom background color if the `backgroundColor` argument is defined and `largeText` argument is true", () => {
  const result = getColoursForPortrait("#FF0000", false, true);
  expect(result).toBe(
    "background-color: #FF0000; color: var(--colorsUtilityYin090);",
  );
});

test("returns a string with the custom background color if the `backgroundColor` and `largeText` arguments are defined and `strict` argument is false", () => {
  const result = getColoursForPortrait("#FF0000", false, true, false);
  expect(result).toBe(
    "background-color: #FF0000; color: var(--colorsUtilityYin090);",
  );
});

test("returns a string with the custom background color if the `backgroundColor` and `largeText` arguments are defined and `strict` argument is true", () => {
  const result = getColoursForPortrait("#FF0000", false, true, true);
  expect(result).toBe(
    "background-color: #FF0000; color: var(--colorsUtilityYin090);",
  );
});

describe("Contrast ratio tests", () => {
  it("uses a white foreground colour if the white contrast ratio meets the minimum contrast threshold and is higher than the black contrast ratio", () => {
    const result = getColoursForPortrait("#0000FF");
    expect(result).toBe(
      "background-color: #0000FF; color: var(--colorsUtilityYang100);",
    );
  });

  it("uses a black foreground colour if the  black contrast ratio meets the minimum contrast threshold", () => {
    const result = getColoursForPortrait("#FFFF00");
    expect(result).toBe(
      "background-color: #FFFF00; color: var(--colorsUtilityYin090);",
    );
  });
});

test("returns a string with the custom background color and light text if the `backgroundColor` argument is set to a colour with poor contrast ratios (higher white contrast)", () => {
  const result = getColoursForPortrait("#0000FF");
  expect(result).toBe(
    "background-color: #0000FF; color: var(--colorsUtilityYang100);",
  );
});

test("returns a string with the custom colors if the `backgroundColor` and `foregroundColor` arguments are provided and all others are false", () => {
  const result = getColoursForPortrait(
    "#FF0000",
    false,
    false,
    false,
    "#00FF00",
  );
  expect(result).toBe("background-color: #FF0000; color: #00FF00;");
});

test("returns a string with the custom foreground color if `foregroundColor` argument is present but `backgroundColor` is omitted", () => {
  const result = getColoursForPortrait(
    undefined,
    false,
    false,
    false,
    "#00FF00",
  );
  expect(result).toBe(
    `background-color: var(--colorsUtilityReadOnly400); color: #00FF00;`,
  );
});

test("returns a string with the custom colors if the `darkBackground`, `foregroundColor` and `backgroundColor` props are set", () => {
  const result = getColoursForPortrait(
    "#FF0000",
    true,
    false,
    false,
    "#00FF00",
  );
  expect(result).toBe("background-color: #FF0000; color: #00FF00;");
});

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
  expect(getPortraitColors("gray")).toEqual({
    backgroundColor: "var(--profile-swatches-gray-bg-default)",
    color: "var(--profile-swatches-gray-label-default)",
  });
});

test('getPortraitBorderRadius returns correct border radius for "square" shape with size XS and S', () => {
  expect(getPortraitBorderRadius("square", "XS")).toBe(
    "var(--global-radius-container-xs)",
  );

  expect(getPortraitBorderRadius("square", "S")).toBe(
    "var(--global-radius-container-xs)",
  );
});

test('getPortraitBorderRadius returns correct border radius for "square" shape with size M, ML and L', () => {
  expect(getPortraitBorderRadius("square", "M")).toBe(
    "var(--global-radius-container-m)",
  );

  expect(getPortraitBorderRadius("square", "ML")).toBe(
    "var(--global-radius-container-m)",
  );

  expect(getPortraitBorderRadius("square", "L")).toBe(
    "var(--global-radius-container-m)",
  );
});

test('getPortraitBorderRadius returns correct border radius for "square" shape with size XL and XXL', () => {
  expect(getPortraitBorderRadius("square", "XL")).toBe(
    "var(--global-radius-container-l)",
  );

  expect(getPortraitBorderRadius("square", "XXL")).toBe(
    "var(--global-radius-container-l)",
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
  expect(getPortraitFontSize("ML")).toBe("var(--profile-font-initials-ml)");
  expect(getPortraitFontSize("L")).toBe("var(--profile-font-initials-l)");
  expect(getPortraitFontSize("XL")).toBe("var(--profile-font-initials-xl)");
  expect(getPortraitFontSize("XXL")).toBe("var(--profile-font-initials-xxl)");
});

test("getPortraitIconFontSize returns correct font size for each size", () => {
  expect(getPortraitIconFontSize("XS")).toBe("var(--profile-size-inside-xs)");
  expect(getPortraitIconFontSize("S")).toBe("var(--profile-size-inside-s)");
  expect(getPortraitIconFontSize("M")).toBe("var(--profile-size-inside-m)");
  expect(getPortraitIconFontSize("ML")).toBe("var(--profile-size-inside-ml)");
  expect(getPortraitIconFontSize("L")).toBe("var(--profile-size-inside-l)");
  expect(getPortraitIconFontSize("XL")).toBe("var(--profile-size-inside-xl)");
  expect(getPortraitIconFontSize("XXL")).toBe("var(--profile-size-inside-xxl)");
});

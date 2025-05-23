import getColoursForPortrait from "./get-colors";

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

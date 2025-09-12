import noneTheme from ".";
import baseTheme from "../base";

const isObject = (obj: Record<string, unknown>) => {
  return typeof obj === "object" && obj !== null;
};

const assertIsSubset = (
  obj: Record<string, unknown>,
  comparison: Record<string, unknown>,
) => {
  if (!isObject(obj)) {
    // no further nesting
    return;
  }

  const objKeys = Object.keys(obj);
  const comparisonKeys = Object.keys(comparison);

  objKeys.forEach((key) => {
    // assert that keys are present
    expect(comparisonKeys).toContain(key);

    // repeat for nested objects
    assertIsSubset(
      obj[key] as Record<string, unknown>,
      comparison[key] as Record<string, unknown>,
    );
  });
};

describe("noneTheme", () => {
  // eslint-disable-next-line jest/expect-expect
  it("contains the base theme", () => {
    assertIsSubset(baseTheme, noneTheme);
  });

  it("has no accidentally modified tokens in compatibility section", () => {
    expect(noneTheme.compatibility).toMatchSnapshot();
  });
});

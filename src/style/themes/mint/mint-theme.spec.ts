import { assertIsSubset } from "../test-utils";
import mintTheme from ".";
import baseTheme from "../base";

describe("mintTheme", () => {
  it("contains the base theme", () => {
    assertIsSubset(baseTheme, mintTheme);
  });

  it("has no accidentally modified tokens in compatibility section", () => {
    expect(mintTheme.compatibility).toMatchSnapshot();
  });
});

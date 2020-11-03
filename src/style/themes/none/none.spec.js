import { assertIsSubset } from "../test-utils";
import noneTheme from ".";
import baseTheme from "../base";

describe("noneTheme", () => {
  it("contains the base theme", () => {
    assertIsSubset(baseTheme, noneTheme);
  });
});

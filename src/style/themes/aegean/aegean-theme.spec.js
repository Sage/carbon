import { assertIsSubset } from "../test-utils";
import aegeanTheme from ".";
import baseTheme from "../base";

describe("aegeanTheme", () => {
  it("contains the base theme", () => {
    assertIsSubset(baseTheme, aegeanTheme);
  });
});

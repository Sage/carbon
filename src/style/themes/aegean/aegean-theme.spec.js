import { assertIsSubset } from "../test-utils";
import aegeanTheme from ".";
import baseTheme from "../base";

describe("aegeanTheme", () => {
  it("contains the base theme", () => {
    assertIsSubset(baseTheme, aegeanTheme);
  });

  it("has no accidentally modified tokens in compatibility section", () => {
    expect(aegeanTheme.compatibility).toMatchSnapshot();
  });
});

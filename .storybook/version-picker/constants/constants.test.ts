import { ADDON_ID, TOOL_ID } from "./constants";

test("ADDON_ID should have the expected value", () => {
  expect(ADDON_ID).toBe("storybook/version-picker");
});

test("TOOL_ID should have the expected value", () => {
  expect(TOOL_ID).toBe("storybook/version-picker/version-picker");
});

it("TOOL_ID should be composed from ADDON_ID", () => {
  const expectedToolId = `${ADDON_ID}/version-picker`;
  expect(TOOL_ID).toBe(expectedToolId);
});

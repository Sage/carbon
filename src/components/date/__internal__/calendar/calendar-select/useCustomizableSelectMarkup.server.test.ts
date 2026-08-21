import useCustomizableSelectMarkup from "./useCustomizableSelectMarkup";

test("useCustomizableSelectMarkup is available in a server-side environment", () => {
  expect(typeof useCustomizableSelectMarkup).toBe("function");
});

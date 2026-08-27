import addFocusStyling from "./add-focus-styling";

test("should return the correct focus styling for default focus", () => {
  const result = addFocusStyling();
  expect(result).toMatchSnapshot();
});

test("should return the correct focus styling for inset focus", () => {
  const result = addFocusStyling(true);
  expect(result).toMatchSnapshot();
});

test("should return the correct focus styling for inverse focus", () => {
  const result = addFocusStyling(false, true);
  expect(result).toMatchSnapshot();
});

test("should return the correct focus styling for inset and inverse focus", () => {
  const result = addFocusStyling(true, true);
  expect(result).toMatchSnapshot();
});

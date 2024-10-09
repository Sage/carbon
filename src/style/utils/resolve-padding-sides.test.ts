import resolvePaddingSides from "./resolve-padding-sides";

test.each([
  ["10px 20px 30px 40px", "10px", "20px", "30px", "40px"],
  ["10px 20px 30px", "10px", "20px", "30px", "20px"],
  ["10px 20px", "10px", "20px", "10px", "20px"],
  ["10px", "10px", "10px", "10px", "10px"],
] as const)(
  "parses shorthand padding prop, with value '%s', into individual padding values",
  (padding, expectedTop, expectedRight, expectedBottom, expectedLeft) => {
    const result = resolvePaddingSides({ padding });
    expect(result).toMatchObject({
      paddingTop: expectedTop,
      paddingRight: expectedRight,
      paddingBottom: expectedBottom,
      paddingLeft: expectedLeft,
    });
  }
);

test("returns individual padding values, when the shorthand padding prop is not provided", () => {
  const result = resolvePaddingSides({
    paddingTop: "1px",
    paddingX: "100px",
  });
  expect(result).toMatchObject({
    paddingTop: "1px",
    paddingRight: "100px",
    paddingLeft: "100px",
  });
});

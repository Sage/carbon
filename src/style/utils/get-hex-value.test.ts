import getHexValue from "./get-hex-value";

test("converts 3-digit hex to 6-digit hex", () => {
  expect(getHexValue("#abc")).toBe("#aabbcc");
});

test("converts 4-digit hex to 8-digit hex", () => {
  expect(getHexValue("#abcd")).toBe("#aabbccdd");
});

test("returns 6-digit hex", () => {
  expect(getHexValue("#123456")).toBe("#123456");
});

test("converts rgb to hex", () => {
  expect(getHexValue("rgb(255, 0, 128)")).toBe("#ff0080");
});

test("converts rgba to hex", () => {
  expect(getHexValue("rgba(255, 0, 128, 0.5)")).toBe("#ff008080");
});

test("returns #000000 when invalid rgb is passed", () => {
  expect(getHexValue("rgb()")).toBe("#000000");
});

test("converts hsl to hex", () => {
  expect(getHexValue("hsl(0, 100%, 50%)")).toBe("#ff0000");
});

test("converts hsl with hue < 120 to hex", () => {
  expect(getHexValue("hsl(100, 100%, 50%)")).toBe("#55ff00");
});

test("converts hsl with hue < 180 to hex", () => {
  expect(getHexValue("hsl(150, 100%, 50%)")).toBe("#00ff80");
});

test("converts hsl with hue < 240 to hex", () => {
  expect(getHexValue("hsl(210, 100%, 50%)")).toBe("#0080ff");
});

test("converts hsl with hue < 300 to hex", () => {
  expect(getHexValue("hsl(270, 100%, 50%)")).toBe("#8000ff");
});

test("converts hsl with hue < 360 to hex", () => {
  expect(getHexValue("hsl(330, 100%, 50%)")).toBe("#ff0080");
});

test("converts hsl with negative hue to hex", () => {
  expect(getHexValue("hsl(-120, 100%, 50%)")).toBe("#0000ff");
});

test("converts hsla to hex", () => {
  expect(getHexValue("hsla(100, 100%, 50%, 0.5)")).toBe("#55ff0080");
});

test("returns #000000 when invalid hsl is passed", () => {
  expect(getHexValue("hsl()")).toBe("#000000");
});

test("converts named color to hex", () => {
  expect(getHexValue("palegoldenrod")).toBe("#eee8aa");
});

test("throws error when an invalid color is passed", () => {
  const spy = jest.spyOn(console, "error").mockImplementation(() => {});

  expect(getHexValue("notacolor")).toBe("#000000");
  expect(spy).toHaveBeenCalledWith(
    'Could not parse "notacolor", please provide a valid hex, rgb, rgba, hsl, hsla or named color.',
  );

  spy.mockRestore();
});

import generateCssVariables from "./generate-css-variables.util";

const tokens = {
  colorsActionMajor500: "pink",
  colorsUtility500: "yellow",
  colorsAction700: "black",
};
let output: string;

beforeEach(() => {
  output = generateCssVariables(tokens);
});

test("should generate multiline string", () => {
  const linesNumber = output.split(/\r?\n/).length;

  expect(typeof output).toEqual("string");
  expect(linesNumber).toBeGreaterThan(0);
});

test("should generate css variables format for all tokens", () => {
  const matches = output.match(/^--[a-zA-Z0-9]*:\s?.*;$/gm);

  expect(Object.keys(tokens).length).toEqual(matches?.length);
});

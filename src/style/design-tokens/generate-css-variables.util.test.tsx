import { ThemeObject } from "style/themes";
import generateCssVariables from "./generate-css-variables.util";

const assertTokenValues = (
  tokens: ThemeObject | Record<string, string>,
  optOut: boolean | undefined,
) => {
  const resultAsArray = generateCssVariables(tokens, optOut).split(/\r\n/);

  resultAsArray.forEach((result) => {
    const [key, value] = result.split(":");
    const output =
      optOut && key.startsWith("--borderRadius") ? "0px" : tokens[key.slice(2)];

    expect(value.slice(1, value.length - 1)).toEqual(output);
  });
};

const tokens = {
  colorsActionMajor500: "pink",
  colorsUtility500: "yellow",
  colorsAction700: "black",
};
const borderRadiusTokens = {
  borderRadius050: "4px",
  borderRadius150: "12px",
  borderRadius250: "20px",
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

// eslint-disable-next-line jest/expect-expect
test("does not override the borderRadius values if the opt out flag is false", () => {
  assertTokenValues(borderRadiusTokens, false);
});

// eslint-disable-next-line jest/expect-expect
test("overrides the borderRadius values if the opt out flag is true", () => {
  assertTokenValues(borderRadiusTokens, true);
});

// eslint-disable-next-line jest/expect-expect
test("does not override the values of tokens without borderRadius in name if the opt out flag is true", () => {
  assertTokenValues(tokens, true);
});

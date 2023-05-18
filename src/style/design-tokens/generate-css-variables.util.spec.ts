import generateCssVariables from "./generate-css-variables.util";

const assertTokenValues = (tokens: Record<string, string>, optOut: boolean) => {
  const resultAsArray = generateCssVariables(tokens, optOut).split(/\r\n/);

  resultAsArray.forEach((result) => {
    const [key, value] = result.split(":");
    const output =
      optOut && key.startsWith("--borderRadius")
        ? "0px"
        : tokens[key.slice(2) as keyof typeof tokens];

    expect(value.slice(1, value.length - 1)).toEqual(output);
  });
};

describe("generateCssVariables", () => {
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

  it("should generate multiline string", () => {
    const linesNumber = output.split(/\r?\n/).length;

    expect(typeof output).toEqual("string");
    expect(linesNumber).toBeGreaterThan(0);
  });

  it("should generate css variables format for all tokens", () => {
    const matches = output.match(/^--[a-zA-Z0-9]*:\s?.*;$/gm);

    expect(Object.keys(tokens).length).toEqual(matches?.length);
  });

  it("does not override the borderRadius values if the opt out flag is false", () => {
    assertTokenValues(borderRadiusTokens, false);
  });

  it("overrides the borderRadius values if the opt out flag is true", () => {
    assertTokenValues(borderRadiusTokens, true);
  });

  it("does not override the values of tokens without borderRadius in name if the opt out flag is true", () => {
    assertTokenValues(tokens, true);
  });
});

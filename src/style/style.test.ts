import config from "./color-config";
import mix from "./utils/mix";
import generatePalette, { PaletteFunction } from "./palette";

const assertCorrectColorMix = (
  colorConfig: Record<string, string>,
  paletteObject: Record<string, PaletteFunction>,
) => {
  Object.keys(colorConfig).forEach((color) => {
    const match = color.match(/([a-z]+)([\d]{0,2})/i);

    const func = match![1];

    const weight = Number(match![2]);

    expect(paletteObject[func](weight)).toEqual(`#${colorConfig[color]}`);
  });
};

describe("style", () => {
  const colorConfig: Record<string, string> = {
    brilliantGreenShade20: "00B000",
    brilliantGreenTint50: "80EE80",
    goldTint50: "FFDA80",
    errorRedShade20: "9F2D3F",
    genericGreenTint50: "80CC80",
    genericGreenTint30: "4DB84D",
    genericGreenShade15: "008200",
    genericGreenShade35: "006300",
    genericGreenShade55: "004500",
    productGreenTint50: "80D1BB",
    productGreenTint30: "4DBF9F",
    productGreenShade21: "00815D",
    productGreenShade41: "006046",
    productGreenShade61: "00402E",
    productBlueTint50: "80BBE4",
    productBlueTint30: "4DA0D9",
    productBlueShade3: "0073C2",
    productBlueShade23: "005C9A",
    productBlueShade43: "004472",
    amethystTint50: "AC96C1",
    amethystTint30: "8A6BA8",
    amethystTint10: "69418F",
    amethystShade10: "4F2876",
    amethystShade30: "3E1F5C",
    slateTint95: "F2F5F6",
    slateTint90: "E6EBED",
    slateTint80: "CCD6DB",
    slateTint60: "99ADB6",
    slateTint40: "668592",
    slateTint20: "335C6D",
    slateShade60: "00141D",
  };

  describe("palette", () => {
    let palette: Record<string, PaletteFunction>;

    beforeEach(() => {
      palette = generatePalette(config);
    });

    it("produces the correct color mix", () => {
      assertCorrectColorMix(colorConfig, palette);
    });
  });

  describe("mix", () => {
    it("defaults to a weight of 50", () => {
      expect(mix(config.genericGreen, "FFFFFF")).toEqual(
        `#${colorConfig.genericGreenTint50}`,
      );
    });

    it("accepts colors without a hash symbol", () => {
      expect(mix(config.genericGreen, "FFFFFF")).toEqual(
        `#${colorConfig.genericGreenTint50}`,
      );
    });

    it("accepts colors with a hash symbol", () => {
      expect(mix(`#${config.genericGreen}`, "#FFFFFF")).toEqual(
        `#${colorConfig.genericGreenTint50}`,
      );
    });

    it("accepts three-digit hashes", () => {
      expect(mix(config.genericGreen, "FFF")).toEqual(
        `#${colorConfig.genericGreenTint50}`,
      );
      expect(mix("FFF", config.genericGreen)).toEqual(
        `#${colorConfig.genericGreenTint50}`,
      );
    });

    it("accepts colors with combinations of with and without hash symbols", () => {
      expect(mix(`#${config.genericGreen}`, "FFFFFF")).toEqual(
        `#${colorConfig.genericGreenTint50}`,
      );
      expect(mix(config.genericGreen, "#FFFFFF")).toEqual(
        `#${colorConfig.genericGreenTint50}`,
      );
    });

    it("returns empty string if no second input color passed", () => {
      expect(mix(`#${config.genericGreen}`, "")).toEqual("");
    });
  });
});

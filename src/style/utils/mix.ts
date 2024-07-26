const decToHex = (decimal: number): string => decimal.toString(16);
const hexToDec = (hex: string): number => parseInt(hex, 16);
const isShortHex = (hex: string): boolean => hex.length === 3;
const processHexes = (...hexes: string[]): string[] => {
  return hexes
    .map((hex) => hex.replace(/#/, ""))
    .map((hex) => {
      return isShortHex(hex) ? hex.repeat(2) : hex;
    });
};

/**
 * A Javascript implementation of the Sass `mix` mixin.
 */
export default (
  inputColorA: string,
  inputColorB: string,
  weight = 50,
): string => {
  const [colorA, colorB] = processHexes(inputColorA, inputColorB);

  const colorAPairs = colorA.match(/.{1,2}/g);
  const colorBPairs = colorB.match(/.{1,2}/g);

  if (!colorBPairs) {
    return "";
  }

  const hex = colorAPairs
    ?.reduce((acc, pair, i) => {
      const val1 = hexToDec(pair);
      const val2 = hexToDec(colorBPairs[i]);

      const combination = decToHex(
        Math.round(val2 + (val1 - val2) * (weight / 100.0)),
      );

      return acc + combination.padStart(2, "0");
    }, "")
    .toUpperCase();

  return `#${hex}`;
};

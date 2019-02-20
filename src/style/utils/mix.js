const decToHex = decimal => decimal.toString(16);
const hexToDec = hex => parseInt(hex, 16);
const isShortHex = hex => hex.length === 3;
const processHexes = (...hexes) => {
  return hexes
    .map(hex => hex.replace(/#/, ''))
    .map((hex) => { return isShortHex(hex) ? hex.repeat(2) : hex; });
};

/**
 * A Javascript implementation of the Sass `mix` mixin.
 */
export default (inputColorA, inputColorB, weight = 50) => {
  const [colorA, colorB] = processHexes(inputColorA, inputColorB);

  const colorAPairs = colorA.match(/.{1,2}/g), colorBPairs = colorB.match(/.{1,2}/g);
  const hex = colorAPairs.reduce((acc, pair, i) => {
    const val1 = hexToDec(pair), val2 = hexToDec(colorBPairs[i]);

    const combination = decToHex(Math.floor(val2 + (val1 - val2) * (weight / 100.0)));

    return acc + combination.padStart(2, '0');
  }, '').toUpperCase();

  return `#${hex}`;
};

const decToHex = decimal => decimal.toString(16);
const hexToDec = hex => parseInt(hex, 16);
const isShortHex = hex => hex.length === 3;

/*
A Javascript implentation of the Sass mix mixin.
 */
export default (inputColorA, inputColorB, weight = 50) => {
  let colorA = inputColorA.replace(/#/, ''),
      colorB = inputColorB.replace(/#/, '');

  colorA = isShortHex(colorA) ? colorA.repeat(2) : colorA;
  colorB = isShortHex(colorB) ? colorB.repeat(2) : colorB;

  const colorAPairs = colorA.match(/.{1,2}/g), colorBPairs = colorB.match(/.{1,2}/g);
  const hex = colorAPairs.reduce((acc, pair, i) => {
    const val1 = hexToDec(pair), val2 = hexToDec(colorBPairs[i]);

    const combination = decToHex(Math.floor(val2 + (val1 - val2) * (weight / 100.0)));

    return acc + combination.padStart(2, '0');
  }, '').toUpperCase();

  return `#${hex}`;
};

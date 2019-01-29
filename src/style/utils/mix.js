const decToHex = decimal => decimal.toString(16);
const hexToDec = hex => parseInt(hex, 16);

export default (colorA, colorB, weight = 50) => {
  const colorAPairs = colorA.match(/.{1,2}/g), colorBPairs = colorB.match(/.{1,2}/g);
  return colorAPairs.reduce((acc, pair, i) => {
    const val1 = hexToDec(pair), val2 = hexToDec(colorBPairs[i]);

    const combination = decToHex(Math.floor(val2 + (val1 - val2) * (weight / 100.0)));

    return acc + (combination.length < 2 ? `0${combination}` : combination);
  }, '').toUpperCase();
};

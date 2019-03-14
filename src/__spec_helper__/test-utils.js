const isUpper = char => char.toUpperCase() === char;
const humpToDash = (acc, char) => `${acc}${isUpper(char) ? `-${char.toLowerCase()}` : char}`;

export const toCSSCase = (str) => {
  return str.split('').reduce(humpToDash, '');
};

export const assertStyleMatch = (styleSpec, component) => {
  Object.entries(styleSpec).forEach(([attr, value]) => {
    expect(component).toHaveStyleRule(toCSSCase(attr), value);
  });
};

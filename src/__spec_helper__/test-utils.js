export const deleteKeys = (obj, keys) => keys.forEach(k => delete obj[k]);
export const stripKeys = (obj, keys) => {
  return Object.keys(obj).reduce((acc, key) => {
    const strippedObj = deleteKeys(obj[key], keys);
    return { ...acc, [key]: { ...strippedObj } };
  }, {});
};
const isUpper = char => char.toUpperCase() === char;
const humpToDash = (acc, char) => `${acc}${isUpper(char) ? `-${char.toLowerCase()}` : char}`;


export const isUpperCase = char => char.toUpperCase() === char;
export const toCSSCase = (str) => {
  return str.split('').reduce(humpToDash, '');
};

export const assertStyleMatch = (styleSpec, component) => {
  Object.entries(styleSpec).forEach(([attr, value]) => {
    expect(component).toHaveStyleRule(toCSSCase(attr), value);
  });
};

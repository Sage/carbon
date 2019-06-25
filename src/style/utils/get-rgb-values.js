/* eslint-disable no-param-reassign */
/** Given a base color in hex will return its rgb values. */

const getRgbValues = (baseColor) => {
  if (baseColor.length < 7) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const r = baseColor.charAt(1), g = baseColor.charAt(2), b = baseColor.charAt(3);
    baseColor = baseColor.replace(shorthandRegex, `#${r}${r}${g}${g}${b}${b}`);
  }

  return [
    parseInt(baseColor.substr(1, 2), 16),
    parseInt(baseColor.substr(3, 2), 16),
    parseInt(baseColor.substr(5, 2), 16)
  ];
};

export default getRgbValues;

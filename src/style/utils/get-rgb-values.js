/** Given a base color in hex will return its rgb values. */

const getRgbValues = (baseColor) => {
  return [
    parseInt(baseColor.substr(1, 2), 16),
    parseInt(baseColor.substr(3, 2), 16),
    parseInt(baseColor.substr(5, 2), 16),
  ];
};

export default getRgbValues;

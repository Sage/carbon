/** Given a base color in hex will return its rgb values. */

const getRgbValues = (baseColor: string): number[] => {
  return [
    parseInt(baseColor.substring(1, 3), 16),
    parseInt(baseColor.substring(3, 5), 16),
    parseInt(baseColor.substring(5, 6), 16),
  ];
};

export default getRgbValues;

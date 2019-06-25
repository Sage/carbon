/** Given a base color in hex will return its rgb values. */

const getRgbValues = (baseColor) => {
  if (baseColor.length < 7) {
    // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
    baseColor = `#${baseColor[1]}${baseColor[1]}${baseColor[2]}${baseColor[2]}${baseColor[3]}${baseColor[3]}${
      baseColor.length > 4 ? baseColor[4] + baseColor[4] : ''
    }`;
  }
  return [
    parseInt(baseColor.substr(1, 2), 16),
    parseInt(baseColor.substr(3, 2), 16),
    parseInt(baseColor.substr(5, 2), 16)
  ];
};

export default getRgbValues;

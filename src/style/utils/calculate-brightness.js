/* eslint-disable no-param-reassign */
/**
 * Given a base color in hex or rgb will return if a given color is dark or light.
 */
function getRgbValues(color) {
  // check if hex and convert to rgb
  if (color[0] === '#') {
    if (color.length < 7) {
      // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
      color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}${
        color.length > 4 ? color[4] + color[4] : ''
      }`;
    }
    return [
      parseInt(color.substr(1, 2), 16),
      parseInt(color.substr(3, 2), 16),
      parseInt(color.substr(5, 2), 16),
      color.length > 7 ? parseInt(color.substr(7, 2), 16) / 255 : 1
    ];
  }
}

function getTextColor(color) {
  const rgbValues = getRgbValues(color);
  const red = rgbValues[0];
  const green = rgbValues[1];
  const blue = rgbValues[2];
  const alpha = rgbValues[3];

  const contrast = (Math.round(red * 299) + Math.round(green * 587) + Math.round(blue * 114)) / 1000;

  return contrast >= 128 ? 'black' : 'white';
}

export default getTextColor;

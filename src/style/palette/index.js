import tint from '../utils/tint';
import shade from '../utils/shade';

const cachedFunc = cb => (cache = {}) => (weight) => {
  if (cache[weight]) { return cache[weight]; }
  const color = cb(weight);
  cache[weight] = color;
  return color;
};

/**
 * Takes a config object of base colors and, for each base, generates functions
 * to lighten and darken it.
 *
 * Given a config:
 *
 * const palette = generatePalette({ brilliantGreen: '00DC00' });
 *
 * The developer will be able to call:
 *
 * palette.brilliantGreenTint(n);
 * palette.brilliantGreenShade(n);
 *
 * where `n` is the degree of white (in case of `tint`) or
 * black (in case of `shade`) they wish to mix into the base color.
 */
const generatePalette = (config) => {
  const baseNames = Object.keys(config);

  const funcs = baseNames.reduce((acc, baseName) => {
    const tintBy = tint(config[baseName]),
        shadeBy = shade(config[baseName]);

    acc[`${baseName}Tint`] = cachedFunc(tintBy)();
    acc[`${baseName}Shade`] = cachedFunc(shadeBy)();

    return acc;
  }, {});

  return funcs;
};


export default generatePalette;

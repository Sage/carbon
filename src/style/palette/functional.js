import tint from '../utils/tint';
import shade from '../utils/shade';

const cachedFunc = cb => (cache = {}) => (weight) => {
  if (cache[weight]) { return cache[weight]; }
  const color = cb(weight);
  cache[weight] = color;
  return color;
};

const fancyPalette = (config) => {
  const baseNames = Object.keys(config);

  return baseNames.reduce((acc, baseName) => {
    const tintBy = tint(config[baseName].base),
        shadeBy = shade(config[baseName].base);

    acc[`${baseName}Tint`] = cachedFunc(tintBy)();
    acc[`${baseName}Shade`] = cachedFunc(shadeBy)();
    acc[baseName] = config[baseName].base;

    return acc;
  }, {});
};


export default fancyPalette;

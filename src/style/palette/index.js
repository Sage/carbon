import tint from '../utils/tint';
import shade from '../utils/shade';

const cachedFunc = cb => (cache = {}) => (weight) => {
  if (cache[weight]) { return cache[weight]; }
  const color = cb(weight);
  cache[weight] = color;
  return color;
};

const palette = (config) => {
  const baseNames = Object.keys(config);

  return baseNames.reduce((acc, baseName) => {
    const tintBy = tint(config[baseName]),
        shadeBy = shade(config[baseName]);

    acc[`${baseName}Tint`] = cachedFunc(tintBy)();
    acc[`${baseName}Shade`] = cachedFunc(shadeBy)();
    acc[baseName] = config[baseName].base;

    return acc;
  }, {});
};


export default palette;

import tint from '../utils/tint';
import shade from '../utils/shade';

export default (colors) => {
  return Object.keys(colors).reduce((acc, col) => {
    const {
      base, tints, shades
    } = colors[col];

    const tintBy = tint(base);
    const shadeBy = shade(base);

    const tintedColors = tints.reduce((tintAcc, weight) => (
      { ...tintAcc, [`${col}Tint${weight}`]: tintBy(weight) }
    ), {});

    const shadedColors = shades.reduce((tintAcc, weight) => (
      { ...tintAcc, [`${col}Shade${weight}`]: shadeBy(weight) }
    ), {});

    return { ...acc, ...tintedColors, ...shadedColors, [`${col}Base`]: base };
  }, {});
};

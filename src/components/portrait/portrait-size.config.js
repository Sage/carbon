import { isClassic } from '../../utils/helpers/style-helper';

/* eslint-disable key-spacing, no-multi-spaces */

const sizeParams = {
  XS:  { dimensions: 24,  iconDimensions: 16 },
  S:   { dimensions: 32,  iconDimensions: 16 },
  M:   { dimensions: 40,  iconDimensions: 24 },
  ML:  { dimensions: 56,  iconDimensions: 32 },
  L:   { dimensions: 72,  iconDimensions: 32 },
  XL:  { dimensions: 104, iconDimensions: 48 },
  XXL: { dimensions: 128, iconDimensions: 64 }
};

const sizeParamsClassic = {
  'extra-small':  { dimensions: 25,  iconDimensions: null, iconPadding: 4  },
  small:          { dimensions: 30,  iconDimensions: null, iconPadding: 6  },
  'medium-small': { dimensions: 40,  iconDimensions: 24,   iconPadding: 12 },
  medium:         { dimensions: 60,  iconDimensions: 32,   iconPadding: 14 },
  'medium-large': { dimensions: 70,  iconDimensions: 32,   iconPadding: 18 },
  large:          { dimensions: 100, iconDimensions: 48,   iconPadding: 25 },
  'extra-large':  { dimensions: 120, iconDimensions: 64,   iconPadding: 27 }
};

/* eslint-enable key-spacing, no-multi-spaces */

export default function getSizeParams(theme, size) {
  return (isClassic(theme) ? sizeParamsClassic[size] : sizeParams[size]);
}

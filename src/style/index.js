import generatePalette from './palette';
import atOpacity from './utils/at_opacity';

const blackAtOpacity = atOpacity('#FFFFFF');
const addOpacity = (color, opacity) => atOpacity(color)(opacity);

export {
  addOpacity,
  blackAtOpacity,
  generatePalette
};

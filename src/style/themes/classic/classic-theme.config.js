import { THEMES } from '..';

export default (palette) => {
  return {
    name: THEMES.classic,
    colors: {
      base: palette.productGreen,
      primary: palette.productGreenShade(21),
      secondary: palette.productGreenShade(41),
      tertiary: palette.productGreenShade(61),

      // generic
      baseBlue: '#255BC7',
      greyDarkBlue50: '#8099a4'
    },

    status: {
      error: '#c7384f',
      errorBackground: '#fdf5f5',
      errorBorder: '#f7d9d9',
      default: '#335c6d',
      defaultBackground: '#335c6d',
      defaultBorder: '#335c6d',
      maintenance: '#ff7d00',
      maintenanceBackground: '#fff8f2',
      maintenanceBorder: '#ffe4cc',
      new: '#639',
      newBackground: '#f7f5fa',
      newBorder: '#e0d6eb',
      info: '#1573e6',
      infoBackground: '#f3f8fe',
      infoBorder: '#d0e3fa',
      help: '#ffab00',
      helpBackground: '#fffbf2',
      helpBorder: '#fec',
      success: '#50b848',
      successBackground: '#f6fbf6',
      successBorder: '#dcf1da',
      warning: '#ff7d00',
      warningBackground: '#fff8f2',
      warningBorder: '#ffe4cc'
    },

    text: {
      color: '#255bc7'
    },

    disabled: {
      input: '#1e499f',
      disabled: '#b3c2c8',
      border: '#4d7080'
    }
  };
};

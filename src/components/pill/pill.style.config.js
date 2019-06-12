import baseTheme from '../../style/themes/base';

const { colors, pill } = baseTheme;

export default {
  small: {
    colors: {
      neutral: pill.neutral,
      negative: colors.error,
      warning: colors.warning,
      positive: colors.secondary
    },
    hoverColor: colors.white,
    boxShadow: colors.focus
  }
};

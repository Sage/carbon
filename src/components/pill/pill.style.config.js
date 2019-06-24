import baseTheme from '../../style/themes/base';

const { colors, pill } = baseTheme;

export default (theme) => {
  return {
    status: {
      neutral: pill.neutral,
      negative: colors.error,
      warning: colors.warning,
      positive: colors.secondary
    },
    tag: {
      primary: theme.colors.primary
    },
    hoverColor: colors.white,
    boxShadow: colors.focus
  };
};

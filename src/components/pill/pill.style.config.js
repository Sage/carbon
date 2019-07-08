import baseTheme from '../../style/themes/base';

const { colors, pill } = baseTheme;

export default (theme) => {
  return {
    status: {
      neutral: {
        color: pill.neutral,
        buttonFocus: pill.neutralBackgroundFocus
      },
      negative: {
        color: colors.error,
        buttonFocus: pill.errorButtonFocus
      },
      warning: {
        color: pill.warning,
        buttonFocus: pill.warningButtonFocus
      },
      positive: {
        color: colors.secondary,
        buttonFocus: colors.tertiary
      }
    },
    tag: {
      primary: {
        color: theme.colors.primary,
        buttonFocus: theme.colors.secondary
      }
    },
    hoverColor: colors.white,
    boxShadow: colors.focus
  };
};

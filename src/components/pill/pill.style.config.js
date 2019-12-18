import baseTheme from '../../style/themes/base';

const { colors, pill } = baseTheme;

export default (theme) => {
  return {
    status: {
      neutral: {
        varietyColor: pill.neutral,
        buttonFocus: pill.neutralBackgroundFocus
      },
      negative: {
        varietyColor: colors.error,
        buttonFocus: pill.errorButtonFocus
      },
      warning: {
        varietyColor: pill.warning,
        buttonFocus: pill.warningButtonFocus
      },
      positive: {
        varietyColor: colors.secondary,
        buttonFocus: colors.tertiary
      }
    },
    tag: {
      primary: {
        varietyColor: theme.colors.primary,
        buttonFocus: theme.colors.secondary
      }
    }
  };
};

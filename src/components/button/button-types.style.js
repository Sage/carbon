export default ({ colors }) => ({
  primary: {
    default: {
      background: colors.primary,
      borderColor: undefined,
      color: colors.white
    },
    hover: {
      background: colors.secondary,
      borderColor: undefined,
      color: colors.white
    }
  },
  secondary: {
    default: {
      background: undefined,
      borderColor: colors.primary,
      color: colors.primary
    },
    hover: {
      background: colors.secondary,
      borderColor: colors.secondary,
      color: colors.white
    }
  },
  tertiary: {
    default: {
      background: undefined,
      borderColor: undefined,
      color: colors.primary
    },
    hover: {
      background: undefined,
      borderColor: undefined,
      color: colors.secondary
    }
  },
  destructive: {
    default: {
      background: colors.error,
      borderColor: undefined,
      color: colors.white
    },
    hover: {
      background: colors.destructive.hover,
      borderColor: undefined,
      color: colors.white
    }
  },
  darkBackground: {
    default: {
      background: colors.white,
      borderColor: undefined,
      color: colors.primary
    },
    hover: {
      background: colors.secondary,
      borderColor: undefined,
      color: colors.white
    }
  }
});

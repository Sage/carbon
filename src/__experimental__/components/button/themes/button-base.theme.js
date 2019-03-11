export default theme => ({
  variants: {
    primary: {
      standard: `
        border: 0;
        background: ${theme.colors.primary};
        color: ${theme.colors.white};
        cursor: pointer;

        &:hover {
          background: ${theme.colors.secondary};
        }
      `,
      darkBackground: `
        border: 0;
        background: transparent;
        color: ${theme.colors.primary};
        cursor: pointer;

        &:hover {
          color: ${theme.colors.primary};
        }
      `,
      disabled: `
        border: 0;
        background: ${theme.button.disabled.background};
        color: ${theme.button.disabled.text};
        cursor: not-allowed;
      `
    },
    secondary: {
      standard: `
        border: solid 2px ${theme.colors.primary};
        background: transparent;
        color: ${theme.colors.primary};
        cursor: pointer;

        &:hover {
          border: solid 2px ${theme.colors.secondary};
        }
      `,
      darkBackground: `
        border: solid 2px ${theme.colors.white};
        color: ${theme.colors.primary};
        cursor: pointer;

        &:hover {
         border: solid 2px ${theme.colors.secondary};
        }
      `,
      disabled: `
        border: ${theme.button.disabled.background};
        background: transparent;
        color: ${theme.button.disabled.text};
        cursor: not-allowed;
      `
    },
    tertiary: {
      standard: `
        background: transparent;
        border: 0;
        color: ${theme.colors.primary};
        cursor: pointer;

        &:hover {
          color: ${theme.colors.secondary};
        }
      `,
      disabled: `
        border: 0;
        background: transparent;
        color: ${theme.button.disabled.text};
        cursor: not-allowed;
      `
    },
    destructive: {
      standard: `
        border: 0;
        background: ${theme.colors.error};
        color: ${theme.colors.white};
        cursor: pointer;

        &:hover {
          background: ${theme.button.destructive.hover};
        }
      `
    }
  },
  sizes: {
    small: `
      height: 32px;
      font-size: 14px;
      padding-left: 16px;
      padding-right: 16px;
      font-weight: 600;
    `,
    medium: `
      height: 40px;
      font-size: 14px;
      padding-left: 24px;
      padding-right: 24px;
      font-weight: 600;
    `,
    large: `
      height: 48px;
      font-size: 16px;
      padding-left: 32px;
      padding-right: 32px;
      font-weight: 600;
    `
  }
});

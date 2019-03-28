export default ({ colors, disabled }) => ({
  primary: {
    default: `
      background: ${colors.primary};
      border-color: transparent;
      color: ${colors.white};
      &:hover {
        background: ${colors.secondary};
        border-color: transparent;
        color: ${colors.white};
      }
    `,
    disabled: `
      background: ${disabled.button};
      border-color: transparent;
      color: ${disabled.text};
      &:hover: {
        background: ${colors.secondary};
        border-color: ${disabled.button};
        color: ${disabled.text};
      }
    `
  },
  secondary: {
    default: `
      background: transparent;
      border-color: ${colors.primary};
      color: ${colors.primary};
    &:hover {
      background: ${colors.secondary};
      border-color: ${colors.secondary};
      color: ${colors.white};
    }
    `,
    disabled: `
      background: transparent
      border-color: ${disabled.button};
      color: ${disabled.text};
      &:hover {
        background: transparent
        border-color: ${disabled.button};
        color: ${disabled.text};
      }
    `
  },
  tertiary: {
    default: `
      background: transparent;
      border-color: transparent;
      color: ${colors.primary};
    &:hover {
      background: transparent;
      border-color: transparent;
      color: ${colors.secondary}
    }
    `,
    disabled: `
      background: transparent;
      border-color: transparent;
      color: ${disabled.text};
      &:hover {
        background: transparent;
        border-color: transparent;
        color: ${disabled.text};
      }
    `
  },
  destructive: {
    default: `
      background: ${colors.error};
      border-color: transparent;
      color: ${colors.white};
    &:hover {
      background: ${colors.destructive.hover};
      border-color: transparent;
      color: ${colors.white};
    }
    `,
    disabled: `
      background: ${disabled.button};
      border-color: transparent;
      color: ${disabled.text};
      &:hover {
        background: ${colors.secondary};
        border-color: transparent;
        color: ${disabled.text};
      }
    `
  },
  darkBackground: {
    default: `
      background: ${colors.white};
      border-color: transparent;
      color: ${colors.primary};
    &:hover {
      background: ${colors.secondary};
      border-color: transparent;
      color: ${colors.white};
    }
    `,
    disabled: `
      background: ${disabled.button};
      border-color: transparent;
      color: ${disabled.text};
      &:hover {
        background: ${colors.secondary};
        border-color: transparent;
        color: ${disabled.text};
      }
    `
  }
});

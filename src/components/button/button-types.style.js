import StyledIcon from "../icon/icon.style";

export function makeColors(color) {
  return `
  color: ${color};
  ${StyledIcon} {
    color: ${color};
  }
  `;
}

export default ({ colors, disabled }, isDisabled, destructive) => ({
  primary: `
    background: ${colors.primary};
    border-color: transparent;
    color: ${colors.white};
    &:hover {
      background: ${colors.secondary};
    }

    ${
      isDisabled
        ? `
    background: ${disabled.button};
    color: ${disabled.text};
    &:hover {
      background: ${disabled.button};
      border-color: ${disabled.button};
      color: ${disabled.text};
    }
  `
        : ""
    }

    ${
      destructive
        ? `background: ${colors.error};
    border-color: transparent;
    color: ${colors.white};
    &:hover {
      background: ${colors.destructive.hover};
    }

    ${
      isDisabled
        ? `
      background: ${disabled.button};
      color: ${disabled.text};
      &:hover {
        background: ${disabled.button};
        color: ${disabled.text};
      }
    `
        : ""
    }`
        : ""
    }
  `,
  secondary: `
      background: transparent;
      border-color: ${colors.primary};
      color: ${colors.primary};
      &:hover {
        background: ${colors.secondary};
        border-color: ${colors.secondary};
       ${makeColors(colors.white)}
      }

      ${
        destructive
          ? `
        border-color: ${colors.error};
        ${makeColors(colors.error)}
        &:focus {
          ${makeColors(colors.white)}
          background: ${colors.destructive.hover};
        }
        &:hover {
          ${makeColors(colors.white)}
          border-color: ${colors.destructive.hover};
          background: ${colors.destructive.hover};
        }
      `
          : ""
      }

      ${
        isDisabled
          ? `
        border-color: ${disabled.button};
        color: ${disabled.text};
        &:hover {
          background: transparent
          border-color: ${disabled.button};
          ${makeColors(disabled.text)}
        }
    `
          : ""
      }
  `,
  tertiary: `
    background: transparent;
    border-color: transparent;
    color: ${colors.primary};
    &:hover {
      ${makeColors(colors.secondary)}
    }

    ${
      destructive
        ? `
      ${makeColors(colors.error)}
      &:hover {
        ${makeColors(colors.destructive.hover)}
      }
      `
        : ""
    }

    ${
      isDisabled
        ? `
      color: ${disabled.text};
      &:hover {
        ${makeColors(disabled.text)}
      }
    `
        : ""
    }
  `,
  dashed: `
    background: transparent;
    border: 2px solid ${colors.dashedBorder}
    border-style: dashed;
    color: ${colors.dashedButtonText};
    &:hover {
      background-color: ${colors.dashedHoverBackground}
    }

    ${
      destructive
        ? `
      ${makeColors(colors.error)}
      &:hover {
        ${makeColors(colors.destructive.hover)}
      }
      `
        : ""
    }

    ${
      isDisabled
        ? `
      border-color: ${disabled.button};
      color: ${disabled.text};
      &:hover {
        background-color: transparent;
        ${makeColors(disabled.text)}
      }
    `
        : ""
    }
  `,
  darkBackground: `
    background: ${colors.white};
    border-color: transparent;
    color: ${colors.primary};
    &:hover {
      background: ${colors.secondary};
      ${makeColors(colors.white)}
    }

    ${
      isDisabled
        ? `
      background: ${disabled.button};
      color: ${disabled.text};
      &:hover {
        background: ${disabled.button};
        ${makeColors(disabled.text)}
      }
    `
        : ""
    }
  `,
});

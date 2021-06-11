import StyledIcon from "../icon/icon.style";

export function makeColors(color) {
  return `
  color: ${color};
  ${StyledIcon} {
    color: ${color};
  }
  `;
}

export default (theme, isDisabled, destructive) => ({
  primary: `
    background: ${theme.sagedsColorsBase400};
    border-color: transparent;
    color: ${theme.sagedsColorsTextWhite};
    &:hover {
      background: ${theme.sagedsColorsBase500};
    }

    ${
      isDisabled
        ? `
    background: ${theme.sagedsGenericColorsSlate100};
    color: ${theme.sagedsColorsTextBlack30};
    &:hover {
      background: ${theme.sagedsGenericColorsSlate100};
      border-color: ${theme.sagedsGenericColorsSlate100};
      color: ${theme.sagedsColorsTextBlack30};
    }
  `
        : ""
    }

    ${
      destructive
        ? `background: ${theme.sagedsColorsSemanticNegative};
    border-color: transparent;
    color: ${theme.sagedsColorsTextWhite};
    &:hover {
      background: ${theme.sagedsColorsSupportingNegative};
    }

    ${
      isDisabled
        ? `
      background: ${theme.sagedsGenericColorsSlate100};
      color: ${theme.sagedsColorsTextBlack30};
      &:hover {
        background: ${theme.sagedsGenericColorsSlate100};
        color: ${theme.sagedsColorsTextBlack30};
      }
    `
        : ""
    }`
        : ""
    }
  `,
  secondary: `
      background: transparent;
      border-color: ${theme.sagedsColorsBase400};
      color: ${theme.sagedsColorsBase400};
      &:hover {
        background: ${theme.sagedsColorsBase500};
        border-color: ${theme.sagedsColorsBase500};
       ${makeColors(theme.sagedsColorsTextWhite)}
      }

      ${
        destructive
          ? `
        border-color: ${theme.sagedsColorsSemanticNegative};
        ${makeColors(theme.sagedsColorsSemanticNegative)}
        &:focus {
          ${makeColors(theme.sagedsColorsTextWhite)}
          background: ${theme.sagedsColorsSupportingNegative};
        }
        &:hover {
          ${makeColors(theme.sagedsColorsTextWhite)}
          border-color: ${theme.sagedsColorsSupportingNegative};
          background: ${theme.sagedsColorsSupportingNegative};
        }
      `
          : ""
      }

      ${
        isDisabled
          ? `
        border-color: ${theme.sagedsGenericColorsSlate100};
        color: ${theme.sagedsColorsTextBlack30};
        &:hover {
          background: transparent
          border-color: ${theme.sagedsGenericColorsSlate100};
          ${makeColors(theme.sagedsColorsTextBlack30)}
        }
    `
          : ""
      }
  `,
  tertiary: `
    background: transparent;
    border-color: transparent;
    color: ${theme.sagedsColorsBase400};
    &:hover {
      ${makeColors(theme.sagedsColorsBase500)}
    }

    ${
      destructive
        ? `
      ${makeColors(theme.sagedsColorsSemanticNegative)}
      &:hover {
        ${makeColors(theme.sagedsColorsSupportingNegative)}
      }
      `
        : ""
    }

    ${
      isDisabled
        ? `
      color: ${theme.sagedsColorsTextBlack30};
      &:hover {
        ${makeColors(theme.sagedsColorsTextBlack30)}
      }
    `
        : ""
    }
  `,
  dashed: `
    background: transparent;
    border: 2px solid ${theme.sagedsGenericColorsSlate100} // find color
    border-style: dashed;
    color: ${theme.sagedsColorsTextBlack90};
    &:hover {
      background-color: ${theme.sagedsGenericColorsSlate200}
    }

    ${
      destructive
        ? `
      ${makeColors(theme.sagedsColorsSemanticNegative)}
      &:hover {
        ${makeColors(theme.sagedsColorsSupportingNegative)}
      }
      `
        : ""
    }

    ${
      isDisabled
        ? `
      border-color: ${theme.sagedsGenericColorsSlate100};
      color: ${theme.sagedsColorsTextBlack30};
      &:hover {
        background-color: transparent;
        ${makeColors(theme.sagedsColorsTextBlack30)}
      }
    `
        : ""
    }
  `,
  darkBackground: `
    background: ${theme.sagedsColorsTextWhite};
    border-color: transparent;
    color: ${theme.sagedsColorsBase400};
    &:hover {
      background: ${theme.sagedsColorsBase500};
      ${makeColors(theme.sagedsColorsTextWhite)}
    }

    ${
      isDisabled
        ? `
      background: ${theme.sagedsGenericColorsSlate100};
      color: ${theme.sagedsColorsTextBlack30};
      &:hover {
        background: ${theme.sagedsGenericColorsSlate100};
        ${makeColors(theme.sagedsColorsTextBlack30)}
      }
    `
        : ""
    }
  `,
});

import StyledIcon from "../icon/icon.style";

export function makeColors(color) {
  return `
  color: ${color};
  ${StyledIcon} {
    color: ${color};
  }
  `;
}

export default (isDisabled, destructive) => ({
  primary: `
    background: var(--colorsActionMajor500);
    border-color: transparent;
    ${makeColors("var(--colorsActionMajorYang100)")};
    &:hover {
      background: var(--colorsActionMajor600);
    }

    ${
      isDisabled
        ? `
    background: var(--colorsActionDisabled500);
    ${makeColors("var(--colorsYin030)")};
    &:hover {
      background: var(--colorsActionDisabled500);
    }
  `
        : ""
    }

    ${
      destructive
        ? `background: var(--colorsSemanticNegative500);
    ${makeColors("var(--colorsSemanticNegativeYang100)")};
    &:hover {
      background: var(--colorsSemanticNegative600);
    }

    ${
      isDisabled
        ? `
      background: var(--colorsActionDisabled500);
      ${makeColors("var(--colorsYin030)")};
      &:hover {
        background: var(--colorsActionDisabled500);
      }
    `
        : ""
    }`
        : ""
    }
  `,
  secondary: `
      background: transparent;
      border-color: var(--colorsActionMajor500);
      ${makeColors("var(--colorsActionMajor500)")};
      &:hover {
        background: var(--colorsActionMajor600);
        border-color: var(--colorsActionMajorTransparent);
        ${makeColors("var(--colorsActionMajorYang100)")};
      }

      ${
        destructive
          ? `
        border-color: var(--colorsSemanticNegative500);
        ${makeColors("var(--colorsSemanticNegative500)")}
        &:hover {
          background: var(--colorsSemanticNegative600);
          border-color: var(--colorsSemanticNegativeTransparent);
          ${makeColors("var(--colorsSemanticNegativeYang100)")};
        }
      `
          : ""
      }

      ${
        isDisabled
          ? `
        border-color: var(--colorsActionDisabled500);
        ${makeColors("var(--colorsYin030)")};
        &:hover {
          background: transparent;
          border-color: var(--colorsActionDisabled500);
          ${makeColors("var(--colorsYin030)")};
        }
    `
          : ""
      }
  `,
  tertiary: `
    background: transparent;
    border-color: transparent;
    ${makeColors("var(--colorsActionMajor500)")};
    &:hover {
      background: var(--colorsActionMajor600);
      ${makeColors("var(--colorsActionMajorYang100)")};
    }

    ${
      destructive
        ? `
      ${makeColors("var(--colorsSemanticNegative500)")};
      &:hover {
        background: var(--colorsSemanticNegative600);
        ${makeColors("var(--colorsSemanticNegativeYang100)")};
      }
      `
        : ""
    }

    ${
      isDisabled
        ? `
      ${makeColors("var(--colorsYin030)")};
      &:hover {
        background: var(--colorsActionMajorTransparent);
        ${makeColors("var(--colorsYin030)")};
      }
    `
        : ""
    }
  `,
  dashed: `
    background: transparent;
    border: 2px dashed var(--colorsActionMinor500);
    ${makeColors("var(--colorsActionMinor500)")};
    &:hover {
      background-color: var(--colorsActionMinor200);
    }

    ${
      destructive
        ? `
      border-color: var(--colorsSemanticNegative500);
      `
        : ""
    }

    ${
      isDisabled
        ? `
      border-color: var(--colorsActionDisabled500);
      ${makeColors("var(--colorsYin030)")};
      &:hover {
        background-color: transparent;
      }
    `
        : ""
    }
  `,
  darkBackground: `
    background: var(--colorsActionMajorYang100);
    border-color: transparent;
    ${makeColors("var(--colorsActionMajor500)")};
    &:hover {
      background: var(--colorsActionMajor600);
      ${makeColors("var(--colorsActionMajorYang100)")}
    }

    ${
      isDisabled
        ? `
      background: var(--colorsActionDisabled500);
      ${makeColors("var(--colorsYin030)")};
      &:hover {
        background: var(--colorsActionDisabled500);
        ${makeColors("var(--colorsYin030)")};
      }
    `
        : ""
    }
  `,
});

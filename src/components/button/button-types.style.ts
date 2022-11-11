import StyledIcon from "../icon/icon.style";
import StyledLoaderSquare from "../loader/loader-square.style";

function makeColors(color: string) {
  return `
  color: ${color};
  ${StyledIcon} {
    color: ${color};
  }
  ${StyledLoaderSquare} {
    background-color: ${color};
  }
  `;
}

export default (
  isDisabled?: boolean,
  destructive?: boolean,
  isMinor?: boolean,
  size?: string
) => ({
  primary: `
    background: var(--colorsActionMajor500);
    border-color: transparent;
    ${makeColors("var(--colorsActionMajorYang100)")};
    &:hover {
      background: var(--colorsActionMajor600);
    }
    ${
      isMinor
        ? `
    background: var(--colorsActionMinor500);
    border-color: var(--colorsActionMinorTransparent);
    ${makeColors("var(--colorsActionMinorYang100)")};
    &:hover {
      background: var(--colorsActionMinor600);
    }
  `
        : ""
    }
    ${
      isDisabled
        ? `
    background: var(--colorsActionDisabled500);
    ${makeColors("var(--colorsActionMajorYin030)")};
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
      ${makeColors("var(--colorsActionMajorYin030)")};
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
        isMinor
          ? `
      background: transparent;
      padding: var(--spacing100);
      border-color: var(--colorsActionMinor500);
      ${makeColors("var(--colorsActionMinor500)")};
      &:hover {
        color: var(--colorsActionMinorYang100);
        background: var(--colorsActionMinor600);
      }
    `
          : ""
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
        ${makeColors("var(--colorsActionMajorYin030)")};
        &:hover {
          background: transparent;
          border-color: var(--colorsActionDisabled500);
          ${makeColors("var(--colorsActionMajorYin030)")};
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
      isMinor
        ? `
    background: transparent;
    padding: var(--spacing100);
    ${makeColors("var(--colorsActionMinor500)")};
    &:hover {
      color: var(--colorsActionMinorYang100);
      background: var(--colorsActionMinor600);
    }
  `
        : ""
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
      ${makeColors("var(--colorsActionMajorYin030)")};
      &:hover {
        background: var(--colorsActionMajorTransparent);
        ${makeColors("var(--colorsActionMajorYin030)")};
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
      ${makeColors("var(--colorsActionMinorYin030)")};
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
      ${makeColors("var(--colorsActionMajorYin030)")};
      &:hover {
        background: var(--colorsActionDisabled500);
        ${makeColors("var(--colorsActionMajorYin030)")};
      }
    `
        : ""
    }
  `,
});

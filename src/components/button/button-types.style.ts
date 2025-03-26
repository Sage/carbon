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

const disabledImageStyle = `
  img, svg {
    opacity: 0.3;
  }
`;

const gradientDisabledStyle = `
  background: transparent;
  border-color: var(--colorsActionDisabled500);
  ${makeColors("var(--colorsActionMajorYin030)")};
  &:hover {
    border-color: var(--colorsActionDisabled500);
    ${makeColors("var(--colorsActionMajorYin030)")};
  }
  ${disabledImageStyle}
`;

const gradientSharedStyle = `
  border: 2px solid transparent;
  &:hover {
    background: linear-gradient(to right, #d6f8df, #d9f2ff, #ede2ff) padding-box, linear-gradient(to right, #00D639, #11AFFF, #8F49FE) border-box;
  }
`;

export default (
  isDisabled?: boolean,
  destructive?: boolean,
  isWhite?: boolean,
) => ({
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
          ${makeColors("var(--colorsActionMajorYin030)")};
          &:hover {
            background: var(--colorsActionDisabled500);
          }
          ${disabledImageStyle}
        `
        : ""
    }

    ${
      destructive
        ? `
        background: var(--colorsSemanticNegative500);
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
          ${disabledImageStyle}
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
        isWhite && (!isDisabled || !destructive)
          ? `
          border-color: var(--colorsActionMajorYang100);
          ${makeColors("var(--colorsActionMajorYang100)")};
          &:hover {
            background: var(--colorsActionMajorYang100);
            border-color: var(--colorsActionMajorYang100);
            ${makeColors("var(--colorsYin100)")};
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
        isDisabled && !isWhite
          ? `
            border-color: var(--colorsActionDisabled500);
            ${makeColors("var(--colorsActionMajorYin030)")};
            &:hover {
              background: transparent;
              border-color: var(--colorsActionDisabled500);
              ${makeColors("var(--colorsActionMajorYin030)")};
            }
            ${disabledImageStyle}
          `
          : ""
      }

      ${
        isWhite
          ? `
            border-color: var(--colorsActionMajorYang100);
            ${makeColors("var(--colorsActionMajorYang100)")}
            &:hover {
              background: var(--colorsActionMajorYang100);
              ${makeColors("var(--colorsUtilityYin100)")};
            }


            ${
              destructive
                ? `
                  border-color: var(--colorsSemanticNegative450);
                  ${makeColors("var(--colorsSemanticNegative450)")}
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
                  border-color: #4B4B4B;
                  ${makeColors("#4B4B4B")};
                  &:hover {
                    background: transparent;
                    border-color: #4B4B4B;
                    ${makeColors("#4B4B4B")};

                  }
                  ${disabledImageStyle}
                `
                : ""
            }
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
          ${makeColors("var(--colorsActionMajorYin030)")};
          &:hover {
            background: var(--colorsActionMajorTransparent);
            ${makeColors("var(--colorsActionMajorYin030)")};
          }
          ${disabledImageStyle}
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
          ${disabledImageStyle}
        `
        : ""
    }
  `,
  "gradient-grey": `
    ${
      isDisabled
        ? gradientDisabledStyle
        : `
          background: linear-gradient(#F2F5F6, #F2F5F6) padding-box, linear-gradient(to right, #00D639, #11AFFF, #8F49FE) border-box;
          ${gradientSharedStyle}
        `
    }
  `,
  "gradient-white": `
    ${
      isDisabled
        ? gradientDisabledStyle
        : `
          background: linear-gradient(#FFFFFF, #FFFFFF) padding-box, linear-gradient(to right, #00D639, #11AFFF, #8F49FE) border-box;
          ${gradientSharedStyle}
        `
    }
  `,
});

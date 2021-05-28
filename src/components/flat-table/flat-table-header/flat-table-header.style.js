import styled, { css } from "styled-components";
import { padding } from "styled-system";

import baseTheme from "../../../style/themes/base";

const verticalBorderSizes = {
  small: "1px",
  medium: "2px",
  large: "4px",
};

const StyledFlatTableHeader = styled.th`
  ${({
    align,
    alternativeBgColor,
    theme,
    colWidth,
    leftPosition,
    makeCellSticky,
    verticalBorder,
  }) => css`
    background-color: transparent;
    border-width: 0;
    border-bottom: 1px solid ${theme.table.secondary};
    box-sizing: border-box;
    font-weight: 700;
    left: auto;
    text-align: ${align};
    top: 0;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    word-break: keep-all;
    padding: 0;
    ${
      colWidth &&
      css`
        width: ${colWidth}px;
      `
    }

    /* accommodate for no border in the header first cell */
    &:first-child {
      padding-left: 1px;
    }

    &&& {
      > div {
        box-sizing: border-box;
        ${padding}

        ${
          colWidth &&
          css`
            width: ${colWidth}px;
          `
        }
      }
    }

    ${
      alternativeBgColor &&
      css`
      &&& {
        background-color: ${theme.flatTable.headerAlternativeBackground}`
    }
    };

    ${
      makeCellSticky &&
      css`
      left: ${leftPosition}px;
      position: sticky;

      &:first-child {
        padding-right: 0.395em;

        @media not all and (min-resolution:.001dpcm) {
          @supports (-webkit-appearance:none) and (stroke-color:transparent) {
            padding-right: 0.6em;
          }
        }
    `
    }

    &&& {
      ${
        verticalBorder &&
        css`
          border-right-width: ${verticalBorderSizes[verticalBorder]};
        `
      }
      }
    }
  `}
`;

StyledFlatTableHeader.defaultProps = {
  theme: baseTheme,
};

export default StyledFlatTableHeader;

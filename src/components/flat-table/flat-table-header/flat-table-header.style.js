import styled, { css } from "styled-components";
import { padding } from "styled-system";
import getAlternativeBackgroundColor from "./flat-table-header-utils";

const verticalBorderSizes = {
  small: "1px",
  medium: "2px",
  large: "4px",
};

const StyledFlatTableHeader = styled.th`
  ${({
    align,
    alternativeBgColor,
    colWidth,
    leftPosition,
    makeCellSticky,
    verticalBorder,
    colorTheme,
  }) => css`
    background-color: transparent;
    border-width: 0;
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
          background-color: ${getAlternativeBackgroundColor(colorTheme)};
        }
        &&&:first-child {
          border-left: unset;
        }
      `
    };

    ${
      makeCellSticky &&
      css`
      left: ${leftPosition}px;
      position: sticky;
      &&& {
        z-index: 1002;
      }

      &:first-child {
        padding-right: 0.395em;

        /* Applies specific styling for Firefox. Increased padding is required to ensure no gap is present between
        the th elements. This includes FlatTableHeader and FlatTableRowHeader */
        @-moz-document url-prefix() {
          padding-right: 2px;
        }

        /* Styling for safari. Increased padding is required to ensure no gap is present between
        the th elements. This includes FlatTableHeader and FlatTableRowHeader  */
        @media not all and (min-resolution:.001dpcm) {
          @supports (-webkit-appearance:none) and (stroke-color:transparent) {
            padding-right: 0.9em;
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

export default StyledFlatTableHeader;

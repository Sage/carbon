import styled, { css } from "styled-components";
import { PaddingProps, padding } from "styled-system";
import getAlternativeBackgroundColor from "./flat-table-header-utils";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import { toColor } from "../../../style/utils/color";
import { FlatTableHeaderProps } from "./flat-table-header.component";
import { FlatTableProps } from "..";

const verticalBorderSizes = {
  small: "1px",
  medium: "2px",
  large: "4px",
};

interface StyledFlatTableHeaderProps
  extends Pick<
      FlatTableHeaderProps,
      "align" | "verticalBorder" | "verticalBorderColor" | "alternativeBgColor"
    >,
    PaddingProps {
  makeCellSticky: boolean;
  colWidth?: number;
  colorTheme: FlatTableProps["colorTheme"];
  leftPosition: number;
  rightPosition: number;
}

const StyledFlatTableHeader = styled.th.attrs(
  applyBaseTheme,
)<StyledFlatTableHeaderProps>`
  ${({
    align,
    alternativeBgColor,
    colWidth,
    leftPosition,
    rightPosition,
    makeCellSticky,
    verticalBorder,
    verticalBorderColor,
    colorTheme,
    theme,
  }) => css`
    background-color: transparent;
    border-width: 0;
    box-sizing: border-box;
    font-weight: 500;
    left: auto;
    text-align: ${align};
    user-select: none;
    vertical-align: middle;
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
        ${leftPosition !== undefined && `left: ${leftPosition}px;`}
        ${rightPosition !== undefined && `right: ${rightPosition}px;`}
        position: sticky;
       
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

      ${
        verticalBorderColor &&
        css`
          border-right-color: ${toColor(theme, verticalBorderColor)};
        `
      }
      }
    }
  `}
`;

export default StyledFlatTableHeader;

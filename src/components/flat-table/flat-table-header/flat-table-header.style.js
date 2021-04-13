import styled, { css } from "styled-components";
import { space } from "styled-system";

import baseTheme from "../../../style/themes/base";

const StyledFlatTableHeader = styled.th`
  ${({ align, theme, colWidth, leftPosition, makeCellSticky }) => css`
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
    ${colWidth &&
    css`
      width: ${colWidth}px;
    `}

    /* accommodate for no border in the header first cell */
    &:first-child {
      padding-left: 1px;
    }

    &&& {
      > div {
        box-sizing: border-box;
        ${space}

        ${colWidth &&
        css`
          width: ${colWidth}px;
        `}
      }
    }

    ${makeCellSticky &&
    css`
      top: auto;
      left: ${leftPosition}px;
      position: sticky;

      &:first-child {
        padding-right: 0.395em;

        @media not all and (min-resolution:.001dpcm) {
          @supports (-webkit-appearance:none) and (stroke-color:transparent) {
            padding-right: 0.6em;
          }
        }
    `}
  `}
`;

StyledFlatTableHeader.defaultProps = {
  theme: baseTheme,
};

export default StyledFlatTableHeader;

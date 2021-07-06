import styled, { css } from "styled-components";

import baseTheme from "../../style/themes/base";
import StyledColumn from "./column/column.style";
import { ROW_SIZES_CSS } from "./row.config";

const StyledRow = styled.div`
  clear: both;
  position: relative;

  ${({ gutter, columnDivide }) => {
    const size = ROW_SIZES_CSS[gutter];
    return css`
      margin-bottom: -${size}px;
      margin-left: -${size}px;

      ${StyledColumn} {
        margin-bottom: ${size}px;
        padding-left: ${size}px;

        ${columnDivide &&
        css`
          position: relative;

          &:before {
            content: "";
            position: absolute;
            width: 1px;
            height: 100%;
            background-color: ${baseTheme.palette.slateTint(70)};
            left: ${size / 2}px;
            top: 0;
          }

          &:first-child:before {
            display: none;
          }
        `}
      }
    `;
  }}

  /* Clearfix */
  &:before,
  &:after {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
  }
`;

export default StyledRow;

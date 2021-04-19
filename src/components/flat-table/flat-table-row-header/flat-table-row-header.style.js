import styled, { css } from "styled-components";
import { space } from "styled-system";

import baseTheme from "../../../style/themes/base";

const StyledFlatTableRowHeader = styled.th`
  ${({ align, theme, colWidth, leftPosition, isTruncated, expandable }) => css`
    background-color: #fff;
    border: 1px solid ${theme.table.secondary};
    border-top: none;
    box-sizing: border-box;
    left: 0;
    font-weight: normal;
    position: sticky;
    text-align: ${align};
    top: auto;
    vertical-align: middle;
    padding: 0;

    ${colWidth &&
    css`
      width: ${colWidth}px;
    `}

    &&& {
      > div {
        box-sizing: border-box;

        ${isTruncated &&
        css`
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        `}

        ${colWidth &&
        css`
          width: ${colWidth}px;
        `}
 
        ${space}
      }
    }

    &&& {
      left: ${leftPosition}px;
    }

    ${expandable &&
    css`
      white-space: nowrap;
    `}
  `}
`;

StyledFlatTableRowHeader.defaultProps = {
  theme: baseTheme,
};

export default StyledFlatTableRowHeader;

import styled, { css } from "styled-components";
import { space } from "styled-system";

import baseTheme from "../../../style/themes/base";

const StyledFlatTableCell = styled.td`
  ${({
    align,
    theme,
    rowSpan,
    leftPosition,
    makeCellSticky,
    colWidth,
    isTruncated,
    expandable,
  }) => css`
    background-color: #fff;
    border-width: 0;
    border-bottom: 1px solid ${theme.table.secondary};
    text-align: ${align};
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

    &:first-of-type {
      border-left: 1px solid ${theme.table.secondary};
    }

    &:last-of-type {
      border-right: 1px solid ${theme.table.secondary};
    }

    ${rowSpan &&
    css`
      &:first-of-type + & {
        border-left: 1px solid ${theme.table.secondary};
      }
    `}

    ${makeCellSticky &&
    css`
      top: auto;
      left: ${leftPosition}px;
      position: sticky;
    `}

    ${expandable &&
    css`
      white-space: nowrap;
    `}
  `}
`;

const StyledCellContent = styled.div`
  ${({ expandable }) =>
    expandable &&
    css`
      display: flex;
      align-items: center;
    `}
`;

StyledFlatTableCell.defaultProps = {
  theme: baseTheme,
};

export { StyledFlatTableCell, StyledCellContent };

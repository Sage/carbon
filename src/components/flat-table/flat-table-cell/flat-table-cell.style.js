import styled, { css } from "styled-components";
import { padding } from "styled-system";

import baseTheme from "../../../style/themes/base";
import { toColor } from "../../../style/utils/color";

const verticalBorderSizes = {
  small: "1px",
  medium: "2px",
  large: "4px",
};

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
    verticalBorder,
    verticalBorderColor,
  }) => css`
    background-color: var(--colorsUtilityYang100);
    border-width: 0;
    border-bottom: 1px solid var(--colorsUtilityMajor100);
    text-align: ${align};
    vertical-align: middle;
    padding: 0;

    ${colWidth &&
    css`
      width: ${colWidth}px;
    `}

    &&&& {
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
 
        ${padding}
      }

      ${verticalBorder &&
      css`
        border-right: ${verticalBorderSizes[verticalBorder]} solid
          var(--colorsUtilityMajor300);
      `}

      ${verticalBorderColor &&
      css`
        border-right-color: ${toColor(theme, verticalBorderColor)};
      `}
    }

    &:first-of-type {
      border-left: 1px solid var(--colorsUtilityMajor100);
    }

    &:last-of-type {
      border-right: 1px solid var(--colorsUtilityMajor100);
    }

    ${rowSpan &&
    css`
      &:first-of-type + & {
        border-left: 1px solid var(--colorsUtilityMajor100);
      }
    `}

    ${makeCellSticky &&
    css`
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
      line-height: 1em;
    `}
`;

StyledFlatTableCell.defaultProps = {
  theme: baseTheme,
};

export { StyledFlatTableCell, StyledCellContent };
